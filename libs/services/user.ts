import { updateProfile, User } from "firebase/auth";
import { auth } from "libs/firebase";

export const updateDisplayName = async (updatedName: string) => {
  try {
    await updateProfile(auth.currentUser as User, {
      displayName: updatedName
    });
  } catch (error) {
    console.error('Error updating display name:', error);
    throw error;
  }
}

export const fetchUser = async (token: string) => {
  try {
    await fetch('/api/user/favorites', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

export const registerUser = async (token: string) => {
  try {
    await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        body: JSON.stringify({
          user: auth.currentUser,
        })
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}