// src/models/commentModel.ts
import { Db, Collection } from 'mongodb';
import { Comment } from '../interfaces/types';

let commentCollection: Collection<Comment>;

export const initCommentCollection = async (db: Db): Promise<void> => {
  commentCollection = db.collection<Comment>('comments');
};

export const getCommentCollection = (): Collection<Comment> => {
  if (!commentCollection) {
    throw new Error('Comment collection not initialized');
  }
  return commentCollection;
};