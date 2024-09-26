import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from './ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import ConfirmedIcon from '@/../public/assets/images/icon-order-confirmed.svg?react'
import { useCartStore } from '@/store/cart-store'
import { ConfirmationItem } from './confirmation-item'
import { CompleteOrder } from './complete-order'
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
import { ScrollArea } from './ui/scroll-area'

type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;

export const ConfirmationDialog = ({ children }: { children: React.ReactNode }) => {
  const { products, total } = useCartStore()
  const [isComplete, setIsComplete] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")


  function handlePointerOutsideInteraction(event: PointerDownOutsideEvent) {
    if (isComplete) {
      event.preventDefault()
    } else return
  }

  function handleKeyboardOutsideInteraction(event: KeyboardEvent) {
    if (isComplete) {
      event.preventDefault()
    } else return
  }

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className='gap-10'
          onPointerDownOutside={(event) => handlePointerOutsideInteraction(event)}
          onEscapeKeyDown={(event) => handleKeyboardOutsideInteraction(event)}
        >
          {isComplete ? (
            <>
              <CompleteOrder />
            </>
          ) : (
            <>
              <DialogHeader>
                <ConfirmedIcon className='mb-4' />
                <DialogTitle className='font-bold text-5xl'>
                  Order Confirmed
                </DialogTitle>
                <DialogDescription className='font-semibold text-lg'>
                  We hoppe you enjoy your food!
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className='hidden lg:flex flex-col max-h-[300px] bg-brand-rose-50 rounded-lg'>
                <div className='divide-y'>
                  {products.map((product) => (
                    <ConfirmationItem key={product.name} {...product} />
                  ))}
                  <div className="flex items-center justify-between p-5">
                    <p className='font-semibold text-sm'>Order Total</p>
                    <p className='text-brand-rose-900 font-bold text-2xl'>${total.toFixed(2)}</p>
                  </div>
                </div>
              </ScrollArea>
              <div className='flex lg:hidden flex-col bg-brand-rose-50 rounded-lg divide-y'>
                {products.map((product) => (
                  <ConfirmationItem key={product.name} {...product} />
                ))}
                <div className="flex items-center justify-between p-5">
                  <p className='font-semibold text-sm'>Order Total</p>
                  <p className='text-brand-rose-900 font-bold text-2xl'>${total.toFixed(2)}</p>
                </div>
              </div>

              <DialogFooter>
                <button
                  type='submit'
                  className='w-full bg-brand-red p-3 rounded-full text-white hover:bg-[#952c0c]'
                  onClick={() => setIsComplete(true)}
                >
                  Start New Order
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className='gap-5 px-5'
        onPointerDownOutside={(event) => handlePointerOutsideInteraction(event)}
        onEscapeKeyDown={(event) => handleKeyboardOutsideInteraction(event)}
      >
        {isComplete ? (
          <>
            <CompleteOrder />
          </>
        ) : (
          <>
            <DrawerHeader className='p-0'>
              <ConfirmedIcon className='mb-4' />
              <DrawerTitle className='font-bold text-4xl text-start'>
                Order <br />Confirmed
              </DrawerTitle>
              <DrawerDescription className='font-semibold text-[.7813rem] text-start'>
                We hoppe you enjoy your food!
              </DrawerDescription>
            </DrawerHeader>
            <div className='flex flex-col bg-brand-rose-50 rounded-lg divide-y'>
              {products.map((product) => (
                <ConfirmationItem key={product.name} {...product} />
              ))}
              <div className="flex items-center justify-between p-5">
                <p className='font-semibold text-sm'>Order Total</p>
                <p className='text-brand-rose-900 font-bold text-2xl'>${total.toFixed(2)}</p>
              </div>
            </div>

            <DrawerFooter>
              <button
                type='submit'
                className='w-full bg-brand-red p-3 rounded-full text-white hover:bg-[#952c0c]'
                onClick={() => setIsComplete(true)}
              >
                Start New Order
              </button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
