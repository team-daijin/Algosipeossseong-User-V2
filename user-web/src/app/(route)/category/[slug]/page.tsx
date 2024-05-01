"use client";
import Category from "@/app/_components/Category";
import { Metadata } from "next";
import data from "../../../../../data/posts.json";
import Cardnews from "@/app/_components/Cardnews";
import { useSearchParams } from "next/navigation";
import { constant } from "./constant";
import { match } from "assert";
import Image from "next/image";
import useCardnewsListQuery from "@/app/_hooks/Cardnews/getCardnews";

type Props = {
  params: {
    slug: string;
  };
};
// export async function generateMetadata({
//   params: { slug },
// }: Props): Promise<Metadata> {
//   const { title, description } = await getPostData(slug);
//   return {
//     title,
//     description,
//   };
// }

export default function PostPage({ params: { slug } }: Props) {
  const matchedCategory = constant.find((item) => item.param === slug); // matchedCategory를 콘솔에 출력
  const { data, isLoading, isError } = useCardnewsListQuery("");
  return (
    <section className="flex flex-row overflow-hidden">
      <div className="flex flex-col gap-1 mt-8 ">
        <div className="flex flex-row mb-2 ml-2">
          <Image
            src={matchedCategory?.icon}
            alt="logo"
            width={45}
            height={45}
          ></Image>
          <h1 className="ml-2 text-4xl font-bold text-black-500">
            {matchedCategory?.title}
          </h1>
        </div>
        <div className="flex flex-row gap-4 px-12">
          {data?.data.map((data, index) => {
            return (
              <div key={index} className="flex flex-col px-12 py-8">
                {data.cards?.map((card: Card) => {
                  if (card) {
                    console.log(card);
                    // Rest of your code...
                  }
                  return <Cardnews data={card} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// export async function generateStaticParams() {
//   const posts = await getFeaturedPosts();
//   return posts.map((post) => ({
//     slug: post.path,
//   }));
// }
