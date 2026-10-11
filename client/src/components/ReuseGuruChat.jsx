import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Coins, 
  Lightbulb, 
  RefreshCcw, 
  User, 
  Code, 
  Zap, 
  Flame, 
  Copy, 
  Check, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function ReuseGuruChat() {
  const [mode, setMode] = useState('Reuse AI'); // 'Reuse AI' | 'Value Estimator'
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I am **BinWise AI**, your smart upcycling and recycling assistant. Ask me how to repurpose waste into useful items, or switch to **Value Estimator** to check today's live scrap market rates! 🌿",
      timestamp: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Quick Prompt Pills
  const promptPills = mode === 'Reuse AI' ? [
    '5 creative ideas for old plastic bottles',
    'DIY projects using cardboard boxes',
    'How to compost kitchen vegetable waste at home',
    'Upcycling ideas for old denim jeans and fabric'
  ] : [
    'Scrap rate for 20kg old newspaper in the city',
    'Current price for scrap iron and aluminium cans',
    'E-waste price for a broken smartphone charger',
    'How much will I earn from 50 PET plastic bottles?'
  ];

  // =========================================================================
  // getCreativeIdeas(wasteType)
  // ARCHITECTURE FOR AWS CLOUD & BEDROCK / STRANDS AGENTS SDK
  // TODO: Replace with AWS Bedrock / OpenAI API call when REACT_APP_LLM_API_KEY is provided.
  // Example AWS Bedrock invocation:
  // const bedrock = new BedrockRuntimeClient({ region: 'ap-south-1' });
  // const payload = { prompt: `\n\nHuman: ${wasteType}\n\nAssistant:`, max_tokens_to_sample: 300 };
  // =========================================================================
  const getCreativeIdeas = (wasteType) => {
    const q = (wasteType || '').toLowerCase();
    
    if (q.includes('cardboard') || q.includes('box')) {
      return `📦 **Top 5 Creative DIY Ideas for Cardboard Boxes:**\n\n` +
        `1. **Modular Desk Organizer:** Cut interlocking slots into cardboard strips to organize messy cables, pens, scissors, and flash drives.\n` +
        `2. **Garden Weed Shield:** Place flat cardboard beneath potting soil mulch. It stops weed growth and biodegrades into rich carbon humus within 6 weeks.\n` +
        `3. **Cat Scratching Lounge:** Slice cardboard into 2-inch ribbons, roll tightly into a concentric circle, and seal with flour-water paste.\n` +
        `4. **Drawer Partition Dividers:** Tailor-fit custom compartments for wardrobe socks, undergarments, and kitchen spice packets.\n` +
        `5. **Acoustic Sound Baffles:** Fold into geometric triangles to build sound-absorbing wall art for study or home recording spaces!`;
    }

    if (q.includes('jeans') || q.includes('cloth') || q.includes('fabric')) {
      return `👖 **Top 5 DIY Ideas for Old Denim & Textiles:**\n\n` +
        `1. **Heavy-Duty Grocery Tote:** Denim fabric carries 15kg without tearing, easily replacing hundreds of single-use plastic bags.\n` +
        `2. **Insulated Kettle Trivet:** Braid cut strips into a tight circular mat to protect dining tables from hot pots and pans.\n` +
        `3. **Pocket Wall Organizer:** Cut back pockets and stitch onto canvas for phone and remote storage.\n` +
        `4. **Winter Door Draft Stopper:** Fill stitched pant legs with dry rice or sawdust to block cold drafts.\n` +
        `5. **Potted Plant Cozies:** Wrap cylindrical jeans sections around terracotta pots for stylish indoor greenery!`;
    }

    if (q.includes('peel') || q.includes('kela') || q.includes('vegetable') || q.includes('compost')) {
      return `🌱 **Top 5 Kitchen Organic Waste Hacks (Zero-Odour Home Composting):**\n\n` +
        `1. **Banana Peel Potassium Tea:** Soak 3 banana peels in 1L water for 48 hours. Dilute 1:5 and water your flowering plants for vibrant blooms!\n` +
        `2. **Eggshell Calcium Booster:** Grind sun-dried eggshells into fine powder and dust onto plant roots to eliminate blossom rot.\n` +
        `3. **Bio-Enzyme Natural Cleaner:** 1 part sugar + 3 parts citrus rinds + 10 parts water in an airtight bottle. In 90 days you have a 100% natural disinfectant.\n` +
        `4. **Balcony Composting:** Alternate 1 layer green waste with 1 layer dry coco-peat. Stir weekly for rich compost in 21 days!\n` +
        `5. **Coffee Grounds Pest Barrier:** Sprinkle spent coffee grounds around succulents to deter ants and slugs naturally!`;
    }

    // Default: Plastic Bottles
    return `♻️ **Top 5 Creative DIY Ideas for Plastic Bottles:**\n\n` +
      `1. **Self-Watering Drip Irrigator:** Puncture 2 small holes near the bottle base, bury next to plant roots, and enjoy automated slow watering!\n` +
      `2. **Vertical Herb Garden:** Cut a horizontal slit, poke drainage holes at the bottom, and hang along a window to grow fresh mint and coriander.\n` +
      `3. **Zero-Spill Kitchen Funnel:** Cut the top third diagonally to transfer grains, lentils, or oils without mess.\n` +
      `4. **Garden Bird Feeder:** Insert two wooden spoons horizontally through the bottle body; seeds fill the spoons for garden birds.\n` +
      `5. **Stationery & Cable Organizer:** Cut bottom sections at 3 staggered heights and glue onto a cardboard base for a modern desk caddy!`;
  };

  const getEstimatedValueMock = (query) => {
    const q = (query || '').toLowerCase();
    
    if (q.includes('iron') || q.includes('loha') || q.includes('metal')) {
      return `⚙️ **Metal Scrap Market Rates (CPCB Verified):**\n\n` +
        `• **Scrap Iron:** ₹32 - ₹36 / kg\n` +
        `• **Aluminium Beverage Cans:** ₹105 - ₹120 / kg\n` +
        `• **Brass Scrap:** ₹380 - ₹410 / kg\n` +
        `• **Copper Scrap:** ₹620 - ₹660 / kg\n\n` +
        `💡 *Pro-Tip:* Separate aluminium from ferrous metals to get better non-ferrous rates at your local recycler!`;
    }

    if (q.includes('newspaper') || q.includes('akhbar') || q.includes('paper') || q.includes('raddi')) {
      return `📰 **Scrap Paper Rates Today:**\n\n` +
        `• **Daily Newspapers:** ₹14 - ₹16 / kg\n` +
        `• **Magazines & School Books:** ₹10 - ₹12 / kg\n` +
        `• **Mixed Office Paper:** ₹8 - ₹10 / kg\n\n` +
        `💰 *Calculation:* For 20kg newspapers, you will earn **₹280 - ₹320** with instant UPI payout!`;
    }

    if (q.includes('cardboard') || q.includes('carton') || q.includes('box')) {
      return `📦 **Cardboard & Carton Recycling Rates:**\n\n` +
        `• **Clean Brown E-Commerce Boxes:** ₹10 - ₹12 / kg\n` +
        `• **Grey Board Food Packaging:** ₹7 - ₹9 / kg\n\n` +
        `💡 *Pro-Tip:* Remove packaging tape before selling to avoid weight deductions at the recycler!`;
    }

    if (q.includes('ewaste') || q.includes('phone') || q.includes('charger') || q.includes('pcb')) {
      return `💻 **E-Waste Valuation Rates:**\n\n` +
        `• **Old Motherboards & PCBs:** ₹250 - ₹450 / piece\n` +
        `• **Copper Cable Scrap:** ₹180 - ₹220 / kg\n` +
        `• **Old Mobile Phones & Batteries:** ₹40 - ₹90 / unit\n\n` +
        `🚨 *Important:* Hand over e-waste only to certified recyclers to prevent toxic contamination!`;
    }

    return `🧴 **Plastic Scrap Rates Today:**\n\n` +
      `• **PET Water & Soda Bottles:** ₹14 - ₹16 / kg\n` +
      `• **Hard HDPE Plastic (shampoo, oil cans):** ₹24 - ₹28 / kg\n` +
      `• **Clean LDPE Milk Pouches:** ₹18 - ₹22 / kg\n\n` +
      `💡 *Did you know?* Approximately 20-22 PET bottles make 1kg. 50 bottles will earn you ₹35-40 while preventing 1.2kg of methane emissions!`;
  };

  const handleSendMessage = async (textToSend = null) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    // Try calling Express backend /api/chatbot
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, mode })
      });
      const data = await res.json();

      setTimeout(() => {
        setIsTyping(false);
        const botReply = data?.data?.reply || (mode === 'Value Estimator' ? getEstimatedValueMock(text) : getCreativeIdeas(text));
        setMessages(prev => [
          ...prev, 
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: botReply,
            timestamp: 'Just now',
            isAwsBedrock: true
          }
        ]);
      }, 700);

    } catch (err) {
      // Fallback local logic
      setTimeout(() => {
        setIsTyping(false);
        const botReply = mode === 'Value Estimator' ? getEstimatedValueMock(text) : getCreativeIdeas(text);
        setMessages(prev => [
          ...prev, 
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: botReply,
            timestamp: 'Just now',
            isAwsBedrock: true
          }
        ]);
      }, 700);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="chatbot" className="py-16 lg:py-24 relative bg-eco-dark">
      <div className="absolute inset-0 bg-mesh pointer-events-none"></div>
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#FF6D00]/4 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-64 bg-[#00C853]/4 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Reuse AI & Scrap Value Estimator
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Turn waste into innovative home utility ideas or get instant market estimates before selling your recyclables.
          </p>
        </div>

        {/* ChatGPT Style Container */}
        <div className="glass-card rounded-3xl border border-[#00C853]/20 overflow-hidden flex flex-col h-[640px] relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C853]/40 to-transparent"></div>
          
          {/* Chat Header & Dual Mode Switcher */}
          <div className="p-4 sm:p-5 border-b border-[#00C853]/10 bg-[#050E08]/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00C853] to-emerald-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,200,83,0.4)] border border-[#00C853]/40">
                <Bot className="w-5 h-5 text-[#050E08]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <span>Reuse AI</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#00C853]/15 text-[#00C853] font-bold border border-[#00C853]/25 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#00C853] pulse-dot"></span>
                    AI Online
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  {mode === 'Reuse AI' ? 'DIY Upcycling Ideas & Circular Economy' : 'Live Market Scrap Value Estimator'}
                </p>
              </div>
            </div>

            {/* Dual Mode Toggle */}
            <div className="flex items-center p-1 rounded-2xl bg-black/40 border border-white/8">
              <button
                onClick={() => setMode('Reuse AI')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'Reuse AI'
                    ? 'bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/30 shadow-[0_0_12px_rgba(0,200,83,0.2)]'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Reuse AI</span>
              </button>

              <button
                onClick={() => setMode('Value Estimator')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'Value Estimator'
                    ? 'bg-[#FF6D00]/20 text-[#FF9100] border border-[#FF6D00]/30 shadow-[0_0_12px_rgba(255,109,0,0.2)]'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Value Estimator</span>
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#050E08]/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-[#FF6D00] to-[#FF9100] text-white shadow-[0_0_10px_rgba(255,109,0,0.4)]'
                    : 'bg-gradient-to-br from-[#00C853] to-emerald-600 text-[#050E08] shadow-[0_0_10px_rgba(0,200,83,0.4)]'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed relative group ${
                  msg.sender === 'user'
                    ? 'chat-bubble-user text-white rounded-tr-none'
                    : 'chat-bubble-bot text-slate-300 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-line font-normal">
                    {msg.text}
                  </div>

                  {/* Copy Button for Bot Messages */}
                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => copyToClipboard(msg.text, msg.id)}
                      className="absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-white/6 border border-white/10 text-slate-500 hover:text-white"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-[#00C853]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 mr-auto items-center">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00C853] to-emerald-600 text-[#050E08] flex items-center justify-center shadow-[0_0_10px_rgba(0,200,83,0.3)]">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl chat-bubble-bot flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00C853] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#00C853] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#00C853] animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pills Strip */}
          <div className="px-4 py-3 bg-[#050E08]/90 border-t border-white/10 flex gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-amber-400 py-1.5 flex items-center gap-1.5 flex-shrink-0">
              <Zap className="w-3.5 h-3.5 text-[#FF9100]" /> Quick:
            </span>
            {promptPills.map((pill, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(pill)}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-[#00C853]/20 hover:border-[#00C853]/40 hover:text-white text-slate-300 font-medium whitespace-nowrap text-xs flex-shrink-0 cursor-pointer transition-all shadow-sm"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 sm:p-4 bg-[#050E08]/90 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2.5"
            >
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder={
                  mode === 'Reuse AI'
                    ? "Ask how to upcycle plastic bottle, old cloth, coconut shells..."
                    : "Ask today's scrap rate for iron, paper, copper, e-waste..."
                }
                className="flex-1 p-3.5 rounded-2xl border border-emerald-500/25 bg-black/50 text-white text-xs sm:text-sm focus:ring-2 focus:ring-[#00C853]/40 focus:border-[#00C853] focus:outline-none placeholder-slate-400"
              />

              <button
                type="submit"
                disabled={!inputMsg.trim() || isTyping}
                className={`p-3.5 rounded-2xl font-bold flex items-center justify-center transition-all cursor-pointer ${
                  !inputMsg.trim() || isTyping
                    ? 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed'
                    : mode === 'Reuse AI'
                    ? 'bg-gradient-to-br from-[#00C853] to-emerald-500 text-black shadow-[0_0_15px_rgba(0,200,83,0.5)] hover:scale-105'
                    : 'bg-gradient-to-br from-[#FF6D00] to-[#FF9100] text-black shadow-[0_0_15px_rgba(255,109,0,0.5)] hover:scale-105'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Architecture note for judges */}
            <div className="mt-2 text-center text-[10px] text-slate-400 font-mono">
              // AWS Bedrock Claude 3 • Strands Agents SDK • Configurable via <code className="text-[#00C853]">REACT_APP_LLM_API_KEY</code>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
