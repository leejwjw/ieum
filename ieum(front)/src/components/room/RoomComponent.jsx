import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { getMsgs } from "../../api/roomApi";
import { useParams } from "react-router-dom";
import HeaderComponent from "../../components/common/HeaderComponent";
import FooterComponent from "../common/FooterComponent";
import ChatSideBarComponenet from "./ChatSideBarComponenet";
const RoomComponent = () => {
  const { room_ID } = useParams(); // URL에서 room_ID 가져오기
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  //  console.log(isMe);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMsgs(room_ID);
        setMessages(data);
      } catch (error) {
        console.error("메시지 불러오기 실패:", error);
      }
    };
    fetchMessages();

    const wsUrl =
      window.location.hostname === "localhost"
        ? "ws://localhost:8080/ws/chat"
        : `ws://${window.location.hostname}:8080/ws/chat`;

    const ws = new WebSocket(wsUrl);

    let isRoomEntered = false; //한번 room id가 보내졌나 체킹

    ws.onopen = () => {
      console.log("[open] 커넥션이 만들어졌습니다.");
      console.log("roomID&&&&&&&&&&&&&&&" + room_ID);

      if (!isRoomEntered) {
        ws.send(
          JSON.stringify({
            room_ID: room_ID,
            messageType: "ENTER",
            username: "DDD",
            content:
              (window.location.hostname === "localhost" ? "나" : "상대") +
              " 입장",
            reg_date: new Date().toISOString().replace("T", " ").split(".")[0],
          })
        );
        isRoomEntered = true;
      }
    };
    ws.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        console.log("**message** 서버로부터 받은 데이터: ", messageData);

        setMessages((prevMessages) => [...prevMessages, messageData]);
      } catch (error) {
        console.log(event.data);
        console.error("메시지오류:", error);
      }
    };

    ws.onclose = (event) => {
      console.log(event);
      if (event.wasClean) {
        console.log(
          `[close] 커넥션 종료 (code=${event.code}, reason=${event.reason})`
        );
      } else {
        console.log("[close] 커넥션이 죽었습니다.");
      }
    };

    ws.onerror = (error) => {
      console.error("[error] 에러 발생", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("SEND--------");
      socket.send(
        JSON.stringify({
          room_ID: room_ID,
          messageType: "TALK",
          username: window.location.hostname === "localhost" ? "나" : "상대",
          content: inputMessage,
          reg_date: new Date().toISOString().replace("T", " ").split(".")[0],
        })
      );
      setInputMessage("");
    } else {
      console.error("WebSocket 닫혀있음");
    }
  };

  return (
    <>
      <HeaderComponent />
      <main className="pt-[62px] mb-[100px] max-w-screen-xl p-4">
        <div className="flex flex-row justify-between bg-white">
          <ChatSideBarComponenet />
          <div>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>
                  <div>
                    Room ID: {msg.room_ID} -- username: {msg.username}
                    -- Message: {msg.content} -- reg_date :{msg.reg_date}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col flex-grow w-full max-w-3xl rounded-lg ml-6 p-2">
            <div className="flex flex-col flex-grow h-0 p-4">
              {/* //상대 */}
              <div className="flex w-full mt-2 space-x-3 max-w-xs">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100">
                  <img
                    src="https://pagedone.io/asset/uploads/1710412177.png"
                    alt="Shanay image"
                    className="w-10 h-11"
                  />
                </div>
                <div>
                  <div className="bg-gray-100 p-3 rounded-r-lg rounded-bl-lg">
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 leading-none">
                    2 min ago
                  </span>
                </div>
              </div>

              <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div>
                  <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod.
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 leading-none">
                    2 min ago
                  </span>
                </div>
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100">
                  <img
                    src="https://pagedone.io/asset/uploads/1710412177.png"
                    alt="Shanay image"
                    className="w-10 h-11"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Component End  --> */}

          <div>
            <div>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="메시지를 입력하세요"
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </main>
      <FooterComponent />
    </>
  );
};

RoomComponent.propTypes = {
  room_ID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
export default RoomComponent;
