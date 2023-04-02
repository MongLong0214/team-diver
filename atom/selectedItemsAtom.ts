
import { atom } from "recoil";

export const selectedItemsAtom = atom<string[]>({
    key: "selectedItemsAtom",
    default: [],
});

