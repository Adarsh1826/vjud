import axios from "axios";
import { CodeSubmitInterface } from "@/types";
import { setOutputValue } from "@/store/slice";
import { store } from "@/store/store";
export const handleSubmit = async ({source_code,language_id,stdin}:CodeSubmitInterface) => {
        
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
            
            
        }
};