

import React from 'react'
import { Outlet } from 'react-router-dom'

function mainLayout() {
  return (
    <>
      <header>header</header>
      <aside>aside</aside>
      <main><Outlet/></main>
      <footer>footer</footer>
    </>
  )
}

export default mainLayout
