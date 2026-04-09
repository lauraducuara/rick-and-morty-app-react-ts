
export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <img 
        src="/RickMortyGift.gif" 
        alt="Cargando..." 
        className="w-32 h-32 object-contain" 
      />
      <p className="text-green-400 text-lg font-bold animate-pulse">
      Buscando en el multiverso...
      </p>
    </div>
  );
}
  
  export function ErrorMessage({ message = "Ocurrió un error inesperado." }: { message?: string }) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
        <span className="text-4xl">💀</span>
        <p className="text-zinc-400 text-sm max-w-xs">{message}</p>
      </div>
    );
  }
  
  export function EmptyState() {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
        <p className="text-zinc-400 text-sm">
          No se encontraron personajes con ese filtro
        </p>
      </div>
    );
  }