# DevGosth — Landing Page

Landing page personal para ofrecer servicios de desarrollo web. Construida con React + Vite.

## Stack

- **React 19** con React Compiler habilitado
- **Vite 8** como bundler
- **CSS puro** con custom properties (sin frameworks)
- **Google Fonts** — Inter + Space Grotesk

## Inicio rápido

```bash
npm install
npm run dev
```

Otros comandos:

```bash
npm run build      # Build de producción (genera /dist)
npm run preview    # Previsualizar el build localmente
npm run lint       # Correr ESLint
```

## Secciones

| Sección | Descripción |
|---|---|
| Hero | Presentación con stats y card de métricas de proyecto |
| Servicios | 6 cards: diseño, velocidad, stack, dashboard, SEO, soporte |
| Paquetes | Landing ($900) · Landing + Dashboard ($2,200) · App Web ($4,500) |
| Testimonios | 3 reseñas de clientes |
| FAQ | 5 preguntas frecuentes con acordeón |
| Contacto | Formulario de nombre y mensaje |

## Estructura

```
src/
├── DevGosthLanding.jsx   # Componente principal + sub-componentes
├── DevGosthLanding.css   # Todos los estilos
└── main.jsx              # Entry point
```

Todo el contenido (paquetes, servicios, testimonios, FAQ) está en arrays de datos al inicio de `DevGosthLanding.jsx` para fácil edición.
