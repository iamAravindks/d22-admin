import React from 'react'
import load from './loader.gif'
import '../App.css'
const Loader = () => {
  return (
    <img src={load} className="loader" loading="lazy" alt="loading"/>
  )
}

export default Loader