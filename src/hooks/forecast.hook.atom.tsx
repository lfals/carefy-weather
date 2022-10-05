import { atom } from "recoil";
import { IDailyForecast } from "../types/daily-forecast";

const forecastAtom = atom({
    key: 'forecastAtom',
    default: {} as IDailyForecast,
});

export default forecastAtom