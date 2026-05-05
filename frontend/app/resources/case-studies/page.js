import CaseStudiesClient from '@/components/CaseStudiesClient';
import { constructMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return constructMetadata(null, {
    title: 'Case Studies | Success Stories | Tridiagonal Solutions',
    description: 'Explore how we have helped global leaders solve complex engineering challenges through advanced simulation, digital twins, and technology validation.'
  });
}

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
