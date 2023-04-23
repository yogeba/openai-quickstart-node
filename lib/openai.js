// lib/openai.js
import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.OPENAI_API_KEY || "";

const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

export async function fetchHealthData(health) {
  if (!apiKey) {
    throw new Error(
      "OpenAI API key not configured, please follow instructions in README.md"
    );
  }

  if (health.trim().length === 0) {
    throw new Error(
      "Please enter a valid Health Condition, Symptom, Disease, or Supplement"
    );
  }

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(health),
    temperature: 0,
    max_tokens: 1000,
  });

  return completion.data.choices[0].text;
}

function generatePrompt(health) {
  return `
answer the following questions about ${health} in an array of JSON objects:

What is ${health}?
What are the main signs and symptoms of ${health}?
How is ${health} diagnosed?
What are some of the main medical treatments for ${health}?
Have any supplements been studied for ${health}?
How could diet affect ${health}?
Are there any other treatments for ${health}?
What causes ${health}?
The latest research on ${health}?
List 10 supplements for ${health} `;
}

export { generatePrompt };
