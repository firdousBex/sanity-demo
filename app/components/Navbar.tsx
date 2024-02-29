// Navbar.tsx
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">
            <Link href="/">
              <p>Bex Money</p>
            </Link>
          </div>
          <div className="flex space-x-4 text-white">
            <Link href="/">
              <p>Home</p>
            </Link>
            <Link href="/about">
              <p>About</p>
            </Link>
            <Link href="/blog">
              <p>Blog</p>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
