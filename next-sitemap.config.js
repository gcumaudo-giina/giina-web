/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://giinadesign.com',
  generateRobotsTxt: true,
  exclude: [
    '/studio',
    '/studio/*',
    '*/studio',
    '*/studio/*',
    '/api/*',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/studio', '/api'] },
    ],
  },
  alternateRefs: [
    { href: 'https://giinadesign.com/en', hreflang: 'en' },
    { href: 'https://giinadesign.com/es', hreflang: 'es' },
  ],
};
