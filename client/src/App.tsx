/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export default function App() {
  const [message, setMessage] = useState(" ");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState<string | undefined>(" ");
  const [messages, setMessages] = useState<string[]>([]);

  const socket = useMemo(() => io("http://localhost:3000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected :: ", socket.id);
    });

    socket.on("Welcome", (data) => {
      console.log(data);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", { message, room });
  };

  return (
    <div className="bg-gray-500 w-screen h-screen flex justify-center items-center  ">
      <form
        className="w-1/4 h-2/4 bg-white rounded-xl p-5 "
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-lg">{socketId}</h1>
        <label className="text-3xl font-bold ml-28">Enter Message :</label>
        <input
          className="w-80 h-9 rounded-xl border border-black ml-10 mt-2 mb-2 p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <label className="text-3xl font-bold ml-28">Enter Room :</label>
        <input
          className="w-80 h-9 rounded-xl border border-black ml-10 mt-2 mb-2 p-2"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        ></input>
        <button
          type="submit"
          className="flex justify-center bg-blue-900 text-black rounded-xl p-2 text-lg hover:text-xl hover:text-white ml-40"
        >
          Send
        </button>
      </form>
      <div>
        {messages.map((m, i) => (
          <h1 key={i} className="p-2 text-2xl text-white font-bold">
            {m}
          </h1>
        ))}
      </div>
    </div>
  );
}
