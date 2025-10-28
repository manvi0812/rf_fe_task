import { getBoxes, saveBox } from "../api/boxService";

export const BoxController = {
  fetchAll: () => {
    return getBoxes();
  },
  addBox: (box) => {
    return saveBox(box);
  },
};
