import { useState, useEffect } from "react";

// Simple store implementation
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

  getUser() {
    return this.currentUser;
  }

  setUser(user: string) {
    this.currentUser = user;
    this.notifySubscribers();
  }

  subscribe(callback: (user: string | undefined) => void) {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.currentUser));
  }
}

// Create a single instance
const store = UserStore.getInstance();

// Hook to use the store
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