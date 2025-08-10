import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-white dark:bg-[#0D1128] text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold text-lime-400 mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: July 2, 2025</p>

      <p className="mb-6">
        At <strong className="dark:text-lime-300">RecoSys</strong>, your privacy is important to us. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our platform. By accessing or using our services, you agree to the terms outlined below.
      </p>

      {/* Section 1 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">1. Information We Collect</h2>
      <p className="mb-5">
        We may collect the following types of personal information:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Email address and display name (during registration)</li>
          <li>Query or recommendation content you submit</li>
          <li>Usage data such as clicks, page views, and login timestamps</li>
        </ul>
      </p>

      {/* Section 2 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">2. How We Use Your Information</h2>
      <p className="mb-5">
        We use the information we collect to:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Provide and improve our recommendation system</li>
          <li>Respond to user queries and support requests</li>
          <li>Monitor platform activity and ensure security</li>
          <li>Send newsletters (if you opt-in)</li>
        </ul>
      </p>

      {/* Section 3 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">3. Sharing Your Data</h2>
      <p className="mb-5">
        We do <span className="font-semibold dark:text-lime-300">not sell</span> your personal data. We may share your data with trusted service providers (e.g., Firebase, analytics platforms) for platform functionality, but always under strict confidentiality agreements.
      </p>

      {/* Section 4 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">4. Data Security</h2>
      <p className="mb-5">
        We implement industry-standard security measures to protect your data. However, no method of online transmission or storage is 100% secure. We recommend using strong passwords and logging out after sessions on shared devices.
      </p>

      {/* Section 5 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">5. Your Rights</h2>
      <p className="mb-5">
        You have the right to:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Access, update, or delete your personal information</li>
          <li>Opt out of receiving marketing emails</li>
          <li>Request data portability</li>
        </ul>
        You can do this by contacting us directly or through your user account settings.
      </p>

      {/* Section 6 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">6. Third-Party Links</h2>
      <p className="mb-5">
        Our platform may contain links to external websites. We are not responsible for the content or privacy practices of these third parties. We encourage you to review their policies before sharing personal information.
      </p>

      {/* Section 7 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">7. Updates to This Policy</h2>
      <p className="mb-5">
        We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top. Continued use of the platform indicates acceptance of any changes.
      </p>

      {/* Contact */}
      <p className="mt-10">
        If you have questions or concerns regarding this Privacy Policy, please{' '}
        <Link to="/contact" className="dark:text-lime-300 underline hover:text-lime-400">contact us</Link>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
