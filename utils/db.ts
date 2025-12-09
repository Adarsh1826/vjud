import { TemplateProps } from "@/types";
import { openDB } from "idb";

export async function connectDB() {
  return await openDB("codedb", 2, {   
    upgrade(db) {
      if (!db.objectStoreNames.contains("template")) {
        const store = db.createObjectStore("template", { keyPath: "id" });

       
        store.createIndex("language", "language", { unique: false });
      }
    },
  });
}


export const addTemplateToDB = async ({ template, language }: TemplateProps) => {
  const db = await connectDB();
  const id = Date.now();

  const record = {
    id,
    template,
    language,        
    createdAt: Date.now(),
  };

  await db.put("template", record);
  return record;
};


export const getallDBData = async ()=>{
    const db = await connectDB()

   const res = await db.getAll("template")
    console.log(res)
    return res;
}