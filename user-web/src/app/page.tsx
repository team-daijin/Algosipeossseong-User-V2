import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@image/userbanner.svg";
import Category from "./_components/Category";
import Cardnews from "./_components/Cardnews";
import "@splidejs/react-splide/css";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function Home() {
  const data = [1, 2, 3, 4, 5];
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
          <Splide
            options={{
              width: "1250px",
              perPage: 4,
              height: "300px",
              rewind: true,
              gap: "10px",
              autoplay: true,
              arrows: false,
              pagination: false,
            }}
          >
            {data?.map((slide: any) => (
              <SplideSlide key={slide}>
                <Cardnews />
              </SplideSlide>
            ))}
          </Splide>
        </main>
      </div>
    </main>
  );
}
