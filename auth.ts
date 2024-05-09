import prisma from '@/db';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcrypt';

type User = {
  id: string;
  email: string;
  password: string | null;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials: any) => {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error('Invalid email');
        }
        if (typeof user.password !== 'string') {
          throw new Error('Log in with google');
        }
        if (await bcrypt.compare(password, user.password)) {
          return {
            ...user,
            id: user.id.toString(),
          } as User;
        } else {
          throw new Error('Invalid password');
        }
      },
    }),
    Google,
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        const email = profile?.email as string;
        const existingUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email,
            },
          });
        }
      }
      return true;
    },
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      session.user.id = user?.id.toString() as string;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
