"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-8 px-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: November 3, 2024</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Welcome to DevTools Hub. We are committed to protecting your privacy and ensuring you have a positive experience on our website.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, and protect your information when you visit devtools-hub-app.vercel.app.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Information We Collect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold">1. Automatically Collected Information</h3>
          <p>
            When you visit our website, we automatically collect certain information about your device, including:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website</li>
          </ul>

          <h3 className="font-semibold mt-4">2. Cookies and Tracking Technologies</h3>
          <p>
            We use cookies and similar tracking technologies to improve your experience:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Essential Cookies</strong>: Required for the website to function (e.g., theme preference)</li>
            <li><strong>Analytics Cookies</strong>: Help us understand how visitors use our website (via Google Analytics)</li>
            <li><strong>Advertising Cookies</strong>: Used to show relevant ads (via Google AdSense)</li>
          </ul>

          <h3 className="font-semibold mt-4">3. Information You Provide</h3>
          <p>
            All tools on DevTools Hub process your data <strong>locally in your browser</strong>. We do not store, collect, or transmit any data you input into our tools (JSON, RegExp, Base64, JWT, etc.).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How We Use Your Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>We use the collected information to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Provide and maintain our services</li>
            <li>Improve and optimize our website</li>
            <li>Understand how users interact with our tools</li>
            <li>Display relevant advertisements (via Google AdSense)</li>
            <li>Comply with legal obligations</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Third-Party Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold">Google AdSense</h3>
          <p>
            We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites.
          </p>
          <p>
            You can opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Ads Settings
            </a>
            .
          </p>

          <h3 className="font-semibold mt-4">Google Analytics</h3>
          <p>
            We use Google Analytics to understand how visitors use our website. Google Analytics collects information anonymously and reports website trends without identifying individual visitors.
          </p>
          <p>
            Learn more about{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google's Privacy Policy
            </a>
            .
          </p>

          <h3 className="font-semibold mt-4">Vercel</h3>
          <p>
            Our website is hosted on Vercel. Vercel may collect anonymous analytics data. Learn more about{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Vercel's Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We implement appropriate security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
          </p>
          <p>
            <strong>Important</strong>: All tool processing (JSON, RegExp, Base64, JWT, etc.) happens locally in your browser. We never send your sensitive data to our servers.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Rights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Depending on your location, you may have the following rights:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Access your personal data</li>
            <li>Request correction or deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request restriction of processing</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us at: <strong>privacy@devtools-hub.com</strong>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Children's Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Changes to This Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
            <li>Email: privacy@devtools-hub.com</li>
            <li>Website: https://devtools-hub-app.vercel.app</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
