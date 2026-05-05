import AdvancedModelingClient from './AdvancedModelingClient';
import { fetchServiceMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return fetchServiceMetadata('advance-modeling-and-simulation', {
    title: 'Advanced Modeling & Simulation | Tridiagonal Solutions',
    description: 'Leverage CFD, FEA, DEM & Multiphysics to optimize processes, troubleshoot failures and build digital twins for industrial equipment.'
  });
}

export default function AdvancedModelingPage() {
  return <AdvancedModelingClient />;
}
