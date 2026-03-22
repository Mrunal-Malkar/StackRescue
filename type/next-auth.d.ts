import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface jwt{
    id:string
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id:string;
    } & DefaultUser["user"]
  }

  interface User extends DefaultUser{
    id:string;
  }
}