import { Character } from "@/types/character";

export interface ChartDataPoint {
  name: string;
  count: number;
}

export function groupBySpecies(characters: Character[]): ChartDataPoint[] {
  const map = new Map<string, number>();

  for (const character of characters) {
    map.set(character.species, (map.get(character.species) ?? 0) + 1);
  }

  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count) 
    .slice(0, 8); 
}

export function groupByStatus(characters: Character[]): ChartDataPoint[] {
  const map = new Map<string, number>();

  for (const character of characters) {
    map.set(character.status, (map.get(character.status) ?? 0) + 1);
  }

  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }));
}

export function groupByGender(characters: Character[]): ChartDataPoint[] {
  const map = new Map<string, number>();

  for (const character of characters) {
    map.set(character.gender, (map.get(character.gender) ?? 0) + 1);
  }

  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }));
}