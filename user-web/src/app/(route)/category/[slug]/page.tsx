import Category from "@/app/_components/Category";
import { Metadata } from "next";
import Image from "next/image";
import data from "../../../../../data/posts.json";
import Cardnews from "@/app/_components/Cardnews";

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

export default async function PostPage({ params: { slug } }: Props) {
  // const post = await getPostData(slug);
  // const { title, path, next, prev } = post;
  return (
    <section className="flex flex-row overflow-hidden">
      <div className="flex flex-col gap-1 mt-8 ">
        <h1 className="mb-8 ml-12 text-4xl font-bold text-black-500">{slug}</h1>
        <div className="flex flex-row gap-4 px-12">
          {data?.map((slide: any) => <Cardnews />)}
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
