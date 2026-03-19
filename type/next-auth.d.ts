import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface jwt{
    account:object,
    user:object,
    token:object
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string
    }
  }
}