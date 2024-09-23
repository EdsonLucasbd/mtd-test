import { useCartStore } from "@/store/cart-store"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import RemoveIcon from "@/../public/assets/images/icon-remove-item.svg?react"
import CarbonNeutralIcon from "@/../public/assets/images/icon-carbon-neutral.svg?react"
import { ConfirmationDialog } from "./confirmation-dialog"
import { ScrollArea } from "./ui/scroll-area"

export const Cart = () => {
  const { products, removeFromCart, total } = useCartStore()

  return (
    <Card className='w-full lg:w-[450px] lg:fixed lg:right-[199px] h-fit bg-white rounded-lg border-none shadow-none py-3'>
      <CardHeader className="pb-2 px-5 lg:px-6 lg:pb-0">
        <CardTitle className="text-brand-red font-bold">
          You Cart ({products.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-5 lg:p-6 items-center justify-center">
        {products.length === 0 ? (
          <>
            <img src="/assets/images/illustration-empty-cart.svg" alt="Cart is empty" className="mt-6" />
            <p className="text-brand-rose-400 my-5 text-sm lg:text-base">Your added items will appear here</p>
          </>
        ) : (
          <div className="flex flex-col w-full lg:divide-y">
            <ScrollArea className="hidden lg:flex flex-col max-h-[350px]">
              {
                products.map((product) => (
                  <div key={product.name} className="flex items-center justify-between py-5 border-t first:border-none">
                    <div className="flex flex-col gap-2">
                      <p className="text-brand-rose-900 font-bold">{product.name}</p>
                      <div className="flex items-center gap-4">
                        <p className="text-brand-red font-semibold text-lg">{product.quantity}x</p>
                        <p className="text-brand-rose-300"><span className="text-xs">@ </span>${product.price.toFixed(2)}</p>
                        <p className="text-brand-rose-500 font-semibold">${(product.price * product.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <button className="flex size-fit rounded-full border border-brand-rose-300 item-center justify-center p-1
                  hover:border-brand-rose-900 group"
                      onClick={() => removeFromCart(product.name)}
                      aria-label="Remove item from cart"
                    >
                      <RemoveIcon className="size-3 group-hover:stroke-brand-rose-900" />
                    </button>
                  </div>
                ))
              }
            </ScrollArea>
            <div className="flex flex-col w-full divide-y lg:hidden">
              {
                products.map((product) => (
                  <div key={product.name} className="flex items-center justify-between py-5">
                    <div className="flex flex-col gap-2">
                      <p className="text-brand-rose-900 font-bold">{product.name}</p>
                      <div className="flex items-center gap-4">
                        <p className="text-brand-red font-semibold text-lg">{product.quantity}x</p>
                        <p className="text-brand-rose-300"><span className="text-xs">@ </span>${product.price.toFixed(2)}</p>
                        <p className="text-brand-rose-500 font-semibold">${(product.price * product.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <button className="flex size-fit rounded-full border border-brand-rose-300 item-center justify-center p-1
                  hover:border-brand-rose-900 group"
                      onClick={() => removeFromCart(product.name)}
                      aria-label="Remove item from cart"
                    >
                      <RemoveIcon className="size-3 group-hover:stroke-brand-rose-900" />
                    </button>
                  </div>
                ))
              }
            </div>
            <div className="flex flex-col gap-7 py-5 ">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-brand-rose-500">Order Total</p>
                <p className="text-brand-rose-900 font-bold text-2xl">${total.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-center gap-1 lg:gap-2
                bg-brand-rose-50 p-5 rounded-xl text-brand-rose-500 font-semibold"
              >
                <CarbonNeutralIcon className="lg:size-7" />
                <p className="text-xs lg:text-base">This is a <span className="font-bold text-brand-rose-900">carbon-neutral</span> delivery</p>
              </div>
              <ConfirmationDialog>
                <button className="flex items-center justify-center
                bg-brand-red p-3 lg:p-5 rounded-full text-white font-semibold
                hover:bg-[#952c0c] text-lg transition-all duration-300 ease-in-out"
                >
                  Confirm Order
                </button>
              </ConfirmationDialog>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
