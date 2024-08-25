import { useContext, useEffect, useRef, useState } from "react";
import useLocalStorage from "../../../../utils/useLocalStorage";
import { axiosInstance } from "../../../../common/func/axios";
import { AppContext } from "../../../../context/AppContext";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./OpenChat.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OpenChat() {
  const { detailInfo } = useContext(AppContext);
  const { isLoggedIn } = useLocalStorage();
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [participantCount, setParticipantCount] = useState(0);
  const [chatRoomMessages, setChatRoomMessages] = useState([]);

  const messagesEndRef = useRef(null);
  const currentSubscription = useRef(null);

  const navigate = useNavigate();

  // 입장 메시지 전송 함수
  const sendJoinMessage = (stompClientInstance) => {
    const messageTime = new Date();
    stompClientInstance.send(
      "/pub/messages",
      {},
      JSON.stringify({
        type: "JOIN",
        roomId: detailInfo.locationId,
        createdAt: messageTime.toISOString(),
      })
    );
  };

  // 퇴장 메시지 전송 함수
  const sendLeaveMessage = (stompClientInstance) => {
    if (stompClientInstance) {
      const messageTime = new Date();
      stompClientInstance.send(
        "/pub/messages",
        {},
        JSON.stringify({
          type: "LEAVE",
          roomId: detailInfo.locationId,
          createdAt: messageTime.toISOString(),
        })
      );
    }
  };

  // 채팅 메시지 전송
  const sendMessage = () => {
    if (stompClient && stompClient.connected && message.trim() !== "") {
      const messageTime = new Date();
      stompClient.send(
        "/pub/messages",
        {},
        JSON.stringify({
          type: "CHAT",
          roomId: detailInfo.locationId,
          message: message,
          createdAt: messageTime.toISOString(),
        })
      );
      setMessage("");
    } else if (!stompClient || !stompClient.connected) {
      console.error("WebSocket 연결이 설정되지 않았습니다.");
    }
  };

  useEffect(() => {
    // 사용자 이름 조회 API 호출
    const fetchUsername = async () => {
      try {
        const response = await axiosInstance.get("/api/users/name");
        setUsername(response.data.username);
      } catch (error) {
        console.error("Failed to fetch username:", error);
      }
    };

    // 채팅방 메시지 조회
    const fetchChatRoomMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_TOUR_WS}/api/chat/${detailInfo.locationId}`,
          { withCredentials: true }
        );
        const data = response.data;
        if (Array.isArray(data)) {
          setChatRoomMessages(data);
        }
        console.log(chatRoomMessages);
      } catch (error) {}
    };

    fetchUsername();
    fetchChatRoomMessages();
  }, []);

  // 채팅방 입장
  useEffect(() => {
    if (detailInfo.locationId && isLoggedIn) {
      const socket = new SockJS(`${process.env.REACT_APP_TOUR_WS}/ws`);
      const stompClientInstance = Stomp.over(socket);
      setStompClient(stompClientInstance);

      stompClientInstance.connect({}, () => {
        if (currentSubscription.current) {
          currentSubscription.current.unsubscribe();
        }

        const subscription = stompClientInstance.subscribe(
          `/sub/rooms/${detailInfo.locationId}`,
          (data) => {
            const newMessage = JSON.parse(data.body);
            const messageTime = new Date();
            const timestamp = messageTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            // 참여 인원 수 업데이트
            setParticipantCount(newMessage.participantCount);

            // 메시지 상태 업데이트 (JOIN과 LEAVE 타입 제외)
            if (newMessage.type !== "JOIN" && newMessage.type !== "LEAVE") {
              setMessages((prevMessages) => [
                ...prevMessages,
                { ...newMessage, timestamp },
              ]);
            }
          }
        );

        currentSubscription.current = subscription;

        // 입장 메시지를 전송하는 함수 호출
        sendJoinMessage(stompClientInstance);
      });

      // 페이지 새로고침 시 퇴장 메시지 전송
      const handleBeforeUnload = () => {
        sendLeaveMessage(stompClientInstance);
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        if (stompClientInstance) {
          // 퇴장 메시지 전송
          sendLeaveMessage(stompClientInstance);
          stompClientInstance.disconnect(() => {
            setMessages([]); // 메시지 상태 초기화
          });
        }
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [detailInfo.locationId, isLoggedIn]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat" style={isLoggedIn ? { height: "248px" } : { height: "fit-content" }}>
      <div className="header">
        Open Talk
        {isLoggedIn ? <span className="participantCount">({participantCount} people)</span> : null}
      </div>
      { isLoggedIn ? 
        <>
          <div className="chatCnt login">
            {/* 기존 message 불러온 chat */}
            {chatRoomMessages.map((item, index) => {
              const isSender = item.sender === username;
              const createdAtDate = new Date(
                Date.UTC(
                  item.createdAt[0],
                  item.createdAt[1] - 1,
                  item.createdAt[2],
                  item.createdAt[3],
                  item.createdAt[4],
                  item.createdAt[5],
                  Math.floor(item.createdAt[6] / 1000000)
                )
              );
              const timestamp = createdAtDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={index}
                  style={{ justifyContent: isSender ? "flex-end" : "flex-start" }}
                  className="message-wrapper"
                >
                  <div
                    className={`message-container ${
                      isSender ? "sender" : "receiver"
                    }`}
                  >
                    <div className={`message ${isSender ? "sender" : "receiver"}`}>
                      <div className="userCnt">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M8.0625 5.625C8.0625 6.03292 7.94154 6.43169 7.71491 6.77086C7.48828 7.11004 7.16616 7.3744 6.78929 7.5305C6.41241 7.68661 5.99771 7.72745 5.59763 7.64787C5.19754 7.56829 4.83004 7.37185 4.54159 7.08341C4.25315 6.79496 4.05671 6.42746 3.97713 6.02737C3.89755 5.62729 3.9384 5.21259 4.0945 4.83572C4.25061 4.45884 4.51496 4.13672 4.85414 3.91009C5.19332 3.68346 5.59208 3.5625 6 3.5625C6.54682 3.56312 7.07107 3.78062 7.45772 4.16728C7.84438 4.55394 8.06188 5.07818 8.0625 5.625ZM10.875 6C10.875 6.96418 10.5891 7.90671 10.0534 8.7084C9.51775 9.51009 8.75637 10.1349 7.86558 10.5039C6.97479 10.8729 5.99459 10.9694 5.04894 10.7813C4.10328 10.5932 3.23464 10.1289 2.55286 9.44715C1.87108 8.76536 1.40678 7.89672 1.21867 6.95107C1.03057 6.00541 1.12711 5.02521 1.49609 4.13442C1.86507 3.24363 2.48991 2.48226 3.2916 1.94659C4.09329 1.41091 5.03582 1.125 6 1.125C7.29251 1.12636 8.5317 1.64042 9.44564 2.55436C10.3596 3.46831 10.8736 4.70749 10.875 6ZM10.125 6C10.1244 5.44478 10.0118 4.89539 9.79404 4.38467C9.57624 3.87395 9.25768 3.4124 8.85741 3.02763C8.45714 2.64285 7.98339 2.34274 7.46448 2.14526C6.94557 1.94778 6.39216 1.85698 5.83735 1.87828C3.62953 1.96359 1.86891 3.8025 1.875 6.01172C1.87712 7.01743 2.24804 7.98744 2.9175 8.73797C3.19014 8.34254 3.53646 8.00338 3.9375 7.73906C3.97169 7.71648 4.01234 7.70572 4.05323 7.70843C4.09412 7.71114 4.13299 7.72717 4.16391 7.75406C4.67352 8.19485 5.3248 8.43743 5.9986 8.43743C6.67239 8.43743 7.32367 8.19485 7.83328 7.75406C7.8642 7.72717 7.90307 7.71114 7.94396 7.70843C7.98485 7.70572 8.0255 7.71648 8.05969 7.73906C8.46124 8.00323 8.80805 8.3424 9.0811 8.73797C9.75386 7.9847 10.1255 7.00996 10.125 6Z" fill="#4F5257"/>
                        </svg>
                        <span className="user">{item.sender}</span> 
                      </div>
                      <div className="msgCnt">
                        <span className="msg">{item.message}</span>
                        <span className="timestamp">{timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* 현재 보내는 message chat */}
            {messages.map((item, index) => {
              const isSender = item.sender === username;
              return item.type === "CHAT" ? (
                <div
                  key={index}
                  style={{ justifyContent: isSender ? "flex-end" : "flex-start" }}
                  className="message-wrapper"
                >
                  <div
                    className={`message-container ${
                      isSender ? "sender" : "receiver"
                    }`}
                  >
                    <div className={`message ${isSender ? "sender" : "receiver"}`}>
                      <div className="userCnt">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M8.0625 5.625C8.0625 6.03292 7.94154 6.43169 7.71491 6.77086C7.48828 7.11004 7.16616 7.3744 6.78929 7.5305C6.41241 7.68661 5.99771 7.72745 5.59763 7.64787C5.19754 7.56829 4.83004 7.37185 4.54159 7.08341C4.25315 6.79496 4.05671 6.42746 3.97713 6.02737C3.89755 5.62729 3.9384 5.21259 4.0945 4.83572C4.25061 4.45884 4.51496 4.13672 4.85414 3.91009C5.19332 3.68346 5.59208 3.5625 6 3.5625C6.54682 3.56312 7.07107 3.78062 7.45772 4.16728C7.84438 4.55394 8.06188 5.07818 8.0625 5.625ZM10.875 6C10.875 6.96418 10.5891 7.90671 10.0534 8.7084C9.51775 9.51009 8.75637 10.1349 7.86558 10.5039C6.97479 10.8729 5.99459 10.9694 5.04894 10.7813C4.10328 10.5932 3.23464 10.1289 2.55286 9.44715C1.87108 8.76536 1.40678 7.89672 1.21867 6.95107C1.03057 6.00541 1.12711 5.02521 1.49609 4.13442C1.86507 3.24363 2.48991 2.48226 3.2916 1.94659C4.09329 1.41091 5.03582 1.125 6 1.125C7.29251 1.12636 8.5317 1.64042 9.44564 2.55436C10.3596 3.46831 10.8736 4.70749 10.875 6ZM10.125 6C10.1244 5.44478 10.0118 4.89539 9.79404 4.38467C9.57624 3.87395 9.25768 3.4124 8.85741 3.02763C8.45714 2.64285 7.98339 2.34274 7.46448 2.14526C6.94557 1.94778 6.39216 1.85698 5.83735 1.87828C3.62953 1.96359 1.86891 3.8025 1.875 6.01172C1.87712 7.01743 2.24804 7.98744 2.9175 8.73797C3.19014 8.34254 3.53646 8.00338 3.9375 7.73906C3.97169 7.71648 4.01234 7.70572 4.05323 7.70843C4.09412 7.71114 4.13299 7.72717 4.16391 7.75406C4.67352 8.19485 5.3248 8.43743 5.9986 8.43743C6.67239 8.43743 7.32367 8.19485 7.83328 7.75406C7.8642 7.72717 7.90307 7.71114 7.94396 7.70843C7.98485 7.70572 8.0255 7.71648 8.05969 7.73906C8.46124 8.00323 8.80805 8.3424 9.0811 8.73797C9.75386 7.9847 10.1255 7.00996 10.125 6Z" fill="#4F5257"/>
                        </svg>
                        <span className="user">{item.sender}</span> 
                      </div>
                      <div className="msgCnt">
                        <span className="msg">{item.message}</span>
                        <span className="timestamp">{item.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} style={{ justifyContent: "center" }}>
                  <div className="system-message">{item.message}</div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatMessage login">
            <input
              className="inputBox"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Join chat under the name of ‘Sandy’"
            />
            <button className="sendBtn" onClick={sendMessage}>
              Send
            </button>
          </div>
        </> :
        <>
          <div className="chatCnt logout">
            <span>please log in and talk to people</span>
          </div>
          <div className="chatMessage logout">
            <button className="sendBtn" onClick={() => navigate("/login")}>
              Log in
            </button>
          </div>
        </>
      }
    </div>
  );
}
