import HomePageClient from '../components/HomePageClient';
import { API_URL } from '@/lib/apiConfig';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Process Consulting and Technology Solutions | Tridiagonal',
  description:
    'Tridiagonal Solutions is a leading CFD, FEA, and DEM consulting company offering advanced modeling, simulation, and one of the largest technology validation & scale-up testing facilities.',
  keywords:
    'CFD, FEA, DEM, computational fluid dynamics, finite element analysis, process consulting, technology validation, scale-up centre',
};

async function getHomePageData() {
  try {
    const backendUrl = API_URL;
    console.log('[Server] Fetching HomePage data from MongoDB API...');
    const res = await fetch(`${backendUrl}/api/homepage`, { 
      next: { revalidate: 60 } // Revalidate every minute
    });
      console.warn('Failed to fetch HomePage Data');
      return {};
    }
    const json = await res.json();
    return json.data || {};
  } catch (error) {
    console.error('API Error fetching HomePage Data:', error.message);
    return {};
  }
}

export default async function HomePage() {
  const data = await getHomePageData();
  
  return (
    <HomePageClient initialData={data} />
  );
}
