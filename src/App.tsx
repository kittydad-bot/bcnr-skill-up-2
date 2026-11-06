import React from 'react';
import { AppContextProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SafetyAlertModal } from './components/SafetyAlertModal';
import { SOSModal } from './components/SOSModal';
import { LoginModal } from './components/LoginModal';
import { QuickReviewModal } from './components/QuickReviewModal';
import { LockedTopicModal } from './components/LockedTopicModal';
import { WelcomeGuideModal } from './components/WelcomeGuideModal';
import { RoleSelectionView } from './components/views/RoleSelectionView';

import { HomeView } from './components/views/HomeView';
import { ReviewView } from './components/views/ReviewView';
import { ChecklistView } from './components/views/ChecklistView';
import { SbarView } from './components/views/SbarView';
import { ProfileView } from './components/views/ProfileView';
import { AdminView } from './components/views/AdminView';
import { AlertTriangle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, isLoggedIn } = useApp();

  if (!isLoggedIn) {
    return <RoleSelectionView />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'review' && <ReviewView />}
        {activeTab === 'checklist' && <ChecklistView />}
        {activeTab === 'sbar' && <SbarView />}
        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'admin' && <AdminView />}
      </main>

      {/* Institutional Legal & Educational Disclaimer Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 py-6 px-4 mb-16 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span>ประกาศข้อกำหนดความปลอดภัยและการศึกษาทางการพยาบาล</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            <strong>BCNR Skill UP (ระบบช่วยปฏิบัติการพยาบาลสำหรับนักศึกษาพยาบาล)</strong>{' '}
            ได้รับการออกแบบขึ้นเพื่อเป็นเครื่องมือส่งเสริมการเรียนรู้ ทบทวนทักษะ และเสริมสร้างความมั่นใจของนักศึกษาพยาบาล
            มิใช่เครื่องมือสำหรับวินิจฉัย สั่งการรักษา หรือคำนวณขนาดยาเฉพาะบุคคล
          </p>
          <p className="text-[11px] font-semibold text-teal-800 dark:text-teal-300">
            * ในการฝึกปฏิบัติการพยาบาลจริง ต้องปฏิบัติตามแนวทางของสถาบัน โรงพยาบาล และคำแนะนำของอาจารย์ผู้สอนเสมอ
          </p>
          <p className="text-[10px] text-slate-400 pt-1">
            BCNR Skill UP • “ทบทวนก่อนทำ เช็กระหว่างทำ สะท้อนคิดหลังทำ”
          </p>
        </div>
      </footer>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Global Modals */}
      <SafetyAlertModal />
      <SOSModal />
      <LoginModal />
      <QuickReviewModal />
      <LockedTopicModal />
      <WelcomeGuideModal />
    </div>
  );
};

export default function App() {
  return (
    <AppContextProvider>
      <MainContent />
    </AppContextProvider>
  );
}
