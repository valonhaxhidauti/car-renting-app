import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { useTranslations } from "next-intl";
import "dayjs/locale/de";
import "dayjs/locale/en-gb";

interface DatePickerProps {
  pickupDate: Dayjs | null;
  dropOffDate: Dayjs | null;
  handleDateChange: (
    field: "pickupDate" | "dropOffDate",
    date: Dayjs | null
  ) => void;
}

export default function DatePicker({
  pickupDate,
  dropOffDate,
  handleDateChange,
}: DatePickerProps) {
  const t = useTranslations("RentForm");

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={t("locale")}
    >
      <div className="w-full ">
        <MobileDateTimePicker
          className="w-full mt-2"
          value={pickupDate || null}
          minutesStep={30}
          disablePast
          onChange={(date) => handleDateChange("pickupDate", date)}
          slotProps={{
            textField: { placeholder: t("pickupDate"), variant: "standard" },
          }}
          sx={{
            ".MuiInputBase-root input": {
              padding: "8px",
              fontWeight: "300",
              cursor: "pointer",
            },
          }}
        />
      </div>
      <div className="w-full ">
        <MobileDateTimePicker
          className="w-full mt-2"
          value={dropOffDate || null}
          minutesStep={30}
          disablePast
          onChange={(date) => handleDateChange("dropOffDate", date)}
          slotProps={{
            textField: { placeholder: t("dropOffDate"), variant: "standard" },
          }}
          sx={{
            ".MuiInputBase-root input": {
              padding: "8px",
              fontWeight: "300",
              cursor: "pointer",
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
}
