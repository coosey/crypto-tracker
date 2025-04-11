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