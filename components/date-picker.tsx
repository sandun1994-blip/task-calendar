"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Prop ={
  date:Date | undefined
   setDate:React.Dispatch<React.SetStateAction<Date | undefined>>
   shape?:string
}


export function DatePicker({date, setDate,shape}:Prop) {
 


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
        size={'sm'}
          variant={"outline"}
          className={cn(
            "w-[170px] justify-start text-left font-normal ml-2",
            !date && "text-muted-foreground",!!shape && shape 
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0", )}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
