"use client";

import { AxiosRequestConfig } from "axios";
import useSWR from "swr";
// @ts-ignore
import { PublicConfiguration } from "swr/dist/_internal";
import axiosInstance from "@/services/client-request/axios-instance";

interface Props extends AxiosRequestConfig {
  isAuth?: boolean;
  data?: object;
  swrOptions?: PublicConfiguration;
  preventRequest?: boolean;
}

export function useRequest({
  headers,
  url,
  swrOptions,
  data = {},
  preventRequest,
  ...props
}: Props) {
  const headerParams: any = { ...headers };

  const fetcher = async (swrData: string[]) => {
    if (!swrData[0]) {
      return null;
    }

    return await axiosInstance
      .request({
        url: swrData[0],
        data: swrData[1],
        ...props,
        headers: headerParams,
      })
      .then(({ data }) => {
        return data;
      });
  };

  return useSWR([preventRequest ? undefined : url, data], fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
    ...swrOptions,
  });
}
