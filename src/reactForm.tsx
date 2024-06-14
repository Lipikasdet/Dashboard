import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [fileDetails, setFileDetails] =
    useState<{ sheetName: string; data: string[][] }[]>();
  const onSubmit = (data: any) => {
    const { projectName, initialDate, manager, client } = data;
    axios.post("/api/getData", {
      projectName,
      initialDate,
      manager,
      client,
      fileDetails,
    });
    console.log(fileDetails, "submit");
    // Now you can use these variables for further processing
  };
  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const allSheetData: { sheetName: string; data: string[][] }[] = [];
      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const jsonSheet = XLSX.utils.sheet_to_json<string[]>(sheet, {
          header: 1,
        });
        allSheetData.push({ sheetName, data: jsonSheet });
      });
      setFileDetails(allSheetData);
      console.log(fileDetails, "fileDetails");
    };
    reader.readAsArrayBuffer(file);
  };
  // const inputValue = watch("manager", "ui");
  return (
    <div className="m-5 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="projectName">Project Name</label>
          <input
            id="projectName"
            {...register("projectName", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="initialDate">Initial Date</label>
          <input
            id="initialDate"
            type="date"
            {...register("initialDate", { required: true })}
          />
          {errors.lastName && <p className="error">Last name is required.</p>}
        </div>

        <div>
          <label htmlFor="manager">Manager</label>
          <input id="manager" {...register("manager")} />
        </div>
        <div>
          <label htmlFor="client">Client</label>
          <input
            id="client"
            {...register("client", {
              required: true,
            })}
          />
        </div>
        <div>
          <label htmlFor="file">Upload Files</label>
          <input
            id="file"
            type="file"
            {...register("excel", {
              required: true,
              onChange: fileHandler,
            })}
          />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}
