"use client";
import { FormEvent,  useState } from "react";
import {useRouter} from "next/navigation"
export default function Home() {
  const [inputVal, setInputVal] = useState(""); 
  const { push } = useRouter();
  
  const handleSubmit = (event:FormEvent)=>{
    event.preventDefault();
    push(`/prediction/${inputVal}`);

  }
  return (
    
   <div className="min-h-screen bg-gray-200 flex flex-col items-center">
    <h1 className="text-4xl font-bold text-black mt-10 mb-8">
      Welcome To Prediction Zone! 😉
    </h1>
    <div className="p-6 shadow-lg bg-white rounded-lg max-w-md w-full">
      <h2 className="text-2xl font-semibold mb-6 text-black">
        Enter Your Name
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded text-black"
          placeholder="Type your name..."
        />
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  );
}
