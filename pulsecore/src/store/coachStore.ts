import { create } from "zustand";
import { api } from "@/lib/api/client";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  plan?: {
    title: string;
    steps: string[];
  };
  timestamp: Date;
}

interface CoachState {
  messages: ChatMessage[];
  isStreaming: boolean;
  streamingContent: string;

  // Actions
  sendMessage: (content: string, context?: Record<string, unknown>) => Promise<void>;
  clearChat: () => void;
}

export const useCoachStore = create<CoachState>((set, get) => ({
  messages: [
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey Athlete! I'm your AI Coach — ready to help with training, recovery, or nutrition questions. How can I help today?",
      timestamp: new Date(),
    },
  ],
  isStreaming: false,
  streamingContent: "",

  sendMessage: async (content, context) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, userMsg],
      isStreaming: true,
      streamingContent: "",
    }));

    try {
      // Build message history for API (last 10 messages)
      const history = get().messages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const stream = api.stream("/api/v1/coach/chat/", {
        messages: [...history, { role: "user", content }],
        context: context || {},
      });

      let fullContent = "";

      for await (const chunk of stream) {
        fullContent += chunk;
        set({ streamingContent: fullContent });
      }

      // Finalize — move streaming content to a permanent message
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: fullContent,
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, assistantMsg],
        isStreaming: false,
        streamingContent: "",
      }));
    } catch (error) {
      console.error("Coach streaming error:", error);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      set((state) => ({
        messages: [...state.messages, errorMsg],
        isStreaming: false,
        streamingContent: "",
      }));
    }
  },

  clearChat: () =>
    set({
      messages: [
        {
          id: "welcome",
          role: "assistant",
          content: "Chat cleared. How can I help you today?",
          timestamp: new Date(),
        },
      ],
      isStreaming: false,
      streamingContent: "",
    }),
}));
