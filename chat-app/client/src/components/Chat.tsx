import { Button, Flex, IconButton, Image, Input, Text } from "@chakra-ui/react";
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
      type?: "join-leave" | "image" | "text";
    }[]
  >([]);
  const [fileBase64, setFileBase64] = useState("");
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
    if (message.length === 0 && fileBase64.length === 0) {
      return;
    }

    const now = new Date();
    const isoString = now.toISOString();

    if (fileBase64) {
      socket.emit(Events.SEND_MESSAGE, {
        message: fileBase64,
        date: isoString,
        room,
        type: "image",
      });
      setMessages((messages) => [
        ...messages,
        {
          from: "You",
          msg: fileBase64,
          date: isoString,
          socketId: socket.id,
          type: "image",
        },
      ]);
      setFileBase64("");
    } else {
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
    }
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
          type: data.type,
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
        {messages.map((message, index, arr) => {
          if (message.type === "join-leave") {
            return (
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
            );
          }
          if (message.type === "image") {
            return (
              <Flex
                key={message.socketId + message.type + message.date}
                flexDirection="column"
                alignItems={message.from === "You" ? "flex-end" : "flex-start"}
                ref={index === arr.length - 1 ? lastMessageRef : undefined}
                width="100%"
              >
                {
                  // Show the name of the user only if the previous message is from a different user even if first message is about join/leave
                  index === 0 ||
                  arr[index - 1].from !== message.from ||
                  arr[index - 1].type === "join-leave" ? (
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                      {message.from}
                    </Text>
                  ) : null
                }
                <Flex
                  flexDirection={message.from === "You" ? "row" : "row-reverse"}
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                >
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
                  <Flex
                    background={
                      message.from === "You"
                        ? "gray.100"
                        : "linear-gradient(90deg, #FEE140 0%, #FA709A 100%)"
                    }
                    borderRadius={
                      message.from === "You"
                        ? "10px 0 10px 10px"
                        : "0 10px 10px 10px"
                    }
                    padding={2}
                  >
                    <img
                      src={message.msg}
                      alt="img"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        borderRadius: "10px",
                      }}
                    />
                  </Flex>
                </Flex>
              </Flex>
            );
          }
          return (
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
          );
        })}

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
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        width="500px"
      >
        <Input
          placeholder="Type your message"
          variant="filled"
          width="100%"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={sendUserTyping}
          onBlur={sendUserStoppedTyping}
        />
        <label htmlFor="file-upload">
          <Button
            size="xs"
            variant="outline"
            as="span"
            cursor="pointer"
            height="10"
          >
            {
              // eslint-disable-next-line no-nested-ternary
              fileBase64
                ? "File selected"
                : fileBase64 === ""
                ? "Select file"
                : "Select file"
            }
          </Button>
        </label>
      </Flex>
      <Input
        type="file"
        id="file-upload"
        display="none"
        onChange={(
          e: React.ChangeEvent<HTMLInputElement> & {
            target: { files: FileList };
          }
        ) => {
          if (e.target.files[0].size > 1048576) {
            alert("File is too big!");
            return;
          }
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result;
            if (base64) {
              console.log("size", file.size);
              setFileBase64(base64.toString());
            }
          };
          if (file) {
            reader.readAsDataURL(file);
          }
        }}
      />
      <Button onClick={sendMessage}>Send message</Button>
    </Flex>
  );
};

export default Chat;
