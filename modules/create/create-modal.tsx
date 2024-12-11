"use client";

import * as XLSX from "xlsx";
import { Dispatch, SetStateAction, useState } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { CloudUpload } from "@mui/icons-material";
import { IQuestionData, IQuestionRequest } from "@/lib/types";
import { toast } from "react-toastify";
import { Toast } from "@/lib/components/toast/toast";
import { v4 as uuidv4 } from "uuid";

export const CreateModal = ({
  setQuestions,
  onClick,
}: {
  setQuestions: Dispatch<SetStateAction<IQuestionRequest[]>>;
  onClick: () => void;
}) => {
  const [questionData, setQuestionData] = useState<IQuestionData[]>([]);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result;
          if (result) {
            const data = new Uint8Array(result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const jsonData: (string | number)[][] = XLSX.utils.sheet_to_json(sheet, {
              header: 1,
            });

            if (jsonData.length > 2) {
              const dataRows = jsonData.slice(2);
              console.log(dataRows);
              const parsedQuestions: IQuestionData[] = dataRows.map((row) => ({
                "question-title": row[0] ? String(row[0]) : "",
                type:
                  row[1] !== undefined && row[1] !== null
                    ? parseInt(row[1].toString())
                    : 0,
                a: row[2] ? String(row[2]) : "",
                b: row[3] ? String(row[3]) : "",
                c: row[4] ? String(row[4]) : "",
                d: row[5] ? String(row[5]) : "",
                "correct-options": row[6] ? String(row[6]) : "0",
                "correct-ans": row[7] !== undefined ? Number(row[7]).toString() : "",
                marks: row[8] !== undefined ? parseInt(row[8].toString()) : 1,
              }));
              setQuestionData(parsedQuestions);
            }
          }
        };
        reader.readAsArrayBuffer(file);
      }
    } catch (error) {
      toast(
        <Toast heading="Please check uploaded file!" body={(error as Error).message} />,
      );
    }
  };

  const handleSubmit = () => {
    setQuestions((prev) => {
      const newQuestions: IQuestionRequest[] = questionData.map((question) => {
        return {
          answerText: question["correct-ans"] ?? "",
          correctOptions: question["correct-options"]
            .split(",")
            .map((char) => (char.trim().toLowerCase().charCodeAt(0) - 97).toString()),
          options: [
            { optionId: "0", text: question.a ?? "" },
            { optionId: "1", text: question.b ?? "" },
            { optionId: "2", text: question.c ?? "" },
            { optionId: "3", text: question.d ?? "" },
          ],
          questionId: uuidv4(),
          questionText: question["question-title"],
          questionType: question.type,
          marks: question.marks ?? 1,
        };
      });
      const updatedState = [...prev, ...newQuestions];
      return updatedState;
    });
    onClick();
  };

  const columns: GridColDef[] = [
    { field: "question-title", headerName: "Question Title", width: 200 },
    { field: "type", headerName: "Type", width: 100 },
    { field: "a", headerName: "Option A", width: 100 },
    { field: "b", headerName: "Option B", width: 100 },
    { field: "c", headerName: "Option C", width: 100 },
    { field: "d", headerName: "Option D", width: 100 },
    { field: "correct-options", headerName: "Correct Options", width: 150 },
    { field: "correct-ans", headerName: "Correct Answer", width: 120 },
    { field: "marks", headerName: "Marks", width: 120 },
  ];

  const rows: GridRowsProp = questionData.map((data, index) => ({
    id: index,
    ...data,
  }));

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md rounded-lg border bg-white text-gray-900">
        <div className="space-y-6 p-6">
          <form className="space-y-6" action="#">
            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Upload file
              </label>
              <div
                onClick={() => {
                  document.getElementById("fileInputFront")?.click();
                }}
                className="flex w-full items-center justify-between rounded-xl border p-3">
                <label className="cursor-pointer text-gray-900">Choose a file</label>
                <CloudUpload className="text-slate-300" />
              </div>
            </div>
            <input
              type="file"
              accept=".xlsx"
              id="fileInputFront"
              className="hidden"
              onChange={handleFileUpload}
            />
            {rows.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                style={{ accentColor: "white", backgroundColor: "white" }}
              />
            ) : null}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full rounded-lg border bg-[#960DF2] px-5 py-2.5 text-center text-xs font-medium text-white hover:bg-light">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
