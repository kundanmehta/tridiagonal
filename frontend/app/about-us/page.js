import AboutUsClient from '../../components/AboutUsClient';

export const dynamic = 'force-dynamic';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000';

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
