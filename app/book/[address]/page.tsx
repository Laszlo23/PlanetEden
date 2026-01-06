"use client";

import { useParams } from "next/navigation";
import { BookingForm } from "@/components/BookingForm";

export default function BookPage() {
  const params = useParams();
  const providerAddress = params.address as string;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-text mb-2">
            Book Service
          </h1>
          <p className="text-dark-textMuted">
            Provider: <span className="font-mono text-dark-text">{providerAddress}</span>
          </p>
        </div>

        <BookingForm providerAddress={providerAddress} />
      </div>
    </div>
  );
}
