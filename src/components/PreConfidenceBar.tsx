import React from 'react';
import { useApp } from '../context/AppContext';
import { ProcedureType } from '../types';
import { PROCEDURES_DATA } from '../data/defaultData';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Check,
} from 'lucide-react';

interface PreConfidenceBarProps {
  procedureCode?: ProcedureType;
}

interface ConfidenceLevel {
  score: number;
  labelTh: string;
  descTh: string;
  emoji: string;
  activeBg: string;
  activeBorder: string;
  textColor: string;
  badgeBg: string;
}

const CONFIDENCE_LEVELS: ConfidenceLevel[] = [
  {
    score: 1,
    labelTh: 'ไม่มั่นใจเลย',
    descTh: 'กังวลมาก / ยังไม่พร้อม',
    emoji: '😟',
    activeBg: 'bg-rose-50 dark:bg-rose-950/60',
    activeBorder: 'border-rose-400 dark:border-rose-700 ring-2 ring-rose-400/30',
    textColor: 'text-rose-700 dark:text-rose-300',
    badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
  },
  {
    score: 2,
    labelTh: 'มั่นใจน้อย',
    descTh: 'จำขั้นตอนได้บางส่วน',
    emoji: '😐',
    activeBg: 'bg-amber-50 dark:bg-amber-950/60',
    activeBorder: 'border-amber-400 dark:border-amber-700 ring-2 ring-amber-400/30',
    textColor: 'text-amber-700 dark:text-amber-300',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  },
  {
    score: 3,
    labelTh: 'ปานกลาง',
    descTh: 'พอทำได้ / ต้องดูคู่มือ',
    emoji: '🙂',
    activeBg: 'bg-sky-50 dark:bg-sky-950/60',
    activeBorder: 'border-sky-400 dark:border-sky-700 ring-2 ring-sky-400/30',
    textColor: 'text-sky-700 dark:text-sky-300',
    badgeBg: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
  },
  {
    score: 4,
    labelTh: 'มั่นใจดี',
    descTh: 'แม่นยำ / พร้อมปฏิบัติ',
    emoji: '😊',
    activeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    activeBorder: 'border-emerald-400 dark:border-emerald-700 ring-2 ring-emerald-400/30',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  },
  {
    score: 5,
    labelTh: 'มั่นใจมาก',
    descTh: 'ชำนาญ / ปลอดภัย 100%',
    emoji: '🌟',
    activeBg: 'bg-teal-50 dark:bg-teal-950/60',
    activeBorder: 'border-teal-500 dark:border-teal-600 ring-2 ring-teal-500/30',
    textColor: 'text-teal-700 dark:text-teal-300',
    badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
  },
];

