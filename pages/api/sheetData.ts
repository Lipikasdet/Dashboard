import type { NextApiRequest, NextApiResponse} from 'next'
import { doc, getDoc } from 'firebase/firestore';
// import { auth } from '@/src/firebase/firebaseAuth';
import { db } from "./firebaseAdmin";

interface ProjectDetails {
    projectName: string;
    initialDate: string;
    client: string;
    manager: string;
  }
  
  interface SprintData {
    [key: string]: { [field: string]: string };
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      const { projectName } = req.query;
      console.log(projectName)
      
  
      if (!projectName) {
        res.status(400).json({ error: 'Missing projectName parameter' });
        return;
      }
  
      try {
        const projectRef = db.collection('projects').doc(projectName as string);
        const projectDoc = await projectRef.get();
  
        if (!projectDoc.exists) {
          res.status(404).json({ error: 'Project not found' });
          return;
        }
  
        const sprintCollection = await projectRef.collection('sprintData').listDocuments();
        const sprintData: SprintData = {};
        
  
        for (const sprintDoc of sprintCollection) {
            
          const sprintDataSnapshot = await sprintDoc.get();
          sprintData[sprintDoc.id] = sprintDataSnapshot.data() as { [column: string]: string };
        }
  
        res.status(200).json({ projectDetails: projectDoc.data(), sprintData });
      } catch (error) {
        console.error('Error fetching project data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }