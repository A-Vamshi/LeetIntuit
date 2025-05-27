import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { generateAnswerMarkdown } from '@/utils/fetch';
import Markdown from "react-native-markdown-display";

const Main = ({ apiKey } : MainProps) => {
    const [ slug, setSlug ] = useState<string>("");
    const [markdown, setMarkdown] = useState<string>("");
    const levels = ["beginner", "intermediate", "advanced"];
    let level = 0;
    const handleClick = async () => {
        const text = slug.toLowerCase().replace(" ", "-");
        const res = await generateAnswerMarkdown({
            slug: text,
            level: levels[level],
            apiKey: apiKey,
        });
        setMarkdown(res ? res : "");
    }
    return (
        <View className='w-full bg-neutral-700 border-2 border-gray-500 rounded-md items-center justify-center p-2 my-2'>
            <Text className='text-white font-bold'>Enter the leetcode question: </Text>
            <TextInput 
                value={slug}
                onChangeText={(text) => setSlug(text)}
                className='bg-gray-400 w-full rounded-md p-2 text-white font-bold m-1'
            />
            <View className='flex-row justify-center items-center'>
                {levels.map((_, i) => (
                    <TouchableOpacity key={i} className='bg-gray-500 p-2 m-1 rounded-md' onPress={() => {
                        level = i
                    }}>
                        <Text>
                            Level {i}
                        </Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity className='bg-green-400 p-2 rounded-md m-1' onPress={handleClick}>
                    <Text>
                        Help me
                    </Text>
                </TouchableOpacity>
            </View>
            <Markdown style={{
                text: {
                    color: "#FFF",
                    fontWeight: 400,
                },
                bullet_list_icon: {
                    color: "#FFF"
                },
                bullet_list_content: {
                    color: "#FFF"
                },
                ordered_list_icon: {
                    color: "#FFF"
                },
                 ordered_list_content: {
                    color: "#FFF"
                },
                code_inline: {
                    backgroundColor: "#000",
                    color: "#FFF"
                }
            }}>
                {markdown}
            </Markdown>
        </View>
    )
}

export default Main