export const PreConfidenceBar: React.FC<PreConfidenceBarProps> = ({ procedureCode }) => {
  const {
    selectedProcedure,
    confidenceHistory,
    savePreConfidence,
    setActiveTab,
  } = useApp();

  const activeCode = procedureCode || selectedProcedure;
  const currentProcData = PROCEDURES_DATA.find(p => p.code === activeCode) || PROCEDURES_DATA[0];

  // Find the latest confidence record for this procedure
  const currentRecord = confidenceHistory.find(r => r.procedureCode === activeCode);
  const currentPreScore = currentRecord?.preScore ?? null;

  const handleSelectScore = (score: number) => {
    savePreConfidence(activeCode, score);
  };

  const selectedLevel = CONFIDENCE_LEVELS.find(l => l.score === currentPreScore);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3.5 transition-all">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              ประเมินก่อนเริ่มหัตถการ (Pre-assessment)
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              หัตถการ {currentProcData.nameTh} ({activeCode})
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            ระดับความมั่นใจก่อนเริ่มทำ Checklist (1 - 5)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ประเมินความรู้สึกพร้อมก่อนลงมือปฏิบัติ เพื่อนำไปเปรียบเทียบพัฒนาการหลังทำ (Post-assessment)
          </p>
        </div>

        {/* Current status pill */}
        <div className="flex items-center gap-2">
          {currentPreScore !== null && selectedLevel ? (
            <div className={`px-3 py-1.5 rounded-2xl ${selectedLevel.badgeBg} flex items-center gap-2 text-xs font-bold shadow-2xs`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>
                ประเมินแล้ว: ระดับ {currentPreScore}/5 ({selectedLevel.labelTh})
              </span>
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 flex items-center gap-1.5 text-xs font-bold animate-pulse">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>กรุณาเลือกระดับความมั่นใจก่อนเริ่มทำ</span>
            </div>
          )}
        </div>
      </div>

      {/* 1 - 5 Interactive Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
        {CONFIDENCE_LEVELS.map(level => {
          const isSelected = currentPreScore === level.score;

          return (
            <button
              key={level.score}
              type="button"
              onClick={() => handleSelectScore(level.score)}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group cursor-pointer ${
                isSelected
                  ? `${level.activeBg} ${level.activeBorder} shadow-sm`
                  : 'bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
              }`}
            >
              {/* Active check icon badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] shadow-2xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              {/* Number and Emoji */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 group-hover:border-teal-400'
                  }`}
                >
                  {level.score}
                </span>
                <span className="text-lg leading-none">{level.emoji}</span>
              </div>

              {/* Label & Description */}
              <div className="mt-2">
                <div
                  className={`text-xs font-bold leading-tight ${
                    isSelected ? level.textColor : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {level.labelTh}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-1">
                  {level.descTh}
                </div>
              </div>

              {/* Meter bar at bottom of button */}
              <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2.5">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isSelected
                      ? level.score <= 2
                        ? 'bg-rose-500'
                        : level.score === 3
                        ? 'bg-sky-500'
                        : 'bg-teal-600'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                  style={{ width: `${level.score * 20}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Recommendation Box based on selected score */}
      {currentPreScore !== null && (
        <div className="animate-fadeIn">
          {currentPreScore <= 2 ? (
            /* Low confidence recommendation */
            <div className="p-3.5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                    คำแนะนำเพื่อความมั่นใจ: ทบทวนคู่มือภาพก่อนลงมือปฏิบัติ
                  </h4>
                  <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-0.5 leading-relaxed">
                    หากยังกังวลเรื่องมุมแทงเข็ม ({currentProcData.angle}) หรือจุด Landmark ขอแนะนำให้เปิดดู{' '}
                    <strong>สมุดภาพการเรียนรู้ (Visual Atlas)</strong> ก่อนเริ่มเช็กขั้นตอนจริง
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('review')}
                className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs shrink-0 transition-all hover:scale-[1.01]"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>เปิดดูสมุดภาพ (Visual Atlas)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : currentPreScore === 3 ? (
            /* Moderate confidence */
            <div className="p-3.5 rounded-2xl bg-sky-50/90 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/70 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-sky-900 dark:text-sky-200">
                  ระดับความมั่นใจปานกลาง: ปฏิบัติตาม Checklist อย่างเป็นลำดับ
                </h4>
                <p className="text-xs text-sky-800/90 dark:text-sky-300/90 mt-0.5 leading-relaxed">
                  ค่อยๆ ตรวจสอบทีละขั้นตอน สังเกตแถบเตือน <strong>⚠️ จุดวิกฤตความปลอดภัย</strong> และตรวจสอบ 10 Rights ยาอย่างละเอียด
                </p>
              </div>
            </div>
          ) : (
            /* High confidence (4-5) */
            <div className="p-3.5 rounded-2xl bg-teal-50/90 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/70 flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-teal-900 dark:text-teal-200">
                  ยอดเยี่ยม! มีความมั่นใจและความพร้อมสูง พร้อมเข้าสู่ Checklist
                </h4>
                <p className="text-xs text-teal-800/90 dark:text-teal-300/90 mt-0.5 leading-relaxed">
                  เริ่มเช็กขั้นตอนด้านล่างได้ทันที รักษาสภาพปลอดเชื้อ (Aseptic Technique) และสื่อสารกับผู้ป่วยด้วยความเอื้ออาทร
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
