import BlogsClient from '@/components/BlogsClient';
import { constructMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return constructMetadata(null, {
    title: 'Latest Insights & Articles | Engineering Blog | Tridiagonal Solutions',
    description: 'Explore industry insights, technical deep dives, and thought leadership from the Tridiagonal team on computational fluid dynamics, digital twins, and process engineering.'
  });
}

export default function BlogsPage() {
  return <BlogsClient />;
}
