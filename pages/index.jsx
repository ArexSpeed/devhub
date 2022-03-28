import { signOut, useSession } from 'next-auth/client';

export default function Home() {
  const [session] = useSession();

  return session ? <button onClick={signOut}>Logout</button> : <div>You are not logged</div>;
}
