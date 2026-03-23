import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function getUserId(Email: string | undefined) {
  await connectDB();
  const userId = await User.findOne({ email: Email }).select("_id");
  return userId;
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
    async jwt({ token, user}) {
      console.log("jwt , token exachang taking place here champ.")
      if (user) {
        token.id = await getUserId(user.email ?? "");
      }
      return token;
    },
    session({ session, token }) {
      console.log("there you go with the session!!!")
      if (session.user) session.user.id = token.id;
      return session;
    },
    async signIn({ user, account }) {
        console.log("the request has reached to auth endpoint")
      if (account != undefined && account.provider != "google"){ console.log("not a correct provider"); return false;}
      await connectDB();
      const dbUser = await User.findOne({ email: user.email });
      console.log("did i find the dbUser? ",dbUser);
      if (!dbUser) {
        const newUser = await User.create({
          email: user.email,
          name: user.name,
          password: "",
          profileImage: "",
          stacks: {
            created: [],
            collaborated: [],
          },
          ideas: {
            created: [],
            collaborated: [],
          },
          about:"",
          tool:{
            name:"",
            url:"",
          },
          toolsMostUsed:[],
        });
        console.log("the new user",newUser);

        if (newUser) {
          return true;
        }
        return false;
      }
      return true;
    },
  },
};

export default NextAuth(authProvider);
