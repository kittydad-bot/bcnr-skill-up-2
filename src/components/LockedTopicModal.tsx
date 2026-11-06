import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock,
  X,
  Syringe,
  ArrowRight,
  Sparkles,
  Clock,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Activity,
  Stethoscope,
  Bandage,
  GitCommit,
  Wind,
  Flame,
  Droplet,
} from 'lucide-react';

export const LockedTopicModal: React.FC = () => {
  const { lockedTopicModal, setLockedTopicModal, setSelectedMainTopic, setActiveTab } = useApp();

  if (!lockedTopicModal) return null;

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-6 h-6 text-amber-500" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-amber-500" />;
      case 'Bandage':
        return <Bandage className="w-6 h-6 text-amber-500" />;
      case 'GitCommit':
        return <GitCommit className="w-6 h-6 text-amber-500" />;
      case 'Wind':
        return <Wind className="w-6 h-6 text-amber-500" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-500" />;
      case 'Droplet':
        return <Droplet className="w-6 h-6 text-amber-500" />;
      default:
        return <Lock className="w-6 h-6 text-amber-500" />;
    }
  };

  const handleEnterInjection = () => {
    setSelectedMainTopic('injection');
    setLockedTopicModal(null);
    setActiveTab('home');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden p-6 sm:p-7 space-y-5">
        {/* Close Button */}
        <button
          onClick={() => setLockedTopicModal(null)}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Lock Indicator */}
        <div className="flex items-start gap-4">
          <div className="w-13 h-13 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center shrink-0">
            {getTopicIcon(lockedTopicModal.iconName)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                {lockedTopicModal.statusBadge}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {lockedTopicModal.estimatedHours}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
              {lockedTopicModal.nameTh}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {lockedTopicModal.nameEn}
            </p>
          </div>
        </div>

        {/* Notice Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>คำชี้แจงโครงสร้างรายวิชา</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            หัวข้อ <span className="font-semibold text-slate-900 dark:text-white">"{lockedTopicModal.nameTh}"</span> อยู่ในกลุ่ม 8 ทักษะหัตถการหลักทางการพยาบาล โดยในเฟสการเรียนรู้ปัจจุบัน ระบบได้จัดเตรียมเนื้อหาไว้เฉพาะหัวข้อ <strong className="text-teal-700 dark:text-teal-300">"การฉีดยา" (Medication Injection)</strong> ที่เปิดใช้งานอย่างสมบูรณ์แบบ
          </p>
          {lockedTopicModal.keySkills && lockedTopicModal.keySkills.length > 0 && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                ทักษะสำคัญในหัวข้อนี้ (จะเปิดให้บริการในระยะถัดไป):
              </p>
              <div className="flex flex-wrap gap-1.5">
                {lockedTopicModal.keySkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-lg text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  >
                    • {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Active Module Recommendation */}
        <div className="p-4 rounded-2xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 space-y-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="text-xs font-bold text-teal-900 dark:text-teal-200">
              หัวข้อที่เปิดใช้งานและพร้อมฝึกฝน: การฉีดยา (Medication Injections)
            </span>
          </div>
          <p className="text-xs text-teal-800/90 dark:text-teal-300/90 leading-relaxed">
            ท่านสามารถเข้าศึกษา <strong>สมุดภาพการเรียนรู้ (Visual Learning Atlas)</strong>, ฝึกทำตารางประเมินทักษะ (Checklist พร้อม Safety Alert), จำลองการสื่อสารรายงานคลินิก (SBAR), และบันทึกสะท้อนคิด
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
          <button
            onClick={handleEnterInjection}
            className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-600/20 transition-all hover:scale-[1.01]"
          >
            <Syringe className="w-4 h-4 -rotate-45" />
            <span>เข้าสู่บทเรียน: การฉีดยา (เปิดใช้งาน)</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
          <button
            onClick={() => setLockedTopicModal(null)}
            className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
