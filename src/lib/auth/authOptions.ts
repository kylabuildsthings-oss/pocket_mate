import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAddress, verifyMessage } from "ethers";
import type { UserRole } from "@prisma/client";

import { getPrisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "ethereum-wallet",
      name: "Ethereum Wallet",
      credentials: {
        address: { label: "Address", type: "text" },
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        const prisma = getPrisma();
        if (
          !prisma ||
          !credentials?.address ||
          !credentials?.message ||
          !credentials?.signature
        ) {
          return null;
        }

        let checksummed: string;
        try {
          checksummed = getAddress(credentials.address);
        } catch {
          return null;
        }

        let recovered: string;
        try {
          recovered = verifyMessage(credentials.message, credentials.signature);
        } catch {
          return null;
        }

        if (recovered.toLowerCase() !== checksummed.toLowerCase()) {
          return null;
        }

        const nonceMatch = /\bNonce:\s*([a-fA-F0-9]+)\b/.exec(
          credentials.message
        );
        if (!nonceMatch) return null;
        const nonce = nonceMatch[1];

        const row = await prisma.authNonce.findFirst({
          where: {
            address: checksummed.toLowerCase(),
            nonce,
            consumed: false,
            expiresAt: { gt: new Date() },
          },
        });
        if (!row) return null;

        await prisma.authNonce.update({
          where: { id: row.id },
          data: { consumed: true },
        });

        const adminWallets = new Set(
          (process.env.POCKETMATE_ADMIN_WALLETS || "")
            .split(",")
            .map((s) => s.trim().toLowerCase())
            .filter(Boolean)
        );
        const walletKey = checksummed.toLowerCase();

        let user = await prisma.user.findUnique({
          where: { walletAddress: walletKey },
        });
        if (!user) {
          const role: UserRole = adminWallets.has(walletKey)
            ? "ADMIN"
            : "STUDENT";
          user = await prisma.user.create({
            data: {
              walletAddress: walletKey,
              name: `Wallet ${checksummed.slice(0, 6)}…${checksummed.slice(
                -4
              )}`,
              role,
              profile: {
                create: {
                  displayName: `Student ${checksummed.slice(0, 6)}`,
                },
              },
            },
          });
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && "role" in user && user.id) {
        token.sub = user.id;
        token.role = user.role as UserRole;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.sub as string) || (token.id as string) || "";
        session.user.role = token.role === "ADMIN" ? "ADMIN" : "STUDENT";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 14,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
