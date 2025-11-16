import { create } from 'zustand';
import { Document, mockDocuments } from '../data/mockData';

interface DocumentsState {
  documents: Document[];
  selectedDocument: Document | null;
  isGenerating: boolean;
  generationProgress: number;
  setSelectedDocument: (document: Document | null) => void;
  addDocument: (document: Document) => void;
  generateDocument: (loadId: string, type: Document['type']) => Promise<void>;
}

export const useDocumentsStore = create<DocumentsState>((set, get) => ({
  documents: mockDocuments,
  selectedDocument: null,
  isGenerating: false,
  generationProgress: 0,

  setSelectedDocument: (document) => set({ selectedDocument: document }),

  addDocument: (document) => {
    set((state) => ({
      documents: [document, ...state.documents],
    }));
  },

  generateDocument: async (loadId: string, type: Document['type']) => {
    set({ isGenerating: true, generationProgress: 0 });

    // Simulate document generation with progress
    const steps = 15;
    for (let i = 0; i <= steps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 120));
      set({ generationProgress: (i / steps) * 100 });
    }

    // Create new document
    const newDoc: Document = {
      id: `doc_${Date.now()}`,
      name: `${type.toUpperCase()} - ${loadId}`,
      type,
      loadId,
      date: new Date().toISOString(),
      size: `${Math.floor(Math.random() * 300 + 100)} KB`,
    };

    set((state) => ({
      documents: [newDoc, ...state.documents],
      isGenerating: false,
      generationProgress: 100,
    }));

    // Reset progress
    setTimeout(() => {
      set({ generationProgress: 0 });
    }, 1000);
  },
}));
