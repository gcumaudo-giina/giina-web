# giina-web — Instrucciones para Claude Code

## Qué es este proyecto
Web portfolio inmersiva para **Giina Design** (Marbella, España).
Stack: Next.js 16 + TypeScript + Tailwind v4 + GSAP + Framer Motion + Sanity CMS.
Nivel de ambición: Awwwards. Disruptiva, app-like, no un template estático.

## Quién mantiene la web
Gabriel Cumaudo (`gcumaudo@giinadesign.com`) — conocimiento básico de desarrollo.
Todo el contenido (proyectos, fotos, videos, textos) se gestiona desde **Sanity Studio** en `/studio`.
Los cambios de código se hacen con Claude Code.

---

## Brand Kit — Reglas no negociables

### Paleta
| Token | Hex | Uso |
|---|---|---|
| `off-white` | `#F7F6F4` | Fondo principal |
| `warm-grey` | `#D9D6D4` | Fondos secundarios |
| `soft-stone` | `#CFCDC9` | Bordes |
| `sand-beige` | `#A69885` | Texto secundario |
| `taupe-earth` | `#8B816E` | Texto body |
| `technical-grey` | `#4D5257` | Texto primario, fondos oscuros |
| `terracotta` | `#BC7856` | **SOLO micro-detalle**: líneas de 0.7px, puntos. NUNCA fondo. |

### Tipografía
- **Display/títulos**: `font-display` → Open Sauce One (Light/Regular)
- **Headings editoriales**: `font-editorial` → Forum
- **Body/texto corrido**: `font-body` → IBM Plex Sans (Light/Regular)

### Logo
- Solo el wordmark "GIINA" — nunca con texto al lado, encima o debajo
- Nunca aplicar terracotta al logo
- Archivos de fuente en `public/fonts/` (OpenSauceOne-*.woff2)

### Tono
- Idioma principal: **inglés**. Español disponible vía switcher.
- Frases cortas con peso. Editorial, sensorial, intencional.

---

## Estructura clave

```
src/
  app/[locale]/          ← Rutas internacionalizadas (en/es)
  components/
    home/                ← HeroVideo, StudioChapter, ProjectsGrid, ServicesSection, ContactCTA
    projects/            ← VideoScrubber, ProjectGallery, ProjectMeta
    ui/                  ← Logo, NavOverlay, CursorCustom, LanguageSwitcher, Footer
  sanity/schemas/        ← project.ts, settings.ts, studio.ts
  messages/en.json       ← Textos en inglés
  messages/es.json       ← Textos en español
  middleware.ts          ← next-intl routing
sanity.config.ts         ← Panel CMS en /studio
```

## Comandos útiles

```bash
npm run dev          # Servidor local → http://localhost:3000/en
npm run build        # Build de producción
```

---

## Variables de entorno necesarias (.env.local)

```
NEXT_PUBLIC_SANITY_PROJECT_ID   ← Crear proyecto en sanity.io
NEXT_PUBLIC_SANITY_DATASET      ← "production"
SANITY_API_TOKEN                ← Token de solo lectura de Sanity
RESEND_API_KEY                  ← Para el formulario de contacto
NEXT_PUBLIC_GA_ID               ← Google Analytics 4
NEXT_PUBLIC_SITE_URL            ← URL final (https://giinadesign.com)
```

---

## Pendiente para lanzar

1. **Fuentes Open Sauce**: descargar de rsms.me/open-sauce-one → `public/fonts/`
2. **Logo SVG**: reemplazar placeholder en `Logo.tsx` con SVG real de GIINA
3. **Proyecto Sanity**: crear en sanity.io y completar `.env.local`
4. **Videos/Fotos**: subir a Cloudinary/Sanity y conectar en cada proyecto
5. **Dominio**: verificar disponibilidad de giinadesign.com

---

## Convenciones de código

- Tailwind v4: tokens via CSS `@theme` en `globals.css`
- Animaciones scroll: GSAP + ScrollTrigger, siempre `gsap.context()` + `ctx.revert()`
- i18n: `useTranslations()` en client, `getTranslations()` en server
- Sanity: fetch en Server Components, pasar data como props a Client Components

---

## Deploy (VPS: 178.105.91.239)

Nginx reverse proxy → puerto 3000, PM2 como process manager, SSL via Certbot.