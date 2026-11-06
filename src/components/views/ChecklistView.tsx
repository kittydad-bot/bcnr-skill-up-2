import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProcedureType, ChecklistStep } from '../../types';
import { PROCEDURES_DATA } from '../../data/defaultData';
import { PreConfidenceBar } from '../PreConfidenceBar';
import {
  CheckSquare,
  Square,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  VolumeX,
  Clock,
  ArrowRight,
  Info,
  Syringe,
  BookOpen,
  MessageSquare,
  ArrowLeft,
  Check,
  Home,
  RefreshCw,
} from 'lucide-react';

export const ChecklistView: React.FC = () => {
  const {
    selectedProcedure,
    setSelectedProcedure,
    checklistSteps,
    checkedStepIds,
    toggleChecklistStep,
    resetChecklist,
    resetAllDataToDefault,
    getProcedureProgress,
    setActiveTab,
    speakText,
    stopSpeech,
    isSpeaking,
    confidenceHistory,
    savePostConfidence,
  } = useApp();

  const [expandedStepId, setExpandedStepId] = useState<string | null>(null);
  const [syncedNotice, setSyncedNotice] = useState(false);

  const currentProcData = PROCEDURES_DATA.find(p => p.code === selectedProcedure) || PROCEDURES_DATA[0];
  const stepsForCurrentProc = checklistSteps.filter(s => s.procedureCode === selectedProcedure);

  const progress = getProcedureProgress(selectedProcedure);
  const completedCount = stepsForCurrentProc.filter(s => checkedStepIds.includes(s.id)).length;

  const currentRecord = confidenceHistory.find(r => r.procedureCode === selectedProcedure);
  const currentPreScore = currentRecord?.preScore ?? null;
  const currentPostScore = currentRecord?.postScore ?? null;

  const handleToggleStep = (step: ChecklistStep) => {
    toggleChecklistStep(step.id);
  };

  const handleSpeakStep = (step: ChecklistStep, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeech();
    } else {
      speakText(`ขั้นตอนที่ ${step.stepNumber}: ${step.titleTh}. ${step.descriptionTh}`);
    }
  };

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        {/* Breadcrumb Hierarchy with กลับหน้าหลัก button */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-700/60">
          <button
            onClick={() => setActiveTab('home')}
            className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-700/80 hover:bg-teal-50 dark:hover:bg-teal-950 text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1.5 font-bold transition-all text-xs border border-slate-200 dark:border-slate-600 shadow-2xs hover:scale-[1.02] active:scale-95"
            title="กลับสู่หน้าหลัก (8 หัวข้อหลักทางการพยาบาล)"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <Home className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>กลับหน้าหลัก (8 หัวข้อ)</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="px-2 py-0.5 rounded-lg bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800 flex items-center gap-1">
            <Syringe className="w-3 h-3 -rotate-45" />
            หัวข้อหลัก: การฉีดยา (Medication Injections)
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1">
            <CheckSquare className="w-3 h-3 text-teal-600" />
            ตารางตรวจสอบ Checklist
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold text-xs">
                Unit 2: เช็กระหว่างทำ (Checklist)
              </span>
              <span className="text-xs text-slate-400">• Safety Intercept System</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              รายการตรวจสอบหัตถการ {currentProcData.nameTh} ({currentProcData.code})
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                resetAllDataToDefault();
                setSyncedNotice(true);
                setTimeout(() => setSyncedNotice(false), 2500);
              }}
              className="px-2.5 py-1 rounded-lg border border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-700 text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-xs"
              title="รีเซ็ตและโหลดเกณฑ์ Checklist ทั้งหมดจากโค้ดล่าสุด (ล้างข้อมูลเก่าในแคช)"
            >
              <RefreshCw className={`w-3 h-3 ${syncedNotice ? 'animate-spin' : ''}`} />
              <span>{syncedNotice ? 'ซิงค์เกณฑ์สำเร็จ!' : 'ซิงค์เกณฑ์ล่าสุด'}</span>
            </button>
            <button
              onClick={() => resetChecklist(selectedProcedure)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-[11px] font-semibold flex items-center gap-1.5 transition-all"
              title="ล้างสถานะเพื่อฝึกใหม่ตั้งแต่ขั้นตอนแรก"
            >
              <RotateCcw className="w-3 h-3" />
              <span>เริ่มใหม่</span>
            </button>
          </div>
        </div>

        {/* 4 Procedure Switcher Tabs (ปุ่มปรับให้เล็กลง กระชับ) */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {(['IM', 'SC', 'ID', 'IV'] as ProcedureType[]).map(type => {
            const isSelected = selectedProcedure === type;
            const procProgress = getProcedureProgress(type);
            return (
              <button
                key={type}
                onClick={() => setSelectedProcedure(type)}
                className={`py-1.5 px-2 rounded-xl text-center border transition-all flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs ring-1 ring-teal-400/40'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="font-bold text-xs">{type}</span>
                <span
                  className={`text-[10px] font-semibold px-1 py-0.2 rounded-md ${
                    isSelected
                      ? 'bg-teal-700/60 text-teal-100'
                      : 'bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {procProgress}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Overall Checklist Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              ความสำเร็จของขั้นตอน: {completedCount} / {stepsForCurrentProc.length} ขั้นตอน
            </span>
            <span className="font-bold text-teal-700 dark:text-teal-300">{progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                progress === 100 ? 'bg-emerald-500' : 'bg-teal-600'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold text-center pt-1">
              🎉 ยอดเยี่ยม! ท่านตรวจสอบครบทุกขั้นตอนอย่างปลอดภัยแล้ว
            </p>
          )}
        </div>
      </div>

      {/* แถบประเมินความมั่นใจ 1-5 ก่อนเริ่มทำ Checklist (User Request) */}
      <PreConfidenceBar procedureCode={selectedProcedure} />

      {/* Checklist Items Stack */}
      <div className="space-y-2.5">
        {stepsForCurrentProc.map(step => {
          const isChecked = checkedStepIds.includes(step.id);
          const isExpanded = expandedStepId === step.id;

          return (
            <div
              key={step.id}
              onClick={() => handleToggleStep(step)}
              className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                isChecked
                  ? 'bg-teal-50/50 dark:bg-teal-950/30 border-teal-400 dark:border-teal-800'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-2.5 sm:gap-3">
                {/* Custom Checkbox */}
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    handleToggleStep(step);
                  }}
                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                    isChecked
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'border-2 border-slate-300 dark:border-slate-600 text-transparent hover:border-teal-500'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                </button>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold text-slate-400">
                      #{step.stepNumber}
                    </span>
                    <span
                      className={`text-xs font-bold leading-tight ${
                        isChecked
                          ? 'text-teal-900 dark:text-teal-200 line-through opacity-80'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {step.titleTh}
                    </span>
                    {step.isCriticalSafety && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/60">
                        ⚠️ จุดวิกฤตความปลอดภัย
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      isChecked ? 'text-slate-500 dark:text-slate-400' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {step.descriptionTh}
                  </p>

                  {/* Safety Rationale (Always visible if safety alert trigger) */}
                  {step.safetyAlertReason && (
                    <div className="mt-2 p-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>เหตุผลความปลอดภัย:</strong> {step.safetyAlertReason}
                      </span>
                    </div>
                  )}
                </div>

                {/* TTS audio speech button */}
                <button
                  onClick={e => handleSpeakStep(step, e)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-700 shrink-0"
                  title="ฟังคำอธิบายขั้นตอนนี้"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Post Completion Action Banner */}
      {progress === 100 && (
        <div className="p-5 rounded-3xl bg-gradient-to-br from-teal-600 to-teal-800 text-white shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center font-bold text-lg">
              ✓
            </div>
            <div>
              <h3 className="font-bold text-base">ทำครบทุกขั้นตอนแล้ว!</h3>
              <p className="text-xs text-teal-100">
                ยินดีด้วย! ท่านปฏิบัติตามรายการตรวจสอบครบถ้วน ประเมินผลหลังทำเพื่อดูพัฒนาการ
              </p>
            </div>
          </div>

          {/* Quick Post-Confidence Evaluation 1-5 */}
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3.5 space-y-2.5 border border-white/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <span className="font-bold flex items-center gap-1.5 text-white">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                ประเมินความมั่นใจหลังทำ (Post-assessment ระดับ 1 - 5):
              </span>
              {currentPostScore !== null ? (
                <span className="text-yellow-300 font-extrabold bg-white/10 px-2 py-0.5 rounded-lg">
                  {currentPreScore !== null
                    ? `ความมั่นใจ: ก่อนทำ ${currentPreScore}/5 ➔ หลังทำ ${currentPostScore}/5 (${
                        currentPostScore >= currentPreScore ? `+${currentPostScore - currentPreScore}` : `${currentPostScore - currentPreScore}`
                      })`
                    : `หลังทำ: ${currentPostScore}/5`}
                </span>
              ) : (
                <span className="text-teal-200 text-[11px]">
                  (คลิกเลือก 1-5 ด้านล่างเพื่อบันทึก)
                </span>
              )}
            </div>

            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {[
                { score: 1, label: '1 - น้อยมาก' },
                { score: 2, label: '2 - น้อย' },
                { score: 3, label: '3 - ปานกลาง' },
                { score: 4, label: '4 - ดี' },
                { score: 5, label: '5 - มากที่สุด' },
              ].map(item => {
                const isSelected = currentPostScore === item.score;
                return (
                  <button
                    key={item.score}
                    type="button"
                    onClick={() => savePostConfidence(selectedProcedure, item.score)}
                    className={`py-2 px-1 rounded-xl text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-yellow-400 text-slate-950 font-black shadow-md ring-2 ring-white scale-[1.02]'
                        : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold">{item.score} ★</span>
                    <span className="text-[10px] opacity-90 hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2 rounded-xl bg-white text-teal-900 font-bold text-xs shadow-sm hover:bg-teal-50 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              สะท้อนคิด & บันทึกรายงานผล
            </button>
            <button
              onClick={() => setActiveTab('sbar')}
              className="px-4 py-2 rounded-xl bg-teal-900/40 hover:bg-teal-900/60 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              ฝึกรายงาน SBAR ต่อ →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
