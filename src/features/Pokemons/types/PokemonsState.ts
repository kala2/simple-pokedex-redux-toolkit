import { Pokemon } from "./Pokemon";

export type PokemonsState = {
  pokemons: Pokemon[];
  pokemon: Pokemon | null;
  fetchedPokemon: any | null;
  count: number;
  next: string | null;
  previous: string | null;
};
