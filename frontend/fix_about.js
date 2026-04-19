const fs = require('fs');

let content = fs.readFileSync('app/admin/pages/about-us/page.js', 'utf8');

// 1. Fix the mergedData initialization logic to properly deep-merge objects
const mergedDataStr = `const isContentEmpty = (obj) => !obj || Object.keys(obj).length === 0;
      
      const mergedData = {
        heroSection: isContentEmpty(d.heroSection) ? {
          title: 'Delivering Process <span className="gradient-text">Excellence</span>',
          description: 'Technology catalyst to provide operations excellence with combination of skillsets and advanced technologies.',
          bgImage: '/images/about-hero-bg.png'
        } : d.heroSection,
        introSection: isContentEmpty(d.introSection) ? {
          paragraphs: [
            'Tridiagonal Solutions Pvt. Ltd. is a consulting company, providing solutions to the process industry verticals like Oil & Gas, Lifesciences / Pharma, F&B, Chemicals, Metals & Mining, Cement, Power, etc. As a first company incubated out of national chemical laboratory (NCL), Pune (india) under the leadership of <strong>Dr. Vivek Ranade</strong>, we have been focusing on application of advanced technologies to address process related challenges.',
            \`With a strong Process R&D background, and combination of skill sets (100+ persons - Domain Engg. / SMEs, Modeling & Simulation, Data Scientists, Data Engineers, Application engineers), we support process development, central modeling teams, process technologist, digital and plant operations teams with our breadth and depth of services and solutions. We have delivered >2000+ consulting projects into modeling & simulation, process optimization, advanced analytics, energy optimization, flow assurance and mechanical integrity testing, etc. We serve fortune 500, 100 customers in various industries with flexible engagement models and have built center of excellence (COE's) to support customers large programs.\`
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
        } : d.introSection,
        atAGlanceSection: isContentEmpty(d.atAGlanceSection) ? {
          heading: 'Tridiagonal Solutions at a <span className="gradient-text">glance</span>',
          cards: [
            { title: 'Our Vision', text: 'To create and deliver ‘Value’ to our customers by harnessing the power of technology and high performing teams', image: '/hubfs/vision.webp' },
            { title: 'Values', text: 'We strive to innovate with integrity, always putting the needs of our customers and partners first. Through relentless curiosity and a commitment to excellence, we aim to be a catalyst for bringing change and create value for everyone.', image: '/hubfs/values.webp' },
            { title: 'Commitment', text: 'At Tridiagonal Solutions, we are committed to pushing the boundaries of technology to drive innovation and deliver value. Our mission is to create solutions that not only meet the needs of today but also anticipate the challenges of tomorrow. We are dedicated to sustainability, diversity, and ethical practices, ensuring that our impact on all the stakeholders involved is a positive one. Together, we strive to make a difference and empower people to achieve more.', image: '/hubfs/Commitment.webp' }
          ]
        } : d.atAGlanceSection,
        leadershipSection: isContentEmpty(d.leadershipSection) ? {
          heading: 'Our Leadership Team',
          description: 'Empowering Excellence, Inspiring Growth.',
          members: [
            { name: 'Pravin Jain', role: 'Chairman', linkedin: '#', image: '/hubfs/Pravin Jain.webp', desc: 'Pravin...' },
            { name: 'Ashish Kulkarni', role: 'Vice President and BU Head', linkedin: '#', image: '/hubfs/Ashish Kulkarni.webp', desc: 'Ashish...' },
            { name: 'Dr. Damodaran Vedapuri', role: 'Head – North American Operations', linkedin: '#', image: '/hubfs/Dr. Damodaran Vedapuri.webp', desc: 'Dr. Damo...' }
          ]
        } : d.leadershipSection,
        coreTeamSection: isContentEmpty(d.coreTeamSection) ? {
          heading: 'Core Team',
          description: 'Delivering Value to the Customers',
          members: [
            { name: 'Dr. Jatin Agarwal', role: 'Program Director', linkedin: '#', image: '/hubfs/Dr. Jatin Agarwal.webp', desc: 'Dr. Jatin...' },
            { name: 'Dr. Mothivel Mummudi', role: 'Global Director (Pharma)', linkedin: '#', image: '/hubfs/Dr. Mothivel Mummudi.webp', desc: 'Dr. Mothivel...' }
          ]
        } : d.coreTeamSection,
        timelineSection: isContentEmpty(d.timelineSection) ? {
          heading: 'Tridiagonal Solutions Evolution',
          events: [
            { year: '2006', text: 'First company incubated...' },
            { year: '2008', text: 'Established Advanced...' },
            { year: '2010', text: 'Established center...' },
            { year: '2012', text: 'Developed CFD solver...' }
          ]
        } : d.timelineSection,
        ctaSection: isContentEmpty(d.ctaSection) ? {
          heading: 'Looking for a <span className="gradient-text">Trusted Partner</span> for<br />executing your programs?',
          description: 'We bring together unparalleled expertise with combination of skillsets and technology to<br />address your digital, computational and testing needs',
          buttonText: 'CONTACT US NOW',
          buttonLink: '/contact-us',
          bgImage: '/hubfs/topography-bg.webp'
        } : d.ctaSection
      };`;

