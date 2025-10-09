import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import {TodoModalContext} from '../../components/ModalContext'
import Modal from '../../components/Modal'
import TodoContext from '../../components/TodoContext'
import AddTodoForm from '../../components/AddTodoForm'
import DateContext from '../../components/DateContext'

function Main() {
  const [showModal, setShowModal] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0] 
  })
  
  const [allTodos, setAllTodos] = React.useState(() => {
    const savedTodos = localStorage.getItem('allTodos')
    return savedTodos ? JSON.parse(savedTodos) : {}
  })

  React.useEffect(() => {
    localStorage.setItem('allTodos', JSON.stringify(allTodos))
  }, [allTodos])

  const currentDateTodos = allTodos[selectedDate] || []

  const setCurrentDateTodos = (newTodos) => {
    setAllTodos({
      ...allTodos,
      [selectedDate]: newTodos
    })
  }

  return (
    <TodoContext.Provider value={{data:currentDateTodos, setData: setCurrentDateTodos}}>
      <TodoModalContext.Provider value={{showModal, setShowModal}}>
        <DateContext.Provider value={{selectedDate, setSelectedDate}}>
          <div className='bg-gray-200 min-h-screen relative'>
            <div className='max-w-md w-full mx-auto relative'>
              <div className='p-2 bg-gray-100 min-h-[calc(theme(height.screen)-theme(height.12))] flex flex-col'>
                <Outlet />
              </div>
              <Navbar />
              {showModal && <AddTodoModal />}
            </div>
          </div>
        </DateContext.Provider>
      </TodoModalContext.Provider>
    </TodoContext.Provider>
  )
}

const AddTodoModal = ()=>{
  const modalCtx = React.useContext(TodoModalContext)
  const todoCtx = React.useContext(TodoContext)
  return(
    <Modal modalCtx={modalCtx} title="Add New Todo">
      <AddTodoForm todoCtx={todoCtx} onClose={()=>modalCtx.setShowModal(false)} />
    </Modal>
  )
}

export default Main