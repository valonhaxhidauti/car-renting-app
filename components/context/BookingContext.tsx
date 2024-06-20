"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface BookingContextProps {
  childSeat: number;
  rack: number;
  navigation: number;
  insurance: string;
  insurancePrice: number;
  mileage: string;
  mileagePrice: number;
  setChildSeat: React.Dispatch<React.SetStateAction<number>>;
  setRack: React.Dispatch<React.SetStateAction<number>>;
  setNavigation: React.Dispatch<React.SetStateAction<number>>;
  setInsurance: React.Dispatch<React.SetStateAction<string>>;
  setInsurancePrice: React.Dispatch<React.SetStateAction<number>>;
  setMileage: React.Dispatch<React.SetStateAction<string>>;
  setMileagePrice: React.Dispatch<React.SetStateAction<number>>;
}

const BookingContext = createContext<BookingContextProps | undefined>(
  undefined
);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [childSeat, setChildSeat] = useState(0);
  const [rack, setRack] = useState(0);
  const [navigation, setNavigation] = useState(0);
  const [insurance, setInsurance] = useState("");
  const [insurancePrice, setInsurancePrice] = useState(0);
  const [mileage, setMileage] = useState("");
  const [mileagePrice, setMileagePrice] = useState(0);

  return (
    <BookingContext.Provider
      value={{
        childSeat,
        rack,
        navigation,
        insurance,
        insurancePrice,
        mileage,
        mileagePrice,
        setChildSeat,
        setRack,
        setNavigation,
        setInsurance,
        setInsurancePrice,
        setMileage,
        setMileagePrice,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
