Creating fa robust authentication system in a Next.js application is essential for managing user access and ensuring security. One of the most popular libraries for handling authentication in Next.js is [NextAuth.js](https://next-auth.js.org/), which provides a flexible and easy-to-use solution for integrating various authentication providers like Google, GitHub, Facebook, and more.

In this guide, we'll walk through setting up a complete authentication system in a Next.js project using NextAuth.js, integrating three popular authentication providers: Google, GitHub, and Facebook.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Setting Up the Next.js Project](#setting-up-the-nextjs-project)
- [Installing Dependencies](#installing-dependencies)
- [Configuring Environment Variables](#configuring-environment-variables)
  - [Obtaining Provider Credentials](#obtaining-provider-credentials)
- [Creating the NextAuth.js API Route](#creating-the-nextauthjs-api-route)
- [Creating the Authentication Frontend](#creating-the-authentication-frontend)
  - [Creating a Sign-In Page](#creating-a-sign-in-page)
  - [Adding Sign-In Buttons to the Navbar](#adding-sign-in-buttons-to-the-navbar)
  - [Creating a Protected Page](#creating-a-protected-page)
- [Styling the Application](#styling-the-application)
- [Running the Project](#running-the-project)
- [Conclusion](#conclusion)

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v14 or later)
- **npm** or **yarn**

## Setting Up the Next.js Project

First, create a new Next.js project. You can use `create-next-app` for a quick setup.

```bash
npx create-next-app nextjs-auth-example
cd nextjs-auth-example
```

Alternatively, if you prefer `yarn`:

```bash
yarn create next-app nextjs-auth-example
cd nextjs-auth-example
```

## Installing Dependencies

NextAuth.js requires a few additional packages. Install them using npm or yarn.

```bash
npm install next-auth
```

Or with yarn:

```bash
yarn add next-auth
```

## Configuring Environment Variables

NextAuth.js uses environment variables to store sensitive information such as client IDs and secrets for each authentication provider. Create a `.env.local` file in the root of your project:

```bash
touch .env.local
```

Add the following variables to `.env.local`. You’ll need to replace the placeholder values with your actual credentials obtained from each provider.

```env
# NextAuth.js secret
NEXTAUTH_SECRET=your_nextauth_secret

# GitHub Provider
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Google Provider
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

# Facebook Provider
FACEBOOK_ID=your_facebook_client_id
FACEBOOK_SECRET=your_facebook_client_secret
```

### Obtaining Provider Credentials

You need to register your application with each authentication provider to obtain the necessary credentials.

1. **GitHub**:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers).
   - Create a new OAuth App.
   - Set the authorization callback URL to `http://localhost:3000/api/auth/callback/github`.

2. **Google**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project and set up OAuth 2.0 credentials.
   - Set the authorized redirect URI to `http://localhost:3000/api/auth/callback/google`.

3. **Facebook**:
   - Go to [Facebook for Developers](https://developers.facebook.com/).
   - Create a new App and set up Facebook Login.
   - Set the valid OAuth redirect URI to `http://localhost:3000/api/auth/callback/facebook`.

**Note**: Make sure to replace `http://localhost:3000` with your deployment URL when deploying the application.

## Creating the NextAuth.js API Route

NextAuth.js works by defining an API route in your Next.js application. Create a `[...nextauth].js` file inside the `pages/api/auth` directory.

```bash
mkdir -p pages/api/auth
touch pages/api/auth/[...nextauth].js
```

Add the following code to `[...nextauth].js`:

```javascript
// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Optional: Customize pages
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in
  },
  // Optional: Enable debug messages in the console if you are having problems
  // debug: process.env.NODE_ENV === 'development',
});
```

This configuration sets up NextAuth.js with three providers: GitHub, Google, and Facebook. Ensure that the environment variables are correctly set in your `.env.local` file.

## Creating the Authentication Frontend

NextAuth.js provides React hooks to manage authentication state on the client side. We’ll create a simple sign-in page and protect some pages from unauthorized access.

### Creating a Sign-In Page

Create a sign-in page at `pages/auth/signin.js`:

```bash
mkdir -p pages/auth
touch pages/auth/signin.js
```

Add the following code:

```jsx
// pages/auth/signin.js

import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn({ providers }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl mb-4 text-center">Sign in to Your Account</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="mb-3">
            <button
              onClick={() => signIn(provider.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
            >
              <Image
                src={`/icons/${provider.id}.svg`}
                alt={`${provider.name} icon`}
                width={20}
                height={20}
                className="mr-2"
              />
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Fetching providers server-side
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
```

**Note**: You'll need to add icons for each provider in your `public/icons` directory or adjust the button accordingly.

### Adding Sign-In Buttons to the Navbar

To allow users to sign in from any page, you can add a sign-in button to your navigation bar.

For example, modify `pages/_app.js` to include a simple navigation:

```jsx
// pages/_app.js

import { SessionProvider, useSession, signOut } from "next-auth/react";
import Link from "next/link";

function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex justify-between p-4 bg-blue-600 text-white">
      <Link href="/">
        <a className="font-bold">MyApp</a>
      </Link>
      <div>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <div className="flex items-center space-x-4">
            <span>Signed in as {session.user.email}</span>
            <button onClick={() => signOut()} className="bg-red-500 px-3 py-1 rounded">
              Sign Out
            </button>
          </div>
        ) : (
          <Link href="/auth/signin">
            <a className="bg-green-500 px-3 py-1 rounded">Sign In</a>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NavBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
```

### Creating a Protected Page

Let's create a protected page that only authenticated users can access. Create `pages/protected.js`:

```bash
touch pages/protected.js
```

Add the following code:

```jsx
// pages/protected.js

import { useSession, getSession } from "next-auth/react";

export default function ProtectedPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn();
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl">Protected Page</h1>
      <p>Welcome, {session.user.name}! This is a protected page.</p>
    </div>
  );
}
```

Alternatively, you can use `getServerSideProps` to protect the page server-side:

```jsx
// pages/protected.js

import { getSession } from "next-auth/react";

export default function ProtectedPage({ user }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl">Protected Page</h1>
      <p>Welcome, {user.name}! This is a protected page.</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { user: session.user },
  };
}
```

## Styling the Application

For styling, you can use [Tailwind CSS](https://tailwindcss.com/) or any other CSS framework. To keep this example simple, basic inline styles or minimal CSS is used. Feel free to enhance the UI as per your requirements.

## Running the Project

Once you've set up everything, you can run your Next.js application:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

Navigate to [http://localhost:3000](http://localhost:3000) in your browser. You should see your application with a navigation bar that includes a sign-in button. Click the sign-in button to authenticate using one of the configured providers (Google, GitHub, or Facebook).

## Conclusion

You've successfully set up a Next.js application with a full authentication system using NextAuth.js, integrating three popular authentication providers: Google, GitHub, and Facebook. This setup provides a solid foundation for managing user authentication in your Next.js projects.

**Next Steps:**

- **Database Integration**: For persisting user sessions and managing user data, consider integrating a database with NextAuth.js (e.g., PostgreSQL, MongoDB).

- **Customizing Pages**: Customize the authentication pages to match your application's design.

- **Additional Providers**: Explore and add more authentication providers as needed.

- **Security Enhancements**: Implement additional security measures such as email verification, password policies, and account recovery options.

For more detailed information, refer to the [NextAuth.js documentation](https://next-auth.js.org/getting-started/introduction).