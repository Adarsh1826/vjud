import axios from "axios";
import { CodeSubmitInterface } from "@/types";
import { setOutputValue ,setPassed} from "@/store/slice";
import { store } from "@/store/store";
import checkTestCasePassed from "@/utils/correct";
export const handleSubmit = async ({source_code,language_id,stdin,exp,output}:CodeSubmitInterface) => {
   
        const res = await axios.post(
            process.env.NEXT_PUBLIC_URI!,
            {
                source_code:source_code,
                language_id: language_id,
                stdin: stdin
            }
        );

        if (res.data) {
            const out =
                res.data.stdout ||
                res.data.stderr ||
                res.data.compile_output ||
                "No output";

           
            store.dispatch(setOutputValue(out))

            const r = checkTestCasePassed({
                exp:exp || "",
                out:out || ""
            })
            
            if(r){
                store.dispatch(setPassed(true))
            }
            else store.dispatch(setPassed(false))
            
            
     }
};