import { Character } from "@/types/character";
import { CharacterCard } from "./CharacterCard";
import { LoadingSpinner, ErrorMessage, EmptyState } from "@/components/ui/Feedback";
import { useFilterStore } from "@/store/filterStore";

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

  const { search, status, sort } = useFilterStore();

  if (isLoading) return <LoadingSpinner />;
  if (isError)   return <ErrorMessage message={errorMessage} />;

  let filtered = characters
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((c) => (status ? c.status.toLowerCase() === status : true));

  if (sort === "az") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === "za") {
    filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sort === "newest") {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
  }

  if (sort === "oldest") {
    filtered = [...filtered].sort(
      (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
    );
  }

  if (!filtered.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {filtered.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}