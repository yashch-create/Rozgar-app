import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, ShieldCheck, Zap } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../data/mockData';
import { SubscriptionPlan } from '../types';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: SubscriptionPlan, paymentMethod: string, accountRef: string) => Promise<void>;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onSelectPlan }) => {
  if (!isOpen) return null;

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'JazzCash' | 'Easypaisa' | 'Credit/Debit Card'>('JazzCash');
  const [accountRef, setAccountRef] = useState('03001234567');
  const [processing, setProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setProcessing(true);
    try {
      await onSelectPlan(selectedPlan, paymentMethod, accountRef);
      setSuccessMsg(`Plan ${selectedPlan.name} upgraded successfully via ${paymentMethod}!`);
      setTimeout(() => {
        setSuccessMsg('');
        setSelectedPlan(null);
        onClose();
      }, 2000);
    } catch (err) {
      alert('Payment processing failed.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200/90 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden text-slate-800 my-8">
        
        {/* HEADER */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <Zap className="w-4 h-4" /> Employer Subscription Plans
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Hire Top Talent Across Pakistan</h2>
          </div>

          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          
          {successMsg ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{successMsg}</h3>
              <p className="text-xs text-slate-500">Your employer job post quota has been expanded.</p>
            </div>
          ) : selectedPlan ? (
            /* CHECKOUT FORM FOR JAZZCASH / EASYPAISA */
            <form onSubmit={handleCheckout} className="max-w-md mx-auto space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedPlan.name}</h3>
                  <p className="text-xs text-indigo-600 font-mono font-bold mt-0.5">PKR {selectedPlan.pricePKR.toLocaleString()}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPlan(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Change Plan
                </button>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Select Pakistani Payment Gateway</label>
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                  {['JazzCash', 'Easypaisa', 'Credit/Debit Card'].map(method => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setPaymentMethod(method as any)}
                      className={`p-2.5 rounded-xl border transition-all text-center ${
                        paymentMethod === method
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-600 font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {paymentMethod === 'Credit/Debit Card' ? 'Card Number' : `${paymentMethod} Account / Reference Mobile Number`}
                </label>
                <input
                  type="text"
                  required
                  value={accountRef}
                  onChange={(e) => setAccountRef(e.target.value)}
                  placeholder="0300 1234567 or Card #"
                  className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:outline-none font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPlan(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs disabled:opacity-50"
                >
                  {processing ? 'Processing Payment...' : `Pay PKR ${selectedPlan.pricePKR.toLocaleString()}`}
                </button>
              </div>
            </form>
          ) : (
            /* PLANS GRID */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SUBSCRIPTION_PLANS.map(plan => (
                <div
                  key={plan.id}
                  className={`bg-white border rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
                    plan.badge === 'Most Popular'
                      ? 'border-indigo-600 shadow-md scale-105'
                      : 'border-slate-200 shadow-2xs'
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-xs">
                      {plan.badge}
                    </span>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                    <div className="mt-3">
                      <span className="text-2xl font-extrabold text-slate-900 font-mono">
                        PKR {plan.pricePKR.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500"> / {plan.durationDays} days</span>
                    </div>

                    <ul className="mt-5 space-y-2.5 text-xs text-slate-600">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all"
                  >
                    Select {plan.name}
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
