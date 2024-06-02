"use client";
import Category from "@/app/_components/Category";
import useCardQuery from "@/app/_hooks/Cardnews/getCard";
import contentImage from "../../../../../public/image/mind_genderon1.png";
import { useParams, useRouter, usePathname } from "next/navigation";
import { title } from "process";
import { useEffect, useState } from "react";
import Image from "next/image";
type Props = {
  params: {
    slug: number;
  };
};

const Detail = ({ params: { slug } }: Props) => {
  const { data, isLoading, isError } = useCardQuery(slug);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  console.log(data);
  const imageURLs = data?.data.content;

  console.log(imageURLs);

  return (
    <section className="px-32 lg:px-64">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-purple-500">
          {data?.data.category}
        </h1>
        <h1 className="text-4xl font-bold text-black-500">
          {data?.data?.title}
        </h1>
        <div className="flex flex-row justify-between align-middle">
          <h2 className="text-base gray-500 text- font-regular">
            {data?.data?.expert} |
          </h2>
          <div className="px-4 text-base text-purple-600 border-2 border-purple-500 w-fit backdrop-blur">
            {data?.data.category}
          </div>
        </div>
        <div className="mt-5">
          <img src={imageURLs} alt="detail_image" width={1000} height={500} />
        </div>
      </div>
    </section>
  );
};

export default Detail;
