import axios from "axios";
import { CodeSubmitInterface } from "@/types";
import { setOutputValue, setPassed, updateTestCase } from "@/store/slice";
import { store } from "@/store/store";
import checkTestCasePassed from "@/utils/correct";

export const handleSubmit = async ({
  source_code,
  language_id,
  stdin,
  exp,
  id, // optional test case id
}: CodeSubmitInterface & { id?: number }) => {
  try {
    const res = await axios.post(process.env.NEXT_PUBLIC_URI!, {
      source_code,
      language_id,
      stdin,
    });

    if (res.data) {
      
      const out =
        res.data.stdout ||
        res.data.stderr ||
        res.data.compile_output ||
        "No output";

      
      const passed = checkTestCasePassed({
        exp: exp || "",
        out: out || "",
      });

     
      if (id) {
        store.dispatch(updateTestCase({ id, field: "output", value: out }));
        store.dispatch(updateTestCase({ id, field: "passed", value: passed }));
      } else {
        store.dispatch(setOutputValue(out));
      }

     
      store.dispatch(setPassed(passed));

      return { output: out, passed };
    }
  } catch (error) {
    console.error("Code execution failed", error);

    const errorOutput = "Error executing code";

    if (id) {
      store.dispatch(updateTestCase({ id, field: "output", value: errorOutput }));
      store.dispatch(updateTestCase({ id, field: "passed", value: false }));
    } else {
      store.dispatch(setOutputValue(errorOutput));
    }

    store.dispatch(setPassed(false));

    return { output: errorOutput, passed: false };
  }
};
