"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWebSocket } from "@/providers/ws-provider";
import { useEffect, useState } from "react";
import { NodeData } from "@/lib/types";

export function SidePanel() {
  const [data, setData] = useState<NodeData[]>([]);
  const { messages: wsMessages } = useWebSocket();

  useEffect(() => {
    if (wsMessages.length > 0) {
      setData(wsMessages);
    }
  }, [wsMessages]);

  return (
    <Card className="flex flex-col w-96 bg-muted/40">
      <CardHeader>
        <CardTitle className="text-center">Skills & Interests</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-full">
          <div className="flex space-x-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-col space-y-2">
                {data
                  .filter((d) => d.label === "Skill")
                  .map((skill, index) => (
                    <Badge
                      key={index}
                      variant="default"
                      className="justify-center"
                    >
                      {skill.name}
                    </Badge>
                  ))}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Interests</h3>
              <div className="flex flex-col space-y-2">
                {data
                  .filter((d) => d.label === "Interest")
                  .map((interest, index) => (
                    <Badge
                      key={index}
                      variant="default"
                      className="justify-center bg-accent text-accent-foreground text-center"
                    >
                      {interest.name}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
