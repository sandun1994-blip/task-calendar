"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Event,
  momentLocalizer,
  View,
  Views,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import EventForm from "./event-form";
import { defaultEvent, EventSchemaType } from "@/schemas";
import { useGetEvents } from "@/services/quires";
import Overlay from "../over-lay";
import { useUpdateEvent } from "@/services/mutaions";
import { MultiSelect } from "../multi-select";
import { Options } from "@/data/data";
import { checkRoles } from "@/lib/utils";

// Extend the Event interface to include

interface EventDataType extends EventSchemaType {
  id?: string | number;
}

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop<Event, {}>(Calendar);

const EventCalendar: React.FC = () => {
  const handleReset = () => {};
  const { data } = useGetEvents();
  const { mutate: updateEvent, isPending: updateStatus } =
    useUpdateEvent(handleReset);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] =
    useState<EventDataType>(defaultEvent);
    const [roles,setSelectRoles] =useState<string[]>([])

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (data) {
      const eventData = data.map(
        ({ id, description, end, location, start, time, title, roles }) => ({
          id,
          title,
          allDay: true,
          start,
          end,
          data: {
            description,
            start,
            end,
            location,
            roles: roles.map((item) => item.role),
            time,
            title,
          },
        })
      );
      setEvents(eventData);
    }
  }, [data]);

  const onEventDrop = ({ event, start, end }: any) => {
    const isChange =
      JSON.stringify(start) === JSON.stringify(event.start) ||
      JSON.stringify(end) === JSON.stringify(event.end);

    if (!isChange && event.id) {
      // console.log(isChange,start,end);
      updateEvent({ data: { start, end }, id: event.id });
      const updatedEvents = events.map((evt) =>
        evt.id === event.id
          ? { ...evt, start: new Date(start), end: new Date(end) }
          : evt
      );
      setEvents(updatedEvents);
    }
  };

  const onSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    // const endDate = new Date(end);
    // endDate.setDate(endDate.getDate() - 1);
    setSelectedEvent((pre) => ({ ...pre, start, end }));
    setOpen((pre) => !pre);
  };

  const onEventResize = ({ event, start, end }: any) => {
    const isChange =
      JSON.stringify(start) === JSON.stringify(event.start) &&
      JSON.stringify(end) === JSON.stringify(event.end);
    // console.log("resize",isChange);
    if (!isChange && event.id) {
      updateEvent({ data: { start, end }, id: event.id });
      const updatedEvents = events.map((evt) =>
        evt.id === event.id
          ? { ...evt, start: new Date(start), end: new Date(end) }
          : evt
      );
      setEvents(updatedEvents);
    }
  };

  const handleOnChangeView = (selectedView: View) => {
    console.log("view");
    // console.log(selectedView);
    setView(selectedView);
  };

  const onNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);
  const onSelectEvent = ({ data, id }: Event) => {
    console.log("select");
    setOpen((pre) => !pre);
    setSelectedEvent({ ...data, id });
  };
  const handleClose = () => {
    console.log("close");
    setSelectedEvent(defaultEvent);
    setOpen((pre) => !pre);
  };

const filterEvents=useMemo(()=>{
  return events.filter(item=>(roles.length>0?checkRoles(item.data.roles,roles):true))
},[events, roles])


  return (
    <div className="container space-y-5 flex flex-col justify-center items-center">
      {open && (
        <EventForm
          open={open}
          setOpen={setOpen}
          selectedEvent={selectedEvent}
          handleClose={handleClose}
        />
      )}
      <div className=" w-full flex justify-center">
        <MultiSelect
          options={Options}
          onValueChange={setSelectRoles}
          defaultValue={roles}
          className="w-[350px] mr-24 "
          placeholder="Select Role"
        />
      </div>

      <DragAndDropCalendar
        localizer={localizer}
        events={filterEvents}
        startAccessor={(event: Event) => event.start as Date}
        endAccessor={(event: Event) => event.end as Date}
        onEventDrop={onEventDrop}
        onSelectSlot={onSelectSlot}
        selectable
        resizable
        draggableAccessor={() => true}
        style={{ height: "60vh", width: "70%" }}
        onEventResize={onEventResize}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        onView={handleOnChangeView}
        onSelectEvent={onSelectEvent}
        date={date}
        onNavigate={onNavigate}
        view={view}
        defaultView={Views.MONTH}
        showMultiDayTimes
      />
    </div>
  );
};

export default EventCalendar;
