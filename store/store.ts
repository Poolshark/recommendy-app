import { useState, useEffect } from "react";

/**
 * -----------------------------------------
 * USER STORE
 * -----------------------------------------
 * A simple store implementation to manage the user's name.
 * 
 * @returns {Object} An object containing the user's name and
 * a function to set the user's name.
 */
class UserStore {
  private static instance: UserStore;
  private subscribers: Set<(user: string | undefined) => void>;
  private currentUser: string | undefined;

  private constructor() {
    this.subscribers = new Set();
    this.currentUser = undefined;
  }

  static getInstance() {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }
    return UserStore.instance;
  }

  // Getter - Returns the current user's name
  getUser() {
    return this.currentUser;
  }

  // Setter - Sets the current user's name
  setUser(user: string) {
    this.currentUser = user;
    this.notifySubscribers();
  }

  // Subscribes to the store updates
  subscribe(callback: (user: string | undefined) => void) {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  // Notifies the subscribers of the store updates
  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.currentUser));
  }
}

// Create a single instance
const store = UserStore.getInstance();

/**
 * -----------------------------------------
 * USER STORE HOOK
 * -----------------------------------------
 * A hook to use the user store.
 * 
 * @returns {Object} An object containing the user's name and
 * a function to set the user's name.
 */
export const userStore = () => {
  const [user, setUser] = useState(store.getUser());

  useEffect(() => {
    // Subscribe to store updates
    const unsubscribe = store.subscribe((newUser) => {
      setUser(newUser);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const setNewUser = (newUser: string) => {
    store.setUser(newUser);
  };

  return {
    user,
    setNewUser,
  };
};