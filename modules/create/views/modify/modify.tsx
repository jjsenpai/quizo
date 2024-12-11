"use client";

import Back from "@/lib/assets/back-button.svg";
import { IQuestionRequest, IUpdateExamResponse } from "@/lib/types";
import { CreateModal } from "@/modules/create/create-modal";
// import { LoaderWith3Dots } from "@/lib/components/loader";
import Cross from "@/lib/assets/cross.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogPanel, Tab, TabGroup, TabList } from "@headlessui/react";
import { v4 as uuidv4 } from "uuid";
import { CustomCheck } from "@/lib/components/checkbox";
import { LoaderWith3Dots } from "@/lib/components/loader";
import { UpdateExam } from "@/modules/create/api/action";

export const Modify = ({ details }: { details: IUpdateExamResponse }) => {
  const [questions, setQuestions] = useState<IQuestionRequest[]>(details.questions);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div
        className={`relative ${isOpen ? `bg-light opacity-20 backdrop-blur-xl` : ``} flex h-full flex-col gap-6 overflow-hidden rounded-3xl p-4`}>
        <div className="flex gap-4 pt-6 text-[22px] font-bold leading-tight tracking-tight text-gray-900">
          <Link
            href={"/create/events"}
            className="flex size-6 shrink-0 items-center justify-center">
            <Image src={Back as string} alt="<" />
          </Link>
          <h1>Modify</h1>
        </div>
        <div className="flex h-full flex-col gap-6 overflow-y-auto pb-16">
          <div className="flex flex-col gap-4 text-[22px] font-bold leading-tight tracking-tight text-gray-900">
            <h1>{details.title}</h1>
            <div className="flex flex-col gap-1 text-[16px] font-normal">
              <p className="text-[14px] text-[#61758A]">
                Start: {new Date(details.startTime).toString()}
              </p>
              <p className="text-[14px] text-[#61758A]">
                Duration: {details.duration} min(s)
              </p>
              <p className="text-[14px] text-[#61758A]">
                Additional Questions:&nbsp;
                {details.additionalQuestions
                  .map((question) => {
                    return question.text;
                  })
                  .join(",")}
              </p>
              <p className="text-[14px] text-[#61758A]">
                Total questions: {questions.length}
              </p>
              <p className="text-[14px] text-[#61758A]">
                Total marks:{" "}
                {questions.reduce((sum, ques) => sum + (ques.marks ?? 1), 0)}
              </p>
            </div>
          </div>
          {questions.length > 0
            ? questions.map((question, idx) => (
                <div className="rounded-xl border p-4" key={idx}>
                  <label className="mb-2 flex items-center justify-between text-[16px] font-medium text-gray-900">
                    <p className="line-clamp-1">Question {idx + 1}</p>
                    {idx !== 0 ? (
                      <button
                        className="flex size-3 shrink-0 items-end justify-center"
                        type="button"
                        onClick={() => {
                          setQuestions((prev) => {
                            const updatedQuetions = [...prev].filter(
                              (q, i) => i !== idx,
                            );
                            return updatedQuetions;
                          });
                        }}>
                        <Image src={Cross as string} alt="x" />
                      </button>
                    ) : null}
                  </label>
                  <input
                    name="title"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                    placeholder="Sample quiz 1"
                    value={question.questionText}
                    onChange={(e) => {
                      setQuestions((prev) => {
                        const updatedState = [...prev];
                        updatedState[idx] = {
                          ...updatedState[idx],
                          questionText: e.target.value,
                        };
                        return updatedState;
                      });
                    }}
                    required
                  />
                  <TabGroup
                    onChange={(value: number) => {
                      setQuestions((prev) => {
                        const updatedState = [...prev];
                        updatedState[idx] = {
                          questionId: updatedState[idx].questionId,
                          questionText: updatedState[idx].questionText,
                          questionType: value,
                          answerText: updatedState[idx].answerText,
                          correctOptions: updatedState[idx].correctOptions,
                          options: updatedState[idx].options,
                          marks: 1,
                        };
                        return updatedState;
                      });
                    }}
                    className={"mt-2 flex w-full gap-1 text-sm"}
                    defaultIndex={question.questionType}>
                    <TabList
                      className={
                        "flex w-full flex-1 items-center justify-between rounded-xl bg-light p-2 text-gray-700 focus:outline-none"
                      }>
                      <Tab
                        value={0}
                        className={
                          "rounded-lg p-1 px-2 focus:outline-none data-[selected]:bg-white data-[selected]:shadow"
                        }>
                        MCQ
                      </Tab>
                      <Tab
                        value={1}
                        className={
                          "rounded-lg p-1 px-2 focus:outline-none data-[selected]:bg-white data-[selected]:shadow"
                        }>
                        Multiselect
                      </Tab>
                      <Tab
                        value={2}
                        className={
                          "rounded-lg p-1 px-2 focus:outline-none data-[selected]:bg-white data-[selected]:shadow"
                        }>
                        Numeric
                      </Tab>
                    </TabList>
                    <div className="relative flex w-20 min-w-5 shrink-0 items-center rounded-lg border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none md:w-24">
                      <input
                        name="marks"
                        type="number"
                        className="flex w-full border-gray-300 bg-gray-50 pl-[60px] text-sm text-gray-900 focus:outline-none"
                        placeholder="Marks : 1"
                        value={question.marks ?? undefined}
                        onChange={(e) => {
                          setQuestions((prev) => {
                            const updatedState = [...prev];
                            updatedState[idx] = {
                              ...updatedState[idx],
                              marks: isNaN(parseInt(e.target.value.toString()))
                                ? 1
                                : parseInt(e.target.value.toString()),
                            };
                            return updatedState;
                          });
                        }}
                      />
                      <p className="absolute left-2">Marks :</p>
                    </div>
                  </TabGroup>
                  <div>
                    {question.questionType === 0 || question.questionType === 1 ? (
                      <div>
                        {question.options.map((option, oidx) => {
                          return (
                            <div key={oidx} className="mt-2 flex items-center">
                              <input
                                className="w-full rounded-xl bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none"
                                placeholder={`Option ${oidx + 1} `}
                                value={option.text}
                                onChange={(e) => {
                                  setQuestions((prev) => {
                                    const updatedQuestions = [...prev];
                                    const currentOptions = [
                                      ...updatedQuestions[idx].options,
                                    ];
                                    currentOptions[oidx] = {
                                      ...currentOptions[oidx],
                                      text: e.target.value,
                                    };
                                    updatedQuestions[idx] = {
                                      ...updatedQuestions[idx],
                                      options: currentOptions,
                                    };
                                    return updatedQuestions;
                                  });
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const isSelected = question.correctOptions.includes(
                                    oidx.toString(),
                                  );
                                  setQuestions((prev) => {
                                    const updatedQuestions = [...prev];
                                    if (question.questionType === 0) {
                                      updatedQuestions[idx].correctOptions = [
                                        oidx.toString(),
                                      ];
                                    } else {
                                      const options = new Set(
                                        updatedQuestions[idx].correctOptions,
                                      );
                                      if (isSelected && options.size > 1) {
                                        options.delete(oidx.toString());
                                        updatedQuestions[idx].correctOptions =
                                          Array.from(options);
                                      }
                                      if (!isSelected) {
                                        options.add(oidx.toString());
                                        updatedQuestions[idx].correctOptions =
                                          Array.from(options);
                                      }
                                    }
                                    return updatedQuestions;
                                  });
                                }}
                                className="flex size-6 items-center justify-center gap-2 text-sm text-gray-500">
                                <CustomCheck
                                  isSelected={question.correctOptions.includes(
                                    oidx.toString(),
                                  )}
                                />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div>
                        <input
                          className="mt-2 w-full rounded-xl bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none"
                          placeholder={`Answer e.g. 1.1`}
                          value={question.answerText}
                          onChange={(e) => {
                            setQuestions((prev) => {
                              const updatedQuestions = [...prev];
                              updatedQuestions[idx].answerText = e.target.value;
                              return updatedQuestions;
                            });
                          }}
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            : null}
          <button
            className="flex items-center justify-center rounded-xl border py-4 text-gray-600"
            onClick={() => {
              setQuestions((prev) => {
                const updatedQuetions = [...prev];
                updatedQuetions.push({
                  questionId: uuidv4(),
                  answerText: "",
                  questionType: 0,
                  marks: 1,
                  options: [
                    { optionId: "0", text: "" },
                    { optionId: "1", text: "" },
                    { optionId: "2", text: "" },
                    { optionId: "3", text: "" },
                  ],
                  correctOptions: ["0"],
                  questionText: "Sample",
                });
                return updatedQuetions;
              });
            }}>
            <div>Add a question</div>
          </button>
          <div className="absolute bottom-0 right-0 w-full px-6 py-1">
            <div className="flex h-[54px] w-full shrink-0 items-center justify-between gap-2 text-sm">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex h-[54px] w-full min-w-fit items-center justify-center gap-4 rounded-xl border bg-light p-4 text-gray-900">
                <div>Upload from file</div>
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    const examStartTime = new Date(details.startTime);
                    const examEndTime = new Date(
                      examStartTime.getTime() + details.duration * 60 * 1000,
                    );
                    await UpdateExam({
                      additional_questions: JSON.stringify(details.additionalQuestions),
                      end_time: examEndTime.toISOString(),
                      id: details.id.toString(),
                      questions: JSON.stringify(questions),
                      start_time: details.startTime,
                      title: details.title,
                    });
                  } catch (error) {
                    console.error(error);
                  }
                  setIsLoading(false);
                }}
                className="flex h-[54px] w-full min-w-fit items-center justify-center gap-4 rounded-xl border bg-[#960DF2] p-4">
                <div>{isLoading ? <LoaderWith3Dots /> : `Save`}</div>
              </button>
            </div>
          </div>
        </div>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="w-full">
              <CreateModal
                setQuestions={setQuestions}
                onClick={() => setIsOpen(false)}
              />
            </DialogPanel>
          </div>
        </Dialog>
      </div>
    </>
  );
};
