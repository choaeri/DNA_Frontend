import { useContext, useEffect, useRef, useState } from "react";
import useLocalStorage from "../../../../utils/useLocalStorage";
import { axiosInstance } from "../../../../common/func/axios";
import { AppContext } from "../../../../context/AppContext";
import { Stomp } from 'stompjs';
import SockJS from "sockjs-client";
import "./OpenChat.css";

export default function OpenChat () {
  const { selectLocation, detailInfo } = useContext(AppContext);
  const { isLoggedIn } = useLocalStorage();
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  const messagesEndRef = useRef(null);
  const currentSubscription = useRef(null);

  // 채팅 메시지 전송
  const sendMessage = () => {
    if (message.trim() !== '') {
      stompClient.send('/pub/messages', {}, JSON.stringify({
        type: `CHAT`,
        roomId: detailInfo.locationId,
        message: message,
      }));
      setMessage('');
    }
  };

  // 사용자 이름 조회 API 호출
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axiosInstance.get('/api/users/names');
        setUsername(response.data.username);
        console.log(response.data.username);
        console.log(username);
      } catch (error) {
        console.error('Failed to fetch username:', error);
      }
    };
    fetchUsername();
  }, []);

  // 채팅방 입장
  useEffect(() => {
    if(isLoggedIn) {
      if (!detailInfo.locationId) return;
  
      const socket = new SockJS(`${process.env.REACT_APP_TOUR_WS}/ws`);
      const stompClientInstance = Stomp.over(socket);
      setStompClient(stompClientInstance);
  
      stompClientInstance.connect({}, () => {
        if (currentSubscription.current) {
          currentSubscription.current.unsubscribe();
        }
  
        const subscription = stompClientInstance.subscribe(`/sub/rooms/${detailInfo.locationId}`, (data) => {
          const newMessage = JSON.parse(data.body);
          const messageTime = new Date();
          const timestamp = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          setMessages(messages => [...messages, { ...newMessage, timestamp }]);
      
        });
  
        currentSubscription.current = subscription;
  
        // 입장 메시지 전송
        stompClientInstance.send('/pub/messages', {}, JSON.stringify({
          type: 'JOIN',
          roomId: detailInfo.locationId
        }));
      });
  
      if (stompClientInstance !== null) {
        // 퇴장 메시지 전송
        stompClientInstance.send('/pub/messages', {}, JSON.stringify({
        type: 'LEAVE',
        roomId: detailInfo.locationId,
        }));

        stompClientInstance.disconnect(() => {
          setMessages([]); // 메시지 상태 초기화
        });
      }
    }
  }, [detailInfo.locationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat">
      <span className="header">Open Talk</span>
      <div className="chatCnt">
        <div
          dataSource={messages}
          renderItem={(item, index) => {
            const isSender = item.sender === username;
            return (
              item.type === 'CHAT' ?
                <div key={index} style={{ justifyContent: isSender ? 'flex-end' : 'flex-start' }}>
                  <div className={`message-container ${isSender ? 'sender' : 'receiver'}`}>
                    <div className={`message ${isSender ? 'sender' : 'receiver'}`}>
                      <strong>{item.sender}:</strong> {item.message}
                    </div>
                    <div className="timestamp">{item.timestamp}</div>
                  </div>
                </div>
              : <div key={index} style={{ justifyContent: 'center' }}>
                  <div className="system-message">
                    {item.message}
                  </div>
                </div>
            )
          }}
        />
        <div ref={messagesEndRef} />
      </div>
      <div className="chatMessage">
        { isLoggedIn ? 
        <>
          <input
            className="inputBox"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Join chat under the name of ‘Sandy’"
          /> 
          <button className="sendBtn" onClick={sendMessage}>
            Send
          </button>
        </> :
          <input
            className="inputBox"
            disabled="disabled"
            placeholder="Please Login"
          />
        }
      </div>
    </div>
  )
};