import { create } from 'zustand'

interface Product {
  name: string
  price: number
  quantity: number
  image: string
}

interface CartState {
  products: Product[]
  total: number
  addToCart: (product: Product) => void
  removeFromCart: (name: string) => void
  updateQuantity: (name: string, quantity: number) => void
  clearCart: () => void
}

const calculateTotal = (products: Product[]) =>
  products.reduce((sum, product) => sum + product.price * product.quantity, 0);

export const useCartStore = create<CartState>((set) => ({
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

  updateQuantity: (name, quantity) => set((state) => {
    const updatedProducts = state.products.map((product) =>
      product.name === name ? { ...product, quantity } : product
    )
    return {
      products: updatedProducts,
      total: calculateTotal(updatedProducts)
    }
  }),

  clearCart: () => set(() => ({
    products: [],
    total: 0
  }))
}))