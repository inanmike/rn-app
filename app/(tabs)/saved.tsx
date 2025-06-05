import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { getFavs, getWatched } from '@/services/user';
import { icons } from '@/constants/icons'
import { useIsFocused } from '@react-navigation/native';

const user = {
  name: 'Ahmet Yılmaz',
  username: '@ahmetyilmaz',
  bio: 'Film tutkunu | Sinema eleştirmeni',
  followers: 1234,
  following: 567,
  stats: { film: 384, hour: 862, rating: 215 },
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
}

const likedMovies = [
  { title: 'Inception', year: 2010, image: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg', rating: 4.5 },
  { title: 'Interstellar', year: 2014, image: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg', rating: 4.7 },
  { title: 'Dune', year: 2021, image: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg', rating: 4.2 },
]

const collections = [
  { name: 'Bilim Kurgu', count: 45, image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b' },
  { name: 'Klasikler', count: 32, image: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66' },
  { name: 'Aksiyon', count: 28, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' },
]

const lastWatched = [
  { title: 'The Matrix', date: 'Dün', image: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
  { title: 'Blade Runner', date: '2 gün önce', image: 'https://image.tmdb.org/t/p/w500/vZ6bYdtv0GgTj7f8q8l5hOe8JpT.jpg' },
  { title: 'Avatar', date: '1 hafta önce', image: 'https://image.tmdb.org/t/p/w500/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg' },
]

const Saved = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<any[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getFavs('main').then(setFavorites);
      getWatched().then(setWatchedMovies);
    }
  }, [isFocused]);

  return (
    <ScrollView className='bg-primary flex-1 px-5'>
      {/* Profil */}
      <View className='items-center mt-16 mb-6'>
        <Image source={{ uri: user.avatar }} className='w-24 h-24 rounded-full mb-3' />
        <Text className='text-xl font-bold text-center'>{user.name}</Text>
        <Text className='text-gray-400 text-base mb-1'>@ahmetyilmaz</Text>
        <Text className='text-gray-500 text-sm text-center'>{user.bio}</Text>
        <View className='flex-row justify-center gap-8 mt-4'>
          <View className='items-center'>
            <Text className='font-bold text-base text-white'>{user.followers}</Text>
            <Text className='text-xs text-gray-400'>Takipçi</Text>
          </View>
          <View className='items-center'>
            <Text className='font-bold text-base text-white'>{user.following}</Text>
            <Text className='text-xs text-gray-400'>Takip</Text>
          </View>
        </View>
        <View className='flex-row justify-center gap-8 mt-4'>
          <View className='items-center'>
            <Text className='font-bold text-base text-white'>{user.stats.film}</Text>
            <Text className='text-xs text-gray-400'>Film</Text>
          </View>
          <View className='items-center'>
            <Text className='font-bold text-base text-white'>{user.stats.hour}</Text>
            <Text className='text-xs text-gray-400'>Saat</Text>
          </View>
          <View className='items-center'>
            <Text className='font-bold text-base text-white'>{user.stats.rating}</Text>
            <Text className='text-xs text-gray-400'>Değerlendirme</Text>
          </View>
        </View>
      </View>

      {/* Beğenilen Filmler */}
      <Text className='font-bold text-lg mb-2 text-white'>Beğenilen Filmler</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-6'>
        {favorites.map((movie) => (
          <View key={movie.$id} className='mr-4 w-32'>
            <Image source={{ uri: movie.poster_url }} className='w-32 h-44 rounded-lg mb-2' />
            <Text className='font-semibold text-sm text-white'>{movie.title}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Koleksiyonlar */}
      <Text className='font-bold text-lg mb-2 text-white'>Koleksiyonlarım</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-6'>
        {collections.map((col, idx) => (
          <View key={idx} className='mr-4 w-32 h-20 rounded-lg overflow-hidden justify-end'>
            <Image source={{ uri: col.image }} className='absolute w-full h-full' style={{ opacity: 0.7 }} />
            <View className='p-2'>
              <Text className='text-white font-bold'>{col.name}</Text>
              <Text className='text-white text-xs'>{col.count} Film</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Son İzlenenler */}
      <Text className='font-bold text-lg mb-2 text-white'>Son İzlenenler</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-24'>
        {watchedMovies.map((movie) => (
          <View key={movie.$id} className='mr-4 w-32'>
            <Image source={{ uri: movie.poster_url }} className='w-32 h-44 rounded-lg mb-2' />
            <Text className='font-semibold text-sm text-white'>{movie.title}</Text>
            <Text className='text-xs text-gray-400'>
              {movie.watchedAt ? new Date(movie.watchedAt).toLocaleDateString() : ''}
            </Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  )
}

export default Saved