import Link from "next/link";

export function Footer() {
  return (
    <footer className="container mt-10 flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
      <p className="text-center text-sm">© 2024 My Kaizen Life, Inc. All rights reserved.</p>
      <div className="flex items-center gap-5">
        <Link target="_blank" href="https://instagram.com/my_kaizen_life">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-instagram"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>        </Link>
      </div>
    </footer>
  );
}
