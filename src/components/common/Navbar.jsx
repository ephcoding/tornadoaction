import Link from "next/link";
import { RiTornadoLine } from "react-icons/ri";

const NAV_ITEMS = [
  { name: "alerts", href: "/" },
  { name: "outlooks", href: "/outlooks" },
];

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between container mx-auto">
      <Link href="/" passHref>
        <a className="flex items-center">
          <RiTornadoLine color="red" className="h-9 w-auto mr-2 md:h-16" />
          <div className="flex flex-col leading-4 text-right italic md:text-2xl md:flex-row">
            <span className="inline-block">TORNADO</span>
            <span className="inline-block text-red-500">&nbsp;ACTION</span>
          </div>
        </a>
      </Link>
      <div className="space-x-4 md:text-2xl">
        {NAV_ITEMS.map((navItem) => (
          <Link key={navItem.name} href={navItem.href}>
            <a className="text-stone-200 hover:text-red-500">{navItem.name}</a>
          </Link>
        ))}
      </div>
    </nav>
  );
};
