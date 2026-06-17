const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const SITE_URL = 'https://awalife.lovable.app'
const FALLBACK_IMAGE = `${SITE_URL}/og-cover.jpg`

function esc(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

Deno.serve(async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return Response.redirect(`${SITE_URL}/company/news`, 302)
  }

  const articleUrl = `${SITE_URL}/company/news/${id}`

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/news_articles?id=eq.${id}&status=eq.published&select=title,excerpt,image_url,meta_title,meta_desc&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    )

    const rows = await res.json()
    const article = rows?.[0]

    if (!article) {
      return Response.redirect(articleUrl, 302)
    }

    const title = esc(article.meta_title || article.title || 'AWALIFE News')
    const desc = esc(article.meta_desc || article.excerpt || '')
    const image = String(article.image_url || '').startsWith('http')
      ? article.image_url as string
      : FALLBACK_IMAGE

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:url" content="${articleUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Awalife" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="${image}" />
  <link rel="canonical" href="${articleUrl}" />
  <meta http-equiv="refresh" content="0; url=${articleUrl}" />
</head>
<body>
  <script>window.location.replace("${articleUrl}")</script>
</body>
</html>`

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch {
    return Response.redirect(articleUrl, 302)
  }
})
