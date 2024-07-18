"use server";

import { db } from "@/lib/db";
import { ReturnType } from "./type";

export async function deleteEvent(id: string): Promise<ReturnType> {
  if (!id) {
    return {
      error: "Can not find Event ID",
    };
  }

  let event;

  try {
    event = await db.event.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete.",
    };
  }


  return { data: event };
}
