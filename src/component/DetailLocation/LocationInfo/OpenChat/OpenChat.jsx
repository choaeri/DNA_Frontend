import { useContext, useEffect, useRef, useState } from "react";
import useLocalStorage from "../../../../utils/useLocalStorage";
import { axiosInstance } from "../../../../common/func/axios";
import { AppContext } from "../../../../context/AppContext";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./OpenChat.css";
import { useNavigate } from "react-router-dom";

export default function OpenChat() {
  const { detailInfo } = useContext(AppContext);
  const { isLoggedIn } = useLocalStorage();
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [participantCount, setParticipantCount] = useState(0);

  const messagesEndRef = useRef(null);
  const currentSubscription = useRef(null);

  const navigate = useNavigate();

  // 사용자 이름 조회 API 호출
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axiosInstance.get("/api/users/name");
        setUsername(response.data.username);
      } catch (error) {
        console.error("Failed to fetch username:", error);
      }
    };
    fetchUsername();
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
                      <strong>{item.sender}:</strong> {item.message}
                    </div>
                    <div className="timestamp">{item.timestamp}</div>
                  </div>
                </div>
              ) : (
                <div key={index} style={{ justifyContent: "center" }}>
                  <div className="system-message">{item.message}</div>
                </div>
              );
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
