import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import Select from "react-select";
export default function Form({
  managerList,
  companyName,
}: {
  managerList: any;
  companyName: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedManagers, setSelectedManagers] = useState<any>();

  const handleChange = (selected: any) => {
    setSelectedManagers(selected);
  };
  const [fileDetails, setFileDetails] =
    useState<{ sheetName: string; data: string[][] }[]>();
  const onSubmit = (data: any) => {
    const { projectName, initialDate, client } = data;
    const modifiedList: any = [];
    selectedManagers.map((item: any) =>
      modifiedList.push({ email: item.value, name: item.label })
    );
    console.log(modifiedList);
    axios.post("/api/postProjectData", {
      projectName,
      initialDate,
      managers: modifiedList,
      client,
      fileDetails,
      companyName,
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
    <div className="w-[50%] m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formElement">
          <label htmlFor="projectName">Project Name</label>
          <input
            required
            id="projectName"
            {...register("projectName", { required: true })}
          />
        </div>

        <div className="formElement">
          <label htmlFor="initialDate">Initial Date</label>
          <input
            required
            id="initialDate"
            type="date"
            {...register("initialDate", { required: true })}
          />
        </div>

        <div className="formElement">
          <label htmlFor="client">Client</label>
          <input
            required
            id="client"
            {...register("client", {
              required: true,
            })}
          />
        </div>
        <div className="formElement">
          <label htmlFor="file">Upload Files</label>
          <input
            required
            id="file"
            type="file"
            {...register("excel", {
              required: true,
              onChange: fileHandler,
            })}
          />
        </div>
        <div>
          <label className="font-semibold">Select Managers</label>
          <Select
            isMulti
            required
            className="flex flex-col font-semibold"
            id="managers"
            value={selectedManagers}
            onChange={handleChange}
            options={managerList}
          />
        </div>

        <input type="submit" className="cursor-pointer m-5" />
      </form>
    </div>
  );
}
