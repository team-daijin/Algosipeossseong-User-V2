import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@image/userbanner.svg";
import Category from "@/components/Common/Category/index";
import Cardnews from "@/components/Common/Cardnews/index";
export default function Home() {
  const data = [1, 2, 3, 4, 5];
  return (
    <main className="px-32">
      <Image src={Banner} alt="banner" width={0} height={0} sizes="8vw"></Image>
      <div className="flex flex-row">
        <Category />
        <main>
          <section>
            <div className="px-12 py-8 ">
              <h2 className="text-2xl font-semibold">마음 상담소로 오세요</h2>
              <h2 className="text-xl text-gray-500 font-regular">
                내 안에 숨어있는 마음상담소로 초대합니다!
              </h2>
            </div>
            <div className="flex flex-row gap-4 px-12">
              {data?.map((slide: any) => <Cardnews key={slide} />)}
            </div>
          </section>
        </main>
      </div>
    </main>
  );
}
