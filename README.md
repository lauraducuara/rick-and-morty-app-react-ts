# Proyecto API Rick y Morty  🧬

Aplicación web para explorar los personajes del universo Rick and Morty.
Desarrollada como prueba técnica con Next.js 14, TypeScript y arquitectura
limpia orientada a separación de responsabilidades.

---

## Descripción
Consume la API pública de rickandmortyapi.com para mostrar los 826 personajes
de la serie. Al hacer clic en cualquier personaje se abre un modal con su
información completa sin salir de la página.

- Lista de personajes con cards, imagen, estado y ubicación
- Filtro por nombre en tiempo real
- Filtro por estado: Vivo, Muerto, Desconocido
- Paginación con selector directo de página
- Modal de detalle con especie, género, origen, ubicación y episodios
- Gráfica interactiva con 4 categorías: especie, estado, género y episodios
- 3 tipos de visualización: barras, pastel y radar
- Página 404 personalizada
- Página de error cuando falla la conexión

---

## Cómo configurar y ejecutar

### Requisitos
- Node.js 20 o superior
- npm

### Pasos

```bash
#Esto realicelo en su bash
# Clonar el repositorio
git clone https://github.com/lauraducuara/rick-and-morty-app-react-ts.git
cd rick-and-morty-app-react-ts

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

Crear un archivo `.env` en la raíz con:
NEXT_PUBLIC_API_URL=https://rickandmortyapi.com/api

---

## Capturas de pantalla

### Página principal
![Home](public/screenshots/home.png)

### Gráfica de distribución
![Chart](public/screenshots/chart.png)

### Detalle de personaje
![Detail](public/screenshots/detail.png)

---

## Estructura del proyecto
## Estructura del proyecto

## Estructura
├── app/
│   ├── page.tsx                  # Página principal
│   ├── layout.tsx                # Layout global
│   ├── error.tsx                 # Página de error global
│   ├── not-found.tsx             # Página 404
├── components/
│   ├── ui/
│   │   ├── CharacterModal.tsx    # Modal de detalle del personaje
│   │   ├── SearchInput.tsx       # Input de búsqueda reutilizable
│   │   ├── StatusBadge.tsx       # Badge de estado (Vivo/Muerto/Desconocido)
│   │   └── Feedback.tsx          # LoadingSpinner, ErrorMessage, EmptyState
│   ├── characters/
│   │   ├── CharacterCard.tsx     # Card individual de personaje
│   │   ├── CharacterGrid.tsx     # Grid de personajes
│   │   └── CharacterFilters.tsx  # Filtros de busqueda y estado
│   └── charts/
│       └── CharacterChart.tsx    # Gráfica interactiva con Recharts
├── hooks/
│   └── useCharacters.ts          # Custom hooks con TanStack Query
├── lib/
│   └── query/
│       └── QueryProvider.tsx     # Provider de TanStack Query
├── services/
│   └── characterService.ts       # Comunicación con la API + validación Zod
├── store/
│   └── filterStore.ts            # Estado global con Zustand (filtros + modal)
├── types/
│   └── character.ts              # Schemas Zod e interfaces TypeScript
└── utils/
└── chartHelpers.ts           # Funciones puras para procesar datos

