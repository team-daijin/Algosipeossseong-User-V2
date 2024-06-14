import { AxiosError, AxiosResponse } from "axios";
import instance from "../../_utils/axios";
import { useQuery } from "@tanstack/react-query";

export interface Category {
  date: string;
  thumbnail: string;
  category: string;
  title: string;
  expert: string;
  id: number;
  subTitle: string;
}

export type CategoryArray = Category[];

const getCategoryQuery = async ({
  queryKey,
}: {
  queryKey: ["Category", string];
}): Promise<AxiosResponse<CategoryArray>> => {
  const id = queryKey[1];
  const url = `/card/category/${id}`;

  return await instance.get(url);
};

const useCategoryQuery = (category: string) => {
  return useQuery({
    queryKey: ["Category", category],
    queryFn: getCategoryQuery,
  });
};

export default useCategoryQuery;
