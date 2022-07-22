import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { IRepo, IUser, ServerResponse } from "../../models/models"

/* Работа с данными по Api */
export const githubApi = createApi({
  /* Путь к закешированным данным */
  reducerPath: "github/api",

  /* Базовый адрес к данным */
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/"
  }),

  /* Продублируем обновление данных при возобновлении активности */
  refetchOnFocus: true,

  endpoints: build => ({
    /* query - для получения данных, mutation – для изменения данных */
    /* В качестве Дженериков передаем: 1. Что получаем в ответ... 2. Какой параметр хотим принимать */
    searchUsers: build.query<IUser[], string>({
      /* Описываем запрос */
      query: (search: string) => ({
        url: "search/users",
        params: {
          q: search,
          per_page: 10
        }
      }),

      /* Трансформируем данные из ответа */
      transformResponse: (response: ServerResponse<IUser>) => response.items
    }),

    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: "users/" + username + "/repos"
      })
    })

    // Добавление новых данных на бэк
    // createUser: build.mutation<any, void>({
    //    query: (username: string) => ({
    //    url: "users/" + username + "/repos"
    //  })
    //})
  })
})

/* Lazy - говорит о том, что мы можем в любое время сделать запрос, в отличие от обычного метода */
export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi