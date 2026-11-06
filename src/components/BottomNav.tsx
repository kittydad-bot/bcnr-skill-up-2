import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, BookOpen, CheckSquare, MessageSquare, User, AlertOctagon, Settings, LayoutDashboard, Users } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { user, activeTab, setActiveTab, setIsSOSModalOpen } = useApp();

  const isInstructor = user.role === 'instructor';
  const isAdmin = user.role === 'admin';

  const navItems = isInstructor
    ? [
        { id: 'home' as const, label: 'Dashboard นิเทศก์', icon: LayoutDashboard },
        { id: 'admin' as const, label: 'ประเมิน & บันทึกคลินิก', icon: Settings },
        { id: 'profile' as const, label: 'ภาพรวมนักศึกษา', icon: Users },
      ]
    : isAdmin
    ? [
        { id: 'home' as const, label: 'หน้าหลัก', icon: Home },
        { id: 'admin' as const, label: 'ศูนย์ควบคุม Admin', icon: Settings },
        { id: 'profile' as const, label: 'โปรไฟล์', icon: User },
      ]
    : [
        { id: 'home' as const, label: 'หน้าหลัก', icon: Home },
        { id: 'review' as const, label: 'สมุดภาพ', icon: BookOpen },
        { id: 'checklist' as const, label: 'Checklist', icon: CheckSquare },
        { id: 'sbar' as const, label: 'SBAR', icon: MessageSquare },
        { id: 'profile' as const, label: 'โปรไฟล์', icon: User },
      ];

  return (
    <>
      {/* Floating SOS Button (Red, prominent, always accessible) */}
      <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40">
        <button
          onClick={() => setIsSOSModalOpen(true)}
          className="group flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xl shadow-red-600/35 border-2 border-white dark:border-slate-900 transition-all hover:scale-105 active:scale-95"
          title="ติดต่อฉุกเฉินและแนวทางเมื่อเกิดเหตุผิดปกติ"
        >
          <AlertOctagon className="w-5 h-5 animate-pulse text-white" />
          <span className="tracking-wide">SOS ฉุกเฉิน</span>
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 backdrop-blur-md border-t border-sky-200/90 pb-safe shadow-sm"
        style={{ backgroundColor: '#d0f2ff' }}
      >
        <div className="max-w-md sm:max-w-xl mx-auto flex items-center justify-around px-2 py-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
                  isActive
                    ? 'text-teal-900 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div
                  className={`p-1 rounded-xl transition-all ${
                    isActive ? 'bg-white/90 shadow-2xs scale-110 text-teal-700' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight font-medium">{item.label}</span>

                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute -top-1.5 w-7 h-1 rounded-full bg-teal-600" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
