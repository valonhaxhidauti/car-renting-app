import { IdInfo } from "@/lib/types";
import { ChangeEvent } from "react";

interface IdInformationProps {
  idInfo: IdInfo;
  setIdInfo: React.Dispatch<React.SetStateAction<IdInfo>>;
}

export default function IdInformation({
  idInfo,
  setIdInfo,
}: IdInformationProps) {
  const handleIdInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdInfo({ ...idInfo, [e.target.name]: e.target.value });
  };

  const handleIdImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setIdInfo({ ...idInfo, [name]: e.target.files[0] });
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      <h1 className="text-3xl text-grayFont font-bold">ID Information</h1>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            ID Number
          </label>
          <input
            type="text"
            name="idNumber"
            value={idInfo.idNumber}
            onChange={handleIdInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Issuing Country
          </label>
          <input
            type="text"
            name="issuingCountry"
            value={idInfo.issuingCountry}
            onChange={handleIdInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Date of Issue
          </label>
          <input
            type="date"
            name="dateOfIssue"
            value={idInfo.dateOfIssue}
            onChange={handleIdInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Date of Expiration
          </label>
          <input
            type="date"
            name="dateOfExpiration"
            value={idInfo.dateOfExpiration}
            onChange={handleIdInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Front Image
          </label>
          <input
            type="file"
            name="frontImage"
            onChange={handleIdImageChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-3.5 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Back Image
          </label>
          <input
            type="file"
            name="backImage"
            onChange={handleIdImageChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-3.5 text-grayFont focus-visible:outline-primary"
          />
        </div>
      </div>
    </div>
  );
}
