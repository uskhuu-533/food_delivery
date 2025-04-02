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
import { useOrder } from "@/provider/OrderProvider";

export function DatePicker() {
  const {setDate, date} = useOrder()
  
  // Add default values to ensure date.from and date.to are always valid Date objects
  const safeDate = {
    from: date?.from instanceof Date && !isNaN(date.from.getTime()) 
          ? date.from 
          : addDays(new Date(), -10),
    to: date?.to instanceof Date && !isNaN(date.to.getTime()) 
        ? date.to 
        : addDays(new Date(), 0)
  };
  
  const handleFromDateChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = new Date(e.target.value);
    setDate({
      ...date,
      from: newFromDate,
      to: newFromDate > safeDate.to ? addDays(newFromDate, 1) : safeDate.to
    });
  };

  const handleToDateChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = new Date(e.target.value);
    setDate({
      ...date,
      to: newToDate
    });
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
            {safeDate.from ? (
              safeDate.to ? (
                <>
                  {format(safeDate.from, "LLL dd, y")} -{" "}
                  {format(safeDate.to, "LLL dd, y")}
                </>
              ) : (
                format(safeDate.from, "LLL dd, y")
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
                className="rounded-md border border-gray-300 p-2 bg-white" 
                value={format(safeDate.from, "yyyy-MM-dd")}
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
                className="rounded-md border border-gray-300 p-2 bg-white" 
                value={format(safeDate.to, "yyyy-MM-dd")}
                onChange={handleToDateChange}
                min={format(safeDate.from, "yyyy-MM-dd")}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}