content = content.replace(/const mergedData = \{[\s\S]*?ctaSection: d\.ctaSection \|\| \{[\s\S]*?\}\s*\};\s+/m, mergedDataStr + '\n\n');

// 2. Fix image upload widgets (4 instances) by replacing the `<div style={{ marginTop: '0.5rem' }}> ... </div>` blocks + preview.
const uploadWidgetHero = `<div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input type="text" value={data.heroSection?.bgImage || ''} onChange={e => updateSectionField('heroSection', 'bgImage', e.target.value)} className="admin-input" />
                  <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                    Upload Image
                    <input type="file" accept="image/*" onChange={(e) => handleImageUploadGeneric(e, (url) => updateSectionField('heroSection', 'bgImage', url))} style={{ display: 'none' }} />
                  </label>
                </div>
                {data.heroSection?.bgImage && (
                  <div className="admin-img-preview" style={{ maxWidth: '250px' }}><img src={data.heroSection.bgImage} alt="Hero Background"/></div>
                )}`;

const uploadWidgetGlance = `<div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input type="text" value={card.image || ''} onChange={e => updateArrayItem('atAGlanceSection', 'cards', i, 'image', e.target.value)} className="admin-input" />
                      <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                        Upload Image
                        <input type="file" accept="image/*" onChange={(e) => handleImageUploadGeneric(e, (url) => updateArrayItem('atAGlanceSection', 'cards', i, 'image', url))} style={{ display: 'none' }} />
                      </label>
                    </div>
                    {card.image && (
                      <div className="admin-img-preview" style={{ maxWidth: '150px' }}><img src={card.image} alt="Icon"/></div>
                    )}`;

const uploadWidgetLeader = `<div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input type="text" value={member.image || ''} onChange={e => updateArrayItem('leadershipSection', 'members', i, 'image', e.target.value)} className="admin-input" />
                      <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                        Upload Image
                        <input type="file" accept="image/*" onChange={(e) => handleImageUploadGeneric(e, (url) => updateArrayItem('leadershipSection', 'members', i, 'image', url))} style={{ display: 'none' }} />
                      </label>
                    </div>
                    {member.image && (
                      <div className="admin-img-preview" style={{ maxWidth: '100px' }}><img src={member.image} alt="Profile"/></div>
                    )}`;

const uploadWidgetCore = `<div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input type="text" value={member.image || ''} onChange={e => updateArrayItem('coreTeamSection', 'members', i, 'image', e.target.value)} className="admin-input" />
                      <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                        Upload Image
                        <input type="file" accept="image/*" onChange={(e) => handleImageUploadGeneric(e, (url) => updateArrayItem('coreTeamSection', 'members', i, 'image', url))} style={{ display: 'none' }} />
                      </label>
                    </div>
                    {member.image && (
                      <div className="admin-img-preview" style={{ maxWidth: '100px' }}><img src={member.image} alt="Profile"/></div>
                    )}`;

const uploadWidgetCTA = `<div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input type="text" value={data.ctaSection?.bgImage || ''} onChange={e => updateSectionField('ctaSection', 'bgImage', e.target.value)} className="admin-input" />
                  <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                    Upload Image
                    <input type="file" accept="image/*" onChange={(e) => handleImageUploadGeneric(e, (url) => updateSectionField('ctaSection', 'bgImage', url))} style={{ display: 'none' }} />
                  </label>
                </div>
                {data.ctaSection?.bgImage && (
                  <div className="admin-img-preview" style={{ maxWidth: '250px' }}><img src={data.ctaSection.bgImage} alt="CTA Bg"/></div>
                )}`;

// Replace Hero
content = content.replace(/<input type="text" value=\{data\.heroSection\?\.bgImage(.*?)className="admin-input-file" \/>\s*<\/div>/s, uploadWidgetHero);

// Replace Glance
content = content.replace(/<input type="text" value=\{card\.image(.*?)className="admin-input-file" \/>\s*<\/div>/s, uploadWidgetGlance);

// Replace Leader
content = content.replace(/<input type="text" value=\{member\.image \|\| ''\} onChange=\{e => updateArrayItem\('leadershipSection'(.*?)className="admin-input-file" \/>\s*<\/div>/s, uploadWidgetLeader);

// Replace Core Team
content = content.replace(/<input type="text" value=\{member\.image \|\| ''\} onChange=\{e => updateArrayItem\('coreTeamSection'(.*?)className="admin-input-file" \/>\s*<\/div>/s, uploadWidgetCore);

// Replace CTA
content = content.replace(/<input type="text" value=\{data\.ctaSection\?\.bgImage(.*?)className="admin-input-file" \/>\s*<\/div>/s, uploadWidgetCTA);

fs.writeFileSync('app/admin/pages/about-us/page.js', content, 'utf8');
console.log('Update successful');
