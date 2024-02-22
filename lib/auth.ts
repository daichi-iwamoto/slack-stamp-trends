import NextAuth from "next-auth";
import SlackProvider from "next-auth/providers/slack";

const authOptions = {
  providers: [
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID || "",
      clientSecret: process.env.SLACK_CLIENT_SECRET || "",
    }),
  ],
};

export const handler = NextAuth(authOptions);
