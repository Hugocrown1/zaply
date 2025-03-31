import Link from "next/link";
import UrlsSheet from "../UrlsSheet";

const Navbar = () => {
  return (
    <nav className="w-full h-[50px] bg-background-950 border-b-[1px] border-[#444444] ">
      <div className="flex items-center justify-between h-full px-4 w-full max-w-[1400px] mx-auto">
        <Link href={"/"}>⚡Zaply</Link>
        <UrlsSheet />
      </div>
    </nav>
  );
};

export default Navbar;
