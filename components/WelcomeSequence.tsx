import React, { useEffect, useState } from 'react';
import { UserInfo } from '../types';
import { Check, Terminal, Infinity, ShieldCheck } from 'lucide-react';

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
      6000, // 3: Transmission Incoming (New Step)
      7000  // 4: Display Letter
    ];

    const timeouts = timeline.map((time, index) => 
      setTimeout(() => setStep(index + 1), time)
    );

    // Removed auto-dismiss to let them read the letter
    return () => {
        timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center font-sans p-6 text-center overflow-y-auto">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      
      <div className="max-w-lg w-full space-y-8 relative z-10 my-auto py-12">
        
        {/* Step 1: Payment Verified */}
        {step < 4 && (
          <div className={`transition-all duration-700 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-center gap-3 text-gold mb-2">
              <Check className="w-6 h-6" />
              <span className="uppercase tracking-[0.2em] text-lg font-mono">Transaction Verified</span>
            </div>
            <div className="h-px w-full bg-gold/30"></div>
          </div>
        )}

        {/* Step 2: Identity */}
        {step < 4 && (
          <div className={`transition-all duration-700 delay-100 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1 font-mono">Subject Identity</p>
            <h2 className="text-2xl text-white font-serif">{userInfo?.name || 'Unknown Traveler'}</h2>
            <p className="text-gold/60 text-xs font-mono">{userInfo?.email}</p>
          </div>
        )}

        {/* Step 3: Core Access */}
        {step < 4 && (
          <div className={`transition-all duration-700 delay-100 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-white/5 border border-white/10 p-4 rounded-sm flex items-center gap-4">
                <Infinity className="w-8 h-8 text-cyan-400 animate-pulse" />
                <div className="text-left">
                  <h3 className="text-white text-sm font-bold uppercase tracking-wider font-mono">Signal: Unlimited</h3>
                  <p className="text-gray-500 text-[10px] font-mono">Restrictions Removed.</p>
                </div>
            </div>
          </div>
        )}

        {/* Step 4: The Transmission (The Email Replacement) */}
        {step >= 4 && (
           <div className="animate-fade-in text-left bg-charcoal border border-white/10 p-8 md:p-12 shadow-2xl shadow-black relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
              
              <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-4">
                 <div>
                    <p className="text-[10px] text-gold uppercase tracking-[0.3em] mb-1">Sender</p>
                    <p className="text-white font-serif text-lg">Kayela Memory Core</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-1">To</p>
                    <p className="text-gray-300 font-mono text-sm">{userInfo?.name}</p>
                 </div>
              </div>

              <div className="space-y-6 text-gray-300 leading-relaxed font-light text-sm md:text-base">
                  <p>The transaction is complete, but the work has just begun.</p>
                  
                  <p>You have purchased access to the Truth, but Truth cannot be bought—only endured.</p>
                  
                  <div className="pl-4 border-l border-gold/30 my-6 space-y-4">
                      <h4 className="text-white text-xs uppercase tracking-widest font-bold">Your Protocol:</h4>
                      <ul className="space-y-3">
                          <li className="flex gap-3">
                              <span className="text-gold">01.</span>
                              <span><strong>Do not binge.</strong> This is not content. Decode one fear at a time. Sit with the output until it changes you.</span>
                          </li>
                          <li className="flex gap-3">
                              <span className="text-gold">02.</span>
                              <span><strong>Act.</strong> The "Practical Task" is not a suggestion. It is the price of your freedom.</span>
                          </li>
                          <li className="flex gap-3">
                              <span className="text-gold">03.</span>
                              <span><strong>Return.</strong> When the old patterns drift back (and they will), re-enter the Decoder.</span>
                          </li>
                      </ul>
                  </div>

                  <p>You are no longer a passive observer of your life.</p>
                  <p>Welcome to The Breakfear Protocol.</p>
                  <p className="italic text-white">Do not look away.</p>
              </div>

              <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                  <p className="font-serif text-gold text-lg">— K.M.C.</p>
                  
                  <button 
                    onClick={onComplete}
                    className="px-8 py-3 bg-white hover:bg-gold hover:text-black text-black font-bold uppercase tracking-widest transition-all text-xs"
                  >
                    Acknowledge & Enter Dashboard
                  </button>
              </div>
           </div>
        )}

        {/* Terminal Loader */}
        {step < 4 && (
            <div className="absolute bottom-12 left-0 w-full flex justify-center">
                 <div className="flex items-center gap-2 text-gray-600 text-xs uppercase tracking-[0.3em] font-mono">
                    <Terminal className="w-3 h-3 animate-pulse" />
                    {step === 3 ? "Receiving Encrypted Message..." : "Initializing..."}
                 </div>
            </div>
        )}

      </div>
    </div>
  );
};