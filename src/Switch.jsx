import React from 'react'

export const Switch = ({ enabled = false, fanSpeed = '', name = 'Switch', isOn = false, handleOnOff = () => { } }) => {

  return (
    <div className='Switch-container' >
      <span className='name' data-label={name}>{name}</span>
      <label className="switch" data-name={name} data-enabled={enabled}>
        <input type="checkbox" checked={isOn} onChange={handleOnOff} />
        <span className="slider"></span>
      </label>
      <div>
        {fanSpeed}
      </div>
    </div>
  )
}
