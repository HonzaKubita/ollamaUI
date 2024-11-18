import type { OllamaModel, OllamaResponse } from "~/types/ollama";

const API_PORT = 11434;
const BASE_URL = `${window.location.protocol}//${window.location.hostname}:${API_PORT}`;

console.log(BASE_URL);

export default class OllamaApi {
  static async getLocalModels(): Promise<OllamaModel[]> {
    const response = await fetch(`${BASE_URL}/api/tags`);
    const responseJson = await response.json();
    return responseJson.models as OllamaModel[];
  }

  static async isServeRunning(): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}`);
      const responseText = await response.text();
      return responseText  == 'Ollama is running';
    }
    catch (error) {
      return false
    }
  }

  static async generateStream(model: string, prompt: string): Promise<ReadableStream<Uint8Array>> {
    const response = await fetch(`${BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        model,
        prompt
      })
    });

    if (!response.body) {
      throw new Error('Failed to generate text');
    }

    return response.body;
  }

  static async generateText(model: string, prompt: string, prevContext: number[] | undefined = []): Promise<OllamaResponse> {
    const apiResponse = await fetch(`${BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        model,
        prompt,
        stream: false,
        context: prevContext
      })
    });

    const json = await apiResponse.json();

    const response = json.response as string; 
    const context = json.context as number[];

    return { response, context };
  }
}