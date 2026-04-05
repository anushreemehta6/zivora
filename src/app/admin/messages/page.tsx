"use client";

import { useEffect, useState } from "react";
import { 
  Mail, 
  User, 
  Calendar, 
  Trash2, 
  ChevronRight,
  Eye,
  MessageSquare,
  Search,
  Filter,
  ArrowUpDown,
  ArrowLeft
} from "lucide-react";
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    const loadingToast = toast.loading("Deleting message...");
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
        toast.success("Message deleted successfully", { id: loadingToast });
      } else {
        toast.error("Failed to delete message", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("An error occurred while deleting the message", { id: loadingToast });
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4 text-primary animate-pulse">
        <MessageSquare size={48} className="text-primary/20" />
        <span className="font-bold uppercase tracking-widest text-[10px]">Retrieving Enquiries...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-10 pb-20">
      {/* Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 ${selectedMessage ? "hidden lg:flex" : "flex"}`}>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Customer Enquiries</h1>
          <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-gray-400 font-mono tracking-widest uppercase">
            <span>Admin Control</span>
            <ChevronRight size={12} />
            <span className="text-primary underline underline-offset-4 decoration-primary/30">Inbound Messages</span>
          </nav>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..."
              className="pl-11 pr-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-1 focus:ring-primary outline-none transition-all w-full md:w-64 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="hidden sm:block p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-primary hover:border-primary transition-all shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Messages List */}
        <div className={`lg:col-span-1 space-y-4 max-h-[80vh] overflow-y-auto pr-1 scrollbar-thin ${selectedMessage ? "hidden lg:block" : "block"}`}>
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-6 rounded-[2rem] border transition-all cursor-pointer group ${
                  selectedMessage?.id === msg.id 
                    ? "bg-secondary text-white border-secondary shadow-xl shadow-secondary/20" 
                    : "bg-white text-secondary border-gray-100 hover:border-primary/30"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2.5 rounded-xl ${selectedMessage?.id === msg.id ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                    <Mail size={16} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedMessage?.id === msg.id ? "text-gray-400" : "text-gray-400"}`}>
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-bold text-sm mb-1 line-clamp-1">{msg.subject}</h3>
                <p className={`text-xs font-medium mb-4 ${selectedMessage?.id === msg.id ? "text-gray-400" : "text-gray-400"}`}>from: {msg.name}</p>
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-bold uppercase tracking-tighter opacity-50"># ENQ-{msg.id.slice(0, 5)}</span>
                   <ChevronRight size={14} className={`transition-transform ${selectedMessage?.id === msg.id ? "translate-x-1" : "group-hover:translate-x-1 text-primary"}`} />
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-[2rem] p-12 border border-gray-100 text-center">
              <MessageSquare size={32} className="mx-auto text-gray-200 mb-4" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No matching messages</p>
            </div>
          )}
        </div>

        {/* Message Content Area */}
        <div className={`lg:col-span-2 ${selectedMessage ? "block" : "hidden lg:block"} h-full`}>
          {selectedMessage ? (
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm p-6 md:p-10 h-full flex flex-col animate-in slide-in-from-right lg:slide-in-from-none duration-500">
              {/* Mobile Back Button */}
              <button 
                onClick={() => setSelectedMessage(null)}
                className="lg:hidden flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-6"
              >
                <ArrowLeft size={16} /> Back to Conversations
              </button>

              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-gray-50 pb-8 md:pb-10 mb-8 md:mb-10">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-secondary flex items-center justify-center text-primary text-xl md:text-2xl font-bold shadow-lg shadow-secondary/10 shrink-0">
                    {selectedMessage.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-secondary mb-1 line-clamp-1">{selectedMessage.name}</h2>
                    <p className="text-xs md:text-sm font-medium text-gray-400 line-clamp-1">{selectedMessage.email}</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-3.5 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-100 active:scale-95 flex-1 sm:flex-initial flex items-center justify-center"
                    title="Delete Message"
                    >
                    <Trash2 size={20} className="md:size-5" />
                    <span className="sm:hidden ml-2 font-bold text-xs">Delete Message</span>
                    </button>
                    <a 
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="flex-grow sm:flex-initial px-6 md:px-10 py-3.5 md:py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-secondary/10 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 text-center flex items-center justify-center"
                    >
                    Reply via Email
                    </a>
                </div>
              </div>

              <div className="flex-grow space-y-6 md:space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Subject Line</span>
                  <h3 className="text-lg md:text-xl font-bold text-secondary">{selectedMessage.subject}</h3>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Message Body</span>
                  <div className="p-6 md:p-8 bg-gray-50 rounded-2xl md:rounded-3xl border border-gray-100">
                    <p className="text-secondary leading-[1.8] text-sm whitespace-pre-wrap font-medium">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-10 pt-8 md:pt-10 border-t border-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-[10px] md:text-xs font-bold text-gray-400">
                  <Calendar size={14} className="text-primary" />
                  Sent on {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
                <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    ID: {selectedMessage.id}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 border-dashed p-10 md:p-20 h-full flex flex-col items-center justify-center text-center group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-50 flex items-center justify-center text-gray-200 mb-6 group-hover:scale-110 transition-transform duration-700">
                <Mail size={40} className="md:size-12" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-secondary mb-2">Select a Conversation</h3>
              <p className="text-xs md:text-sm text-gray-400 max-w-xs leading-relaxed">Choose a message from the sidebar to view full details and respond to the customer.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
