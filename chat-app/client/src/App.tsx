import { ChakraProvider } from "@chakra-ui/react";
import Chat from "./components/Chat";
import { useState } from "react";
import Home from "./components/Home";
import { MenuState } from "./utils/utils";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001/");

function App() {
  const [menu, setMenu] = useState(MenuState.HOME);

  return (
    <ChakraProvider>
      {menu === MenuState.HOME && <Home setMenu={setMenu} socket={socket} />}
      {menu === MenuState.CHAT && <Chat socket={socket} />}
    </ChakraProvider>
  );
}

export default App;
