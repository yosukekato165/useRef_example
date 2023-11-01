import React, { useRef, useState } from "react";

const useChatWithOutRef = () => {
  const [messagesList, setMessagesList] = useState(["tomato"]);

  const addMessage = async (newMessage) => {
    // わざとの遅延を追加
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // ここで直前のmessagesListの状態をキャプチャしてしまう
    const updatedMessages = [...messagesList, newMessage];
    setMessagesList(updatedMessages);
  };

  return { messagesList, addMessage };
};

const useChat = () => {
  const [messagesList, setMessagesList] = useState(["tomato"]);
  const messagesListRef = useRef(messagesList);

  const updateMessagesList = (newMessages) => {
    // 現在のメッセージをrefに保存
    messagesListRef.current = newMessages;
    // 状態を更新して再レンダリングをトリガー
    setMessagesList(newMessages);
  };

  const addMessage = async (newMessage) => {
    // わざと遅延を追加
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // refから現在のメッセージリストを取得し、新しいメッセージを追加
    const updatedMessages = [...messagesListRef.current, newMessage];
    // 更新されたメッセージリストをセット
    updateMessagesList(updatedMessages);
  };

  return { messagesList, addMessage };
};

const App = function () {
  const { messagesList, addMessage } = useChat();
  // const { messagesList, addMessage } = useChatWithOutRef();
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          addMessage(inputValue);
          // setInputValue("");
        }}
      >
        メッセージを追加
      </button>
      {messagesList.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </>
  );
};

export default App;
