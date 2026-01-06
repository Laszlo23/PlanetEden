import { FilterBar } from "@/components/FilterBar";
import { ProviderCard } from "@/components/ProviderCard";

// Mock data - replace with real API calls
const mockProviders = [
  {
    providerAddress: "0x1234567890123456789012345678901234567890" as const,
    name: "Premium Consulting",
    description: "Expert blockchain consulting services with years of experience",
    rating: 4.8,
    price: "0.5 ETH/hr",
  },
  {
    providerAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd" as const,
    name: "Web3 Development",
    description: "Full-stack Web3 development and smart contract auditing",
    rating: 4.9,
    price: "1.0 ETH/hr",
  },
  {
    providerAddress: "0x9876543210987654321098765432109876543210" as const,
    name: "Design Studio",
    description: "Premium UI/UX design for decentralized applications",
    rating: 4.7,
    price: "0.3 ETH/hr",
  },
];

export default function DiscoverPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-dark-text mb-2">
            Discover Providers
          </h1>
          <p className="text-dark-textMuted">
            Find and book services from verified providers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterBar />
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mockProviders.map((provider) => (
                <ProviderCard key={provider.providerAddress} {...provider} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
