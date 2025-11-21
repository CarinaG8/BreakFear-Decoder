import React, { useEffect, useState } from 'react';
import { UserInfo } from '../types';
import { Check, Terminal, Infinity, Zap } from 'lucide-react';

interface WelcomeSequenceProps {
  userInfo?: UserInfo;
  onComplete: () => void;
}

export const WelcomeSequence: React.FC<WelcomeSequenceProps> = ({ userInfo, onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timeline = [
      1000, // 0: Payment Verified
      2500, // 1: Identity Confirmed
      4500, // 2: Unlocking Core
      6500, // 3: Granting Clearance
      8500  // 4: Welcome Message
    ];

    const timeouts = timeline.map((time, index) => 
      setTimeout(() => setStep(index + 1), time)
    );

    const finalTimeout = setTimeout(() => {
        onComplete(); // Auto dismiss after animation
    }, 12000);

    return () => {
        timeouts.forEach(clearTimeout);
        clearTimeout(finalTimeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono p-6 text-center">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        
        {/* Step 1: Payment Verified */}
        <div className={`transition-all duration-700 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-center gap-3 text-gold mb-2">
             <Check className="w-6 h-6" />
             <span className="uppercase tracking-[0.2em] text-lg">Transaction Verified</span>
          </div>
          <div className="h-px w-full bg-gold/30"></div>
        </div>

        {/* Step 2: Identity */}
        <div className={`transition-all duration-700 delay-100 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
           <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Subject Identity</p>
           <h2 className="text-2xl text-white font-serif">{userInfo?.name || 'Unknown Traveler'}</h2>
           <p className="text-gold/60 text-xs">{userInfo?.email}</p>
        </div>

        {/* Step 3: Core Access */}
        <div className={`transition-all duration-700 delay-100 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
           <div className="bg-white/5 border border-white/10 p-4 rounded-sm flex items-center gap-4">
              <Infinity className="w-8 h-8 text-cyan-400 animate-pulse" />
              <div className="text-left">
                 <h3 className="text-white text-sm font-bold uppercase tracking-wider">Signal: Unlimited</h3>
                 <p className="text-gray-500 text-[10px]">Restrictions Removed.</p>
              </div>
           </div>
        </div>

        {/* Step 4: Welcome */}
        <div className={`transition-all duration-700 delay-100 ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Welcome to<br/><span className="text-gold italic">The Circle.</span></h1>
            <button 
                onClick={onComplete}
                className="px-8 py-3 bg-gold text-obsidian font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
                Enter Protocol
            </button>
        </div>

        {/* Terminal Loader */}
        {step < 5 && (
            <div className="absolute bottom-12 left-0 w-full flex justify-center">
                 <div className="flex items-center gap-2 text-gray-600 text-xs uppercase tracking-[0.3em]">
                    <Terminal className="w-3 h-3 animate-pulse" />
                    Initializing...
                 </div>
            </div>
        )}

      </div>
    </div>
  );
};