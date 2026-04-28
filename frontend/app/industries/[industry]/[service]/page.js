'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DynamicAdvancedModelingPage from '@/components/DynamicAdvancedModelingPage';
import DynamicTechValidationPage from '@/components/DynamicTechValidationPage';
import { API_URL } from '@/lib/apiConfig';

export default function IndustryServicePage() {
    const { industry, service } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!industry || !service) return;

        const fetchIndustryData = async () => {
            try {
                const res = await fetch(`${API_URL}/api/industries/${industry}`);
                const json = await res.json();
                if (json.data) {
                    setData(json.data);
                } else {
                    setError('Industry not found');
                }
            } catch (err) {
                console.error('Error fetching industry:', err);
                setError('Failed to load industry data');
            } finally {
                setLoading(false);
            }
        }

        fetchIndustryData();
    }, [industry, service]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
                <p style={{ color: '#fff' }}>Loading...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
                <p style={{ color: '#fff' }}>{error || 'Page not found'}</p>
            </div>
        );
    }

    const isModeling = service === 'advance-modeling-and-simulation';
    const isTechValidation = service === 'technology-validation-and-scale-up-centre' || service === 'technology-validation-scale-up-centre';

    let serviceData = null;
    if (isModeling) serviceData = data.modelingSimulation;
    else if (isTechValidation) serviceData = data.techValidation;

    if (!serviceData || !serviceData.enabled) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
                <p style={{ color: '#fff' }}>Service area not available for this industry.</p>
            </div>
        );
    }

    if (isModeling) {
        return (
            <DynamicAdvancedModelingPage
                data={serviceData}
                parentIndustryName={data.title}
                industrySlug={industry}
            />
        );
    }

    return (
        <DynamicTechValidationPage
            data={serviceData}
            parentIndustryName={data.title}
            industrySlug={industry}
        />
    );
}
