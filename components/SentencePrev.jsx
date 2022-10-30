import { SafeAreaView, ScrollView, Text, TextInput, View, Form, Item, Input, Label, Button, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from "react-query";
import axios from 'axios'
import { useForm, Controller, FormProvider } from "react-hook-form";

import { BsPinAngle } from "react-icons/bs";
import { GiSoundWaves } from "react-icons/gi";
import { FcElectricalSensor } from "react-icons/fc";


// 因为 fetch audio 的 url 是个异步过程， Chrome 不能很好的支持，所以我们选择：
// 1. fetch 数据后再渲染 Player 组件，
// 2. 传进来的是一个  audio 流对象
// 3. 使用该流对象去初始化 Audio 对象，而不是 url
const useAudio = (data) => { // {url}
  const [audio] = useState(new Audio(data));
  // const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const toggle = () => setPlaying(!playing);
  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);
  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);
  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);
  return (
    <Pressable className='absolute right-0 bottom-2 pr-3 text-2xl rounded-md ' onPress={toggle}>{playing ? <GiSoundWaves /> : <FcElectricalSensor />}</Pressable>
  );
};

const ColorPara = (props) => {
  // console.log('props', props)

  const getColor = () => {
    const colors = ['red', 'orange', 'green', 'blue']
    return 'green'
  }
  return (
    <View>
      {props.children.split(' ').map(text => {
        return <Text key={Math.random()} className='text-base'
          style={{ color: getColor(), display: 'inline', }}
        >{text}&nbsp;</Text>
      })
      }
    </View>
  )
}


const SentencePrev = ({ index, nextWordHandler, zh, en, sound, label, words, _id }) => {

  const { control, handleSubmit, formState: { errors }, ...methods } = useForm({ answer: '', });

  const onSubmit = (data) => {
    console.log(data);
  }
  const onBlur = () => {
    console.warn('on  Blur')
  }
  const onChange = (event_value) => {
    // console.warn('onChange', event_value)
    setInputs(event_value)
  }

  const [inputs, setInputs] = useState();


  const submitText = (e) => {
    setInputs(e.target.value)
  }
  const audio_url = `http://127.0.0.1:8080/api/speech/${sound.split('.mp3')[0]}/audio`
  const { data, isSuccess, } = useQuery(
    ["fetch audio.mp3", sound],
    async () => {
      return await axios.get(audio_url)
    },
    {
      enabled: Boolean(sound)
    } // Boolean("") is false
  );

  return (
    <View className="w-screen px-8">
      <Text className='text-center mb-2 italic text-2xl border-b border-b-[#62b6cb] text-[#5fa0b4] rounded-xl'>{index + 1}</Text>
      <Text className='w-full text-left flex items-center'>
        {/* <BsPinAngle className='inline pr-2 text-xl' /> */}
        {zh}
      </Text>

      {/* <TextInput id="message" rows="3" className="w-full block p-4  text-gray-900 bg-gray-50 border-2 border-gray-300 shadow-lg px-3 py-2 rounded-lg focus:outline-none focus:border-[#62b6cb]" placeholder="Your message..."></TextInput> */}

      <View>
        <FormProvider {...methods}>
          <TextInput
            className="w-full block p-4  text-gray-900 bg-gray-50 border-2 border-gray-300 shadow-lg px-3 py-2 rounded-lg focus:outline-none focus:border-[#62b6cb]"
            placeholder="Your answer..."
            multiline={true}
            onBlur={onBlur}
            onChangeText={(e) => onChange(e)}
          />
        </FormProvider>

        {errors.firstName && <Text>This is required.</Text>}
        {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
      </View>

      {/* <View className='relative w-full py-2 font-semibold justify-between items-end'>
        <Text className='inline'>{en} </Text>
        {data?.data && <Player url={audio_url} />}
      </View> */}

      {/* <View>
        {
          words.map((word) => {
            return (
              <View key={word._id} className='w-full py-2 text-xl'>
                <ColorPara eng={en} inputs={inputs}> i love you  </ColorPara>
                <hr />
                <View className='flex flex-row justify-start'>
                  <Text className='inline'>{word.word}</Text>
                  <Text className='text-base text-slate-500 italic'>{word?.soundmark}</Text>
                </View>
                <Text className='text-base pl-2 italic text-slate-500'>{word.rootOrAffix}</Text>
                <Text className='text-base pl-2'>{word.definition}</Text>
              </View>
            )
          })
        }
      </View> */}
    </View>
  )
}
export default SentencePrev;