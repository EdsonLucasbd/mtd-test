import Lottie from "lottie-react"
import check from '@/../public/assets/images/confirmation-animation.json'
import { useCartStore } from "@/store/cart-store"

export const CompleteOrder = () => {
  const { clearCart } = useCartStore()
  return (
    <div className="flex flex-col items-center gap-10 w-full text-center">
      <Lottie animationData={check} loop={false} className="size-[300px]" />
      <p className="text-brand-rose-500 font-semibold text-lg">Your order has been submitted successfully!</p>
      <div className="w-full">
        <button className="w-full bg-brand-red p-3 rounded-full text-white hover:bg-[#952c0c]"
          onClick={() => clearCart()}
        >
          Ok
        </button>
      </div>
    </div>
  )
}
