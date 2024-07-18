'use client'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Calendar from './calendar'



const MainCalendar = () => {
  return (
    <DndProvider backend={HTML5Backend}>
    <Calendar />
  </DndProvider>
  )
}

export default MainCalendar