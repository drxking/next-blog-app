import { createClient } from '@sanity/client'

export const client = createClient({
  // A syntactically valid placeholder keeps the sample-design mode buildable.
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ppsg7ml5',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-09-01',
  useCdn: true
})

export type Post = { _id: string; title: string; slug: string; excerpt?: string; publishedAt: string; category?: string; coverImage?: string; cloudinaryUrl?: string; body?: any[] }

const postFields = `
  _id, title, "slug": slug.current, excerpt, publishedAt,
  "category": coalesce(category, categories[0]->title),
  "coverImage": coalesce(coverImage.asset->url, mainImage.asset->url), cloudinaryUrl, body
`

export async function getPosts(): Promise<Post[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return samplePosts
  try {
    return await client.fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${postFields} }`, {}, { next: { revalidate: 60 } })
  } catch {
    // Keep local previews and first deployments usable until Sanity is configured.
    return samplePosts
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return samplePosts.find((post) => post.slug === slug) || null
  try {
    return await client.fetch(`*[_type == "post" && slug.current == $slug][0] { ${postFields} }`, { slug }, { next: { revalidate: 60 } })
  } catch {
    return samplePosts.find((post) => post.slug === slug) || null
  }
}

const samplePosts: Post[] = [
  { _id:'1', slug:'the-quiet-case-for-ordinary-days', title:'The quiet case for ordinary days', excerpt:'A note on making room for the unremarkable moments that quietly shape a life.', publishedAt:'2024-09-16', category:'Essays', cloudinaryUrl:'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1600&q=85', body:[{_type:'block',children:[{_type:'span',text:'There is a particular kind of luxury in an ordinary day. It has no agenda to prove and nothing to perform. It simply arrives, as useful and unassuming as a clean page.'}]}] },
  { _id:'2', slug:'a-field-guide-to-looking-closer', title:'A field guide to looking closer', excerpt:'The small rituals that turn a familiar street into somewhere worth noticing again.', publishedAt:'2024-09-02', category:'Field notes', cloudinaryUrl:'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=85' },
  { _id:'3', slug:'notes-from-a-slower-internet', title:'Notes from a slower internet', excerpt:'On choosing a smaller corner of the web, and keeping it human.', publishedAt:'2024-08-19', category:'Culture', cloudinaryUrl:'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=85' },
  { _id:'4', slug:'the-shape-of-an-afternoon', title:'The shape of an afternoon', excerpt:'A case for losing track of time on purpose.', publishedAt:'2024-08-03', category:'Journal', cloudinaryUrl:'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1000&q=85' },
  { _id:'5', slug:'objects-with-a-second-life', title:'Objects with a second life', excerpt:'The tenderness of things that have already been used.', publishedAt:'2024-07-26', category:'Objects', cloudinaryUrl:'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85' }
]
