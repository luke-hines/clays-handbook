import type { Difficulty } from '@/types'

interface Props {
  difficulty: Difficulty
}

const LABELS: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export default function DifficultyBadge({ difficulty }: Props) {
  return (
    <span className={`pill pill-${difficulty}`}>
      {LABELS[difficulty]}
    </span>
  )
}
