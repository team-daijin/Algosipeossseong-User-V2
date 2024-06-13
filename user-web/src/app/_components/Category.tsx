"use client";

import Image from "next/image";
import icon from "@image/categoryLogo.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Category = () => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const constant = [
    {
      title: "신체, 2차성징",
      link: "/category/body",
    },
    {
      title: "마음",
      link: "/category/mind",
    },
    {
      title: "관계, 우정",
      link: "/category/relationship",
    },
    {
      title: "폭력",
      link: "/category/violence",
    },
    {
      title: "양성평등",
      link: "/category/equality",
    },
  ];

  const handleClick = (link: string) => {
    setCurrentPath(link);
  };

  return (
    <aside className="flex flex-col items-center gap-4 w-36">
      <div className="flex flex-row items-center justify-center gap-2 p-4 mt-8 bg-gray-100 rounded-full w-36">
        <Image src={icon} alt="category"></Image>
        <h5 className="font-semibold ">카테고리</h5>
      </div>
      {constant.map((data, index) => (
        <Link
          key={index}
          href={data.link}
          className={`font-medium w-28 ${
            currentPath === data.link ? "text-purple-500" : ""
          }`}
          onClick={() => handleClick(data.link)}
        >
          {data.title}
        </Link>
      ))}
    </aside>
  );
};

export default Category;
