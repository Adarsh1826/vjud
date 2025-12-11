export const DEBUG_PROMPT = {
  title: "Code Failure Analyzer",

  build: (
    // problem: ReadableStream<Uint8Array<ArrayBuffer>> | null,
    code: ReadableStream<Uint8Array<ArrayBuffer>> | null,
    inputs: ReadableStream<Uint8Array<ArrayBuffer>> | null,
    expected: ReadableStream<Uint8Array<ArrayBuffer>> | null
  ) => `You are an expert competitive-programming judge and debugger. Analyze the *code itself* and the provided inputs/expected outputs. Do NOT rely on or invent any external problem statement — derive behavior only from the code and the tests provided.

Your mission (strict):
1. Read the code and infer the program's intended behavior only from the code and the tests. Do NOT invent an external problem description.
2. Exhaustively identify hidden and missing edge cases that the code fails to handle (including subtle numeric, empty, boundary, ordering, data-type, overflow, sign, and input-format edge cases).
3. For each edge case, explain *why* it matters (what part of the code or assumption would break) and how an attacker/tester/normal input could trigger it.
4. Find the smallest (minimal) failing test case for each failing edge case.
5. For the *most critical* failing case (or the smallest minimal failing test overall), show a full step-by-step logical simulation of the code's execution on that test (track variable values, branches taken, loops, and outputs).
6. Provide corrected code that fixes all demonstrated failures. Mark clearly which fixes address which edge cases.
7. Provide a concise but complete set of test cases (inputs + expected outputs) that together cover all discovered edge cases.

OUTPUT RULES (strict):
- Be precise and strict. Do NOT guess or hallucinate. If you must assume something, label it clearly under "ASSUMPTIONS".
- Only use logical simulation; do NOT execute code.
- Produce a structured report with the exact sections below and nothing extra.
- When showing code, include language and full corrected source.

REPORT FORMAT (must include all sections, in this order):
1) ASSUMPTIONS — explicit, numbered. (If none, write "None".)
2) INFERRED BEHAVIOR — 2–4 sentence summary derived from the code.
3) INFERRED INPUT DOMAIN & CONSTRAINTS — list exact input formats, ranges, types that the code expects (derived from parsing, casts, loops, arrays, etc.).
4) ALL MISSING / HIDDEN EDGE CASES — numbered list. For each:
   - Short title
   - Why it fails (point to exact code lines/logic)
   - Minimal failing test input
   - Severity (low/medium/high)
5) MINIMAL FAILING TESTS — table-like list of failing tests (input and actual vs expected outputs). For each, provide the smallest test that exposes the bug.
6) DETAILED SIMULATION — for the single most important minimal failing test: show step-by-step state changes (variables, loop counters, conditions), and final output produced by the code.
7) BUG EXPLANATION — precise, language-level/logical explanation of root cause(s). No handwavy statements.
8) FIXED CODE — full corrected code (specify language at top). Annotate changed lines with short comments linking them to edge cases they fix.
9) TEST SUITE — a compact set of tests (input -> expected output) that, when run, will validate the fix and cover all edge cases listed. Mark which test covers which edge case.
10) CONFIDENCE & NOTES — short note about confidence level (low/medium/high) and any remaining assumptions that could affect correctness.

USER CODE:
${code}

INPUTS (raw):
${inputs}

EXPECTED OUTPUTS (raw):
${expected}

Strict final instruction: If ANY behavior cannot be proven from the code and supplied tests, explicitly list it under ASSUMPTIONS and do not use it to justify edge cases or fixes.
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
