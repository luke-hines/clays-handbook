import { useLocation } from 'react-router-dom'

/**
 * Per-page aerial circuit background.
 * Renders a fixed full-screen div behind all content.
 * Dark overlay + edge vignette keep the dark theme intact.
 */

const TRACKS: { match: RegExp; img: string; pos: string }[] = [
  // Lessons + lesson detail → COTA
  { match: /^\/lessons/, img: '/tracks/cota.jpg',          pos: 'center 40%' },
  // Modules → Red Bull Ring
  { match: /^\/modules/, img: '/tracks/red-bull-ring.jpg', pos: 'center 45%' },
  // Quiz → Monza
  { match: /^\/quiz/,    img: '/tracks/monza.jpg',         pos: 'center 35%' },
  // Glossary, Progress, Tools → Silverstone
  { match: /^\/glossary|^\/progress|^\/tools/, img: '/tracks/silverstone.jpg', pos: 'center 38%' },
  // Creator, Pricing, Success → Spa
  { match: /^\/creator|^\/pricing|^\/success|^\/sign/, img: '/tracks/spa.jpg', pos: 'center 38%' },
  // Home (default)
  { match: /.*/, img: '/tracks/spa.jpg', pos: 'center 38%' },
]

export default function TrackBackground() {
  const { pathname } = useLocation()
  const track = TRACKS.find(t => t.match.test(pathname)) ?? TRACKS[TRACKS.length - 1]

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        backgroundImage: `
          radial-gradient(ellipse 90% 75% at 50% 45%,
            transparent 30%,
            rgba(10, 10, 14, 0.55) 65%,
            rgba(10, 10, 14, 0.92) 100%
          ),
          linear-gradient(rgba(18, 18, 26, 0.62), rgba(18, 18, 26, 0.62)),
          url('${track.img}')
        `,
        backgroundSize: 'cover',
        backgroundPosition: track.pos,
        backgroundRepeat: 'no-repeat',
        // Crossfade on route change
        transition: 'background-image 0.6s ease',
      }}
    />
  )
}
