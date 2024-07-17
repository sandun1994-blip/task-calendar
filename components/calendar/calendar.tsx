"use client";
import React, { useCallback, useState } from "react";
import {
  Calendar,
  Event,
  momentLocalizer,
  View,
  Views,
} from "react-big-calendar";
import withDragAndDrop, {
} from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

// Extend the Event interface to include 'id'
interface CutomEvent extends Event {
  id: number;
}

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop<CutomEvent, {}>(Calendar);

const EventCalendar: React.FC = () => {
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState<Date>(new Date());

  const [events, setEvents] = useState<CutomEvent[]>([
    {
      id: 0,
      title: "All Day Event",
      allDay: true,
      start: new Date(2024, 6, 20),
      end: new Date(2024, 6, 21),
    },
    {
      id: 1,
      title: "Long Event",
      start: new Date(2024, 6, 25),
      end: new Date(2024, 6, 28),
    },
  ]);

  const onEventDrop = ({
    event,
    start,
    end,
  }: any) => {
    const updatedEvents = events.map((evt) =>
      evt.id === event.id
        ? { ...evt, start: new Date(start), end: new Date(end) }
        : evt
    );
    setEvents(updatedEvents);
  };

  const onSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("New Event name");
    if (title) {
      const newEvent: CutomEvent = {
        id: events.length,
        title,
        start,
        end,
      };
      setEvents([...events, newEvent]);
    }
  };

  const onEventResize = (data: any) => {
    const { start, end } = data;
    setEvents((state) =>
      state.map((d) =>
        d.id === data.event.id
          ? { ...d, start: new Date(start), end: new Date(end) }
          : d
      )
    );
  };

  const handleOnChangeView = (selectedView: View) => {
    console.log(selectedView);
    setView(selectedView);
  };

  const onNavigate = useCallback(
    (newDate: Date) => {
      setDate(newDate);
    },
    []
  );

  return (
    <DragAndDropCalendar
      localizer={localizer}
      events={events}
      startAccessor={(event: CutomEvent) => event.start as Date}
      endAccessor={(event: CutomEvent) => event.end as Date}
      onEventDrop={onEventDrop}
      onSelectSlot={onSelectSlot}
      selectable
      resizable
      draggableAccessor={() => true}
      style={{ height: "60vh", width: "70%" }}
      onEventResize={onEventResize}
      views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
      onView={handleOnChangeView}
      date={date}
      onNavigate={onNavigate}
      view={view}
      defaultView={Views.MONTH}
      showMultiDayTimes
    />
  );
};

export default EventCalendar;
