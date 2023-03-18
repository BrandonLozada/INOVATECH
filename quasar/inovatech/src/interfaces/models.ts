// import { withDefaults } from 'vue';
// TODO: Estos modelos son similares como en las WEB_API de ASP.NET Core de C++, aquí se crea su estructura.
export interface UserProps {
  user_id: string; // uuid
  email: string;
  username: string;
  password: string;
}

export interface ProfileProps {
  first_name: string;
  first_surname: string;
  second_surname?: string;
  birthdate: string; // Poner un tipo date o solo guardar así tal cual string
  phone_number: string;
  second_phone_number?: string;
  second_email?: string;
}

export interface UserBillingAddressesProps {
  BillingAdresses: BillingInformationProps[];
}
export interface BillingAddressProps {
  street_address: string;
  street_number: string;
  apartment_number: string;
  postal_code: string;
  suburb: string;
  city: string;
  state: string;
  country: string;
  phone_number?: string;
}
withDefaults(defineProps<BillingAddressProps>(), {
  street_number: 'S/N',
  apartment_number: 'S/N',
});

export interface BillingInformationProps {
  full_legal_name: string;
  RFC: string;
  CURP: string;
  email: string;
}

export interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string; // color: string [] // color: array<string>;
  size: string; // [ "XS", "S", "M", "L", "XL", "Unitalla" ] // Normalmente es L
// size: string [] // size: array<string>;
  gender: string; // [ "Hombre", "Mujer", "Sin género" ] o [ "Masculino", "Femenino", "Sin género" ]
  stock: number;
  category: number;
  details: ProductDetailsProps;
  images: ProductDetailsProps[];
}

export interface ProductDetailsProps {
  material: string; // "cotton"
  fit: string; // ["regular", "straight", "fit" ]
  maintenance: string; // "machine wash cold, air dry",
  additional?: string; // " "
}

export interface ProductImagesProps {
  id: number;
  image: string;
  // Etc
}

export interface Todo {
  id: number;
  content: string;
}
export interface Meta {
  totalCount: number;
}
