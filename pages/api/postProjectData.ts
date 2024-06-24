import { NextApiRequest, NextApiResponse } from "next";
import { db } from "./firebaseAdmin";
import { field_Value } from "./firebaseAdmin";
export default async function GetData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { projectName, initialDate, client, managers, fileDetails } =
      req.body;
    const projectDetails = { projectName, initialDate, client, managers };
    try {
      const projectRef = db.collection("projects").doc(projectName);
      await projectRef.set(projectDetails);
      // To update manager projects array in their respective collection of manager email
      managers.forEach(async (item: any) => {
        const managerRef = await db.collection(item.email).doc("employeeData");
        await managerRef.update({
          projects: field_Value.arrayUnion(projectName),
        });
      });
      //To add sprint Data and sheet data in form of documents
      fileDetails.forEach(async (sheetData: any) => {
        try {
          const columnData = sheetData.data[0];
          var sprintDataInObject: any = {};
          const formattedData = sheetData.data
            .slice(1)
            .map((row: any, index: any) => {
              const obj: { [key: string]: string } = {};
              row.forEach((value: any, index: any) => {
                obj[`${columnData[index]}`] = value;
              });
              sprintDataInObject[`${obj.Sprint}`] = obj;
              return obj;
            });
          await projectRef
            .collection("sprintData")
            .doc(sheetData.sheetName)
            .set(sprintDataInObject);
        } catch (error) {
          console.error(
            `Error uploading data for ${sheetData.sheetName}:`,
            error
          );
        }
      });
      res.status(200).json("data added successfully");
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }
}
