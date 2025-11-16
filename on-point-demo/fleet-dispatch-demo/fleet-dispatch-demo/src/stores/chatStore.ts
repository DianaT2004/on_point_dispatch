import { create } from 'zustand';
import { ChatMessage, mockChatMessages } from '../data/mockData';

interface ChatState {
  messages: ChatMessage[];
  isSending: boolean;
  isTyping: boolean;
  sendMessage: (message: string) => Promise<void>;
  markAsRead: (messageId: string) => void;
  simulateIncomingMessage: (sender: ChatMessage['sender'], senderName: string, message: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: mockChatMessages,
  isSending: false,
  isTyping: false,

  sendMessage: async (message: string) => {
    set({ isSending: true });

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'driver',
      senderName: 'You',
      message,
      timestamp: new Date().toISOString(),
      read: true,
    };

    // Simulate sending delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    set((state) => ({
      messages: [...state.messages, newMessage],
      isSending: false,
    }));

    // Simulate response after a delay (for demo purposes)
    setTimeout(() => {
      set({ isTyping: true });
    }, 1000);

    setTimeout(() => {
      const responses = [
        'Got it! I will update the dispatch team.',
        'Thanks for the update. Everything looks good on our end.',
        'Roger that. Safe travels!',
        'Confirmed. We will notify the receiver.',
      ];
      
      const responseMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        sender: 'dispatch',
        senderName: 'Central Dispatch',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
        read: false,
      };

      set((state) => ({
        messages: [...state.messages, responseMessage],
        isTyping: false,
      }));
    }, 2500);
  },

  markAsRead: (messageId: string) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, read: true } : msg
      ),
    }));
  },

  simulateIncomingMessage: (sender, senderName, message) => {
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender,
      senderName,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
}));
