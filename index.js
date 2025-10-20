import fetch from "node-fetch";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const newsUrl = body.url;

    if (!newsUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Please provide a URL" }),
      };
    }

    const res = await fetch(`https://r.jina.ai/${newsUrl}`);
    if (!res.ok) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Failed to extract article text" }),
      };
    }

    const articleText = await res.text();
    const prompt = `Summarize the following news article in 3 concise sentences:\n\n${articleText.slice(
      0,
      8000
    )}`;

    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary: completion.output_text.trim() }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
