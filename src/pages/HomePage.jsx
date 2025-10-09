import moment from 'moment'
import React from 'react'
import TodoContext from '../components/TodoContext'
import TodoList from '../components/TodoList'
import DateContext from '../components/DateContext'

function HomePage() {
  const [selectedDay, setDay] = React.useState(moment().date().toString())
  const weeks = ["Mon", "Tue", "Wed","Thu", "Fri", "Sat", "Sun"]
  const todoCtx = React.useContext(TodoContext)
  const dateCtx = React.useContext(DateContext)

  const handleDayClick = (day, index) => {
    setDay(day)
    const selectedMoment = moment().day(index + 1)
    const dateString = selectedMoment.format('YYYY-MM-DD')
    dateCtx.setSelectedDate(dateString)
  }

  return (
    <>
      <div className='sticky top-0 px-10 py-5 flex flex-col gap-5'>
        <div>{moment().format("MMM DD, YYYY")}</div>
        <div className='text-3xl font-bold'>Today</div>
        <div className='flex'>
          {weeks.map((day, index) => {
            const getDay = moment().day(index+1).date().toString()
            return(
              <button onClick={()=>handleDayClick(getDay, index)} className='hover:cursor-pointer flex-1 flex flex-col items-center [&>*:first-child]:text-gray-500 [&>*:last-child]:font-bold'>
                <span className={selectedDay === getDay ? 'text-[theme(color.blue.500)!important] font-bold':''}>{day}</span>
                <span className={selectedDay === getDay ? 'text-[theme(color.blue.500)!important] font-bold':''}>{getDay}</span>
              </button>)
          })}
        </div>
      </div>
      {todoCtx.data.length === 0 && <div className='flex-1 flex justify-center items-center'>
        <span>No Activity!</span>
      </div>}
      {todoCtx.data.length > 0 && <TodoList />}
    </>
  )
}

export default HomePage