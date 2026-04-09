import { Character } from "@/types/character";
import { CharacterCard } from "./CharacterCard";
import { LoadingSpinner, ErrorMessage, EmptyState } from "@/components/ui/Feedback";

interface CharacterGridProps {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

export function CharacterGrid({
  characters,
  isLoading,
  isError,
  errorMessage,
}: CharacterGridProps) {
  if (isLoading) return <LoadingSpinner />;
  if (isError)   return <ErrorMessage message={errorMessage} />;
  if (!characters.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}