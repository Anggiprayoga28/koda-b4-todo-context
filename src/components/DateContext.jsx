import React from 'react'

const DateContext = React.createContext({
  selectedDate: '',
  setSelectedDate: () => {}
})

export default DateContext