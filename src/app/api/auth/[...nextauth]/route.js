import { authOptions } from "@/app/actions/server/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export default NextAuth(authOptions);
