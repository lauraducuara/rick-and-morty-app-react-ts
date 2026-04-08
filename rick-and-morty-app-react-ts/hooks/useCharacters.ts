import { useQuery } from "@tanstack/react-query";
import { characterService, GetCharactersParams } from "@/services/characterService";

export const characterKeys = {
  all:        ()                       => ["characters"]                    as const,
  list:       (p: GetCharactersParams) => ["characters", "list", p]        as const,
  detail:     (id: number)             => ["characters", "detail", id]     as const,
  chart:      ()                       => ["characters", "chart"]          as const,
};

export function useCharacters(params: GetCharactersParams) {
  return useQuery({
    queryKey: characterKeys.list(params),
    queryFn:  () => characterService.getAll(params),
    staleTime: 1000 * 60 * 5, 
  });
}

export function useCharacter(id: number) {
  return useQuery({
    queryKey: characterKeys.detail(id),
    queryFn:  () => characterService.getById(id),
    staleTime: 1000 * 60 * 10, 
    enabled:  !!id, 
  });
}

export function useAllCharactersForChart() {
  return useQuery({
    queryKey: characterKeys.chart(),
    queryFn:  characterService.getAllForChart,
    staleTime: 1000 * 60 * 30, 
  });
}