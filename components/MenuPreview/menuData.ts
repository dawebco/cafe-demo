export type Category = "Pizzas" | "Pita Bread" | "Coffee";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const MENU_CATEGORIES: Category[] = ["Pizzas", "Pita Bread", "Coffee"];

export const MENU_DATA: Record<Category, MenuItem[]> = {
  Pizzas: [
    {
      id: "p1",
      name: "Shrooms Pizza",
      description: "Wood-fired sourdough pizza topped with a variety of wild mushrooms.",
      price: 449,
      image: "/images/signature/pizza-main.png",
    },
    {
      id: "p2",
      name: "Ghee Roast Chicken Pizza",
      description: "Mangalorean style ghee roast chicken on a wood-fired sourdough base.",
      price: 549,
      image: "/images/signature/pizza-main.png",
    },
    {
      id: "p3",
      name: "Pepperoni",
      description: "Classic pepperoni on authentic wood-fired sourdough.",
      price: 599,
      image: "/images/signature/pizza-main.png",
    },
  ],
  "Pita Bread": [
    {
      id: "b1",
      name: "Hungarian Chicken",
      description: "Gourmet pita bread stuffed with flavorful Hungarian chicken.",
      price: 299,
      image: "/images/menu/burger.avif",
    },
    {
      id: "b2",
      name: "Mangalorean Ghee Roast",
      description: "Spicy and tangy Mangalorean ghee roast inside warm gourmet pita bread.",
      price: 329,
      image: "/images/menu/burger.avif",
    },
  ],
  Coffee: [
    {
      id: "c1",
      name: "Cold Frappe",
      description: "Refreshing cold frappe made with our signature specialty coffee.",
      price: 249,
      image: "/images/menu/coffe.png",
    },
    {
      id: "c2",
      name: "Vietnamese Hot Coffee",
      description: "Strong, authentic Vietnamese hot coffee with sweetened condensed milk.",
      price: 199,
      image: "/images/menu/coffe.png",
    },
    {
      id: "c3",
      name: "Cafe Au Lait",
      description: "Smooth espresso layered with gently steamed milk.",
      price: 229,
      image: "/images/menu/coffe.png",
    },
  ],
};
