"use server";

import {  GetReturnType } from "./type";
import { db } from "@/lib/db";

export async function getEvent(): Promise<GetReturnType> {

  let events;

  try {
    events = await db.event.findMany({select:{ id: true,
        title: true,
        start: true,
        end: true,
        startTime: true,
        endTime:true,
        eventCategory:true,
        location: true,
        description: true,
        roles:true
        }})
  } catch (error) {
    console.log(error);
    return {
      error: "Server Error",
    };
  }


  return { data: events };
}
