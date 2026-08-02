import React, { useState, useEffect } from 'react';
import { Job, PaymentTransaction } from '../types';
import { ShieldAlert, TrendingUp, Users, Building2, Briefcase, CreditCard, Code2, CheckCircle2, XCircle, Download } from 'lucide-react';

interface AdminDashboardProps {
  jobs: Job[];
  onOpenDocs: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ jobs, onOpenDocs }) => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAnalyticsData(data.analytics);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* ADMIN TITLE HEADER */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" /> Platform Command Center
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Rozgar Pakistan Administration</h1>
          <p className="text-xs text-slate-500 mt-0.5">Platform telemetry, job moderation, JazzCash revenue, and database schemas</p>
        </div>

        <button
          onClick={onOpenDocs}
          className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 font-semibold text-xs flex items-center gap-2 transition-all"
        >
          <Code2 className="w-4 h-4 text-indigo-600" />
          <span>Export Schema & Docker</span>
        </button>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Total Job Seekers</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {analyticsData?.totalSeekers || 1420}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">+18% this month</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Verified Employers</span>
            <Building2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {analyticsData?.totalEmployers || 185}
          </div>
          <div className="text-[11px] text-indigo-600 font-medium">+12 new companies</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Active Job Listings</span>
            <Briefcase className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {jobs.length}
          </div>
          <div className="text-[11px] text-amber-600 font-medium">100% Moderated</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Subscription Revenue (PKR)</span>
            <CreditCard className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-600 font-mono">
            PKR {(analyticsData?.revenuePKR || 180000).toLocaleString()}
          </div>
          <div className="text-[11px] text-indigo-600 font-medium">JazzCash & Easypaisa</div>
        </div>

      </div>

      {/* RECENT TRANSACTIONS LEDGER */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-indigo-600" /> Employer Payment Transactions (JazzCash / Easypaisa)
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Tx ID</th>
                <th className="px-4 py-3">Employer</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method & Ref</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(analyticsData?.transactions || []).map((tx: PaymentTransaction) => (
                <tr key={tx.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-mono text-slate-400">{tx.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{tx.employerName}</td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">{tx.planName}</td>
                  <td className="px-4 py-3 font-mono text-slate-900 font-bold">PKR {tx.amountPKR.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600">{tx.paymentMethod} ({tx.accountNumberOrRef})</td>
                  <td className="px-4 py-3 text-slate-500">{tx.transactionDate}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
