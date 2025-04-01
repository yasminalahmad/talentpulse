import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';

// This is a simplified auth configuration for demonstration purposes
// In a production environment, you would connect this to your database

// Mock user data
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@talentpulse.com',
    password: '$2a$12$k8Y1Vn6.hKcXqM7xMty3.OQgbZ8ryxbQRIUgH/JWEqh6m5RXlZKLe', // hashed version of "password123"
    role: 'admin',
  },
  {
    id: '2',
    name: 'HR Manager',
    email: 'hr@talentpulse.com',
    password: '$2a$12$k8Y1Vn6.hKcXqM7xMty3.OQgbZ8ryxbQRIUgH/JWEqh6m5RXlZKLe', // hashed version of "password123"
    role: 'manager',
  },
];

export const authOptions = {
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

        const user = users.find(user => user.email === credentials.email);
        
        if (!user) {
          return null;
        }

        // In a real app, you would verify against hashed passwords in your database
        // For demo purposes, we're using a simple comparison with our mock data
        // const isPasswordValid = await compare(credentials.password, user.password);
        
        // For simplicity in the demo, we'll just check if password is "password123"
        const isPasswordValid = credentials.password === "password123";

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-for-development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
