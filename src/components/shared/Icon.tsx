import {
  Eye, SlidersHorizontal, SlidersVertical, Scale, CircleDot, Circle,
  RotateCcw, MapPin, Disc, Timer, Route, Crosshair, GitFork,
  TrendingUp, TrendingDown, Zap, Target, Shield, Handshake,
  Telescope, BarChart3, ClipboardList, OctagonAlert, Settings, Settings2,
  Nut, Thermometer, Car, Wind, Gamepad2, Dumbbell, Brain,
  GraduationCap, Flag, Wrench, Calculator, Trophy, Flame,
  ThumbsUp, BookOpen, CheckCircle2, Sun, CloudSun, CloudRain,
  RefreshCw, Gauge, ArrowRightLeft, CornerDownLeft, Layers,
  ArrowDownToLine, Minus, LayoutGrid, Cog, Search, BarChart2,
  type LucideProps,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Eye, SlidersHorizontal, SlidersVertical, Scale, CircleDot, Circle,
  RotateCcw, MapPin, Disc, Timer, Route, Crosshair, GitFork,
  TrendingUp, TrendingDown, Zap, Target, Shield, Handshake,
  Telescope, BarChart3, ClipboardList, OctagonAlert, Settings, Settings2,
  Nut, Thermometer, Car, Wind, Gamepad2, Dumbbell, Brain,
  GraduationCap, Flag, Wrench, Calculator, Trophy, Flame,
  ThumbsUp, BookOpen, CheckCircle2, Sun, CloudSun, CloudRain,
  RefreshCw, Gauge, ArrowRightLeft, CornerDownLeft, Layers,
  ArrowDownToLine, Minus, LayoutGrid, Cog, Search, BarChart2,
}

interface IconProps extends LucideProps {
  name: string
}

export default function Icon({ name, size = 18, ...props }: IconProps) {
  const Component = ICON_MAP[name]
  if (!Component) return null
  return <Component size={size} {...props} />
}
