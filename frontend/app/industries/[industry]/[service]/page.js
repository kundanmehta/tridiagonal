'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DynamicIndustryServicePage from '@/components/DynamicIndustryServicePage';
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

    // Determine which service area to render
    let serviceData = null;
    if (service === 'advance-modeling-and-simulation') {
        serviceData = data.modelingSimulation;
    } else if (service === 'technology-validation-and-scale-up-centre' || service === 'technology-validation-scale-up-centre') {
        serviceData = data.techValidation;
    }

    if (!serviceData || !serviceData.enabled) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
                <p style={{ color: '#fff' }}>Service area not available for this industry.</p>
            </div>
        );
    }

    return (
        <>
            <DynamicIndustryServicePage 
                data={serviceData} 
                parentIndustryName={data.title} 
                serviceType={service} 
            />
        </>
    );
}
