export type VehiclePrices = {
  vehicle: number;
  childSeat: number;
  navigation: number;
  driver: number;
  insurance: number;
};

export interface RegisterFormValues {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface UpdateFormValues {
  name: string;
  surname: string;
  email: string;
  phone: string;
  birthday: string;
  password: string;
}

export interface ResetPasswordValues {
  password: string;
  passwordConfirm: string;
}

export interface Filters {
  gearType: any[];
  fuelType: any[];
  carClass: any[];
  carType: any[];
}

export interface VehicleData {
  data: any[];
  links: any;
  meta: any;
}
