interface Image {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface MenuItem {
  image: Image;
  name: string;
  category: string;
  price: number;
}

export type MenuData = MenuItem[];
