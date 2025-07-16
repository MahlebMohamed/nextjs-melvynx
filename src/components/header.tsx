import Link from "next/link";

export default function Header() {
  return (
    <header className="flex border-x items-center gap-4 justify-between px-4 py-2 border-b max-w-md mx-auto">
      <Link href="/">Home</Link>
      <Link href="/auth/signup">Signup</Link>
      {/* <Link href="/signin">Signin</Link> */}
    </header>
  );
}
