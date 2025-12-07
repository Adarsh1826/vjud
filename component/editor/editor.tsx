"use client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { languageArray, boilerPlate } from "@/constant";
import { handleSubmit } from "../../calls";
import { useSelector } from "react-redux";
import { store } from "@/store/store";
import { setInputValue, setExpectedOutput, addTestCase, removeTestCase, updateTestCase, setPassed } from "@/store/slice";
import { AppDispatch, RootState } from "@/store/store";
import { MultipleTestCaseProps } from "@/types";
import { getallDBData,addTemplateToDB } from "@/utils/db";
const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
);
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);
const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);
const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
);

export default function CodeEditor() {
    const [lang, setLang] = useState(languageArray[0].value);
    const [language_id, setLanguageId] = useState<number | null>(languageArray[0].language_id);

    const code = boilerPlate.find((b) => b.language === lang)?.code || "";
    const [editorCode, setEditorCode] = useState("");

    // For multiple test cases
    const data = useSelector((state: RootState) => state.multtest);

    const addNewTestCase = () => {
        const newId = Date.now();
        store.dispatch(
            addTestCase({
                id: newId,
                input: "",
                expectedoutput: "",
                output: "",
            })
        );
    };

    const runTestCase = async (tc: MultipleTestCaseProps) => {
        if (!tc.id) return;
        await handleSubmit({
            source_code: editorCode,
            language_id,
            stdin: tc.input,
            exp: tc.expectedoutput,
            id: tc.id,
        });
    };

   

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-blue-500/30 overflow-auto">
            <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
                {/* --- Header --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 backdrop-blur-sm shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                            <CodeIcon />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-zinc-100 tracking-tight">WA</h2>
                            <p className="text-xs text-zinc-500">Select language and write your solution</p>
                        </div>
                    </div>

                    <div className="w-full md:w-auto">
                        <div className="relative group w-full md:w-56">
                            <select
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    setLang(selectedValue);
                                    languageArray.forEach((l) => {
                                        if (l.value === selectedValue) setLanguageId(l.language_id);
                                    });
                                }}
                                className="w-full appearance-none bg-zinc-900 text-sm text-zinc-300 px-4 py-2.5 pr-10 rounded-lg border border-zinc-700 hover:border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none cursor-pointer shadow-sm"
                            >
                                {languageArray.map((lang) => (
                                    <option key={lang.id} value={lang.value}>
                                        {lang.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-zinc-400">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Editor --- */}
                <div className="relative rounded-xl border border-zinc-800 overflow-hidden shadow-2xl bg-[#1e1e1e]">
                    <Editor
                        height="60vh"
                        language={lang}
                        value={code}
                        theme={"vs-dark"}
                        onChange={(value) => setEditorCode(value || "")}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            padding: { top: 20 },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            fontFamily: "'Fira Code', 'Consolas', monospace",
                        }}
                    />
                </div>

                {/* --- Test Cases --- */}
                <div className="space-y-4 pt-4">
                    <div className="flex justify-between items-center px-1">
                        <div className="flex items-center gap-2">
                            <span className="h-5 w-1 bg-blue-500 rounded-full"></span>
                            <h3 className="text-lg font-semibold text-zinc-100">Test Cases</h3>
                        </div>
                        <button
                            onClick={addNewTestCase}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 hover:text-white text-zinc-400 rounded-md text-xs font-medium border border-zinc-700 transition-colors"
                        >
                            <PlusIcon />
                            Add Case
                        </button>
                    </div>

                    <div className="space-y-4">
                        {data.map((tc, i) => (
                            <div key={tc.id} className={`relative group border rounded-xl p-5 transition-all shadow-sm
    ${tc.passed === true ? "border-green-500/70 bg-green-900/20" : ""}
    ${tc.passed === false ? "border-red-500/70 bg-red-900/20" : ""}
    ${tc.passed === undefined ? "border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700" : ""}
  `}>
                                <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-800/50">
                                    <span className="text-xs font-mono bg-zinc-800/80 px-2 py-1 rounded text-zinc-400 border border-zinc-700/50">
                                        Case {i + 1}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => runTestCase(tc)}
                                            className="flex items-center gap-1.5 bg-zinc-700 hover:bg-green-500 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all active:scale-95 border border-zinc-700"
                                        >
                                            <PlayIcon />
                                            Run
                                        </button>
                                        <button
                                            onClick={() => store.dispatch(removeTestCase(tc.id!))}
                                            className="text-zinc-500 hover:text-red-400 p-1.5 rounded-md hover:bg-red-500/10 transition-colors"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Input</label>
                                        <textarea
                                            value={tc.input}
                                            onChange={(e) => store.dispatch(updateTestCase({ id: tc.id!, field: "input", value: e.target.value }))}
                                            className="w-full bg-zinc-950 text-sm font-mono text-zinc-300 p-3 rounded-lg border border-zinc-800 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all h-[100px] resize-none placeholder:text-zinc-700 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
                                        ></textarea>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Expected Output</label>
                                        <textarea
                                            value={tc.expectedoutput}
                                            onChange={(e) => store.dispatch(updateTestCase({ id: tc.id!, field: "expectedoutput", value: e.target.value }))}
                                            className="w-full bg-zinc-950 text-sm font-mono text-zinc-300 p-3 rounded-lg border border-zinc-800 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all h-[100px] resize-none placeholder:text-zinc-700 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
                                        ></textarea>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Actual Output</label>
                                        <div className={`w-full bg-black text-sm font-mono p-3 rounded-lg border border-zinc-800 h-[100px] overflow-auto whitespace-pre scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent ${tc.output ? "text-zinc-200" : "text-zinc-600 italic"}`}>
                                            {tc.output || "Run code to see output..."}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
