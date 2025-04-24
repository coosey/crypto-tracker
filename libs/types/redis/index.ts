
export interface UserData {
  email: string;
  isEmailVerified: boolean;
  favorites: string[];
}

export interface UserSchema {
  [userId: string]: UserData;
}