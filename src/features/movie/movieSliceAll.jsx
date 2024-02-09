import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  series: null,
  cartoons: null,
  films: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.series = action.payload.series;
      state.cartoons = action.payload.cartoons;
      state.films = action.payload.films;
    },
  },
});

export const { setMovies } = movieSlice.actions;

export const selectSeries = (state) => state.movie.series;
export const selectСartoons = (state) => state.movie.cartoons;
export const selectFilms = (state) => state.movie.films;

export default movieSlice.reducer;
