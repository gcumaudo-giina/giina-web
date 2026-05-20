import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const PROJECTS = [
  { name: 'villa-chiara', src: 'projects-images/Villa-Chiara' },
  { name: 'villa-noura',  src: 'projects-images/Villa-Noura'  },
]

const SIZES = [
  { suffix: '',     width: 2400, quality: 82 }, // full res (hero, lightbox)
  { suffix: '-md',  width: 1200, quality: 80 }, // grid / gallery
  { suffix: '-sm',  width: 600,  quality: 78 }, // thumbnails
]

async function optimizeProject({ name, src }) {
  const srcDir  = path.join(ROOT, src)
  const outBase = path.join(ROOT, 'public', 'projects', name)

  const files = (await readdir(srcDir))
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort()

  console.log(`\n▶ ${name} — ${files.length} imágenes`)

  for (const size of SIZES) {
    const outDir = path.join(outBase, size.suffix ? size.suffix.replace('-', '') : 'full')
    if (!existsSync(outDir)) await mkdir(outDir, { recursive: true })
  }

  let done = 0
  for (const file of files) {
    const base    = path.basename(file, path.extname(file))
    const srcPath = path.join(srcDir, file)

    for (const size of SIZES) {
      const dir    = path.join(outBase, size.suffix ? size.suffix.replace('-', '') : 'full')
      const outPath = path.join(dir, `${base}.webp`)

      if (existsSync(outPath)) continue // skip already optimized

      await sharp(srcPath)
        .resize({ width: size.width, withoutEnlargement: true })
        .webp({ quality: size.quality, effort: 4 })
        .toFile(outPath)
    }

    done++
    if (done % 10 === 0 || done === files.length) {
      process.stdout.write(`  ${done}/${files.length}\r`)
    }
  }

  console.log(`  ✓ ${done} imágenes → public/projects/${name}/`)
}

console.log('Optimizando imágenes para giina-web...')
for (const project of PROJECTS) {
  await optimizeProject(project)
}
console.log('\n✅ Listo')
