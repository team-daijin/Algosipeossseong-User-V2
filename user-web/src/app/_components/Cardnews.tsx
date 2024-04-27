import Image from "next/image";
import thumbnail from "@image/cardnews.png";
const Cardnews = () => {
  return (
    <article className="rounded-tl-3xl w-60">
      <Image
        src={thumbnail}
        alt="cardnews_image"
        className=" h-30 w-60 rounded-tl-3xl"
      />
      <div className="relative px-2 text-sm text-purple-600 border-2 border-purple-500 w-fit backdrop-blur -top-8 left-2">
        관계
      </div>
      <div className="relative p-1 -top-4">
        <div className="flex flex-row gap-1 text-xs font-normal text-gray-500">
          <h6>김예림</h6>
          <h6>|</h6>
          <h6>2024.04.12</h6>
        </div>
        <h2 className="text-base font-semibold">건강한 우정이란?</h2>
        <h3 className="text-xs text-gray-500">
          좋은 관계 오래오래 유지하는 법
        </h3>
      </div>
    </article>
  );
};

export default Cardnews;
