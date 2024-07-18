import { getEvent } from "@/app/actions/get-events";
import { useQuery } from "@tanstack/react-query";

export function useGetEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const events = await getEvent();
        if (events.error) {
          throw new Error(events.error);
        }
        if (events.data) {
          return events.data;
        }
      } catch (error) {
        throw new Error("Failed to fetch events");
      }
    },
  });
}
