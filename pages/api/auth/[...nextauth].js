import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import authorizeUser from 'services/users/authorize';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        //console.log('async authorize dziala');
        //console.log(credentials, 'credentials');
        // Add logic here to look up the user from the credentials supplied
        const user = await authorizeUser({
          email: credentials.email,
          password: credentials.password
        });
        //console.log(user, 'user in async');

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          //throw new Error('Wrong password') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      }
    })
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.name = user?.name;
        token.id = user?.id;
        token.image = user?.image;
      }

      return token;
    },

    async session(session, token) {
      session.user.id = token?.id;
      session.user.name = token?.name;
      session.user.image = token?.image;

      return session;
    }
  }
});
