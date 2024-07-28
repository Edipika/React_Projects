import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLenght] = useState(8);
  const [ischar, setIsChar] = useState(false);
  const [isnum, setIsnum] = useState(false);
  const [Password, setPassword] = useState();

  const genratePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMONOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (ischar) {
      str += "!@#$%^&*()?/"
    }
    if (isnum) {
      str += "1234567890"
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)

  }, [length, ischar, isnum, setPassword])

  useEffect(() => {
    genratePassword()
  }, [length, ischar, isnum, setPassword])

  const passref = useRef(null)
  const copyPassword = useCallback(() => {
    passref.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password])


  return (
    <>
      <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center bg-gray-500 text-white p-2 rounded">Password Generator</h1>
        <div className="flex items-center mb-4">
          <input type="text" className="flex-grow p-2 border rounded mr-2" value={Password} ref={passref} />
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={copyPassword}
          >Copy</button>
        </div>
        <div className="mb-4">
          <label htmlFor="length" className="block font-semibold mb-2">Length:{length}</label>
          <input type="range" className="w-full" min={8} max={15} value={length}
            onChange={(e) => (setLenght(e.target.value))} />
        </div>
        <div className="mb-4">
          <label htmlFor="character" className="inline-flex items-center">
            <input type="checkbox" className="mr-2" onChange={() => setIsChar(prev => !prev)}
            />
            Include Special Characters
          </label>
        </div>
        <div>
          <label htmlFor="number" className="inline-flex items-center">
            <input type="checkbox" id="number" className="mr-2" onChange={() => setIsnum(prev => !prev)} />
            Include Numbers
          </label>
        </div>
      </div>






    </>
  )
}

export default App
