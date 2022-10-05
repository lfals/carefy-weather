import { atom } from "recoil";
import { ICity } from "../types/city.type";

const cityAtom = atom({
    key: 'cityAtom',
    default: {} as ICity,
});

export default cityAtom