import {
    Character,
    CharactersResponse,
    CharactersResponseSchema,
    CharacterSchema,
  } from "@/types/character";
  
  const BASE_URL = "https://rickandmortyapi.com/api";
  
  export interface GetCharactersParams {
    name?: string;
    status?: string;
    page?: number;
  }
  
  export const characterService = {
    getAll: async (params: GetCharactersParams = {}): Promise<CharactersResponse> => {
      const query = new URLSearchParams();
  
      if (params.name)   query.set("name",   params.name);
      if (params.status) query.set("status", params.status);
      if (params.page)   query.set("page",   String(params.page));
  
      const url = `${BASE_URL}/character${query.size ? `?${query}` : ""}`;
      const res = await fetch(url);
  
      if (res.status === 404) {
        return {
          info: { count: 0, pages: 0, next: null, prev: null },
          results: [],
        };
      }
  
      if (!res.ok) {
        throw new Error(`Error ${res.status}: no se pudo obtener los personajes`);
      }
  
      const json = await res.json();
      return CharactersResponseSchema.parse(json);
    },
  
    getById: async (id: number): Promise<Character> => {
      const res = await fetch(`${BASE_URL}/character/${id}`);
  
      if (!res.ok) {
        throw new Error(`Personaje con id ${id} no encontrado`);
      }
  
      const json = await res.json();
      return CharacterSchema.parse(json);
    },
  
 
    getAllForChart: async (): Promise<Character[]> => {
      const first = await characterService.getAll({ page: 1 });
      const totalPages = first.info.pages;
  
      const otherPages = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, i) =>
          characterService.getAll({ page: i + 2 })
        )
      );
  
      return [first, ...otherPages].flatMap((r) => r.results);
    },
  };