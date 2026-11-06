import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProcedureType, ReflectionItem } from '../../types';
import { InstructorSupervisedOverview } from './InstructorSupervisedOverview';
import { StudentGrowthDashboard } from './StudentGrowthDashboard';
import {
  Sparkles,
  Award,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Calendar,
  Save,
  Trash2,
  Download,
  Share2,
  HeartHandshake,
  ShieldCheck,
  User,
  GraduationCap,
  LogOut,
  Stethoscope,
  Home,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Syringe,
  CheckSquare,
  MessageSquare,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    user,
    confidenceRecords,
    addConfidenceRecord,
    reflections,
    addReflection,
    deleteReflection,
    selectedProcedure,
    setSelectedProcedure,
    getProcedureProgress,
    setIsLoginModalOpen,
    switchRole,
    playAudioChime,
    setActiveTab,
  } = useApp();

  // If instructor, render the dedicated Supervised Students Overview
  if (user.role === 'instructor') {
    return <InstructorSupervisedOverview />;
  }

  // Active form for new post-assessment & reflection
  const [procType, setProcType] = useState<ProcedureType>(selectedProcedure);
  const [preScore, setPreScore] = useState<number>(3);
  const [postScore, setPostScore] = useState<number>(5);

  const [whatWentWell, setWhatWentWell] = useState<string>('');
  const [whatWasChallenging, setWhatWasChallenging] = useState<string>('');
  const [actionPlan, setActionPlan] = useState<string>('');
  const [isSavedRecently, setIsSavedRecently] = useState<boolean>(false);

  // Reflection journal details visibility state (Hidden by default as requested)
  const [showAllDetails, setShowAllDetails] = useState<boolean>(false);
  const [expandedReflectionIds, setExpandedReflectionIds] = useState<Record<string, boolean>>({});

  const toggleReflectionDetail = (id: string) => {
    setExpandedReflectionIds(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatWentWell.trim() && !whatWasChallenging.trim()) return;

    // 1. Add Confidence record
    addConfidenceRecord({
      procedureType: procType,
      preScore,
      postScore,
      notes: whatWentWell.substring(0, 100),
    });

    // 2. Add Reflection item
    addReflection({
      procedureType: procType,
      preConfidenceScore: preScore,
      postConfidenceScore: postScore,
      whatWentWell: whatWentWell.trim() || 'ปฏิบัติตาม 10 Rights และขั้นตอนความปลอดภัยครบถ้วน',
      whatWasChallenging: whatWasChallenging.trim() || 'การจัดตำแหน่งและการแทงเข็มอย่างนิ่งมั่นคง',
      actionPlan: actionPlan.trim() || 'ฝึกคลำตำแหน่งกระดูกและมุมองศาอย่างสม่ำเสมอ',
    });

    playAudioChime('success');
    setIsSavedRecently(true);
    setWhatWentWell('');
    setWhatWasChallenging('');
    setActionPlan('');
    setTimeout(() => setIsSavedRecently(false), 3000);
  };

  // Export summary report
  const handleExportSummary = () => {
    const summaryText = `[รายงานสรุปการเรียนรู้: BCNR Skill UP]
นักศึกษา: ${user.name} (${user.studentCode})
ชั้นปี: ${user.year} กลุ่ม: ${user.group}
วันที่ออกรายงาน: ${new Date().toLocaleDateString('th-TH')}

ความก้าวหน้าของหัตถการ:
- IM (กล้ามเนื้อ): ${getProcedureProgress('IM')}%
- SC (ใต้ผิวหนัง): ${getProcedureProgress('SC')}%
- ID (ในชั้นผิวหนัง): ${getProcedureProgress('ID')}%
- IV (หลอดเลือดดำ): ${getProcedureProgress('IV')}%

ประวัติการสะท้อนคิด (${reflections.length} รายการ):
${reflections
  .map(
    (r, i) =>
      `\n#${i + 1} [${r.procedureType || r.procedureCode}] ${new Date(r.timestamp).toLocaleDateString('th-TH')}:
- ความมั่นใจ: ก่อนทำ ${r.preConfidenceScore ?? 3}/5 -> หลังทำ ${r.postConfidenceScore ?? 5}/5
- สิ่งที่ทำได้ดี: ${r.whatWentWell || r.strengths}
- สิ่งที่ท้าทาย: ${r.whatWasChallenging || r.uncertainties}
- แผนพัฒนา: ${r.actionPlan || r.nextImprovement}`
  )
  .join('\n')}
`;

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Injection_Reflection_${user.studentCode || 'summary'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const avgGain =
    confidenceRecords.length > 0
      ? (
          confidenceRecords.reduce((acc: number, c) => acc + ((c.postScore ?? 4) - c.preScore), 0) /
          confidenceRecords.length
        ).toFixed(1)
      : '0.0';

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Top Breadcrumb Card with กลับหน้าหลัก button */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        {/* Breadcrumb Hierarchy */}
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
            <Sparkles className="w-3 h-3 text-teal-600" />
            สะท้อนคิด & สรุปผล
          </span>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center font-extrabold text-xl shadow-md ${
            user.role === 'admin'
              ? 'bg-gradient-to-tr from-purple-600 to-indigo-800 shadow-purple-600/20'
              : 'bg-gradient-to-tr from-teal-600 to-teal-800 shadow-teal-600/20'
          }`}>
            {user.name.charAt(0) || 'น'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {user.name}
              </h2>
              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                user.role === 'admin'
                  ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                  : 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
              }`}>
                {user.role === 'admin' ? 'ผู้ดูแลระบบ' : user.year || 'นักศึกษา'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {user.role === 'admin'
                ? (user.department || 'ศูนย์เทคโนโลยีและนวัตกรรมการศึกษาพยาบาล BCNR')
                : `รหัส: ${user.studentCode || '6501234'} • กลุ่ม: ${user.group || 'กลุ่ม 2A'}`}
            </p>
            {user.role === 'student' && user.supervisingInstructor && (
              <p className="text-[11px] text-teal-700 dark:text-teal-400 font-semibold mt-0.5 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>อาจารย์นิเทศก์: {user.supervisingInstructor}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all"
          >
            แก้ไขข้อมูล
          </button>
          <button
            onClick={switchRole}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            title="สลับผู้ใช้งาน / เปลี่ยนบทบาทอาจารย์-นักศึกษา"
          >
            <LogOut className="w-3.5 h-3.5" />
            สลับบทบาท
          </button>
          <button
            onClick={handleExportSummary}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all bg-teal-600 hover:bg-teal-700"
          >
            <Download className="w-3.5 h-3.5" />
            ส่งออกรายงาน
          </button>
        </div>
      </div>

      {/* Student Clinical Growth & Competency Dashboard */}
      <StudentGrowthDashboard />

      {/* UNIT 4: POST-PRACTICE REFLECTION FORM (Kolb Cycle) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              สะท้อนคิดหลังทำ (Post-Practice Reflection & Assessment)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Kolb's Experiential Learning</span>
        </div>

        <form onSubmit={handleSaveReflection} className="space-y-4 text-xs">
          {/* Procedure & Confidence Sliders */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                เลือกหัตถการที่สะท้อนคิด:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['IM', 'SC', 'ID', 'IV'] as ProcedureType[]).map(p => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setProcType(p)}
                    className={`py-1.5 rounded-xl font-bold transition-all ${
                      procType === p
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider: Pre vs Post Confidence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>ความมั่นใจ "ก่อนทำ":</span>
                  <span className="font-bold text-teal-700 dark:text-teal-300">{preScore} / 5</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={preScore}
                  onChange={e => setPreScore(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>ความมั่นใจ "หลังทำ":</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{postScore} / 5</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={postScore}
                  onChange={e => setPostScore(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 3 Reflection Questions */}
          <div className="space-y-2.5">
            <div>
              <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                1. สิ่งที่ทำได้ดีตามเป้าหมาย (What went well):
              </label>
              <textarea
                value={whatWentWell}
                onChange={e => setWhatWentWell(e.target.value)}
                placeholder="เช่น ปฏิบัติตาม 10 Rights ตรวจสอบชื่อคนไข้และประวัติแพ้ยาได้อย่างมั่นใจ ล้างมือก่อน-หลังถูกต้อง..."
                rows={2}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                2. สิ่งที่รู้สึกกังวลหรือไม่มั่นใจ (What felt challenging):
              </label>
              <textarea
                value={whatWasChallenging}
                onChange={e => setWhatWasChallenging(e.target.value)}
                placeholder="เช่น รู้สึกมือสั่นเล็กน้อยตอนแทงเข็ม 90 องศา หรือกังวลตอนคลำหากระดูก greater trochanter..."
                rows={2}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                3. แผนการพัฒนาตนเองในครั้งต่อไป (Action plan):
              </label>
              <textarea
                value={actionPlan}
                onChange={e => setActionPlan(e.target.value)}
                placeholder="เช่น จะทบทวนจุดคลำกายวิภาคซ้ำบนโมเดล และฝึกจับกระบอกยาแบบลูกดอก (Dart) ให้ชินมือ..."
                rows={2}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            {isSavedRecently ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> บันทึกการสะท้อนคิดเรียบร้อยแล้ว
              </span>
            ) : (
              <span />
            )}

            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-xs flex items-center gap-2 transition-all ml-auto"
            >
              <Save className="w-4 h-4" />
              บันทึกการสะท้อนคิด
            </button>
          </div>
        </form>
      </div>

      {/* Saved Reflection Journal History */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              สมุดบันทึกการสะท้อนคิดของฉัน ({reflections.length} บันทึก)
            </h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              {showAllDetails ? 'แสดงรายละเอียดทั้งหมด' : 'ซ่อนหัวข้อรายละเอียดโดยเริ่มต้น'}
            </span>
          </div>

          {reflections.length > 0 && (
            <button
              type="button"
              onClick={() => setShowAllDetails(prev => !prev)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-all self-start sm:self-auto"
            >
              {showAllDetails ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>ซ่อนหัวข้อรายละเอียดทั้งหมด</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>แสดงหัวข้อรายละเอียดทั้งหมด</span>
                </>
              )}
            </button>
          )}
        </div>

        {reflections.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
            ยังไม่มีบันทึกการสะท้อนคิด ให้เริ่มบันทึกหลังการฝึกด้านบนเพื่อสะสมพัฒนาการ
          </div>
        ) : (
          <div className="space-y-2.5">
            {reflections.map(r => {
              const isExpanded = showAllDetails || !!expandedReflectionIds[r.id];
              const preScore = r.preConfidenceScore ?? 3;
              const postScore = r.postConfidenceScore ?? 5;
              const delta = postScore - preScore;

              return (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-2.5 shadow-xs transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-lg bg-teal-100 dark:bg-teal-950 font-extrabold text-teal-800 dark:text-teal-300 text-[11px]">
                        {r.procedureType || r.procedureCode}
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        {new Date(r.timestamp).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                        ความมั่นใจ: {preScore} → {postScore} ({delta >= 0 ? `+${delta}` : delta} คะแนน)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => toggleReflectionDetail(r.id)}
                        className="px-2.5 py-1 rounded-xl bg-teal-50 dark:bg-teal-950/80 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-[11px] font-bold flex items-center gap-1 transition-all"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5" />
                            <span>ซ่อนหัวข้อรายละเอียด</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5" />
                            <span>ดูหัวข้อรายละเอียด</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => deleteReflection(r.id)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        title="ลบบันทึก"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Collapsed State: Details are hidden by default */}
                  {!isExpanded && (
                    <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-700/60">
                      <span className="italic flex items-center gap-1.5">
                        <EyeOff className="w-3 h-3 text-slate-400 shrink-0" />
                        ซ่อนหัวข้อรายละเอียด (กด "ดูหัวข้อรายละเอียด" เพื่ออ่าน 3 ด้าน: สิ่งที่ทำได้ดี, จุดที่ท้าทาย, และแผนพัฒนา)
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleReflectionDetail(r.id)}
                        className="text-teal-600 dark:text-teal-400 font-semibold hover:underline shrink-0 ml-2"
                      >
                        เปิดอ่าน ▾
                      </button>
                    </div>
                  )}

                  {/* Expanded State: 3 Detailed Structured Reflection Fields */}
                  {isExpanded && (
                    <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-700/60 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60">
                        <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          1. สิ่งที่ทำได้ดีตามเป้าหมาย (What went well):
                        </span>
                        <p className="pl-3 text-slate-700 dark:text-slate-300 font-normal">
                          {r.whatWentWell || r.strengths || '-'}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60">
                        <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          2. สิ่งที่รู้สึกกังวลหรือไม่มั่นใจ (What felt challenging):
                        </span>
                        <p className="pl-3 text-slate-700 dark:text-slate-300 font-normal">
                          {r.whatWasChallenging || r.uncertainties || '-'}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60">
                        <span className="font-bold text-teal-900 dark:text-teal-200 block mb-0.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                          3. แผนการพัฒนาตนเองในครั้งต่อไป (Action plan):
                        </span>
                        <p className="pl-3 text-teal-800 dark:text-teal-300 font-medium">
                          {r.actionPlan || r.nextImprovement || '-'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
