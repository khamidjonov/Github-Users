import React, { useContext, useState } from 'react'
import GithubContext from '../../Context/Github/GithubContext'
import AlertContext from '../../Context/Alert/AlertContext'
import { searchUsers } from '../../Context/Github/GithubActions'

export default function UserSearch() {
  const [text, setText] = useState('')

  const {users, dispatch} = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)

  function handleChane(e) {
    setText(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert("Please enter something", "Error")
    } else {
      dispatch({type: "SET_LOADING"})
      const users = await searchUsers(text)
      dispatch({type: "GET_USERS", payload: users})

      setText('')
    }
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input type="text" className="w-full pr-40 input input-lg text-black" placeholder='Search...' value={text} onChange={handleChane} />
              <button type='submit' className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'>Search</button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button onClick={() => {dispatch({type: "CLEAR_USERS"})}} className="btn btn-ghost btn-lg">Clear</button>
        </div>)
      }
    </div>
  )
}
