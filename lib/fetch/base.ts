import { JWTPayload } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/modules/auth/constants";
import { verifyAuth } from "@/lib/actions";
import { processResponse } from "@/lib/fetch/process-response";

export interface IRequestOptions<
  TData extends object = object,
  TParams extends object = object,
  THeaders extends object = object,
> {
  url: string;
  data?: TData;
  params?: TParams;
  additionalHeaders?: THeaders;
  nextConfig?: NextFetchRequestConfig;
  cache?: RequestCache;
  verifySession?: boolean;
  redirect?: boolean;
  process?: boolean;
}

export class FetchClient {
  private readonly config = {
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  private getHeaders = async <THeaders>(additionalHeaders?: THeaders) => {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    return new Headers({
      ...this.config.headers,
      ...(token ? { token } : {}),
      ...(additionalHeaders ? additionalHeaders : {}),
    });
  };

  private processUrl(url?: string) {
    return url
      ? this.config.baseURL!.replace(/\/?\/$/, "") + "/" + url.replace(/^\/+/, "")
      : this.config.baseURL;
  }

  private getParamsString = <TParams>(params?: TParams) => {
    let paramsString = "";
    if (params) {
      paramsString = `?${new URLSearchParams(params as Record<string, string>).toString()}`;
    }

    return paramsString;
  };

  private verifySession = async () => {
    let verifiedToken: JWTPayload | null;
    try {
      verifiedToken = await verifyAuth();
    } catch {
      verifiedToken = null;
    }

    if (!verifiedToken) {
      redirect("/");
    }
  };

  private getOrDelete = async <
    TResponse,
    TParams extends object = object,
    THeaders extends object = object,
  >(
    method: "GET" | "DELETE",
    options: IRequestOptions<object, TParams, THeaders>,
  ) => {
    if (options.verifySession === undefined || options.verifySession) {
      await this.verifySession();
    }

    const { url, additionalHeaders, nextConfig, cache } = options;
    const { params } = options;

    const finalUrl =
      options.process === undefined || options.process
        ? this.processUrl(`${url}${this.getParamsString(params)}`)
        : url;

    const response = await fetch(finalUrl!, {
      method,
      headers: await this.getHeaders(additionalHeaders),
      next: nextConfig,
      cache: cache,
    });

    if (options.process === undefined || options.process) {
      return await processResponse<TResponse>(response, options.redirect);
    } else {
      return response as TResponse;
    }
  };

  private postOrPut = async <
    TResponse,
    TData extends object = object,
    TParams extends object = object,
    THeaders extends object = object,
  >(
    method: "POST" | "PUT",
    options: IRequestOptions<TData, TParams, THeaders>,
  ) => {
    if (options.verifySession === undefined || options.verifySession) {
      await this.verifySession();
    }

    const { url, additionalHeaders, nextConfig, cache } = options;
    const { data, params } = options;
    const finalUrl = this.processUrl(`${url}${this.getParamsString(params)}`);
    const response = await fetch(finalUrl!, {
      method,
      headers: await this.getHeaders(additionalHeaders),
      body: data ? JSON.stringify(data) : undefined,
      next: nextConfig,
      cache: cache,
    });

    if (options.process === undefined || options.process) {
      return await processResponse<TResponse>(response, options.redirect);
    } else {
      return response as TResponse;
    }
  };

  public get = async <
    TResponse,
    TParams extends object = object,
    THeaders extends object = object,
  >(
    options: IRequestOptions<object, TParams, THeaders>,
  ) => {
    return await this.getOrDelete<TResponse>("GET", options);
  };

  public delete = async <
    TResponse,
    TParams extends object = object,
    THeaders extends object = object,
  >(
    options: IRequestOptions<object, TParams, THeaders>,
  ) => {
    return await this.getOrDelete<TResponse>("DELETE", options);
  };

  public post = async <
    TResponse,
    TData extends object = object,
    TParams extends object = object,
    THeaders extends object = object,
  >(
    options: IRequestOptions<TData, TParams, THeaders>,
  ) => {
    return await this.postOrPut<TResponse>("POST", options);
  };

  public put = async <
    TResponse,
    TData extends object = object,
    TParams extends object = object,
    THeaders extends object = object,
  >(
    options: IRequestOptions<TData, TParams, THeaders>,
  ) => {
    return await this.postOrPut<TResponse>("PUT", options);
  };
}

export const fetchClient = new FetchClient();
