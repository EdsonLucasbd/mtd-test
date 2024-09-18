import { useEffect, useState } from "react"
import type { MenuData } from "./types/menu";
import { ItemCard } from "./components/ui/item-card";

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
    <div className="container flex flex-wrap">
      {menuData ? menuData.map((item) => (
        <ItemCard
          key={item.name}
          name={item.name}
          category={item.category}
          price={item.price}
          image={item.image}
        />
      )) : (<p>Loading...</p>)}
    </div>
  )
}

export default App
