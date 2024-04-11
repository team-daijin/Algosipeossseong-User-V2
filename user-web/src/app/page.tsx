import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@image/userbanner.svg";
import Category from "./_components/Category";
export default function Home() {
  return (
    <main className="px-32">
      <Image src={Banner} alt="banner" width={0} height={0} sizes="8vw"></Image>
      <div className="flex flex-row">
        <Category />
        <main>
          <div className="px-12 py-8">
            <h2 className="text-2xl font-semibold">마음 상담소로 오세요</h2>
            <h2 className="text-xl text-gray-500 font-regular">
              내 안에 숨어있는 마음상담소로 초대합니다!
            </h2>
          </div>
        </main>
      </div>
    </main>
  );
}
