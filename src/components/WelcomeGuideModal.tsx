import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Compass,
  CheckCircle2,
  BookOpen,
  CheckSquare,
  Activity,
  MessageSquare,
  ArrowRight,
  X,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  Phone,
  Zap,
  Play,
  HeartPulse,
} from 'lucide-react';

export const WelcomeGuideModal: React.FC = () => {
  const {
    isWelcomeGuideOpen,
    setIsWelcomeGuideOpen,
    user,
    setActiveTab,
    setSelectedProcedure,
    setIsQuickReviewModalOpen,
    playAudioChime,
  } = useApp();

  const [activeStepTab, setActiveStepTab] = useState<number>(0);

  if (!isWelcomeGuideOpen) return null;

  const handleClose = () => {
    playAudioChime('click');
    setIsWelcomeGuideOpen(false);
  };

  const steps = [
    {
      step: 1,
      title: 'ทบทวนความรู้ & กายวิภาค',
      badge: 'Knowledge First',
      tabKey: 'review',
      icon: <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      color: 'teal',
      heading: '1. เริ่มต้นด้วยการทบทวนคู่มือภาพ (Visual Atlas)',
      description:
        'ก่อนเข้าหาผู้ป่วยจริง ให้เริ่มจากการดูภาพกายวิภาค ตำแหน่ง Landmark มุมเข็ม (IM 90°, SC 45°-90°, ID 10°-15°, IV 15°-30°) และทบทวนหลักความปลอดภัย 10 Rights of Medication Administration',
      actionText: 'ไปที่สมุดภาพความรู้',
      onAction: () => {
        setIsWelcomeGuideOpen(false);
        setActiveTab('review');
      },
    },
    {
      step: 2,
      title: 'ประเมินความมั่นใจก่อนฝึก',
      badge: 'Pre-Practice Confidence',
      tabKey: 'profile',
      icon: <Activity className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      color: 'amber',
      heading: '2. ประเมินความมั่นใจก่อนปฏิบัติ (Pre-Confidence Score)',
      description:
        'บันทึกระดับความพร้อมและความมั่นใจของตนเอง (1-10) เพื่อให้มองเห็นพัฒนาการของตนเองก่อนและหลังการฝึกปฏิบัติจริง',
      actionText: 'ไปที่หน้าประเมินความมั่นใจ',
      onAction: () => {
        setIsWelcomeGuideOpen(false);
        setActiveTab('profile');
      },
    },
    {
      step: 3,
      title: 'ฝึกทีละสเต็ปด้วย Checklist',
      badge: 'Skill Checklist',
      tabKey: 'checklist',
      icon: <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      color: 'emerald',
      heading: '3. ปฏิบัติตาม Interactive Checklist พร้อมระบบเตือนความปลอดภัย',
      description:
        'ฝึกปฏิบัติการพยาบาลทีละขั้นตอน ตั้งแต่เตรียมยา การระบุตัวผู้ป่วย การตรวจสอบคำสั่งแพทย์ หากข้ามขั้นตอนวิกฤต (Critical Safety Step) ระบบจะส่งเสียงแจ้งเตือน Safety Alert เพื่อความปลอดภัยสูงสุด',
      actionText: 'เริ่มฝึกตาราง Checklist',
      onAction: () => {
        setSelectedProcedure(user.selectedLesson || 'IM');
        setIsWelcomeGuideOpen(false);
        setActiveTab('checklist');
      },
    },
    {
      step: 4,
      title: 'จำลองการรายงาน SBAR & สะท้อนคิด',
      badge: 'SBAR & Reflection',
      tabKey: 'sbar',
      icon: <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      color: 'indigo',
      heading: '4. สื่อสารฉุกเฉินด้วย SBAR และบันทึกสะท้อนคิดหลังทำ',
      description:
        'ฝึกรายงานสถานการณ์ฉุกเฉินตามกรอบ SBAR (Situation, Background, Assessment, Recommendation) และบันทึกสิ่งที่ทำได้ดี สิ่งที่กังวล และแผนพัฒนาตนเองตามวงจร Kolb Experiential Learning',
      actionText: 'เปิดแบบจำลอง SBAR',
      onAction: () => {
        setIsWelcomeGuideOpen(false);
        setActiveTab('sbar');
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-teal-500/50 text-slate-900 dark:text-slate-100 space-y-5 max-h-[92vh] overflow-y-auto">
        {/* Header Banner */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 text-xs font-extrabold border border-teal-200 dark:border-teal-800/80 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>ยินดีต้อนรับสู่ BCNR Skill UP • คู่มือแนะนำการเริ่มต้น</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>สวัสดี, {user.name} 👋</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {user.role === 'admin'
                ? 'คำแนะนำการจัดการระบบและดูแลนักศึกษาพยาบาล'
                : user.role === 'instructor'
                ? 'คำแนะนำการนิเทศและประเมินผลสมรรถนะคลินิก'
                : 'ขั้นตอนเริ่มต้นการเรียนรู้ทักษะการฉีดยาทางการพยาบาล'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="ปิดประกาศ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-Step Journey Roadmap Navigator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>เส้นทางการเรียนรู้ 4 ขั้นตอน (Learning Pathway)</span>
            </span>
            <span className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
              ขั้นตอนที่ {activeStepTab + 1} จาก 4
            </span>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            {steps.map((s, idx) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStepTab(idx)}
                className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer ${
                  activeStepTab === idx
                    ? 'bg-white dark:bg-teal-700 text-teal-800 dark:text-white shadow-2xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
                }`}
              >
                <div className="text-[10px] sm:text-xs">สเต็ป {s.step}</div>
                <div className="text-[9px] sm:text-[11px] truncate hidden sm:block">
                  {s.title.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Content Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-teal-50/70 via-white to-slate-50 dark:from-slate-800 dark:via-slate-800 dark:to-teal-950/20 border-2 border-teal-400/50 dark:border-teal-700/60 shadow-xs space-y-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0 shadow-xs">
                  {steps[activeStepTab].icon}
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-200/70 dark:bg-teal-900/60 text-teal-900 dark:text-teal-200">
                    {steps[activeStepTab].badge}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {steps[activeStepTab].heading}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {steps[activeStepTab].description}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 border-t border-slate-200/80 dark:border-slate-700/80">
              <button
                type="button"
                onClick={steps[activeStepTab].onAction}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <span>{steps[activeStepTab].actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-end gap-2">
                {activeStepTab > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveStepTab(prev => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    ย้อนกลับ
                  </button>
                )}
                {activeStepTab < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStepTab(prev => Math.min(steps.length - 1, prev + 1))}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 hover:bg-slate-700"
                  >
                    <span>ขั้นถัดไป</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>เข้าใจแล้ว เริ่มเรียนรู้</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Core Quick Shortcuts for Bedside Clinical Practice */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
            เครื่องมือลัดที่ต้องรู้ขณะฝึกข้างเตียง (Bedside Quick Tools):
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div
              onClick={() => {
                setIsWelcomeGuideOpen(false);
                setIsQuickReviewModalOpen(true);
              }}
              className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 hover:border-amber-400 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold mb-1">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>ทบทวนด่วน 30 วิ</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                สรุปย่อขนาดเข็ม มุมฉีด และข้อควรระวังสำคัญก่อนหยิบยา
              </p>
            </div>

            <div
              onClick={() => {
                setIsWelcomeGuideOpen(false);
                setActiveTab('home');
              }}
              className="p-3 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 hover:border-sky-400 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-1.5 text-sky-800 dark:text-sky-300 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>STOP & CHECK</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                การ์ดตรวจเช็กคนไข้ ยา ประวัติแพ้ อุปกรณ์ ก่อนลงมือทำ
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>แนวทางสอดคล้องกับหลักสูตรวิทยาลัยพยาบาลบรมราชชนนี (BCNR)</span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>เข้าสู่ระบบ & เริ่มต้นการเรียนรู้</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
