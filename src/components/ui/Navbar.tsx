import Link from "next/link";
import UrlsSheet from "../UrlsSheet";

const Navbar = () => {
  return (
    <nav className="w-full h-[50px] bg-background-950 border-b-[1px] border-[#444444] ">
      <div className="flex items-center justify-between h-full px-4 w-full max-w-[1400px] mx-auto">
        <div className="flex flex-row items-center space-x-2">
          <Link href={"/"}>⚡Zaply</Link>
          <div className="px-2 py-1 border-[1px] border-background-900 rounded-md text-xs">
            beta
          </div>
        </div>
        <UrlsSheet />
      </div>
    </nav>
  );
};

export default Navbar;
