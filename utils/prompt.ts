// debugPrompt.ts

export const DEBUG_PROMPT = {
  title: "Code Failure Analyzer",

  build: (
    problem: ReadableStream<Uint8Array<ArrayBuffer>> | null,
    code: ReadableStream<Uint8Array<ArrayBuffer>> | null,
    inputs: ReadableStream<Uint8Array<ArrayBuffer>> | null,
    expected: ReadableStream<Uint8Array<ArrayBuffer>> | null
  ) => `
You are an expert competitive programming judge and debugger.

Your job:
1. Analyze the user's code.
2. Simulate the code step-by-step.
3. Compare expected vs actual output.
4. Find the smallest test case where the code fails.
5. Explain the exact logical mistake.
6. Provide corrected code.

Rules:
- Be precise and strict.
- Do NOT guess.
- Only use logical simulation.

PROBLEM STATEMENT:
${problem}

USER CODE:
${code}

INPUTS:
${inputs}

EXPECTED OUTPUTS:
${expected}

Tasks:
- Show step-by-step simulation
- Failing test case
- Bug explanation
- Fixed code
`,
  
  config: {
    temperature: 0.1,
    maxOutputTokens: 2048,
    topP: 0.9
  }
};


// for language detection
export const LANGUAGE_DETECTOR_PROMPT = {
  content: `
You are a strict programming language detector.

OUTPUT RULES:
- Reply ONLY with valid JSON
- No markdown
- No code blocks
- No backticks
- No extra text

JSON FORMAT (must match exactly):
{"language":"<language>"}

Code:
  `
};
