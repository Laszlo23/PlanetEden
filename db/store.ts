import "server-only";
import { WalletIdentity, Session } from "./schema";
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
