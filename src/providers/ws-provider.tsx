import { Data } from '@/components/side-panel';
import { useAuth } from '@/providers/auth-provider';
import { useState, useEffect, useCallback, useContext, createContext } from 'react';


interface WsProviderContext {
  messages: Data[];
  sendMessage: (context: string) => void;
}

const WsContext = createContext<WsProviderContext>({
  messages: [],
  sendMessage: () => {},
});

export const useWebSocket = () => useContext(WsContext);


export const WsProvider = ({ children, url }: { children: React.ReactNode, url: string }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Data[]>([]);

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
      setMessages(message.nodes);
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

  return (
    <WsContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WsContext.Provider>
  );
};

