import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Syringe,
  Lock,
  BookOpen,
  Activity,
  Stethoscope,
  Bandage,
  GitCommit,
  Wind,
  Flame,
  Droplet,
  ChevronRight,
  ChevronUp,
  Eye,
  CheckSquare,
} from 'lucide-react';

interface MainTopicsOverviewProps {
  compact?: boolean;
}

export const MainTopicsOverview: React.FC<MainTopicsOverviewProps> = ({ compact = false }) => {
  const {
    mainTopics,
    selectedMainTopic,
    openTopic,
    setActiveTab,
    selectedProcedure,
    setSelectedProcedure,
    getProcedureProgress,
  } = useApp();

  // State to control showing remaining topics (hidden by default as requested)
  const [showAllTopics, setShowAllTopics] = useState<boolean>(false);

  const getTopicIcon = (iconName: string, isUnlocked: boolean) => {
    const iconClass = isUnlocked
      ? 'w-5 h-5 text-teal-600 dark:text-teal-400'
      : 'w-5 h-5 text-slate-400 dark:text-slate-500';

    switch (iconName) {
      case 'Activity':
        return <Activity className={iconClass} />;
      case 'Stethoscope':
        return <Stethoscope className={iconClass} />;
      case 'Bandage':
        return <Bandage className={iconClass} />;
      case 'GitCommit':
        return <GitCommit className={iconClass} />;
      case 'Wind':
        return <Wind className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'Droplet':
        return <Droplet className={iconClass} />;
      case 'Syringe':
        return <Syringe className={`${iconClass} -rotate-45`} />;
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  // Split topics into active/unlocked and remaining topics
  const unlockedTopics = mainTopics.filter(t => t.isUnlocked);
  const remainingTopics = mainTopics.filter(t => !t.isUnlocked);

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
          หัวข้อการเรียนรู้ทางการพยาบาล
        </h2>
      </div>

      {/* Active Unlocked Topic Card (การฉีดยา) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {unlockedTopics.map((topic, index) => {
          const isSelected = selectedMainTopic === topic.id;

          // Active Topic Card (การฉีดยา) - Featured and rich
          return (
            <div
              key={topic.id}
              className="md:col-span-2 lg:col-span-4 bg-gradient-to-br from-teal-50/70 via-white to-emerald-50/40 dark:from-slate-800/90 dark:via-slate-800 dark:to-teal-950/30 rounded-3xl p-5 sm:p-6 border-2 border-teal-500/80 shadow-md shadow-teal-500/5 relative overflow-hidden"
            >
              {/* Decorative background badge */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                {/* Topic Meta */}
                <div className="space-y-3 w-full">
                  <div className="hidden" style={{ display: 'none' }}>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      {topic.statusBadge}
                    </span>
                    <span className="text-xs font-semibold text-teal-800 dark:text-teal-300 bg-teal-100/70 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full">
                      หัวข้อที่ 1
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {topic.targetCourse} • {topic.estimatedHours}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 shrink-0">
                        <Syringe className="w-5 h-5 -rotate-45" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">
                          {topic.nameTh}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {topic.nameEn}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sub-procedures and Checklist Topics Section */}
                  <div className="pt-2 space-y-3 border-t border-teal-100 dark:border-slate-700/60 mt-2">
                    {/* หัวข้อ Checklist */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <CheckSquare className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          <span className="text-xs font-bold text-teal-900 dark:text-teal-200">
                            Checklist หัตถการฉีดยา 4 ชนิด:
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTab('checklist')}
                          className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>ดูทั้งหมด</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { code: 'IM', name: 'IM (กล้ามเนื้อ)', subtitle: 'มุม 90°' },
                          { code: 'SC', name: 'SC (ใต้ผิวหนัง)', subtitle: 'มุม 45°/90°' },
                          { code: 'ID', name: 'ID (ในชั้นผิวหนัง)', subtitle: 'มุม 10-15°' },
                          { code: 'IV', name: 'IV (หลอดเลือดดำ)', subtitle: 'เข้าหลอดเลือด' },
                        ].map(item => {
                          const procProgress = getProcedureProgress(item.code as any);
                          const isCurrent = selectedProcedure === item.code;
                          return (
                            <button
                              key={`chk-${item.code}`}
                              type="button"
                              onClick={() => {
                                setSelectedProcedure(item.code as any);
                                setActiveTab('checklist');
                              }}
                              className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer shadow-2xs hover:scale-[1.01] active:scale-95 flex flex-col justify-between gap-1 ${
                                isCurrent
                                  ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-400/40'
                                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-teal-200/80 dark:border-teal-800/80 hover:bg-teal-50 dark:hover:bg-slate-700/80'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-xs">
                                  {item.name}
                                </span>
                                <span
                                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                                    procProgress === 100
                                      ? 'bg-emerald-500 text-white'
                                      : isCurrent
                                      ? 'bg-teal-700/80 text-teal-100'
                                      : 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300'
                                  }`}
                                >
                                  {procProgress}%
                                </span>
                              </div>
                              <p className={`text-[11px] truncate ${isCurrent ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                {item.subtitle}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* ช่องทางศึกษาคู่มือภาพ (Visual Review Guide) */}
                    <div className="pt-0.5 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                        <span>คู่มือภาพ:</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { code: 'IM', name: 'IM' },
                          { code: 'SC', name: 'SC' },
                          { code: 'ID', name: 'ID' },
                          { code: 'IV', name: 'IV' },
                        ].map(item => (
                          <button
                            key={`rev-${item.code}`}
                            type="button"
                            onClick={() => {
                              setSelectedProcedure(item.code as any);
                              setActiveTab('review');
                            }}
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              selectedProcedure === item.code
                                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                                : 'bg-white dark:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                            }`}
                          >
                            <span>ภาพ {item.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hidden by default: Remaining Locked Topics only shown when showAllTopics is true */}
      {showAllTopics ? (
        <div className="space-y-3 pt-2 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <span>หัวข้อการเรียนรู้อื่นๆ ในหลักสูตร ({remainingTopics.length} หัวข้อที่รอการเปิดสอน)</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAllTopics(false)}
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              <span>พับเก็บ</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {remainingTopics.map((topic, i) => {
              const originalIndex = mainTopics.findIndex(t => t.id === topic.id);
              return (
                <div
                  key={topic.id}
                  onClick={() => openTopic(topic)}
                  className="bg-white/80 dark:bg-slate-800/60 rounded-3xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-amber-300 dark:hover:border-amber-700 transition-all cursor-pointer flex flex-col justify-between group hover:shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center shrink-0 group-hover:bg-amber-50 dark:group-hover:bg-amber-950/40 transition-colors">
                        {getTopicIcon(topic.iconName, false)}
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center gap-1 group-hover:bg-amber-100 dark:group-hover:bg-amber-950 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                        <Lock className="w-3 h-3 text-slate-400 group-hover:text-amber-500" />
                        <span>ปิด</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block mb-0.5">
                        หัวข้อที่ {originalIndex + 1}
                      </span>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {topic.nameTh}
                      </h3>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">
                        {topic.nameEn}
                      </p>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {topic.descriptionTh}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                    <span>{topic.estimatedHours}</span>
                    <span className="group-hover:text-amber-600 dark:group-hover:text-amber-400 flex items-center gap-0.5 font-medium transition-colors">
                      คลิกดูข้อมูล <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Collapsed hint and button to view all */
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <Lock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              ซ่อนหัวข้อการเรียนรู้อีก <strong>{remainingTopics.length} หัวข้อ</strong> (เช่น การให้สารน้ำ IV, สวนปัสสาวะ, ทำแผล, ใส่สาย NG tube ฯลฯ)
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowAllTopics(true)}
            className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs self-start sm:self-auto transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>กดดูทั้งหมด ({remainingTopics.length} หัวข้อ)</span>
          </button>
        </div>
      )}
    </div>
  );
};
