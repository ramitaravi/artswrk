import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Add your authentication logic here
        // For now, just return a mock user
        return {
          id: "1",
          email: credentials.email,
          name: "Test User"
        };
      }
    })
  ],
  pages: {
    signIn: '/login',
  }
}; 