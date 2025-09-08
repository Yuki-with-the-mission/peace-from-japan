// components/Nav.tsx
'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/background", label: "Background" },
  { href: "/reactions",  label: "Reactions" },
  { href: "/opinion",    label: "Opinion" },
  { href: "/actions",    label: "Actions" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="text-sm flex gap-5">
      {items.map(i => {
        const active = pathname.startsWith(i.href);
        return (
          <Link key={i.href} href={i.href}
                aria-current={active ? "page" : undefined}
                className={active ? "underline font-semibold" : "hover:underline"}>
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
