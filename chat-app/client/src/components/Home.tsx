import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { MenuState } from "../utils/utils";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { Events } from "../events/events";

export interface IProps {
  setMenu: (menu: MenuState) => void;
  socket: Socket;
}

const Home: React.FC<IProps> = ({ setMenu, socket }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError(false);
  };

  const handleStartChat = () => {
    if (name.length > 0) {
      socket.emit(Events.SET_NAME, { name });
      setMenu(MenuState.CHAT);
    } else {
      setError(true);
    }
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap={4}
    >
      <Text>
        Enter your name and click "Start Chat" to begin chatting with others.
      </Text>
      <Input
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
        maxWidth={["100%", "50%"]}
      />
      <Text color="red.500">{error && "Please enter a name"}</Text>
      <Button
        onClick={
          name.length > 0
            ? handleStartChat
            : () => {
                setError(true);
              }
        }
      >
        Start Chat
      </Button>
    </Flex>
  );
};

export default Home;
