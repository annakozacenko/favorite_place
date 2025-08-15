import { TDish } from "../store/slices/dishesSlice";
import { TPlace } from "../store/slices/placesSlice";

//? не знаю куда положить эту функцию и вообще нормальная ли такая генерация айди
export function generateNumericId(length = 8) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const placesMocks: TPlace[] = [
  {
    id: 1,
    name: "Chang",
    location: "Naberezh",
    visits: 5,
    category: "итальянская",
    rating: 4.5,
    notes: "notes",
  },
  {
    id: 2,
    name: "Pastabar",
    location: "Naberezh",
    visits: 4,
    category: "французская",
    rating: 4.2,
    notes: "notes",
  },
  {
    id: 3,
    name: "Шаверма",
    location: "Naberezh",
    visits: 3,
    category: "японская",
    rating: 4.7,
    notes: "notes",
  },
  {
    id: 4,
    name: "Phali",
    location: "Naberezh",
    visits: 2,
    category: "итальянская",
    rating: 4.4,
    notes: "notes",
  },
  {
    id: 5,
    name: "Теремок",
    location: "Naberezh",
    visits: 1,
    category: "французская",
    rating: 4.3,
    notes: "notes",
  },
];

export const dishesMocks: TDish[] = [
  { id: 1, name: "Margherita Pizza", placeId: 1, rating: 4.5, notes: "notes" },
  { id: 2, name: "Carbonara", placeId: 1, rating: 4.2, notes: "notes" },
  { id: 3, name: "Dragon Roll", placeId: 2, rating: 4.7, notes: "notes" },
  { id: 4, name: "Miso Soup", placeId: 2, rating: 4.4, notes: "notes" },
  { id: 5, name: "Coq au Vin", placeId: 3, rating: 4.3, notes: "notes" }
];

export enum TCategories { 
  "итальянская",
  "французская",
  "японская",
  "китайская",
  "мексиканская",
  "восточная",
  "азиатская",
  "индийская",
  "другая",
}

export const  categoriesMocks = Object.values(TCategories);