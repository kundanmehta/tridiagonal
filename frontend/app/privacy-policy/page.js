'use client';

export default function PrivacyPolicy() {
  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      {/* HERO SECTION */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)', minHeight: 'auto', padding: '80px 0 60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '15px' }}>
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            We are committed to protecting your privacy and ensuring your data is handled securely.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT — full width with 30px padding like homepage */}
      <section style={{ background: '#1a1a1a', padding: '60px 0 80px' }}>
        <div className="content-wrapper-lg" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', lineHeight: '1.8' }}>
          
          <p style={{ marginBottom: '20px' }}>
            Tridiagonal Solutions respects the privacy of our users and has developed this Privacy Policy to demonstrate its commitment to protecting your privacy. These privacy policies describe to you how Tridiagonal Solutions protects and makes use of the information you give the company when you use this website. We encourage you to read this Privacy Policy when using our website or services or transacting business with us. By using our websites or any of our applications, you are accepting the practices described in this Privacy Policy.
          </p>
          <p style={{ marginBottom: '20px' }}>
            If you are asked to provide information when using this website, it will only be used in the way described in this privacy policy.
          </p>
          <p style={{ color: 'var(--color-teal)', fontWeight: 'bold', marginBottom: '40px' }}>
            This policy is updated from time to time, and the latest version is published on this page.
          </p>

          {/* SUMMARY */}
          <h2 style={{ fontSize: '28px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', marginTop: '50px' }}>Summary</h2>
          <p style={{ marginBottom: '20px' }}>This summary section sets out the summary for this Privacy Policy. Further information about this privacy policy is provided within this privacy policy.</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
            <li><strong>Data Controller:</strong> Tridiagonal Solutions</li>
            <li><strong>How we collect or obtain personal data about you:</strong> When you provide it to us (e.g. contacting us, subscribing to our mailing list, placing an order with us, attending an event), from your use of our website (e.g. cookies), or from third-parties.</li>
            <li><strong>Personal data we may collect:</strong> name, business name, business address, IP address, information from cookies, information about your computer or device (device and browser type), how you use our website (pages you have viewed, the time, geographical location from which access our website).</li>
            <li><strong>How we use your personal data:</strong> Collecting this data helps us understand what you are looking from the company, enabling us to deliver improved products and services. Specifically, we may use data for our own internal records, to improve services, respond to enquiries, customize the website, and send promotional emails or call you.</li>
            <li><strong>Disclosure of your personal data to third-parties:</strong> Only to the extent necessary to run our business, to our services providers, to fulfil any contracts we enter into with you, and where required by law or to enforce our legal rights.</li>
            <li><strong>Data sales:</strong> We do not sell your personal data to third-parties.</li>
            <li><strong>How long we retain your information:</strong> No longer than necessary, except taking into account any legal obligations.</li>
            <li><strong>How we secure your information:</strong> Using appropriate physical, technical and organisational measures (e.g. secure servers, SSL technology).</li>
            <li><strong>Transfer of your personal data outside the EEA:</strong> In certain circumstances we may transfer your information outside of the European Economic Area (EEA), including the United States of America, ensuring appropriate safeguards are in place.</li>
          </ul>

          {/* DATA CONTROLLER */}
          <h2 style={{ fontSize: '28px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', marginTop: '50px' }}>Data Controller</h2>
          <p style={{ marginBottom: '20px' }}>
            The data controller in respect of our website is Tridiagonal Solutions. The registered office is at 100 NCL Innovation Park, Dr. Homi Bhabha Road, Pune 411008, India.
          </p>
          <p style={{ marginBottom: '20px' }}>
            You can contact the data controller by emailing <a href="mailto:marketing@tridiagonal.com" style={{ color: 'var(--color-teal)', textDecoration: 'none' }}>marketing@tridiagonal.com</a> or alternatively, write to:
          </p>
          <div style={{ background: '#242424', padding: '25px 30px', borderRadius: '12px', borderLeft: '4px solid var(--color-teal)', marginBottom: '20px' }}>
            <p style={{ fontWeight: 'bold', color: '#fff', margin: '0 0 5px 0' }}>Tridiagonal Solutions</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>12703 Spectrum Drive, San Antonio, TX 78249</p>
          </div>
          <p>If you have any questions about this policy, please contact the data controller.</p>

          {/* WHAT AND HOW WE USE DATA */}
          <h2 style={{ fontSize: '28px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', marginTop: '50px' }}>What and how we use the personal data we collect about you</h2>
          <p style={{ marginBottom: '20px' }}>This section sets out the personal data we collect, when you:</p>

          <h3 style={{ fontSize: '22px', color: '#fff', marginTop: '30px', marginBottom: '15px' }}>Visit our website</h3>
          <p style={{ marginBottom: '15px' }}>We collect and use information from website visitors in accordance with this section and the section entitled 'Disclosure and additional uses of your personal data'.</p>

          <h4 style={{ fontSize: '18px', color: '#fff', marginTop: '25px', marginBottom: '12px' }}>Web Server Log Information</h4>
          <p style={{ marginBottom: '15px' }}>
            We use a third party to host our website. Our website automatically logs the IP address you use to access our website and other Information about your visit. Example: pages accessed, information requested, the data and time of the request, the source of your access to our website (e.g. the website or URL (link) which referred you to our website), and your browser and operating system. Our server is located in United States Of America.
          </p>

          <h4 style={{ fontSize: '18px', color: '#fff', marginTop: '25px', marginBottom: '12px' }}>Use of website server log information for IT security purposes</h4>
          <p style={{ marginBottom: '15px' }}>
            Our third party hosting provider stores server logs to ensure network and IT security and so that the server and website remain uncompromised. This includes analyzing log files to help identify and prevent unauthorized access to our network, the distribution of malicious code, denial of service attacks, and other cyber-attacks by detecting unusual or suspicious activity.
          </p>
          <p style={{ marginBottom: '15px' }}>
            Unless we are investigating suspicious or potential criminal activity, we do not make, or otherwise allow our website service provider to make any attempt to identify you from the information collected via server logs.
          </p>
          <p style={{ marginBottom: '15px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
            Legal basis for processing: Compliance with legal obligations (Article 6(1)(c) and Article 6(1)(f) of the General Data Protection Regulation).
          </p>

          <h4 style={{ fontSize: '18px', color: '#fff', marginTop: '25px', marginBottom: '12px' }}>Cookies</h4>
          <p style={{ marginBottom: '15px' }}>
            Cookies are data files which are sent from a website to a browser to record information about users for various purposes. We use cookies, including essential, functional and analytical cookies.
          </p>
          <p style={{ marginBottom: '15px' }}>
            Cookies allow website and applications to store your preferences in order to present content, options, or functions that are specific to you. They also enable us to see information like how many people use the website and what pages they visit. You can use your web browser's cookies settings to determine how our websites uses cookies. If you do not want our website to store cookies on your computer or device, you should set your web browser to refuse cookies. However, please note that doing this may affect how our website functions.
          </p>

          <h3 style={{ fontSize: '22px', color: '#fff', marginTop: '35px', marginBottom: '15px' }}>Interact with our website</h3>
          <p style={{ marginBottom: '15px' }}>We collect and use information from individuals who interact with particular features of our website.</p>

          <h4 style={{ fontSize: '18px', color: '#fff', marginTop: '25px', marginBottom: '12px' }}>Registering on our website</h4>
          <p style={{ marginBottom: '15px' }}>
            When you register and create a MYPSE account on our website, we collect the following information: name, business email, business name, job title and country. We also collect department, division, interests and mailing list if you provide it. If you do not provide the mandatory information by our registration form, you will not be able to register or create an account on our website.
          </p>
          <p style={{ marginBottom: '15px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
            Legal basis for processing: our legitimate interests (Article 6(1)(f) of the General Data Protection Regulation). Legitimate Interest: registering and administering accounts on our website to provide you access to content updates you have purchased and facilitate the efficient running and operation of our business.
          </p>

          <h4 style={{ fontSize: '18px', color: '#fff', marginTop: '25px', marginBottom: '12px' }}>Mailing List</h4>
          <p style={{ marginBottom: '15px' }}>
            When you sign-up to our mailing list to receive information about interests, products, services and interests we collect your business email address. We use a third party service to administer and send out our mailing list, called Active Campaign. Active Campaign adheres to the EU-U.S. Privacy Shield Framework Principles.
          </p>

          <h4 style={{ fontSize: '18px', color: '#fff', marginTop: '25px', marginBottom: '12px' }}>Careers</h4>
          <p style={{ marginBottom: '15px' }}>
            When you apply for a job opportunity or prospective opportunity, we collect the following information: name and email. We also collect your address, phone number and other information if you provide it.
          </p>

          <h4 style={{ fontSize: '18px', color: '#fff', marginTop: '25px', marginBottom: '12px' }}>Contact Us</h4>
          <p style={{ marginBottom: '15px' }}>
            When you send an email to the email address displayed on our website, we collect your email address and any other information you provide in that email (such as your name, telephone numbers and information contained in any signature block in your email). When you contact us using our contact form, we collect the following information: name, business name, email and any information you include in the message field. When you contact us by phone, we collect your phone number and any information provided to us during the conversation. We do not record phone calls.
          </p>

          <h4 style={{ fontSize: '18px', color: '#fff', marginTop: '25px', marginBottom: '12px' }}>Technical Support</h4>
          <p style={{ marginBottom: '15px' }}>
            When you contact us via email, technical support form, phone or post for technical support, we collect the relevant information you provide. This is used for responding to enquiries and messages we receive and keeping records of correspondence.
          </p>

          <h4 style={{ fontSize: '18px', color: '#fff', marginTop: '25px', marginBottom: '12px' }}>Placing an order on our website</h4>
          <p style={{ marginBottom: '15px' }}>
            When you place an order for goods or services on our website, we collect the following mandatory information: name, address (including post code, town/city and country), email. If you do not provide this information, you will not be able to purchase products or services from our website or enter into a contract with us. After you place an order, your payment will be processed by the payment provider you choose via a payment gateway. We use manual payment system and not on website payment process.
          </p>

          {/* PERSONAL DATA FROM THIRD PARTIES */}
          <h3 style={{ fontSize: '22px', color: '#fff', marginTop: '35px', marginBottom: '15px' }}>Personal data about you from third-parties</h3>
          <p style={{ marginBottom: '15px' }}>
            Generally, we do not receive personal data about you from third-parties. The third-parties from which we receive personal data about you will generally include other businesses and clients we work with from time to time who may recommend our services to you. Personal data we obtain from third-parties will generally be your name and contact details, but will include any additional information about you which they provide us.
          </p>

          {/* DISCLOSURE */}
          <h2 style={{ fontSize: '28px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', marginTop: '50px' }}>Disclosure and additional uses of your personal data</h2>
          <p style={{ marginBottom: '20px' }}>This sets out the circumstances in which we will disclose information about you to third-parties and any additional purposes for which we use your information.</p>

          <h3 style={{ fontSize: '22px', color: '#fff', marginTop: '30px', marginBottom: '15px' }}>Sharing your personal data to service providers</h3>
          <p style={{ marginBottom: '15px' }}>
            We use several third party providers to provide us with services which are necessary to run our business. This includes: Mailing List provider (USA), Marketing Survey provider (USA), IT Service providers, Hosting providers (France), Web Developers (UK), Telephone providers (UK). Your information will be shared with these service providers only where necessary to enable us to run our business.
          </p>

          <h3 style={{ fontSize: '22px', color: '#fff', marginTop: '30px', marginBottom: '15px' }}>Sharing your personal data for legal reasons</h3>
          <p style={{ marginBottom: '15px' }}>
            If we suspect that criminal or potential criminal activity has occurred, we will in certain circumstances need to contact an appropriate authority. We will use your information in connection with the enforcement or potential enforcement of our legal rights, including sharing information with debt collection agencies. We may also need to use your information if we are involved in a dispute with you or a third-party, and will use and process your information in order to comply with legal obligations.
          </p>

          <h3 style={{ fontSize: '22px', color: '#fff', marginTop: '30px', marginBottom: '15px' }}>Sharing your personal data to other third-parties</h3>
          <p style={{ marginBottom: '15px' }}>
            <strong>Google Inc.</strong> — Google collects information through our use of Google Analytics on our website. Information is shared with Google on an aggregated and anonymized basis. You can opt-out of Google Analytics by installing the browser plugin.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Roxr Software Limited (Clicky Web Analytics)</strong> — Roxr Software Limited collects information through the use of Clicky Web Analytics on our website.
          </p>
          <p style={{ marginBottom: '15px' }}>
            We may also share information with: accountants (for tax purposes), advisors (accountants, financial advisors, lawyers, and other specialists), affiliates, business partners, independent contractors, and insurers — only where necessary.
          </p>

          {/* RETENTION */}
          <h2 style={{ fontSize: '28px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', marginTop: '50px' }}>How long do we retain your personal data</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <li><strong>Order information:</strong> Minimum period of six years following the end of the financial year in which you have placed your order.</li>
            <li><strong>Correspondence and enquiries:</strong> Retained for as long as it takes to resolve your enquiry, and for twelve (12) further months.</li>
            <li><strong>Mailing list:</strong> Retained for as long as you remain subscribed (i.e. you do not unsubscribe).</li>
          </ul>
          <p style={{ marginBottom: '15px' }}>
            In any other circumstances, we will retain your information for no longer than necessary, taking into account the purpose(s) and use of your information, any legal obligations, the value of your information, the levels of risk involved with us continuing to hold the information, and any relevant surrounding circumstances.
          </p>

          {/* SECURITY */}
          <h2 style={{ fontSize: '28px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', marginTop: '50px' }}>How we secure your personal data</h2>
          <p style={{ marginBottom: '15px' }}>We take appropriate technical and organisational measures to secure your information, including:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <li>Only sharing and providing access to your information to the minimum extent necessary, subject to confidentiality restrictions where appropriate and on an anonymized basis wherever possible.</li>
            <li>Using secure servers to store your information.</li>
            <li>Verifying the identity of any individual who requests access to information prior to granting them access.</li>
            <li>Using Secure Sockets Layer (SSL) software or other similar encryption technologies to encrypt data transmission between your system and our website, including any payment transactions.</li>
          </ul>
          <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', marginBottom: '15px' }}>
            Transmission of information sent over the internet is not entirely secure, and if you submit any information to us over the internet, you do so entirely at your own risk.
          </p>

          {/* TRANSFERS */}
          <h2 style={{ fontSize: '28px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', marginTop: '50px' }}>Transfers of your personal data outside of the EEA</h2>
          <p style={{ marginBottom: '15px' }}>
            Your information will be transferred and stored outside the European Economic Area (EEA) in circumstances set out below. We will also transfer your information outside the EEA in the unlikely event that we are required to comply with legal obligations (e.g. compliance with a court order). Where we are required to do so, we will ensure appropriate safeguards and protections are in place.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Mailing list:</strong> Personal data you submit to us when you sign-up to our mailing list might be transferred outside the EEA and stored on our third party mailing list provider's servers (Active Campaign), which has self-certified its compliance with the EU-US Privacy Shield.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Payment processing:</strong> When you pay for products and services on our site, if you select PayPal or Stripe, information about your order and the processing of your order may be transferred outside of the EEA. Both providers ensure appropriate safeguards are in place.
          </p>

          {/* YOUR RIGHTS */}
          <h2 style={{ fontSize: '28px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', marginTop: '50px' }}>Your rights to your personal data</h2>
          <p style={{ marginBottom: '15px' }}>Subject to certain limitations, you have the following rights in relation to your personal data, which you can exercise by writing to Tridiagonal Solutions, 12703 Spectrum Drive, San Antonio, TX 78249, or emailing <a href="mailto:marketing@tridiagonal.com" style={{ color: 'var(--color-teal)', textDecoration: 'none' }}>marketing@tridiagonal.com</a>:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <li>To request access to your information</li>
            <li>To request correction or deletion of your personal data</li>
            <li>To request that we restrict use of your personal data</li>
            <li>To receive information which you have provided to us in a structured, commonly used and machine-readable format (e.g. CSV file)</li>
            <li>To object to the processing of your personal data for certain purposes</li>
            <li>To withdraw your consent to the use of your personal data</li>
          </ul>
          <p style={{ marginBottom: '15px' }}>
            In accordance with Article 77 of the General Data Protection Regulation, you have the right to lodge a complaint with a supervisory authority.
          </p>
          <p style={{ marginBottom: '15px' }}>
            Where you request access to your information, we are required by law to use all reasonable measures to verify your identity before doing so. These measures are designed to protect your information and to reduce the risk of identity fraud, identity theft or general unauthorised access to your information.
          </p>

          {/* RIGHT TO OBJECT */}
          <h3 style={{ fontSize: '22px', color: '#fff', marginTop: '35px', marginBottom: '15px' }}>Your right to object to the processing of your personal data</h3>
          <p style={{ marginBottom: '15px' }}>You have the following rights, which you may exercise by writing to Tridiagonal Solutions, 12703 Spectrum Drive, San Antonio, TX 78249 or emailing <a href="mailto:marketing@tridiagonal.com" style={{ color: 'var(--color-teal)', textDecoration: 'none' }}>marketing@tridiagonal.com</a>:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <li>To object to us using or processing your personal data where we use or process it in order to carry out a task in the public interest or for our legitimate interests, including 'profiling'.</li>
            <li>To object to us using or processing your personal data for direct marketing purposes.</li>
          </ul>
          <p style={{ marginBottom: '15px' }}>
            You may also exercise your rights by clicking the unsubscribe link contained at the bottom of any marketing email we send to you, or by sending an email to <a href="mailto:marketing@tridiagonal.com" style={{ color: 'var(--color-teal)', textDecoration: 'none' }}>marketing@tridiagonal.com</a> asking that we stop sending you marketing communications and including the words 'OPT OUT' within the Subject.
          </p>

          {/* SENSITIVE */}
          <h2 style={{ fontSize: '28px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', marginTop: '50px' }}>Sensitive personal information</h2>
          <p style={{ marginBottom: '15px' }}>
            Sensitive personal data is information about an individual that reveals: race, ethnic origin, political opinions, religion, philosophical beliefs, trade union membership, genetic information, biometric information, health, or sexual orientation.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>We do not knowingly or intentionally collect sensitive personal data from individuals, and you must not submit sensitive personal information to us.</strong> However, if you inadvertently or intentionally transmit sensitive personal information to us, you will be considered to have explicitly consented to us processing that sensitive personal information under Article 9(2)(a) of the General Data Protection Regulation.
          </p>

          {/* CHANGES */}
          <h2 style={{ fontSize: '28px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', marginTop: '50px' }}>Changes to our privacy policy</h2>
          <p style={{ marginBottom: '15px' }}>
            Where we make minor changes to our Privacy policy, we will update our privacy policy with a new effective date stated at the beginning of it. Our processing of your information will be governed by the practices set out in the new version from its effective date onwards.
          </p>
          <p style={{ marginBottom: '15px' }}>
            Where we make major changes to our Privacy policy, or intend to use your information for a new purpose or a different purpose than the purpose for which we originally collect it, we will notify you by email (where possible) or by posting a notice on our website.
          </p>

          {/* ADDITIONAL */}
          <h2 style={{ fontSize: '28px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', marginTop: '50px' }}>Additional information</h2>
          <h3 style={{ fontSize: '22px', color: '#fff', marginTop: '25px', marginBottom: '15px' }}>Children's privacy</h3>
          <p style={{ marginBottom: '15px' }}>
            We do not knowingly contact or collect information from persons under the age of 18. The website is not intended to solicit information of any kind from persons under the age of 18. If we are notified of this, after verification, we will delete the information from our systems.
          </p>
          <h3 style={{ fontSize: '22px', color: '#fff', marginTop: '25px', marginBottom: '15px' }}>No rights of third-parties</h3>
          <p style={{ marginBottom: '0' }}>
            This privacy policy does not create rights enforceable by third-parties or require disclosure of any personal information relating to the users of the website.
          </p>

        </div>
      </section>
    </main>
  );
}
