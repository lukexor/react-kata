import React from 'react'
export default (props) => {

  const continueIn = () => {
    console.log("Continue pressed.")
  }

  return (
    <div style={{height: '90vw', backgroundColor: '#aaa'}}>
      <h1 style={{margin: 'auto 100px'}}>Welcome</h1>
      <button onClick={continueIn} >continue</button>
    </div>
  )
}