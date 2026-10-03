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
}

export default function StoryImage({
  name,
  alt,
  className = '',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  position,
}: Props) {
  return (
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
}
