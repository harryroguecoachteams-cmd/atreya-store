// /products/X.jpg -> /products/400/X.webp, built by scripts/product-thumbs.py.
export const thumb = (path: string) => path.replace(/^\/products\/([^/]+)\.jpg$/, '/products/400/$1.webp')

/** srcset pairing the 400px WebP thumbnail with the 800px JPEG original. */
export const thumbSrcSet = (path: string) => `${thumb(path)} 400w, ${path} 800w`
