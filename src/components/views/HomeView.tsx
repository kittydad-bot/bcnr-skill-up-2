import React from 'react';
import { useApp } from '../../context/AppContext';
import { MainTopicsOverview } from '../MainTopicsOverview';
import { InstructorDashboardView } from './InstructorDashboardView';
import {
  Zap,
  ArrowRight,
  Settings,
  Calculator,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    user,
    setActiveTab,
    openDosageCalculator,
    isAdminMode,
  } = useApp();

  // If the user is an instructor, show the dedicated Instructor Supervision Dashboard
  if (user.role === 'instructor') {
    return <InstructorDashboardView />;
  }

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Admin Quick Notification Banner if Admin */}
      {(user.role === 'admin' || isAdminMode) && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-100/80 text-purple-950 border border-purple-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-purple-950">
                  โหมดผู้ดูแลระบบ (Admin) • แทนตำแหน่งอาจารย์
                </span>
                <span className="px-2 py-0.5 bg-purple-200 text-purple-900 text-[10px] font-bold rounded-full">
                  เข้าถึงได้เต็มรูปแบบ
                </span>
              </div>
              <p className="text-xs text-purple-800/90 mt-0.5">
                คุณสามารถจัดการสิทธิ์การเข้าถึงข้อมูลของนักศึกษาและอาจารย์, หมายเลขฉุกเฉิน & ผู้รับผิดชอบ, และประกาศแนวปฏิบัติสถาบัน
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('admin')}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 self-start sm:self-center transition-all cursor-pointer"
          >
            <span>เปิดแผงควบคุม Admin</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Welcome Banner - Simplified and clear */}
      <div className="bg-gradient-to-br from-teal-50 via-emerald-50/60 to-teal-50/40 dark:from-slate-850 dark:to-teal-950/20 rounded-3xl p-5 sm:p-6 text-slate-800 dark:text-slate-100 border border-teal-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              สวัสดี, {user.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              {user.year} • {user.group}
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-teal-200/80 dark:border-slate-700 text-teal-800 dark:text-teal-300 text-xs font-bold shadow-2xs self-start sm:self-auto">
            <span>💡 ทบทวนก่อนทำ • เช็กระหว่างทำ • สะท้อนคิดหลังทำ</span>
          </div>
        </div>
      </div>

      {/* 🚀 QUICK ACCESS HERO CARD: เครื่องคิดเลขคำนวณยาฉีด & ยาดริป (สะอาด สบายตา เข้าใจง่าย) */}
      <div
        onClick={openDosageCalculator}
        className="p-4 sm:p-5 rounded-3xl bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-lg cursor-pointer transition-all active:scale-[0.99] border border-teal-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs text-white flex items-center justify-center shrink-0 shadow-inner">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight text-white">
                เครื่องคิดเลขคำนวณยาฉีด & อัตราหยดยาดริป
              </span>
              <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                คำนวณด่วน
              </span>
            </div>
            <p className="text-xs sm:text-sm text-teal-100 font-normal">
              คำนวณขนาดยา (Dose) • อัตราหยด (Drop/min) • ผสมสารน้ำ (Diluent)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-center shrink-0">
          <span className="px-4 py-2 rounded-xl bg-white text-teal-900 font-bold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 hover:bg-teal-50 transition-colors">
            <span>เปิดเครื่องคิดเลข</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-700" />
          </span>
        </div>
      </div>

      {/* Main Clinical Topics Overview */}
      <MainTopicsOverview />
    </div>
  );
};
