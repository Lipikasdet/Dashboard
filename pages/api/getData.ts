import { NextApiRequest,NextApiResponse } from "next";
import { db } from "./firebaseAdmin";
export default async function GetData(req:NextApiRequest,res:NextApiResponse){
  if(req.method=='GET'){
    try{   
    const docRef = db.collection('projects/lt/sprintData').doc("Defect Leak to production");
    const docSnap = await docRef.get();
if (docSnap.exists) {
res.status(200).json(docSnap.data())
}
else {
console.log("No such document!");
}  
}catch(error){
    console.error(error)
    res.status(400).json(error)
}
  }
  if(req.method=='POST'){
    const {projectName,initialDate,client,manager,fileDetails}=req.body;
    const projectDetails={projectName,initialDate,client,manager};
    try{   
    const projectRef   = db.collection('sdet/companyDetails/projects').doc(projectName);
    // const projectRef=db.collection("sdet").doc("projects").
    await projectRef.set(projectDetails)
       

    fileDetails.forEach(async (sheetData:any) => {
      try {
       

        const columnData = sheetData.data[0];
        var sprintDataInObject: any = {};
        const formattedData = sheetData.data.slice(1).map((row:any, index:any) => {
          const obj: { [key: string]: string } = {};
          row.forEach((value:any, index:any) => {
            obj[`${columnData[index]}`] = value; 
          });
          sprintDataInObject[`${obj.Sprint}`] = obj;

          return obj;
        
        });

        await projectRef.collection('sprintData').doc(sheetData.sheetName).set(
         sprintDataInObject
        )
  
        
        console.log(sheetData.data, "Entire data");
        console.log(`Data for ${sheetData.sheetName} uploaded successfully.`);
      } catch (error) {
        console.error(
          `Error uploading data for ${sheetData.sheetName}:`,
          error
        );
      }
    })


 
}catch(error){
    console.error(error)
    res.status(400).json(error)

} 
}
}