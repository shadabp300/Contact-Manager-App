import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
 import Signup from './Signup/signup'
import Signin from './Signin/signin'
import Contacts from './Table/contact'
import Private from './private-component/private' 
import ImportCsv from './ImportCsv/ImportCsv'
import Delete from './Deleted/Delete'
import ImportSuccess from './ImportCsv/ImportSuccess'


const App = () => {
  return (
    <div>
      
      <BrowserRouter>
      <Routes> 
        <Route path='/' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>

        <Route element={<Private/>}>
        <Route path='/table' element={<Contacts/>}></Route>
        </Route>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
