import { Link } from 'react-router-dom'
import type { Lesson } from '@/types'
import { useAppStore } from '@/lib/store'
import PillBadge from '@/components/shared/PillBadge'
import DifficultyBadge from '@/components/shared/DifficultyBadge'
import Icon from '@/components/shared/Icon'
import { Play, Clock } from 'lucide-react'

interface Props {
  lesson: Lesson
}

const CATEGORY_LABELS: Record<string, string> = {
  racecraft: 'Racecraft',
  braking: 'Braking',
  cornering: 'Cornering',
  overtaking: 'Overtaking',
  defense: 'Defense',
  'sim-technique': 'Sim Technique',
  strategy: 'Strategy',
  suspension: 'Suspension',
  brakes: 'Brakes',
  drivetrain: 'Drivetrain',
  tires: 'Tires',
  aerodynamics: 'Aerodynamics',
  engine: 'Engine',
  setup: 'Setup',
}

export default function LessonCard({ lesson }: Props) {
  const videoUrls = useAppStore(s => s.videoUrls)
  const hasVideo = !!(videoUrls[lesson.id] ?? lesson.videoUrl)

  return (
    <Link
      to={`/lessons/${lesson.slug}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <article
        className="card"
        style={{
          overflow: 'hidden',
          transition: 'transform 0.15s, border-color 0.15s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.transform = 'translateY(-2px)'
          el.style.borderColor = 'var(--border-strong)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.transform = 'translateY(0)'
          el.style.borderColor = 'var(--border)'
        }}
      >
        {/* Thumbnail */}
        <div
          style={{
            height: 160,
            background: lesson.thumbnailColor,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {lesson.thumbnailUrl ? (
            <img
              src={lesson.thumbnailUrl}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
            />
          ) : null}
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
            }}
          />
          {/* Icon */}
          <span
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              color: lesson.pillar === 'racing' ? 'rgba(232,50,42,0.9)' : 'rgba(74,158,219,0.9)',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))',
            }}
          >
            <Icon name={lesson.emoji} size={22} />
          </span>
          {/* Video status */}
          <span
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.04em',
              padding: '3px 8px',
              borderRadius: 999,
              background: hasVideo ? 'rgba(61,171,110,0.85)' : 'rgba(0,0,0,0.55)',
              color: hasVideo ? '#fff' : 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {hasVideo ? <Play size={9} fill="currentColor" /> : <Clock size={9} />}
              {hasVideo ? 'Video' : 'Soon'}
            </span>
          </span>
          {/* Pillar accent bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: 3,
              background: lesson.pillar === 'racing' ? 'var(--red)' : 'var(--pillar-car)',
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: '16px 18px 18px' }}>
          {/* Badges */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
            <PillBadge pillar={lesson.pillar} />
            <DifficultyBadge difficulty={lesson.difficulty} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: 'var(--text-tertiary)',
                padding: '3px 0',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              {CATEGORY_LABELS[lesson.category] ?? lesson.category}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              margin: '0 0 6px',
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              lineHeight: 1.3,
            }}
          >
            {lesson.title}
          </h3>

          {/* Summary */}
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
            }}
          >
            {lesson.summary}
          </p>

          {/* Footer */}
          <div
            style={{
              marginTop: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
              {lesson.keyTakeaways.length} takeaways
              {lesson.quizId ? ' · Quiz' : ''}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: lesson.pillar === 'racing' ? 'var(--red)' : 'var(--pillar-car)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              Read →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
