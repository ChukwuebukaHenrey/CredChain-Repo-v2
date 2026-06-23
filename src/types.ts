export interface Credential {
  id: string;
  candidateName: string;
  institution: string;
  credentialTitle: string;
  gpaOrHonors?: string;
  issueDate: string;
  txHash: string;
  blockNumber: number;
  status: 'VERIFIED' | 'PENDING' | 'REVOKED';
  network: string;
  qrCodeUrl?: string;
}

export interface Stats {
  issuedCount: number;
  institutionsCount: number;
  verificationTime: string;
  fraudRate: string;
}
