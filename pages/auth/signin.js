import { getProviders, signIn } from 'next-auth/react';
import Head from 'next/head';

export default function SignIn({ providers }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <Head>
        <title>Sign In</title>
      </Head>

      <div className="w-full max-w-md space-y-4 p-6">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
