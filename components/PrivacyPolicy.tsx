
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

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-in-up bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-black/20">
      <div className="text-center border-b border-slate-200 dark:border-slate-700 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Privacy Policy</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400"><strong>Effective Date:</strong> November 2025</p>
      </div>

      <div className="space-y-6">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <strong>MITDRONE</strong> (“we,” “our,” or “us”) respects your privacy. This Privacy Policy explains how we collect, use, and protect your data when you use <strong>Flight Log Manager</strong>.
        </p>

        <Section title="1. Information We Collect">
          <ul className="list-disc list-inside space-y-1">
            <ListItem><strong>Account Info:</strong> name, email, and login details.</ListItem>
            <ListItem><strong>Flight Data:</strong> flight logs, analytics, drone IDs, and GPS data.</ListItem>
            <ListItem><strong>Device Info:</strong> browser type, operating system, IP address.</ListItem>
            <ListItem><strong>Payment Info:</strong> processed securely by Stripe (we do not store card details).</ListItem>
            <ListItem><strong>Usage Data:</strong> activity logs, preferences, and analytics.</ListItem>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc list-inside space-y-1">
            <ListItem>Provide and improve the app’s features.</ListItem>
            <ListItem>Analyze usage patterns and app performance.</ListItem>
            <ListItem>Process payments and manage subscriptions.</ListItem>
            <ListItem>Send important updates or offers (Pro plan notifications).</ListItem>
            <ListItem>Enable AI-driven insights and summaries.</ListItem>
          </ul>
        </Section>

        <Section title="3. Data Storage and Security">
          <p>Your data is stored using trusted services such as Google Cloud, GitHub, and Firebase. We take reasonable steps to protect your data but cannot guarantee absolute security.</p>
        </Section>

        <Section title="4. Cookies and Tracking">
          <p>We use cookies and analytics tools to understand behavior and improve performance. You can disable cookies in your browser, but some features may not work properly.</p>
        </Section>

        <Section title="5. Data Sharing">
            <p>We do not sell or rent data. We may share it with:</p>
            <ul className="list-disc list-inside space-y-1">
                <ListItem>Payment processors (Stripe)</ListItem>
                <ListItem>Service providers (Google Cloud, Firebase)</ListItem>
                <ListItem>Legal authorities when required</ListItem>
            </ul>
        </Section>
        
        <Section title="6. Your Rights">
          <ul className="list-disc list-inside space-y-1">
            <ListItem>Access or update your information.</ListItem>
            <ListItem>Request deletion by contacting us.</ListItem>
            <ListItem>Opt out of promotional messages anytime.</ListItem>
          </ul>
        </Section>

        <Section title="7. Children’s Privacy">
          <p>The app is not intended for children under 13. We do not knowingly collect data from minors.</p>
        </Section>

        <Section title="8. Updates to This Policy">
          <p>We may update this Privacy Policy periodically. The latest version will always be posted within the app and on our website.</p>
        </Section>

        <Section title="9. Contact">
          <p>
            For privacy inquiries, contact us at <a href="mailto:admin@mitdrone.com" className="text-teal-500 hover:underline">admin@mitdrone.com</a>.
          </p>
        </Section>
      </div>
    </div>
  );
};