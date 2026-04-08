// Componentes de estados: carga, error y vacío

export function LoadingSpinner() {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-10 h-10 border-2 border-zinc-700 border-t-green-500 rounded-full animate-spin" />
        <p className="text-zinc-500 text-sm">Cargando personajes...</p>
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
        <span className="text-4xl">🔭</span>
        <p className="text-zinc-400 text-sm">
          No se encontraron personajes con ese filtro.
        </p>
      </div>
    );
  }