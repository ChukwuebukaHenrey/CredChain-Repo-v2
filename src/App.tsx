/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import WhoItsFor from "./components/WhoItsFor";
import ProofSection from "./components/ProofSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import SignUpView from "./components/SignUpView";
import { Credential } from "./types";

export default function App() {
  const [credentials, setCredentials] = useState<Credential[]>([
    {
      id: "default-1",
      candidateName: "Elena Rostova",
      institution: "Federal Institute of Engineering",
      credentialTitle: "B.Eng in Computer Engineering",
      gpaOrHonors: "4.0 GPA (First Class)",
      issueDate: "June 2026",
      txHash: "sol_tx_92Kx3dE8_v_z8Pq7w",
      blockNumber: 182901321,
      status: "VERIFIED",
      network: "Solana Proof Anchor"
    },
    {
      id: "default-2",
      candidateName: "Alex Chen",
      institution: "Stanford University",
      credentialTitle: "B.Sc in Computer Science",
      gpaOrHonors: "3.98 GPA / Highest Honors",
      issueDate: "April 2026",
      txHash: "sol_tx_7c99e4bF_s_de81a30",
      blockNumber: 182901309,
      status: "VERIFIED",
      network: "Solana Proof Anchor"
    },
    {
      id: "default-3",
      candidateName: "Marcus Vance",
      institution: "Georgia Institute of Technology",
      credentialTitle: "AWS Certified Cloud Practitioner",
      gpaOrHonors: "Score: 940/1000",
      issueDate: "May 2026",
      txHash: "sol_tx_9a3fE8_v_e8c2a93b",
      blockNumber: 182901311,
      status: "VERIFIED",
      network: "Solana Proof Anchor"
    }
  ]);

  const [currentView, setCurrentView] = useState<'landing' | 'signup'>('landing');
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'issuer' | 'verifier'>('candidate');

  const handleOpenDemo = (role: 'candidate' | 'issuer' | 'verifier' = 'candidate') => {
    setSelectedRole(role);
    setCurrentView('signup');
  };

  const latestCredential = credentials[0];

  if (currentView === 'signup') {
    return (
      <SignUpView 
        onBack={() => setCurrentView('landing')} 
        initialRole={selectedRole} 
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#05050a] text-white">
      {/* Sticky Top-level Navbar */}
      <Navbar onOpenDemo={handleOpenDemo} />

      {/* Hero Header Presentation */}
      <Hero onOpenDemo={handleOpenDemo} latestCredential={latestCredential} />

      {/* Global Ledger Stats Block */}
      <StatsBar issuedCount={credentials.length} />

      {/* Core Operational Method: 3 steps */}
      <HowItWorks />

      {/* 3x2 Grid of Capabilities */}
      <Features />

      {/* Who it's For Section with action blocks */}
      <WhoItsFor onOpenDemo={handleOpenDemo} />

      {/* Permanent Proof Comparison Display */}
      <ProofSection latestCredential={latestCredential} />

      {/* Central Interactive Call To Action */}
      <CTASection onOpenDemo={handleOpenDemo} />

      {/* Clean Aesthetic Footer */}
      <Footer />
    </div>
  );
}
