import IndustriesClient from '@/components/IndustriesClient';
import { constructMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return constructMetadata(null, {
    title: 'Industries We Serve | Tridiagonal Solutions',
    description: 'Accelerating digital, simulation, and operational efficiency across heavy manufacturing domains including Oil & Gas, Chemicals, and Pharmaceuticals.'
  });
}

export default function IndustriesPage() {
  return <IndustriesClient />;
}
