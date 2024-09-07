import { useAuth } from '@/providers/authProvider';
import { useState, useEffect, useCallback } from 'react';

const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const { userId } = useAuth();

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = useCallback((context: string) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify({
        context: context,
        user_id: userId
      }));
    } else {
      console.error('WebSocket is not connected');
    }
  }, [socket, isConnected]);

  return { isConnected, messages, sendMessage };
};

export default useWebSocket;
