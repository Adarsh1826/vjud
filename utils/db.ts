import { TemplateProps } from "@/types";
import { openDB } from "idb";

export async function connectDB(){
    return await openDB('codedb',1,{
        upgrade(db){
            if(!db.objectStoreNames.contains("template")){
                db.createObjectStore("template",{keyPath:"id"})
            }
        }
    })
}

export const addTemplateToDB = async ({template}:TemplateProps)=>{
    const db = await connectDB()
        const id = Date.now();

    db.put("template",{
        id,
        template
    })
}

export const getallDBData = async ()=>{
    const db = await connectDB()

   const res = await db.getAll("template")
    console.log(res)
}