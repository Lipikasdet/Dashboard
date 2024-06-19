import { collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { firestore } from "../src/firebase/firebaseAuth";

// const database = getFirestore(firebase_app);
const Dashboard: React.FC = () => {
  const [fileDetails, setFileDetails] = useState<
    { sheetName: string; data: string[][] }[]
  >([]);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      sendToFirebase(allSheetData);
    };
    reader.readAsArrayBuffer(file);
  };
  // firebase store
  const sendToFirebase = async (
    data: { sheetName: string; data: string[][] }[]
  ) => {
    data.forEach(async (sheetData) => {
      try {
        const collectionRef = collection(
          firestore,
          "projects/project1/sprintData"
        );
        const docRef = doc(collectionRef, sheetData.sheetName);
        const columnData = sheetData.data[0];

        const formattedData = sheetData.data.slice(1).map((row, index) => {
          const obj: { [key: string]: string } = {};
          row.forEach((value, index) => {
            obj[`${columnData[index]}`] = value; // Assign eac   h value to a key like 'column_1', 'column_2', etc.
          });
          return obj;
        });

        await setDoc(docRef, { data: formattedData });

        console.log(sheetData.data, "Entire data");
        console.log(`Data for ${sheetData.sheetName} uploaded successfully.`);
      } catch (error) {
        console.error(
          `Error uploading data for ${sheetData.sheetName}:`,
          error
        );
      }
    });
  };
  return (
    <div>
      <h1>Please Upload the file</h1>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
    </div>
  );
};
export default Dashboard;
