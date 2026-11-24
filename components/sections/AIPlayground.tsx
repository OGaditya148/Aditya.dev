// components/sections/AIPlayground.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RotateCcw, Terminal, Cpu, Zap } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: number;
}

const API_URL =
  process.env.NEXT_PUBLIC_ASSISTANT_API_URL || 'http://127.0.0.1:8000';

const INITIAL_MESSAGE: Message = {
  id: 0,
  role: 'assistant',
  content:
    '> ADITYA.AI TERMINAL v2.0\n\nConnected to Aditya\'s personal assistant. Ask me anything about:\n  • Skills & Tech Stack\n  • Projects Built\n  • Education & Scores\n  • Internship Experience\n  • Contact & Availability\n\n[READY FOR INPUT]',
};

export default function AIPlayground() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (customText?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = (customText ?? input).trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: idRef.current++,
      role: 'user',
      content: query,
    };

    // Pass prior conversation turns (excluding the initial/reset system banner)
    const history = messages
      .filter((m) => m.id !== 0)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      const assistantText =
        data.reply || data['Reply: '] || 'No response received from assistant.';

      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current++,
          role: 'assistant',
          content: assistantText,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current++,
          role: 'assistant',
          content:
            '> CONNECTION ERROR\n\nCould not reach Aditya\'s AI server right now. Make sure the FastAPI backend is running or try again shortly.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const reset = () => {
    setMessages([
      {
        id: 0,
        role: 'assistant',
        content: '> TERMINAL RESET\n\n[MEMORY CLEARED · READY FOR INPUT]',
      },
    ]);
    idRef.current = 1;
  };

  const quickPrompts = [
    'What are your skills?',
    'Tell me about your projects',
    'What is your educational background?',
    'Tell me about your internship experience',
  ];

  return (
    <SectionWrapper id="playground" label="ai-lab" labelColor="emerald" className="bg-[#050508]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#00ff88]/30 text-[#00ff88] text-xs font-jetbrains mb-6"
          >
            <Cpu size={12} className="animate-pulse" /> AI Playground
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-3xl sm:text-4xl xl:text-5xl text-white mb-4"
          >
            Interactive <span className="text-[#00ff88]">Terminal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-jetbrains text-sm"
          >
            Ask my AI terminal anything about my skills, projects & experience
          </motion.p>
        </div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-xl border border-[#00ff88]/20 overflow-hidden shadow-[0_0_40px_rgba(0,255,136,0.08)]"
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <Terminal size={12} className="text-[#00ff88] ml-2" />
              <span className="text-xs font-jetbrains text-slate-500">aditya.ai ~ terminal</span>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-1 text-xs font-jetbrains text-slate-500 hover:text-[#00ff88] transition-colors"
            >
              <RotateCcw size={11} /> Reset
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="h-72 sm:h-80 overflow-y-auto p-4 space-y-4 font-jetbrains text-xs sm:text-sm"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn('flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  {msg.role === 'assistant' && (
                    <span className="shrink-0 text-[#00ff88] mt-0.5">
                      <Zap size={13} />
                    </span>
                  )}
                  <div
                    className={cn(
                      'max-w-[85%] rounded-lg px-3 py-2 whitespace-pre-line leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-[#00f3ff]/10 border border-[#00f3ff]/20 text-[#00f3ff] rounded-tr-none'
                        : 'bg-white/[0.04] border border-white/[0.06] text-slate-300 rounded-tl-none'
                    )}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <span className="shrink-0 text-[#00f3ff] mt-0.5 font-bold text-xs">$</span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-slate-500"
              >
                <Zap size={13} className="text-[#00ff88]" />
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-[#00ff88]"
                    />
                  ))}
                </span>
                <span className="text-xs">Processing query...</span>
              </motion.div>
            )}
          </div>

          {/* Quick prompts */}
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSendMessage(p)}
                disabled={isTyping}
                className="text-[10px] font-jetbrains px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-[#00ff88] hover:border-[#00ff88]/30 disabled:opacity-40 transition-all duration-150"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => handleSendMessage(undefined, e)}
            className="flex items-center gap-3 px-4 py-3 border-t border-white/[0.06] bg-white/[0.02]"
          >
            <span className="font-jetbrains text-[#8a2be2] text-sm shrink-0">{'>'}</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects, experience..."
              className="flex-1 bg-transparent font-jetbrains text-sm text-slate-200 placeholder-slate-600 outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded text-[#00ff88] hover:bg-[#00ff88]/10 disabled:opacity-30 transition-all duration-150"
            >
              <Send size={15} />
            </button>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}