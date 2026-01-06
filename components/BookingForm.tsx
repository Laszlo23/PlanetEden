"use client";

import { useState } from "react";
import { getConnectedAddress } from "@/lib/wallet";

interface BookingFormProps {
  providerAddress: string;
}

export function BookingForm({ providerAddress }: BookingFormProps) {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const clientAddress = await getConnectedAddress();
      if (!clientAddress) {
        throw new Error("Please connect your wallet first");
      }

      // Calculate start and end times
      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = new Date(startDateTime);
      endDateTime.setMinutes(endDateTime.getMinutes() + parseInt(duration));

      // Check availability first
      const availabilityResponse = await fetch("/api/bookings/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerAddress,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
        }),
      });

      const availability = await availabilityResponse.json();

      if (!availability.available) {
        throw new Error("This time slot is not available");
      }

      // Create booking
      const bookingResponse = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerAddress,
          clientAddress,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          metadata: {
            title: title || "Booking",
            description,
          },
        }),
      });

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(errorData.error || "Failed to create booking");
      }

      await bookingResponse.json();
      setSuccess(true);
      
      // Reset form
      setStartDate("");
      setStartTime("");
      setDuration("60");
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  if (success) {
    return (
      <div className="card text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-dark-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-dark-success" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-dark-text mb-2">Booking Created!</h2>
          <p className="text-dark-textMuted mb-6">
            Your booking has been created and committed on-chain.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="btn-primary"
          >
            Create Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark-text mb-2">
            Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={today}
            required
            className="input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-text mb-2">
            Time
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="input w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          Duration (minutes)
        </label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="input w-full"
        >
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="90">1.5 hours</option>
          <option value="120">2 hours</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          Title (optional)
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Booking title"
          className="input w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Additional details..."
          rows={4}
          className="input w-full resize-none"
        />
      </div>

      {error && (
        <div className="p-4 bg-dark-error/20 border border-dark-error rounded-lg text-dark-error">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full"
      >
        {isSubmitting ? "Creating Booking..." : "Create Booking"}
      </button>
    </form>
  );
}
