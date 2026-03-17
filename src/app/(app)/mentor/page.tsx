'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, HeartPulse, BookOpen, Coins, Clock } from 'lucide-react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Badge from '@/components/ui/badge';
import { mockChat } from '@/lib/mock-data';
import type { ChatMessage, PillarType } from '@/types';
import { PILLAR_CONFIG, DIFFICULTY_CONFIG } from '@/types';

const pillarIconMap: Record<PillarType, React.ComponentType<{ className?: string; size?: number }>> = {
  health: HeartPulse,
  intelligence: BookOpen,
  gold: Coins,
  strength: Clock,
};

const quickReplies = [
  'Como estou indo?',
  'Me de uma missao',
  'Dicas para hoje',
  'Qual pilar precisa de foco?',
];

export default function MentorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChat);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend(text?: string) {
    const content = text ?? inputText.trim();
    if (!content) return;

    const newMessage: ChatMessage = {
      id: `m${Date.now()}`,
      sender: 'user',
      text: content,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.14)-theme(spacing.20))] lg:h-[calc(100vh-theme(spacing.8))]">
      {/* Header */}
      <Card className="flex items-center gap-3 rounded-b-none border-b-0">
        <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center">
          <Bot size={20} className="text-accent-cyan" />
        </div>
        <div>
          <h1 className="text-base font-bold text-text-primary">Mentor IA</h1>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-green" />
            <span className="text-xs text-accent-green">Online</span>
          </div>
        </div>
      </Card>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-secondary border-x border-white/6">
        {messages.map((msg) => {
          const isMentor = msg.sender === 'mentor';

          return (
            <div
              key={msg.id}
              className={`flex ${isMentor ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={[
                  'max-w-[80%] p-3 border-l-3',
                  isMentor
                    ? 'ml-0 bg-bg-tertiary border-accent-cyan rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-xl'
                    : 'ml-auto bg-bg-elevated border-accent-primary rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl',
                ].join(' ')}
              >
                {/* Sender label */}
                <span
                  className={`text-xs font-medium block mb-1 ${
                    isMentor ? 'text-accent-cyan' : 'text-accent-primary-light'
                  }`}
                >
                  {isMentor ? 'Mentor' : 'Voce'}
                </span>

                {/* Message text */}
                <p className="text-sm text-text-primary leading-relaxed">{msg.text}</p>

                {/* Suggested mission card */}
                {msg.suggestedMission && (
                  <div className="mt-3 p-3 bg-bg-primary/50 rounded-lg border border-white/6">
                    <div className="flex items-center gap-2 mb-2">
                      {(() => {
                        const PillarIcon = pillarIconMap[msg.suggestedMission.pillarType];
                        const pillarConfig = PILLAR_CONFIG[msg.suggestedMission.pillarType];
                        return (
                          <>
                            <PillarIcon size={16} className={`text-${pillarConfig.color}`} />
                            <span className="text-sm font-medium text-text-primary">
                              {msg.suggestedMission.title}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        variant="difficulty"
                        label={DIFFICULTY_CONFIG[msg.suggestedMission.difficulty].label}
                      />
                      <span className="text-xs font-mono text-accent-primary-light">
                        +{msg.suggestedMission.xpReward} XP
                      </span>
                    </div>
                    <Button size="sm" variant="primary">
                      Aceitar missao
                    </Button>
                  </div>
                )}

                {/* Timestamp */}
                <span className="text-[10px] text-text-tertiary block mt-1.5 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Quick replies */}
      <div className="bg-bg-secondary border-x border-white/6 px-4 py-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleSend(reply)}
              className="bg-accent-primary/10 text-accent-primary-light px-4 py-2 rounded-full text-sm whitespace-nowrap cursor-pointer hover:bg-accent-primary/20 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="bg-bg-secondary border border-white/6 rounded-t-none rounded-b-xl p-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Digite sua mensagem..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button variant="primary" size="md" onClick={() => handleSend()}>
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
