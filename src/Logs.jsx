import React from 'react'

export const Logs = (logs = []) => {

  return (
    <div className='Logs-container'>
      {logs.logs.map((msg, i) => <li key={i}>{msg}</li>)}
    </div>
  )
}
