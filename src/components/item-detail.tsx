import { useMediaQuery } from "@/hooks/use-media-query"
import type { MenuItem } from "@/types/menu"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "./ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from "./ui/drawer"

type ItemDetail = Omit<MenuItem, "category" | "price">
interface ItemDetailProps extends ItemDetail {
  children: React.ReactNode
}

export const ItemDetail = ({ name, image, children }: ItemDetailProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const details = [
    {
      name: "Waffle with Berries",
      description: "A crispy waffle topped with a medley of fresh berries and a dusting of powdered sugar."
    },
    {
      name: "Vanilla Bean Crème Brûlée",
      description: "A creamy vanilla custard with a caramelized sugar top that cracks with every spoonful."
    },
    {
      name: "Macaron Mix of Five",
      description: "A delightful assortment of five colorful macarons, each with a unique flavor filling."
    },
    {
      name: "Classic Tiramisu",
      description: "Layers of espresso-soaked ladyfingers, mascarpone cream, and cocoa powder."
    },
    {
      name: "Pistachio Baklava",
      description: "Crispy phyllo dough layered with pistachios and drizzled with sweet honey syrup."
    },
    {
      name: "Lemon Meringue Pie",
      description: "A zesty lemon curd filling topped with a light, fluffy meringue, perfectly golden."
    },
    {
      name: "Red Velvet Cake",
      description: "A rich and moist red velvet cake with a smooth cream cheese frosting."
    },
    {
      name: "Salted Caramel Brownie",
      description: "A decadent brownie swirled with salted caramel, offering a perfect balance of sweet and salty."
    },
    {
      name: "Vanilla Panna Cotta",
      description: "A silky smooth vanilla panna cotta served with a drizzle of berry coulis."
    }
  ];

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild className="cursor-pointer">
          {children}
        </DialogTrigger>
        <DialogContent>
          <img src={isDesktop ? image.desktop : image.mobile} alt={`${name} image`} className="w-full h-auto rounded-md shadow-sm" />
          <DialogFooter>
            <div className="flex flex-col gap-4">
              <h4 className="text-2xl font-bold text-brand-rose-900">{name}</h4>
              <p className="text-lg font-semibold text-brand-rose-500">{details.find((detail) => detail.name === name)?.description}</p>

              <DialogClose asChild>
                <button type="submit" className="w-full bg-brand-red p-3 rounded-full text-white hover:bg-[#952c0c]">Ok</button>
              </DialogClose>

            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild className="cursor-pointer">
        {children}
      </DrawerTrigger>
      <DrawerContent className="px-5">
        <img src={isDesktop ? image.desktop : image.mobile} alt={`${name} image`} className="w-full h-auto rounded-md shadow-sm" />
        <DrawerFooter>
          <div className="flex flex-col gap-4">
            <h4 className="text-2xl font-bold text-brand-rose-900">{name}</h4>
            <p className="text-lg font-semibold text-brand-rose-500">{details.find((detail) => detail.name === name)?.description}</p>

            <DrawerClose asChild>
              <button type="submit" className="w-full bg-brand-red p-3 rounded-full text-white hover:bg-[#952c0c]">Ok</button>
            </DrawerClose>

          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
