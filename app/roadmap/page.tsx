export default function RoadmapPage() {
  const phases = [
    {
      title: "Phase 1: Foundation",
      status: "completed",
      items: [
        "Secure Next.js application architecture",
        "TypeScript strict mode implementation",
        "Environment variable validation system",
        "Security headers and middleware",
        "Sign-In With Ethereum (SIWE) integration",
        "Wallet-based identity system",
      ],
    },
    {
      title: "Phase 2: Booking Infrastructure",
      status: "completed",
      items: [
        "Smart contract for booking commitments",
        "Off-chain booking management system",
        "On-chain hash anchoring",
        "Overlap prevention mechanism",
        "Booking verification system",
        "API endpoints for booking operations",
      ],
    },
    {
      title: "Phase 3: User Interface",
      status: "completed",
      items: [
        "Dark theme design system",
        "Discover and booking interfaces",
        "Provider and client dashboards",
        "Mobile-responsive components",
        "Navigation and layout system",
      ],
    },
    {
      title: "Phase 4: Enhanced Features",
      status: "in-progress",
      items: [
        "Payment integration",
        "Dispute resolution mechanism",
        "Reputation system",
        "Advanced filtering and search",
        "Provider profile management",
        "Notification system",
      ],
    },
    {
      title: "Phase 5: Scale & Optimize",
      status: "planned",
      items: [
        "Database migration from in-memory store",
        "Performance optimization",
        "Multi-chain support",
        "API rate limiting",
        "Analytics and monitoring",
        "Documentation and developer tools",
      ],
    },
    {
      title: "Phase 6: Enterprise Features",
      status: "planned",
      items: [
        "Multi-signature support",
        "Role-based access control",
        "Audit logging",
        "Compliance reporting",
        "Enterprise API access",
        "White-label solutions",
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-dark-success border-dark-success";
      case "in-progress":
        return "text-dark-warning border-dark-warning";
      case "planned":
        return "text-dark-textMuted border-dark-border";
      default:
        return "text-dark-textMuted border-dark-border";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "planned":
        return "Planned";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-text mb-6">
            Development Roadmap
          </h1>
          <p className="text-lg text-dark-textMuted mb-8">
            Our development timeline reflects a methodical approach to building
            secure, compliant infrastructure for on-chain service commitments.
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />
        </div>

        <div className="space-y-12">
          {phases.map((phase, index) => (
            <div key={index} className="relative">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold ${getStatusColor(
                      phase.status
                    )}`}
                  >
                    {index + 1}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-2xl font-semibold text-dark-text">
                      {phase.title}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        phase.status
                      )}`}
                    >
                      {getStatusLabel(phase.status)}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {phase.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-dark-textMuted"
                      >
                        <span className="text-dark-accent mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {index < phases.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-12 bg-dark-border" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 card">
          <h3 className="font-semibold text-dark-text mb-3">
            Development Philosophy
          </h3>
          <p className="text-dark-textMuted leading-relaxed">
            Our roadmap prioritizes security and compliance at each phase. We
            conduct security audits before major releases and maintain
            comprehensive documentation. All development follows industry best
            practices for smart contract security and application security.
          </p>
        </div>
      </div>
    </div>
  );
}
