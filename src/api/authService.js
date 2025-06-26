import { account } from "@/api/appwrite";
import { ID } from "appwrite";

export class AuthService {
  // Create account
  async createAccount(email, password, name) {
    try {
      const newAccount = await account.create(ID.unique(), email, password, name);

      if (newAccount) {
        // Create email session
        const session = await this.createEmailSession(email, password);
        return session;
      }

      return newAccount;
    } catch (error) {
      console.error("Create account error:", error);
      throw error;
    }
  }

  // Create email session
  async createEmailSession(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error("Create session error:", error);
      throw error;
    }
  }

  // Create OAuth session (Google)
  createOAuthSession() {
    try {
      const session = account.createOAuth2Session(
        "google",
        `${window.location.origin}/auth/callback`,
        `${window.location.origin}/auth/failure`
      );
      return session;
    } catch (error) {
      console.error("OAuth session error:", error);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  // Get current session
  async getCurrentSession() {
    try {
      const session = await account.getSession("current");
      return session;
    } catch (error) {
      console.error("Get current session error:", error);
      return null;
    }
  }

  // Logout
  async logout() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  // Update password
  async updatePassword(newPassword, oldPassword) {
    try {
      await account.updatePassword(newPassword, oldPassword);
    } catch (error) {
      console.error("Update password error:", error);
      throw error;
    }
  }

  // Create password recovery
  async createPasswordRecovery(email) {
    try {
      const recovery = await account.createRecovery(
        email,
        `${window.location.origin}/auth/reset-password`
      );
      return recovery;
    } catch (error) {
      console.error("Create password recovery error:", error);
      throw error;
    }
  }

  // Complete password recovery
  async completePasswordRecovery(userId, secret, password) {
    try {
      await account.updateRecovery(userId, secret, password, password);
    } catch (error) {
      console.error("Complete password recovery error:", error);
      throw error;
    }
  }

  // Create email verification
  async createEmailVerification() {
    try {
      const verification = await account.createVerification(
        `${window.location.origin}/auth/verify-email`
      );
      return verification;
    } catch (error) {
      console.error("Create email verification error:", error);
      throw error;
    }
  }

  // Complete email verification
  async completeEmailVerification(userId, secret) {
    try {
      await account.updateVerification(userId, secret);
    } catch (error) {
      console.error("Complete email verification error:", error);
      throw error;
    }
  }

  // Update user preferences
  async updatePreferences(preferences) {
    try {
      await account.updatePrefs(preferences);
    } catch (error) {
      console.error("Update preferences error:", error);
      throw error;
    }
  }

  // Update user name
  async updateName(name) {
    try {
      await account.updateName(name);
    } catch (error) {
      console.error("Update name error:", error);
      throw error;
    }
  }

  // Update user email
  async updateEmail(email, password) {
    try {
      await account.updateEmail(email, password);
    } catch (error) {
      console.error("Update email error:", error);
      throw error;
    }
  }
}

export const authService = new AuthService();
