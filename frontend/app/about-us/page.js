import { constructMetadata } from '@/lib/seoUtils';
import AboutUsClient from '@/components/AboutUsClient';
import { API_URL } from '@/lib/apiConfig';

export const dynamic = 'force-dynamic';

async function getAboutPageData() {
  try {
    const res = await fetch(`${API_URL}/api/aboutpage`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      return json.data || {};
    }
    return {};
  } catch (error) {
    console.error('Error fetching About Us page data:', error);
    return {};
  }
}

export async function generateMetadata() {
  const data = await getAboutPageData();
  return constructMetadata(data?.seo, {
    title: 'About Us | Tridiagonal Solutions',
    description: 'Technology catalyst to provide operations excellence with combination of skillsets and advanced technologies.',
  });
}

export default async function AboutUsPage() {
  const initialData = await getAboutPageData();
  return <AboutUsClient initialData={initialData} />;
}
