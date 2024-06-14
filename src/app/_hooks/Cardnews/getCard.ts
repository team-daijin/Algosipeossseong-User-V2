import { AxiosError, AxiosResponse } from "axios";
import instance from "../../_utils/axios";
import { useQuery } from "@tanstack/react-query";

export interface CardnewsType {
  id: Number;
  thumbnail: String;
  category: String;
  title: String;
  expert: String;
  content: String;
}

const getCardnewsQuery = async ({
  queryKey,
}: {
  queryKey: ["Cardnews", number];
}): Promise<AxiosResponse<CardnewsType>> => {
  const id = queryKey[1]; // ex) queryKey: ["super-hero", "3"]
  const url = `/card/${id}`;

  return await instance.get(url);
};


const useCardQuery = (id: number) => {
  return useQuery({
    queryKey: ["Cardnews", id],
    queryFn: getCardnewsQuery, // (*)
  });
};

export default useCardQuery;

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
