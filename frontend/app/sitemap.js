import { MetadataRoute } from 'next'
 
export default function sitemap() {
  return [
    {
      url: 'https://tridiagonal.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://tridiagonal.com/services/advance-modeling-and-simulation',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://tridiagonal.com/services/technology-validation-scale-up-centre',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://tridiagonal.com/contact-us',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
