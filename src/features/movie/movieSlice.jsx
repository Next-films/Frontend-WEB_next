import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  recommend: null,
  newDisney: null,
  original: null,
  trending: null,
  films: null,
  series: null,
  cartoons: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.recommend = action.payload.recommend;
      state.newDisney = action.payload.newDisney;
      state.original = action.payload.original;
      state.trending = action.payload.trending;
      state.films = action.payload.films;
      state.series = action.payload.series;
      state.cartoons = action.payload.cartoons;
    },
  },
});

export const { setMovies } = movieSlice.actions;

export const selectRecommend = (state) => state.movie.recommend;
export const selectNewDisney = (state) => state.movie.newDisney;
export const selectOriginal = (state) => state.movie.original;
export const selectTrending = (state) => state.movie.trending;
export const selectFilms = (state) => state.movie.films;
export const selectСartoons = (state) => state.movie.cartoons;
export const selectSeries = (state) => state.movie.series;

export default movieSlice.reducer;
