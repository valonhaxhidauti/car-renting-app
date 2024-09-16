import { Dayjs } from "dayjs";

export type VehiclePrices = {
  vehicle: number;
  childSeat: number;
  carRack: number;
  navigation: number;
};

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  phoneCode: string;
  password: string;
  passwordConfirm: string;
};

export type ResetPasswordValues = {
  password: string;
  passwordConfirm: string;
};

export type UpdateFormValues = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  birthday: string;
};

export type UpdatePasswordValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type Filters = {
  gearType: any[];
  fuelType: any[];
  carClass: any[];
  carType: any[];
};

export type CarAdData = {
  id: string;
  attributes: {
    name: string;
    base_price_in_cents: number;
    final_base_price_in_cents: number;
  };
  relationships: any;
};

export type VehicleData = {
  data: any[];
  links: any;
  meta: any;
};

export type RentFormData = {
  rentLocation: string;
  returnLocation: string;
  pickupDate: Dayjs | null;
  dropOffDate: Dayjs | null;
};

export type Location = {
  id: string;
  attributes: {
    name: string;
    address?: string;
    number?: string;
    zip?: string;
    street?: string;
    city?: string;
    country?: string;
    updated_at?: string;
    created_at?: string;
  };
};

export type ItemType = {
  id: number;
  attributes: {
    name: string;
    base_price_in_cents: number;
    base_currency: string;
    description: string;
    updated_at: string;
    created_at: string;
  };
};

export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: string;
  dateOfBirth: string;
};

export type PassportInfo = {
  passportNumber: string;
  issuingCountry: string;
  dateOfIssue: string;
  dateOfExpiration: string;
  frontImage: File | null;
};

export type DriverLicenseInfo = {
  driverLicenseNumber: string;
  issuingCountry: string;
  dateOfIssue: string;
  dateOfExpiration: string;
  frontImage: File | null;
  backImage: File | null;
};

export type IdInfo = {
  idNumber: string;
  issuingCountry: string;
  dateOfIssue: string;
  dateOfExpiration: string;
  frontImage: File | null;
  backImage: File | null;
};

export type BillingInfo = {
  number: string;
  zip: string;
  street: string;
  city: string;
  country: string;
};
