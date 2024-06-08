import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function CreditCardPayment() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) {
      document.body.style.setProperty("overflow-y", "auto", "important");
    } else {
      document.body.style.removeProperty("overflow-y");
    }
  }, [shown]);

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ] as const;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, index) => currentYear + index);

  function onSelectClicked() {
    setShown(!shown);
  }
  return (
    <>
      <h1 className="text-grayFont font-bold">Credit Card Information</h1>
      <form>
        <div className="flex flex-col mobile:flex-row flex-wrap items-start mobile:items-end justify-between gap-4">
          <div className="flex flex-col w-full mobile:w-auto">
            <label className="text-grayFont text-sm" htmlFor="cardOwner">
              Card Owner
            </label>
            <input
              type="text"
              id="cardOwner"
              name="cardOwner"
              className="w-full mobile:w-72 text-grayFont rounded-sm px-3 py-2 focus-visible:outline-primary border-gray border"
              required
            />
          </div>
          <div className="flex flex-col w-full mobile:w-auto">
            <label className="text-grayFont text-sm" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={16}
              id="cardNumber"
              name="cardNumber"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/, "");
              }}
              className="w-full mobile:w-72 text-grayFont rounded-sm px-3 py-2 focus-visible:outline-primary border-gray border"
              required
            />
          </div>
          <div className="flex gap-4 w-full mobile:w-auto">
            <div className="flex flex-col  w-3/4">
              <label className="text-grayFont text-sm">Expire Date</label>
              <div className="flex gap-2">
                <Select onOpenChange={onSelectClicked}>
                  <SelectTrigger className="w-full mobile:w-20 text-grayFont h-[42px] gap-3 rounded-sm px-4 py-2 focus-visible:outline-primary border-gray border">
                    <SelectValue />
                    <ChevronDown size={12} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Month</SelectLabel>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select onOpenChange={onSelectClicked}>
                  <SelectTrigger className="w-full mobile:w-24 text-grayFont h-[42px] gap-3 rounded-sm px-4 py-2 focus-visible:outline-primary border-gray border">
                    <SelectValue />
                    <ChevronDown size={12} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Year</SelectLabel>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-1/4 flex flex-col">
              <label className="text-grayFont text-sm" htmlFor="cvv">
                CVV
              </label>
              <input
                type="password"
                maxLength={3}
                id="cvv"
                name="cvv"
                className="w-full mobile:w-16 text-center text-grayFont rounded-sm px-3 py-2 focus-visible:outline-primary border-gray border"
                required
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 mobile:flex-row justify-between mt-12">
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="cursor-pointer"
              required
            />
            <label
              htmlFor="terms"
              className="text-sm text-grayFont ml-2 cursor-pointer"
            >
              I have read and agree to the Terms and Conditions
            </label>
          </div>
          <button
            className="bg-primary hover:bg-secondary transition text-white py-3 px-16  w-full mobile:w-40"
          >
            Pay
          </button>
        </div>
      </form>
    </>
  );
}
