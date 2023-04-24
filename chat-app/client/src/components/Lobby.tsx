import React from "react";
import { MenuState, RoomNames } from "../utils/utils";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Socket } from "socket.io-client";
import { Events } from "../events/events";

interface IProps {
  room: RoomNames;
  setRoom: (room: RoomNames) => void;
  setMenu: (menu: MenuState) => void;
  socket: Socket;
}

const Lobby: React.FC<IProps> = ({ room, setRoom, setMenu, socket }) => {
  const handleJoinRoom = () => {
    socket.emit(Events.USER_JOINED, room);
    setMenu(MenuState.CHAT);
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap={4}
    >
      <Text fontSize="2xl" fontWeight="bold">
        Select a room to join 🚀
      </Text>
      <Flex
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        {Object.values(RoomNames).map((roomName) => (
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
            key={roomName}
            outline={
              roomName === room ? "2px solid #3182ce" : "2px solid #e2e8f0"
            }
            padding={4}
            borderRadius="md"
            cursor="pointer"
            onClick={() => setRoom(roomName)}
            width={["100%", "50%"]}
          >
            <Text fontSize="2xl" fontWeight="bold">
              {roomName.charAt(0).toUpperCase() + roomName.slice(1)}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Flex
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <Button onClick={() => setMenu(MenuState.HOME)}>Back</Button>
        <Button onClick={handleJoinRoom} colorScheme="blue">
          Join Chat
        </Button>
      </Flex>
    </Flex>
  );
};

export default Lobby;
