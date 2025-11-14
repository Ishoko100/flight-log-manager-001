
import React from 'react';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-2">
    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">{title}</h2>
    <div className="text-slate-600 dark:text-slate-400 text-sm space-y-3">
      {children}
    </div>
  </div>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li>{children}</li>
);

export const TermsOfService: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-in-up bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-black/20">
      <div className="text-center border-b border-slate-200 dark:border-slate-700 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Terms of Service</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400"><strong>Effective Date:</strong> November 2025</p>
      </div>

      <div className="space-y-6">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Welcome to <strong>Flight Log Manager</strong>, a flight management app for drone operators developed by <strong>MITDRONE</strong>. These Terms of Service (“Terms”) govern your access to and use of our app, website, and related services (collectively, the “Service”).
        </p>

        <Section title="1. Eligibility">
          <p>You must be at least 18 years old to use the Service or have permission from a legal guardian. By using the app, you confirm that the information you provide is accurate and complete.</p>
        </Section>

        <Section title="2. Use of Service">
          <ul className="list-disc list-inside space-y-1">
            <ListItem>Use the Service only for lawful purposes.</ListItem>
            <ListItem>Do not upload or share illegal, harmful, or misleading data.</ListItem>
            <ListItem>Do not attempt to hack, reverse-engineer, or disrupt the Service.</ListItem>
            <ListItem>Do not track or record drone data for unauthorized purposes.</ListItem>
          </ul>
        </Section>

        <Section title="3. Account Registration">
          <p>You may need to create an account to access certain features. You are responsible for maintaining your account confidentiality and all activities under it.</p>
        </Section>

        <Section title="4. Subscription and Payments">
          <ul className="list-disc list-inside space-y-1">
            <ListItem>The app offers free and Pro subscription plans.</ListItem>
            <ListItem>The free plan includes limited access (3-day trial, 1 drone log, basic analytics).</ListItem>
            <ListItem>The Pro plan includes unlimited logs, AI summaries, maintenance alerts, ad-free use, and priority support.</ListItem>
            <ListItem>Payments are processed through <strong>Stripe</strong>. Fees are non-refundable except as required by law.</ListItem>
          </ul>
        </Section>

        <Section title="5. Intellectual Property">
          <p>All rights, trademarks, and content within the app belong to <strong>MITDRONE</strong> or its licensors. Do not copy, modify, or distribute them without permission.</p>
        </Section>

        <Section title="6. Termination">
          <p>We may suspend or terminate your account for violating these Terms or engaging in harmful activity.</p>
        </Section>

        <Section title="7. Disclaimer and Limitation of Liability">
          <p>The Service is provided “as is” without warranties. MITDRONE is not liable for data loss, revenue loss, or damages resulting from use of the Service.</p>
        </Section>

        <Section title="8. Changes to Terms">
          <p>We may update these Terms periodically. Continued use after changes means you accept them.</p>
        </Section>

        <Section title="9. Contact">
          <p>
            Questions about these Terms? Email us at <a href="mailto:info@mitdrone.com" className="text-teal-500 hover:underline">info@mitdrone.com</a>.
          </p>
        </Section>
      </div>
    </div>
  );
};
