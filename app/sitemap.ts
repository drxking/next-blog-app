import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/sanity'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'; const posts = await getPosts(); return [{url:base,lastModified:new Date()}, ...posts.map(post => ({url:`${base}/posts/${post.slug}`,lastModified:new Date(post.publishedAt)}))] }
