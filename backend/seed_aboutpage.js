const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const AboutPage = require('./models/AboutPage');

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tridiagonal";

async function seedAboutPage() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const leadershipTeam = [
      { name: 'Pravin Jain', role: 'Chairman', linkedin: '#', image: '/hubfs/Pravin Jain.webp', desc: 'Pravin has proven his expertise in creating, positioning and managing high-growth companies. Mr. Jain has completed his Bachelors in Computer Engineering from University of Mumbai and Masters in Computer System Engineering from Northeastern University, Boston. He has also completed the Executive Program for Growing Companies at Stanford University Graduate School of Business. He has over 25 years of experience in Technology Entrepreneurship, Business Development and Delivery of Customer-Centric Solutions. Pravin’s experience includes acquiring as well as divesting companies. Pravin lived and worked for 14 years in the US, and shifted back to India in the summer of 2006. He has driven and been accountable for Sales, Marketing, Technology, Delivery and Strategy functions at his previous ventures.' },
      { name: 'Ashish Kulkarni', role: 'Vice President and BU Head (Advanced Modeling and Simulation)', linkedin: '#', image: '/hubfs/Ashish Kulkarni.webp', desc: 'Ashish is one of the founding members of Tridiagonal. He holds Post graduate degree in Fluid Mechanics and Thermal Sciences from IIT, Kanpur. At Tridiagonal, Ashish has played several roles including setting up CFD consulting team, Leading the software development group, Establishing OpenFOAM based solver, Operating as Business Unit Head, etc... His technical interests include Turbulence Modeling, Simulation Data Management and Developing Digital Twins. Ashish is an expert at building team of Engineers. Hiring, Training, Mentoring and Grooming young engineers to deliver high end engineering solutions is his forte. Ashish has followed his passion to develop around 500 CAE engineers over last twenty four years.' },
      { name: 'Dr. Damodaran Vedapuri', role: 'Head – North American Operations', linkedin: '#', image: '/hubfs/Dr. Damodaran Vedapuri.webp', desc: 'Dr. Damo Vedapuri is the Head of North American Operations at Tridiagonal Solutions. He has 20 years of experience in solving a wide range of fluid flow problems in the Oil and Gas industry. Some of his core focus areas are Erosion, Erosion – Corrosion, Sand Management, and Slurry Multiphase Flow. Dr. Damo has graduated from the Institute of Corrosion and Multiphase Technology at Ohio University with a Ph.D. degree in Chemical Engineering. He is a member of SPE and actively publishes his group’s research in SPE, OTC, NACE and BHR conferences.' }
    ];

    const coreTeam = [
      { name: 'Dr. Jatin Agarwal', role: 'Program Director, Experimental Fluid Dynamics', linkedin: '#', image: '/hubfs/Dr. Jatin Agarwal.webp', desc: 'Dr. Jatin is working as Program Director and technical lead with 14+ years of experience for large scale production enhancement R&D projects (paraffin deposition, asphaltene deposition, multi-phase flow, simulation). He holds a Ph.D. degree in Petroleum Engineering from PDEU and Masters Degree from University of Tulsa. During his tenure at PDPU, he was instrumental in establishing state of art Drilling, Cementing and Stimulation Research Center and Enhanced Oil Recovery Consultancy Group for catering the needs of local as well as global E&P companies. He has presented several conference papers and published several journal articles in reputed conferences and journals. He has also authored a book named Offshore Operations and Engineering with CRC press of Taylor and Francis group.' },
      { name: 'Dr. Mothivel Mummudi', role: 'Global Director (Pharma) and Product Head, SimSight', linkedin: '#', image: '/hubfs/Dr. Mothivel Mummudi.webp', desc: 'Dr. Mothivel Mummudi has spent his entire professional career building advanced mathematical models for unit operations in the pharma, bio-pharma, chemicals and food industry segments. At Tridiagonal Software, he leads the development of SimSight, Tridiagonal\'s Advanced Analytics Platform based on computational data. Mothivel and the SimSight product team is driven by a strong commitment to the democratization of knowledge derived from synthetic data (i.e. data from computational models).' },
      { name: 'Dr. Gopal Kasat', role: 'Global Director-Mixing Science', linkedin: '#', image: '/hubfs/Dr. Gopal Kasat.webp', desc: 'Gopal is the Global Director-Mixing Science at Tridiagonal Software. He has a Ph.D. in Chemical Engineering from ICT, Mumbai. Gopal is also product manager for the MixIT Software. He has 20+ years of experience in scale-up/scale-down, batch & continuous mixing, computational fluid dynamics, training and mentoring, along with architecting computational solutions for chemical and process industries. Prior to Tridiagonal, Gopal worked at HyCa Technologies where he looked after development of hydrodynamic cavitaion systems for water treatment.' },
      { name: 'Nagesh Joshi', role: 'Practice Head Modeling and Simulation', linkedin: '#', image: '/hubfs/Nagesh Joshi.webp', desc: 'Nagesh has Masters degree in Mechanical Engineering with 20 years of experience in CFD and FEA modeling. He started his career with Atlascopoc as a Project Lead for Modeling and simulations. For the last 16 years, he has been working with Tridiagonal in different capacities. Currently, he is heading Modeling and simulations group.' },
      { name: 'Tukaram Suryavanshi', role: 'Head – Process Consulting', linkedin: '#', image: '/hubfs/Tukaram Suryavanshi.webp', desc: 'Tukaram Suryawanshi holds Masters in Chemical Engineering from IISc Bangalore. As head of Process Consulting services at Tridiagonal, he specilizes in the field of Advanced Modelling & Simulations using CFD, DEM, Mathematical Modelling. He has 18+ years of experience in applying the simulation services to Chemical Process, Pharmaceuticals, Food & Beverages, Medical Devices, FMCG Industries. Prior to Tridiagonal he has worked in Honeywell (Process Simulations & MES), Infosys (Engineering Services), Johnson Controls (Residential Heaters) He has publications in the international journals, conferences and patents from the work experience.' },
      { name: 'Apeksha Jadhav', role: 'HR Head', linkedin: '#', image: '/hubfs/Apeksha Jadhav.webp', desc: 'Apeksha Jadhav holds an Master Degree in Personnel Management from Pune University and certificate in Advance Human Resource Management from IIM, Indore. She is a seasoned Human Resource Business Partner with over 18 years of experience in Human Resource Management. As HR Head at Tridiagonal, she is pivotal in aligning HR functions with business objectives and enhancing employee engagement. Apeksha excels in performance management, talent sourcing, and grievance handling, demonstrating her ability to balance organizational goals with employee needs. Her career trajectory includes significant roles at Software services and Product based companies, where she spearheaded HR initiatives and managed comprehensive recruitment processes. Apeksha has successfully led HR programs that foster a positive and productive work environment. Apeksha\'s expertise extends to organizing competency-based training programs, overseeing the entire employee life cycle, and ensuring smooth HR support across business units. Her hands-on experience in designing and implementing HR policies has been instrumental in driving organizational growth and employee satisfaction.' },
      { name: 'Hrushikesh Abhyankar', role: 'CFO', linkedin: '#', image: '/hubfs/Hrushikesh Abhyankar.webp', desc: 'Hrushikesh Abhyankar is CMA with more than 15 years of experience. He has worked with MNCs and Leading Corporates in the areas of Strategic Planning, Fund Management, Accounts, Auditing, QMS and Statutory Compliance. At present, Hrushikesh is serving as Head-Finance for Tridiagonal Group with high focus on strategic planning and designing internal control systems. Exceptional negotiation skills, relationship management and abilities in liaising with Banks, financing agencies are some of his key attributes. Hrushikesh is a Financial Enthusiast adept at budgeting, forecasting, planning, reporting etc for making strategic business decisions contributing to overall growth of Tridiagonal.' }
    ];

    const timelineData = [
      { year: '2006', text: 'First company incubated out of CSIR-National Chemical Laboratory, Pune (India) under the leadership of Dr. Vivek Ranade.' },
      { year: '2008', text: 'Established Advanced Modeling & Simulation group (Computational Fluid Dynamics, Discrete Element Modeling, Mathematical Modeling, Hybrid Modeling, etc.)' },
      { year: '2010', text: 'Established center of excellence for flow assurance studies for Oil & Gas, mechanical integrity testing, new energy testing (TRL 3- TRL 9)' },
      { year: '2012', text: 'Developed CFD solver for Mixing analysis of stirred tanks' },
      { year: '2013', text: 'Launched industry’s first mixing analysis solution - MixIT with CFD solver for mixing analysis for stirred tanks' },
      { year: '2015', text: 'Plugging and abandonment contract for large E&P company' },
      { year: '2018', text: 'Established Manufacturing excellence and Digital Transformation group to provide process manufacturing digital solutions' },
      { year: '2022', text: 'Launched simulation knowledge management solution – Simsight for extracting value our of simulations' },
      { year: '2023', text: 'Established Center of excellence for various technology solution providers (Honeywell, Emerson, Yokogawa, Aveva, etc.)' },
      { year: '2024', text: 'New energy testing (TRL 3- TRL 9) set-up for CCUS. Unveiling Our New Brand Identity.' },
      { year: '2025', text: 'Tridiagonal.ai: A Domain-driven AI Company Transforming Industrial Operations' },
    ];

    const seedData = {
      heroSection: {
        title: 'Delivering Process <span class="gradient-text">Excellence</span>',
        description: 'Technology catalyst to provide operations excellence with combination of skillsets and advanced technologies.',
        bgImage: '/images/about-hero-bg.png'
      },
      introSection: {
        paragraphs: [
          'Tridiagonal Solutions Pvt. Ltd. is a consulting company, providing solutions to the process industry verticals like Oil & Gas, Lifesciences / Pharma, F&B, Chemicals, Metals & Mining, Cement, Power, etc. As a first company incubated out of national chemical laboratory (NCL), Pune (india) under the leadership of <strong>Dr. Vivek Ranade</strong>, we have been focusing on application of advanced technologies to address process related challenges.',
          'With a strong Process R&D background, and combination of skill sets (100+ persons - Domain Engg. / SMEs, Modeling & Simulation, Data Scientists, Data Engineers, Application engineers), we support process development, central modeling teams, process technologist, digital and plant operations teams with our breadth and depth of services and solutions. We have delivered >2000+ consulting projects into modeling & simulation, process optimization, advanced analytics, energy optimization, flow assurance and mechanical integrity testing, etc. We serve fortune 500, 100 customers in various industries with flexible engagement models and have built center of excellence (COE\'s) to support customers large programs.'
        ],
        credentials: [
          { num: '500+', text: 'Customers globally' },
          { num: '2000+', text: 'Projects delivered using multiple technologies' },
          { num: '100+M $', text: 'Savings realized by our customers' },
          { num: '300+', text: 'Multi-domain / Industry consultants with diverse technology know-how' },
          { num: '15+', text: 'Technology Solutions Partnerships' },
          { num: '250,000+ Sq.ft', text: 'Experiments set-up for new technology testing' },
          { num: '10+', text: "Center of Excellence (COE's) for various customers/ partners" }
        ]
      },
      atAGlanceSection: {
        heading: 'Tridiagonal Solutions at a <span class="gradient-text">glance</span>',
        cards: [
          { title: 'Our Vision', text: 'To create and deliver ‘Value’ to our customers by harnessing the power of technology and high performing teams', image: '/hubfs/vision.webp' },
          { title: 'Values', text: 'We strive to innovate with integrity, always putting the needs of our customers and partners first. Through relentless curiosity and a commitment to excellence, we aim to be a catalyst for bringing change and create value for everyone.', image: '/hubfs/values.webp' },
          { title: 'Commitment', text: 'At Tridiagonal Solutions, we are committed to pushing the boundaries of technology to drive innovation and deliver value. Our mission is to create solutions that not only meet the needs of today but also anticipate the challenges of tomorrow. We are dedicated to sustainability, diversity, and ethical practices, ensuring that our impact on all the stakeholders involved is a positive one. Together, we strive to make a difference and empower people to achieve more.', image: '/hubfs/Commitment.webp' }
        ]
      },
      leadershipSection: {
        heading: 'Our Leadership Team',
        description: 'Empowering Excellence, Inspiring Growth.',
        members: leadershipTeam
      },
      coreTeamSection: {
        heading: 'Core Team',
        description: 'Delivering Value to the Customers',
        members: coreTeam
      },
      timelineSection: {
        heading: 'Tridiagonal Solutions Evolution',
        events: timelineData
      },
      ctaSection: {
        heading: 'Looking for a <span class="gradient-text">Trusted Partner</span> for<br />executing your programs?',
        description: 'We bring together unparalleled expertise with combination of skillsets and technology to<br />address your digital, computational and testing needs',
        buttonText: 'CONTACT US NOW',
        buttonLink: '/contact-us',
        bgImage: '/hubfs/topography-bg.webp'
      }
    };

    // Find and update, or insert if doesn't exist
    await AboutPage.findOneAndUpdate(
      { singleton: true },
      { $set: seedData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('Successfully seeded About Us CMS data!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    process.exit(0);
  }
}

seedAboutPage();
