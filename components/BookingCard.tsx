"use client";

import { useState } from "react";

interface BookingCardProps {
  booking: {
    id: string;
    providerAddress: string;
    clientAddress?: string;
    startTime: string;
    endTime: string;
    status: "pending" | "committed" | "cancelled" | "completed";
    bookingHash: string;
    metadata?: {
      title?: string;
      description?: string;
    };
  };
}

export function BookingCard({ booking }: BookingCardProps) {
  const [isCancelling, setIsCancelling] = useState(false);

  const startDate = new Date(booking.startTime);
  const endDate = new Date(booking.endTime);
  const duration = Math.round((endDate.getTime() - startDate.getTime()) / 60000);

  const statusColors = {
    pending: "text-dark-warning",
    committed: "text-dark-success",
    cancelled: "text-dark-error",
    completed: "text-dark-textMuted",
  };

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setIsCancelling(true);
    try {
      const response = await fetch(`/api/bookings/${booking.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }

      // Refresh the page or update state
      window.location.reload();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      alert("Failed to cancel booking");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg text-dark-text mb-1">
                {booking.metadata?.title || "Booking"}
              </h3>
              <p className="text-sm text-dark-textMuted font-mono">
                {booking.bookingHash.slice(0, 16)}...
              </p>
            </div>
            <span className={`text-sm font-medium ${statusColors[booking.status]}`}>
              {booking.status}
            </span>
          </div>

          {booking.metadata?.description && (
            <p className="text-sm text-dark-textMuted mb-4">
              {booking.metadata.description}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-dark-textMuted mb-1">Start Time</p>
              <p className="text-dark-text">
                {startDate.toLocaleDateString()} {startDate.toLocaleTimeString()}
              </p>
            </div>
            <div>
              <p className="text-dark-textMuted mb-1">Duration</p>
              <p className="text-dark-text">{duration} minutes</p>
            </div>
            <div>
              <p className="text-dark-textMuted mb-1">Provider</p>
              <p className="text-dark-text font-mono text-xs">
                {booking.providerAddress.slice(0, 8)}...{booking.providerAddress.slice(-6)}
              </p>
            </div>
            {booking.clientAddress && (
              <div>
                <p className="text-dark-textMuted mb-1">Client</p>
                <p className="text-dark-text font-mono text-xs">
                  {booking.clientAddress.slice(0, 8)}...{booking.clientAddress.slice(-6)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:w-auto w-full">
          {booking.status !== "cancelled" && booking.status !== "completed" && (
            <button
              onClick={handleCancel}
              disabled={isCancelling}
              className="btn-secondary text-sm"
            >
              {isCancelling ? "Cancelling..." : "Cancel"}
            </button>
          )}
          <a
            href={`https://etherscan.io/tx/${booking.bookingHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm text-center"
          >
            View on Chain
          </a>
        </div>
      </div>
    </div>
  );
}
