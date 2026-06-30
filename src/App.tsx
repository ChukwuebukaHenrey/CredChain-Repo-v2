/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import WhoItsFor from "./components/WhoItsFor";
import ProofSection from "./components/ProofSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import SignupCandidate from "./pages/SignupCandidate";
import SignupIssuer from "./pages/SignupIssuer";
import SignupVerifier from "./pages/SignupVerifier";
import CandidateDashboard from "./pages/CandidateDashboard";
import IssuerDashboard from "./pages/IssuerDashboard";
import VerifierDashboard from "./pages/VerifierDashboard";
import PublicProfile from "./pages/PublicProfile";
import { Credential } from "./types";

function Landing() {
  return (
    <div className="relative min-h-screen bg-bg-base text-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <ProofSection />
      <WhoItsFor />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
}

export default function App() {
  const [credentials] = useState<Credential[]>([
    {
      id: "default-1",
      candidateName: "Emeka Obi",
      institution: "Federal University of Technology Owerri",
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/role" element={<RoleSelection />} />
        <Route path="/signup/candidate" element={<SignupCandidate />} />
        <Route path="/signup/issuer" element={<SignupIssuer />} />
        <Route path="/signup/verifier" element={<SignupVerifier />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<CandidateDashboard />} />
        <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
        <Route path="/issuer" element={<IssuerDashboard />} />
        <Route path="/dashboard/issuer" element={<IssuerDashboard />} />
        <Route path="/verifier" element={<VerifierDashboard />} />
        <Route path="/dashboard/verifier" element={<VerifierDashboard />} />
        <Route path="/verify/:candidateId" element={<PublicProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
