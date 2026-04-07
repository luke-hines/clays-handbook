import type { Pillar } from '@/types'

interface Props {
  pillar: Pillar
}

const LABELS: Record<Pillar, string> = {
  racing: 'Racing',
  car: 'Car Knowledge',
}

export default function PillBadge({ pillar }: Props) {
  return (
    <span className={`pill pill-${pillar}`}>
      {LABELS[pillar]}
    </span>
  )
}
