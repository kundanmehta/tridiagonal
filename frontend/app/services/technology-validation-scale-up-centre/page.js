import TechValidationClient from './TechValidationClient';
import { fetchServiceMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return fetchServiceMetadata('technology-validation-scale-up-centre', {
    title: 'Technology Validation & Scale-up Centre | Tridiagonal Solutions',
    description: 'Future of flow is unfolding through rigorous testing, validation & proof of concept for optimal field operations.'
  });
}

export default function TechValidationPage() {
  return <TechValidationClient />;
}
