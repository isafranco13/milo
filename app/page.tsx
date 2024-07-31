"use client";
import Image from 'next/image';
import EmptyState from './components/EmptyState';
import Historial from './components/Historial';
import { useState } from 'react';
import {streamReader} from "openai-edge-stream";

export default function Home() {
  const [messageText, setMessageText] = useState("");
  
  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log("MessageText: ", messageText);
    const response = await fetch("/api/chat/sendMessage", {
        method:'POST',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify({message: messageText}),
        
    });
    const data= response.body;
    //const data = await response.json();
    if(!data){
        return;
    }
    const reader= data.getReader();
    await streamReader(reader, (message) =>{
        console.log("Message AI:", message)
    });
}

  return (
    <>
    <main className="h-full">
      
      <div className="flex flex-row h-full">
      <div className="w-[30px]">
          <Historial /> 
      </div>
      <div className=" lg:pl-[200px] w-full flex flex-col h-full " >
        <div className="flex-1 overflow-y-auto">
            Body!</div>
            <div >{/*className="
        py-4
        px-4
        bg-gray-100
        flex
        items-center
        gap-2
        lg:gap-4
        w-full" */}
            <form onSubmit={handleSumbit}> {/* style del form*/}
                <fieldset className="flex gap-2">
                    <textarea 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Send a Message..." 
                    className="w-full resize-none rounded-md bg-white p-2 text-black border-none focus:outline-none"></textarea>
                    <button type="submit" className="rounded-full p-2 bg-[#2c4277] cursor-pointer hover:bg-[#23355e] transition w-[37px] h-[37px]">
                    <Image src="/enviar.png" alt="enviar" width={35} height={35} />
                    </button>
                </fieldset>
                
            </form>
        </div>
      </div>
      </div>
    </main>
    </>
  );
}
