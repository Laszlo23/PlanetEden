export default function StoryPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-text mb-6">
            Our Story
          </h1>
          <p className="text-xl text-dark-textMuted mb-8">
            Building the infrastructure for verifiable, trustless service commitments
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-dark-border to-transparent mb-12" />
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Mission
            </h2>
            <p className="text-lg text-dark-textMuted leading-relaxed mb-4">
              Planet Eden is building infrastructure for verifiable, on-chain service
              commitments. We enable trustless interactions between service providers
              and clients through cryptographic verification and smart contract
              anchoring.
            </p>
            <p className="text-lg text-dark-textMuted leading-relaxed">
              Our mission is to create a foundation where service agreements are
              cryptographically verifiable, privacy-preserving, and enforceable
              without requiring trust in centralized intermediaries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Vision
            </h2>
            <p className="text-lg text-dark-textMuted leading-relaxed mb-4">
              We envision a future where service agreements are transparent,
              verifiable, and enforceable through blockchain technology. Our platform
              provides the foundational layer for decentralized service marketplaces
              that prioritize integrity, privacy, and user sovereignty.
            </p>
            <p className="text-lg text-dark-textMuted leading-relaxed mb-4">
              By anchoring commitments on-chain while preserving privacy off-chain, we
              create a system that balances transparency with data protection—a
              critical requirement for enterprise adoption.
            </p>
            <p className="text-lg text-dark-textMuted leading-relaxed">
              Our long-term vision extends beyond booking systems. We see Planet Eden
              as infrastructure for any service commitment that requires verifiability,
              from professional services to supply chain agreements, all while
              maintaining the privacy standards required for real-world adoption.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              The Problem We Solve
            </h2>
            <p className="text-lg text-dark-textMuted leading-relaxed mb-4">
              Traditional service marketplaces rely on centralized platforms to verify
              commitments, prevent double-booking, and resolve disputes. This creates
              several fundamental issues:
            </p>
            <div className="space-y-4">
              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Centralized Trust Requirements
                </h3>
                <p className="text-dark-textMuted">
                  Users must trust platform operators to accurately record and enforce
                  commitments. This creates single points of failure and potential for
                  manipulation.
                </p>
              </div>
              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Privacy vs. Verifiability Trade-off
                </h3>
                <p className="text-dark-textMuted">
                  Existing systems often require exposing sensitive data to achieve
                  verifiability, creating compliance challenges and privacy risks.
                </p>
              </div>
              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Lack of Interoperability
                </h3>
                <p className="text-dark-textMuted">
                  Service commitments are siloed within individual platforms, preventing
                  cross-platform verification and reducing user choice.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Our Solution
            </h2>
            <p className="text-lg text-dark-textMuted leading-relaxed mb-6">
              Planet Eden addresses these challenges through a hybrid on-chain/off-chain
              architecture:
            </p>
            <div className="space-y-6">
              <div className="border-l-2 border-dark-accent pl-6">
                <h3 className="font-semibold text-dark-text mb-2">
                  Cryptographic Commitments
                </h3>
                <p className="text-dark-textMuted">
                  Service commitments are hashed and anchored on-chain, providing
                  cryptographic proof of existence and preventing tampering. The hash
                  serves as an immutable record while keeping sensitive data private.
                </p>
              </div>

              <div className="border-l-2 border-dark-accent pl-6">
                <h3 className="font-semibold text-dark-text mb-2">
                  Smart Contract Enforcement
                </h3>
                <p className="text-dark-textMuted">
                  Overlapping commitments are prevented at the protocol level through
                  smart contract logic. This eliminates the need for centralized
                  validation while ensuring commitment integrity.
                </p>
              </div>

              <div className="border-l-2 border-dark-accent pl-6">
                <h3 className="font-semibold text-dark-text mb-2">
                  Privacy by Design
                </h3>
                <p className="text-dark-textMuted">
                  Personal data remains off-chain in secure databases. Only
                  cryptographic hashes are stored on-chain, enabling compliance with
                  GDPR, CCPA, and other data protection regulations.
                </p>
              </div>

              <div className="border-l-2 border-dark-accent pl-6">
                <h3 className="font-semibold text-dark-text mb-2">
                  Interoperable Infrastructure
                </h3>
                <p className="text-dark-textMuted">
                  Our smart contracts and APIs provide a standard interface for
                  commitment verification. Any application can verify commitments
                  without requiring integration with a specific platform.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Core Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Cryptographic Integrity
                </h3>
                <p className="text-dark-textMuted text-sm">
                  All commitments are cryptographically verifiable using
                  industry-standard hashing (SHA-256) and signature schemes. We ensure
                  data integrity without storing sensitive information on-chain.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Privacy by Design
                </h3>
                <p className="text-dark-textMuted text-sm">
                  Personal data remains off-chain in secure databases. Only
                  cryptographic commitments are stored on-chain, ensuring compliance
                  with data protection regulations while maintaining verifiability.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Minimal Trust Assumptions
                </h3>
                <p className="text-dark-textMuted text-sm">
                  Our system reduces trust requirements through smart contract
                  enforcement. Overlapping commitments are prevented at the protocol
                  level, eliminating the need for centralized validation.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Regulatory Compliance
                </h3>
                <p className="text-dark-textMuted text-sm">
                  We design systems with regulatory considerations in mind. Our
                  architecture supports compliance with GDPR, CCPA, and other data
                  protection frameworks from the ground up.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Security First
                </h3>
                <p className="text-dark-textMuted text-sm">
                  Security is not an afterthought. We implement comprehensive security
                  measures including input validation, secure logging, environment
                  variable protection, and security headers throughout the stack.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Open Standards
                </h3>
                <p className="text-dark-textMuted text-sm">
                  We build on open standards like Sign-In With Ethereum (SIWE) and
                  Ethereum-compatible smart contracts, ensuring interoperability and
                  avoiding vendor lock-in.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              Technology Foundation
            </h2>
            <p className="text-lg text-dark-textMuted leading-relaxed mb-6">
              Planet Eden is built on a modern, secure technology stack designed for
              production use:
            </p>
            <div className="space-y-4">
              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Blockchain Infrastructure
                </h3>
                <p className="text-dark-textMuted text-sm mb-2">
                  Built on Ethereum-compatible blockchains, utilizing:
                </p>
                <ul className="list-disc list-inside space-y-1 text-dark-textMuted text-sm ml-4">
                  <li>Custom smart contracts for commitment anchoring</li>
                  <li>Sign-In With Ethereum (SIWE) for wallet-based authentication</li>
                  <li>Viem library for type-safe blockchain interactions</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Application Stack
                </h3>
                <p className="text-dark-textMuted text-sm mb-2">
                  Modern web application architecture:
                </p>
                <ul className="list-disc list-inside space-y-1 text-dark-textMuted text-sm ml-4">
                  <li>Next.js 14 with App Router for server-side rendering</li>
                  <li>TypeScript with strict mode for type safety</li>
                  <li>Zod for runtime validation and environment variable management</li>
                  <li>Tailwind CSS for responsive, maintainable styling</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="font-semibold text-dark-text mb-2">
                  Security Measures
                </h3>
                <p className="text-dark-textMuted text-sm mb-2">
                  Comprehensive security implementation:
                </p>
                <ul className="list-disc list-inside space-y-1 text-dark-textMuted text-sm ml-4">
                  <li>Content Security Policy (CSP) and security headers</li>
                  <li>Secure logging with automatic sensitive data redaction</li>
                  <li>Server-only environment variable access patterns</li>
                  <li>Input validation and sanitization at all layers</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark-text mb-4">
              The Path Forward
            </h2>
            <p className="text-lg text-dark-textMuted leading-relaxed mb-4">
              Planet Eden represents a fundamental shift in how service commitments
              are made, verified, and enforced. We are building infrastructure that
              will enable a new generation of decentralized service marketplaces.
            </p>
            <p className="text-lg text-dark-textMuted leading-relaxed">
              Our approach prioritizes correctness, security, and compliance over
              speed. We believe that sustainable infrastructure requires careful
              engineering and thoughtful design. As we continue to develop and
              expand the platform, these principles will remain our north star.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
