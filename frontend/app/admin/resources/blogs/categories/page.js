'use client';
import AdminCategoryManager from '@/components/AdminCategoryManager';

export default function AdminBlogCategoriesPage() {
    return (
        <div className="admin-page">
            <AdminCategoryManager resType="Blog" />
        </div>
    );
}
