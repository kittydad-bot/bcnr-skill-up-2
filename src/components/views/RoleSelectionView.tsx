import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProcedureType } from '../../types';
import {
  GraduationCap,
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  AlertCircle,
  KeyRound,
  HeartPulse,
  Settings,
  Phone,
  FileText,
  Users,
  X,
} from 'lucide-react';

export const RoleSelectionView: React.FC = () => {
  const {
    loginAsAdmin,
    loginAsInstructor,
    loginAsStudent,
    playAudioChime,
  } = useApp();

  // Modal states for hidden Faculty and Admin logins in bottom corner
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);

  // Admin Form State
  const [adminName, setAdminName] = useState<string>('อาจารย์ผู้ดูแลระบบ BCNR');
  const [adminDept, setAdminDept] = useState<string>('ศูนย์เทคโนโลยีและนวัตกรรมการศึกษาพยาบาล BCNR');
  const [adminPin, setAdminPin] = useState<string>('admin');
  const [adminPinError, setAdminPinError] = useState<string>('');

  // Instructor Form State
  const [instName, setInstName] = useState<string>('อ.ดร. นันทวัน เกียรติพยาบาล');
  const [instDept, setInstDept] = useState<string>('กลุ่มวิชาการพยาบาลพื้นฐานและบริหารการพยาบาล');
  const [instPin, setInstPin] = useState<string>('1234');
  const [pinError, setPinError] = useState<string>('');

  // Student Form State
  const [studName, setStudName] = useState<string>('นศพย. กานต์พิชชา รักษ์ดี');
  const [studCode, setStudCode] = useState<string>('6501234');
  const [studYear, setStudYear] = useState<string>('ชั้นปีที่ 2');
  const [studGroup, setStudGroup] = useState<string>('กลุ่ม 2A (วอร์ดอายุรกรรม 4B)');
  const [studInstructor, setStudInstructor] = useState<string>('อ.ดร. นันทวัน เกียรติพยาบาล');
  const [selectedLesson, setSelectedLesson] = useState<ProcedureType>('IM');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPin || (adminPin !== 'admin' && adminPin !== '1234' && adminPin !== 'nurse')) {
      setAdminPinError('รหัสผ่านไม่ถูกต้อง (รหัสทดสอบสำหรับ Admin: admin หรือ 1234)');
      playAudioChime('alert');
      return;
    }
    setAdminPinError('');
    setIsAdminModalOpen(false);
    loginAsAdmin({
      name: adminName.trim() || 'อาจารย์ผู้ดูแลระบบ BCNR',
      department: adminDept.trim() || 'ศูนย์เทคโนโลยีและนวัตกรรมการศึกษาพยาบาล BCNR',
    });
  };

  const handleInstructorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instPin || (instPin !== '1234' && instPin !== 'nurse' && instPin !== 'admin')) {
      setPinError('รหัสผ่านไม่ถูกต้อง (รหัสทดสอบสำหรับอาจารย์: 1234)');
      playAudioChime('alert');
      return;
    }
    setPinError('');
    setIsInstructorModalOpen(false);
    loginAsInstructor({
      name: instName.trim() || 'อาจารย์ผู้สอน',
      department: instDept.trim() || 'กลุ่มวิชาการพยาบาลพื้นฐาน',
      instructorCode: 'INS-' + Math.floor(1000 + Math.random() * 9000),
    });
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsStudent({
      name: studName.trim() || 'นักศึกษาพยาบาล',
      studentCode: studCode.trim() || '6501234',
      year: studYear,
      group: studGroup.trim() || 'กลุ่ม 2A (วอร์ดอายุรกรรม 4B)',
      selectedLesson,
      supervisingInstructor: studInstructor.trim() || 'อ.ดร. นันทวัน เกียรติพยาบาล',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-colors duration-300">
      {/* Top Bar with Brand */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 dark:bg-teal-500 text-white flex items-center justify-center shadow-md shadow-teal-600/20">
            <HeartPulse className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none">
              BCNR Skill UP
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              ระบบสนับสนุนการเรียนรู้และประเมินทักษะการปฏิบัติการพยาบาล
            </p>
          </div>
        </div>
      </header>

      {/* Main Container - Centered focused student login card */}
      <main className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 flex flex-col justify-center items-center">
        {/* Intro Hero Section - Simplified and clean */}
        <div className="text-center w-full mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 text-xs font-semibold mb-3 border border-teal-200/80 dark:border-teal-800/60">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>BCNR Nursing Clinical Skill Practice</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            เข้าสู่ระบบนักศึกษาพยาบาล
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            กรอกข้อมูลเพื่อเริ่มฝึกทบทวนหัตถการ คำนวณขนาดยา และบันทึกผลการปฏิบัติ
          </p>
        </div>

        {/* Focused Single Student Card */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all">
          {/* Card Top Accent */}
          <div className="h-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600" />

          {/* Student Login Form */}
          <form onSubmit={handleStudentSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/25 shrink-0">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  ข้อมูลนักศึกษาพยาบาล
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  เตรียมความพร้อมสำหรับการฝึกปฏิบัติงานบนหอผู้ป่วย
                </p>
              </div>
            </div>

            <div className="space-y-3.5 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  ชื่อ - นามสกุล นักศึกษา:
                </label>
                <input
                  type="text"
                  value={studName}
                  onChange={(e) => setStudName(e.target.value)}
                  required
                  placeholder="เช่น นศพย. กานต์พิชชา รักษ์ดี"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    รหัสนักศึกษา:
                  </label>
                  <input
                    type="text"
                    value={studCode}
                    onChange={(e) => setStudCode(e.target.value)}
                    required
                    placeholder="เช่น 6501234"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ชั้นปี:
                  </label>
                  <select
                    value={studYear}
                    onChange={(e) => setStudYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
                  >
                    <option value="ชั้นปีที่ 1">ชั้นปีที่ 1</option>
                    <option value="ชั้นปีที่ 2">ชั้นปีที่ 2</option>
                    <option value="ชั้นปีที่ 3">ชั้นปีที่ 3</option>
                    <option value="ชั้นปีที่ 4">ชั้นปีที่ 4</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  กลุ่มวอร์ดที่ฝึกปฏิบัติ:
                </label>
                <select
                  value={studGroup}
                  onChange={(e) => setStudGroup(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
                >
                  <option value="กลุ่ม 2A (วอร์ดอายุรกรรม 4B)">กลุ่ม 2A (วอร์ดอายุรกรรม 4B)</option>
                  <option value="กลุ่ม 2B (วอร์ดศัลยกรรม 5A)">กลุ่ม 2B (วอร์ดศัลยกรรม 5A)</option>
                  <option value="กลุ่ม 2C (วอร์ดสูติ-นรีเวชกรรม 3C)">กลุ่ม 2C (วอร์ดสูติ-นรีเวชกรรม 3C)</option>
                  <option value="กลุ่ม 2D (วอร์ดกุมารเวชกรรม 6B)">กลุ่ม 2D (วอร์ดกุมารเวชกรรม 6B)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  อาจารย์นิเทศก์ผู้รับผิดชอบ:
                </label>
                <input
                  type="text"
                  value={studInstructor}
                  onChange={(e) => setStudInstructor(e.target.value)}
                  placeholder="เช่น อ.ดร. นันทวัน เกียรติพยาบาล"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-5 py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-lg shadow-teal-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>เข้าสู่ระบบเพื่อเริ่มใช้งาน</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      {/* Institutional Footer & Hidden Small Buttons for Instructor & Admin */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-medium text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>ยึดมั่นหลักความปลอดภัย 10 Rights of Medication Administration • BCNR Skill UP</span>
          </div>

          {/* Discreet Login Links for Faculty & Admin */}
          <div className="flex items-center gap-2">
            {/* Small Instructor Login Button */}
            <button
              onClick={() => {
                setIsInstructorModalOpen(true);
                playAudioChime('click');
              }}
              className="px-2.5 py-1 rounded-lg text-[11px] text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all flex items-center gap-1.5 cursor-pointer"
              title="สำหรับอาจารย์ผู้สอนและประเมินผลคลินิก"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>เข้าสู่ระบบอาจารย์</span>
            </button>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            {/* Small Discreet Admin Login Button */}
            <button
              onClick={() => {
                setIsAdminModalOpen(true);
                playAudioChime('click');
              }}
              className="px-2.5 py-1 rounded-lg text-[11px] text-slate-400 hover:text-purple-600 dark:text-slate-500 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-all flex items-center gap-1.5 cursor-pointer"
              title="สำหรับผู้ดูแลระบบส่วนกลาง (Admin)"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>เข้าสู่ระบบแอดมิน</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal (Triggered by small bottom button) */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-xs font-bold">
                  <Settings className="w-3.5 h-3.5" />
                  <span>ระบบผู้ดูแลระบบ (Admin)</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  เข้าสู่ระบบแอดมินส่วนกลาง
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  สำหรับจัดการสิทธิ์ผู้ใช้งาน หมายเลขฉุกเฉิน และประกาศแนวปฏิบัติสถาบัน
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAdminModalOpen(false);
                  setAdminPinError('');
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdminSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ชื่อ-นามสกุล ผู้ดูแลระบบ:
                </label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  required
                  placeholder="เช่น อาจารย์ผู้ดูแลระบบ BCNR"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  หน่วยงาน / ศูนย์บริหาร:
                </label>
                <input
                  type="text"
                  value={adminDept}
                  onChange={(e) => setAdminDept(e.target.value)}
                  placeholder="เช่น ศูนย์เทคโนโลยีและนวัตกรรมการศึกษาพยาบาล BCNR"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>รหัสผ่าน Admin (PIN):</span>
                  </label>
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-950/70 px-2 py-0.5 rounded-md">
                    รหัสผ่าน: admin หรือ 1234
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={adminPin}
                    onChange={(e) => {
                      setAdminPin(e.target.value);
                      setAdminPinError('');
                    }}
                    required
                    placeholder="กรอก admin หรือ 1234"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setAdminPin('admin')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold hover:bg-purple-200 cursor-pointer"
                  >
                    ใส่ admin
                  </button>
                </div>
                {adminPinError && (
                  <div className="flex items-center gap-1 text-[11px] text-red-600 dark:text-red-400 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{adminPinError}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminModalOpen(false);
                    setAdminPinError('');
                  }}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>เข้าสู่ระบบ Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Instructor Login Modal (Triggered by small bottom button) */}
      {isInstructorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-bold">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>ระบบอาจารย์ผู้สอน (Faculty)</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  เข้าสู่ระบบอาจารย์นิเทศก์
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  สำหรับอาจารย์ประจำวิชาและผู้ประเมินผลทักษะทางคลินิก
                </p>
              </div>
              <button
                onClick={() => {
                  setIsInstructorModalOpen(false);
                  setPinError('');
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInstructorSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ชื่อ-นามสกุล อาจารย์:
                </label>
                <input
                  type="text"
                  value={instName}
                  onChange={(e) => setInstName(e.target.value)}
                  required
                  placeholder="เช่น อ.ดร. นันทวัน เกียรติพยาบาล"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ภาควิชา / กลุ่มวิชา:
                </label>
                <input
                  type="text"
                  value={instDept}
                  onChange={(e) => setInstDept(e.target.value)}
                  placeholder="เช่น กลุ่มวิชาการพยาบาลพื้นฐานและบริหารการพยาบาล"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>รหัสผ่านอาจารย์ (PIN):</span>
                  </label>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/70 px-2 py-0.5 rounded-md">
                    รหัสผ่าน: 1234
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={instPin}
                    onChange={(e) => {
                      setInstPin(e.target.value);
                      setPinError('');
                    }}
                    required
                    placeholder="กรอก 1234"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setInstPin('1234')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold hover:bg-indigo-200 cursor-pointer"
                  >
                    ใส่ 1234
                  </button>
                </div>
                {pinError && (
                  <div className="flex items-center gap-1 text-[11px] text-red-600 dark:text-red-400 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{pinError}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsInstructorModalOpen(false);
                    setPinError('');
                  }}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>เข้าสู่ระบบอาจารย์</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
