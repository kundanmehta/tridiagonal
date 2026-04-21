const mongoose = require('mongoose');
const Industry = require('./models/Industry');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tridiagonal';

const industriesData = [
    {
        title: 'Oil & Gas',
        slug: 'oil-gas',
        overview: 'Serving Upstream, Midstream & Downstream segment.',
        modelingSimulation: {
            enabled: true,
            industriesSection: { title: 'Industries', subtitle: 'Your Trusted Partner in Modeling & Simulation.' },
            hero: {
                bgImage: '/hubfs/Advanced%20Modeling%20Service%20Page%20Banner.png',
                title: 'Advanced Modeling & Simulation',
                desc: 'Serving Upstream, Midstream & Downstream segment.'
            },
            intro: {
                badge: 'Expertise & Experience',
                heading: 'High-Fidelity Engineering Solutions',
                paragraphs: [
                    'The oil and gas industry is vast and encompasses various streams, each specializing in different aspects of exploration, production, refining, and distribution. Tridiagonal Solutions has extensive experience working across each segment using its exclusive capabilities in **CFD** & **FEA**.',
                    'Our engineers address complex engineering problems with advanced analytical and mathematical skills, utilizing the latest CAE tools. We deliver ultimate solutions tailored for troubleshooting and process optimization.'
                ],
                image: '/hubfs/Digital Twin.jpg'
            },
            mainBody: {
                title: 'What We Do',
                badge: 'What we do',
                desc: 'Tridiagonal is actively involved in R&D projects and Joint-Industry-Programs (JIP) with global companies. We work with oil and gas industry majors like National oil companies, global owner-operators, Engineering service providers, process equipment designers, and Engineering Procurement Construction(EPC) firms.',
                cards: [
                    {
                        title: 'Computational Fluid Dynamics (CFD)',
                        desc: '• Multiphase Simulation\n  - Separation\n  - Blending\n  - Phase Change\n  - Crystallization\n• Combustion modeling\n  - Gas and Oil combustion\n• Reaction Modeling',
                        image: '/hubfs/CFD Evolution.png',
                        ctaText: 'VIEW MORE'
                    },
                    {
                        title: 'Discrete Element Method (DEM)',
                        desc: '• Drill-bit interaction analysis\n• Simulating Wellbore Stability\n• Analyzing Fluid-Particle Interactions',
                        image: '/hubfs/CFD DEM-1.gif',
                        ctaText: 'VIEW MORE'
                    },
                    {
                        title: 'Finite Element Analysis (FEA)',
                        desc: '• Fatigue failure analysis\n• Thermal , Static analysis\n• Dynamic analysis and Non-linear\n• Acoustic induced Vibration\n• Buckling Analysis',
                        image: '/hubfs/FEA-1.png',
                        ctaText: 'VIEW MORE'
                    },
                    {
                        title: 'Multiphysics Simulation',
                        desc: '• Fluid Structure Interaction.\n• Thermoelectric Interaction.\n• CFD-DEM coupling.\n• Acoustic structural interaction.\n• DEM-FEA coupling.',
                        image: '/hubfs/CFD FEA Coupled-1.png',
                        ctaText: 'VIEW MORE'
                    },
                    {
                        title: 'Digital Twin',
                        desc: '• Predictive model based on Experimental and Simulation data.\n• Response Surface Models.\n• Reduced Order Modeling.',
                        image: '/hubfs/Website Banner.png',
                        ctaText: 'VIEW MORE'
                    }
                ]
            },
            showcase: {
                enabled: true,
                title: 'Use Cases',
                desc: 'At Tridiagonal, we pride ourselves on staying at the forefront of technological advancements. Our team is dedicated to incorporating the latest applications in Oil & Gas, such as hydrogen production, storage, and transportation, into our consulting services. By leveraging state-of-the-art simulation tools, we empower our clients to navigate the evolving energy landscape with confidence. To learn more about our experience with CFD & FEA, please refer to our case studies.',
                cards: [
                    { title: 'Simulating Data Centers using CoolSim', image: '/hubfs/Office Space Ventilation_ (1).png', isCaseStudy: false, gradient: 'linear-gradient(135deg, #00d2ff 0%, #a4e03d 100%)' },
                    { title: 'Frequency Response Analysis of Sparger', image: '/hubfs/Sparger.png', isCaseStudy: true, gradient: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)' },
                    { title: 'Improving the Performance of Induced Gas Flotation Unit', image: '/hubfs/Digital Twin.jpg', isCaseStudy: false, gradient: 'linear-gradient(135deg, #0d324d 0%, #00d2ff 100%)' },
                    { title: 'CFD Modeling of Mixing Systems', image: '/hubfs/CFD Analysis of a Neutralization Tank _.png', isCaseStudy: false, gradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)' }
                ]
            },
            whyChooseUs: {
                title: 'Why Choose Us?',
                items: [
                    { title: 'Team', desc: '300+ experts with masters and Ph.D\'s in chemical engineering.', icon: 'Users' },
                    { title: 'Consulting Expertise', desc: 'Extending over 100 man-years globally to Fortune 500 clients', icon: 'Briefcase' },
                    { title: 'Solutions', desc: 'Tailored to optimize operations and decision-making', icon: 'Settings' },
                    { title: 'Engagement models', desc: 'Flexible options including time and material, dedicated centers, and project-specific arrangements', icon: 'Handshake' },
                    { title: 'Value Creation', desc: 'Deploying best practices and methods to efficiently create and deliver value for customers.', icon: 'Globe' },
                    { title: 'Multi Skilled Expertise', desc: 'Team having exposure and expertise of developing scalable solutions across multiple platforms.', icon: 'Users' }
                ]
            },
            modals: [
                {
                    capabilityName: 'Computational Fluid Dynamics (CFD)',
                    mainTitle: 'Computational Fluid Dynamics',
                    overview: 'Computational Fluid Dynamics (CFD) empowers you to visualize and analyze complex fluid flow phenomena within your designs. Our team of CFD specialists leverage cutting-edge tools and proven methodologies to provide comprehensive solutions for a wide range of applications, including heat transfer analysis for equipment design, Multiphase flow modeling and Combustion analysis for emission control. We are trusted partners of renowned companies since last two decades. We work on a wide range of applications making considerable contributions to design & process optimization.',
                    image: '/hubfs/CFD Analysis of a Neutralization Tank _.png',
                    tools: ['Simcenter STAR-CCM+', 'Simcenter 3D', 'Simcenter Amesim', 'Simcenter FLOEFD', 'FLOMASTER'],
                    technicalSections: [
                        { title: 'Computational Fluid Dynamics (CFD)', subtitle: 'CFD centric Post Processing', content: 'Study of Separation process \nOur CFD engineers can analyze oil blending & suggest appropriate jet-mixture position for optimal performance. Homogenization time can also be predicted to take inferred decisions. Separation is an essential process in Oil & Gas industry, here we can evaluate and enhance performance of various separation equipment like two/three-phase separators, vertical/horizontal and spherical separators, Cyclone and pre-treaters with simulation.' },
                        { title: 'Combustion Modeling', subtitle: 'Combustion Modeling', content: 'Tridiagonal has considerable experience on modeling burner arrangements, flame interactions, NOx and SOx predictions and Flame impingement on radiant tube section to avoid rupture. Our engineers also worked on processed heaters used in reformers. We help optimize flow of fluid and air to Burner using CFD as well as improve combustion efficiency by optimizing fuel and air flow' },
                        { title: 'Ongoing Performance Monitoring and Enhancement', subtitle: 'Well drilling & Cementing', content: 'Tridiagonal engineers work on both onshore & offshore oil extraction applications. Our team can analyze pressure drop patterns & erosion modeling of downhole tools using CFD as well as equipment & tools involved in other processes like completion, cementing & plugging and abandonment to understand fluid displacement. Other applications include sand screens, submersible pumps, steel catenary riser(SCR) & exhaust gas dispersion from offshore platforms.' },
                        { title: 'Dynamic Simulation (Operator training simulation)', subtitle: 'Simulation for refining applications & processes', content: "Tridiagonal's CFD capabilities cover a wide range of equipment & processes under oil refining. Our simulation assessment helps solve coking issues in fractionators by tracking particle & liquid distribution. Insights provided from our M&S team are useful in selection of Fixed bed reactors to get improved temperature distribution & flow uniformity." },
                        { title: 'Dynamic analysis', subtitle: 'Seamless coupling with Finite Element analysis', content: 'Through incorporation of coupled FEA-CFD analysis we offer more realistic solutions on various oil & gas equipment. Synergizing both these domains our experts help you solve problems related to Fluid Structure Interaction(FSI) & Thermal Structural interaction.' }
                    ]
                },
                {
                    capabilityName: 'Finite Element Analysis (FEA)',
                    mainTitle: 'Finite Element Analysis',
                    overview: 'Finite Element Analysis (FEA) has become an indispensable technology within the oil and gas industry. This sophisticated computer-aided engineering technique allows engineers to perform simulations of various components and structures and predict their behavior under real-world operating conditions.\n\nThis capability to analyze stress, strain, and deformations across a wide range of scenarios strengthens safety protocols, optimizes designs, and ultimately reduces costs throughout production, and transportation phases.',
                    image: '/hubfs/Sparger.png',
                    tools: ['Simcenter 3D', 'NX Nastran', 'Simcenter Amesim', 'HEEDS', 'STAR-CCM+'],
                    technicalSections: [
                        { title: 'Structural analysis of RPB under rotation', subtitle: 'Ensuring Structural integrity of Pressure Vessels', content: 'Our FEA engineers can do static structural analysis to assess the structural integrity of different pressure vessels broadly classified as Vertical Pressure Vessels and Horizontal Pressure Vessels used in Oil refineries. We do these analyses using industry standards like ASME and API for stress classification and ASCE for Seismic analysis. We also frequently analyze separators & coke drums for deformations.' },
                        { title: 'Oil in water prediction in skimmers', subtitle: 'Strength assessment of oil extraction equipment', content: 'From wellheads to offshore rigs our engineers can perform stress analysis to ensure safe & reliable operations. We can replicate the response of offshore platforms under combined forces of waves, wind, and sea currents. Under energy extraction operations, Tridiagonal works on a wide range of applications including Centrifugal compressors & gate valves.' },
                        { title: 'Boiler energy optimization-1', subtitle: 'Ensuring structural integrity of energy storage solutions', content: 'Leveraging FEA, Tridiagonal can do a static analysis to capture stiffness of Distillation column to avoid collapse due to buckling loads. We have extensive experience in analyzing structural integrity of Storage tanks at component level such as Tank Roof Nozzle, Baffle Plate and bottom plate nozzle.' },
                        { title: 'Fluid Structure Interaction', subtitle: 'Fatigue Life prediction for Piping structures', content: 'Tridiagonal engineers have considerable experience in predicting fatigue life of piping by calculating stress intensities at critical locations. We can simulate vortices and acoustic resonances and their effect on pipe wall structure to predict resonance frequency and high stress region in piping structures.' },
                        { title: 'Quality Control and Regulatory Compliance', subtitle: 'Seamless coupling with Computational Fluid Dynamics', content: 'Through incorporation of coupled FEA-CFD analysis we offer more realistic solutions on various oil & gas equipment. Synergizing both these domains our experts help you solve problems related to Fluid Structure Interaction(FSI) & Thermal Structural interaction.' }
                    ]
                },
                {
                    capabilityName: 'Discrete Element Method (DEM)',
                    mainTitle: 'Discrete Element Method',
                    overview: 'Discrete Element Modeling (DEM) is a technique used in the oil and gas industry for simulating the behavior of granular materials, particularly in drilling processes and fluidized bed reactors.',
                    image: '/hubfs/Digital Twin.jpg',
                    tools: ['Simcenter STAR-CCM+', 'Simcenter 3D', 'HEEDS'],
                    technicalSections: [
                        { title: 'Dynamic analysis', subtitle: 'Drill-bit interaction analysis', content: 'Tridiagonal can simulate how the drill bit interacts with rock formations at various depths. Our engineers predict wear and tear of drill bits, optimize drilling parameters, and improve drilling efficiency.' },
                        { title: 'Integrity', subtitle: 'Simulating Wellbore Stability', content: 'Wellbore instability can cause significant problems during drilling. Tridiagonal can model the movement of formation particles around the wellbore, helping to predict potential wellbore collapse and design strategies to prevent it.' },
                        { title: 'Predictive maintenance for Batch reactors', subtitle: 'Simulating movement and particle interaction under Bed reactors', content: 'FCC reactors use a fluidized bed of catalyst particles to crack heavier hydrocarbon molecules into lighter products. Tridiagonal can simulate the movement and interactions of these particles within the reactor, aiding in optimizing FCC operations for better product yield and catalyst life.' },
                        { title: 'Automated Interpretation of RCA Incident reports', subtitle: 'Seamless coupling with Computational Fluid Dynamics', content: 'The plugging is dependent on the flow field, the number of particles, their cohesivity, and contact behavior. Tridiagonal can provide insights into the process of plugging in turbulent multiphase flows with cohesive/adhesive particles using high-fidelity CFD-DEM coupling.' }
                    ]
                },
                {
                    capabilityName: 'Multiphysics Simulation',
                    mainTitle: 'Multiphysics Simulation',
                    overview: 'As the Oil and Gas industry includes many complex processes & equipment, it is critical to understand the dynamics of internal processes and their effect on equipment to enhance performance. Tridiagonal has developed advanced capabilities to couple different disciplines to solve complex real-life issues using high-fidelity computational methods.',
                    image: '/hubfs/Office Space Ventilation_ (1).png',
                    tools: ['Simcenter STAR-CCM+', 'Simcenter 3D', 'Abaqus', 'Ansys'],
                    technicalSections: [
                        { title: 'Fluid Structure Interaction', subtitle: 'Fluid Structure Interaction', content: 'Tridiagonal uses the coupling of Computational Fluid Dynamics (CFD) and Finite Element Analysis (FEA) to analyze the interplay between fluids & structures. Our experts can analyze flow-induced stresses, vibrations, and other dynamic effects. Our range of applications covers equipment like liquid seal drums, heat exchangers, and more.' },
                        { title: 'Thermal Structural Interaction', subtitle: 'Thermal Structural Interaction', content: 'Our CFD engineers can provide high-fidelity boundary conditions for FE analysis by simulating fluid flow and heat transfer. This helps in understanding mechanical deformations in fired pressure vessels and optimizing their structural resilience.' },
                        { title: 'Predictive maintenance for Batch reactors', subtitle: 'DEM-FEA coupled problems', content: 'During oil extraction, inefficient transport and accumulation of drill cuttings in the wellbore can lead to stuck pipes. Our DEM engineers simulate the movement of drill cuttings in the drilling fluid, while FEA is used to analyze the structural integrity of the wellbore and drill string to improve slashing transport and prevent operational failures.' }
                    ]
                },
                {
                    capabilityName: 'Digital Twin',
                    mainTitle: 'Digital Twin',
                    overview: 'Tridiagonal tech experts build virtual replicas of assets and processes to reduce simulation iterations using data interpolation and real-time insights. Methods like CFD, FEA & DEM allow for predictions that may not be practically achievable through physical sensors alone.',
                    image: '/hubfs/Metals, Mining & Cement (1)-1.png',
                    tools: ['Simcenter STAR-CCM+', 'HEEDS', 'Simcenter Amesim', 'Python Data Stack'],
                    technicalSections: [
                        { title: 'Basic Start building Analytics Culture', subtitle: 'Building ROM (Reduced Order Modeling)', content: 'In areas where full-scale simulation is computationally expensive, Tridiagonal builds ROMs by creating lower-dimensional models that capture essential system behavior. This speeds up simulations and provides a straightforward approach for rapid analysis.' },
                        { title: 'Advanced Analytics', subtitle: 'Creating Response surface models (RSM)', content: "Tridiagonal uses Response Surface Modeling (RSM), a statistical technique to save on simulation costs. By analyzing relationships between input variables and output responses, our engineers predict performance without running individual full-scale simulations. This significantly reduces R&D costs in oil refining and recovery." }
                    ]
                }
            ]
        },
        techValidation: {
            enabled: true,
            hero: {
                bgImage: '/hubfs/Advanced%20Modeling%20Service%20Page%20Banner.png',
                title: 'Technology Validation & Scale-up Centre',
                desc: 'Serving Upstream, Midstream & Downstream segment.'
            },
            intro: {
                badge: 'Expertise & Experience',
                heading: 'Industry Overview',
                paragraphs: [
                    'The Oil & Gas testing sector grapples with complex challenges like erosion, wax deposition, and multiphase flow dynamics. Specialized facilities are crucial for rigorous testing to address these operational hurdles. Environmental regulations and evolving technology demand emission reduction, profitability, and innovation, requiring continuous improvement of existing methods and introduction of new products.'
                ],
                image: '/hubfs/Digital Twin.jpg'
            },
            mainBody: {
                title: 'Opportunities',
                badge: 'Testing & Validation',
                desc: 'Tridiagonal offers innovative solutions for Oil & Gas challenges like erosion and wax deposition. Our specialized facilities enable comprehensive testing and analysis to optimize sand screen durability, enhance multiphase flow dynamics, and improve asset integrity against erosion-corrosion. Tridiagonal\'s expertise unlocks potential for advancements that boost operational efficiency and reliability in Oil & Gas production.',
                cards: [
                    {
                        title: 'Computational Fluid Dynamics (CFD)',
                        desc: 'Multiphase flow, Phase change, combustion and reaction modeling are our routine areas of working. We help industry to analyze root cause of the failure.',
                        image: '/hubfs/CFD Analysis of a Neutralization Tank _.png'
                    }
                ]
            },
            showcase: { enabled: false },
            whyChooseUs: {
                title: 'Why Tridiagonal?',
                items: [
                    { title: 'State of the Art Facility', desc: '250k+ sq. ft. facility, Advanced equipment\'s, Lab & field scale testing, 24/7 utility', icon: 'Home' },
                    { title: 'Domain Experts', desc: '50+ domain experts with Masters, Ph.D.\'s, Consultants.', icon: 'Users' }
                ]
            },
            modals: []
        }
    },
    { 
        title: 'Pharma and Medical Devices', 
        slug: 'pharma-medical', 
        overview: 'Accelerating product development and ensuring regulatory compliance.',
        heroImage: '/hubfs/image(34).png',
        modelingSimulation: { enabled: true, industriesSection: { title: 'Industries', subtitle: 'Your Trusted Partner in Modeling & Simulation.' } }
    },
    { 
        title: 'Metals, Mining & Cement', 
        slug: 'metals-mining', 
        overview: 'Enhancing process reliability and reducing emissions.',
        heroImage: '/hubfs/Metals, Mining & Cement (1)-1.png',
        modelingSimulation: { enabled: true, industriesSection: { title: 'Industries', subtitle: 'Your Trusted Partner in Modeling & Simulation.' } }
    },
    { 
        title: 'Food, Beverages & CPG', 
        slug: 'food-cpg', 
        overview: 'Optimizing continuous and batch processing.',
        heroImage: '/hubfs/grid-3.png',
        modelingSimulation: { enabled: true, industriesSection: { title: 'Industries', subtitle: 'Your Trusted Partner in Modeling & Simulation.' } }
    },
    { 
        title: 'Chemicals & Petrochemicals', 
        slug: 'chemicals-petrochemicals', 
        overview: 'Resolving complex fluid dynamics and reaction kinetics.',
        heroImage: '/hubfs/grid-1.png',
        modelingSimulation: { enabled: true, industriesSection: { title: 'Industries', subtitle: 'Your Trusted Partner in Modeling & Simulation.' } }
    },
    { 
        title: 'Power & Renewables', 
        slug: 'power-renewables', 
        overview: 'Driving the new energy transition.',
        heroImage: '/hubfs/New energy.png',
        modelingSimulation: { enabled: true, industriesSection: { title: 'Industries', subtitle: 'Your Trusted Partner in Modeling & Simulation.' } }
    },
    { 
        title: 'Others', 
        slug: 'others', 
        overview: 'Advanced simulation capabilities across multiple platforms.',
        heroImage: '/hubfs/grid-2.png',
        modelingSimulation: { enabled: true, industriesSection: { title: 'Industries', subtitle: 'Your Trusted Partner in Modeling & Simulation.' } }
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        for (const data of industriesData) {
            await Industry.findOneAndUpdate(
                { slug: data.slug },
                { $set: data },
                { upsert: true, new: true }
            );
            console.log(`Seeded/Updated Industry: ${data.title}`);
        }

        console.log('Seed completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
