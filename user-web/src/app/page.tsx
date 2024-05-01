"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@image/userbanner.svg";
import Category from "./_components/Category";
import Cardnews from "./_components/Cardnews";
import useCardnewsListQuery, {
  CardnewsType,
} from "./_hooks/Cardnews/getCardnews";
import { useState } from "react";
export default function Home() {
  // const { data, isLoading, isError } = useCardnewsListQuery("RELATION");
  const { data, isLoading, isError } = useCardnewsListQuery("body");
  console.log(data);
  // const data = [1, 2, 3, 4, 5];

  interface Card {
    date: string;
    thumbnail: string;
    category: string;
    title: string;
    expert: string;
    id: number;
    subTitle: string;
  }

  interface Category {
    category: string;
    cards: Card[];
  }

  interface Data {
    categories: Category[];
  }

  const constant = [
    {
      title: "마음 상담소로 오세요",
      subtitle: "내 안에 숨어있는 마음상담소로 초대합니다!",
    },
    {
      title: "나도 몰랐던 나의 몸",
      subtitle: "나조차도 모르고 있었던 나의 몸 속 비밀",
    },
    {
      title: "너와 나의 연결고리",
      subtitle: "즐겁고 행복한 우리의 관계를 건강하게 유지하는 법",
    },
    {
      title: "나를 확실하게 지키는 법",
      subtitle: "폭력으로부터 나를 올바른 방법으로 보호해봅시다.",
    },
    {
      title: "세상에 같은 사람은 없다",
      subtitle: "차이는 틀린 것이 아닌 다른 것!",
    },
  ];

  return (
    <main className="">
      <Image src={Banner} alt="banner" width={0} height={0} sizes="8vw"></Image>
      <div className="flex flex-row">
        <Category />
        <main>
          <section>
            <div className="flex flex-col gap-4 px-12">
              {data?.data.map((data, index) => {
                return (
                  <div key={index} className="flex flex-col px-12 py-8">
                    <div className="flex flex-col mb-2">
                      <h2 className="text-2xl font-semibold">
                        {constant[index].title}
                      </h2>
                      <h2 className="text-xl text-gray-500 font-regular">
                        {constant[index].subtitle}
                      </h2>
                    </div>
                    <div className="flex flex-row gap-8">
                      {data.cards?.map((card: Card) => {
                        if (card) {
                          console.log(card);
                          // Rest of your code...
                        }
                        return <Cardnews data={card} />;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </main>
  );
}

// <>
//   {data.categories[0].cards.map(data:Card index) => { }}

//   <div>{index}</div>
//   <Cardnews key={index} data={data} />
// </>
