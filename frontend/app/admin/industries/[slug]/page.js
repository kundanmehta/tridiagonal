'use client';
import { useParams } from 'next/navigation';
import AdminIndustryManager from '@/components/AdminIndustryManager';

export default function AdminIndustryEditPage() {
    const { slug } = useParams();
    return (
        <div>
            <AdminIndustryManager slug={slug} />
        </div>
    );
}
