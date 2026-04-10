"use client";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800 py-8 text-center text-zinc-600 text-xs">
      <p>
        Proyecto demo con Next.js realizado por{" "}
        <a
          href="https://www.linkedin.com/in/laura-alejandra-ducuara-covos-6b2650208/"
          target="_blank"
          className="hover:text-green-400 transition-colors"
        >
          Laura Ducuara
        </a>
      </p>
      <p className="mt-1">
        Datos de{" "}
        <a
          href="https://rickandmortyapi.com"
          target="_blank"
          className="hover:text-green-400 transition-colors"
        >
          Rick and Morty API
        </a>
      </p>
    </footer>
  );
}