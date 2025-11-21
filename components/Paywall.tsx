import React, { useState } from 'react';
import { AppState, UserInfo } from '../types';
import { Check, CreditCard, ArrowLeft, Lock, Loader2, Database, Radio, Users } from 'lucide-react';

interface PaywallProps {
  setAppState: (state: AppState) => void;
  userInfo?: UserInfo;
}

export const Paywall: React.FC<PaywallProps> = ({ setAppState, userInfo }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePayment = () => {
    setIsLoading(true);
    
    // 1. Base Stripe Payment Link
    let paymentUrl = "https://buy.stripe.com/3cI8wP0fv4WG6dfadG8Ra02";

    // 2. UX Improvement: Pre-fill the email if we have it
    if (userInfo?.email) {
      paymentUrl += `?prefilled_email=${encodeURIComponent(userInfo.email)}`;
    }

    // 3. Redirect
    window.location.href = paymentUrl;
  };

  return (
    <div className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-md w-full bg-charcoal border border-gold/30 p-8 relative overflow-hidden shadow-2xl shadow-gold/10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        
        <div className="flex justify-center mb-6">
             <div className="p-3 bg-gold/10 rounded-full border border-gold/20">
                 <Lock className="w-6 h-6 text-gold" />
             </div>
        </div>

        <h2 className="text-3xl font-serif text-center mb-2 text-white">The Gateway</h2>
        <p className="text-center text-gray-500 mb-8 text-xs uppercase tracking-widest">Signal Limit Reached. Investment Required.</p>

        <div className="space-y-6 mb-8 border-t border-b border-white/5 py-6">
          <div className="flex items-start gap-4">
            <div className="bg-gold/10 p-1 rounded-full mt-1">
              <Check className="w-4 h-4 text-gold" />
            </div>
            <div>
              <h4 className="text-white font-bold flex items-center gap-2">
                 The Interface <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400">UNLIMITED</span>
              </h4>
              <p className="text-sm text-gray-500">Access the Kayela Memory Core 24/7.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
             <div className="bg-gold/10 p-1 rounded-full mt-1">
              <Radio className="w-4 h-4 text-gold" />
            </div>
            <div>
              <h4 className="text-white font-bold">Monthly Live Transmission</h4>
              <p className="text-sm text-gray-500 leading-relaxed mt-1">
                Entropy is default. Without a signal, you drift back to comfort. We override the noise. Not a webinar—a synchronization of reality. 45m Deconstruction. 15m Rapid Fire. One hour. Hard stop.
                <span className="text-gold block mt-2 font-mono text-xs uppercase tracking-widest">Operational Alignment // Dec 4 @ 0900 PST</span>
              </p>
            </div>
          </div>
           <div className="flex items-start gap-4">
             <div className="bg-gold/10 p-1 rounded-full mt-1">
              <Users className="w-4 h-4 text-gold" />
            </div>
            <div>
              <h4 className="text-white font-bold">The Breakfear Protocol</h4>
              <p className="text-sm text-gray-500">Operational base for reality decoding. Not a support group. Stop healing. Start deciding.</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <span className="text-4xl font-serif text-white">$88</span>
          <span className="text-gray-500">/month</span>
        </div>

        <button 
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full py-4 bg-gold hover:bg-white hover:text-black text-black font-bold uppercase tracking-widest transition-all mb-4 flex items-center justify-center gap-2 shadow-lg shadow-gold/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Redirecting...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4" /> Enter The Protocol
            </>
          )}
        </button>
        
        <button 
          onClick={() => setAppState(AppState.LANDING)}
          disabled={isLoading}
          className="w-full py-2 text-xs text-gray-600 hover:text-white uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <ArrowLeft className="w-3 h-3" /> Return to Home
        </button>
      </div>
    </div>
  );
};