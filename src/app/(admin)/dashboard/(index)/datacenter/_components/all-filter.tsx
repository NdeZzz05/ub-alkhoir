"use client";

import * as React from "react";
import { format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DownloadReport from "../../_components/download-report";
import { ChartInfoInteractive } from "../../_components/chart-info-interactive";
import { CardsInfoReport } from "../../_components/cards-info-report";

export default function FilterDate({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  return (
    <>
      <div className="flex gap-4 px-6 justify-end">
        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button id="date" variant="outline" className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pilih Tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} fromDate={new Date(2025, 3, 1)} toDate={new Date()} />
            </PopoverContent>
          </Popover>
        </div>
        <DownloadReport date={date} />
      </div>
      <CardsInfoReport date={date} />
      <div className="px-4 lg:px-6">
        <ChartInfoInteractive date={date} />
      </div>
    </>
  );
}
