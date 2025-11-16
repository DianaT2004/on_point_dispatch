import { useState, useRef, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { useChatStore } from '../stores/chatStore';
import { SendIcon, LoaderIcon } from 'lucide-react';

export default function ChatPage() {
  const { messages, isSending, isTyping, sendMessage } = useChatStore();
  const [messageText, setMessageText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleSend = async () => {
    if (!messageText.trim() || isSending) return;
    
    const text = messageText;
    setMessageText('');
    await sendMessage(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getMessageAlignment = (sender: string) => {
    return sender === 'driver' ? 'justify-end' : 'justify-start';
  };

  const getMessageBg = (sender: string) => {
    if (sender === 'driver') return 'bg-primary text-primary-foreground';
    if (sender === 'system') return 'bg-muted text-muted-foreground';
    return 'bg-card border border-border text-foreground';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8 h-[calc(100vh-5rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">
          Chat with dispatch and shippers
        </p>
      </div>

      <Card className="h-[calc(100%-5rem)] flex flex-col">
        {/* Messages */}
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${getMessageAlignment(msg.sender)}`}>
                <div className={`flex items-end gap-2 max-w-[80%] ${msg.sender === 'driver' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="text-xs">
                      {getInitials(msg.senderName)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    {msg.sender !== 'driver' && (
                      <div className="text-xs text-muted-foreground mb-1 px-1">
                        {msg.senderName}
                      </div>
                    )}
                    <div className={`rounded-2xl px-4 py-2 ${getMessageBg(msg.sender)}`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 px-1">
                      {new Date(msg.timestamp).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="text-xs">CD</AvatarFallback>
                  </Avatar>
                  <div className="bg-card border border-border rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={isSending}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!messageText.trim() || isSending}
              size="icon"
              className="flex-shrink-0"
            >
              {isSending ? (
                <LoaderIcon className="w-4 h-4 animate-spin" />
              ) : (
                <SendIcon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
