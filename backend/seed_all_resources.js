const mongoose = require('mongoose');
const Resource = require('./models/Resource');
require('dotenv').config();

const blogs = [
    {
        type: 'Blog',
        title: 'Fluid Structure Interaction Analysis (FSI): Maximizing Efficiency',
        category: 'Engineering',
        excerpt: 'In the fast-paced industrial landscape, the challenges faced by sectors such as oil and gas, crude refining...',
        coverImage: '/hubfs/CFD FEA Coupled-1.png',
        slug: 'fsi-efficiency',
        date: new Date('2023-10-12'),
        author: 'Tridiagonal Team',
        content: [
            "In the fast-paced industrial landscape, the challenges faced by sectors such as oil and gas, crude refining, and power generation are complex and multifaceted.",
            "Engineers must ensure maximum efficiency while strictly adhering to rigorous safety standards. One of the most effective methodologies for addressing these challenges is Fluid Structure Interaction (FSI) analysis.",
            "FSI occurs when a fluid flow interacts with a solid structure, causing deformation or stress. This phenomenon is critical in designing components like valves, pipes, and offshore platforms. By coupling Computational Fluid Dynamics (CFD) with Finite Element Analysis (FEA), we can accurately predict how these structures will behave under real-world operating conditions.",
            "Our recent projects demonstrate that applying FSI early in the design phase reduces prototype iterations by up to 40% and significantly mitigates the risk of catastrophic failures in the field."
        ]
    },
    {
        type: 'Blog',
        title: 'Advanced CFD Modeling For Reactor Safety',
        category: 'Modeling',
        excerpt: 'Discover how computational modeling is preventing catastrophic failures and streamlining the maintenance of critical systems...',
        coverImage: '/hubfs/Blog CFD DEM.png',
        slug: 'cfd-reactor-safety',
        date: new Date('2023-11-05'),
        author: 'Tridiagonal Team',
        content: [
            "Reactor safety is a paramount concern in chemical and nuclear engineering. Unpredictable thermal runaway or flow maldistribution can lead to severe consequences.",
            "Advanced Computational Fluid Dynamics (CFD) allows engineers to simulate the complex hydrodynamics and thermodynamics inside these vessels with profound accuracy.",
            "By establishing a digital twin of the reactor, operators can test extreme scenarios virtually. The simulations provide a granular view of temperature gradients, pressure drops, and mixing efficiencies that are impossible to measure with physical sensors alone.",
            "Ultimately, predictive modeling not only guarantees safety compliance but also extends the operational lifespan of expensive capital equipment."
        ]
    },
    {
        type: 'Blog',
        title: 'Enhancing Asphaltene Testing Methodologies',
        category: 'Technology',
        excerpt: 'A deep dive into scalable strategies to enhance extraction rates while managing long-term flow assurance concerns...',
        coverImage: '/hubfs/Asphaltene Blog.png',
        slug: 'asphaltene-testing',
        date: new Date('2024-01-22'),
        author: 'Tridiagonal Team',
        content: [
            "Asphaltenes, often referred to as the 'cholesterol of petroleum', are known for precipitating out of crude oil and causing severe blockages in pipelines and processing equipment.",
            "Managing Asphaltene deposition is a massive challenge in flow assurance. Traditional testing methodologies have been slow and occasionally unreliable under dynamic high-pressure environments.",
            "Our team has recently developed a hybridized testing methodology combining high-pressure experimental loops with predictive thermodynamic software. This allows for rapid screening of chemical inhibitors.",
            "The result is a highly scalable strategy capable of enhancing oil extraction rates while keeping capital expenditures well within budget."
        ]
    },
    {
        type: 'Blog',
        title: 'Optimizing Heat Exchangers with Agentic AI',
        category: 'Technology',
        excerpt: 'How AI-driven tools can drastically reduce trial-and-error in thermal analysis and heat exchanger designs.',
        coverImage: '/hubfs/image%20(10).png',
        slug: 'heat-exchanger-ai',
        date: new Date('2024-02-15'),
        author: 'Tridiagonal Team',
        content: [
            "The design of complex heat exchangers has traditionally required a staggering amount of trial-and-error, iterating over tube pitch, baffle cuts, and shell diameters.",
            "By integrating Agentic AI frameworks with established thermal analysis solvers, we are witnessing a paradigm shift. The AI agent acts autonomously to rapidly evaluate millions of configuration permutations.",
            "This approach not only optimizes heat transfer efficiency but also flags potential vibration issues before they manifest. The AI utilizes historical design data to bypass configurations known to induce early fatigue.",
            "This marks a new era in generative engineering design."
        ]
    },
    {
        type: 'Blog',
        title: 'DEM for Particle Mixing in Pharmaceuticals',
        category: 'Modeling',
        excerpt: 'Understanding mixing efficiency, powder behavior, and coating mechanics using Discrete Element Method simulations.',
        coverImage: '/hubfs/image%20(12).png',
        slug: 'dem-pharma',
        date: new Date('2024-03-08'),
        author: 'Tridiagonal Team',
        content: [
            "In pharmaceutical manufacturing, the uniformity of a powder blend directly dictates the dosage accuracy of the final tablet. Variations can lead to failed batches and enormous financial losses.",
            "Discrete Element Method (DEM) has emerged as the premier tool for understanding granular mechanics. It tracks the motion of individual particles, allowing engineers to visualize dead zones and segregation within blending equipment.",
            "When coupled with fluid flow in fluidized bed coaters, DEM provides an unparalleled look into particle growth dynamics.",
            "Our validation studies show that DEM predictions closely trace empirical data, offering a reliable path to scale-up from lab to commercial production."
        ]
    },
    {
        type: 'Blog',
        title: 'Flow Assurance in Subsea Pipelines',
        category: 'Engineering',
        excerpt: 'Addressing flow assurance challenges like wax deposition and hydrates formation using sophisticated simulation software.',
        coverImage: '/hubfs/Flow Assurance.jpg',
        slug: 'flow-assurance-subsea',
        date: new Date('2024-04-02'),
        author: 'Tridiagonal Team',
        content: [
            "Subsea environments present some of the harshest conditions for multiphase pipeline transport. Cold ambient temperatures rapidly cool production fluids, leading to wax deposition and catastrophic hydrate blockages.",
            "Flow assurance engineers rely heavily on transient multiphase flow simulators to establish strict operating envelopes for startup, shutdown, and steady-state operations.",
            "In our recent analysis of a deepwater tie-back system, we utilized transient modeling to precisely optimize the insulation thickness and chemical injection rates.",
            "The optimized design reduced necessary inhibitor volumes by 15%, slashing operational OPEX without sacrificing system reliability."
        ]
    }
];

