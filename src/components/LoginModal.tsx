import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, User, GraduationCap, Users, BookOpen, CheckCircle, X, LogOut, Stethoscope, Settings, Compass } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const {
    user,
    updateUser,
    isLoginModalOpen,
    setIsLoginModalOpen,
    setIsWelcomeGuideOpen,
    switchRole,
    playAudioChime,
  } = useApp();

  const [name, setName] = useState(user.name);
  const [studentCode, setStudentCode] = useState(user.studentCode || '');
  const [year, setYear] = useState(user.year || 'ชั้นปีที่ 2');
  const [group, setGroup] = useState(user.group || '');
  const [department, setDepartment] = useState(user.department || '');
  const [supervisingInstructor, setSupervisingInstructor] = useState(user.supervisingInstructor || 'อ.ดร. นันทวัน เกียรติพยาบาล');

  useEffect(() => {
    setName(user.name);
    setStudentCode(user.studentCode || '');
    setYear(user.year || (user.role === 'admin' ? 'ผู้ดูแลระบบส่วนกลาง' : user.role === 'instructor' ? 'อาจารย์ผู้สอน' : 'ชั้นปีที่ 2'));
    setGroup(user.group || '');
    setDepartment(user.department || '');
    setSupervisingInstructor(user.supervisingInstructor || 'อ.ดร. นันทวัน เกียรติพยาบาล');
  }, [user, isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.role === 'admin') {
      updateUser({
        name: name.trim() || 'ผู้ดูแลระบบ BCNR',
        department: department.trim() || 'ศูนย์เทคโนโลยีและนวัตกรรมการศึกษาพยาบาล BCNR',
      });
    } else if (user.role === 'instructor') {
      updateUser({
        name: name.trim() || 'อาจารย์ผู้สอน',
        department: department.trim() || 'กลุ่มวิชาการพยาบาลพื้นฐาน',
      });
    } else {
      updateUser({
        name: name.trim() || 'นักศึกษาพยาบาล',
        studentCode: studentCode.trim() || '6501234',
        year,
        group: group.trim() || 'กลุ่ม 2A',
        supervisingInstructor: supervisingInstructor.trim() || 'อ.ดร. นันทวัน เกียรติพยาบาล',
      });
    }
    playAudioChime('success');
    setIsLoginModalOpen(false);
  };

  const handleSwitchRoleClick = () => {
    setIsLoginModalOpen(false);
    switchRole();
  };

  const isAdmin = user.role === 'admin';
  const isInstructor = user.role === 'instructor';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 space-y-5">
        {/* Welcome Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isAdmin
                ? 'bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300'
                : isInstructor
                ? 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300'
                : 'bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300'
            }`}>
              {isAdmin ? (
                <>
                  <Settings className="w-3.5 h-3.5 text-purple-600" />
                  <span>บทบาท: ผู้ดูแลระบบ (Admin)</span>
                </>
              ) : isInstructor ? (
                <>
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>บทบาท: อาจารย์ผู้สอน / ผู้ประเมินคลินิก</span>
                </>
              ) : (
                <>
                  <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                  <span>บทบาท: นักศึกษาพยาบาล</span>
                </>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {isAdmin ? 'ข้อมูลโปรไฟล์ผู้ดูแลระบบ' : isInstructor ? 'ข้อมูลโปรไฟล์อาจารย์' : 'ข้อมูลนักศึกษาพยาบาล'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isAdmin
                ? 'จัดการการเข้าถึงข้อมูลนักศึกษาและอาจารย์ หมายเลขฉุกเฉิน และประกาศสถาบัน'
                : isInstructor
                ? 'สำหรับบันทึกการประเมินและบริหารจัดการระบบ'
                : '“พร้อมทบทวนก่อนลงมือปฏิบัติหรือยัง?”'}
            </p>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAdmin ? 'ชื่อ - นามสกุล ผู้ดูแลระบบ:' : isInstructor ? 'ชื่อ - นามสกุล อาจารย์:' : 'ชื่อ - นามสกุล นักศึกษา:'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={isAdmin ? 'เช่น อาจารย์ผู้ดูแลระบบ BCNR' : isInstructor ? 'เช่น อ.ดร. นันทวัน เกียรติพยาบาล' : 'เช่น นศพย. กานต์พิชชา รักษ์ดี'}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>

          {isAdmin || isInstructor ? (
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAdmin ? 'หน่วยงาน / ศูนย์บริหาร:' : 'ภาควิชา / กลุ่มวิชา:'}
              </label>
              <input
                type="text"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                placeholder={isAdmin ? 'เช่น ศูนย์เทคโนโลยีและนวัตกรรมการศึกษาพยาบาล BCNR' : 'เช่น กลุ่มวิชาการพยาบาลพื้นฐานและบริหารการพยาบาล'}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    รหัสนักศึกษา:
                  </label>
                  <input
                    type="text"
                    value={studentCode}
                    onChange={e => setStudentCode(e.target.value)}
                    placeholder="เช่น 6501234"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ชั้นปี:
                  </label>
                  <select
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="ชั้นปีที่ 2">ชั้นปีที่ 2</option>
                    <option value="ชั้นปีที่ 3">ชั้นปีที่ 3</option>
                    <option value="ชั้นปีที่ 4">ชั้นปีที่ 4</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  กลุ่มเรียน / หอผู้ป่วยฝึกปฏิบัติ:
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={group}
                    onChange={e => setGroup(e.target.value)}
                    placeholder="เช่น กลุ่ม 2A (วอร์ดอายุรกรรม 4B)"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  อาจารย์นิเทศก์ประจำกลุ่ม / วอร์ด:
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={supervisingInstructor}
                    onChange={e => setSupervisingInstructor(e.target.value)}
                    list="login-instructors-list"
                    placeholder="เช่น อ.ดร. นันทวัน เกียรติพยาบาล"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <datalist id="login-instructors-list">
                    <option value="อ.ดร. นันทวัน เกียรติพยาบาล" />
                    <option value="อ.พย. พิมพ์ใจ สุริยะวงศ์" />
                    <option value="พว. นงลักษณ์ สุขสวัสดิ์ (Preceptor)" />
                    <option value="อ.ดร. รัตนาภรณ์ พงษ์สถิตย์" />
                  </datalist>
                </div>
              </div>
            </>
          )}

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className={`w-full py-2.5 rounded-xl text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isAdmin
                  ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20'
                  : isInstructor
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
                  : 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/20'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              บันทึกการแก้ไข
            </button>

            <button
              type="button"
              onClick={() => {
                setIsLoginModalOpen(false);
                setIsWelcomeGuideOpen(true);
              }}
              className="w-full py-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>เปิดดูคู่มือ & ไกด์ไลน์เริ่มต้นเรียนรู้</span>
            </button>

            <button
              type="button"
              onClick={handleSwitchRoleClick}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>สลับบทบาทผู้ใช้งาน (เปลี่ยนเป็น Admin / อาจารย์ / นักศึกษา)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
