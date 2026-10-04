// Lifestyle photography from public/story (built by scripts/story-images.py).
// Every file exists at 600 and 1200 px wide, so the browser picks by viewport.

interface Props {
  name: string
  alt: string
  className?: string
  sizes?: string
  /** Above the fold: load eagerly and ask for it first. */
  priority?: boolean
  /** CSS object-position, for steering the crop of a cover-fitted photo. */
  position?: string
  /** Below this viewport width the photo is hidden by its container, so serve
      a 1px placeholder instead: a display:none <img> still downloads. */
  minWidth?: number
}

const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

export default function StoryImage({
  name,
  alt,
  className = '',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  position,
  minWidth,
}: Props) {
  const img = (
    <img
      src={`/story/${name}-1200.webp`}
      srcSet={`/story/${name}-600.webp 600w, /story/${name}-1200.webp 1200w`}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={className}
      style={position ? { objectPosition: position } : undefined}
    />
  )
  if (!minWidth) return img
  return (
    <picture className="contents">
      <source media={`(max-width: ${minWidth - 1}px)`} srcSet={BLANK} />
      {img}
    </picture>
  )
}
