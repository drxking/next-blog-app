import { Footer, SiteHeader } from '@/components/site-header'
import { PostCard } from '@/components/post-card'
import { getPosts } from '@/lib/sanity'
import Image from 'next/image'
import heroArtwork from '../image.png'

export default async function Home() {
  const posts = await getPosts()
  return <><SiteHeader/><main id="top" className="shell"><section className="hero"><div className="hero-index"><span>Issue 01</span><span>Est. 2024</span></div><div className="hero-copy"><span className="eyebrow">An independent journal</span><h1>Make room<br/>for <em>what</em><br/>matters.</h1></div><div className="hero-art"><Image src={heroArtwork} alt="Abstract line artwork by Sudip Acharya" priority/><div className="hero-note"><span className="eyebrow">Hidden art</span><p>A quiet study, placed here for those who look twice.</p><a href="#latest">Enter the journal <span>↓</span></a></div></div></section><section id="latest"><div className="section-head"><span>Selected writing</span><span>{String(posts.length).padStart(2, '0')} stories</span></div><div className="grid">{posts.map(post => <PostCard key={post._id} post={post}/>)}</div></section></main><Footer/></>
}
