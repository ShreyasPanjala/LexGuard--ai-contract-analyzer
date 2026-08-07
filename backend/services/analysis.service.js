'use strict';

/**
 * Mock clause dataset — 12 realistic contract clauses across risk levels.
 *
 * TODO (Phase 2): Replace MOCK_CLAUSES with real AI-generated clause extraction
 * and risk classification:
 *
 *   const { clauses, overallRisk, summary } = await openai.analyze(extractedText);
 *   return { overallRisk, summary, stats: computeStats(clauses), clauses };
 */
const MOCK_CLAUSES = [
  {
    id: 1,
    title: 'Termination Clause',
    risk: 'High',
    explanation:
      'The agreement permits immediate unilateral termination without prior notice, leaving the non-terminating party exposed to abrupt contract endings with no opportunity to remedy any alleged breach.',
    alternative:
      'Include a minimum 30-day written notice period before termination. For material breaches, add a 15-day cure period to allow the breaching party to remedy the issue before termination takes effect.',
  },
  {
    id: 2,
    title: 'Intellectual Property Rights',
    risk: 'High',
    explanation:
      'The work-for-hire provisions are overly broad and may inadvertently transfer ownership of pre-existing IP assets, internal tools, and proprietary frameworks to the counterparty, beyond the scope of contract deliverables.',
    alternative:
      'Clearly define the scope of IP assignment to cover only deliverables created specifically under this contract. Include an explicit carve-out retaining ownership of all pre-existing IP, tools, and background technology.',
  },
  {
    id: 3,
    title: 'Indemnification Clause',
    risk: 'High',
    explanation:
      'Indemnification obligations are one-sided and uncapped, potentially exposing one party to unlimited third-party claims and legal costs that far exceed the total contract value.',
    alternative:
      'Implement mutual indemnification with clear financial caps tied to the total contract value. Include carve-outs for gross negligence and willful misconduct. Require the indemnified party to give prompt written notice of claims.',
  },
  {
    id: 4,
    title: 'Non-Compete Agreement',
    risk: 'High',
    explanation:
      'The non-compete clause imposes an unreasonably broad 5-year duration with a worldwide geographic scope, which may be unenforceable in many jurisdictions and could unlawfully restrict legitimate business activities post-contract.',
    alternative:
      "Limit the non-compete to specific industry verticals directly competing with the counterparty's core business. Reduce the duration to 12 months post-contract termination. Define a narrow, commercially reasonable geographic boundary.",
  },
  {
    id: 5,
    title: 'Liability Limitation',
    risk: 'Medium',
    explanation:
      'The liability cap is set at a fixed nominal amount that may be wholly inadequate given the potential scale of damages arising from material service failures, data loss, or regulatory non-compliance.',
    alternative:
      'Set liability caps proportional to the total fees paid in the preceding 12 months, or the actual documented damages — whichever is lower. Maintain separate, higher caps for data breach and IP infringement scenarios.',
  },
  {
    id: 6,
    title: 'Governing Law & Jurisdiction',
    risk: 'Medium',
    explanation:
      'All disputes are required to be resolved exclusively in a single distant jurisdiction, creating significant financial and logistical burdens for the counterparty, particularly for small disputes where litigation costs may exceed the claim value.',
    alternative:
      "Negotiate for a neutral jurisdiction agreed upon by both parties, or adopt a rule where disputes are heard in the defendant's home jurisdiction. Consider adding a small claims threshold below which disputes are resolved by email arbitration.",
  },
  {
    id: 7,
    title: 'Payment Terms',
    risk: 'Low',
    explanation:
      'Payment terms are set at NET-60, which is longer than the industry standard of NET-30. While manageable with planning, this extended cycle may strain cash flow for smaller vendors or service providers.',
    alternative:
      'Negotiate for NET-30 payment terms. Consider introducing an early payment discount (e.g., 2/10 NET-30) to incentivize faster payment and improve both parties\' cash flow.',
  },
  {
    id: 8,
    title: 'Dispute Resolution',
    risk: 'Low',
    explanation:
      'The mandatory binding arbitration clause follows standard industry practices, includes reasonable timelines for arbitrator appointment, and limits discovery scope to reduce costs.',
    alternative:
      'Consider inserting a mandatory mediation step (30-day good-faith negotiation period) prior to arbitration. This preserves the business relationship and often resolves disputes at a fraction of the arbitration cost.',
  },
  {
    id: 9,
    title: 'Confidentiality Clause',
    risk: 'Low',
    explanation:
      'The clause is generally well-drafted but lacks a defined duration period for confidentiality obligations, which could inadvertently create perpetual restrictions on the use of information that may eventually become public or obsolete.',
    alternative:
      "Specify a confidentiality period of 3–5 years following the contract's termination or expiration, with clearly enumerated exceptions for information that becomes publicly available through no fault of the receiving party.",
  },
  {
    id: 10,
    title: 'Force Majeure',
    risk: 'Low',
    explanation:
      'The force majeure provisions include standard triggering events such as natural disasters and government actions, but do not address modern risk scenarios including cybersecurity incidents and supply chain disruptions.',
    alternative:
      'Expand the force majeure definition to explicitly include cybersecurity incidents, widespread supply chain disruptions, and pandemic-related government orders. Add a maximum force majeure period (e.g., 90 days) after which either party may terminate.',
  },
  {
    id: 11,
    title: 'Warranty Disclaimer',
    risk: 'Low',
    explanation:
      'The warranty disclaimer employs standard industry language and effectively excludes implied warranties of merchantability and fitness for a particular purpose, providing reasonable protections for both parties.',
    alternative:
      'Ensure the disclaimer is presented in clear, conspicuous language as required by applicable law. Consider adding a limited express warranty for core deliverables to build trust while maintaining overall liability protection.',
  },
  {
    id: 12,
    title: 'Assignment Clause',
    risk: 'Low',
    explanation:
      'Assignment restrictions are mutual and require prior written consent from both parties before the contract may be transferred, providing a fair protection against unwanted third-party substitutions.',
    alternative:
      "Clarify whether assignment to affiliated entities (subsidiaries, parent companies) or in connection with M&A transactions requires prior written consent or is automatically permitted. Add a 30-day deemed consent provision to prevent unreasonable withholding.",
  },
];

