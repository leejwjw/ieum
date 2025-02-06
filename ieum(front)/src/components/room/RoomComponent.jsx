import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { getMsgs } from "../../api/roomApi";
import { useParams } from "react-router-dom";
import HeaderComponent from "../../components/common/HeaderComponent";
import FooterComponent from "../common/FooterComponent";
import ChatSideBarComponenet from "./ChatSideBarComponenet";
import { getCookie } from "../../util/cookieUtil";

const RoomComponent = () => {
  const { room_ID } = useParams();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null); // 마지막 메시지를 가리킬 ref

  useEffect(() => {
    const fetchMessages = async () => {
      const userInfo = getCookie("user");
      console.log("메롱" + userInfo);

      console.log(userInfo.accessToken);
      // const userName = userInfo?.username;
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

    let isRoomEntered = false;

    ws.onopen = () => {
      console.log("[open] 커넥션이 만들어졌습니다.");
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
        setMessages((prevMessages) => [...prevMessages, messageData]);
      } catch (error) {
        console.error("메시지오류:", error);
      }
    };

    ws.onclose = () => {
      console.log("[close] 커넥션 종료");
    };

    ws.onerror = (error) => {
      console.error("[error] 에러 발생", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  // 메시지가 추가될 때 자동으로 스크롤 맨 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          room_ID: room_ID,
          messageType: "TALK",
          username: userName,
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
      <main className="pt-[px] mb-[100px] max-w-screen-xl p-4 relative">
        <div className="flex flex-row justify-center bg-white w-full max-w-5xl mx-auto h-[40rem] mt-[120px]">
          <div className="flex-shrink-0 w-16 ">
            <ChatSideBarComponenet />
          </div>
          <div className="flex flex-col flex-grow w-full sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-lg ml-6 p-2 relative border-t border-gray-200 shadow-md overflow-hidden">
            {/* 메시지 창 */}
            <div
              className="flex flex-col flex-grow p-4 overflow-y-auto"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #f1f1f1" }}
            >
              <ul>
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    className={index === messages.length - 1 ? "mb-[50px]" : ""}
                  >
                    {msg.username === userName ? (
                      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                          <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          <span className="text-xs text-gray-500 leading-none">
                            {msg.reg_date}
                          </span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100">
                          <img
                            src="https://pagedone.io/asset/uploads/1710412177.png"
                            alt="User Avatar"
                            className="w-10 h-11"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full mt-2 space-x-3 max-w-xs">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100">
                          <img
                            src="https://pagedone.io/asset/uploads/1710412177.png"
                            alt="User Avatar"
                            className="w-10 h-11"
                          />
                        </div>
                        <div>
                          <div className="bg-gray-100 p-3 rounded-r-lg rounded-bl-lg">
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          <span className="text-xs text-gray-500 leading-none">
                            {msg.reg_date}
                          </span>
                        </div>
                      </div>
                    )}
                  </li>
                ))}

                <div ref={messagesEndRef} />
              </ul>
            </div>

            {/* 입력창 (하단 고정) */}
            <div className="absolute bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200 shadow-md flex items-center">
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
                className="flex-grow p-2 border border-gray-200 rounded-lg"
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Send
              </button>
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
