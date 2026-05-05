import ContactUsClient from '@/components/ContactUsClient';
import { API_URL } from '@/lib/apiConfig';
import { constructMetadata } from '@/lib/seoUtils';

const FALLBACK = {
  heroSection: { title: 'Here To Help', description: 'Reach out to our experts today.' },
  infoCards: [
    { iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>', title: 'Sales', description: 'Interested in learning more about Tridiagonal? Request a consultation', link: '' },
    { iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>', title: 'Careers', description: 'Looking to help others thrive in their personal and professional lives? Check out our open positions', link: '/careers' },
  ],
  officesSection: {
    heading: 'Our Global Offices',
    description: 'Tridiagonal Solutions scales with you across the globe.',
    offices: [
      { region: 'North America', flagImage: '/images/download642b.png', companyName: 'Tridiagonal Solutions Inc.', addresses: [{ label: '', text: '8632 Fredericksburg Road, Suite 101, San Antonio, Texas 78240, USA' }], contacts: [{ type: 'phone', label: '+1 (210) 487-8343', value: 'tel:+12104878343' }, { type: 'fax', label: '+1 (210) 468-0699', value: 'tel:+12104680699' }, { type: 'email', label: 'info@tridiagonal.com', value: 'mailto:info@tridiagonal.com' }] },
      { region: 'India', flagImage: '/images/Flag_of_India.svg769c.jpg', companyName: 'Tridiagonal Solutions Pvt. Ltd.', addresses: [{ label: '', text: 'Unit 401, 4th Floor, Amar Madhuban Tech Park, Survey No. 43/1 and 44/1/1, Opposite Audi Showroom, Baner, Pune, Maharashtra - 411045' }, { label: 'Scale-Up & Experimental Lab Facility', text: 'Gate No.1074 1075 1076, Opp. Utkash Constrowell RMC Plant, Shirwal, Tal Khandala, Shirwal, Satara, Maharashtra, 412801' }], contacts: [{ type: 'phone', label: '+91 20 69002000', value: 'tel:+912069002000' }, { type: 'sales', label: '+91 7020993061', value: 'tel:+917020993061' }, { type: 'admin', label: '+91 8087590308', value: 'tel:+918087590308' }, { type: 'email', label: 'info@tridiagonal.com', value: 'mailto:info@tridiagonal.com' }] },
      { region: 'UAE', flagImage: '/images/640px-Flag_of_the_United_Arab_Emirates.svgd69a.png', companyName: 'Tridiagonal Solutions – FZCO', addresses: [{ label: '', text: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates' }], contacts: [{ type: 'email', label: 'info@tridiagonal.com', value: 'mailto:info@tridiagonal.com' }] },
    ]
  },
  ctaSection: { heading: 'Seeking to thrive in your professional life?', buttonText: 'CHECK OUT OUR OPEN POSITIONS', buttonLink: '/careers', backgroundImage: '/hubfs/topography-bg.webp' },
};

async function getContactPageData() {
  try {
    const res = await fetch(`${API_URL}/api/contactpage`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      return json.data || {};
    }
    return {};
  } catch (error) {
    console.error('Error fetching Contact page data:', error);
    return {};
  }
}

export async function generateMetadata() {
  const data = await getContactPageData();
  return constructMetadata(data?.seo, {
    title: 'Contact Us | Tridiagonal Solutions',
    description: 'Reach out to our experts today. We are here to help you address your process related challenges.'
  });
}

export default async function ContactUsPage() {
  const data = await getContactPageData();
  return <ContactUsClient initialData={data} fallbackData={FALLBACK} />;
}
