# Sudip Acharya — Vercel blog

A premium, editorial Next.js blog with a square, non-rounded interface, a true-black dark theme, and your local `Coconat-Demi.otf` display font.

## Publish workflow (one administrator)

1. Create a free project at [Sanity](https://www.sanity.io/manage), then put its project ID and dataset in `.env.local` (copy `.env.example`).
2. In Sanity Manage → Members, invite only your own account and keep the dataset private. Use the CMS at `/studio` while developing locally or after deployment.
3. In Cloudinary, create an **unsigned upload preset** restricted to images (JPEG/PNG/WebP/AVIF), a sensible maximum file size, and the `blogs` folder. Add its name and your cloud name as `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` and `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env.local` and Vercel.
4. Restart/redeploy. The post editor's **Cloudinary image** field now uploads directly to Cloudinary and saves the returned secure URL automatically.
5. Run `npm install`, then `npm run dev`. Node 20.19+ is supported by the public blog dependencies.

The live site pulls published posts from Sanity and refreshes within 60 seconds. Until variables are configured, it renders polished sample content so you can assess the design. The Studio is separate from the public website, so its dependencies cannot affect Vercel builds.

## Deploy to Vercel

1. Push this folder to GitHub and import it in Vercel.
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, and `NEXT_PUBLIC_SITE_URL` in Vercel Project Settings → Environment Variables.
3. Deploy. Add your Vercel domain to Sanity’s CORS origins in Sanity Manage if you later add preview or write APIs.

Cloudinary images use its CDN directly; no image files or upload API secrets are stored in Vercel. The unsigned preset name is browser-visible, so keep its restrictions tight and keep the Sanity Studio accessible only to your admin account. The included `robots.txt`, dynamic sitemap, canonical metadata, per-post Open Graph metadata, semantic article markup, and statically generated post paths cover the core SEO setup.
# next-blog-app
