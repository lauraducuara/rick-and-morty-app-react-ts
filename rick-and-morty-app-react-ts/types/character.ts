import { z } from "zod";


export const LocationSchema = z.object({
  name: z.string(),
  url: z.string(), 
});

export const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(["Alive", "Dead", "unknown"]),
  species: z.string(),
  type: z.string(),
  gender: z.enum(["Female", "Male", "Genderless", "unknown"]),
  origin: LocationSchema,
  location: LocationSchema,
  image: z.string(), 
  episode: z.array(z.string()),
  url: z.string(),
  created: z.string(),
});

export const ApiInfoSchema = z.object({
  count: z.number(),
  pages: z.number(),
  next: z.string().nullable(),
  prev: z.string().nullable(),
});

export const CharactersResponseSchema = z.object({
  info: ApiInfoSchema,
  results: z.array(CharacterSchema),
});


export type Character = z.infer<typeof CharacterSchema>;
export type CharactersResponse = z.infer<typeof CharactersResponseSchema>;
export type ApiInfo = z.infer<typeof ApiInfoSchema>;
export type CharacterStatus = Character["status"];
export type CharacterGender = Character["gender"];