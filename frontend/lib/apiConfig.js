const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 
  (isProduction 
    ? 'https://silver-wasp-603471.hostingersite.com' 
    : 'http://localhost:5000');

console.log('--- API_URL initialized as:', API_URL);

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 
  (isProduction 
    ? 'https://tridiagonal.com' 
    : 'http://localhost:3000');

export function resolveImageUrl(img) {
  if (!img) return '';
  if (img.startsWith('http')) return img;
  if (img.startsWith('/uploads/')) return `${API_URL.replace(/\/$/, '')}${img}`;
  return img;
}

export function extractExcerpt(html, maxLength = 160) {
  if (!html) return '';
  // Convert array content to string if necessary
  const contentStr = Array.isArray(html) ? html.join(' ') : html;
  
  // Remove HTML tags
  const plainText = contentStr.replace(/<[^>]*>?/gm, ' ');
  
  // Decode common HTML entities
  const decodedText = plainText
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"');

  // Clean up whitespace
  const cleanedText = decodedText.replace(/\s+/g, ' ').trim();
  
  if (cleanedText.length <= maxLength) return cleanedText;
  return cleanedText.substring(0, maxLength).trim() + '...';
}
