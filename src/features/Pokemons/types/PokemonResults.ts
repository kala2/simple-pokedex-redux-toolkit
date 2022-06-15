import { Pokemon } from "./Pokemon";

export type PokemonResults = {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
};
