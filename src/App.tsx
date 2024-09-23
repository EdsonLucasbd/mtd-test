import { useEffect, useState } from "react"
import type { MenuData } from "./types/menu";
import { ItemCard } from "./components/item-card";
import { Cart } from "./components/cart";
import { ItemSkeleton } from "./components/item-skeleton";

function App() {
  const [menuData, setMenuData] = useState<MenuData | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData: MenuData = await response.json();
        setMenuData(jsonData);
      } catch (error) {
        console.error('Error fetching the JSON data:', error);
      }
    };

    fetchData();
  }, [])

  return (
    <div className="w-full min-h-svh flex flex-col lg:flex-row p-8 lg:p-20 bg-brand-rose-50 gap-10">
      <div className="flex flex-col">
        <h1 className="font-bold text-5xl mb-10">Desserts</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {menuData ? menuData.map((item) => (
            <ItemCard
              key={item.name}
              name={item.name}
              category={item.category}
              price={item.price}
              image={item.image}
            />
          )) :
            (
              Array.from({ length: 9 }, (_, index) => (
                <ItemSkeleton key={index} />
              ))
            )}
        </div>
      </div>
      <Cart />
    </div>
  )
}

export default App
