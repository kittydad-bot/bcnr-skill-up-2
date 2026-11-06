import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Syringe,
  Zap,
  Settings,
  Search,
  User,
  Layers,
  Sparkles,
  LogOut,
  GraduationCap,
  Stethoscope,
  Home,
  Compass,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    user,
    activeTab,
    setActiveTab,
    setIsLoginModalOpen,
    setIsQuickReviewModalOpen,
    setIsWelcomeGuideOpen,
    searchQuery,
    setSearchQuery,
    switchRole,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand & Identity */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
              title="คลิกเพื่อกลับหน้าหลัก"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center shadow-md shadow-teal-500/20 hover:scale-105 transition-transform">
                <Syringe className="w-5 h-5 -rotate-45" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-teal-800 dark:text-teal-300">
                    BCNR Skill UP
                  </span>
                  <span className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    user.role === 'admin'
                      ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                      : user.role === 'instructor'
                      ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                      : 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300'
                  }`}>
                    {user.role === 'admin' ? 'ผู้ดูแลระบบ (Admin)' : user.role === 'instructor' ? 'อาจารย์ผู้สอน' : user.year || 'นักศึกษา'}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden xs:block">
                  ผู้ช่วยการฉีดยา • ทบทวนก่อนทำ เช็กระหว่างทำ สะท้อนคิดหลังทำ
                </p>
              </div>
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="hidden lg:flex flex-1 max-w-xs relative items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ค้นหาหัตถการ, อุปกรณ์, 10 Rights..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* ปุ่มหน้าหลัก (ปรับไว้ด้านขวา ให้เห็นเด่นชัดตามที่ผู้ใช้ร้องขอ) */}
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-teal-700 text-white shadow-teal-700/30 ring-2 ring-teal-400'
                  : 'bg-gradient-to-r from-teal-600 via-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-teal-600/35 hover:scale-[1.03] active:scale-95 ring-1 ring-teal-300/40'
              }`}
              title={user.role === 'instructor' ? 'กลับสู่ Dashboard นิเทศก์' : 'กลับสู่หน้าหลัก (8 หัวข้อหลักทางการพยาบาล)'}
            >
              <Home className="w-4 h-4 text-white shrink-0" />
              <span className="font-extrabold tracking-wide">หน้าหลัก</span>
            </button>

            {/* Learning Pathway Guide Button */}
            <button
              onClick={() => setIsWelcomeGuideOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-800 dark:text-teal-200 text-xs font-bold border border-teal-200 dark:border-teal-800 flex items-center gap-1 transition-all"
              title="คู่มือ & ไกด์ไลน์การเริ่มต้นเรียนรู้"
            >
              <Compass className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="hidden sm:inline">ไกด์ไลน์เริ่มต้น</span>
            </button>

            {/* Quick Review 30s */}
            <button
              onClick={() => setIsQuickReviewModalOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800/60 flex items-center gap-1 transition-all"
              title="สรุปย่อด่วน 30 วินาที"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="hidden sm:inline">ทบทวนด่วน 30s</span>
            </button>

            {/* Admin / Faculty panel button (only shown if current logged-in role is admin or instructor) */}
            {(user.role === 'admin' || user.role === 'instructor') && (
              <button
                onClick={() => setActiveTab(activeTab === 'admin' ? 'home' : 'admin')}
                className={`p-2 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-400'
                    : user.role === 'admin'
                    ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800 hover:bg-purple-200'
                    : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100'
                }`}
                title={
                  user.role === 'admin'
                    ? 'แผงควบคุมระบบ (Admin Portal): จัดการสิทธิ์, เบอร์ฉุกเฉิน, ประกาศสถาบัน'
                    : 'เข้าสู่หน้าจัดการและประเมินสำหรับอาจารย์'
                }
              >
                <Settings className="w-4 h-4" />
                {user.role === 'admin' ? (
                  <span className="hidden lg:inline text-[11px] font-bold">เมนู Admin</span>
                ) : (
                  <span className="hidden lg:inline text-[11px] font-bold">ประเมินคลินิก</span>
                )}
              </button>
            )}

            {/* User Profile avatar & info */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className={`flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-xl border text-left transition-all ${
                user.role === 'admin'
                  ? 'bg-purple-50/80 dark:bg-purple-950/70 hover:bg-purple-100 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200'
                  : user.role === 'instructor'
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/60 hover:bg-indigo-100/80 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
              }`}
              title={`คลิกเพื่อแก้ไขข้อมูล (${user.role === 'admin' ? 'ผู้ดูแลระบบ' : user.role === 'instructor' ? 'อาจารย์' : 'นักศึกษา'})`}
            >
              <div className={`w-6 h-6 rounded-lg text-white flex items-center justify-center font-bold text-[10px] ${
                user.role === 'admin' ? 'bg-purple-600' : user.role === 'instructor' ? 'bg-indigo-600' : 'bg-teal-600'
              }`}>
                {user.role === 'admin' ? (
                  <Settings className="w-3.5 h-3.5" />
                ) : user.role === 'instructor' ? (
                  <GraduationCap className="w-3.5 h-3.5" />
                ) : (
                  <Stethoscope className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="hidden xl:block leading-tight">
                <span className="text-[11px] font-bold block truncate max-w-[90px]">
                  {user.name.split(' ')[0]}
                </span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block truncate max-w-[90px]">
                  {user.role === 'admin' ? 'ผู้ดูแลระบบ' : user.role === 'instructor' ? 'อาจารย์ผู้สอน' : user.group?.split(' ')[0] || user.year}
                </span>
              </div>
            </button>

            {/* Switch Role / Log out button */}
            <button
              onClick={switchRole}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950/40 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 text-xs font-semibold flex items-center gap-1 transition-all"
              title="สลับผู้ใช้งาน / เปลี่ยนบทบาท (Admin ↔ อาจารย์ ↔ นักศึกษา)"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px]">สลับบทบาท</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
