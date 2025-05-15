import { User } from '../interfaces/types';
import { getUserCollection } from '../models/userModel';
import { getPostCollection } from '../models/postModel';
import { Post } from '../interfaces/types';


export const loadUsersWithPostsAndComments = async (): Promise<void> => {
  try {
    console.log('Starting data load from JSONPlaceholder...');
    const users = await fetchUsersFromAPI();
    console.log(`Fetched ${users.length} users from API`);

    const userCollection = getUserCollection();
    const postCollection = getPostCollection();
    
    // Clear existing data
    await userCollection.deleteMany({});
    await postCollection.deleteMany({});
    console.log('Cleared existing data');

    for (const user of users.slice(0, 10)) {
      console.log(`Processing user ${user.id}`);
      
      const postsResponse = await fetch(
        `https://jsonplaceholder.typicode.com/users/${user.id}/posts`
      );
      const posts: Post[] = await postsResponse.json();
      console.log(`Found ${posts.length} posts for user ${user.id}`);

      for (const post of posts) {
        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
        );
        const comments = await commentsResponse.json();
        post.comments = comments;
      }

      user.posts = posts;
      await userCollection.insertOne(user);
      
      // Insert posts separately
      await postCollection.insertMany(posts.map(post => ({
        ...post,
        userId: user.id
      })));
    }
    console.log('Data load completed successfully');
  } catch (error) {
    console.error('Error in loadUsersWithPostsAndComments:', error);
    throw error;
  }
};

export const fetchUsersFromAPI = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users from API');
  }
  return response.json();
};


export const deleteAllUsers = async (): Promise<void> => {
  const userCollection = getUserCollection();
  await userCollection.deleteMany({});
};

export const deleteUserById = async (userId: number): Promise<boolean> => {
  const userCollection = getUserCollection();
  const result = await userCollection.deleteOne({ id: userId });
  return result.deletedCount > 0;
};

export const getUserById = async (userId: number): Promise<User | null> => {
  const userCollection = getUserCollection();
  const postCollection = getPostCollection();

  const user = await userCollection.findOne({ id: userId });
  if (!user) return null;

  const posts = await postCollection.find({ userId: user.id }).toArray();
  user.posts = posts;

  return user;
};

export const createUser = async (user: User): Promise<User> => {
  const userCollection = getUserCollection();
  const existingUser = await userCollection.findOne({ id: user.id });
  
  if (existingUser) {
    throw new Error('User already exists.');
  }

  await userCollection.insertOne(user);
  return user;
};