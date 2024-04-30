import Image from "next/image";
import thumbnail from "@image/cardnews.png";
import { CardnewsType } from "../_hooks/Cardnews/getCardnews";
import Category from "./Category";
import Link from "next/link";

interface Card {
  date: string;
  thumbnail: string;
  category: string;
  title: string;
  expert: string;
  id: number;
  subTitle: string;
}

const Cardnews = (props: { data: Card }) => {
  return (
    <article className="rounded-tl-3xl w-60">
      <Link href={`/detail/${props.data.id}`}>
        <img
          src={props.data.thumbnail}
          alt="cardnews_image"
          className="object-cover h-32 w-60 rounded-tl-3xl"
        />
        <div className="relative px-2 text-sm text-purple-600 border-2 border-purple-500 w-fit backdrop-blur -top-8 left-2">
          {props.data.category}
        </div>
        <div className="relative p-1 -top-4">
          <div className="flex flex-row gap-1 text-xs font-normal text-gray-500">
            <h6>{props.data.expert}</h6>
            <h6>|</h6>
            <h6>{props.data.date}</h6>
          </div>
          <h2 className="text-base font-semibold ">{props.data.title}</h2>
          <h3 className="text-xs text-gray-500">{props.data.subTitle}</h3>
        </div>
      </Link>
    </article>
  );
};

export default Cardnews;
