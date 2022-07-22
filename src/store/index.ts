import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { githubApi } from "./github/github.api";
import { githubReducer } from "./github/github.slice";

export const store = configureStore({
  /* Перечисление всех редюсеров приложения */
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReducer
  },

  /* Работа с кэшем, автоматическим рефрешем... */
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware)
})

/* Настраиваем слушатель активности */
setupListeners(store.dispatch)

/* Кастомные типы для понимания, какие данные находятся в хранилище */
export type RootState = ReturnType<typeof store.getState>