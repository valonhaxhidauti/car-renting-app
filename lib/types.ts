export type VehiclePrices = {
  vehicle: number;
  childSeat: number;
  navigation: number;
  driver: number;
  insurance: number;
};

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  surname: string;
  email: string;
  phone: string;
  phoneCode: string;
  password: string;
  passwordConfirm: string;
}

export interface ResetPasswordValues {
  password: string;
  passwordConfirm: string;
}

export interface UpdateFormValues {
  name: string;
  surname: string;
  email: string;
  phone: string;
  // phoneCode: string;
  // birthday: string;
  // password: string;
}

export interface Filters {
  gearType: any[];
  fuelType: any[];
  carClass: any[];
  carType: any[];
}

export interface CarAdData {
  id: string;
  attributes: {
    name: string;
    base_price_in_cents: string;
  };
  relationships: any;
}

export interface VehicleData {
  data: any[];
  links: any;
  meta: any;
}
