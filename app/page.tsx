import { WalletConnect } from "@/components/WalletConnect";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Planet Eden</h1>
        <p className="text-lg text-gray-600 mb-8">
          A clean, secure, scalable foundation ready for expansion.
        </p>
        
        <div className="mt-12">
          <WalletConnect />
        </div>
      </div>
    </main>
  );
}
