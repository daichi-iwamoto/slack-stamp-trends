"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>Loading...</div>
      </main>
    );
  }

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>Signed in {session?.user?.name}</div>
        <button onClick={() => signOut()}>Sign out</button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Not signed in </div>
      <button onClick={() => signIn()}>Sign in</button>
    </main>
  );
}
