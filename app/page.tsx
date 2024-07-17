
import MainCalendar from "@/components/calendar/calender-context";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main
      className="bg-white flex h-full flex-col items-center justify-start "
    >
      <div className="space-y-20 text-center p-10 w-full flex flex-col items-center ">
        <h1
          className={cn(
            "text-2xl md:text-5xl font-semibold text-blue-500 drop-shadow-md uppercase",
            font.className
          )}
        >
          Event Calendar
        </h1>
        <MainCalendar />
      </div>
    </main>
  );
}
