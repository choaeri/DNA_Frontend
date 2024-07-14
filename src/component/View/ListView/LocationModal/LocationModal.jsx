import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Modal, Input, List } from 'antd';
import { axiosInstance } from '../../../../common/func/axios';
import './LocationModal.css';

const LocationModal = ({ visible, location, onOk, onCancel }) => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const currentSubscription = useRef(null);
  const [username, setUsername] = useState('');

  const locationId = location ? location.id : null;

  // 사용자 이름 조회 API 호출
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axiosInstance.get('/api/users/name');
        setUsername(response.data.username);
      } catch (error) {
        console.error('Failed to fetch username:', error);
      }
    };
    fetchUsername();
  }, []);

  // 채팅방 입장
  useEffect(() => {
    if (!locationId || !visible) return;

    const socket = new SockJS(`${process.env.REACT_APP_TOUR_API}ws`);
    const stompClientInstance = Stomp.over(socket);
    setStompClient(stompClientInstance);

    stompClientInstance.connect({}, () => {
      if (currentSubscription.current) {
        currentSubscription.current.unsubscribe();
      }

      const subscription = stompClientInstance.subscribe(`/sub/rooms/${locationId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        const messageTime = new Date();
        const timestamp = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setMessages(messages => [...messages, { ...newMessage, timestamp }]);
    
      });

      currentSubscription.current = subscription;

      // 입장 메시지 전송
      stompClientInstance.send('/pub/messages', {}, JSON.stringify({
        type: 'JOIN',
        roomId: locationId
      }));
    });

    return () => {
      if (stompClientInstance !== null) {
        // 퇴장 메시지 전송
        stompClientInstance.send('/pub/messages', {}, JSON.stringify({
        type: 'LEAVE',
        roomId: locationId,
        }));

        stompClientInstance.disconnect(() => {
          setMessages([]); // 메시지 상태 초기화
        });
      }
    };
  }, [locationId, visible]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 채팅 메시지 전송
  const sendMessage = () => {
    if (message.trim() !== '') {
      stompClient.send('/pub/messages', {}, JSON.stringify({
        type: `CHAT`,
        roomId: locationId,
        message: message,
      }));
      setMessage('');
    }
  };

  if (!location) return null;

  return (
    <Modal
      title={`${location.name} 채팅방`}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      width={600}
      Style={{ height: '400px', overflowY: 'hidden' }}
    >
      <div className="message-box">
        <List
          dataSource={messages}
          renderItem={(item, index) => {
            const isSender = item.sender === username;
            return (
              item.type === 'CHAT' ?
                <List.Item key={index} style={{ justifyContent: isSender ? 'flex-end' : 'flex-start' }}>
                  <div className={`message-container ${isSender ? 'sender' : 'receiver'}`}>
                    <div className={`message ${isSender ? 'sender' : 'receiver'}`}>
                      <strong>{item.sender}:</strong> {item.message}
                    </div>
                    <div className="timestamp">{item.timestamp}</div>
                  </div>
                </List.Item>
              : <List.Item key={index} style={{ justifyContent: 'center' }}>
                  <div className="system-message">
                    {item.message}
                  </div>
                </List.Item>
            )
          }}
        />
        <div ref={messagesEndRef} />
      </div>
      <div className="input-section">
        <Input
          className="input-box"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="메시지를 입력하세요"
        />
        <button className="send-button" onClick={sendMessage}>
          전송
        </button>
      </div>
    </Modal>
  );
};

export default LocationModal;