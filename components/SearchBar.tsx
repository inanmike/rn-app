import { View, Text, Image, TextInput, Button } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
    placeholder: string
    onPress?: () => void
    value?: string
    onChangeText?: (text: string) => void
    onDelete?: () => void
}

const SearchBar = ({placeholder, onPress, value,onChangeText, onDelete} : Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
        <Image source={icons.search} className='size-5' resizeMode='contain' tintColor='#ab8bff'/>
        <TextInput 
            onPress={onPress}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor='#A8B5DB'
            className='flex-1 ml-2 text-white'
        />
        <Button
                title="X"
                onPress={onDelete}
                color='orange'
        />
    </View>
  )
}

export default SearchBar