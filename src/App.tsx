import './App.css'

import {  MUSDProvider } from '@hansekontor/wallet-sdk';

import Test from './components/Test';

function App() {

  return (
    <>
      <MUSDProvider>
        <div className="card">
          <Test />
        </div>     
      </MUSDProvider>
    </>
  )
}

export default App
