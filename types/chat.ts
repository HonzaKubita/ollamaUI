export interface ChatMessage {
  sender: "USER" | "MODEL",
  stream?: ReadableStream<Uint8Array> | null,
  text: string | null,
  context?: number[],
}