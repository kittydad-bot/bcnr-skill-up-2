import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ManagedUser, StudentReflectionDetail, ProcedureType } from '../../types';
import {
  Users,
  GraduationCap,
  Award,
  TrendingUp,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Star,
  FileText,
  Filter,
  Send,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Shield,
  Activity,
  HeartPulse,
  UserCheck,
  CheckSquare,
  MessageSquare,
  X,
  Building2,
  PlusCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Layers,
  Baby,
  Stethoscope,
  Scissors,
  Check,
  BadgeAlert,
  Database,
  Printer,
} from 'lucide-react';

type OverviewTab = 'ward-summary' | 'real-database' | 'all-students' | 'ward-matrix';

export const InstructorSupervisedOverview: React.FC = () => {
  const {
    user,
    managedUsers,
    addManagedUser,
    evaluateStudent,
    deleteManagedUser,
    setActiveTab,
    setIsLoginModalOpen,
    switchRole,
    playAudioChime,
  } = useApp();

  // Tab View Mode
  const [activeSubTab, setActiveSubTab] = useState<OverviewTab>('ward-summary');

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWardFilter, setSelectedWardFilter] = useState('all');
  const [realFilterOnly, setRealFilterOnly] = useState(false);

  // Modals state
  const [selectedStudentForEvaluation, setSelectedStudentForEvaluation] = useState<ManagedUser | null>(null);
  const [evalGrade, setEvalGrade] = useState<'Pass' | 'Good' | 'Excellent' | 'Pending'>('Good');
  const [evalFeedback, setEvalFeedback] = useState('');

  const [studentDetailModal, setStudentDetailModal] = useState<ManagedUser | null>(null);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  // New Student Form State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentCode, setNewStudentCode] = useState('');
  const [newStudentYear, setNewStudentYear] = useState('ชั้นปีที่ 2');
  const [newStudentWard, setNewStudentWard] = useState('กลุ่ม 2A (วอร์ดอายุรกรรม 4B)');
  const [newStudentSupervising, setNewStudentSupervising] = useState(user.name);

  // Expanded student cards in ward view
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);

  // Get student list only
  const allStudents = useMemo(() => managedUsers.filter((u) => u.role === 'student'), [managedUsers]);

  // Real student submissions count
  const realStudentsCount = useMemo(() => allStudents.filter((s) => s.isRealStudent).length, [allStudents]);

  // Unique Wards List
  const uniqueWards = useMemo(() => {
    const wardSet = new Set<string>();
    allStudents.forEach((s) => {
      if (s.groupOrWard) {
        wardSet.add(s.groupOrWard);
      }
    });
    return Array.from(wardSet);
  }, [allStudents]);

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return allStudents.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.code.includes(searchQuery) ||
        (s.groupOrWard && s.groupOrWard.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesWard =
        selectedWardFilter === 'all' || (s.groupOrWard && s.groupOrWard.includes(selectedWardFilter));

      const matchesReal = !realFilterOnly || s.isRealStudent;

      return matchesSearch && matchesWard && matchesReal;
    });
  }, [allStudents, searchQuery, selectedWardFilter, realFilterOnly]);

  // Group filtered students by Ward
  const studentsGroupedByWard = useMemo(() => {
    const groups: Record<string, ManagedUser[]> = {};
    filteredStudents.forEach((s) => {
      const wardKey = s.groupOrWard || 'วอร์ดทั่วไป (ไม่ระบุ)';
      if (!groups[wardKey]) {
        groups[wardKey] = [];
      }
      groups[wardKey].push(s);
    });
    return groups;
  }, [filteredStudents]);

  // Calculation helpers
  const calculateStudentOverall = (s: ManagedUser) => {
    if (!s.procedureProgress) return 0;
    const { IM = 0, SC = 0, ID = 0, IV = 0 } = s.procedureProgress;
    return Math.round((IM + SC + ID + IV) / 4);
  };

  const calculateWardStats = (wardStudents: ManagedUser[]) => {
    const total = wardStudents.length;
    if (total === 0) {
      return {
        total: 0,
        avgOverall: 0,
        avgIM: 0,
        avgSC: 0,
        avgID: 0,
        avgIV: 0,
        avgPre: 0,
        avgPost: 0,
        avgGain: 0,
        evaluatedCount: 0,
        realCount: 0,
        totalReflections: 0,
      };
    }

    const avgOverall = Math.round(
      wardStudents.reduce((acc, s) => acc + calculateStudentOverall(s), 0) / total
    );
    const avgIM = Math.round(
      wardStudents.reduce((acc, s) => acc + (s.procedureProgress?.IM ?? 0), 0) / total
    );
    const avgSC = Math.round(
      wardStudents.reduce((acc, s) => acc + (s.procedureProgress?.SC ?? 0), 0) / total
    );
    const avgID = Math.round(
      wardStudents.reduce((acc, s) => acc + (s.procedureProgress?.ID ?? 0), 0) / total
    );
    const avgIV = Math.round(
      wardStudents.reduce((acc, s) => acc + (s.procedureProgress?.IV ?? 0), 0) / total
    );

    const avgPre = Number(
      (wardStudents.reduce((acc, s) => acc + (s.preConfidenceAvg ?? 2.0), 0) / total).toFixed(1)
    );
    const avgPost = Number(
      (wardStudents.reduce((acc, s) => acc + (s.postConfidenceAvg ?? 4.0), 0) / total).toFixed(1)
    );
    const avgGain = Number((avgPost - avgPre).toFixed(1));

    const evaluatedCount = wardStudents.filter(
      (s) => s.evaluationGrade && s.evaluationGrade !== 'Pending'
    ).length;

    const realCount = wardStudents.filter((s) => s.isRealStudent).length;

    const totalReflections = wardStudents.reduce((acc, s) => acc + (s.reflectionCount || 0), 0);

    return {
      total,
      avgOverall,
      avgIM,
      avgSC,
      avgID,
      avgIV,
      avgPre,
      avgPost,
      avgGain,
      evaluatedCount,
      realCount,
      totalReflections,
    };
  };

  // Cohort-wide stats
  const cohortStats = useMemo(() => calculateWardStats(allStudents), [allStudents]);

  // Ward Icon Helper
  const getWardIcon = (wardName: string) => {
    if (wardName.includes('อายุรกรรม')) return <Stethoscope className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
    if (wardName.includes('ศัลยกรรม')) return <Scissors className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    if (wardName.includes('สูติ') || wardName.includes('นรีเวช')) return <HeartPulse className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
    if (wardName.includes('เด็ก') || wardName.includes('กุมาร')) return <Baby className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
    return <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
  };

  // Evaluation Actions
  const openEval = (student: ManagedUser) => {
    setSelectedStudentForEvaluation(student);
    setEvalGrade(student.evaluationGrade || 'Good');
    setEvalFeedback(student.instructorFeedback || '');
    playAudioChime('click');
  };

  const handleSaveEval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForEvaluation) return;

    evaluateStudent(
      selectedStudentForEvaluation.id,
      evalGrade,
      evalFeedback.trim() || 'ผ่านเกณฑ์มาตรฐานการปฏิบัติการพยาบาลและความปลอดภัยทางคลินิก'
    );
    setSelectedStudentForEvaluation(null);
    playAudioChime('success');
  };

  // Add new student
  const handleAddNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentCode.trim()) return;

    addManagedUser({
      role: 'student',
      name: newStudentName.trim(),
      code: newStudentCode.trim(),
      yearOrDept: newStudentYear,
      groupOrWard: newStudentWard.trim(),
      status: 'active',
      supervisingInstructor: newStudentSupervising.trim() || user.name,
      reflectionCount: 0,
      confidenceScoreAvg: 0,
      preConfidenceAvg: 0,
      postConfidenceAvg: 0,
      procedureProgress: { IM: 0, SC: 0, ID: 0, IV: 0 },
      checklistCompleted: { IM: false, SC: false, ID: false, IV: false },
      allReflections: [],
      isRealStudent: true,
      evaluationGrade: 'Pending',
    });

    setIsAddStudentModalOpen(false);
    setNewStudentName('');
    setNewStudentCode('');
    playAudioChime('success');
  };

  // Export full cohort supervision report
  const handleExportCohortReport = (targetWard?: string) => {
    const listToExport = targetWard ? allStudents.filter((s) => s.groupOrWard === targetWard) : allStudents;
    const stats = calculateWardStats(listToExport);

    const reportText = `================================================================================
รายงานสรุปผลการนิเทศก์นักศึกษาพยาบาล (Clinical Supervision & Ward Group Report)
สถาบัน: วิทยาลัยพยาบาลบรมราชชนนี นครราชสีมา (BCNR Skill UP)
================================================================================
อาจารย์นิเทศก์ผู้รับผิดชอบ: ${user.name} (${user.instructorCode || 'INS-4409'})
ตำแหน่ง/ภาควิชา: ${user.department || 'กลุ่มวิชาการพยาบาลพื้นฐานและบริหารการพยาบาล'}
หัวข้อรายงาน: ${targetWard ? `สรุปเฉพาะหอผู้ป่วย: ${targetWard}` : 'สรุปภาพรวมนักศึกษาทุกกลุ่มวอร์ด'}
วันที่ออกรายงาน: ${new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}

[สถิติภาพรวมกลุ่ม]
- จำนวนนักศึกษาทั้งหมด: ${stats.total} คน
- จำนวนนักศึกษาที่มีการกรอกข้อมูลจริงในระบบ: ${stats.realCount} คน
- ความก้าวหน้าสมรรถนะเฉลี่ยรวม: ${stats.avgOverall}%
  * IM (เข้ากล้ามเนื้อ): ${stats.avgIM}%
  * SC (ใต้ผิวหนัง): ${stats.avgSC}%
  * ID (ในชั้นผิวหนัง): ${stats.avgID}%
  * IV (หลอดเลือดดำ): ${stats.avgIV}%
- ความมั่นใจเฉลี่ย: ก่อนฝึก ${stats.avgPre}/5 -> หลังฝึก ${stats.avgPost}/5 (เพิ่มขึ้น +${stats.avgGain})
- จำนวนบันทึกสะท้อนคิดรวม: ${stats.totalReflections} ฉบับ
- การประเมินสมรรถนะแล้วเสร็จ: ${stats.evaluatedCount} / ${stats.total} คน
================================================================================

[รายชื่อและผลการประเมินนักศึกษา]:
${listToExport
  .map(
    (s, idx) => `
#${idx + 1} ${s.name} (รหัส: ${s.code})
- วอร์ด/กลุ่ม: ${s.groupOrWard} | ชั้นปี: ${s.yearOrDept}
- ข้อมูลการบันทึก: ${s.isRealStudent ? 'กรอกจริงผ่านระบบ (Real Submission)' : 'ข้อมูลตั้งต้นในระบบ'}
- สถานะระบบ: ${s.lastActive}
- ความก้าวหน้าหัตถการ: รวม ${calculateStudentOverall(s)}% [IM:${s.procedureProgress?.IM ?? 0}%, SC:${s.procedureProgress?.SC ?? 0}%, ID:${s.procedureProgress?.ID ?? 0}%, IV:${s.procedureProgress?.IV ?? 0}%]
- ความมั่นใจเฉลี่ย: ก่อน ${s.preConfidenceAvg ?? 2.0}/5 -> หลัง ${s.postConfidenceAvg ?? 4.0}/5
- บันทึกสะท้อนคิด: ${s.reflectionCount || 0} ครั้ง
- บันทึกสะท้อนคิดล่าสุด:
  * หัวข้อ: ${s.latestReflection?.topic || '-'}
  * จุดแข็ง: ${s.latestReflection?.strength || '-'}
  * สิ่งที่ท้าทาย: ${s.latestReflection?.challenge || '-'}
  * แผนพัฒนา: ${s.latestReflection?.plan || '-'}
- ผลการประเมินโดยอาจารย์: ${s.evaluationGrade || 'รอประเมิน'}
- ข้อเสนอแนะจากอาจารย์: ${s.instructorFeedback || '-'}`
  )
  .join('\n--------------------------------------------------------------------------------')}

================================================================================
ลงชื่อ.......................................................... อาจารย์นิเทศก์
(${user.name})
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ward_Supervision_Report_${targetWard ? targetWard.replace(/[^a-zA-Z0-9ก-๙]/g, '_') : 'Cohort'}_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    playAudioChime('success');
  };

  // Export CSV for Excel
  const handleExportCSV = () => {
    const headers = [
      'รหัสนักศึกษา',
      'ชื่อ-นามสกุล',
      'กลุ่มวอร์ด',
      'ชั้นปี',
      'อาจารย์นิเทศก์',
      'ความก้าวหน้ารวม(%)',
      'IM(%)',
      'SC(%)',
      'ID(%)',
      'IV(%)',
      'ความมั่นใจก่อน',
      'ความมั่นใจหลัง',
      'จำนวนสะท้อนคิด',
      'ผลการประเมิน',
      'ข้อเสนอแนะอาจารย์',
      'ข้อมูลกรอกจริง',
      'กิจกรรมล่าสุด',
    ];

    const rows = allStudents.map((s) => [
      `"${s.code}"`,
      `"${s.name}"`,
      `"${s.groupOrWard}"`,
      `"${s.yearOrDept}"`,
      `"${s.supervisingInstructor || user.name}"`,
      calculateStudentOverall(s),
      s.procedureProgress?.IM ?? 0,
      s.procedureProgress?.SC ?? 0,
      s.procedureProgress?.ID ?? 0,
      s.procedureProgress?.IV ?? 0,
      s.preConfidenceAvg ?? 0,
      s.postConfidenceAvg ?? 0,
      s.reflectionCount ?? 0,
      `"${s.evaluationGrade || 'รอประเมิน'}"`,
      `"${(s.instructorFeedback || '').replace(/"/g, '""')}"`,
      s.isRealStudent ? 'ใช่' : 'ไม่',
      `"${s.lastActive || '-'}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Student_Database_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    playAudioChime('success');
  };

  return (
    <div className="space-y-6 pb-24 animate-fadeIn">
      {/* 1. Header Navigation Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <button
              onClick={() => setActiveTab('home')}
              className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-700 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1.5 font-bold transition-all text-xs border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>กลับสู่แผงควบคุม</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-extrabold text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>โปรไฟล์อาจารย์ & การนิเทศก์ทางคลินิก</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddStudentModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>เพิ่มนักศึกษาใหม่</span>
            </button>
            <button
              onClick={() => handleExportCohortReport()}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ส่งออกรายงานสรุป (.TXT)</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
              title="ส่งออกไฟล์ Excel/CSV"
            >
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>ส่งออก CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Instructor Profile Identity & Clinical Command Card */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 sm:p-7 text-white border border-indigo-500/30 shadow-xl space-y-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-indigo-600/40 border border-indigo-400/30">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">{user.name}</h1>
                <span className="px-3 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 text-xs font-bold">
                  อาจารย์นิเทศก์คลินิก
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>ระบบฐานข้อมูลออนไลน์</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-200/90 mt-1 font-medium">
                {user.department || 'กลุ่มวิชาการพยาบาลพื้นฐานและบริหารการพยาบาล'} • {user.group || 'วอร์ดอายุรกรรม 4B'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                รหัสอาจารย์: <span className="font-mono text-indigo-200">{user.instructorCode || 'INS-4409'}</span> | สังกัด: วิทยาลัยพยาบาลบรมราชชนนี นครราชสีมา (BCNR)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-center">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all cursor-pointer"
            >
              แก้ไขโปรไฟล์อาจารย์
            </button>
            <button
              onClick={switchRole}
              className="px-3.5 py-2 rounded-xl bg-indigo-500/30 hover:bg-indigo-500/50 text-indigo-200 font-bold text-xs border border-indigo-400/40 transition-all cursor-pointer"
            >
              สลับบทบาท
            </button>
          </div>
        </div>

        {/* Supervision Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-indigo-800/60 relative z-10">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="block text-xs text-indigo-200 font-medium">นักศึกษาในความดูแล</span>
            <span className="text-2xl font-black text-white">{cohortStats.total} คน</span>
            <span className="block text-[10px] text-indigo-300/80 mt-0.5">ทั้งหมด {uniqueWards.length} หอผู้ป่วย</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="block text-xs text-indigo-200 font-medium">กรอกข้อมูลจริงผ่านแอป</span>
            <span className="text-2xl font-black text-emerald-400">{cohortStats.realCount} คน</span>
            <span className="block text-[10px] text-emerald-300/80 mt-0.5">ฐานข้อมูล Real Submission</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="block text-xs text-indigo-200 font-medium">ความก้าวหน้าเฉลี่ย</span>
            <span className="text-2xl font-black text-teal-300">{cohortStats.avgOverall}%</span>
            <span className="block text-[10px] text-teal-200/80 mt-0.5">สมรรถนะฉีดยา 4 ด้าน</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="block text-xs text-indigo-200 font-medium">ความมั่นใจเพิ่มขึ้น</span>
            <span className="text-2xl font-black text-amber-300">+{cohortStats.avgGain}</span>
            <span className="block text-[10px] text-amber-200/80 mt-0.5">จาก {cohortStats.avgPre} เป็น {cohortStats.avgPost}/5</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center col-span-2 sm:col-span-1">
            <span className="block text-xs text-indigo-200 font-medium">ประเมินผลสำเร็จ</span>
            <span className="text-2xl font-black text-indigo-300">
              {cohortStats.evaluatedCount} / {cohortStats.total}
            </span>
            <span className="block text-[10px] text-indigo-200/80 mt-0.5">
              {Math.round((cohortStats.evaluatedCount / (cohortStats.total || 1)) * 100)}% เสร็จสิ้น
            </span>
          </div>
        </div>
      </div>

      {/* 3. Sub-Navigation Switcher Tabs */}
      <div className="flex flex-wrap items-center bg-slate-100 dark:bg-slate-800/90 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 gap-1.5 shadow-xs">
        <button
          onClick={() => {
            setActiveSubTab('ward-summary');
            playAudioChime('click');
          }}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'ward-summary'
              ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>หน้าสรุปข้อมูลเด็กทุกคนแบ่งตามกลุ่มวอร์ด (Ward Summary)</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
            {uniqueWards.length} วอร์ด
          </span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('real-database');
            playAudioChime('click');
          }}
          className={`flex-1 min-w-[180px] py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'real-database'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>ฐานสรุปข้อมูลนักเรียนที่กรอกจริง (Real Submissions)</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
            {cohortStats.realCount} คน
          </span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('all-students');
            playAudioChime('click');
          }}
          className={`py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'all-students'
              ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>รายชื่อนักศึกษาทั้งหมด ({cohortStats.total})</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('ward-matrix');
            playAudioChime('click');
          }}
          className={`py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'ward-matrix'
              ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>ตารางเปรียบเทียบรายวอร์ด</span>
        </button>
      </div>

      {/* 4. Global Search & Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อนักศึกษา, รหัส 7 หลัก, วอร์ดที่ฝึก, หรือบันทึกสะท้อนคิด..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Ward filter */}
          <select
            value={selectedWardFilter}
            onChange={(e) => setSelectedWardFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">ทุกหอผู้ป่วยฝึกปฏิบัติ (ทุกวอร์ด)</option>
            {uniqueWards.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>

          {/* Real submission filter toggle */}
          <button
            onClick={() => setRealFilterOnly(!realFilterOnly)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              realFilterOnly
                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>เฉพาะที่กรอกจริง</span>
            {realFilterOnly && <Check className="w-3 h-3 ml-0.5" />}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: สรุปข้อมูลเด็กทุกคนแบ่งตามกลุ่มวอร์ด (Ward Summary View)           */}
      {/* ========================================================================= */}
      {activeSubTab === 'ward-summary' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>สรุปภาพรวมนักศึกษาแบ่งตามกลุ่มวอร์ด / หอผู้ป่วยฝึกปฏิบัติคลินิก</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                จำแนกนักศึกษาตามหอผู้ป่วย พร้อมค่าเฉลี่ยสมรรถนะ 4 ด้าน และบันทึกสะท้อนคิดรายบุคคล
              </p>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline-block">
              พบ {Object.keys(studentsGroupedByWard).length} กลุ่มวอร์ด
            </span>
          </div>

          {Object.keys(studentsGroupedByWard).length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                ไม่พบข้อมูลนักศึกษาในเงื่อนไขการค้นหานี้
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ลองปรับเปลี่ยนคำค้นหา หรือเลือกตัวกรองหอผู้ป่วยใหม่
              </p>
            </div>
          ) : (
            Object.entries(studentsGroupedByWard).map(([wardName, wardStudents]) => {
              const wardStats = calculateWardStats(wardStudents);

              return (
                <div
                  key={wardName}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
                >
                  {/* Ward Header Banner */}
                  <div className="p-5 bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 dark:from-slate-800/80 dark:via-indigo-950/30 dark:to-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shadow-xs border border-indigo-100 dark:border-indigo-900/50">
                        {getWardIcon(wardName)}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-black text-slate-900 dark:text-white">
                            {wardName}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                            {wardStats.total} คน
                          </span>
                          {wardStats.realCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center gap-1 border border-emerald-300 dark:border-emerald-800">
                              <Database className="w-3 h-3" />
                              <span>กรอกจริง {wardStats.realCount} คน</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          การประเมินเสร็จแล้ว {wardStats.evaluatedCount}/{wardStats.total} คน • บันทึกสะท้อนคิดรวม {wardStats.totalReflections} ฉบับ
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Ward Overall Score Pill */}
                      <div className="px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3">
                        <div className="text-right">
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                            สมรรถนะเฉลี่ยวอร์ด
                          </span>
                          <span className="text-base font-black text-indigo-600 dark:text-indigo-400">
                            {wardStats.avgOverall}%
                          </span>
                        </div>
                        <div className="w-px h-7 bg-slate-200 dark:bg-slate-700" />
                        <div className="text-left">
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                            ความมั่นใจเฉลี่ย
                          </span>
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                            {wardStats.avgPre} → {wardStats.avgPost}/5 (+{wardStats.avgGain})
                          </span>
                        </div>
                      </div>

                      {/* Print/Export Ward Report */}
                      <button
                        onClick={() => handleExportCohortReport(wardName)}
                        className="px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs border border-indigo-200 dark:border-indigo-800 transition-all flex items-center gap-1.5 cursor-pointer"
                        title="พิมพ์รายงานสรุปเฉพาะวอร์ดนี้"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">รายงานวอร์ดนี้</span>
                      </button>
                    </div>
                  </div>

                  {/* Ward 4-Skill Aggregate Bars */}
                  <div className="p-4 bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-teal-200/70 dark:border-teal-900/50">
                        <div className="flex justify-between font-bold text-teal-900 dark:text-teal-200 mb-1">
                          <span>IM (เข้ากล้ามเนื้อ)</span>
                          <span>{wardStats.avgIM}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-teal-600 h-full rounded-full" style={{ width: `${wardStats.avgIM}%` }} />
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-200/70 dark:border-amber-900/50">
                        <div className="flex justify-between font-bold text-amber-900 dark:text-amber-200 mb-1">
                          <span>SC (ใต้ผิวหนัง)</span>
                          <span>{wardStats.avgSC}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-600 h-full rounded-full" style={{ width: `${wardStats.avgSC}%` }} />
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-sky-200/70 dark:border-sky-900/50">
                        <div className="flex justify-between font-bold text-sky-900 dark:text-sky-200 mb-1">
                          <span>ID (ในชั้นผิวหนัง)</span>
                          <span>{wardStats.avgID}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-sky-600 h-full rounded-full" style={{ width: `${wardStats.avgID}%` }} />
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-200/70 dark:border-blue-900/50">
                        <div className="flex justify-between font-bold text-blue-900 dark:text-blue-200 mb-1">
                          <span>IV (หลอดเลือดดำ)</span>
                          <span>{wardStats.avgIV}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: `${wardStats.avgIV}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Student Cards in this Ward */}
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wardStudents.map((student) => {
                        const isExpanded = expandedStudentId === student.id;
                        const overall = calculateStudentOverall(student);

                        return (
                          <div
                            key={student.id}
                            className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-3"
                          >
                            {/* Student Header */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black text-sm flex items-center justify-center border border-indigo-200 dark:border-indigo-800 shadow-xs shrink-0">
                                  {student.name.charAt(student.name.startsWith('นศพย.') ? 7 : 0) || 'น'}
                                </div>
                                <div>
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                      {student.name}
                                    </h4>
                                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                                      ({student.code})
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                    <span>{student.yearOrDept}</span>
                                    <span>•</span>
                                    {student.isRealStudent ? (
                                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                                        <Database className="w-3 h-3" />
                                        <span>กรอกจริงผ่านระบบ</span>
                                      </span>
                                    ) : (
                                      <span>ข้อมูลจำลอง</span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Grade Badge */}
                              <span
                                className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                                  student.evaluationGrade === 'Excellent'
                                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                    : student.evaluationGrade === 'Good'
                                    ? 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800'
                                    : student.evaluationGrade === 'Pass'
                                    ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                                    : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                                }`}
                              >
                                {student.evaluationGrade === 'Excellent'
                                  ? '★ ดีเยี่ยม'
                                  : student.evaluationGrade === 'Good'
                                  ? '✓ ดี'
                                  : student.evaluationGrade === 'Pass'
                                  ? '✓ ผ่าน'
                                  : 'รอประเมิน'}
                              </span>
                            </div>

                            {/* 4 Procedures Mini Progress */}
                            <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                              <div className="p-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/40">
                                <span className="block text-slate-500 dark:text-slate-400">IM</span>
                                <span className="font-bold text-teal-700 dark:text-teal-300">
                                  {student.procedureProgress?.IM ?? 0}%
                                </span>
                              </div>
                              <div className="p-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40">
                                <span className="block text-slate-500 dark:text-slate-400">SC</span>
                                <span className="font-bold text-amber-700 dark:text-amber-300">
                                  {student.procedureProgress?.SC ?? 0}%
                                </span>
                              </div>
                              <div className="p-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40">
                                <span className="block text-slate-500 dark:text-slate-400">ID</span>
                                <span className="font-bold text-sky-700 dark:text-sky-300">
                                  {student.procedureProgress?.ID ?? 0}%
                                </span>
                              </div>
                              <div className="p-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40">
                                <span className="block text-slate-500 dark:text-slate-400">IV</span>
                                <span className="font-bold text-blue-700 dark:text-blue-300">
                                  {student.procedureProgress?.IV ?? 0}%
                                </span>
                              </div>
                            </div>

                            {/* Confidence & Reflection Summary Snippet */}
                            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                              <div>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400">ความมั่นใจ: </span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">
                                  {student.preConfidenceAvg ?? 2.0} → {student.postConfidenceAvg ?? 4.0}/5
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
                                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                                <span>สะท้อนคิด {student.reflectionCount || 0} ครั้ง</span>
                              </div>
                            </div>

                            {/* Latest reflection snippet */}
                            {student.latestReflection && (
                              <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs space-y-1">
                                <div className="flex items-center justify-between text-[11px] text-indigo-700 dark:text-indigo-300 font-bold">
                                  <span>สะท้อนคิดล่าสุด: {student.latestReflection.topic}</span>
                                  <span className="text-slate-400 font-normal">{student.latestReflection.date}</span>
                                </div>
                                <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                                  <strong className="text-slate-700 dark:text-slate-200">จุดแข็ง:</strong> {student.latestReflection.strength}
                                </p>
                              </div>
                            )}

                            {/* Feedback snippet if evaluated */}
                            {student.instructorFeedback && (
                              <div className="p-2.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40 text-xs">
                                <span className="text-[10px] font-bold text-teal-800 dark:text-teal-300 block mb-0.5">
                                  ข้อเสนอแนะอาจารย์:
                                </span>
                                <p className="text-[11px] text-teal-900 dark:text-teal-200 italic line-clamp-2">
                                  "{student.instructorFeedback}"
                                </p>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                              <button
                                onClick={() => openEval(student)}
                                className="flex-1 py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Star className="w-3.5 h-3.5" />
                                <span>{student.evaluationGrade && student.evaluationGrade !== 'Pending' ? 'แก้ไขผลประเมิน' : 'ประเมินสมรรถนะ'}</span>
                              </button>

                              <button
                                onClick={() => {
                                  setStudentDetailModal(student);
                                  playAudioChime('click');
                                }}
                                className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>ดูข้อมูลจริง</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ฐานสรุปข้อมูลนักเรียนที่กรอกจริง (Real Submissions Database)          */}
      {/* ========================================================================= */}
      {activeSubTab === 'real-database' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-transparent p-5 rounded-3xl border border-teal-200/80 dark:border-teal-800">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-bold">
                <Database className="w-3.5 h-3.5" />
                <span>ฐานข้อมูลการบันทึกจริง (Real Submissions Database)</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                ฐานสรุปข้อมูลนักเรียนที่กรอกข้อมูลจริงในระบบ
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                รวบรวมข้อมูลดิบและสถิติจากนักศึกษาที่ลงทะเบียนจริง ทำ Checklist ประเมินความมั่นใจ และส่งบันทึกสะท้อนคิด (Reflection)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ดาวน์โหลดฐานข้อมูล .CSV</span>
              </button>
            </div>
          </div>

          {/* Real Students Roster Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>รายการนักศึกษา ({filteredStudents.length} คน)</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ข้อมูลอัปเดตแบบ Real-time ตามที่นักศึกษากรอก
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3.5">นักศึกษา</th>
                    <th className="p-3.5">หอผู้ป่วย (วอร์ด)</th>
                    <th className="p-3.5 text-center">ประเภทข้อมูล</th>
                    <th className="p-3.5 text-center">สมรรถนะรวม</th>
                    <th className="p-3.5 text-center">IM/SC/ID/IV</th>
                    <th className="p-3.5 text-center">ความมั่นใจ</th>
                    <th className="p-3.5 text-center">สะท้อนคิด</th>
                    <th className="p-3.5 text-center">ผลประเมิน</th>
                    <th className="p-3.5 text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredStudents.map((s) => {
                    const overall = calculateStudentOverall(s);
                    return (
                      <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900 dark:text-white">{s.name}</div>
                          <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                            รหัส: {s.code} • {s.yearOrDept}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-medium text-slate-800 dark:text-slate-200">{s.groupOrWard}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            นิเทศก์: {s.supervisingInstructor || user.name}
                          </div>
                        </td>
                        <td className="p-3.5 text-center">
                          {s.isRealStudent ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              <Check className="w-2.5 h-2.5" />
                              <span>กรอกจริง</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              ตั้งต้น
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="font-black text-sm text-teal-600 dark:text-teal-400">{overall}%</span>
                        </td>
                        <td className="p-3.5 text-center">
                          <div className="flex items-center justify-center gap-1 font-mono text-[11px]">
                            <span className="text-teal-600 font-bold" title="IM">{s.procedureProgress?.IM ?? 0}</span>/
                            <span className="text-amber-600 font-bold" title="SC">{s.procedureProgress?.SC ?? 0}</span>/
                            <span className="text-sky-600 font-bold" title="ID">{s.procedureProgress?.ID ?? 0}</span>/
                            <span className="text-blue-600 font-bold" title="IV">{s.procedureProgress?.IV ?? 0}</span>
                          </div>
                        </td>
                        <td className="p-3.5 text-center">
                          <div className="text-slate-800 dark:text-slate-200 font-bold text-xs">
                            {s.preConfidenceAvg ?? 2.0} → {s.postConfidenceAvg ?? 4.0}
                          </div>
                          <div className="text-[10px] text-amber-600 font-semibold">
                            +{((s.postConfidenceAvg ?? 4.0) - (s.preConfidenceAvg ?? 2.0)).toFixed(1)}
                          </div>
                        </td>
                        <td className="p-3.5 text-center font-bold text-slate-700 dark:text-slate-300">
                          {s.reflectionCount || 0} ฉบับ
                        </td>
                        <td className="p-3.5 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              s.evaluationGrade === 'Excellent'
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                : s.evaluationGrade === 'Good'
                                ? 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300'
                                : s.evaluationGrade === 'Pass'
                                ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                                : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                            }`}
                          >
                            {s.evaluationGrade === 'Excellent'
                              ? '★ ดีเยี่ยม'
                              : s.evaluationGrade === 'Good'
                              ? '✓ ดี'
                              : s.evaluationGrade === 'Pass'
                              ? '✓ ผ่าน'
                              : 'รอประเมิน'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => openEval(s)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] cursor-pointer"
                          >
                            ประเมิน
                          </button>
                          <button
                            onClick={() => {
                              setStudentDetailModal(s);
                              playAudioChime('click');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-[11px] cursor-pointer"
                          >
                            ดูรายละเอียด
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: รายชื่อนักศึกษาทั้งหมด (All Students View)                         */}
      {/* ========================================================================= */}
      {activeSubTab === 'all-students' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>รายชื่อนักศึกษาทั้งหมดในการนิเทศก์ ({filteredStudents.length} คน)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredStudents.map((student) => {
              const overall = calculateStudentOverall(student);
              return (
                <div
                  key={student.id}
                  className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black text-sm flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                        {student.name.charAt(student.name.startsWith('นศพย.') ? 7 : 0) || 'น'}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{student.name}</h4>
                        <span className="font-mono text-[11px] text-slate-500">รหัส {student.code}</span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        student.evaluationGrade === 'Excellent'
                          ? 'bg-emerald-100 text-emerald-800'
                          : student.evaluationGrade === 'Good'
                          ? 'bg-teal-100 text-teal-800'
                          : student.evaluationGrade === 'Pass'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {student.evaluationGrade || 'รอประเมิน'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    <div className="font-medium text-slate-800 dark:text-slate-200">{student.groupOrWard}</div>
                    <div className="text-[11px] text-slate-500">{student.yearOrDept}</div>
                  </div>

                  {/* Overall Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-600 dark:text-slate-400">ความก้าวหน้ารวม</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{overall}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${overall}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span>สะท้อนคิด: {student.reflectionCount || 0} ครั้ง</span>
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      มั่นใจ {student.postConfidenceAvg ?? 4.0}/5
                    </span>
                  </div>

                  <div className="flex gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => openEval(student)}
                      className="flex-1 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer"
                    >
                      ประเมิน
                    </button>
                    <button
                      onClick={() => setStudentDetailModal(student)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 cursor-pointer"
                    >
                      ข้อมูลจริง
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ตารางเปรียบเทียบรายวอร์ด (Ward Matrix Comparison)                   */}
      {/* ========================================================================= */}
      {activeSubTab === 'ward-matrix' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <span>ตารางเปรียบเทียบสมรรถนะรายหอผู้ป่วย (Ward Competency Comparison Matrix)</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                เปรียบเทียบความก้าวหน้าและการพัฒนาความมั่นใจของแต่ละวอร์ดเพื่อปรับแผนการนิเทศก์ทางคลินิก
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-4">หอผู้ป่วยฝึกปฏิบัติ (วอร์ด)</th>
                    <th className="p-4 text-center">จำนวน นศ.</th>
                    <th className="p-4 text-center">กรอกจริง</th>
                    <th className="p-4 text-center">IM (%)</th>
                    <th className="p-4 text-center">SC (%)</th>
                    <th className="p-4 text-center">ID (%)</th>
                    <th className="p-4 text-center">IV (%)</th>
                    <th className="p-4 text-center">ความก้าวหน้ารวม</th>
                    <th className="p-4 text-center">ความมั่นใจเฉลี่ย</th>
                    <th className="p-4 text-center">ประเมินแล้ว</th>
                    <th className="p-4 text-right">รายงาน</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {uniqueWards.map((w) => {
                    const wardStuds = allStudents.filter((s) => s.groupOrWard === w);
                    const stats = calculateWardStats(wardStuds);
                    return (
                      <tr key={w} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                          {getWardIcon(w)}
                          <span>{w}</span>
                        </td>
                        <td className="p-4 text-center font-bold">{stats.total} คน</td>
                        <td className="p-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            {stats.realCount} คน
                          </span>
                        </td>
                        <td className="p-4 text-center font-bold text-teal-600">{stats.avgIM}%</td>
                        <td className="p-4 text-center font-bold text-amber-600">{stats.avgSC}%</td>
                        <td className="p-4 text-center font-bold text-sky-600">{stats.avgID}%</td>
                        <td className="p-4 text-center font-bold text-blue-600">{stats.avgIV}%</td>
                        <td className="p-4 text-center">
                          <span className="font-black text-sm text-indigo-600 dark:text-indigo-400">
                            {stats.avgOverall}%
                          </span>
                        </td>
                        <td className="p-4 text-center font-bold text-amber-600">
                          {stats.avgPre} → {stats.avgPost} (+{stats.avgGain})
                        </td>
                        <td className="p-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                            {stats.evaluatedCount} / {stats.total}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleExportCohortReport(w)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs cursor-pointer"
                          >
                            พิมพ์
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: Evaluation Modal                                                 */}
      {/* ========================================================================= */}
      {selectedStudentForEvaluation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 space-y-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                  <Star className="w-3.5 h-3.5 text-indigo-600" />
                  <span>บันทึกการประเมินทางคลินิก (Clinical Evaluation)</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  ประเมินสมรรถนะ: {selectedStudentForEvaluation.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  รหัส: {selectedStudentForEvaluation.code} • {selectedStudentForEvaluation.groupOrWard}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudentForEvaluation(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEval} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  ระดับผลการประเมิน (Evaluation Grade):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setEvalGrade('Excellent')}
                    className={`py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      evalGrade === 'Excellent'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    ★ ดีเยี่ยม (Excellent)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEvalGrade('Good')}
                    className={`py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      evalGrade === 'Good'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    ✓ ดี (Good)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEvalGrade('Pass')}
                    className={`py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      evalGrade === 'Pass'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    ✓ ผ่านเกณฑ์ (Pass)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  ข้อเสนอแนะเชิงพัฒนาการและข้อคิดเห็นจากอาจารย์นิเทศก์:
                </label>
                <textarea
                  value={evalFeedback}
                  onChange={(e) => setEvalFeedback(e.target.value)}
                  rows={4}
                  placeholder="เช่น ปฏิบัติตาม 10 Rights ได้ดีมาก ความมั่นใจเพิ่มขึ้นอย่างเห็นได้ชัด ระมัดระวังมุมการแทงเข็ม SC ในผู้ป่วยผอม..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudentForEvaluation(null)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold transition-all cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
                >
                  บันทึกผลการประเมิน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: Student Real Submissions Detail View                             */}
      {/* ========================================================================= */}
      {studentDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                  <Database className="w-3.5 h-3.5" />
                  <span>บันทึกจริงในระบบ (Real Student Record)</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  ข้อมูลจริงของ: {studentDetailModal.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  รหัส: {studentDetailModal.code} • {studentDetailModal.groupOrWard} • {studentDetailModal.yearOrDept}
                </p>
              </div>
              <button
                onClick={() => setStudentDetailModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Checklist & Competency Progress */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-teal-600" />
                <span>ความก้าวหน้า Checklist ตาม 4 หัตถการ</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800 text-center">
                  <span className="block text-[11px] text-slate-500">IM (กล้ามเนื้อ)</span>
                  <span className="text-base font-black text-teal-600">{studentDetailModal.procedureProgress?.IM ?? 0}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 text-center">
                  <span className="block text-[11px] text-slate-500">SC (ใต้ผิวหนัง)</span>
                  <span className="text-base font-black text-amber-600">{studentDetailModal.procedureProgress?.SC ?? 0}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-sky-200 dark:border-sky-800 text-center">
                  <span className="block text-[11px] text-slate-500">ID (ในผิวหนัง)</span>
                  <span className="text-base font-black text-sky-600">{studentDetailModal.procedureProgress?.ID ?? 0}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-center">
                  <span className="block text-[11px] text-slate-500">IV (หลอดเลือด)</span>
                  <span className="text-base font-black text-blue-600">{studentDetailModal.procedureProgress?.IV ?? 0}%</span>
                </div>
              </div>
            </div>

            {/* Reflections List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>บันทึกสะท้อนคิด (Reflection Journals) ทั้งหมด</span>
              </h4>

              {studentDetailModal.allReflections && studentDetailModal.allReflections.length > 0 ? (
                <div className="space-y-2.5">
                  {studentDetailModal.allReflections.map((ref, idx) => (
                    <div
                      key={ref.id || idx}
                      className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-indigo-700 dark:text-indigo-300 font-bold">
                        <span>#{idx + 1} {ref.topic}</span>
                        <span className="text-slate-400 font-normal text-[11px]">{ref.date}</span>
                      </div>
                      <div className="text-slate-700 dark:text-slate-300 space-y-1 text-[11px]">
                        <p><strong className="text-slate-900 dark:text-white">สิ่งที่ทำได้ดี:</strong> {ref.strength}</p>
                        <p><strong className="text-slate-900 dark:text-white">สิ่งที่ท้าทาย:</strong> {ref.challenge}</p>
                        <p><strong className="text-slate-900 dark:text-white">แผนพัฒนา:</strong> {ref.plan}</p>
                        {ref.preScore !== undefined && ref.postScore !== undefined && (
                          <p className="text-amber-600 font-semibold">
                            ความมั่นใจ: ก่อน {ref.preScore}/5 → หลัง {ref.postScore}/5 (+{(ref.postScore - ref.preScore).toFixed(1)})
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : studentDetailModal.latestReflection ? (
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-indigo-700 dark:text-indigo-300 font-bold">
                    <span>{studentDetailModal.latestReflection.topic}</span>
                    <span className="text-slate-400 font-normal text-[11px]">{studentDetailModal.latestReflection.date}</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 space-y-1 text-[11px]">
                    <p><strong>สิ่งที่ทำได้ดี:</strong> {studentDetailModal.latestReflection.strength}</p>
                    <p><strong>สิ่งที่ท้าทาย:</strong> {studentDetailModal.latestReflection.challenge}</p>
                    <p><strong>แผนพัฒนา:</strong> {studentDetailModal.latestReflection.plan}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  ยังไม่มีบันทึกสะท้อนคิดจากนักศึกษาคนนี้
                </p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStudentDetailModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: Add New Student Modal                                            */}
      {/* ========================================================================= */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 space-y-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>เพิ่มข้อมูลนักศึกษาเข้าสู่ฐานข้อมูล</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  ลงทะเบียนนักศึกษาใหม่
                </h3>
              </div>
              <button
                onClick={() => setIsAddStudentModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewStudent} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ชื่อ - นามสกุล นักศึกษา:
                </label>
                <input
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="เช่น นศพย. กานต์พิชชา รักษ์ดี"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  รหัสนักศึกษา (7 หลัก):
                </label>
                <input
                  type="text"
                  value={newStudentCode}
                  onChange={(e) => setNewStudentCode(e.target.value)}
                  placeholder="เช่น 6501242"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ชั้นปี:
                  </label>
                  <select
                    value={newStudentYear}
                    onChange={(e) => setNewStudentYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="ชั้นปีที่ 1">ชั้นปีที่ 1</option>
                    <option value="ชั้นปีที่ 2">ชั้นปีที่ 2</option>
                    <option value="ชั้นปีที่ 3">ชั้นปีที่ 3</option>
                    <option value="ชั้นปีที่ 4">ชั้นปีที่ 4</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    กลุ่มวอร์ด:
                  </label>
                  <select
                    value={newStudentWard}
                    onChange={(e) => setNewStudentWard(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="กลุ่ม 2A (วอร์ดอายุรกรรม 4B)">กลุ่ม 2A (วอร์ดอายุรกรรม 4B)</option>
                    <option value="กลุ่ม 2B (วอร์ดศัลยกรรม 5A)">กลุ่ม 2B (วอร์ดศัลยกรรม 5A)</option>
                    <option value="กลุ่ม 2C (วอร์ดสูติ-นรีเวชกรรม 3C)">กลุ่ม 2C (วอร์ดสูติ-นรีเวชกรรม 3C)</option>
                    <option value="กลุ่ม 2D (วอร์ดกุมารเวชกรรม 6B)">กลุ่ม 2D (วอร์ดกุมารเวชกรรม 6B)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  อาจารย์นิเทศก์ผู้รับผิดชอบ:
                </label>
                <input
                  type="text"
                  value={newStudentSupervising}
                  onChange={(e) => setNewStudentSupervising(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentModalOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold transition-all cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-all shadow-md shadow-teal-600/30 cursor-pointer"
                >
                  บันทึกลงฐานข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
