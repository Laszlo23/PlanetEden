import "server-only";
import { WalletIdentity, Session } from "./schema";
import type { Booking } from "./booking-schema";
import { logger } from "@/lib/logger";

/**
 * Simple in-memory database store
 * 
 * In production, replace this with a real database (PostgreSQL, MongoDB, etc.)
 * This is a temporary solution for development.
 */
class DatabaseStore {
  private identities: Map<string, WalletIdentity> = new Map();
  private sessions: Map<string, Session> = new Map();

  // Wallet Identities
  async createIdentity(identity: WalletIdentity): Promise<WalletIdentity> {
    this.identities.set(identity.id, identity);
    logger.info("Wallet identity created", { identityId: identity.id });
    return identity;
  }

  async getIdentityById(id: string): Promise<WalletIdentity | null> {
    return this.identities.get(id) ?? null;
  }

  async getIdentityByAddress(address: string): Promise<WalletIdentity | null> {
    const normalizedAddress = address.toLowerCase();
    for (const identity of this.identities.values()) {
      if (identity.address.toLowerCase() === normalizedAddress) {
        return identity;
      }
    }
    return null;
  }

  async updateIdentityLastVerified(id: string): Promise<void> {
    const identity = this.identities.get(id);
    if (identity) {
      identity.lastVerifiedAt = new Date();
      this.identities.set(id, identity);
      logger.debug("Identity last verified updated", { identityId: id });
    }
  }

  // Sessions
  async createSession(session: Session): Promise<Session> {
    this.sessions.set(session.id, session);
    logger.debug("Session created", { sessionId: session.id });
    return session;
  }

  async getSession(id: string): Promise<Session | null> {
    return this.sessions.get(id) ?? null;
  }

  async deleteSession(id: string): Promise<void> {
    this.sessions.delete(id);
    logger.debug("Session deleted", { sessionId: id });
  }

  async deleteExpiredSessions(): Promise<void> {
    const now = new Date();
    for (const [id, session] of this.sessions.entries()) {
      if (session.expiresAt < now) {
        this.sessions.delete(id);
        logger.debug("Expired session deleted", { sessionId: id });
      }
    }
  }

  async getSessionByNonce(nonce: string): Promise<Session | null> {
    for (const session of this.sessions.values()) {
      if (session.nonce === nonce) {
        return session;
      }
    }
    return null;
  }
}

// Singleton instance
export const db = new DatabaseStore();

/**
 * Booking Database Store
 * In-memory storage for bookings (replace with real database in production)
 */
class BookingStore {
  private bookings: Map<string, Booking> = new Map();
  private providerBookings: Map<string, Set<string>> = new Map();
  private clientBookings: Map<string, Set<string>> = new Map();

  async create(booking: Booking): Promise<Booking> {
    this.bookings.set(booking.id, booking);

    // Index by provider
    if (!this.providerBookings.has(booking.providerAddress)) {
      this.providerBookings.set(booking.providerAddress, new Set());
    }
    this.providerBookings.get(booking.providerAddress)?.add(booking.id);

    // Index by client
    if (booking.clientAddress) {
      if (!this.clientBookings.has(booking.clientAddress)) {
        this.clientBookings.set(booking.clientAddress, new Set());
      }
      this.clientBookings.get(booking.clientAddress)?.add(booking.id);
    }

    logger.info("Booking created", { bookingId: booking.id });
    return booking;
  }

  async getById(bookingId: string): Promise<Booking | null> {
    return this.bookings.get(bookingId) ?? null;
  }

  async update(booking: Booking): Promise<Booking> {
    this.bookings.set(booking.id, booking);
    logger.debug("Booking updated", { bookingId: booking.id });
    return booking;
  }

  async getByProvider(providerAddress: string): Promise<Booking[]> {
    const bookingIds = this.providerBookings.get(providerAddress) ?? new Set();
    return Array.from(bookingIds)
      .map((id) => this.bookings.get(id))
      .filter((booking): booking is Booking => booking !== undefined);
  }

  async getByClient(clientAddress: string): Promise<Booking[]> {
    const bookingIds = this.clientBookings.get(clientAddress) ?? new Set();
    return Array.from(bookingIds)
      .map((id) => this.bookings.get(id))
      .filter((booking): booking is Booking => booking !== undefined);
  }
}

// Singleton instance
export const bookingDb = new BookingStore();
