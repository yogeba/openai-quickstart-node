// pages/api/generate.js
import { fetchHealthData, generatePrompt } from "../../lib/openai";

import { OpenAIStream } from "../../lib/OpenAIStream";

export const config = {
  runtime: "edge",
};

const handler = async (req) => {
  const { health } = await req.json();
  const payload = {
    model: "text-davinci-003",
    prompt: generatePrompt(health),
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2048,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  console.log(stream);
  return new Response(stream);
};

export default handler;
