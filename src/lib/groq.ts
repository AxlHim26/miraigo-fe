import Groq from "groq-sdk";

export const getGroqModel = () => process.env["GROQ_MODEL"]?.trim() || "openai/gpt-oss-120b";

let _client: Groq | null = null;

export const groq = () => {
  if (!_client) {
    const apiKey = process.env["GROQ_API_KEY"];
    if (!apiKey) {
      throw new Error("Missing GROQ_API_KEY");
    }
    _client = new Groq({ apiKey });
  }
  return _client;
};
