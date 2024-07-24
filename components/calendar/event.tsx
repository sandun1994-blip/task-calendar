import { cn } from "@/lib/utils";
import { EventCategory } from "@prisma/client";
import React from "react";

const EventComponent = (props: any) => {
  const event = props?.event?.data;

  return (
    <div
      className={cn(
        "p-2 space-y-2"
      )}
    >
      <h3>{event.title}</h3>
      <p className="text-gray-600 text-[10px] text-ellipsis">{event.description}</p>
    </div>
  );
};

export default EventComponent;
