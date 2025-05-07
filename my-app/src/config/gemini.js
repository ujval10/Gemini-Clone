import { GoogleGenAI } from '@google/genai';

// ⚠️ Use .env or a secure place for your API key
const API_KEY = 'AIzaSyA9UVYbWvGqtLiN-YpvlyxJFyfoqMK_6Lc';
const MODEL_NAME = 'gemini-2.5-pro-exp-03-25';

async function runChat(prompt) {
  const ai = new GoogleGenAI({
    apiKey: API_KEY,
  });

  const config = {
    responseMimeType: 'text/plain',
  };

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  try {
    const response = await ai.models.generateContentStream({
      model: MODEL_NAME,
      config,
      contents,
    });

    let finalText = '';
    for await (const chunk of response) {
      if (chunk.text) {
        finalText += chunk.text;
      }
    }

    console.log(finalText);
    return finalText;
  } catch (error) {
    console.error('Error:', error);
    throw error; // also throw so the caller can handle it
  }
}

export default runChat;