const caseStudies = [
    {
        type: 'Case Study',
        title: 'Reducing Erosion in Subsea Pipelines',
        category: 'Advanced Modeling & Simulation',
        industry: 'Oil & Gas',
        excerpt: 'Detailed CFD analysis of sand erosion inside subsea tie-backs leading to a 30% reduction in pipe wear.',
        coverImage: '/hubfs/Digital Twin.jpg',
        slug: 'reducing-erosion-subsea',
        date: new Date('2023-12-02'),
        content: [
            "Subsea pipelines face massive challenges due to sand production from reservoirs, leading to catastrophic erosion rates inside pipe bends and manifolds.",
            "Traditional physical testing is often impossible due to the extreme pressures and multiphase conditions. Our team was approached to create a digital twin of an actively producing tie-back system.",
            "By establishing a coupled CFD-DPM (Discrete Phase Model) framework, we successfully simulated the sand particle trajectories. We found that the existing blind-tee configurations were under-designed for the current production rates.",
            "Through iterative computational testing, we optimized the geometry of the flow conditioners. The final implementation resulted in a staggering 30% reduction in localized erosion, drastically extending the asset lifespan."
        ]
    },
    {
        type: 'Case Study',
        title: 'Optimizing Mixing Bioreactors for Vaccine Production',
        category: 'Technology Validation',
        industry: 'Pharma & Medical Devices',
        excerpt: 'Using physical scale-up modeling and computational fluid dynamics to maximize cell viability in heavy agitation tanks.',
        coverImage: '/hubfs/image%20(10).png',
        slug: 'optimizing-mixing-bioreactors',
        date: new Date('2024-01-14'),
        content: [
            "Mixing is a critical parameter in bioreactors used for vaccine manufacturing. Poor mixing can lead to cell death due to excessive shear stress or nutrient starvation in dead zones.",
            "Our scale-up and validation center tackled this by combining lab-scale physical testing with high-fidelity CFD modeling.",
            "We identified critical shear zones generated by the existing Rushton turbine impellers. By shifting to a customized hydrofoil design, we significantly reduced peak shear while maintaining optimal gas dispersion.",
            "The optimized tank configuration increased cell viability by 18%, accelerating the overall commercial production output for the client."
        ]
    },
    {
        type: 'Case Study',
        title: 'Digital Twin for Continuous Caster Tracking',
        category: 'Digital Transformation',
        industry: 'Metals & Mining',
        excerpt: 'Implementation of a holistic digital twin using Agentic AI to predict slab defects and thermal anomalies.',
        coverImage: '/hubfs/Flow Assurance.jpg',
        slug: 'digital-twin-caster-tracking',
        date: new Date('2024-02-19'),
        content: [
            "Continuous casting is a highly energy-intensive process in metallurgy. Predicting internal slab defects before the steel completely solidifies is an industry-wide challenge.",
            "Our AI engineers deployed a predictive digital twin integrating live plant sensor data with a reduced-order thermal model running in the cloud.",
            "Agentic AI models continuously monitor cooling water flow rates and mold temperatures, instantly adjusting operational parameters to prevent thermal cracking.",
            "The result was a 12% drop in defect rates and a substantial reduction in energy consumed during the re-heating processes."
        ]
    },
    {
        type: 'Case Study',
        title: 'Thermal Profiling of Heat Exchangers',
        category: 'Advanced Modeling & Simulation',
        industry: 'Chemicals & Petrochemicals',
        excerpt: 'Redesigning cross-flow heat exchangers using automated thermal CFD mapping to prevent localized overheating.',
        coverImage: '/hubfs/CFD FEA Coupled-1.png',
        slug: 'thermal-profiling-heat-exchangers',
        date: new Date('2024-03-10'),
        content: [
            "In petrochemical refining, cross-flow heat exchangers are prone to localized overheating and subsequent fouling, completely ruining operational margins.",
            "We executed an automated thermal profiling sequence utilizing parametric CAD models and Ansys Fluent. This allowed us to iterate through thousands of baffle designs without manual intervention.",
            "The final recommendation eliminated dead zones and balanced the thermal load perfectly across the tube bundles, preventing localized coking.",
            "The redesign doubled the maintenance interval for the heat exchanger, saving millions in halted production costs."
        ]
    }
];

