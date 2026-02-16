import { create } from "zustand";

type lmQueryStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const uselmQuery = create<lmQueryStore>((set) => ({
    isOpen: false,
    onOpen: () => set ({ isOpen: true }),
    onClose: () => set({ isOpen: false}),
}));