import { create } from "zustand";
import { IComment } from "../types/Products";

interface ICommentStore {
  comments: Record<number, IComment[]>; 
  addCommentToPost: (postId: number, comment: IComment) => void;
  setComments: (postId: number, comments: IComment[]) => void;
}

export const useCommentStore = create<ICommentStore>((set) => ({
  comments: {},

  addCommentToPost: (postId, comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: [...(state.comments[postId] || []), comment],
      },
    })),

  setComments: (postId, comments) =>
    set((state) => ({
      comments: { ...state.comments, [postId]: comments },
    })),
}));
