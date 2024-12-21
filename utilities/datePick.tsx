import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function DatePick({
  dueDate,
  setDueDate,
}: {
  dueDate: any;
  setDueDate: any;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dueDate}
        onChange={(newDate) => {
          console.log("==UpDated==\t", newDate.format("DD MMM YYYY"));
          setDueDate(newDate);
        }}
        format="DD MMM YYYY"
      />
    </LocalizationProvider>
  );
}
