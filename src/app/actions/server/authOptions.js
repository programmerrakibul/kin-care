import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "./auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const user = await loginUser(credentials);
        return user ? user : null;
      },
    }),
  ],
};
