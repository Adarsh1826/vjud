"use client"
import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { languageArray, boilerPlate } from "@/constant"
import { handleSubmit } from "../../calls"
import { useSelector } from "react-redux"
import { store } from "@/store/store"
import { setInputValue, setExpectedOutput } from "@/store/slice"
import { AppDispatch, RootState } from "@/store/store"
export default function CodeEditor(

) {
    const [lang, setLang] = useState(languageArray[0].value)
    const [language_id, setLanguageId] = useState<number | null>(languageArray[0].language_id);

    const code = boilerPlate.find((b) => b.language === lang)?.code || ""

    const [editorCode, setEditorCode] = useState("")

    const output = useSelector((state: RootState) => state.output);

    const inputCheck = useSelector((state: RootState) => state.input)

    const exp = useSelector((state: RootState) => state.expectedOutput)

    //const [passed, setPassed] = useState<boolean | undefined>();
    const result = useSelector((state: RootState) => state.testcase)


    const [count, setCount] = useState(0)

    return (
        <div className="p-4">
            <select
                onChange={(e) => {
                    const selectedValue = e.target.value;

                    setLang(selectedValue);

                    const l = languageArray.map((lang) => {
                        if (lang.value === selectedValue) setLanguageId(lang.language_id)
                    })
                }}

            >
                {
                    languageArray.map((lang) => (
                        <option key={lang.id} value={lang.value} className="bg-black">
                            {lang.label}
                        </option>
                    ))
                }
            </select>

            <Editor
                height="60vh"
                language={lang}
                value={code}
                theme={"vs-dark"}
                onChange={(value) => { setEditorCode(value || "") }}
            />

            <div className="flex gap-4 mt-3">
                {/* <button
                    //onClick={handleCompile}
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-sm"
                >
                    Compile
                </button> */}

                <button
                    onClick={async () => {
                        handleSubmit({
                            source_code: editorCode,
                            language_id,
                            stdin: inputCheck,
                            exp
                        });


                    }}
                    className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                >
                    Run
                </button>

            </div>
            <div className="grid grid-cols-3 mt-4 gap-2">
                <div className="grid grid-cols-1">
                    <p>Input</p><button

                        onClick={() => {
                            setCount(count + 1)
                        }}
                    >add exta</button>
                    <textarea name="" id="" className="bg-zinc-900 h-[100px]" onChange={(e) => {
                        store.dispatch(setInputValue(e.target.value))
                    }} ></textarea>
                    
                   
                    {Array.from({ length: count }).map((_, idx) => (
                        <textarea
                            key={idx}
                            className="bg-zinc-800 h-[100px]"
                            placeholder={`Extra input ${idx + 1}`}
                        ></textarea>
                    ))}


                </div>
                <div className="grid grid-cols-1">
                    <p>Expected Output</p>
                    <textarea name="" id="" className="bg-zinc-900 h-[100px]" onChange={(e) => {
                        store.dispatch(setExpectedOutput(e.target.value))
                    }} ></textarea>
                    {Array.from({ length: count }).map((_, idx) => (
                        <textarea
                            key={idx}
                            className="bg-zinc-800 h-[100px]"
                            placeholder={`Extra outputt ${idx + 1}`}
                        ></textarea>
                    ))}

                </div>
                <div className="grid grid-cols-1">
                    <p>Output</p>
                    <div className=" bg-zinc-900 text-white p-3 rounded-md  h-[100px] overflow-auto whitespace-pre">
                        {output}
                    </div>

                </div>

            </div>
            {result !== null && (
                result ? (
                    <div className="mt-4 px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow">
                        Passed
                    </div>
                ) : (
                    <div className="mt-4 px-4 py-2 rounded-lg bg-red-700 text-white font-semibold shadow">
                        Failed
                    </div>
                )
            )}

        </div>
    )
}
