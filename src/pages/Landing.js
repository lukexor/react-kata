import React from 'react'
import { useHistory } from 'react-router'

export default (props) => {

  const history = useHistory()

  const continueIn = () => {
    history.push('/')
  }

  return (
    <div style={{height: '90vw', backgroundColor: '#aaa'}}>
      <h1 style={{margin: 'auto 100px'}}>Welcome</h1>
      <button onClick={continueIn} >continue</button>
    </div>
  )
}