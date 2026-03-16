import { configureStore } from "@reduxjs/toolkit";
import matchesReducer from "./matchesSlice";
import standingsReducer from "./standingsSlice";
import teamReducer from "./teamSlice";

export const store = configureStore({
  reducer: {
    matches: matchesReducer,
    standings: standingsReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
