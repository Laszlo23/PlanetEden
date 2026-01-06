export default function VisionPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-text mb-6">
            On-Chain Vision
          </h1>
          <p className="text-xl text-dark-textMuted mb-8">
            Technical architecture and tokenomics design for decentralized service
            commitments
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-dark-border to-transparent mb-12" />
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Architecture Principles
            </h2>
            <p className="text-lg text-dark-textMuted leading-relaxed mb-6">
              Our on-chain architecture is designed around three core principles:
              verifiability, privacy, and efficiency.
            </p>
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-semibold text-dark-text mb-3">
                  Cryptographic Commitments
                </h3>
                <p className="text-dark-textMuted leading-relaxed mb-3">
                  All service commitments are represented as cryptographic hashes
                  (SHA-256) that are committed on-chain. This approach provides
                  verifiability without exposing sensitive data, ensuring both
                  integrity and privacy.
                </p>
                <div className="mt-4 p-4 bg-dark-surfaceHover rounded-lg">
                  <p className="text-sm text-dark-textMuted font-mono">
                    hash = SHA-256(bookingId, providerAddress, clientAddress,
                    startTime, endTime, metadata)
                  </p>
                </div>
                <p className="text-sm text-dark-textMuted mt-3">
                  This deterministic hashing ensures that any party can verify a
                  commitment by recomputing the hash from the original data, while the
                  data itself remains private.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-text mb-3">
                  Smart Contract Enforcement
                </h3>
                <p className="text-dark-textMuted leading-relaxed mb-3">
                  Our BookingIntegrity contract enforces commitment rules at the
                  protocol level. Overlapping commitments are prevented through
                  time-slot based checking, eliminating the need for centralized
                  validation.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-dark-textMuted">
                    <span className="w-2 h-2 bg-dark-success rounded-full"></span>
                    <span>Time slot granularity: 1 hour intervals</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dark-textMuted">
                    <span className="w-2 h-2 bg-dark-success rounded-full"></span>
                    <span>Overlap detection at contract level</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dark-textMuted">
                    <span className="w-2 h-2 bg-dark-success rounded-full"></span>
                    <span>Gas-efficient storage: only hashes stored</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-text mb-3">
                  Off-Chain Data Management
                </h3>
                <p className="text-dark-textMuted leading-relaxed mb-3">
                  Personal data, service details, and metadata remain off-chain
                  in secure databases. Only commitment hashes are stored on-chain,
                  reducing gas costs and maintaining regulatory compliance.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-dark-surfaceHover rounded">
                    <p className="text-xs text-dark-textMuted mb-1">On-Chain</p>
                    <p className="text-sm text-dark-text">Commitment Hash (bytes32)</p>
                  </div>
                  <div className="p-3 bg-dark-surfaceHover rounded">
                    <p className="text-xs text-dark-textMuted mb-1">Off-Chain</p>
                    <p className="text-sm text-dark-text">All Personal Data & Metadata</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Token Design Considerations
            </h2>
            <div className="card bg-dark-surfaceHover border-dark-warning/30">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-dark-warning flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-dark-text font-medium mb-2">Regulatory Notice</p>
                  <p className="text-dark-textMuted leading-relaxed text-sm mb-3">
                    Token design is under active development and subject to change
                    based on regulatory requirements and technical considerations.
                  </p>
                  <p className="text-dark-textMuted leading-relaxed text-sm">
                    Any token implementation will prioritize compliance with applicable
                    securities laws and regulations. We are committed to working with
                    legal advisors to ensure any token structure meets regulatory
                    requirements in relevant jurisdictions.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-semibold text-dark-text mb-3">
                  Potential Use Cases
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-dark-accent mt-1">•</span>
                    <span className="text-dark-textMuted text-sm">
                      Governance participation in protocol decisions and parameter
                      updates
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-dark-accent mt-1">•</span>
                    <span className="text-dark-textMuted text-sm">
                      Staking mechanisms for service provider verification and
                      reputation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-dark-accent mt-1">•</span>
                    <span className="text-dark-textMuted text-sm">
                      Fee payment for platform services and smart contract operations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-dark-accent mt-1">•</span>
                    <span className="text-dark-textMuted text-sm">
                      Incentive alignment between service providers, clients, and
                      platform operators
                    </span>
                  </li>
                </ul>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-text mb-3">
                  Design Constraints
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-dark-warning mt-1">•</span>
                    <span className="text-dark-textMuted text-sm">
                      Regulatory compliance with securities laws in all target
                      jurisdictions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-dark-warning mt-1">•</span>
                    <span className="text-dark-textMuted text-sm">
                      Gas efficiency for on-chain operations and user transactions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-dark-warning mt-1">•</span>
                    <span className="text-dark-textMuted text-sm">
                      Decentralization and censorship resistance as core principles
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-dark-warning mt-1">•</span>
                    <span className="text-dark-textMuted text-sm">
                      Alignment with platform utility requirements and user needs
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Technical Roadmap
            </h2>
            <div className="space-y-6">
              <div className="card border-l-4 border-dark-success">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 bg-dark-success rounded-full"></div>
                  <h3 className="font-semibold text-dark-text">
                    Current Implementation
                  </h3>
                </div>
                <p className="text-dark-textMuted mb-3">
                  Booking commitment system with hash anchoring on Ethereum-compatible
                  chains. SIWE authentication for wallet-based identity.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-dark-surfaceHover rounded text-sm">
                    <p className="text-dark-textMuted text-xs mb-1">Smart Contract</p>
                    <p className="text-dark-text">BookingIntegrity.sol</p>
                  </div>
                  <div className="p-3 bg-dark-surfaceHover rounded text-sm">
                    <p className="text-dark-textMuted text-xs mb-1">Authentication</p>
                    <p className="text-dark-text">Sign-In With Ethereum</p>
                  </div>
                </div>
              </div>

              <div className="card border-l-4 border-dark-warning">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 bg-dark-warning rounded-full"></div>
                  <h3 className="font-semibold text-dark-text">
                    Planned Enhancements
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-dark-text mb-2 text-sm">
                      Scalability Improvements
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-dark-textMuted text-sm ml-4">
                      <li>Multi-chain support for commitment anchoring</li>
                      <li>Layer 2 integration (Arbitrum, Optimism) for reduced gas costs</li>
                      <li>Batch commitment operations for efficiency</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-dark-text mb-2 text-sm">
                      Advanced Features
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-dark-textMuted text-sm ml-4">
                      <li>Advanced commitment types and verification mechanisms</li>
                      <li>Interoperability with other DeFi protocols</li>
                      <li>Cross-chain commitment verification</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-dark-text mb-2 text-sm">
                      Enterprise Features
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-dark-textMuted text-sm ml-4">
                      <li>Multi-signature support for organizational accounts</li>
                      <li>Role-based access control and permissions</li>
                      <li>Audit logging and compliance reporting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Security Considerations
            </h2>
            <p className="text-lg text-dark-textMuted leading-relaxed mb-6">
              Security is paramount in our architecture. We implement multiple layers
              of protection across the entire stack:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2 text-sm">
                  Smart Contract Security
                </h3>
                <ul className="space-y-1 text-dark-textMuted text-sm">
                  <li>• Security audits before deployment</li>
                  <li>• Formal verification where applicable</li>
                  <li>• Time-locked upgrades for critical changes</li>
                </ul>
              </div>
              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2 text-sm">
                  Application Security
                </h3>
                <ul className="space-y-1 text-dark-textMuted text-sm">
                  <li>• Input validation and sanitization</li>
                  <li>• Secure logging with data redaction</li>
                  <li>• Environment variable protection</li>
                </ul>
              </div>
              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2 text-sm">
                  Network Security
                </h3>
                <ul className="space-y-1 text-dark-textMuted text-sm">
                  <li>• Content Security Policy headers</li>
                  <li>• HSTS and security headers</li>
                  <li>• Rate limiting and DDoS protection</li>
                </ul>
              </div>
              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2 text-sm">
                  Data Protection
                </h3>
                <ul className="space-y-1 text-dark-textMuted text-sm">
                  <li>• Encryption at rest and in transit</li>
                  <li>• Access control and authentication</li>
                  <li>• Regular security assessments</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Compliance & Regulation
            </h2>
            <p className="text-lg text-dark-textMuted leading-relaxed mb-6">
              Our architecture is designed with regulatory compliance in mind. We
              maintain separation between on-chain commitments and off-chain data,
              enabling compliance with data protection regulations while preserving
              the benefits of blockchain verification.
            </p>
            <div className="space-y-4">
              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Data Protection Compliance
                </h3>
                <p className="text-dark-textMuted text-sm mb-3">
                  Our hybrid architecture supports compliance with major data
                  protection frameworks:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-dark-surfaceHover rounded text-center">
                    <p className="text-xs text-dark-textMuted mb-1">GDPR</p>
                    <p className="text-sm text-dark-text">EU Compliance</p>
                  </div>
                  <div className="p-3 bg-dark-surfaceHover rounded text-center">
                    <p className="text-xs text-dark-textMuted mb-1">CCPA</p>
                    <p className="text-sm text-dark-text">California Compliance</p>
                  </div>
                  <div className="p-3 bg-dark-surfaceHover rounded text-center">
                    <p className="text-xs text-dark-textMuted mb-1">Other</p>
                    <p className="text-sm text-dark-text">Framework Support</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Regulatory Approach
                </h3>
                <p className="text-dark-textMuted text-sm">
                  We work proactively with legal advisors to ensure our architecture
                  and operations comply with applicable regulations. This includes
                  regular compliance reviews, documentation of data handling
                  practices, and implementation of user rights (access, deletion,
                  portability) as required by law.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Long-Term Vision
            </h2>
            <p className="text-lg text-dark-textMuted leading-relaxed mb-4">
              Planet Eden&apos;s on-chain infrastructure is designed to serve as the
              foundation for a new generation of decentralized service marketplaces.
              Our vision extends beyond booking systems to any service commitment
              that requires verifiability, integrity, and privacy.
            </p>
            <p className="text-lg text-dark-textMuted leading-relaxed">
              As blockchain technology matures and regulatory frameworks evolve, we
              will continue to adapt our architecture to maintain the optimal balance
              between decentralization, compliance, and user experience. Our
              commitment to security, privacy, and regulatory compliance will remain
              constant as we build toward this vision.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
