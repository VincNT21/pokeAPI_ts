import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache

    constructor(cacheInterval: number) {
        this.cache = new Cache(cacheInterval);
    }

    closeCache() {
        this.cache.stopReapLoop();
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocation> {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;

        const cached = this.cache.get<ShallowLocation>(url);
        if (cached) {
            return cached;
        }

        try {
            const resp = await fetch(url);

            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }

            const locations = (await resp.json()) as ShallowLocation;
            this.cache.add(url, locations);
            return locations;
        } catch (err) {
            throw new Error(`Error fetching locations: ${(err as Error).message}`);
        };
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}/`


        const cached = this.cache.get<Location>(url);
        if (cached) {
            return cached;
        }

        try {
            const resp = await fetch(url);

            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }

            const location: Location = await resp.json();
            this.cache.add(url, location);
            return location; 
        } catch (err) {
            throw new Error(`Error fetching location: ${(err as Error).message}`);
        };
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
      const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}/`

      const cached = this.cache.get<Pokemon>(url);
      if (cached) {
        return cached
      }

      try {
        const resp = await fetch(url);

        if (!resp.ok) {
          throw new Error(`${resp.status} ${resp.statusText}`)
        }

        const pokemon: Pokemon = await resp.json();
        this.cache.add(url, pokemon);
        return pokemon;
      } catch (err) {
        throw new Error(`Error fetching pokemon '${pokemonName}': ${(err as Error).message}`);
      };
    }
}

export type ShallowLocation = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {
  encounter_method_rates: Array<{
    encounter_method: {
      name: string
      url: string
    }
    version_details: Array<{
      rate: number
      version: {
        name: string
        url: string
      }
    }>
  }>
  game_index: number
  id: number
  location: {
    name: string
    url: string
  }
  name: string
  names: Array<{
    language: {
      name: string
      url: string
    }
    name: string
  }>
  pokemon_encounters: Array<{
    pokemon: {
      name: string
      url: string
    }
    version_details: Array<{
      encounter_details: Array<{
        chance: number
        condition_values: Array<any>
        max_level: number
        method: {
          name: string
          url: string
        }
        min_level: number
      }>
      max_chance: number
      version: {
        name: string
        url: string
      }
    }>
  }>
}

export type Pokemon = {
  abilities: Array<{
    ability: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }>
  base_experience: number
  cries: {
    latest: string
    legacy: string
  }
  forms: Array<{
    name: string
    url: string
  }>
  game_indices: Array<{
    game_index: number
    version: {
      name: string
      url: string
    }
  }>
  height: number
  held_items: Array<{
    item: {
      name: string
      url: string
    }
    version_details: Array<{
      rarity: number
      version: {
        name: string
        url: string
      }
    }>
  }>
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Array<{
    move: {
      name: string
      url: string
    }
    version_group_details: Array<{
      level_learned_at: number
      move_learn_method: {
        name: string
        url: string
      }
      order?: number
      version_group: {
        name: string
        url: string
      }
    }>
  }>
  name: string
  order: number
  past_abilities: Array<{
    abilities: Array<{
      ability: any
      is_hidden: boolean
      slot: number
    }>
    generation: {
      name: string
      url: string
    }
  }>
  past_types: Array<any>
  species: {
    name: string
    url: string
  }
  sprites: {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
    other: {
      dream_world: {
        front_default: string
        front_female: any
      }
      home: {
        front_default: string
        front_female: string
        front_shiny: string
        front_shiny_female: string
      }
      "official-artwork": {
        front_default: string
        front_shiny: string
      }
      showdown: {
        back_default: string
        back_female: string
        back_shiny: string
        back_shiny_female: any
        front_default: string
        front_female: string
        front_shiny: string
        front_shiny_female: string
      }
    }
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string
          back_gray: string
          back_transparent: string
          front_default: string
          front_gray: string
          front_transparent: string
        }
        yellow: {
          back_default: string
          back_gray: string
          back_transparent: string
          front_default: string
          front_gray: string
          front_transparent: string
        }
      }
      "generation-ii": {
        crystal: {
          back_default: string
          back_shiny: string
          back_shiny_transparent: string
          back_transparent: string
          front_default: string
          front_shiny: string
          front_shiny_transparent: string
          front_transparent: string
        }
        gold: {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
          front_transparent: string
        }
        silver: {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
          front_transparent: string
        }
      }
      "generation-iii": {
        emerald: {
          front_default: string
          front_shiny: string
        }
        "firered-leafgreen": {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
        }
        "ruby-sapphire": {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
        }
      }
      "generation-iv": {
        "diamond-pearl": {
          back_default: string
          back_female: string
          back_shiny: string
          back_shiny_female: string
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
        "heartgold-soulsilver": {
          back_default: string
          back_female: string
          back_shiny: string
          back_shiny_female: string
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
        platinum: {
          back_default: string
          back_female: string
          back_shiny: string
          back_shiny_female: string
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
      }
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string
            back_female: string
            back_shiny: string
            back_shiny_female: string
            front_default: string
            front_female: string
            front_shiny: string
            front_shiny_female: string
          }
          back_default: string
          back_female: string
          back_shiny: string
          back_shiny_female: string
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
      }
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
        "x-y": {
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
      }
      "generation-vii": {
        icons: {
          front_default: string
          front_female: any
        }
        "ultra-sun-ultra-moon": {
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
      }
      "generation-viii": {
        icons: {
          front_default: string
          front_female: string
        }
      }
    }
  }
  stats: Array<{
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }>
  types: Array<{
    slot: number
    type: {
      name: string
      url: string
    }
  }>
  weight: number
}
