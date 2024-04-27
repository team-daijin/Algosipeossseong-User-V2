import Link from "next/link";
// import Logo from "@image/userMainLogo.svg";
import Logo from "../../../public/image/userMainLogo.svg";
import Image from "next/image";
export default function Header() {
  return (
    <header className="flex items-center justify-between py-8 text-lg font-semibold">
      <Link href="/">
        <Image src={Logo} alt="logo" className="w-300"></Image>
      </Link>
      <nav className="flex gap-8">
        <Link href="/">성지식 테스트</Link>
        <Link href="/about">로그인</Link>
      </nav>
    </header>
  );
}
