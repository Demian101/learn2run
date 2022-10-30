import { useQuery } from 'react-query';
import axios from 'axios';
import httpClient from '../../api/http-common'

const fetchTopN = async () => {
  const res = await httpClient.get(`/sen/topN`)
  return res.data
}


export const UseGetTopNSentences = () => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    ['get topN Sentences'],
    fetchTopN,
    {
      // keepPreviousData: true,
      retry: true,
      refetchOnWindowFocus: true,  // Window 聚焦时将再次 Refetch
      enabled: true  // RQ 查询默认自动运行， 禁止自动查询。  
    });

  return { data, isLoading, isError, isSuccess };
};