import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { Events } from "../events/events";

interface IProps {
  socket: Socket;
}

const Chat: React.FC<IProps> = ({ socket }) => {
  const [messages, setMessages] = useState<
    {
      from: string;
      msg: string;
    }[]
  >([]);
  const [message, setMessage] = useState("");
  const [usersTyping, setUsersTyping] = useState<
    { socketId: string; name: string }[]
  >([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const sendUserTyping = () => {
    socket.emit(Events.USER_TYPING);
  };

  const sendUserStoppedTyping = () => {
    socket.emit(Events.USER_STOPPED_TYPING);
  };

  const sendMessage = () => {
    if (message.length === 0) {
      return;
    }
    socket.emit(Events.SEND_MESSAGE, message);
    setMessages((messages) => [
      ...messages,
      {
        from: "You",
        msg: message,
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
      <Text
        fontSize="4xl"
        fontWeight="bold"
        color="gray.700"
        textAlign="center"
      >
        Chat
      </Text>
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
        {messages.map((message, index, arr) => (
          <Flex
            key={index}
            flexDirection="column"
            alignItems={message.from === "You" ? "flex-end" : "flex-start"}
            ref={index === arr.length - 1 ? lastMessageRef : undefined}
          >
            {
              // Only show the name if this is the first message from this user
              // or if the previous message was from a different user
              (index === 0 || message.from !== arr[index - 1].from) && (
                <Text
                  fontSize="sm"
                  color="gray.500"
                  textAlign={message.from === "You" ? "end" : "start"}
                >
                  {message.from}
                </Text>
              )
            }
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
                message.from === "You" ? "50px 0 50px 50px" : "0 50px 50px 50px"
              }
              maxWidth="70%"
            >
              {message.msg}
            </Text>
          </Flex>
        ))}

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
