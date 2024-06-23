import { ChangeEvent } from "react";

interface PassportInfo {
  passportNumber: string;
  issuingCountry: string;
  dateOfIssue: string;
  dateOfExpiration: string;
  frontImage: File | null;
  backImage: File | null;
}

interface PassportInformationProps {
  passportInfo: PassportInfo;
  setPassportInfo: React.Dispatch<React.SetStateAction<PassportInfo>>;
}

const PassportInformation: React.FC<PassportInformationProps> = ({
  passportInfo,
  setPassportInfo,
}) => {
  const handlePassportInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassportInfo({ ...passportInfo, [e.target.name]: e.target.value });
  };

  const handlePassportImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPassportInfo({ ...passportInfo, frontImage: e.target.files[0] });
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      <h1 className="text-3xl text-grayFont font-bold">Passport Information</h1>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Passport Number
          </label>
          <input
            type="text"
            name="passportNumber"
            value={passportInfo.passportNumber}
            onChange={handlePassportInfoChange}
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
            value={passportInfo.issuingCountry}
            onChange={handlePassportInfoChange}
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
            value={passportInfo.dateOfIssue}
            onChange={handlePassportInfoChange}
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
            value={passportInfo.dateOfExpiration}
            onChange={handlePassportInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Front Image
          </label>
          <input
            type="file"
            name="passportFrontImage"
            onChange={handlePassportImageChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Back Image
          </label>
          <input
            type="file"
            name="passportBackImage"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                setPassportInfo({ ...passportInfo, backImage: e.target.files[0] });
              }
            }}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default PassportInformation;
