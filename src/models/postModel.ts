import { Db, Collection } from 'mongodb';
import { Post } from '../interfaces/types';

let postCollection: Collection<Post>;

export const initPostCollection = async (db: Db): Promise<void> => {
  postCollection = db.collection<Post>('posts');
};

export const getPostCollection = (): Collection<Post> => {
  if (!postCollection) {
    throw new Error('Post collection not initialized');
  }
  return postCollection;
};