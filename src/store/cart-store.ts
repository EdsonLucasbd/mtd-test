import type { Image } from '@/types/menu'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Product {
  name: string
  price: number
  quantity: number
  image: Image
}

interface CartState {
  products: Product[]
  total: number
  addToCart: (product: Product) => void
  removeFromCart: (name: string) => void
  clearCart: () => void
}

export interface StorageState {
  state: {
    products: Product[]
    total: number
    version: number
  }
}

const calculateTotal = (products: Product[]) =>
  products.reduce((sum, product) => sum + product.price * product.quantity, 0);

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      total: 0,
      addToCart: (newProduct) => set((state) => {
        const existingProduct = state.products.find((product) => product.name === newProduct.name)

        let updatedProducts
        if (existingProduct) {
          updatedProducts = state.products.map((product) => product.name === newProduct.name
            ? { ...product, quantity: product.quantity + newProduct.quantity }
            : product
          )
        } else {
          updatedProducts = [...state.products, newProduct]
        }

        return {
          products: updatedProducts,
          total: calculateTotal(updatedProducts)
        }
      }),

      removeFromCart: (name) => set((state) => {
        const existingProduct = state.products.find((product) => product.name === name)
        let updatedProducts = state.products

        if (existingProduct?.quantity === 1) {
          updatedProducts = state.products.filter((product) => product.name !== name)
        } else if (existingProduct && existingProduct.quantity > 1) {
          updatedProducts = state.products.map((product) => product.name === name
            ? { ...product, quantity: product.quantity - 1 }
            : product
          )
        }
        return {
          products: updatedProducts,
          total: calculateTotal(updatedProducts)
        }
      }),

      clearCart: () => set(() => ({
        products: [],
        total: 0
      }))
    }),
    {
      name: 'mtd-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)