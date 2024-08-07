import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
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
interface WorkingHours {
  start: string;
  end: string;
}

export default function DatePicker({
  pickupDate,
  dropOffDate,
  handleDateChange,
}: DatePickerProps) {
  const t = useTranslations("RentForm");
  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    start: "08:00",
    end: "19:00",
  });

  useEffect(() => {
    const fetchWorkingHours = async () => {
      try {
        const response = await fetch(
          "https://rent-api.rubik.dev/api/working-hours",
          {
            method: "GET",
            headers: {
              "Accept-Language": "en",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        const { start, end } = data.data.attributes;
        setWorkingHours({ start, end });
      } catch (error) {
        console.error("Error fetching working hours:", error);
      }
    };

    fetchWorkingHours();
  }, []);

  const minTime = dayjs()
    .startOf("day")
    .hour(parseInt(workingHours.start.split(":")[0], 10))
    .minute(parseInt(workingHours.start.split(":")[1], 10));
  const maxTime = dayjs()
    .startOf("day")
    .hour(parseInt(workingHours.end.split(":")[0], 10))
    .minute(parseInt(workingHours.end.split(":")[1], 10));
  const minDate = dayjs();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={t("locale")}
    >
      <div className="w-full">
        <MobileDateTimePicker
          className="w-full mt-2"
          value={pickupDate || null}
          minutesStep={30}
          minDate={minDate}
          minTime={minTime}
          maxTime={maxTime}
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
      <div className="w-full">
        <MobileDateTimePicker
          className="w-full mt-2"
          value={dropOffDate || null}
          minutesStep={30}
          minDate={minDate}
          minTime={minTime}
          maxTime={maxTime}
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
