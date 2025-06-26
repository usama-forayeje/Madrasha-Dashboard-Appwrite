import { useCurrentUser, useSignOut } from "@/hooks/useAuth";

function Header() {
  const { data: user } = useCurrentUser();
  const { mutate: signOut } = useSignOut();
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div className="text-lg font-semibold">Manzil Institute</div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Welcome, <span className="font-medium text-gray-900">{user?.name || "Guest"}</span>
        </span>
        <button
          onClick={() => signOut()}
          className="rounded-md bg-primary px-3 py-1.5 text-sm text-white hover:bg-primary/90"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
