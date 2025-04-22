import { View, Text, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import MovieCard from '@/components/MovieCard'
import { getTrendingMovies } from '@/services/appwrite'

const Index = () => {

  const router = useRouter()

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies)


  const {data : movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({query : ''}))

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className='absolute w-full z-0'/>
      <ScrollView className='flex-1 px-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{minHeight:'100%', paddingBottom: 10}}
      >
        <Image 
          source={icons.logo} 
          className='w-12 h-10 mt-20 mb-5 mx-auto'
        />

        {moviesLoading || trendingLoading? (
          <ActivityIndicator
           size='large' color='#0000FF' className='mt-10 self-center' 
          />
        ): moviesError || trendingError ?
         ( <Text>Error: {moviesError?.message || trendingError?.message}</Text>
         ): (
          <View>
          <SearchBar 
            onPress={() => router.push('/search')}
            placeholder='Search for a movie..'
          />
          { trendingMovies && (
            <View className='mt-10'>
              <Text className='text-lg text-white font-bold mb-3'>Trending Movies</Text> 

              <FlatList
                data={trendingMovies}
                renderItem={({item, index}) => (
                  <Text className='text-white text-sm'>{item.title}</Text>
                )}
                className='mb-4 mt-3'
                keyExtractor={(item) => item.movie_id.toString()}
              />

            </View>
          )
          }
          <>
            <Text className='text-lg text-white font-bold mt-5 mb-3'>
              Latest Movies
            </Text>

            <FlatList 
              data={movies}
              renderItem={({item}) => (
                <MovieCard 
                  {...item}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10
              }}
              className='mt-2 pb-32'
              scrollEnabled= {false}
            />
          </>
        </View>
        )}

        
      </ScrollView>
    </View>
  )
}

export default Index