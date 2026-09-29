import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Footer, SiteHeader } from '@/components/site-header'
import { getPost, getPosts } from '@/lib/sanity'
import { urlFor } from '@/sanity/lib/image'
import { CodeBlock } from '@/components/code-block'

export async function generateStaticParams() { return (await getPosts()).map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> { const post = await getPost(params.slug); if (!post) return {}; return { title: post.title, description: post.excerpt, openGraph: { images: post.cloudinaryUrl || post.coverImage ? [post.cloudinaryUrl || post.coverImage!] : [] } } }
export default async function PostPage({params}: {params: {slug: string}}) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const image = post.cloudinaryUrl || post.coverImage

  return <>
    <SiteHeader/>
    <main className="shell article">
      <header className="article-header">
        <span className="eyebrow">{post.category || 'Journal'}</span>
        <h1>{post.title}</h1>
        {post.excerpt && <p className="dek">{post.excerpt}</p>}
      </header>
      {image && <Image className="article-cover" src={image} alt="" width={1600} height={1000} priority/>}
      <div className="prose">
        {post.body ? <PortableText
          value={post.body}
          components={{
            types: {
              image: ({value}) => <Image className="prose-image" src={urlFor(value).width(1200).auto('format').url()} alt={value.alt || ''} width={1200} height={800}/>,
              cloudinaryImage: ({value}) => value.url ? <figure><Image className="prose-image" src={value.url} alt={value.alt || ''} width={1200} height={800}/>{value.caption && <figcaption>{value.caption}</figcaption>}</figure> : null,
              codeBlock: ({value}) => <CodeBlock code={value.code} label={value.label}/>,
            },
          }}
        /> : <p>This story is being prepared for publication.</p>}
      </div>
    </main>
    <Footer/>
  </>
}
