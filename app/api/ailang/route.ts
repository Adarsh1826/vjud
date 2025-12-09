import { NextResponse } from "next/server";
import { LANGUAGE_DETECTOR_PROMPT } from "@/utils/prompt";

export async function POST(req: Request) {
  try {
    
    const { code } = await req.json();

    if (!code?.trim()) {
      return NextResponse.json(
        { error: "Code is required" },
        { status: 400 }
      );
    }

    const prompt = `${LANGUAGE_DETECTOR_PROMPT.content}\n${code}`;

   
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        //   generationConfig: {
        //     temperature: 0.1,
        //     maxOutputTokens: 2048,
        //   },
        }),
      }
    );

    const data = await res.json();

   
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      result = { language: "Unknown" };
    }

    return NextResponse.json(result);
  } catch (error) {
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
