import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStandings } from "../api/football";

export interface Standing {
  idStanding: string;
  strTeam: string;
  intPlayed: string;
  intWin: string;
  intDraw: string;
  intLoss: string;
  intGoalsFor: string;
  intGoalsAgainst: string;
  intPoints: string;
}

interface StandingsState {
  items: Standing[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: StandingsState = {
  items: [],
  status: "idle",
};

export const loadStandings = createAsyncThunk(
  "standings/loadStandings",
  async () => {
    const data = await fetchStandings();
    return data.table as Standing[];
  },
);

const standingsSlice = createSlice({
  name: "standings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadStandings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadStandings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadStandings.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default standingsSlice.reducer;
