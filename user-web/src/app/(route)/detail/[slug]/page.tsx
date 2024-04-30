"use client";
import Category from "@/app/_components/Category";
import useCardQuery from "@/app/_hooks/Cardnews/getCard";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
type Props = {
  params: {
    slug: string;
  };
};

const Detail = ({ params: { slug } }: Props) => {
  // const { data, isLoading, isError } = useCardQuery(2);

  console.log("dataa", params.slug);
  return (
    <section className="px-32 lg:px-64">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-purple-500">신체, </h1>
        <h1 className="text-4xl font-bold text-black-500">건강한 우정이란?</h1>
        <div className="flex flex-row justify-between align-middle">
          <h2 className="text-base gray-500 text- font-regular">
            오은일 박사 | 2024.08.18
          </h2>
          <div className="px-4 text-base text-purple-600 border-2 border-purple-500 w-fit backdrop-blur">
            관계
          </div>
        </div>
        {/* <img alt="detail_image"></img> */}
        <div className="w-auto h-52 bg-slate-200">d</div>
      </div>
    </section>
  );
};

export default Detail;
