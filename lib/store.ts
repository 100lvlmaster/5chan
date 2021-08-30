import create from 'zustand';
import { User, UserStore } from './types';

export const userStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: User) =>
    set((state) => {
      state.user = user;
    }),
}));
