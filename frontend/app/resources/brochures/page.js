import BrochuresClient from '@/components/BrochuresClient';
import { constructMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return constructMetadata(null, {
    title: 'Resource Library | Brochures & Capability Statements | Tridiagonal Solutions',
    description: 'Download technical brochures, capability statements, and service overviews to learn more about our engineering expertise across various industries.'
  });
}

export default function BrochuresPage() {
  return <BrochuresClient />;
}
