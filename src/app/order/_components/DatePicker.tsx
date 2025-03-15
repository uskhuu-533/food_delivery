"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
type Props = { 
  setDate : (date: DateType)=> void
  date : DateType
  getOrders() : Promise<void>
}
type DateType ={
  to : Date
  from : Date
}
export function DatePicker({setDate, date, getOrders}:Props) {
  
  
  const handleFromDateChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = new Date(e.target.value);
    setDate({
      ...date,
      from: newFromDate,
      to: newFromDate > date.to ? addDays(newFromDate, 1) : date.to
    });
  };

  const handleToDateChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = new Date(e.target.value);
    setDate({
      ...date,
      to: newToDate
    });
  };

  const handleSubmit = () => {
    console.log("Selected date range:", {
      from: format(date.from, "yyyy-MM-dd"),
      to: format(date.to, "yyyy-MM-dd")
    });
    getOrders()
  };

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={`w-full max-w-sm justify-start text-left font-normal rounded-full`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4">
          <div className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="from-date" className="text-sm font-medium">
                Start Date
              </label>
              <input 
                id="from-date"
                type="date" 
                className="rounded-md border border-gray-300 p-2" 
                value={format(date.from, "yyyy-MM-dd")}
                onChange={handleFromDateChange}
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="to-date" className="text-sm font-medium">
                End Date
              </label>
              <input 
                id="to-date"
                type="date" 
                className="rounded-md border border-gray-300 p-2" 
                value={format(date.to, "yyyy-MM-dd")}
                onChange={handleToDateChange}
                min={format(date.from, "yyyy-MM-dd")}
              />
            </div>
            
            <Button className="w-full" onClick={handleSubmit}>
              Apply Range
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}