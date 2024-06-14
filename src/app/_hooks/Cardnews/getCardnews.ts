import { AxiosError, AxiosResponse } from "axios";
import instance from "../../_utils/axios";
import { useQuery } from "@tanstack/react-query";

export interface CardnewsType {
  id: String;
  title: String;
  writer: String;
  category: String;
  content: String;
  thumbnail: String;
  image: String;
}

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
  category: string;
  cards: Card[];
}

const getCardnewsListQuery = async ({
  queryKey,
}: {
  queryKey: ["CardnewsList", string];
}): Promise<AxiosResponse<Data[]>> => {
  const Category = queryKey[1]; // ex) queryKey: ["super-hero", "3"]
  const url = `/card`;

  return await instance.get(url);
};

const useCardnewsListQuery = (Category: string) => {
  return useQuery({
    queryKey: ["CardnewsList", Category],
    queryFn: getCardnewsListQuery, // (*)
  });
};

export default useCardnewsListQuery;

// export const useCardnewsListQuery = (category: number) => {
//   return useQuery<CardnewsType[], AxiosError>(
//     ["cardList", category],
//     async () => {
//       const params = { category };
//       const response = await instance.get("/post", {
//         params,
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       return response.data.data;
//     },
//     {
//       cacheTime: 300000,
//     }
//   );
// };
