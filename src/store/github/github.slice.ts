import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IRepo } from "../../models/models";


// Настраиваем Redux ToolKit
const LS_FAV_KEY = "RFK"

interface IGithubState {
  favourites: IRepo[],
}

const initialState: IGithubState = {
  favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<IRepo>) {
      state.favourites.push(action.payload)
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter(fav => fav.html_url !== action.payload)
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    }
  }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer;
