import { ChakraProvider } from "@chakra-ui/react";
import Chat from "./components/Chat";
import { useState } from "react";
import Home from "./components/Home";
import { MenuState, RoomNames } from "./utils/utils";
import { io } from "socket.io-client";
import Lobby from "./components/Lobby";

const socket = io("http://localhost:3001/");

function App() {
  const [menu, setMenu] = useState(MenuState.HOME);
  const [choosenRoom, setChoosenRoom] = useState<RoomNames>(RoomNames.VOYAGER);

  return (
    <ChakraProvider>
      {menu === MenuState.HOME && <Home setMenu={setMenu} socket={socket} />}
      {menu === MenuState.LOBBY && (
        <Lobby
          room={choosenRoom}
          setRoom={setChoosenRoom}
          setMenu={setMenu}
          socket={socket}
        />
      )}
      {menu === MenuState.CHAT && (
        <Chat socket={socket} room={choosenRoom} setMenu={setMenu} />
      )}
    </ChakraProvider>
  );
}

export default App;
