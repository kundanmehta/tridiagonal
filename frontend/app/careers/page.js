import CareersClient from '@/components/CareersClient';
import { API_URL } from '@/lib/apiConfig';
import { constructMetadata } from '@/lib/seoUtils';

const FALLBACK_PAGE = {
  heroSection: {
    title: 'Explore opportunities to grow in <span class="gradient-text">advanced technology</span> space',
    description: "We're a group of talented professionals who are passionate about applying advanced technologies in process industry",
    bgImage: '/images/careers-bg.png',
  },
  coreValuesSection: {
    heading: 'Our Core Values',
    description: 'Fostering Growth and Success for Our Customers and Employees',
    values: [
      { title: 'Innovation', desc: 'Encouraging new ideas, creativity, and continuous improvement.' },
      { title: 'Customer Centricity', desc: "Putting customers' needs first and striving to exceed their expectations." },
      { title: 'Excellence', desc: 'Striving for the highest standards of quality and performance.' },
      { title: 'Results-Driven', desc: 'Focusing on achieving measurable outcomes and goals.' },
      { title: 'Teamwork', desc: 'Collaborating effectively and valuing diverse perspectives.' },
      { title: 'Agility', desc: 'Being adaptable and responsive to changing market and technological trends.' },
    ],
  },
  opportunitiesSection: { heading: 'Check out our latest opportunities' },
};

const FALLBACK_JOBS = [
  { id: 'project-engineer', title: 'Project Engineer', department: 'Advanced Modeling & Simulation (CFD/FEA)', date: 'January 8, 2026', location: 'Pune, India', type: 'Full-time' },
];

const getFullImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  if (path.startsWith('/hubfs') || path.startsWith('/images')) return path;
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

async function getCareersData() {
  try {
    const res = await fetch(`${API_URL}/api/careers/page`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      return json.data || {};
    }
    return {};
  } catch (error) {
    console.error('Error fetching Careers page data:', error);
    return {};
  }
}

async function getJobsData() {
  try {
    const res = await fetch(`${API_URL}/api/careers/jobs`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      return json.data?.length > 0 ? json.data : FALLBACK_JOBS;
    }
    return FALLBACK_JOBS;
  } catch (error) {
    console.error('Error fetching Jobs data:', error);
    return FALLBACK_JOBS;
  }
}

export async function generateMetadata() {
  const data = await getCareersData();
  return constructMetadata(data?.seo, {
    title: 'Careers | Tridiagonal Solutions',
    description: 'Join our team of talented professionals. Explore opportunities in advanced technology, modeling, and simulation.'
  });
}

export default async function CareersPage() {
  const [data, jobs] = await Promise.all([getCareersData(), getJobsData()]);
  
  const p = {
    heroSection: {
      title: data.heroSection?.title || FALLBACK_PAGE.heroSection.title,
      description: data.heroSection?.description || FALLBACK_PAGE.heroSection.description,
      bgImage: getFullImageUrl(data.heroSection?.bgImage || FALLBACK_PAGE.heroSection.bgImage),
    },
    coreValuesSection: {
      heading: data.coreValuesSection?.heading || FALLBACK_PAGE.coreValuesSection.heading,
      description: data.coreValuesSection?.description || FALLBACK_PAGE.coreValuesSection.description,
      values: data.coreValuesSection?.values?.length > 0 ? data.coreValuesSection.values : FALLBACK_PAGE.coreValuesSection.values,
    },
    opportunitiesSection: {
      heading: data.opportunitiesSection?.heading || FALLBACK_PAGE.opportunitiesSection.heading,
    },
  };

  return <CareersClient p={p} initialJobs={jobs} />;
}
