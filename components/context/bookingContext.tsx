"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

interface BookingContextProps {
    childSeat: number;
    rack: number;
    navigation: number;
    insurance: string;
    insuranceId: number | null;
    insurancePrice: number | null;
    mileage: string;
    mileageId: number | null;
    mileagePrice: number | null;
    rentLocationId: string;
    returnLocationId: string;
    setChildSeat: React.Dispatch<React.SetStateAction<number>>;
    setRack: React.Dispatch<React.SetStateAction<number>>;
    setNavigation: React.Dispatch<React.SetStateAction<number>>;
    setInsurance: React.Dispatch<React.SetStateAction<string>>;
    setInsuranceId: React.Dispatch<React.SetStateAction<number | null>>;
    setInsurancePrice: React.Dispatch<React.SetStateAction<number | null>>;
    setMileage: React.Dispatch<React.SetStateAction<string>>;
    setMileageId: React.Dispatch<React.SetStateAction<number | null>>;
    setMileagePrice: React.Dispatch<React.SetStateAction<number | null>>;
    setRentLocationId: React.Dispatch<React.SetStateAction<string>>;
    setReturnLocationId: React.Dispatch<React.SetStateAction<string>>;
}

const BookingContext = createContext<BookingContextProps | undefined>(
    undefined
);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
    const [childSeat, setChildSeat] = useState(0);
    const [rack, setRack] = useState(0);
    const [navigation, setNavigation] = useState(0);
    const [insurance, setInsurance] = useState("");
    const [insuranceId, setInsuranceId] = useState<number | null>(null);
    const [insurancePrice, setInsurancePrice] = useState<number | null>(null);
    const [mileage, setMileage] = useState("");
    const [mileageId, setMileageId] = useState<number | null>(null);
    const [mileagePrice, setMileagePrice] = useState<number | null>(null);
    const [rentLocationId, setRentLocationId] = useState("");
    const [returnLocationId, setReturnLocationId] = useState("");

    useEffect(() => {
        const storedRentLocationId = sessionStorage.getItem("rentLocationId");
        const storedReturnLocationId = sessionStorage.getItem("returnLocationId");

        if (storedRentLocationId) setRentLocationId(storedRentLocationId);
        if (storedReturnLocationId) setReturnLocationId(storedReturnLocationId);
    }, []);

    const updateRentLocationId: React.Dispatch<React.SetStateAction<string>> = (
        value
    ) => {
        if (typeof value === "function") {
            setRentLocationId((prev) => {
                const newValue = (value as (prev: string) => string)(prev);
                sessionStorage.setItem("rentLocationId", newValue);
                return newValue;
            });
        } else {
            setRentLocationId(value);
            sessionStorage.setItem("rentLocationId", value);
        }
    };

    const updateReturnLocationId: React.Dispatch<React.SetStateAction<string>> = (
        value
    ) => {
        if (typeof value === "function") {
            setReturnLocationId((prev) => {
                const newValue = (value as (prev: string) => string)(prev);
                sessionStorage.setItem("returnLocationId", newValue);
                return newValue;
            });
        } else {
            setReturnLocationId(value);
            sessionStorage.setItem("returnLocationId", value);
        }
    };

    return (
        <BookingContext.Provider
            value={{
                childSeat,
                rack,
                navigation,
                insurance,
                insuranceId,
                insurancePrice,
                mileage,
                mileageId,
                mileagePrice,
                rentLocationId,
                returnLocationId,
                setChildSeat,
                setRack,
                setNavigation,
                setInsurance,
                setInsuranceId,
                setInsurancePrice,
                setMileage,
                setMileageId,
                setMileagePrice,
                setRentLocationId: updateRentLocationId,
                setReturnLocationId: updateReturnLocationId,
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
