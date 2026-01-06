import "server-only";
import { User, Session } from "./schema";
import { logger } from "@/lib/logger";

/**
 * Database Store
 * 
 * Simple in-memory store for development.
 * In production, replace this with your database (PostgreSQL, MongoDB, etc.).
 */
class DatabaseStore {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, Session> = new Map();

  // User operations
  async createUser(user: User): Promise<User> {
    this.users.set(user.id, user);
    logger.info("User created", { userId: user.id });
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async getUserByWalletAddress(walletAddress: string): Promise<User | null> {
    const normalizedAddress = walletAddress.toLowerCase();
    for (const user of this.users.values()) {
      if (user.walletAddress.toLowerCase() === normalizedAddress) {
        return user;
      }
    }
    return null;
  }

  async updateUserLastVerified(id: string): Promise<void> {
    const user = this.users.get(id);
    if (user) {
      user.lastVerifiedAt = new Date();
      this.users.set(id, user);
      logger.debug("User last verified updated", { userId: id });
    }
  }

  // Session operations
  async createSession(session: Session): Promise<Session> {
    this.sessions.set(session.id, session);
    logger.debug("Session created", { sessionId: session.id });
    return session;
  }

  async getSession(id: string): Promise<Session | null> {
    return this.sessions.get(id) ?? null;
  }

  async getSessionByNonce(nonce: string): Promise<Session | null> {
    for (const session of this.sessions.values()) {
      if (session.nonce === nonce) {
        return session;
      }
    }
    return null;
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
}

// Singleton instance
export const db = new DatabaseStore();
