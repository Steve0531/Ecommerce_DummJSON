import {create} from "zustand"
import { fetchProducts} from "../api/prodApi"
import { IProduct } from "../types/Products";

interface IProdState{

    products : IProduct[],
    fetchAllProducts: (searchTerm:string, category:string)=>void,
    setProducts :(products:IProduct[])=>void,
    
}

export const useProdStore = create<IProdState>((set) => ({
    products: [],

      fetchAllProducts: async (searchTerm = "",category = "") => {
        const data = await fetchProducts( searchTerm,category);
        set({ products:data.products});
      },

    setProducts: (products) =>{
     set({ products }) }
}));

  

useProdStore.getState().fetchAllProducts("","");