import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTeam } from "../api/football";

export interface Team {
  strTeam: string;
  strTeamBadge: string;
  intFormedYear: string;
  strDescriptionEN: string;
}

interface TeamState {
  team: Team | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: TeamState = {
  team: null,
  status: "idle",
};

export const loadTeam = createAsyncThunk(
  "team/loadTeam",
  async (name: string) => {
    const data = await fetchTeam(name);
    return data.teams[0] as Team;
  },
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.team = action.payload;
      })
      .addCase(loadTeam.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default teamSlice.reducer;
