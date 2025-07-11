'use server';

import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '@/lib/database';
import User from '@/lib/database/models/user.model';
import { handleError } from '@/lib/utils';

import { CreateUserParams, UpdateUserParams } from '@/types';

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    console.log(newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(clerkId: string) {
  try {
    await connectToDatabase();

    // Use `findOne` instead of `findById`
    const user = await User.findOne({ clerkId });

    if (!user) throw new Error('User not found');
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    // Use `findOneAndUpdate` with `clerkId`
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error('User update failed');
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error('User not found');
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath('/sunsetparis-admin');

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

export async function getAllUsers() {
  try {
    await connectToDatabase();

    const users = await User.find({}); // Retrieves all users from the database

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserCounts() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all users
    const users = await User.find();
    const admins = await User.find({ isAdmin: true });

    return {
      totalUsers: users.length, // Total users count
      totalAdmins: admins.length, // Total admins count
    };
  } catch (error) {
    console.error('Failed to fetch user statistics:', error);
    throw new Error('Failed to fetch user statistics');
  }
}

export async function updateUserPermissions(
  userId: string,
  permissions: {
    isAdmin?: boolean;
    canViewHiddenArtists?: boolean;
  }
) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: permissions,
      },
      { new: true }
    );

    if (!updatedUser) throw new Error('User update failed');

    revalidatePath('/admin/users');
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

/**
 * Get users with special permissions
 */
export async function getUsersWithSpecialAccess() {
  try {
    await connectToDatabase();

    const users = await User.find({
      $or: [{ isAdmin: true }, { canViewHiddenArtists: true }],
    }).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}
