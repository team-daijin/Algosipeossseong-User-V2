import { AxiosError, AxiosResponse } from "axios";
import instance from "../../_utils/axios";
import { useQuery } from "@tanstack/react-query";

export interface CardnewsType {
  id: number;
  thumbnail: string;
  category: string;
  title: string;
  expert: string;
  content: string;
}

export interface Category {
  id: string;
  thumbnail: string;
  category: string;
  title: string;
}

export type CategoryArray = Category[];

const getCardnewsQuery = async ({
  queryKey,
}: {
  queryKey: ["Cardnews", number];
}): Promise<AxiosResponse<CardnewsType>> => {
  const id = queryKey[1]; // ex) queryKey: ["super-hero", "3"]
  const url = `/card/${id}`;

  return await instance.get(url);
};

const getCategoryQuery = async ({
  queryKey,
}: {
  queryKey: ["Category", string];
}): Promise<AxiosResponse<CategoryArray>> => {
  const id = queryKey[1];
  const url = `/card/category/${id}`;

  return await instance.get(url);
};

const useCardQuery = (id: number) => {
  return useQuery({
    queryKey: ["Cardnews", id],
    queryFn: getCardnewsQuery, // (*)
  });
};

export default useCardQuery;
