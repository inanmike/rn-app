import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!;
const WATCHED_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_WATCHED_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const addFav = async (query: string, movie: Movie) => {
    const movies_id = movie.id
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("favoriteMovies", query),
    ]);
    await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      favoriteMovies: query,
      movie_id: movie.id,
      title: movie.title,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    });
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const removeFav = async (query: string, movieId: string) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("favoriteMovies", query),
      Query.equal("movie_id", movieId),
    ]);
    if (result.documents.length > 0) {
      await database.deleteDocument(DATABASE_ID, COLLECTION_ID, result.documents[0].$id);
    }
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

export const isFav = async (query: string, movieId: string) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("favoriteMovies", query),
      Query.equal("movie_id", movieId),
    ]);
    return result.documents.length > 0;
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
};

export const getFavs = async (query: string) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("favoriteMovies", query),
    ]);
    return result.documents;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};

// İzlenen filme ekle
export const addWatched = async (movie: Movie) => {
  try {
    await database.createDocument(DATABASE_ID, WATCHED_COLLECTION_ID, ID.unique(), {
      movie_id: String(movie.id),
      title: movie.title,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      watchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error adding watched movie:", error);
    throw error;
  }
};

// İzlenenleri çek
export const getWatched = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, WATCHED_COLLECTION_ID, [
      Query.orderDesc('watchedAt'),
    ]);
    return result.documents;
  } catch (error) {
    console.error("Error fetching watched movies:", error);
    return [];
  }
};

// İzlenmiş mi kontrolü
export const isWatched = async (movieId: string) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, WATCHED_COLLECTION_ID, [
      Query.equal("movie_id", movieId),
    ]);
    return result.documents.length > 0;
  } catch (error) {
    console.error("Error checking watched movie:", error);
    return false;
  }
};