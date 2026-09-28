import Link from 'next/link'

export function SiteHeader() { return <header className="site-header"><div className="shell topbar"><Link className="brand" href="/">Sudip<br/>Acharya<span className="brand-dot">.</span></Link><div className="header-statement">Independent writing<br/>for a slower internet</div><nav className="nav"><Link href="/#latest">Stories</Link><Link href="/about">About</Link></nav></div></header> }
export function Footer() { return <footer className="site-footer"><div className="shell footer"><span className="footer-brand">Sudip Acharya<span className="brand-dot">.</span></span><span>© {new Date().getFullYear()} — Read with intention</span><a href="#top">Back to top ↑</a></div></footer> }
