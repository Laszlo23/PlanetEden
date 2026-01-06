export default function InvestorsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-text mb-6">
            Information for Investors
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-dark-border to-transparent mb-12" />
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Overview
            </h2>
            <p className="text-lg text-dark-textMuted leading-relaxed mb-4">
              Planet Eden is developing infrastructure for verifiable, on-chain
              service commitments. Our technology enables trustless interactions
              between service providers and clients through cryptographic
              verification and smart contract enforcement.
            </p>
            <p className="text-lg text-dark-textMuted leading-relaxed">
              The platform addresses a fundamental need in decentralized service
              marketplaces: ensuring commitment integrity while maintaining privacy
              and regulatory compliance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Market Opportunity
            </h2>
            <div className="space-y-4 text-dark-textMuted">
              <p>
                The global services marketplace is transitioning toward
                decentralized models. Key drivers include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Demand for verifiable service commitments</li>
                <li>Reduced trust requirements through smart contracts</li>
                <li>Privacy-preserving verification mechanisms</li>
                <li>Regulatory compliance in decentralized systems</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Technology Differentiators
            </h2>
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Minimal On-Chain Storage
                </h3>
                <p className="text-dark-textMuted">
                  Our architecture stores only cryptographic hashes on-chain,
                  reducing gas costs and maintaining privacy. This approach scales
                  efficiently while preserving verifiability.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Protocol-Level Overlap Prevention
                </h3>
                <p className="text-dark-textMuted">
                  Smart contracts enforce commitment integrity at the protocol
                  level, eliminating the need for centralized validation and
                  reducing attack surfaces.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Regulatory Compliance Architecture
                </h3>
                <p className="text-dark-textMuted">
                  Our system design supports compliance with data protection
                  regulations (GDPR, CCPA) by keeping personal data off-chain
                  while maintaining cryptographic proof of commitments.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Risk Factors
            </h2>
            <div className="space-y-4 text-dark-textMuted">
              <p>
                Potential investors should be aware of the following risk factors:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Smart contract risk: All smart contracts are subject to
                  potential vulnerabilities despite security audits
                </li>
                <li>
                  Regulatory uncertainty: Evolving regulations may impact
                  platform operations
                </li>
                <li>
                  Market adoption: Success depends on adoption by service
                  providers and clients
                </li>
                <li>
                  Technology risk: Blockchain technology is still evolving and
                  may face scalability challenges
                </li>
                <li>
                  Competition: The decentralized services market is competitive
                  and rapidly evolving
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Legal Disclaimer
            </h2>
            <div className="card bg-dark-surfaceHover">
              <p className="text-sm text-dark-textMuted leading-relaxed">
                This information is provided for informational purposes only and
                does not constitute an offer to sell, or a solicitation of an
                offer to buy, any securities. Any investment decision should be
                made only after careful consideration of all relevant factors,
                including the risk factors described above, and consultation with
                appropriate legal, tax, and financial advisors.
              </p>
              <p className="text-sm text-dark-textMuted leading-relaxed mt-4">
                Planet Eden makes no representations or warranties regarding the
                accuracy or completeness of this information. Past performance is
                not indicative of future results.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Contact
            </h2>
            <p className="text-dark-textMuted">
              For investor inquiries, please contact us through our official
              channels. We maintain strict confidentiality and compliance with
              applicable securities regulations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
