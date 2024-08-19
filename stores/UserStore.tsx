import { RootStore } from "./RootStore";

export class UserStore {
/**
** Purpose: Manages user-related state and authentication.
** Key State Properties:
    user: The current user object (e.g., { id, name, email }).
    isAuthenticated: Boolean indicating whether the user is logged in.
** Key Actions:
    login(email, password): Authenticates the user and updates the user state.
    logout(): Logs the user out and clears the user state.
    register(userData): Registers a new user.
    updateProfile(updatedData): Updates user profile information.
*/
  rootStore: RootStore;
  constructor(rootStore?: RootStore) {
    this.rootStore = rootStore;
  }
};