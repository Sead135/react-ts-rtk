import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store";

/* Чтобы не писать постоянно один и тот же код */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector