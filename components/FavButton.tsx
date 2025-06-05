import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { isFav, addFav, removeFav } from '@/services/user';
import { icons } from '@/constants/icons';

type FavButtonProps = {
  movie: Movie;
  query?: string; // favori listesi adı, default olarak 'main'
  userId: string;
};

const FavButton: React.FC<FavButtonProps> = ({ movie, query = 'main', userId }) => {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    isFav(query, movie.id).then(setFav);
  }, [movie.id, query]);

  const handlePress = async () => {
    if (fav) {
      await removeFav(query, movie.id);
      setFav(false);
    } else {
      await addFav(query, movie);
      setFav(true);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={fav ? icons.star : icons.notStar}
        style={{
          width: 28,
          height: 28,
          tintColor: fav ? '#FFD700' : '#ccc',
        }}
      />
    </TouchableOpacity>
  );
};

export default FavButton;