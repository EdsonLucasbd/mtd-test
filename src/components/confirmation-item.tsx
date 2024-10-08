import type { Product } from "@/store/cart-store"

export const ConfirmationItem = ({ image, name, price, quantity }: Product) => {
  return (
    <div className="flex items-center justify-start w-full p-5 gap-4">
      <img src={image.thumbnail} alt="" className="size-12 lg:size-16 rounded-md" />
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col items-start gap-1 lg:gap-2">
          <p className="text-brand-rose-900 font-bold text-sm lg:text-base line-clamp-1">{name}</p>
          <div className="flex items-center gap-4">
            <p className="text-brand-red font-semibold text-sm lg:text-base">{quantity}x</p>
            <p className="text-brand-rose-400"><span className="text-xs">@ </span>${price.toFixed(2)}</p>
          </div>
        </div>
        <p className="text-brand-rose-900 font-bold lg:text-lg">${(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  )
}
