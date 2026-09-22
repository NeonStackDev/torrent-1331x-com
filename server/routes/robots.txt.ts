export default defineEventHandler((event) => {
  // Robots.txt content
  const robotsContent = `User-agent: *
Allow: /

Sitemap: https://1331x.com/sitemap_index.xml
Sitemap: https://1331x.com/__sitemap__/page.xml
Sitemap: https://1331x.com/__sitemap__/posts-0.xml
Sitemap: https://1331x.com/__sitemap__/posts-1.xml
Sitemap: https://1331x.com/__sitemap__/posts-2.xml
Sitemap: https://1331x.com/__sitemap__/posts-3.xml
Sitemap: https://1331x.com/__sitemap__/posts-4.xml
Sitemap: https://1331x.com/__sitemap__/posts-5.xml
Sitemap: https://1331x.com/__sitemap__/posts-6.xml`

  // Calculate Content-Length (in bytes, UTF-8 encoding)
  const contentLength = Buffer.byteLength(robotsContent, 'utf-8')
  
  // Set headers explicitly - Content-Length is critical for HTTP/2
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  setHeader(event, 'Content-Length', contentLength.toString())
  
  // Return the content
  return robotsContent
})
