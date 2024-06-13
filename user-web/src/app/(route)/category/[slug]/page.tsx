"use client";
import Cardnews from "@/app/_components/Cardnews";
import { constant } from "./constant";
import Image from "next/image";
import useCategoryQuery from "@/app/_hooks/Category/getCategory";

type Props = {
  params: {
    slug: string;
  };
};
export default function PostPage({ params: { slug } }: Props) {
  const matchedCategory = constant.find((item) => item.param === slug); // matchedCategory를 콘솔에 출력
  const Category = constant.find((item) => item.param === slug)?.category; // matchedCategory를 콘솔에 출력
  const { data, isLoading, isError } = useCategoryQuery(Category!);
  return (
    <section className="flex flex-row overflow-hidden">
      <div className="flex flex-col gap-1 mt-8 ml-16">
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
          {data?.data.map((card, index) => {
            console.log(data);
            return (
              <div key={index} className="flex flex-row py-8">
                <Cardnews data={card} />
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
