import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { Events } from "../events/events";
import { MenuState, RoomNames } from "../utils/utils";

interface IProps {
  socket: Socket;
  room: RoomNames;
  setMenu: (menu: MenuState) => void;
}

const Chat: React.FC<IProps> = ({ socket, room, setMenu }) => {
  const [messages, setMessages] = useState<
    {
      from: string;
      msg: string;
      date: string;
      socketId: string;
      type?: "join-leave" | "image";
    }[]
  >([]);
  const [message, setMessage] = useState("");
  const [usersTyping, setUsersTyping] = useState<
    { socketId: string; name: string }[]
  >([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const sendUserTyping = () => {
    socket.emit(Events.USER_TYPING, room);
  };

  const sendUserStoppedTyping = () => {
    socket.emit(Events.USER_STOPPED_TYPING, room);
  };

  const sendMessage = () => {
    if (message.length === 0) {
      return;
    }
    const now = new Date();
    const isoString = now.toISOString();

    socket.emit(Events.SEND_MESSAGE, {
      message,
      date: isoString,
      room,
    });
    setMessages((messages) => [
      ...messages,
      {
        from: "You",
        msg: message,
        date: isoString,
        socketId: socket.id,
      },
    ]);
    setMessage("");
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    socket.on(Events.RECEIVE_MESSAGE, (data) => {
      setMessages((messages) => [
        ...messages,
        {
          from: data.name,
          msg: data.message,
          date: data.date,
          socketId: data.socketId,
        },
      ]);
    });
    socket.on(Events.USER_JOINED, (data) => {
      setMessages((messages) => [
        ...messages,
        {
          from: data.name,
          msg: data.message,
          date: data.date,
          socketId: data.socketId,
          type: "join-leave",
        },
      ]);
    });
    socket.on(Events.USER_LEFT, (data) => {
      setMessages((messages) => [
        ...messages,
        {
          from: data.name,
          msg: data.message,
          date: data.date,
          socketId: data.socketId,
          type: "join-leave",
        },
      ]);
    });
    socket.on(Events.USER_TYPING, (data) => {
      setUsersTyping((usersTyping) => [
        ...usersTyping,
        { socketId: data.socketId, name: data.name },
      ]);
    });
    socket.on(Events.USER_STOPPED_TYPING, (data) => {
      setUsersTyping((usersTyping) =>
        usersTyping.filter((user) => user.socketId !== data.socketId)
      );
    });
    return () => {
      socket.off(Events.RECEIVE_MESSAGE);
      socket.off(Events.USER_TYPING);
      socket.off(Events.USER_STOPPED_TYPING);
      socket.off(Events.USER_JOINED);
      socket.off(Events.USER_LEFT);
    };
  }, []);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap={4}
    >
      <Flex
        flexDirection="row"
        alignItems="end"
        justifyContent="space-between"
        width="100%"
        maxWidth="500px"
      >
        <Button
          onClick={() => {
            socket.emit(Events.USER_LEFT, room);
            setMenu(MenuState.LOBBY);
          }}
          size="sm"
        >
          Leave
        </Button>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color="gray.700"
          textAlign="center"
          lineHeight={1}
        >
          Chat
        </Text>
        <Flex width="80px"></Flex>
      </Flex>
      <Flex
        flexDirection="column"
        height="400px"
        width="100%"
        maxWidth="500px"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        padding={4}
        overflow="auto"
        gap={1}
      >
        {messages.map((message, index, arr) =>
          message.type === "join-leave" ? (
            <Flex
              key={message.socketId + message.type + message.date}
              flexDirection="column"
              alignItems="center"
              ref={index === arr.length - 1 ? lastMessageRef : undefined}
            >
              <Text
                fontSize="sm"
                color="gray.500"
                textAlign="center"
                width="100%"
              >
                {message.msg}
              </Text>
            </Flex>
          ) : (
            <Flex
              key={message.socketId + message.type + message.date}
              flexDirection="column"
              alignItems={message.from === "You" ? "flex-end" : "flex-start"}
              ref={index === arr.length - 1 ? lastMessageRef : undefined}
            >
              {
                // Show the name of the user only if the previous message is from a different user even if first message is about join/leave
                index === 0 ||
                arr[index - 1].socketId !== message.socketId ||
                arr[index - 1].type === "join-leave" ? (
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    textAlign={message.from === "You" ? "end" : "start"}
                    width="100%"
                  >
                    {message.from}
                  </Text>
                ) : null
              }
              <Flex
                flexDirection={message.from === "You" ? "row-reverse" : "row"}
                alignItems="center"
                gap={2}
              >
                <Text
                  fontSize="md"
                  color="gray.700"
                  textAlign={message.from === "You" ? "end" : "start"}
                  background={
                    message.from === "You"
                      ? "gray.100"
                      : "linear-gradient(90deg, #FEE140 0%, #FA709A 100%)"
                  }
                  padding="0.5rem 1rem"
                  borderRadius={
                    message.from === "You"
                      ? "50px 0 50px 50px"
                      : "0 50px 50px 50px"
                  }
                >
                  {message.msg}
                </Text>
                <Text
                  fontSize="xx-small"
                  color="gray.500"
                  textAlign={message.from === "You" ? "end" : "start"}
                >
                  {new Date(message.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Flex>
            </Flex>
          )
        )}

        <Text
          fontSize="xx-small"
          color="gray.500"
          textAlign="end"
          fontStyle="italic"
          marginTop="auto"
        >
          {usersTyping.length > 0
            ? `${usersTyping.map((user) => user.name).join(", ")} ${
                usersTyping.length > 1 ? "are" : "is"
              } typing...`
            : ""}
        </Text>
      </Flex>
      <Input
        placeholder="Type your message"
        variant="filled"
        width="100%"
        maxWidth="500px"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={sendUserTyping}
        onBlur={sendUserStoppedTyping}
      />
      <Button onClick={sendMessage}>Send message</Button>
    </Flex>
  );
};

export default Chat;
