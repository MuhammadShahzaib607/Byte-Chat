"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { LuSend, LuBot, LuUser, LuSparkles } from "react-icons/lu";

export default function BotChatPage() {
  const { slug } = useParams();
  const [bot, setBot] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const initBot = async () => {
    if (!slug) return;
    try {
      const botRes = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/bot/get-by-slug/${slug}`);
      const botData = botRes.data.data.bot;
      setBot(botData);
      const chatRes = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/history/${botData._id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      setMessages(chatRes.data?.data?.chats || []);
      setLoading(false);
    } catch (error) { setLoading(false); }
  };

  useEffect(() => { initBot(); }, [slug]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/bot/send-message`, 
        { botId: bot._id, userPrompt: userMsg.text },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      const aiReply = res.data?.data?.reply || res.data?.reply || "No response content";
      
    //   setMessages((prev) => [...prev, { sender: "bot", text: aiReply }]);
    setMessages(res.data.data)
    } catch (error) { 
      console.error("Error sending message:", error); 
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isTyping]);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#070709] text-zinc-500">Initializing...</div>;
if (!bot) {
    return <div className="relative flex min-h-screen items-center justify-center bg-[#070709] px-4 font-sans selection:bg-purple-500/40 selection:text-white overflow-hidden">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent pointer-events-none" />
        
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

<div className="flex flex-col items-center justify-center h-full p-6 text-center">
  <h2 className="text-2xl font-bold text-white mb-2">Bot Not Found</h2>
  <p className="text-zinc-500">The bot you are looking for does not exist or has been removed.</p>
</div>

          </div>
}

  if (!bot?.isActive) {
    return (
         <div className="relative flex min-h-screen items-center justify-center bg-[#070709] px-4 font-sans selection:bg-purple-500/40 selection:text-white overflow-hidden">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent pointer-events-none" />
        
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

<div className="flex flex-col items-center justify-center h-full p-6 text-center">
  <h2 className="text-2xl font-bold text-white mb-2">Bot Inactive</h2>
  <p className="text-zinc-500">This bot is currently offline and not accepting new messages.</p>
</div>

          </div>
    )
  }

  return (
     <div className="relative flex min-h-screen items-center justify-center bg-[#070709] px-4 font-sans selection:bg-purple-500/40 selection:text-white overflow-hidden">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent pointer-events-none" />
        
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
    
    <div className="relative flex min-h-screen items-center justify-center bg-[#070709] p-4 selection:bg-purple-500/40">
      
      <div className="absolute w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-2xl h-[85vh] flex flex-col bg-[#070709]/80 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
        
        <header className="p-4 border-b border-zinc-800/50 flex justify-center">
          <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-zinc-900 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">{bot?.businessName}</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-8 custom-scrollbar">
          <div className="space-y-8">
            {messages.length === 0 && (
              <div className="text-center pt-10">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-6">
                  <LuSparkles className="text-purple-400" size={30} />
                </div>
                <h2 className="text-lg font-bold text-[#2d2c2c] select-none">{bot?.welcomeMessage}</h2>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "bot" && <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0"><LuBot size={16} className="text-purple-400" /></div>}
                <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-[14px] ${msg.sender === "user" ? "bg-purple-600 text-white rounded-tr-sm" : "bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-sm"}`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <LuBot size={16} className="text-purple-400" />
                </div>
                <div className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 text-[14px] rounded-tl-sm animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </main>

        <footer className="p-4 border-t border-zinc-800/50">
          <div className="relative flex items-center w-full md:w-[600px] bg-zinc-900 border border-zinc-800 rounded-2xl p-1.5 focus-within:border-purple-500 transition-all">
  <input 
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
    className="flex-1 bg-transparent py-2 pl-3 pr-4 text-white text-sm outline-none placeholder:text-zinc-600"
    placeholder="Ask anything..."
  />
  <button 
    onClick={handleSendMessage} 
    className="flex items-center justify-center p-2.5 bg-purple-600 rounded-xl text-white hover:bg-purple-500 transition-all shrink-0"
  >
    <LuSend size={16} />
  </button>
</div>
        </footer>
      </div>
    </div>
    
          </div>
  );
}