import { create } from "zustand";
import { fetchUsers, fetchUserById, updateUser } from "../api/userApi";
import { IUser } from "../types/Products";



interface UserStore {
  users: IUser[];
  selectedUser: IUser | null;
  fetchAllUsers: () => Promise<void>;
  fetchSingleUser: (id: number) => Promise<void>;
  updateUserDetails: (id: number, userData: Partial<IUser>) => Promise<void>;
  setSelectedUser: (user: IUser | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  selectedUser: null,

  fetchAllUsers: async () => {
    const data = await fetchUsers();
    set({ users:data.users });
  },

  fetchSingleUser: async (id: number) => {
    const user = await fetchUserById(id);
    set({ selectedUser: user });
  },

  updateUserDetails: async (id: number, userData: Partial<IUser>) => {
    const updatedUser = await updateUser(id, userData);
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
      selectedUser: null,
    }));
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
}));

useUserStore.getState().fetchAllUsers();