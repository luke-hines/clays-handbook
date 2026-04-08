/** Parse a YouTube or Vimeo URL into an embed URL, or return null if unrecognized. */
export function parseVideoUrl(raw: string): string | null {
  const url = raw.trim()

  // YouTube: youtu.be/<id> or youtube.com/watch?v=<id> or youtube.com/shorts/<id>
  const ytShort = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/)
  const ytLong = url.match(/[?&]v=([A-Za-z0-9_-]{11})/)
  const ytShorts = url.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/)
  const ytEmbed = url.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{11})/)

  const ytId = (ytShort ?? ytLong ?? ytShorts ?? ytEmbed)?.[1]
  if (ytId) return `https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1`

  // Vimeo: vimeo.com/<id>
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?dnt=1`

  return null
}

export function isYouTubeUrl(raw: string): boolean {
  return /youtu(\.be|be\.com)/.test(raw)
}

export function isVimeoUrl(raw: string): boolean {
  return /vimeo\.com/.test(raw)
}
