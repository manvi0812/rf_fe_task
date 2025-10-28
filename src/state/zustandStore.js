import { create } from "zustand";
import { BoxController } from "../controllers/boxController";

export const useBoxStore = create((set, get) => ({
  boxes: [],
  loadBoxes: () => {
    const all = BoxController.fetchAll();
    set({ boxes: all });
  },
  addBox: (box) => {
    const updated = BoxController.addBox(box);
    set({ boxes: updated });
  },
}));
