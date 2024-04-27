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

const getCardnewsListQuery = async ({
  queryKey,
}: {
  queryKey: ["CardnewsList", string];
}): Promise<AxiosResponse<CardnewsType[]>> => {
  const Category = queryKey[1]; // ex) queryKey: ["super-hero", "3"]
  const url = `/api/card/?category=${Category}`;
  console.log(url);

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
