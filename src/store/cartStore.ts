import { create } from "zustand";
import { ICart, IProduct } from "../types/Products";
import { fetchCartById } from "../api/cartApi";

interface ICartState {
  cart: ICart | null;
  setCart: (cart: ICart) => void;
  fetchCart: () => Promise<void>;
  addToCart: (product: IProduct) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart:()=>void;
}

export const useCartStore = create<ICartState>((set) => ({
  cart: null,

  setCart: (cart) => set({ cart }),

  fetchCart: async () => {
    const fetchedCart = await fetchCartById();
    set({ cart: fetchedCart });
  },
  clearCart: () =>
    set((state) => ({
      cart: state.cart
        ? {
            ...state.cart,
            products: [],
            totalQuantity: 0,
            total: 0,
            discountedTotal: 0,
            totalProducts: 0,
          }
        : null, 
    })),

  addToCart: (product) =>
    set((state) => {
      if (!state.cart) {
        return {
          cart: {
            id: 1,
            products: [{ ...product, quantity: 1, total: product.price, discountedTotal: product.price - (product.discountPercentage / 100) * product.price }],
            totalQuantity: 1,
            total: product.price,
            discountedTotal: product.price - (product.discountPercentage / 100) * product.price,
            userId: 142,
            totalProducts: 1,
          },
        };
      }

      const existingProduct = state.cart.products.find((p) => p.id === product.id);
      if (existingProduct) {
        return {
          cart: {
            ...state.cart,
            products: state.cart.products.map((p) =>
              p.id === product.id
                ? { ...p, quantity: p.quantity + 1, total: (p.quantity + 1) * p.price }
                : p
            ),
            totalQuantity: state.cart.totalQuantity + 1,
            total: state.cart.total + product.price,
            discountedTotal: state.cart.discountedTotal + (product.price - (product.discountPercentage / 100) * product.price),
          },
        };
      } else {
        return {
          cart: {
            ...state.cart,
            products: [
              ...state.cart.products,
              { ...product, quantity: 1, total: product.price, discountedTotal: product.price - (product.discountPercentage / 100) * product.price },
            ],
            totalQuantity: state.cart.totalQuantity + 1,
            total: state.cart.total + product.price,
            discountedTotal: state.cart.discountedTotal + (product.price - (product.discountPercentage / 100) * product.price),
            totalProducts: state.cart.totalProducts + 1,
          },
        };
      }
    }),

    increaseQuantity: (id) =>
      set((state) => {
        if (!state.cart) return state;
    
        const product = state.cart.products.find((p) => p.id === id);
        if (!product) return state;
    
        const newQuantity = product.quantity + 1;
        const newTotal = newQuantity * product.price;
        const productDiscount = (product.discountPercentage / 100) * product.price;
        
        return {
          cart: {
            ...state.cart,
            products: state.cart.products.map((p) =>
              p.id === id ? { ...p, quantity: newQuantity, total: newTotal } : p
            ),
            totalQuantity: state.cart.totalQuantity + 1,
            total: state.cart.total + product.price,
            discountedTotal: parseFloat((state.cart.discountedTotal + (product.price - productDiscount)).toFixed(2)), // Fix precision
          },
        };
      }),

      decreaseQuantity: (id) =>
        set((state) => {
          if (!state.cart) return state;
      
          const product = state.cart.products.find((p) => p.id === id);
          if (!product) return state;
      
          const productDiscount = (product.discountPercentage / 100) * product.price;
      
          if (product.quantity === 1) {
            return {
              cart: {
                ...state.cart,
                products: state.cart.products.filter((p) => p.id !== id),
                totalQuantity: state.cart.totalQuantity - 1,
                total: state.cart.total - product.price,
                discountedTotal: parseFloat((state.cart.discountedTotal - (product.price - productDiscount)).toFixed(2)), // Fix precision
                totalProducts: state.cart.totalProducts - 1,
              },
            };
          } else {
            return {
              cart: {
                ...state.cart,
                products: state.cart.products.map((p) =>
                  p.id === id
                    ? { ...p, quantity: p.quantity - 1, total: (p.quantity - 1) * p.price }
                    : p
                ),
                totalQuantity: state.cart.totalQuantity - 1,
                total: state.cart.total - product.price,
                discountedTotal: parseFloat((state.cart.discountedTotal - (product.price - productDiscount)).toFixed(2)), // Fix precision
              },
            };
          }
        }),
      

  removeItem: (id) =>
    set((state) => {
      if (!state.cart) return state;
      const updatedProducts = state.cart.products.filter((p) => p.id !== id);
      const totalQuantity = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);
      const total = updatedProducts.reduce((sum, p) => sum + p.total, 0);
      const discountedTotal = updatedProducts.reduce((sum, p) => sum + p.discountedTotal, 0);

      return {
        cart: {
          ...state.cart,
          products: updatedProducts,
          totalQuantity,
          total,
          discountedTotal,
          totalProducts: updatedProducts.length,
        },
      };
    }),


}));

useCartStore.getState().fetchCart();
