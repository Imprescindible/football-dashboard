import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMatches } from "../api/football";
import type { RootState } from "./store";

export interface Match {
  id: number;
  matchday: number;
  utcDate: string;
  status: string;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    crest: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
}

interface MatchesState {
  items: Match[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: MatchesState = {
  items: [],
  status: "idle",
};

export const loadMatches = createAsyncThunk(
  "matches/loadMatches",
  async (_, { getState }) => {
    const state = getState() as RootState;
    if (state.matches.status === "succeeded") return state.matches.items;
    const data = await fetchMatches();
    return data.matches as Match[];
  },
);

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMatches.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadMatches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadMatches.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default matchesSlice.reducer;
