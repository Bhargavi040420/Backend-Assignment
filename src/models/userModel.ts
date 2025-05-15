import { Db, Collection } from 'mongodb';
import { User } from '../interfaces/types';

let userCollection: Collection<User>;

export const initUserCollection = async (db: Db): Promise<void> => {
  userCollection = db.collection<User>('users');
};

export const getUserCollection = (): Collection<User> => {
  if (!userCollection) {
    throw new Error('User collection not initialized');
  }
  return userCollection;
};