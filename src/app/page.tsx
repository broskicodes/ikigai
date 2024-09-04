"use client";

import { Chat } from "@/components/chat";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (!storedUserId) {
      const newUserId = uuidv4();
      setUserId(newUserId);
      localStorage.setItem('userId', newUserId);
    }
  }, []);

  return (
    <div>
      <Chat />
    </div>
  );
}
