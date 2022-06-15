import pokemonsReducer from "src/features/Pokemons/state/pokemonsSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { pokemonsApi, POKEMONS_API_REDUCER_KEY } from "./services/pokemons";
import { axiosMiddleware } from "src/middleware/axiosMiddleware";
import { createReduxHistoryContext } from "redux-first-history";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const reducer = combineReducers({
  [POKEMONS_API_REDUCER_KEY]: pokemonsApi.reducer,
  pokemons: pokemonsReducer,
  router: routerReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      axiosMiddleware,
      pokemonsApi.middleware,
      routerMiddleware,
    ]),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
