import React, { useState } from 'react';
import { ArrowRight, Loader2, Lock, FileText, AlertTriangle } from 'lucide-react';
import { UserInfo } from '../types';
import { saveUserToExternalStorage } from '../services/storageService';

interface DisclaimerProps {
  onConfirm: (info: UserInfo) => void;
  onBack: () => void;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ onConfirm, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedSafety, setAgreedSafety] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usageError, setUsageError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If usage error is already displayed and user clicks again, we allow them through
    // so they can reach the upgrade/paywall screen inside DecoderApp.
    if (usageError) {
        onConfirm({ name, email });
        return;
    }

    // Guardrail Check
    const deviceUsed = localStorage.getItem('breakfear_device_used') === 'true';
    const emailUsed = localStorage.getItem(`breakfear_usage_${email}`) === 'true';
    const isPremium = localStorage.getItem('breakfear_is_premium') === 'true';

    if (!isPremium && (deviceUsed || emailUsed)) {
      setUsageError(true);
      return;
    }

    if (agreedTerms && agreedSafety && name && email && !isSubmitting) {
      setIsSubmitting(true);
      
      try {
        // Attempt to save to external storage
        await saveUserToExternalStorage({ name, email });
        
        // Proceed regardless of storage success/failure
        onConfirm({ name, email });
      } catch (error) {
        console.error("Protocol error", error);
        onConfirm({ name, email });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center p-6">
      <div className="max-w-2xl w-full animate-fade-in">
        <header className="mb-8 text-center">
          <h2 className="text-2xl font-serif text-white mb-2">Protocol Access</h2>
          <div className="h-px w-24 bg-gold mx-auto"></div>
        </header>

        <div className="bg-charcoal/50 border border-white/10 p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
          
          {/* Usage Error Overlay/Message */}
          {usageError && (
             <div className="mb-6 bg-red-900/20 border border-red-500/30 p-4 flex items-start gap-3 animate-fade-in rounded-sm">
                <Lock className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-1">Protocol Alert</h4>
                    <p className="text-sm text-red-200">
                        This identity has already utilized the free decoding session. 
                        <br/>Please upgrade to access the Memory Core.
                    </p>
                </div>
             </div>
          )}

          {/* Detailed Terms Scrollbox */}
          {!usageError && (
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2 text-gold/80">
                    <FileText className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Terms of Protocol</span>
                </div>
                <div className="bg-black/60 border border-white/10 p-4 h-48 overflow-y-auto text-xs font-mono text-gray-400 space-y-4 custom-scrollbar rounded-sm shadow-inner">
                    
                    {/* CRITICAL SAFETY WARNING */}
                    <div className="bg-red-900/10 border border-red-500/20 p-3 mb-4 rounded-sm">
                        <div className="flex items-center gap-2 mb-1 text-red-400">
                            <AlertTriangle className="w-3 h-3" />
                            <strong className="uppercase tracking-widest text-[10px]">Critical Safety Warning</strong>
                        </div>
                        <p className="text-red-200/80 leading-relaxed">
                            IF YOU ARE IN IMMEDIATE DANGER, EXPERIENCING A MEDICAL EMERGENCY, OR HAVING THOUGHTS OF SELF-HARM: 
                            <strong className="text-white"> CALL 911 OR 988 (SUICIDE & CRISIS LIFELINE) IMMEDIATELY.</strong> 
                            THIS TOOL IS A PHILOSOPHICAL SIMULATION ONLY. IT CANNOT SAVE YOU.
                        </p>
                    </div>

                    <p className="text-gold/70 uppercase border-b border-white/10 pb-2 mb-2">
                        By initializing this interface, you acknowledge the following:
                    </p>
                    
                    <p>
                        <strong className="text-gray-200">1. NOT MEDICAL ADVICE:</strong> The "Breakfear Decoder" utilizes artificial intelligence (LLM) for philosophical simulation and entertainment purposes only. It is NOT a substitute for professional psychological, psychiatric, or medical advice, diagnosis, or treatment. 
                    </p>

                    <p>
                        <strong className="text-gray-200">2. AI LIMITATIONS & HALLUCINATIONS:</strong> The system may generate incorrect, offensive, or nonsensical information ("hallucinations"). The user accepts that all output is synthetic and should be evaluated with critical judgment.
                    </p>

                    <p>
                        <strong className="text-gray-200">3. LIMITATION OF LIABILITY:</strong> You voluntarily assume all risks associated with the use of this application. The creators, developers, and hosting providers are hereby released from any liability regarding decisions made, actions taken, or psychological states experienced based on the AI's output.
                    </p>

                    <p>
                        <strong className="text-gray-200">4. DATA PRIVACY & THIRD PARTIES:</strong> Your inputs are processed via the Google Gemini API. While we do not sell your data to third parties, your inputs are subject to processing by external AI providers. Do not input confidential, incriminating, or highly sensitive personally identifiable information (PII).
                    </p>

                    <p>
                        <strong className="text-gray-200">5. AGE REQUIREMENT:</strong> You confirm that you are at least 18 years of age.
                    </p>
                </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Identity (Name)</label>
                <input 
                    type="text" 
                    required
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-black/40 border border-white/10 p-3 text-white text-sm focus:border-gold focus:outline-none transition-colors placeholder-gray-700 disabled:opacity-50"
                />
                </div>
                
                <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Contact (Email)</label>
                <input 
                    type="email" 
                    required
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (usageError) setUsageError(false); // Reset error on change
                    }}
                    disabled={isSubmitting}
                    className={`w-full bg-black/40 border p-3 text-white text-sm focus:outline-none transition-colors placeholder-gray-700 disabled:opacity-50 ${usageError ? 'border-red-500/50 text-red-200' : 'border-white/10 focus:border-gold'}`}
                />
                </div>
            </div>

            <div className="space-y-3 pt-2">
              {/* Checkbox 1: Age & Terms */}
              <label className="flex items-start gap-3 cursor-pointer group p-2 hover:bg-white/5 transition-colors rounded-sm">
                <div className={`w-5 h-5 border border-white/30 flex items-center justify-center transition-colors mt-0.5 shrink-0 ${agreedTerms ? 'bg-gold border-gold' : 'group-hover:border-white'}`}>
                  {agreedTerms && <span className="text-black text-xs font-bold">✓</span>}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  disabled={isSubmitting}
                />
                <span className="text-xs text-gray-400 select-none leading-relaxed">
                  I certify I am 18+ and I have read the <span className="text-gray-300">Terms of Protocol</span>.
                </span>
              </label>

              {/* Checkbox 2: Safety/Emergency Protocol */}
              <label className="flex items-start gap-3 cursor-pointer group p-2 hover:bg-red-900/10 transition-colors rounded-sm">
                <div className={`w-5 h-5 border border-white/30 flex items-center justify-center transition-colors mt-0.5 shrink-0 ${agreedSafety ? 'bg-red-500 border-red-500' : 'group-hover:border-red-400'}`}>
                  {agreedSafety && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={agreedSafety}
                  onChange={(e) => setAgreedSafety(e.target.checked)}
                  disabled={isSubmitting}
                />
                <span className="text-xs text-gray-400 select-none leading-relaxed">
                  I understand this is <span className="text-red-400 font-bold">NOT</span> an emergency service. If I am in crisis, I will call 911 or 988.
                </span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={(!agreedTerms || !agreedSafety || !name || !email) && !usageError}
              className={`w-full py-4 font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg
                ${usageError 
                    ? 'bg-gold text-black hover:bg-white' 
                    : (agreedTerms && agreedSafety && name && email && !isSubmitting) ? 'bg-white text-black hover:bg-gold' : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Securing Identity...
                </>
              ) : usageError ? (
                <>
                  Proceed to Upgrade <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Initialize Session <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <button 
            type="button" 
            onClick={onBack}
            disabled={isSubmitting}
            className="w-full text-center mt-6 text-[10px] text-gray-600 hover:text-white transition-colors disabled:opacity-50 uppercase tracking-widest"
          >
            Abort
          </button>
        </div>
      </div>
    </div>
  );
};