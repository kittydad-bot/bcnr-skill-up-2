import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProcedureType } from '../../types';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  ArrowUpRight,
  Target,
  Activity,
  Layers,
  Zap,
  ChevronRight,
  BookOpen,
  CheckSquare,
  MessageSquare,
} from 'lucide-react';

export const StudentGrowthDashboard: React.FC = () => {
  const {
    user,
    confidenceRecords,
    reflections,
    getProcedureProgress,
    isChecklistComplete,
    checklistSteps,
    checkedStepIds,
    managedUsers,
    setActiveTab,
    setSelectedProcedure,
  } = useApp();

  // Match student record from managed users for instructor evaluation
  const studentRecord = managedUsers.find(
    u => u.code === user.studentCode || u.name === user.name
  );

  // Procedure progress calculations
  const imProg = getProcedureProgress('IM');
  const scProg = getProcedureProgress('SC');
  const idProg = getProcedureProgress('ID');
  const ivProg = getProcedureProgress('IV');
  const avgOverallProg = Math.round((imProg + scProg + idProg + ivProg) / 4);

  // Checklist counts
  const getCompletedStepCount = (code: ProcedureType) => {
    const steps = checklistSteps.filter(s => s.procedureCode === code);
    const completed = steps.filter(s => checkedStepIds.includes(s.id)).length;
    return { completed, total: steps.length };
  };

  // Confidence calculations
  const calculateConfidenceStats = () => {
    if (confidenceRecords.length > 0) {
      const totalPre = confidenceRecords.reduce((acc, c) => acc + (c.preScore || 3), 0);
      const totalPost = confidenceRecords.reduce((acc, c) => acc + (c.postScore || 4), 0);
      const preAvg = (totalPre / confidenceRecords.length).toFixed(1);
      const postAvg = (totalPost / confidenceRecords.length).toFixed(1);
      const delta = (Number(postAvg) - Number(preAvg)).toFixed(1);
      const pct = Number(preAvg) > 0 ? Math.round(((Number(postAvg) - Number(preAvg)) / Number(preAvg)) * 100) : 0;
      return { preAvg, postAvg, delta: Number(delta) > 0 ? `+${delta}` : delta, pct };
    }
    // Default baseline if no entries recorded yet
    const preAvg = studentRecord?.preConfidenceAvg?.toFixed(1) || '2.3';
    const postAvg = studentRecord?.postConfidenceAvg?.toFixed(1) || '4.7';
    const delta = '+2.4';
    const pct = 104;
    return { preAvg, postAvg, delta, pct };
  };

  const confStats = calculateConfidenceStats();

  // Per-procedure confidence mapping (Pre vs Post)
  const getProcedureConfidence = (code: ProcedureType) => {
    const record = confidenceRecords.find(r => r.procedureCode === code);
    if (record) {
      return {
        pre: record.preScore,
        post: record.postScore || 4,
        delta: (record.postScore || 4) - record.preScore,
      };
    }
    // Fallback baseline typical for nursing injection training
    const baselines: Record<ProcedureType, { pre: number; post: number }> = {
      IM: { pre: 2, post: 4 },
      SC: { pre: 3, post: 5 },
      ID: { pre: 2, post: 5 },
      IV: { pre: 2, post: 4 },
    };
    const b = baselines[code];
    return { pre: b.pre, post: b.post, delta: b.post - b.pre };
  };

  // Professional Competency Stage
  const getGrowthStage = () => {
    if (avgOverallProg >= 85) {
      return {
        stageNum: 3,
        title: 'ขั้นพร้อมขึ้นฝึกปฏิบัติการคลินิก (Competent Nurse Candidate)',
        desc: 'ผ่านเกณฑ์ทักษะและความปลอดภัย มีความพร้อมในการดูแลผู้ป่วยจริงภายใต้การนิเทศก์',
        color: 'emerald',
        badgeBg: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
      };
    } else if (avgOverallProg >= 50) {
      return {
        stageNum: 2,
        title: 'ขั้นก้าวหน้าสู่ความชำนาญ (Advanced Beginner)',
        desc: 'เข้าใจหลักการและฝึกฝนขั้นตอนหลักได้ดี กำลังพัฒนาความแม่นยำในการแทงเข็มและการจัดการความเสี่ยง',
        color: 'teal',
        badgeBg: 'bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-700',
      };
    }
    return {
      stageNum: 1,
      title: 'ขั้นเรียนรู้พื้นฐานและความปลอดภัย (Novice Learner)',
      desc: 'กำลังเริ่มทำความเข้าใจ 10 Rights กายวิภาค และขั้นตอนมาตรฐานของแต่ละหัตถการ',
      color: 'blue',
      badgeBg: 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700',
    };
  };

  const stage = getGrowthStage();

  const handleGoToProcedureChecklist = (code: ProcedureType) => {
    setSelectedProcedure(code);
    setActiveTab('checklist');
  };

  return (
    <div className="space-y-4">
      {/* SECTION 1: HERO GROWTH OVERVIEW BANNER */}
      <div className="bg-gradient-to-br from-teal-50 via-emerald-50/50 to-white dark:from-slate-800 dark:via-teal-950/20 dark:to-slate-800 rounded-3xl p-5 sm:p-6 border border-teal-200/90 dark:border-teal-800/70 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-300/15 dark:bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="hidden" style={{ display: 'none' }}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-teal-600/20 shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                    Dashboard สรุปการเจริญเติบโตและพัฒนาการทางคลินิก
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${stage.badgeBg}`}>
                    {stage.title.split('(')[0].trim()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  Clinical Competency & Experiential Growth Tracking • ติดตามพัฒนาการสมรรถนะและความมั่นใจ
                </p>
              </div>
            </div>

            <div className="hidden" style={{ display: 'none' }}>
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <div className="text-right">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">ความพร้อมคลินิกรวม</span>
                <span className="text-base font-black text-teal-700 dark:text-teal-300">{avgOverallProg}%</span>
              </div>
            </div>
          </div>

          {/* Competency Stage Progress Milestones */}
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/70 border border-teal-100 dark:border-teal-900/60 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <Target className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>สถานะพัฒนาการ: {stage.title}</span>
              </div>
              <span className="text-[11px] text-teal-700 dark:text-teal-400 font-semibold">
                ความก้าวหน้าเฉลี่ย 4 หัตถการ: {avgOverallProg}%
              </span>
            </div>

            {/* Stage Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/80 dark:border-slate-700">
              <div
                className="hidden"
                style={{ display: 'none' }}
              />
            </div>

            {/* 3 Milestones Stepper */}
            <div className="grid grid-cols-3 text-[11px] pt-1 text-slate-500 dark:text-slate-400">
              <div className={`flex items-center gap-1 font-semibold ${avgOverallProg >= 25 ? 'text-teal-700 dark:text-teal-300' : ''}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 ${avgOverallProg >= 25 ? 'text-teal-600' : 'text-slate-300'}`} />
                <span>1. Novice (10 Rights)</span>
              </div>
              <div className={`flex items-center justify-center gap-1 font-semibold ${avgOverallProg >= 60 ? 'text-teal-700 dark:text-teal-300' : ''}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 ${avgOverallProg >= 60 ? 'text-teal-600' : 'text-slate-300'}`} />
                <span>2. Advanced Beginner</span>
              </div>
              <div className={`flex items-center justify-end gap-1 font-semibold ${avgOverallProg >= 85 ? 'text-emerald-700 dark:text-emerald-300' : ''}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 ${avgOverallProg >= 85 ? 'text-emerald-600' : 'text-slate-300'}`} />
                <span>3. Competent Ready</span>
              </div>
            </div>
          </div>

          {/* 4 Summary Growth KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            {/* KPI 1 */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                <span className="text-[11px] font-bold">สมรรถนะรวม</span>
                <Activity className="w-3.5 h-3.5 text-teal-600" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-teal-600 dark:text-teal-400">{avgOverallProg}%</span>
                <span className="text-[10px] text-slate-400">4 หัตถการ</span>
              </div>
              <span className="text-[10px] text-teal-700 dark:text-teal-400 font-semibold block mt-0.5">
                {avgOverallProg >= 80 ? 'อยู่ในเกณฑ์ยอดเยี่ยม' : 'กำลังก้าวหน้าอย่างต่อเนื่อง'}
              </span>
            </div>

            {/* KPI 2 */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                <span className="text-[11px] font-bold">การเติบโตความมั่นใจ</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{confStats.delta}</span>
                <span className="text-[10px] text-slate-400">คะแนนเต็ม 5</span>
              </div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block mt-0.5">
                เติบโต +{confStats.pct}% หลังฝึก
              </span>
            </div>

            {/* KPI 3 */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                <span className="text-[11px] font-bold">สะท้อนคิดสะสม</span>
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-blue-600 dark:text-blue-400">{reflections.length}</span>
                <span className="text-[10px] text-slate-400">ครั้ง</span>
              </div>
              <span className="text-[10px] text-blue-700 dark:text-blue-400 font-semibold block mt-0.5">
                วงจร Kolb Experiential
              </span>
            </div>

            {/* KPI 4 */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                <span className="text-[11px] font-bold">ผลประเมินอาจารย์</span>
                <Award className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-amber-600 dark:text-amber-400">
                  {studentRecord?.evaluationGrade === 'Excellent'
                    ? 'ดีเยี่ยม'
                    : studentRecord?.evaluationGrade === 'Good'
                    ? 'ดีมาก'
                    : studentRecord?.evaluationGrade === 'Pass'
                    ? 'ผ่านเกณฑ์'
                    : 'ผ่านเกณฑ์ดี'}
                </span>
              </div>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold block mt-0.5 truncate">
                {user.supervisingInstructor ? `อ.นิเทศก์: ${user.supervisingInstructor.split(' ')[0]}` : 'ผ่านการประเมิน'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: 2-COLUMN DETAILED GROWTH BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* COLUMN 1: CONFIDENCE GROWTH TRAJECTORY (เปรียบเทียบก่อน-หลังฝึก) */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  พัฒนาการความมั่นใจรายหัตถการ
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  เปรียบเทียบความมั่นใจ ก่อนทำ (Pre) ➔ หลังทำ (Post)
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 block">
                {confStats.delta} คะแนน
              </span>
              <span className="text-[10px] text-slate-400">ค่าเฉลี่ยก้าวกระโดด</span>
            </div>
          </div>

          {/* Average Comparative Jump */}
          <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800 flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 block">
                ค่าเฉลี่ยความมั่นใจรวม:
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                จากความลังเลเริ่มต้นสู่ความคล่องแคล่ว
              </span>
            </div>
            <div className="flex items-center gap-2 font-black shrink-0">
              <div className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 block font-normal">ก่อนฝึก</span>
                <span className="text-sm">{confStats.preAvg} / 5</span>
              </div>
              <span className="text-teal-600 font-extrabold text-sm">➔</span>
              <div className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-center shadow-xs">
                <span className="text-[10px] text-emerald-100 block font-normal">หลังฝึก</span>
                <span className="text-sm">{confStats.postAvg} / 5</span>
              </div>
            </div>
          </div>

          {/* 4 Procedures Confidence Delta Bars */}
          <div className="space-y-3 pt-1">
            {(['IM', 'SC', 'ID', 'IV'] as ProcedureType[]).map(proc => {
              const pConf = getProcedureConfidence(proc);
              const prePct = (pConf.pre / 5) * 100;
              const postPct = (pConf.post / 5) * 100;

              return (
                <div key={proc} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-lg bg-teal-100 dark:bg-teal-950 font-extrabold text-teal-800 dark:text-teal-300 text-[11px]">
                        {proc}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {proc === 'IM'
                          ? 'กล้ามเนื้อ (Intramuscular)'
                          : proc === 'SC'
                          ? 'ใต้ผิวหนัง (Subcutaneous)'
                          : proc === 'ID'
                          ? 'ในชั้นผิวหนัง (Intradermal)'
                          : 'หลอดเลือดดำ (Intravenous)'}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      +{pConf.delta} คะแนน ({pConf.pre} ➔ {pConf.post}/5)
                    </span>
                  </div>

                  {/* Dual comparison bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden flex">
                      <div
                        className="bg-slate-400 dark:bg-slate-500 h-full rounded-l-full"
                        style={{ width: `${prePct}%` }}
                        title={`ก่อนฝึก: ${pConf.pre}/5`}
                      />
                      <div
                        className="bg-emerald-500 h-full rounded-r-full"
                        style={{ width: `${Math.max(postPct - prePct, 0)}%` }}
                        title={`พัฒนาเพิ่ม: +${pConf.delta}`}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>ความมั่นใจเริ่มต้น: {pConf.pre}/5</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">หลังฝึก: {pConf.post}/5 (เพิ่ม {Math.round((pConf.delta / pConf.pre) * 100)}%)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: 4 INJECTIONS CLINICAL READINESS & PRECEPTOR FEEDBACK */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    ความพร้อมสมรรถนะ 4 หัตถการ
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    ความก้าวหน้า Checklist และการรับรองความปลอดภัย
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                10 Rights Certified
              </span>
            </div>

            {/* 4 Procedures Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { code: 'IM' as ProcedureType, title: 'IM กล้ามเนื้อ', prog: imProg, site: 'Ventrogluteal / Deltoid' },
                { code: 'SC' as ProcedureType, title: 'SC ใต้ผิวหนัง', prog: scProg, site: 'Abdomen / Upper arm' },
                { code: 'ID' as ProcedureType, title: 'ID ในผิวหนัง', prog: idProg, site: 'Forearm 10-15°' },
                { code: 'IV' as ProcedureType, title: 'IV หลอดเลือด', prog: ivProg, site: 'Dorsal vein / Forearm' },
              ].map(item => {
                const isDone = isChecklistComplete(item.code);
                const stepCount = getCompletedStepCount(item.code);

                return (
                  <div
                    key={item.code}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:border-teal-300 dark:hover:border-teal-700 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-extrabold text-xs text-slate-800 dark:text-slate-100">
                          {item.title}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          isDone
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300'
                        }`}>
                          {item.prog}%
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden mb-2">
                        <div
                          className="bg-teal-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${item.prog}%` }}
                        />
                      </div>

                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        Landmark: {item.site}
                      </p>
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-medium">
                        {stepCount.completed}/{stepCount.total} สเต็ป
                      </span>
                      <button
                        onClick={() => handleGoToProcedureChecklist(item.code)}
                        className="text-[10px] font-bold text-teal-700 dark:text-teal-300 hover:underline flex items-center gap-0.5"
                      >
                        <span>ฝึก Checklist</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Supervising Preceptor Clinical Feedback Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50/80 to-blue-50/80 dark:from-slate-900 dark:to-slate-900 border border-teal-200 dark:border-teal-800/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-teal-700 dark:text-teal-300" />
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  ข้อเสนอแนะเพื่อการเจริญเติบโตจากอาจารย์นิเทศก์
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {studentRecord?.evaluationGrade || 'ผ่านเกณฑ์ดีเยี่ยม (Excellent)'}
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 italic bg-white/70 dark:bg-slate-800/70 p-3 rounded-xl border border-teal-100 dark:border-teal-900/60 leading-relaxed">
              "{studentRecord?.instructorFeedback || 'มีความละเอียดรอบคอบในการทวนสอบ 10 Rights คลำ Landmark Ventrogluteal ได้ถูกต้อง และมีทักษะการสื่อสารให้ความมั่นใจแก่ผู้ป่วยได้ดีมาก แนะนำให้ฝึกจับกระบอกยาแบบ Dart ให้นิ่งมั่นคงยิ่งขึ้น'}"
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
              <span>อาจารย์ผู้ประเมิน: <strong>{user.supervisingInstructor || 'อ.ดร. นันทวัน เกียรติพยาบาล'}</strong></span>
              <span className="text-teal-700 dark:text-teal-400 font-semibold">วอร์ดอายุรกรรม</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
