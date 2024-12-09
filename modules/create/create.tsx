"use client";

import * as XLSX from "xlsx";
import { useState } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { CloudUpload } from "@mui/icons-material";
import { IQuestionData } from "@/lib/types";
import { toast } from "react-toastify";
import { Toast } from "@/lib/components/toast/toast";

export const Create = () => {
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
              const parsedQuestions: IQuestionData[] = dataRows.map((row) => ({
                "question-title": row[0] ? String(row[0]) : "",
                type: row[1] !== undefined && row[1] !== null ? String(row[1]) : "",
                a: row[2] ? String(row[2]) : "",
                b: row[3] ? String(row[3]) : "",
                c: row[4] ? String(row[4]) : "",
                d: row[5] ? String(row[5]) : "",
                "correct-options": row[6] ? String(row[6]) : "",
                "correct-ans": row[7] !== undefined ? Number(row[7]).toString() : "",
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

  const columns: GridColDef[] = [
    { field: "question-title", headerName: "Question Title", width: 200 },
    { field: "type", headerName: "Type", width: 100 },
    { field: "a", headerName: "Option A", width: 100 },
    { field: "b", headerName: "Option B", width: 100 },
    { field: "c", headerName: "Option C", width: 100 },
    { field: "d", headerName: "Option D", width: 100 },
    { field: "correct-options", headerName: "Correct Options", width: 150 },
    { field: "correct-ans", headerName: "Correct Answer", width: 120 },
  ];

  const rows: GridRowsProp = questionData.map((data, index) => ({
    id: index,
    ...data,
  }));

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md rounded-lg border-2 border-[#1b1b1b] bg-[#151515]">
        <div className="space-y-6 p-6">
          <form className="space-y-6" action="#">
            <div>
              <label className="mb-2 block font-medium text-[#b2b2b2]">
                Upload file
              </label>
              <div
                onClick={() => {
                  document.getElementById("fileInputFront")?.click();
                }}
                className="flex w-full items-center justify-between rounded-xl border-2 border-[#333333] bg-[#282828] p-3">
                <label className="cursor-pointer text-[#b2b2b2]">
                  Upload file or take a photo
                </label>
                <CloudUpload className="text-slate-300" />
              </div>
            </div>
            <input
              type="file"
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
              className="w-full rounded-lg border-2 border-[#333333] bg-[#282828] px-5 py-2.5 text-center text-xs font-medium text-[#b2b2b2] hover:bg-[#212121]">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
