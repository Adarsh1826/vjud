"use client"
// i will get the expected output and output here
import { TestCaseProps } from "@/types"


export default function checkTestCasePassed({ exp, out }: TestCaseProps) {
     if (!exp?.trim() || !out?.trim()) return false;
    const expLines = exp.trim().split("\n").map(s => s.trim());
    const outLines = out.trim().split("\n").map(s => s.trim());
    return JSON.stringify(expLines) === JSON.stringify(outLines) 
}
