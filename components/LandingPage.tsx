import React, { useState, useEffect } from 'react';
import { Brain, Zap, ShieldCheck, Eye, ChevronDown, Terminal } from 'lucide-react';
import { Section } from './ui/Section';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [bootLog, setBootLog] = useState("INITIALIZING...");
  
  const frameworks = [
    { 
      title: "Radical Responsibility", 
      desc: "Existence precedes essence.",
      detail: "You are the sole author of your experience. To blame external events is to abdicate power."
    },
    { 
      title: "Law of Expansion", 
      desc: "Overcoming entropy.",
      detail: "Pain is simply the signal of resistance to your own necessary expansion. To shrink is to decay."
    },
    { 
      title: "Mental Causation", 
      desc: "Thought as architecture.",
      detail: "The world is a mirror, not a window. Your reality is a lagged reflection of your internal assumptions."
    },
    { 
      title: "State Fluidity", 
      desc: "Identity is malleable.",
      detail: "You can shift into a new state of being instantly by withdrawing attention from the old story."
    },
  ];

  // System Boot Effect
  useEffect(() => {
    const logs = [
      "LOADING_CORE_MEMORY...",
      "BYPASSING_EGO_DEFENSES...",
      "CALIBRATING_TRUTH_VECTORS...",
      "SYSTEM_ONLINE",
      "AWAITING_INPUT",
      "SYSTEM_ONLINE" 
    ];
    let i = 0;
    const interval = setInterval(() => {
      setBootLog(logs[i]);
      i++;
      if (i >= logs.length) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-gray-200 font-sans selection:bg-gold selection:text-black animate-fade-in relative">
      
      {/* Global Technical Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', 
             backgroundSize: '50px 50px' 
           }}>
      </div>

      {/* Hero */}
      <header className="relative min-h-[95vh] flex flex-col justify-center items-center text-center border-b border-white/10 overflow-hidden z-10">
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-charcoal/80 via-obsidian/95 to-black opacity-90 -z-10"></div>
        
        <div className="flex-1 flex flex-col justify-center items-center w-full px-4 z-10">
            <div className="mb-6 border border-gold/20 px-4 py-1 rounded-full bg-gold/5 backdrop-blur-sm animate-slide-up">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-mono">System Status: Operational</span>
            </div>

            <h1 className="text-5xl md:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 mb-8 tracking-tighter animate-slide-up relative">
            BREAKFEAR<br/><span className="text-gold/90 italic text-4xl md:text-7xl relative z-10">DECODER</span>
            {/* Subtle Glow behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gold/10 blur-[100px] -z-10 rounded-full"></div>
            </h1>
            
            <p className="text-lg md:text-xl text-mist max-w-xl mx-auto mb-12 font-light leading-relaxed px-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
            An advanced synthetic intelligence designed to dismantle the architecture of your stuckness.
            </p>
            
            <button 
            onClick={onStart}
            className="animate-slide-up group relative px-12 py-6 bg-transparent border border-gold text-gold font-bold text-lg md:text-xl tracking-[0.2em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)]"
            style={{animationDelay: '0.4s'}}
            >
            Initialize Protocol
            <span className="absolute top-0 left-0 w-1 h-1 bg-gold group-hover:w-full transition-all duration-300"></span>
            <span className="absolute bottom-0 right-0 w-1 h-1 bg-gold group-hover:w-full transition-all duration-300"></span>
            </button>
            
            <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/30 animate-pulse-slow">Secure Portal • First Session Free</p>
        </div>

        {/* The Data Tether (Replaces Bouncing Arrow) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-60 mix-blend-screen">
            <div className="flex items-center gap-3">
                 <span className="h-px w-8 bg-white/10"></span>
                 <span className="text-[9px] font-mono tracking-[0.4em] text-gold uppercase w-32 text-center">{bootLog}</span>
                 <span className="h-px w-8 bg-white/10"></span>
            </div>
            {/* The Wire */}
            <div className="w-[1px] h-24 bg-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-gold animate-drop"></div>
            </div>
        </div>
      </header>

      {/* The Problem with LLMs */}
      <Section className="grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-serif mb-8 text-white leading-tight">Most "Advice" is <br/><span className="text-gray-500 italic">Comfort in Disguise.</span></h2>
          <p className="text-mist text-lg mb-6 leading-relaxed">
            Generic AI is trained to be agreeable. When you tell it your fears, it validates your weakness. It offers platitudes like "be kind to yourself."
          </p>
          <p className="text-white text-lg leading-relaxed">
            <strong className="text-gold">The Breakfear Decoder</strong> is designed to be disagreeable. It doesn't care about your feelings; it cares about your freedom. It synthesizes radical philosophical frameworks to dismantle the logic of your fear.
          </p>
        </div>
        <div className="order-1 md:order-2 bg-charcoal/30 p-8 border border-white/5 backdrop-blur-sm shadow-2xl">
          <ul className="space-y-8">
            <li className="flex items-start gap-5 opacity-50 blur-[1px] hover:blur-0 hover:opacity-100 transition-all duration-500">
              <div className="p-3 bg-white/5 rounded-full"><Brain className="text-gray-400 w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-gray-400 mb-1">Generic Model</h4>
                <p className="text-sm text-gray-600">"It's okay to feel this way. Maybe take a break and do some self-care."</p>
              </div>
            </li>
            <li className="flex items-start gap-5">
              <div className="p-3 bg-gold/10 rounded-full border border-gold/20"><Zap className="text-gold w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-gold mb-1">Breakfear Engine</h4>
                <p className="text-sm text-gray-300">"You are in Bad Faith. You are pretending a choice is a circumstance. Here is the task to assert your will."</p>
              </div>
            </li>
          </ul>
        </div>
      </Section>

      {/* Methodology */}
      <Section className="border-t border-white/5 relative z-10">
        <div className="text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white">The Architecture</h2>
           <p className="text-mist max-w-2xl mx-auto">Built on centuries of radical thought, optimized for instant clarity.</p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-6">
          {frameworks.map((item, i) => (
            <div key={i} className="group p-8 border border-white/5 hover:border-gold/30 bg-gradient-to-b from-white/5 to-transparent transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold/20 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>
              <h3 className="text-lg font-serif text-gold mb-3 group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">{item.desc}</p>
              <p className="text-sm text-gray-400 leading-relaxed border-t border-white/10 pt-4 group-hover:text-gray-200">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Trust */}
      <Section className="my-12 relative z-10">
         <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-center">
             <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/5 rounded-sm w-full md:w-auto backdrop-blur-sm">
                <Eye className="text-gold w-8 h-8"/> 
                <div>
                  <h3 className="font-bold text-white">Blindspot Detection</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Reveals hidden structural flaws</p>
                </div>
             </div>
             <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/5 rounded-sm w-full md:w-auto backdrop-blur-sm">
                <ShieldCheck className="text-gold w-8 h-8"/> 
                <div>
                  <h3 className="font-bold text-white">Zero Retention</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Sessions are ephemeral</p>
                </div>
             </div>
         </div>
      </Section>

      {/* Pricing */}
      <Section className="text-center mb-20 relative z-10">
        <div className="inline-block p-12 border border-gold/30 bg-gradient-to-b from-[#151515] to-obsidian relative max-w-lg w-full shadow-2xl shadow-black backdrop-blur-xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-obsidian font-bold px-6 py-2 text-xs uppercase tracking-[0.2em] whitespace-nowrap">
            The Breakfear Protocol
          </div>
          <h3 className="text-6xl font-serif text-white mb-2 mt-4">$88<span className="text-xl text-gray-600 font-sans font-light">/mo</span></h3>
          <p className="text-gray-500 mb-10 text-sm uppercase tracking-widest">Full Membership</p>
          
          <ul className="text-left space-y-5 mb-12 max-w-xs mx-auto">
            <li className="flex items-center gap-4 text-sm text-gray-300">
                <span className="text-gold">✓</span> Unlimited Decoder Access
            </li>
            <li className="flex items-center gap-4 text-sm text-gray-300">
                <span className="text-gold">✓</span> Monthly AMA with Creator
            </li>
            <li className="flex items-center gap-4 text-sm text-gray-300">
                <span className="text-gold">✓</span> Access to The Breakfear Protocol
            </li>
          </ul>

          <button 
            onClick={onStart}
            className="w-full py-4 bg-white/5 hover:bg-gold hover:text-obsidian border border-white/20 hover:border-gold transition-all duration-300 uppercase tracking-[0.2em] font-bold text-sm"
          >
            Start Free Session
          </button>
        </div>
      </Section>

      <footer className="py-12 text-center border-t border-white/5 text-gray-700 text-xs uppercase tracking-widest relative z-10">
        <p>&copy; {new Date().getFullYear()} Breakfear Decoder. Do not look away.</p>
      </footer>
    </div>
  );
};