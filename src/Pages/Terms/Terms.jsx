import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfUse = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-white dark:bg-[#0D1128] text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold text-lime-400 mb-6">Terms of Use</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: July 2, 2025</p>

      <p className="mb-6">
        Welcome to <strong className="dark:text-lime-300">RecoSys</strong>. These Terms of Use govern your access to and use of our platform, including all content, features, and services made available through <span className="dark:text-lime-300">https://recosys.com</span>. By accessing or using the platform, you agree to be bound by these terms.
      </p>

      {/* Section 1 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">1. Acceptance of Terms</h2>
      <p className="mb-5">
        By using RecoSys, you acknowledge that you have read, understood, and agree to be bound by these Terms and any future modifications. If you do not agree, please do not use the service.
      </p>

      {/* Section 2 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">2. Eligibility</h2>
      <p className="mb-5">
        You must be at least 13 years old to use RecoSys. If you are under 18, you may only use the platform under the supervision of a parent or legal guardian.
      </p>

      {/* Section 3 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">3. User Responsibilities</h2>
      <p className="mb-5">
        Users are solely responsible for the content they post, including queries, comments, and recommendations. Content must not violate any applicable laws, be offensive, misleading, or infringe on intellectual property rights.
      </p>

      {/* Section 4 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">4. Intellectual Property</h2>
      <p className="mb-5">
        All content and materials on RecoSys, including logos, graphics, text, and code, are the intellectual property of RecoSys or its licensors. You may not copy, modify, distribute, or reproduce any part of the platform without prior written permission.
      </p>

      {/* Section 5 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">5. Limitation of Liability</h2>
      <p className="mb-5">
        RecoSys provides recommendations and content for informational purposes only. We are not liable for any damages arising from reliance on user-submitted content or interactions within the platform.
      </p>

      {/* Section 6 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">6. Termination</h2>
      <p className="mb-5">
        We reserve the right to suspend or terminate your access to the platform at any time, without notice, if you violate these Terms or engage in harmful behavior.
      </p>

      {/* Section 7 */}
      <h2 className="text-2xl font-semibold dark:text-lime-300 mt-10 mb-3">7. Changes to Terms</h2>
      <p className="mb-5">
        These Terms of Use may be updated from time to time. We encourage you to review this page periodically. Your continued use of RecoSys after changes are posted constitutes acceptance of those changes.
      </p>

      <p className="mt-10">
        If you have any questions or concerns about these Terms, please feel free to{' '}
        <Link to="/contact" className="dark:text-lime-300 underline hover:text-lime-400">contact us</Link>.
      </p>
    </div>
  );
};

export default TermsOfUse;