const brochures = [
    {
        type: 'Brochure',
        title: 'Advanced Computational Fluid Dynamics Services Overview',
        category: 'Advanced Modeling & Simulation',
        industry: 'Oil & Gas',
        excerpt: 'Comprehensive overview of our CFD consulting solutions, encompassing multiphase flows, reacting flows, and heat transfer.',
        coverImage: '/hubfs/Digital Twin.jpg',
        slug: 'cfd-services-overview',
        date: new Date('2023-12-15'),
        content: [
            "Our Advanced Computational Fluid Dynamics (CFD) Services brochure offers an in-depth look at our core consulting capabilities. Tridiagonal Solutions has spent over a decade perfecting simulation workflows that directly impact the bottom line of heavy industry operations.",
            "Inside this brochure, you will find detailed explanations of our multiphase flow modeling, reacting flow analysis, and conjugate heat transfer services. We outline our standard operating procedures, software expertise (including Ansys Fluent, OpenFOAM, and STAR-CCM+), and hardware capabilities.",
            "Whether you are looking to optimize a single mixing tank or validate the flow assurance of a subsea production network, this document serves as the foundational guide to understanding how our engineering team integrates with yours."
        ]
    },
    {
        type: 'Brochure',
        title: 'Digital Twin Solutions for Process Industries',
        category: 'Digital Transformation',
        industry: 'Chemicals & Petrochemicals',
        excerpt: 'A deep dive into building AI-driven predictive digital twins to drastically enhance asset reliability and yield.',
        coverImage: '/hubfs/Flow Assurance.jpg',
        slug: 'digital-twin-solutions',
        date: new Date('2024-02-10'),
        content: [
            "The Digital Twin Solutions brochure outlines our approach to industrial digital transformation. Moving beyond basic IoT dashboards, we build rigorous physics-informed AI models that predict process anomalies before they occur.",
            "We detail the architecture of our agentic AI frameworks which seamlessly consume live SCADA data, process it through reduced-order thermal/fluid models, and spit out optimized control parameters in real time.",
            "Explore case highlights from the petrochemical sector where our digital twins have extended asset life by 20% and reduced unplanned downtime significantly. This brochure is essential reading for plant managers and CTOs looking to modernize heavy assets."
        ]
    }
];

const publications = [
    {
        type: 'Publication',
        title: 'System and Method for Online Prediction of Slab Defects in Continuous Casting',
        author: 'Tridiagonal Solutions Inc.',
        category: 'Patent',
        date: new Date('2024-08-21'),
        slug: 'slab-defects-prediction-patent'
    },
    {
        type: 'Publication',
        title: 'Computational analysis of multiphase flow in heavy-duty bubble column reactors',
        author: 'S. Joshi, M. Patel',
        category: 'Publication',
        date: new Date('2023-03-15'),
        slug: 'bubble-column-reactors-analysis'
    },
    {
        type: 'Publication',
        title: 'Apparatus for Optimizing Hydrofoil Impeller Designs using Reduced-Order Models',
        author: 'Tridiagonal Solutions Inc.',
        category: 'Patent',
        date: new Date('2023-11-12'),
        slug: 'hydrofoil-impeller-optimization'
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Combine all and iterate with resourceType mapping
        const allItems = [
            ...blogs.map(b => ({ ...b, resourceType: 'Blog' })),
            ...caseStudies.map(c => ({ ...c, resourceType: 'Case Study' })),
            ...brochures.map(b => ({ ...b, resourceType: 'Brochure' })),
            ...publications.map(p => ({ ...p, resourceType: 'Publication' }))
        ];

        for (const item of allItems) {
            // Ensure content is a string
            if (Array.isArray(item.content)) {
                item.content = item.content.join('\n\n');
            }

            // Remove the old 'type' property if it exists from the spread
            delete item.type;

            await Resource.findOneAndUpdate({ slug: item.slug }, item, { upsert: true, new: true });
            console.log(`Synced ${item.resourceType}: ${item.title}`);
        }

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();
