import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function getUserId(email: string | undefined) {
  if (!email) return null;

  await connectDB();

  const user = await User.findOne({ email }).select("_id");
  return user?._id?.toString();
}

export const authProvider: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = await getUserId(user.email ?? "");
        token.picture=user.image
      }
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image=token.picture;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (!account || account.provider !== "google") return false;
      await connectDB();

      const dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        const newUser = await User.create({
          email: user.email,
          name: user.name || "Guest",
          password: "",
          profileImage: user.image || "",
          projects: {
            created: [],
          },
          ideas: {
            created: [],
          },
          collaborated: [],
          requests: [],
          about: "",
          socialLink: "",
          toolsMostUsed: [],
          chats:[],
        });

        return !!newUser;
      }
      return true;
    },
  },
};

export default NextAuth(authProvider);
