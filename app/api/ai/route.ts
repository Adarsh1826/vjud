import { DEBUG_PROMPT } from "@/utils/prompt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { problem, code, inputs, expected } = await req.json();

    if (!problem || !code) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prompt = DEBUG_PROMPT.build(problem, code, inputs || "", expected || "");

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          // generationConfig: {
          //   temperature: 0.1,
          //   maxOutputTokens: 2048,
          // },
        }),
      }
    );

    const data = await res.json();

    return NextResponse.json({ data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
