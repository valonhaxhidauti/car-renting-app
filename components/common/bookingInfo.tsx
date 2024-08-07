import { RentLocIcon, ReturnLocIcon } from "@/assets/svgs";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import RentForm from "../general/rentForm";

export default function BookingInfo({
  border,
  label = "diffLocation",
}: {
  border: boolean;
  label?: string;
}) {
  const { params } = useCustomSearchParams();

  return (
    <div
      className={`bg-white p-4 flex flex-col gap-4 
    ${border ? "border-borderBooking border-2" : ""}`}
    >
      <div className="flex justify-beFtween text-lg text-grayFont font-bold">
        <RentForm isModal={true} id={label} />
      </div>
      {params.rentLocation &&
        params.returnLocation &&
        params.pickupDate &&
        params.dropOffDate && (
          <>
            <div className="flex gap-2 items-center">
              <RentLocIcon className="w-12 text-[#aaa]" />
              <div className="text-grayFont">
                <p className="text-sm leading-none">{params.pickupDate}</p>
                <p className="text-xs leading-none">{params.rentLocation}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <ReturnLocIcon className="w-12 text-[#aaa]" />
              <div className="text-grayFont">
                <p className="text-sm leading-none">{params.dropOffDate}</p>
                <p className="text-xs leading-none">{params.returnLocation}</p>
              </div>
            </div>
          </>
        )}
    </div>
  );
}
