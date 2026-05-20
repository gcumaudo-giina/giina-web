# giina-web — Instrucciones para Claude

## Qué es este proyecto
Web portfolio inmersiva para **Giina Design** (Marbella, España).
Stack: Next.js 16 + TypeScript + Tailwind v4 + GSAP + Framer Motion + Sanity CMS.
Nivel de ambición: Awwwards. Disruptiva, app-like, no un template estático.

## Quién mantiene la web
Gabriel Cumaudo (`gcumaudo@giinadesign.com`) — conocimiento básico de desarrollo.
Los cambios de código se hacen con Claude en Cowork mode.

---

## Flujo de trabajo — Git + Vercel

### Repositorio
- GitHub: `https://github.com/gcumaudo-giina/giina-web`
- Vercel está conectado a este repo — cada push a `main` despliega automáticamente en `https://giinadesign.com`

### Cómo publicar cambios (push a producción)

```bash
# 1. Ver qué archivos han cambiado
git status

# 2. Añadir todos los cambios
git add .

# 3. Commit con descripción clara
git commit -m "feat: descripción de lo que se cambió"

# 4. Subir a GitHub → Vercel despliega automáticamente
git push origin main
```

### Prefijos de commit recomendados
- `feat:` — nueva funcionalidad
- `fix:` — corrección de bug
- `style:` — cambios visuales sin lógica
- `content:` — textos, imágenes, proyectos
- `refactor:` — reorganización de código sin cambio visual

### Comandos útiles en local
```bash
npm run dev      # Servidor local → http://localhost:3000/en
npm run build    # Verificar que el build no tiene errores antes de subir
npx tsc --noEmit # Verificar que TypeScript no tiene errores
```

---

## Estado actual del proyecto (Mayo 2026)

### ✅ Construido y en producción
- **Coming Soon** activa en `giinadesign.com` (controlada por env var)
- **Home completa**: HeroVideo, AtelierFragment, Marquee, StudioChapter, MaterialEcho, ServicesSection, BeginSection, Footer
- **Navegación**: NavOverlay con menú overlay animado, CursorCustom, Loader, LanguageSwitcher (EN/ES)
- **7 proyectos** con páginas individuales: Villa Noura, Villa Chiara, Jardines de Andalucía, Épure, Tortugas 811, Villa Omoi, Villa Boris
- **Archivo de proyectos** en `/projects` con hover previews y animaciones
- **Página de contacto** con formulario funcional (Resend)
- **i18n** inglés y español completos en `src/messages/`
- **Logo en pestaña** del navegador (favicon + icon.png con giina-mark-black.png)
- **Sanity CMS** schemas definidos (project, settings, studio) — pendiente conectar

### ⏳ Pendiente antes del lanzamiento completo

1. **Activar el sitio completo**: cambiar `NEXT_PUBLIC_COMING_SOON` de `true` a `false` en Vercel → Settings → Environment Variables
2. **Verificar dominio Resend**: en resend.com/domains añadir `giinadesign.com` para que el formulario de contacto funcione (registro DNS, 5 min)
3. **Conectar Sanity**: los proyectos están en `src/lib/projects.ts` (hardcoded). Cuando se cree el proyecto en sanity.io, migrar los datos para gestionarlos desde el CMS
4. **Fotos de proyectos**: verificar que todas las imágenes en `src/lib/projects.ts` existen en `public/projects/`
5. **Google Analytics**: añadir `NEXT_PUBLIC_GA_ID` en Vercel cuando se tenga el ID de GA4

---

## Coming Soon — Cómo activar/desactivar

La variable `NEXT_PUBLIC_COMING_SOON` en Vercel controla el modo:
- `true` → redirige todo a `/coming-soon` (estado actual)
- `false` → muestra el sitio completo

**Para pasar a producción completa:**
1. Ir a Vercel → proyecto giina-web → Settings → Environment Variables
2. Cambiar `NEXT_PUBLIC_COMING_SOON` de `true` a `false`
3. Vercel redespliega automáticamente (o hacer un nuevo push)

---

## Variables de entorno

### En Vercel (pro