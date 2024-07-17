import { AuthOptions } from "next-auth";
import NextAuth, { getServerSession } from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "sign-in",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        console.log(req.body);

        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
      // async authorize({ request }) {
      //   const response = await fetch(request)
      //   if (!response.ok) return null
      //   return (await response.json()) ?? null
      // },
    }),
  ],
};

export default NextAuth(authOptions);

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };

export const getAuthSession = () => getServerSession(authOptions);
