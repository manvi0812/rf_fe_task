const STORAGE_KEY = "boxes";

export const getBoxes = () => {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
};

export const saveBox = (newBox) => {
    const boxes = getBoxes();
    const updated = [...boxes, newBox];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
};
