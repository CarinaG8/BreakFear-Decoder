import React, { useState, useEffect } from 'react';
import { AppState, DecoderResponse, UserInfo } from '../types';
import { decodeFear } from '../services/geminiService';
import { ArrowRight, RefreshCcw, Lock, ShieldAlert, Zap, Infinity, Terminal, AlertTriangle, Copy, Check } from 'lucide-react';

interface DecoderAppProps {
  setAppState: (state: AppState) => void;
  userInfo?: UserInfo;
}

export const DecoderApp: React.FC<DecoderAppProps> = ({ setAppState, userInfo }) => {
  const isPremium = userInfo?.isPremium || false;

  // Usage tracking
  const checkUsageHistory = () => {
    const deviceUsed = localStorage.getItem('breakfear_device_used') === 'true';
    const emailUsed = userInfo?.email ? localStorage.getItem(`breakfear_usage_${userInfo.email}`) === 'true' : false;
    return deviceUsed || emailUsed;
  };

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DecoderResponse | null>(null);
  const [error, setError] = useState('');
  const [hasUsedFree, setHasUsedFree] = useState<boolean>(() => checkUsageHistory());
  const [placeholder, setPlaceholder] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Loading State Sequence
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingMessages = [
    "Establishing secure link...",
    "Accessing Kayela Memory Core...",
    "Detecting ego resistance...",
    "Applying Radical Responsibility filter...",
    "Synthesizing truth...",
    "Calibrating response..."
  ];

  useEffect(() => {
    if (checkUsageHistory()) {
      setHasUsedFree(true);
    }
  }, [userInfo]);

  // Loading text cycle effect
  useEffect(() => {
    let interval: any;
    if (loading) {
        setLoadingStep(0);
        interval = setInterval(() => {
            setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
        }, 800); // Change message every 800ms
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Typewriter Placeholder Effect
  useEffect(() => {
    if (loading || result) return;
    
    const prompts = [
        "What conversation are you avoiding?",
        "What decision are you delaying?",
        "Where are you pretending to be confused?",
        "Dump the raw data here..."
    ];
    let currentPromptIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let pause = false;

    const type = () => {
        const currentPrompt = prompts[currentPromptIndex];
        
        if (pause) return;

        if (isDeleting) {
            setPlaceholder(currentPrompt.substring(0, currentCharIndex - 1));
            currentCharIndex--;
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentPromptIndex = (currentPromptIndex + 1) % prompts.length;
            }
        } else {
            setPlaceholder(currentPrompt.substring(0, currentCharIndex + 1));
            currentCharIndex++;
            if (currentCharIndex === currentPrompt.length) {
                pause = true;
                setTimeout(() => {
                    pause = false;
                    isDeleting = true;
                }, 2000); // Wait before deleting
            }
        }
    };

    const intervalId = setInterval(type, isDeleting ? 50 : 100);
    return () => clearInterval(intervalId);
  }, [loading, result]);

  const markAsUsed = () => {
    localStorage.setItem('breakfear_device_used', 'true');
    if (userInfo?.email) {
      localStorage.setItem(`breakfear_usage_${userInfo.email}`, 'true');
    }
    setHasUsedFree(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (hasUsedFree && !isPremium) {
      setAppState(AppState.PAYWALL);
      return;
    }

    if (!input.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await decodeFear(input);
      setResult(response);
      
      if (!response.isCrisis && !isPremium) {
        markAsUsed();
      }
    } catch (err) {
      console.error(err);
      setError('Connection disrupted. The Core could not process this input. Please refine and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (result?.isCrisis) {
        setResult(null);
        setInput('');
        return;
    }
    if (hasUsedFree && !isPremium) {
      setAppState(AppState.PAYWALL);
    } else {
      setResult(null);
      setInput('');
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const textToCopy = `BREAKFEAR DECODER\n\nINSIGHT: ${result.insight}\n\nDIRECTIVE: ${result.practicalTask}\n\nINQUIRY: ${result.followUpPrompt}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusIndicator = () => {
    if (isPremium) {
      return (
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm border text-cyan-400 border-cyan-900 bg-cyan-900/10 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
          <Infinity className="w-3 h-3" /> Signal: Unlimited
        </div>
      );
    }
    if (hasUsedFree) {
      return (
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm border text-red-400 border-red-900 bg-red-900/10">
          <Lock className="w-3 h-3" /> Signal: Limit Reached
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm border text-gold border-gold/30 bg-gold/5">
        <Zap className="w-3 h-3" /> Signal: Trial Active
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center p-6 font-sans animate-fade-in relative z-10">
      
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center py-6 border-b border-white/10 mb-12">
        <h1 className="text-lg font-serif font-bold tracking-widest text-white cursor-pointer hover:text-gold transition-colors" onClick={() => setAppState(AppState.LANDING)}>
          BREAKFEAR
        </h1>
        <div className="flex items-center gap-4">
            {userInfo && (
                <span className="text-[10px] text-gray-600 hidden md:inline-block uppercase tracking-widest font-mono">Sub: {userInfo.name}</span>
            )}
            {getStatusIndicator()}
        </div>
      </header>

      <main className="w-full max-w-3xl flex-1 flex flex-col justify-center mb-12">
        {!result ? (
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-10 text-center leading-tight">
              {userInfo ? `Welcome, ${userInfo.name}.` : 'Welcome.'} <br/>
              <span className="text-gray-600 italic text-2xl md:text-4xl block mt-3 font-light">Target the Blockage.</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="relative group">
              {/* Decorative Glow - Added pointer-events-none to prevent click blocking */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/20 to-white/10 rounded-sm blur opacity-0 group-hover:opacity-100 transition duration-1000 pointer-events-none"></div>
              
              {/* Content Container - Added z-10 to ensure clickability */}
              <div className="relative z-10">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-black border border-white/10 text-gray-200 p-8 text-lg md:text-xl rounded-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all h-64 md:h-80 resize-none placeholder-gray-700 font-serif leading-relaxed"
                  disabled={loading}
                  spellCheck={false}
                />
                <div className="absolute bottom-4 right-4 text-[10px] text-gray-700 uppercase tracking-widest font-mono pointer-events-none">
                    {input.length > 0 ? `${input.length} chars` : 'System Ready'}
                </div>
              </div>
              
              {error && (
                <div className="mt-6 p-4 bg-red-950/30 border border-red-900/50 flex items-center gap-3 animate-fade-in">
                   <AlertTriangle className="text-red-500 w-5 h-5" />
                   <p className="text-red-200 font-mono text-sm">{error}</p>
                </div>
              )}

              <div className="mt-8 flex justify-center h-16 relative z-20">
                {loading ? (
                   <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="flex items-center gap-3 text-gold font-mono text-sm uppercase tracking-widest">
                            <Terminal className="w-4 h-4 animate-pulse" />
                            <span className="animate-pulse">{loadingMessages[loadingStep]}</span>
                        </div>
                        <div className="w-48 h-0.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gold animate-pulse" style={{width: '100%'}}></div>
                        </div>
                   </div>
                ) : (
                  <>
                    {hasUsedFree && !isPremium ? (
                      <button
                        type="button"
                        onClick={() => setAppState(AppState.PAYWALL)}
                        className="flex items-center gap-3 px-10 py-4 bg-gold text-obsidian hover:bg-white font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] border border-gold/50 cursor-pointer"
                      >
                        <Lock className="w-4 h-4" /> Unlock Signal
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!input.trim()}
                        className={`flex items-center gap-3 px-10 py-4 ${!input.trim() ? 'opacity-50 cursor-not-allowed bg-gray-900 text-gray-500' : 'bg-white hover:bg-gold text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer'} font-bold uppercase tracking-[0.15em] transition-all duration-300 border border-white/20`}
                      >
                        Initialize Decoder <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </form>
          </div>
        ) : result.isCrisis ? (
            <div className="animate-fade-in flex flex-col items-center justify-center text-center">
                <div className="bg-red-950/30 border border-red-500/50 p-12 rounded-sm max-w-2xl backdrop-blur-md shadow-[0_0_50px_rgba(220,38,38,0.1)]">
                    <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-2xl font-bold text-white mb-4 tracking-[0.2em]">PROTOCOL ALERT</h2>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed font-light">
                        {result.practicalTask}
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
                        <a href="tel:988" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-sm shadow-lg transition-all uppercase tracking-widest text-sm">
                            Call 988
                        </a>
                    </div>
                    <button
                        onClick={handleReset}
                        className="text-gray-500 hover:text-white text-[10px] uppercase tracking-widest underline decoration-gray-700 underline-offset-4 hover:decoration-white transition-all"
                    >
                        Return to Decoder
                    </button>
                </div>
            </div>
        ) : (
          <div className="animate-fade-in space-y-8 pb-12">
            {/* Insight Card */}
            <div className="relative bg-charcoal/50 border-l-2 border-gold pl-8 py-6 pr-4 animate-slide-up" style={{animationDelay: '0.1s'}}>
               <div className="absolute top-0 right-0 p-2 flex gap-2">
                   <button 
                    onClick={handleCopy}
                    className="p-2 text-gray-600 hover:text-gold transition-colors"
                    title="Copy Transmission"
                   >
                     {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                   </button>
               </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4 font-mono"> Lens: {result.philosophicalLens}</p>
              <h3 className="text-2xl md:text-4xl font-serif text-gray-100 leading-relaxed tracking-tight pr-8">
                "{result.insight}"
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {/* Practical Task */}
              <div className="bg-white/5 p-8 border border-white/5 hover:border-gold/30 transition-colors group animate-slide-up" style={{animationDelay: '0.3s'}}>
                <h4 className="text-gray-400 group-hover:text-gold font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2 font-mono transition-colors">
                  <Terminal className="w-4 h-4"/> Directive
                </h4>
                <p className="text-gray-300 leading-relaxed text-lg font-light">
                  {result.practicalTask}
                </p>
              </div>

              {/* Inquiry */}
              <div className="bg-white/5 p-8 border border-white/5 hover:border-gold/30 transition-colors group animate-slide-up" style={{animationDelay: '0.5s'}}>
                 <h4 className="text-gray-400 group-hover:text-gold font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2 font-mono transition-colors">
                  <ArrowRight className="w-4 h-4"/> Inquiry
                </h4>
                <p className="text-gray-300 leading-relaxed italic text-lg font-serif">
                  "{result.followUpPrompt}"
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-16 animate-fade-in" style={{animationDelay: '1s'}}>
              <button
                onClick={handleReset}
                className="group flex items-center gap-3 px-8 py-3 border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all uppercase text-xs tracking-[0.2em] font-bold"
              >
                {(hasUsedFree && !isPremium) ? <Lock className="w-3 h-3 text-gold" /> : <RefreshCcw className="w-3 h-3" />}
                {(hasUsedFree && !isPremium) ? 'Unlock Full Access' : 'Decode Another Fear'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};