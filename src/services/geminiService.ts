import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const generateCreativePrompt = async (topic: string) => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a highly creative and unique writing or design prompt about: ${topic}. 
    The response should be structured with a Title, a Description, and 3 specific 'Spark' points to get started. 
    Format the output in Markdown.`,
  });

  return response.text;
};
