import type { MenuItem } from "@/types/menu"
import { useEffect, useState } from "react"

export const ItemCard = ({ name, category, price, image }: MenuItem) => {
  const [imgURL, setImgURL] = useState('')

  useEffect(() => {
    if (window.innerWidth < 768) {
      setImgURL(image.mobile)
    } else if (window.innerWidth < 1024) {
      setImgURL(image.tablet)
    } else {
      setImgURL(image.desktop)
    }
  }, [image.desktop, image.mobile, image.tablet])

  return (
    <div className='flex flex-col w-1/3 h-fit'>
      <img src={imgURL} alt={`${name} image`} className="w-[350px] h-[320px] rounded-md" />
      <div className="flex flex-col">
        <p className="text-brand-rose-400">{category}</p>
        <h3 className="text-xl font-bold text-brand-rose-900">{name}</h3>
        <p className="text-brand-red font-semibold text-lg">${price.toFixed(2)}</p>
      </div>
    </div>
  )
}
