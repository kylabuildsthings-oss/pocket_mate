import "next-auth";
import "next-auth/jwt";

export type PocketMateRole = "STUDENT" | "ADMIN";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: PocketMateRole;
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    role: PocketMateRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: PocketMateRole;
    id?: string;
  }
}
