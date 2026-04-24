import AboutUsClient from '../../components/AboutUsClient';
import { API_URL } from '@/lib/apiConfig';

export const dynamic = 'force-dynamic';



export async function generateMetadata() {
  return {
    title: 'About Us | Tridiagonal Solutions',
    description: 'Technology catalyst to provide operations excellence with combination of skillsets and advanced technologies.',
  };
}

export default async function AboutUsPage() {
  let initialData = {};

  try {
    const res = await fetch(`${API_URL}/api/aboutpage`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        initialData = json.data;
      }
    }
  } catch (error) {
    console.error('Error fetching About Us page data:', error);
  }

  return <AboutUsClient initialData={initialData} />;
}
