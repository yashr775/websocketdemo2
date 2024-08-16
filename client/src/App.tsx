/* eslint-disable @typescript-eslint/no-unused-vars */
import { io } from "socket.io-client";

export default function App() {
  const socket = io("http://localhost:3000");

  return (
    <div className="bg-gray-500 w-screen h-screen flex justify-center items-center  ">
      <form className="w-1/4 h-1/4 bg-white rounded-xl p-5 ">
        <label className="text-3xl font-bold ml-28">Enter Message :</label>
        <input className="w-80 h-9 rounded-xl border border-black ml-10 mt-2 mb-2 p-2"></input>
        <button className="flex justify-center bg-blue-900 text-black rounded-xl p-2 text-lg hover:text-xl hover:text-white ml-40">
          Send
        </button>
      </form>
    </div>
  );
}
