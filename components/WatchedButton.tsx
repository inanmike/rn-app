import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { addWatched, isWatched } from '@/services/user';
import { icons } from '@/constants/icons';

type WatchedButtonProps = {
  movie: Movie;
};

const WatchedButton: React.FC<WatchedButtonProps> = ({ movie }) => {
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    isWatched(String(movie.id)).then(setWatched);
  }, [movie.id]);

  const handlePress = async () => {
    if (!watched) {
      await addWatched(movie);
      setWatched(true);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={watched ? icons.watched : icons.notWatched}
        style={{ width: 28, height: 28 }}
      />
    </TouchableOpacity>
  );
};

export default WatchedButton;