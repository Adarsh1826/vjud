import { load } from "cheerio";

export async function POST(req: Request) {
  const { url } = await req.json();

  const res = await fetch(url, {
  headers: {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/121.0",
  "Accept": "text/html",
  "Accept-Language": "en-US,en;q=0.9",
},

    cache: "no-store",
  });

  const html = await res.text();
  const $ = load(html);

  const statement = $(".problem-statement").text().replace(/\s+/g, " ").trim();

  const inputs: string[] = [];
  const outputs: string[] = [];

  $(".sample-test .input pre").each((_, el) => {
    inputs.push($(el).text().trim());
  });

  $(".sample-test .output pre").each((_, el) => {
    outputs.push($(el).text().trim());
  });

  return Response.json({
    statement,
    inputs,
    outputs,
  });
}
