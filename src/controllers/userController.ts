import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { User } from '../interfaces/types';
import { getUserCollection } from '../models/userModel'; // Add this import

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userCollection = getUserCollection();
    const users = await userCollection.find().toArray();
    
    // Add explicit User type to the callback parameter
    const simplifiedUsers = users.map((user: User) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email
    }));
    
    res.status(200).json(simplifiedUsers);
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


export const loadUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    await userService.loadUsersWithPostsAndComments();
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to load users' });
  }
};



export const deleteAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    await userService.deleteAllUsers();
    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete users' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const deleted = await userService.deleteUserById(userId);
    
    if (deleted) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await userService.getUserById(userId);
    
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = req.body;
    const createdUser = await userService.createUser(user);
    res.status(201).json(createdUser);
  } catch (error: any) {
    if (error.message === 'User already exists.') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
};