/**
 * Generates a contract risk analysis from extracted text.
 *
 * Currently returns a MOCK response. This function is the SOLE integration
 * point for AI in Phase 2 — no other files need to change.
 *
 * @param {string} extractedText - Raw text extracted from the contract
 * @returns {Object} Risk analysis result
 */
function analyzeContract(extractedText) {
  // Slightly vary the risk score based on document length to feel dynamic
  const lengthFactor = Math.min(extractedText.length / 6000, 1);
  const overallRisk = Math.min(Math.round(62 + lengthFactor * 22), 95);

  const highRisk = MOCK_CLAUSES.filter((c) => c.risk === 'High');
  const mediumRisk = MOCK_CLAUSES.filter((c) => c.risk === 'Medium');
  const lowRisk = MOCK_CLAUSES.filter((c) => c.risk === 'Low');

  const riskyClauses = highRisk.length + mediumRisk.length;
  const safeClauses = lowRisk.length;

  return {
    overallRisk,
    summary:
      'This contract contains several high-risk clauses that require careful review and negotiation. Pay particular attention to the termination, indemnification, and intellectual property provisions before signing.',
    stats: {
      totalClauses: MOCK_CLAUSES.length,
      riskyClauses,
      safeClauses,
    },
    clauses: MOCK_CLAUSES,
    metadata: {
      analyzedAt: new Date().toISOString(),
      documentLength: extractedText.length,
      wordCount: extractedText.split(/\s+/).filter(Boolean).length,
      engine: 'mock-v1.0', // TODO (Phase 2): replace with 'gpt-4o' or similar
    },
  };
}

module.exports = { analyzeContract };
