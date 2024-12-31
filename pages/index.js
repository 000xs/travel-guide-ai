import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <Head>
          <title>Home</title>
        </Head>

        <Link
          href="/auth/signin"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <Head>
        <title>Welcome</title>
      </Head>

      <div className="text-center">
        <p className="mb-4 text-xl font-semibold text-gray-900">
          Welcome {session.user.name}
        </p>

        <button
          onClick={() => signOut()}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
