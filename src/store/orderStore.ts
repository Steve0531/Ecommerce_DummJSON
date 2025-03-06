import { create } from "zustand";
import { ICart } from "../types/Products";
import { fetchCarts } from "../api/cartApi";

interface IOrderState{

    orders:ICart[],
    fetchAllOrders: ()=>void,
    setOrders :(orders:ICart[])=>void,
    
}

export const useOrderStore = create<IOrderState>((set) => ({
    orders: [],

      fetchAllOrders: async () => {
        const data = await fetchCarts();
        set({ orders:data});
      },

    setOrders: (orders) =>{
     set({ orders }) }
  }));

  useOrderStore.getState().fetchAllOrders();