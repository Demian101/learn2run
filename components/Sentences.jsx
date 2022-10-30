import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import httpClient from "../api/http-common";
import { FaChevronRight } from 'react-icons/fa';
import SentencePrev from './SentencePrev';
import { Button, View, Text, Pressable } from 'react-native';
import { focusManager } from 'react-query'
import { UseGetAllAnime } from './hooks/UseGetAllAnime';
import { UseGetTopNSentences } from './hooks/UseGetTopNSentences';

const Sentences = () => {

  const [index, setIndex] = useState(0);  // 页面顺序
  const [putData, setPutData] = useState();
  const [sentCurrent, setSentCurrent] = useState(null);
  const [sentList, setSentList] = useState(null);

  const { data, isLoading, isError, isSuccess } = UseGetTopNSentences();
  const { data: da, isLoading: isL } = UseGetAllAnime();



  const handlerNextWord = () => {
    setIndex(pre => pre + 1);
    /* putRecogn();  // Every time click this btn, put recognition to backeend */
  }

  const handlerCalculate = () => {
    // calculate similarity
  }

  /* pass it to sub compo to get current sentence */
  const nextWordHandler = (res) => {
    setPutData(res);
  };

  useEffect(() => {
    if (data) {
      setSentCurrent(data[index]);
      setSentList(data)
    }
  }, [data, index]);

  // console.warn('sentCurrent', sentCurrent)
  return (

    <View className='flex flex-col justify-center items-center'>
      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Fetching error</Text>}

      {(isSuccess && sentCurrent && (index < sentList?.length)) &&
        <View>
          <SentencePrev nextWordHandler={nextWordHandler} index={index} {...sentCurrent} />

          <View className="flex flex-col items-center">
            <Pressable className="px-4 bg-[#62b6cb] border-b-4 border-b-[#38a2c5] border-r-4 border-r-[#38a2c5] rounded-md"
              onPress={handlerCalculate}>
              <Text className="text-center text-xl px-2 py-1 ">Calculate</Text>
            </Pressable>

            <Pressable className='px-4 my-1 bg-[#62b6cb] border-b-4 border-b-[#38a2c5] border-r-4 border-r-[#38a2c5] rounded-md text-[#1b4965] text-center shadow-lg '
              onPress={handlerNextWord}>
              {/* <FaChevronRight  className='text-center'/> */}
              <View className="flex flex-row justify-between">
                <Text className="text-center text-xl px-2 py-1">Next</Text>
                <Text className="text-center text-xl  px-2 py-1">{">"}</Text>
              </View>
            </Pressable>
          </View>
        </View>
      }

      {index === sentList?.length &&
        <Text>打卡</Text>
      }
    </View>
  )
}
export default Sentences;