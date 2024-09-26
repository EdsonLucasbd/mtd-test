import type { MenuItem } from "@/types/menu"
import CartAddIcon from "@/../public/assets/images/icon-add-to-cart.svg?react"
import IncrementIcon from "@/../public/assets/images/icon-increment-quantity.svg?react"
import DecrementIcon from "@/../public/assets/images/icon-decrement-quantity.svg?react"
import { useCartStore } from "@/store/cart-store"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ItemDetail } from "./item-detail"

export const ItemCard = ({ name, category, price, image }: MenuItem) => {
  const { addToCart, removeFromCart, products } = useCartStore()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <div className='flex flex-col size-fit'>
      <div className="relative w-full">
        {products.some((product) => product.name === name) ? (
          <>
            <ItemDetail name={name} image={image}>
              <img src={!isDesktop ? image.mobile : image.desktop} alt={`${name} image`} className="w-full h-auto lg:w-[280px] lg:h-[250px] rounded-md ring-2 ring-brand-red transition-all ease-in-out duration-300" />
            </ItemDetail>
            <div className="absolute flex items-center justify-between gap-3 w-[140px] h-11 lg:w-[220px] lg:h-[50px] bg-brand-red border 
            border-brand-red rounded-full text-sm lg:text-lg px-3 lg:px-5
              translate-x-[-50%] translate-y-[-50%] left-1/2 font-semibold">
              <button className="flex size-fit rounded-full border border-white item-center justify-center p-1
              hover:bg-white group"
                onClick={() => removeFromCart(name)}
                aria-label="Remove item from cart"
              >
                <DecrementIcon className="size-2 lg:size-3 group-hover:stroke-brand-red group-hover:stroke-1" />
              </button>

              <p className="text-white">{products.find((product) => product.name === name)?.quantity}</p>

              <button className="flex size-fit rounded-full border border-white item-center justify-center p-1
              hover:bg-white group"
                onClick={() => addToCart({ name, price, quantity: 1, image })}
                aria-label="Add item to cart"
              >
                <IncrementIcon className="size-2 lg:size-3 group-hover:stroke-brand-red group-hover:stroke-1" />
              </button>
            </div>
          </>
        ) : (
          <>
            <ItemDetail name={name} image={image}>
              <img src={!isDesktop ? image.mobile : image.desktop} alt={`${name} image`} className="w-full h-auto lg:w-[280px] lg:h-[250px] rounded-md" />
            </ItemDetail>
            <button className="absolute flex items-center justify-center gap-1 lg:gap-3 w-[140px] h-11 lg:w-[220px] lg:h-[50px] bg-white border 
              border-brand-rose-500 hover:border-brand-red rounded-full text-sm lg:text-lg
              translate-x-[-50%] translate-y-[-50%] left-1/2 font-semibold text-brand-rose-900 hover:text-brand-red
              transition-all duration-300 ease-in-out"
              onClick={() => addToCart({ name, price, quantity: 1, image })}
              aria-label="Add item to cart"
            >
              <CartAddIcon className="size-5 text-brand-red" />
              Add to cart
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col mt-9">
        <p className="text-brand-rose-400 font-semibold">{category}</p>
        <h3 className="text-xl font-bold text-brand-rose-900">{name}</h3>
        <p className="text-brand-red font-bold text-lg">${price.toFixed(2)}</p>
      </div>
    </div>
  )
}
