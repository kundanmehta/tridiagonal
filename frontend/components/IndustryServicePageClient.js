'use client';
import DynamicAdvancedModelingPage from '@/components/DynamicAdvancedModelingPage';
import DynamicTechValidationPage from '@/components/DynamicTechValidationPage';

export default function IndustryServicePageClient({ data, industry, service }) {
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
