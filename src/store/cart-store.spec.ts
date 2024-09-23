import { beforeEach, describe, expect, it } from 'vitest'
import { useCartStore } from './cart-store'

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.setState({ products: [] })
  })

  const image = { desktop: 'test.png', mobile: 'test.png', tablet: 'test.png', thumbnail: 'test.png' }

  it('should add product to cart', () => {
    const { addToCart } = useCartStore.getState()

    addToCart({ name: 'Test', price: 100, quantity: 1, image })


    expect(useCartStore.getState().products).toContainEqual({ name: 'Test', price: 100, quantity: 1, image })
  })

  it('should remove product from cart', () => {
    const { addToCart, removeFromCart } = useCartStore.getState()

    addToCart({ name: 'Test', price: 100, quantity: 1, image })
    addToCart({ name: 'Test 2', price: 100, quantity: 1, image })

    removeFromCart('Test')

    expect(useCartStore.getState().products).toHaveLength(1)
  })

  it('should clear cart', () => {
    const { clearCart, addToCart } = useCartStore.getState()

    addToCart({ name: 'Test', price: 100, quantity: 1, image })

    clearCart()

    expect(useCartStore.getState().products).toHaveLength(0)
  })
})