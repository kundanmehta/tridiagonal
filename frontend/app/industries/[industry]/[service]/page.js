import IndustryServicePageClient from '@/components/IndustryServicePageClient';
import { API_URL } from '@/lib/apiConfig';
import { constructMetadata } from '@/lib/seoUtils';

async function getIndustryData(industry) {
  try {
    const res = await fetch(`${API_URL}/api/industries/${industry}`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      return json.data || null;
    }
    return null;
  } catch (error) {
    console.error('Error fetching Industry data:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { industry, service } = params;
  const data = await getIndustryData(industry);
  
  if (!data) return constructMetadata();

  const isModeling = service === 'advance-modeling-and-simulation';
  const serviceTitle = isModeling ? 'Advanced Modeling & Simulation' : 'Technology Validation & Scale-up';
  
  const targetService = isModeling ? data.modelingSimulation : data.techValidation;
  const baseSeo = targetService?.seo || data.seo || {};

  const defaults = {
    title: `${serviceTitle} in ${data.title} | Tridiagonal Solutions`,
    description: data.overview || `Learn about our ${serviceTitle} services tailored for the ${data.title} industry.`
  };

  return constructMetadata(baseSeo, defaults);
}

export default async function IndustryServicePage({ params }) {
  const { industry, service } = params;
  const data = await getIndustryData(industry);

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
        <p style={{ color: '#fff' }}>Industry not found</p>
      </div>
    );
  }

  return <IndustryServicePageClient data={data} industry={industry} service={service} />;
}
