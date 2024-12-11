"use client";

import { CustomCheck } from "@/lib/components/checkbox";
import { LoaderWith3Dots } from "@/lib/components/loader";
import {
  IAdditionalQuestions,
  IQuestionRequest,
  IUpdateExamResponse,
} from "@/lib/types";
// import { postQuizData } from "@/modules/attempt/api/actions";
import { IAdditionalAnswers, IExamResponse } from "@/modules/attempt/types";
import { useEffect, useRef, useState } from "react";

export const Quiz = ({
  response,
  currentTime,
  questionsSorted,
}: {
  response: IUpdateExamResponse;
  currentTime: string;
  questionsSorted: (IAdditionalQuestions | IQuestionRequest)[];
}) => {
  const [currentTimeState] = useState(currentTime);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [additionalQuestionResponses, setAdditionalQuestionResponses] = useState<
    Record<string, IAdditionalAnswers>
  >({});
  const [questionResponses, setQuestionResponses] = useState<
    Record<string, IExamResponse>
  >({});

  const calculateInitialTimeLeft = () => {
    const durationInSeconds = response.duration * 60;
    const startTime = new Date(response.startTime).getTime();
    const currentTimeCalculated = new Date(currentTimeState).getTime();
    const elapsedTime = Math.floor((currentTimeCalculated - startTime) / 1000);
    return Math.max(durationInSeconds - elapsedTime, 0);
  };

  const [timeLeft, setTimeLeft] = useState(calculateInitialTimeLeft());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentQuestion = questionsSorted[currentQuestionIndex];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentQuestionIndex && buttonRefs.current[currentQuestionIndex]) {
      buttonRefs.current[currentQuestionIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [currentQuestionIndex]);

  return (
    <div className="flex h-full flex-col gap-6 rounded-3xl p-4">
      <div className="flex h-full flex-col justify-between gap-16">
        <div className="mt-6 flex items-center justify-between gap-6 text-[22px] font-bold leading-tight tracking-tight text-gray-900">
          <h1>{response.title}</h1>
          <div className="flex flex-col gap-6 rounded-xl bg-light p-2 text-[16px] font-normal">
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="h-full overflow-y-auto text-base text-gray-900">
          {"text" in currentQuestion ? (
            <div className="flex flex-col gap-4">
              <div className="text-lg font-medium">
                Question : {currentQuestion.text}
              </div>
              <div className="flex flex-col gap-2">
                Response :{" "}
                <input
                  name="Additional Questions"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                  placeholder="E.g. Roll no."
                  value={
                    additionalQuestionResponses[currentQuestion.questionId]?.answer ??
                    ""
                  }
                  onChange={(e) => {
                    setAdditionalQuestionResponses((prev) => {
                      const updatedRecord = { ...prev };
                      updatedRecord[currentQuestion.questionId] = {
                        questionId: currentQuestion.questionId,
                        answer: e.target.value,
                      };
                      return updatedRecord;
                    });
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-lg font-medium">
                Question : {currentQuestion.questionText}
              </div>
              <div className="flex flex-col gap-2">
                Response :{" "}
                {currentQuestion.questionType === 2 ? (
                  <input
                    name="Additional Questions"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                    placeholder="E.g. Roll no."
                    value={
                      additionalQuestionResponses[currentQuestion.questionId]?.answer ??
                      ""
                    }
                    onChange={(e) => {
                      setQuestionResponses((prev) => {
                        const updatedRecord = { ...prev };
                        updatedRecord[currentQuestion.questionId] = {
                          questionId: currentQuestion.questionId,
                          selectedOptions: [],
                          answerText: e.target.value,
                        };
                        return updatedRecord;
                      });
                    }}
                  />
                ) : (
                  currentQuestion.options.map((option, oidx) => {
                    return (
                      <div key={oidx} className="mt-2 flex items-center">
                        <div className="w-full rounded-xl bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none">
                          {option.text}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const isSelected = questionResponses[
                              currentQuestion.questionId
                            ]?.selectedOptions.includes(option.optionId);
                            setQuestionResponses((prev) => {
                              const updatedQuestions = { ...prev };
                              if (currentQuestion.questionType === 0) {
                                updatedQuestions[currentQuestion.questionId] = {
                                  answerText: "",
                                  questionId: currentQuestion.questionId,
                                  selectedOptions: [option.optionId],
                                };
                              } else {
                                if (
                                  questionResponses[currentQuestion.questionId]
                                    ?.selectedOptions.length > 1 &&
                                  isSelected
                                ) {
                                  questionResponses[currentQuestion.questionId] = {
                                    ...questionResponses[currentQuestion.questionId],
                                    selectedOptions: questionResponses[
                                      currentQuestion.questionId
                                    ].selectedOptions.filter(
                                      (item) => item !== option.optionId,
                                    ),
                                  };
                                } else {
                                  questionResponses[currentQuestion.questionId] = {
                                    ...questionResponses[currentQuestion.questionId],
                                    selectedOptions: [
                                      ...questionResponses[currentQuestion.questionId]
                                        ?.selectedOptions,
                                      option.optionId.toString(),
                                    ],
                                  };
                                }
                              }
                              return updatedQuestions;
                            });
                          }}
                          className="flex size-6 items-center justify-center gap-2 text-sm text-gray-500">
                          <CustomCheck
                            isSelected={questionResponses[
                              currentQuestion.questionId
                            ]?.selectedOptions.includes(option.optionId)}
                          />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex w-full shrink-0 flex-col items-center justify-end gap-2 overflow-hidden">
          <ul className="flex h-12 w-full items-center -space-x-px overflow-x-auto text-sm">
            {questionsSorted.map((question, idx) => {
              const isSelected = currentQuestionIndex === idx;
              return (
                <button
                  key={idx}
                  ref={(el) => {
                    buttonRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => {
                    setCurrentQuestionIndex(idx);
                  }}>
                  <div
                    className={`flex h-8 w-10 items-center justify-center border border-gray-300 ${isSelected ? `bg-light` : `bg-white`} px-3 leading-tight text-gray-900`}>
                    {idx + 1}
                  </div>
                </button>
              );
            })}
          </ul>
          <div className="flex items-center justify-center gap-16">
            <button
              disabled={loading}
              className="flex w-28 items-center justify-center gap-4 rounded-xl border bg-light px-4 py-2 text-gray-900"
              type="button"
              onClick={() => {
                setCurrentQuestionIndex((prev) => {
                  if (prev > 0) {
                    return prev - 1;
                  }
                  return prev;
                });
              }}>
              <div className="h-6">{`Previous`}</div>
            </button>
            <button
              disabled={loading}
              className="flex w-28 items-center justify-center gap-4 rounded-xl border bg-light px-4 py-2 text-gray-900"
              type="button"
              onClick={async () => {
                setLoading(true);
                try {
                  // await postQuizData({
                  //   exam_id: response.id.toString(),
                  //   additionalResponse: JSON.stringify(
                  //     Array.from(Object.values(additionalQuestionResponses)),
                  //   ),
                  //   responses: JSON.stringify(
                  //     Array.from(Object.values(questionResponses)),
                  //   ),
                  // });
                  setCurrentQuestionIndex((prev) => {
                    if (prev < questionsSorted.length - 1) {
                      return prev + 1;
                    }
                    return prev;
                  });
                } catch (error) {
                  console.error(error);
                }
                setLoading(false);
              }}>
              <div className="flex h-6 items-center justify-center">
                {loading ? <LoaderWith3Dots /> : `Next`}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
