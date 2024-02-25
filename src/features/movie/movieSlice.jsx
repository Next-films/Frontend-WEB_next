import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  recommend: null,
  newDisney: null,
  original: null,
  trending: null,
  films: null,
  series: null,
  cartoons: null,
  marvel: null,
  starwars: null,
  disney: null,
  pixar: null,
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
      state.marvel = action.payload.marvel;
      state.starwars = action.payload.starwars;
      state.disney = action.payload.disney;
      state.pixar = action.payload.pixar;
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
export const selectMarvel = (state) => state.movie.marvel;
export const selectStarwars = (state) => state.movie.starwars;
export const selectDisney = (state) => state.movie.disney;
export const selectPixar = (state) => state.movie.pixar;

export default movieSlice.reducer;
