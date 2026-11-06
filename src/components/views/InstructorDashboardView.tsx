import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ManagedUser, ProcedureType } from '../../types';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  Filter,
  FileText,
  Shield,
  Settings,
  Phone,
  Sparkles,
  HeartPulse,
  Send,
  MessageSquare,
  CheckSquare,
  X,
  Star,
  Activity,
} from 'lucide-react';

export const InstructorDashboardView: React.FC = () => {
  const {
    user,
    managedUsers,
    evaluateStudent,
    setActiveTab,
    setIsSOSModalOpen,
    institutionalAnnouncements,
    playAudioChime,
  } = useApp();

  // Filters and Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWardFilter, setSelectedWardFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Evaluation modal/drawer state
  const [evaluatingStudent, setEvaluatingStudent] = useState<ManagedUser | null>(null);
  const [evalGrade, setEvalGrade] = useState<'Pass' | 'Good' | 'Excellent' | 'Pending'>('Good');
  const [evalFeedback, setEvalFeedback] = useState('');

  // Filter only students from managedUsers
  const students = managedUsers.filter((u) => u.role === 'student');

  // Apply filters
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.includes(searchQuery) ||
      (s.groupOrWard && s.groupOrWard.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesWard =
      selectedWardFilter === 'all' ||
      (s.groupOrWard && s.groupOrWard.includes(selectedWardFilter));

    const matchesStatus =
      selectedStatusFilter === 'all' ||
      (selectedStatusFilter === 'evaluated' && s.evaluationGrade && s.evaluationGrade !== 'Pending') ||
      (selectedStatusFilter === 'pending' && (!s.evaluationGrade || s.evaluationGrade === 'Pending'));

    return matchesSearch && matchesWard && matchesStatus;
  });

  // Calculate Cohort Statistics
  const totalStudents = students.length;

  const calculateStudentOverallProgress = (s: ManagedUser): number => {
    if (!s.procedureProgress) return 0;
    const { IM = 0, SC = 0, ID = 0, IV = 0 } = s.procedureProgress;
    return Math.round((IM + SC + ID + IV) / 4);
  };

  const avgCohortProgress = totalStudents > 0
    ? Math.round(
        students.reduce((acc, s) => acc + calculateStudentOverallProgress(s), 0) / totalStudents
      )
    : 0;

  const fullyCompetentStudentsCount = students.filter((s) => {
    if (!s.checklistCompleted) return false;
    return (
      s.checklistCompleted.IM &&
      s.checklistCompleted.SC &&
      s.checklistCompleted.ID &&
      s.checklistCompleted.IV
    );
  }).length;

  const totalReflectionsCount = students.reduce(
    (acc, s) => acc + (s.reflectionCount || 0),
    0
  );

  const avgPreConfidence = totalStudents > 0
    ? (
        students.reduce((acc, s) => acc + (s.preConfidenceAvg || 2.0), 0) /
        totalStudents
      ).toFixed(1)
    : '2.0';

  const avgPostConfidence = totalStudents > 0
    ? (
        students.reduce((acc, s) => acc + (s.postConfidenceAvg || 4.3), 0) /
        totalStudents
      ).toFixed(1)
    : '4.3';

  // Open evaluation modal
  const openEvaluationModal = (student: ManagedUser) => {
    setEvaluatingStudent(student);
    setEvalGrade(student.evaluationGrade || 'Good');
    setEvalFeedback(student.instructorFeedback || '');
    playAudioChime('click');
  };

  // Submit evaluation
  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatingStudent) return;

    evaluateStudent(
      evaluatingStudent.id,
      evalGrade,
      evalFeedback.trim() || 'ผ่านเกณฑ์มาตรฐานการปฏิบัติการพยาบาลและความปลอดภัย'
    );
    setEvaluatingStudent(null);
  };

  return (
    <div className="space-y-6 pb-24 animate-fadeIn">
      {/* 1. Header Banner: Instructor Welcome & Supervision Identity */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-indigo-500/30 relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-teal-500/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/25 border border-indigo-400/40 text-indigo-200 text-xs font-bold tracking-wide">
              <GraduationCap className="w-4 h-4 text-indigo-300" />
              <span>โหมดอาจารย์ผู้สอน & ผู้ประเมินคลินิก (Clinical Supervisor)</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <span className="px-2.5 py-1 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                รหัสอาจารย์: <strong className="text-white">{user.instructorCode || 'INS-4409'}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-teal-500/20 text-teal-200 border border-teal-400/30">
                {user.group || 'วอร์ดอายุรกรรม 4B'}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
              <span>Dashboard ข้อมูลนักศึกษาในการนิเทศน์ พร้อมความก้าวหน้าในการฝึก</span>
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/90 font-medium max-w-3xl">
              ยินดีต้อนรับ, <strong>{user.name}</strong> • {user.department || 'กลุ่มวิชาการพยาบาลพื้นฐานและบริหารการพยาบาล'}
              <br />
              ติดตามประเมินสมรรถนะหัตถการฉีดยา 4 ด้าน (IM, SC, ID, IV), ตรวจสอบ Checklist ความปลอดภัย, และบันทึกสะท้อนคิดของนักศึกษาในความดูแล
            </p>
          </div>

          {/* Quick Action Buttons for Supervisors */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>หน้าสรุปข้อมูลเด็กทุกคนแบ่งตามกลุ่มวอร์ด & ฐานข้อมูลจริง</span>
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 backdrop-blur-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Settings className="w-4 h-4 text-purple-300" />
              <span>ประเมิน & บันทึกคลินิกฉบับเต็ม</span>
            </button>
            <button
              onClick={() => setIsSOSModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/40 text-xs font-bold backdrop-blur-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>เบอร์โทรฉุกเฉินประจำวอร์ด (SOS)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Institutional Announcements Banner (if urgent) */}
      {institutionalAnnouncements && institutionalAnnouncements.some((a) => a.isUrgent) && (
        <div className="space-y-2">
          {institutionalAnnouncements
            .filter((a) => a.isUrgent)
            .map((ann) => (
              <div
                key={ann.id}
                className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/40 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3 shadow-xs"
              >
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-amber-900 dark:text-amber-200">
                      [ประกาศด่วนของสถาบัน] {ann.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-bold shrink-0">
                      {ann.wardName}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                    {ann.content}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 3. High-level Summary Metrics (KPI Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Metric 1: นักศึกษาในการนิเทศก์ */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold">นักศึกษาในความดูแล</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {totalStudents}
            </span>
            <span className="text-xs text-slate-500 font-medium">คน</span>
          </div>
          <span className="text-[11px] text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> กำลังฝึกปฏิบัติงาน Active
          </span>
        </div>

        {/* Metric 2: ความก้าวหน้าเฉลี่ยรวม */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold">ความก้าวหน้าเฉลี่ยรวม</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {avgCohortProgress}%
            </span>
          </div>
          {/* Mini progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${avgCohortProgress}%` }}
            />
          </div>
        </div>

        {/* Metric 3: ผ่าน Checklist ครบ 4 หัตถการ */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold">ผ่านเกณฑ์ครบ 4 หัตถการ</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {fullyCompetentStudentsCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">/ {totalStudents} คน</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            IM, SC, ID, IV ผ่านครบถ้วน
          </span>
        </div>

        {/* Metric 4: บันทึกสะท้อนคิดส่งแล้ว */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold">บันทึกสะท้อนคิด</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {totalReflectionsCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">ฉบับ</span>
          </div>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" /> มีการสะท้อนคิดต่อเนื่อง
          </span>
        </div>

        {/* Metric 5: การพัฒนาความมั่นใจเฉลี่ย (Delta) */}
        <div className="col-span-2 lg:col-span-1 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold">ความมั่นใจ ก่อน ➔ หลัง</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-slate-400 line-through">
              {avgPreConfidence}
            </span>
            <span className="text-xl font-bold text-slate-400">➔</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {avgPostConfidence}
            </span>
            <span className="text-xs text-slate-500 font-medium">/ 5</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
            +{(parseFloat(avgPostConfidence) - parseFloat(avgPreConfidence)).toFixed(1)} คะแนนพัฒนา
          </span>
        </div>
      </div>

      {/* 4. Filter & Search Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อนักศึกษา, รหัสนักศึกษา, วอร์ด..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          {/* Ward filter */}
          <select
            value={selectedWardFilter}
            onChange={(e) => setSelectedWardFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">ทุกหอผู้ป่วย / วอร์ด</option>
            <option value="อายุรกรรม">วอร์ดอายุรกรรม 4B</option>
            <option value="ศัลยกรรม">วอร์ดศัลยกรรม 5A</option>
          </select>

          {/* Evaluation status filter */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">ทุกสถานะการประเมิน</option>
            <option value="evaluated">ประเมินแล้ว</option>
            <option value="pending">รอการประเมิน</option>
          </select>
        </div>
      </div>

      {/* 5. Supervised Student Progress Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>รายชื่อนักศึกษาในการนิเทศก์และความก้าวหน้าในการฝึก ({filteredStudents.length} คน)</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            อาจารย์นิเทศก์: <strong>{user.name}</strong>
          </span>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
            <Users className="w-10 h-10 mx-auto text-slate-400 mb-2 opacity-60" />
            <p className="font-bold text-sm">ไม่พบข้อมูลนักศึกษาที่ตรงกับเงื่อนไขการค้นหา</p>
            <p className="text-xs text-slate-400 mt-1">ลองเปลี่ยนคำค้นหาหรือตัวกรองหอผู้ป่วย</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStudents.map((student) => {
              const overall = calculateStudentOverallProgress(student);
              const isFullyPassed =
                student.checklistCompleted?.IM &&
                student.checklistCompleted?.SC &&
                student.checklistCompleted?.ID &&
                student.checklistCompleted?.IV;

              return (
                <div
                  key={student.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between space-y-4"
                >
                  {/* Card Header: Student Info */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-teal-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-indigo-500/20">
                          {student.name.charAt(student.name.startsWith('นศพย.') ? 7 : 0) || 'น'}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                            {student.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            <span className="font-mono font-medium">รหัส: {student.code}</span>
                            <span>•</span>
                            <span>{student.yearOrDept}</span>
                          </div>
                        </div>
                      </div>

                      {/* Evaluation Grade Badge */}
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${
                          student.evaluationGrade === 'Excellent'
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : student.evaluationGrade === 'Good'
                            ? 'bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800'
                            : student.evaluationGrade === 'Pass'
                            ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                            : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                        }`}
                      >
                        {student.evaluationGrade === 'Excellent'
                          ? '★ ดีเยี่ยม (Excellent)'
                          : student.evaluationGrade === 'Good'
                          ? '✓ ดี (Good)'
                          : student.evaluationGrade === 'Pass'
                          ? '✓ ผ่านเกณฑ์ (Pass)'
                          : '⏳ รอประเมินคลินิก'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        {student.groupOrWard}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium">
                        อาจารย์นิเทศก์: {student.supervisingInstructor || user.name}
                      </span>
                    </div>
                  </div>

                  {/* Overall Competency Progress Bar */}
                  <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-indigo-600" />
                        ความก้าวหน้ารวม 4 หัตถการ:
                      </span>
                      <span className="font-black text-indigo-600 dark:text-indigo-400">
                        {overall}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-teal-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${overall}%` }}
                      />
                    </div>

                    {/* 4 Procedure Breakdown Badges */}
                    <div className="grid grid-cols-4 gap-1.5 pt-2">
                      {/* IM */}
                      <div className="p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center">
                        <span className="block text-[10px] font-bold text-teal-700 dark:text-teal-400">
                          IM (กล้ามเนื้อ)
                        </span>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                          {student.procedureProgress?.IM ?? 0}%
                        </span>
                      </div>
                      {/* SC */}
                      <div className="p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center">
                        <span className="block text-[10px] font-bold text-amber-700 dark:text-amber-400">
                          SC (ใต้ผิวหนัง)
                        </span>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                          {student.procedureProgress?.SC ?? 0}%
                        </span>
                      </div>
                      {/* ID */}
                      <div className="p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center">
                        <span className="block text-[10px] font-bold text-sky-700 dark:text-sky-400">
                          ID (ในผิวหนัง)
                        </span>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                          {student.procedureProgress?.ID ?? 0}%
                        </span>
                      </div>
                      {/* IV */}
                      <div className="p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center">
                        <span className="block text-[10px] font-bold text-blue-700 dark:text-blue-400">
                          IV (หลอดเลือด)
                        </span>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                          {student.procedureProgress?.IV ?? 0}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Score & Reflection Summary */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <span className="font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        พัฒนาการความมั่นใจ:
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {student.preConfidenceAvg ?? 2.0} ➔ {student.postConfidenceAvg ?? 4.5} / 5
                        <span className="ml-1 text-[10px] font-normal text-slate-400">
                          (+{((student.postConfidenceAvg ?? 4.5) - (student.preConfidenceAvg ?? 2.0)).toFixed(1)})
                        </span>
                      </span>
                    </div>

                    {/* Latest Reflection Excerpt */}
                    {student.latestReflection && (
                      <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-1 text-[11px]">
                        <div className="flex items-center justify-between text-indigo-900 dark:text-indigo-200 font-bold">
                          <span>บันทึกสะท้อนคิด: {student.latestReflection.topic}</span>
                          <span className="text-[10px] font-normal text-indigo-600 dark:text-indigo-400">
                            {student.latestReflection.date}
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 line-clamp-1">
                          <strong className="text-teal-700 dark:text-teal-400">จุดแข็ง:</strong> {student.latestReflection.strength}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 line-clamp-1">
                          <strong className="text-amber-700 dark:text-amber-400">ความท้าทาย:</strong> {student.latestReflection.challenge}
                        </p>
                      </div>
                    )}

                    {/* Instructor Feedback if available */}
                    {student.instructorFeedback && (
                      <div className="p-2.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800 text-[11px] text-teal-900 dark:text-teal-200">
                        <span className="font-bold block">คำแนะนำจากอาจารย์นิเทศก์:</span>
                        <p className="italic text-teal-800 dark:text-teal-300 mt-0.5">
                          "{student.instructorFeedback}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Action: Evaluation Button */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      สะท้อนคิด {student.reflectionCount || 0} ครั้ง
                    </span>

                    <button
                      onClick={() => openEvaluationModal(student)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5" />
                      <span>{student.evaluationGrade ? 'แก้ไขการประเมิน' : 'บันทึกประเมินคลินิก'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Critical Supervision Safety Mandates for Bedside Teaching */}
      <div className="p-5 rounded-3xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
          <Shield className="w-4 h-4" />
          <span>แนวปฏิบัติสำหรับการนิเทศก์ข้างเตียง (Clinical Preceptor Key Safety Checkpoints)</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          อาจารย์นิเทศก์กรุณากำกับดูแลนักศึกษาใน 5 ประเด็นสำคัญตามมาตรฐานความปลอดภัยผู้ป่วย (Patient Safety):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="font-bold text-teal-300 block">1. 10 Rights & 2 Identifiers</span>
            <p className="text-slate-300 text-[11px]">
              ทวนสอบชื่อ-สกุล และ HN จากป้ายข้อมือร่วมกับถามผู้ป่วยทุกครั้งก่อนบริหารยา
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="font-bold text-amber-300 block">2. คลำ Landmark กระดูกให้ชัดเจน</span>
            <p className="text-slate-300 text-[11px]">
              Ventrogluteal คลำ Greater trochanter & ASIS หรือ Deltoid 2-3 นิ้วมือใต้ Acromion
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="font-bold text-sky-300 block">3. มุมแทงเข็ม & การไม่นวดคลึง</span>
            <p className="text-slate-300 text-[11px]">
              SC แทง 45°-90° ห้ามถูนวดบริเวณฉีด Insulin และ LMWH เด็ดขาดเพื่อป้องกันรอยช้ำ
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="font-bold text-indigo-300 block">4. ตุ่มนูนใสใน ID (Wheal 6-10 mm)</span>
            <p className="text-slate-300 text-[11px]">
              หงายปลายเข็ม (Bevel up) 10°-15° สังเกตตุ่มนูนใสคล้ายผิวส้ม และห้ามปิดพลาสเตอร์แน่น
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="font-bold text-blue-300 block">5. IV Flush & ดูแล Phlebitis</span>
            <p className="text-slate-300 text-[11px]">
              ตรวจดูอาการบวม แดง ร้อน ปวดตามแนวหลอดเลือด และดันยาช้าๆ ตามอัตรากำหนด
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="font-bold text-rose-300 block">6. ป้องกันเข็มทิ่มตำ (Sharp Safety)</span>
            <p className="text-slate-300 text-[11px]">
              ห้ามสวมปลอกเข็มกลับด้วยสองมือ (No Recapping) ทิ้งลงถังขยะติดเชื้อมีคมทันที
            </p>
          </div>
        </div>
      </div>

      {/* 7. Clinical Evaluation Dialog / Modal */}
      {evaluatingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  แบบบันทึกการประเมินการนิเทศก์คลินิก
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  ประเมิน: {evaluatingStudent.name} ({evaluatingStudent.code})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {evaluatingStudent.yearOrDept} • {evaluatingStudent.groupOrWard}
                </p>
              </div>
              <button
                onClick={() => setEvaluatingStudent(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveEvaluation} className="space-y-4">
              {/* Grade Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  ระดับผลการประเมินสมรรถนะ:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'Excellent' as const, label: 'ดีเยี่ยม', sub: 'Excellent', color: 'emerald' },
                    { id: 'Good' as const, label: 'ดี', sub: 'Good', color: 'teal' },
                    { id: 'Pass' as const, label: 'ผ่านเกณฑ์', sub: 'Pass', color: 'blue' },
                    { id: 'Pending' as const, label: 'รอฝึกเพิ่ม', sub: 'Pending', color: 'amber' },
                  ].map((g) => (
                    <button
                      type="button"
                      key={g.id}
                      onClick={() => setEvalGrade(g.id)}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        evalGrade === g.id
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-200 ring-2 ring-indigo-500/20 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="block text-xs">{g.label}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{g.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  ข้อเสนอแนะและจุดเด่น/จุดพัฒนา (Feedback from Clinical Preceptor):
                </label>
                <textarea
                  rows={4}
                  value={evalFeedback}
                  onChange={(e) => setEvalFeedback(e.target.value)}
                  placeholder="เช่น ปฏิบัติตาม 10 Rights ได้อย่างถูกต้อง คลำ Landmark Deltoid ได้แม่นยำ เพิ่มความนิ่งของมือขณะแทงเข็ม..."
                  className="w-full p-3 text-xs rounded-2xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setEvaluatingStudent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>บันทึกผลการนิเทศก์</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
