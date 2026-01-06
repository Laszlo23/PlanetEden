"use client";

import { useState, useEffect } from "react";
import { getConnectedAddress } from "@/lib/wallet";
import { BookingCard } from "@/components/BookingCard";

export default function DashboardPage() {
  const [address, setAddress] = useState<string | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"provider" | "client">("provider");

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    if (address) {
      loadBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, activeTab]);

  async function checkConnection() {
    const connectedAddress = await getConnectedAddress();
    setAddress(connectedAddress);
    setLoading(false);
  }

  async function loadBookings() {
    if (!address) return;

    try {
      // In a real app, you'd fetch from your API
      // For now, we'll show empty state
      setBookings([]);
    } catch (error) {
      console.error("Failed to load bookings:", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-dark-textMuted">Loading...</div>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card text-center">
            <h2 className="text-2xl font-bold text-dark-text mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-dark-textMuted">
              Please connect your wallet to view your dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-text mb-2">Dashboard</h1>
          <p className="text-dark-textMuted">
            Manage your bookings and services
          </p>
        </div>

        <div className="mb-6">
          <div className="flex space-x-1 bg-dark-surface p-1 rounded-lg border border-dark-border">
            <button
              onClick={() => setActiveTab("provider")}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "provider"
                  ? "bg-dark-accent text-white"
                  : "text-dark-textMuted hover:text-dark-text"
              }`}
            >
              As Provider
            </button>
            <button
              onClick={() => setActiveTab("client")}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "client"
                  ? "bg-dark-accent text-white"
                  : "text-dark-textMuted hover:text-dark-text"
              }`}
            >
              As Client
            </button>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-dark-textMuted mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dark-text mb-2">
              No bookings yet
            </h3>
            <p className="text-dark-textMuted mb-6">
              {activeTab === "provider"
                ? "You haven't received any bookings yet."
                : "You haven't made any bookings yet."}
            </p>
            {activeTab === "client" && (
              <a href="/" className="btn-primary inline-block">
                Discover Providers
              </a>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
