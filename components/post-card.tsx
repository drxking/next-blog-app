import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/lib/sanity'

export function PostCard({ post }: { post: Post }) {
  const image = post.cloudinaryUrl || post.coverImage
  return <article className="post-card"><Link className="post-image-link" href={`/posts/${post.slug}`} aria-label={post.title}>{image && <Image className="post-image" src={image} alt="" width={1200} height={800} sizes="(max-width: 700px) 100vw, 50vw" />}</Link><div className="post-meta"><span>{post.category || 'Journal'}</span><time dateTime={post.publishedAt}>{new Intl.DateTimeFormat('en', {month:'short', day:'numeric', year:'numeric'}).format(new Date(post.publishedAt))}</time></div><Link href={`/posts/${post.slug}`}><h2>{post.title}</h2></Link>{post.excerpt && <p>{post.excerpt}</p>}<Link className="read-link" href={`/posts/${post.slug}`}>Read story <span>↗</span></Link></article>
}
