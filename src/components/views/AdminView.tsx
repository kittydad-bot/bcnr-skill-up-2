import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SOSContact, ManagedUser, InstitutionalAnnouncement } from '../../types';
import {
  Settings,
  Phone,
  Edit2,
  Save,
  Plus,
  Trash2,
  Lock,
  Unlock,
  Users,
  FileText,
  RotateCcw,
  CheckCircle2,
  ArrowLeft,
  Home,
  AlertTriangle,
  Search,
  UserCheck,
  UserX,
  KeyRound,
  X,
  Megaphone,
  Bell,
  Clock,
  Building,
  GraduationCap,
  Stethoscope,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    isAdminMode,
    setIsAdminMode,
    user,
    sosContacts,
    updateSosContact,
    addSosContact,
    deleteSosContact,
    managedUsers,
    updateManagedUserStatus,
    updateManagedUser,
    addManagedUser,
    deleteManagedUser,
    resetManagedUserPin,
    institutionalAnnouncements,
    addInstitutionalAnnouncement,
    updateInstitutionalAnnouncement,
    deleteInstitutionalAnnouncement,
    setActiveTab,
    reflections,
    confidenceRecords,
    playAudioChime,
  } = useApp();

  // PIN Unlock state
  const [pinInput, setPinInput] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(isAdminMode || user.role === 'admin');
  const [pinError, setPinError] = useState<string>('');

  // Active Admin Sub-Tab
  const [activeAdminSection, setActiveAdminSection] = useState<'users' | 'sos' | 'announcements' | 'safety'>('users');

  // Search & Filter for Managed Users
  const [userSearchQuery, setUserSearchQuery] = useState<string>('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'student' | 'instructor'>('all');
  const [userStatusFilter, setUserStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  // Modal / Form: Add New User
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserRole, setNewUserRole] = useState<'student' | 'instructor'>('student');
  const [newUserCode, setNewUserCode] = useState<string>('');
  const [newUserYearOrDept, setNewUserYearOrDept] = useState<string>('ชั้นปีที่ 2');
  const [newUserGroupOrWard, setNewUserGroupOrWard] = useState<string>('กลุ่ม 2A (วอร์ดอายุรกรรม)');

  // Modal / Form: Edit User
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editUserName, setEditUserName] = useState<string>('');
  const [editUserCode, setEditUserCode] = useState<string>('');
  const [editUserYearOrDept, setEditUserYearOrDept] = useState<string>('');
  const [editUserGroupOrWard, setEditUserGroupOrWard] = useState<string>('');

  // Notification message for actions
  const [adminNotice, setAdminNotice] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setAdminNotice(msg);
    setTimeout(() => setAdminNotice(null), 3500);
  };

  // Editing SOS contacts state
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [editContactName, setEditContactName] = useState<string>('');
  const [editContactPhone, setEditContactPhone] = useState<string>('');
  const [editContactDept, setEditContactDept] = useState<string>('');
  const [editContactRoleTh, setEditContactRoleTh] = useState<string>('');
  const [editContactDesc, setEditContactDesc] = useState<string>('');

  // Add New SOS contact state
  const [isAddSosOpen, setIsAddSosOpen] = useState<boolean>(false);
  const [newSosRoleTh, setNewSosRoleTh] = useState<string>('');
  const [newSosRoleEn, setNewSosRoleEn] = useState<string>('Emergency Contact');
  const [newSosName, setNewSosName] = useState<string>('');
  const [newSosPhone, setNewSosPhone] = useState<string>('');
  const [newSosDept, setNewSosDept] = useState<string>('');
  const [newSosDesc, setNewSosDesc] = useState<string>('');

  // Add / Edit Announcement state
  const [isAddAnnModalOpen, setIsAddAnnModalOpen] = useState<boolean>(false);
  const [newAnnTitle, setNewAnnTitle] = useState<string>('');
  const [newAnnWard, setNewAnnWard] = useState<string>('ทุกหอผู้ป่วยฝึกปฏิบัติ');
  const [newAnnCategory, setNewAnnCategory] = useState<'safety' | 'procedure' | 'medication'>('safety');
  const [newAnnContent, setNewAnnContent] = useState<string>('');
  const [newAnnIsUrgent, setNewAnnIsUrgent] = useState<boolean>(false);

  const [editingAnnId, setEditingAnnId] = useState<string | null>(null);
  const [editAnnTitle, setEditAnnTitle] = useState<string>('');
  const [editAnnWard, setEditAnnWard] = useState<string>('');
  const [editAnnCategory, setEditAnnCategory] = useState<'safety' | 'procedure' | 'medication'>('safety');
  const [editAnnContent, setEditAnnContent] = useState<string>('');
  const [editAnnIsUrgent, setEditAnnIsUrgent] = useState<boolean>(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'admin' || pinInput === '1234' || pinInput === 'nurse') {
      setIsUnlocked(true);
      setIsAdminMode(true);
      setPinError('');
      playAudioChime('success');
      showNotification('ยินดีต้อนรับสู่แผงควบคุมระบบ (Admin Portal)');
    } else {
      setPinError('รหัสผ่านไม่ถูกต้อง (รหัสผ่าน Admin: admin หรือ 1234)');
      playAudioChime('alert');
    }
  };

  // User Access Management Handlers
  const handleToggleUserStatus = (u: ManagedUser) => {
    const nextStatus = u.status === 'active' ? 'suspended' : 'active';
    updateManagedUserStatus(u.id, nextStatus);
    playAudioChime('click');
    showNotification(
      nextStatus === 'active'
        ? `เปิดการเข้าถึงข้อมูลของ ${u.name} เรียบร้อยแล้ว`
        : `ระงับการเข้าถึงข้อมูลของ ${u.name} เรียบร้อยแล้ว`
    );
  };

  const handleResetPin = (u: ManagedUser) => {
    const tempPin = resetManagedUserPin(u.id);
    playAudioChime('success');
    showNotification(`รีเซ็ตรหัสผ่านสำหรับ ${u.name} เรียบร้อย: รหัสชั่วคราวคือ ${tempPin}`);
  };

  const handleDeleteUser = (u: ManagedUser) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้งาน "${u.name}" ออกจากระบบ?`)) {
      deleteManagedUser(u.id);
      playAudioChime('click');
      showNotification(`ลบผู้ใช้งาน ${u.name} เรียบร้อยแล้ว`);
    }
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserCode.trim()) return;

    addManagedUser({
      role: newUserRole,
      name: newUserName.trim(),
      code: newUserCode.trim(),
      yearOrDept: newUserYearOrDept.trim(),
      groupOrWard: newUserGroupOrWard.trim(),
      status: 'active',
      reflectionCount: 0,
      confidenceScoreAvg: 0,
    });

    setIsAddUserModalOpen(false);
    setNewUserName('');
    setNewUserCode('');
    playAudioChime('success');
    showNotification(`เพิ่ม ${newUserRole === 'student' ? 'นักศึกษา' : 'อาจารย์'} สำเร็จ`);
  };

  const handleStartEditUser = (u: ManagedUser) => {
    setEditingUserId(u.id);
    setEditUserName(u.name);
    setEditUserCode(u.code);
    setEditUserYearOrDept(u.yearOrDept);
    setEditUserGroupOrWard(u.groupOrWard);
  };

  const handleSaveUserEdit = (id: string) => {
    updateManagedUser(id, {
      name: editUserName.trim(),
      code: editUserCode.trim(),
      yearOrDept: editUserYearOrDept.trim(),
      groupOrWard: editUserGroupOrWard.trim(),
    });
    setEditingUserId(null);
    playAudioChime('success');
    showNotification('บันทึกการแก้ไขข้อมูลผู้ใช้งานเรียบร้อยแล้ว');
  };

  // SOS Contact Handlers
  const handleStartEditContact = (c: SOSContact) => {
    setEditingContactId(c.id);
    setEditContactName(c.name);
    setEditContactPhone(c.phoneNumber);
    setEditContactDept(c.department);
    setEditContactRoleTh(c.roleTh);
    setEditContactDesc(c.description);
  };

  const handleSaveContact = (id: string) => {
    updateSosContact(id, {
      name: editContactName.trim(),
      phoneNumber: editContactPhone.trim(),
      department: editContactDept.trim(),
      roleTh: editContactRoleTh.trim(),
      description: editContactDesc.trim(),
    });
    setEditingContactId(null);
    playAudioChime('success');
    showNotification('บันทึกการแก้ไขหมายเลขฉุกเฉินเรียบร้อยแล้ว');
  };

  const handleAddSosSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSosName.trim() || !newSosPhone.trim()) return;

    addSosContact({
      roleTh: newSosRoleTh.trim() || 'ผู้รับผิดชอบฉุกเฉิน',
      roleEn: newSosRoleEn.trim() || 'Emergency Officer',
      name: newSosName.trim(),
      phoneNumber: newSosPhone.trim(),
      department: newSosDept.trim() || 'หอผู้ป่วยฝึกปฏิบัติ',
      description: newSosDesc.trim() || 'ประสานงานเหตุฉุกเฉินและข้อผิดพลาดทางคลินิก',
    });

    setIsAddSosOpen(false);
    setNewSosName('');
    setNewSosPhone('');
    setNewSosDept('');
    setNewSosRoleTh('');
    setNewSosDesc('');
    playAudioChime('success');
    showNotification('เพิ่มหมายเลขฉุกเฉินและผู้รับผิดชอบเรียบร้อยแล้ว');
  };

  const handleDeleteContact = (id: string, name: string) => {
    if (window.confirm(`คุณต้องการลบข้อมูลผู้ติดต่อฉุกเฉิน "${name}" หรือไม่?`)) {
      deleteSosContact(id);
      playAudioChime('click');
      showNotification(`ลบผู้ติดต่อฉุกเฉิน ${name} เรียบร้อยแล้ว`);
    }
  };

  // Institutional Announcements Handlers
  const handleAddAnnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;

    addInstitutionalAnnouncement({
      title: newAnnTitle.trim(),
      wardName: newAnnWard.trim() || 'ทุกหอผู้ป่วยฝึกปฏิบัติ',
      category: newAnnCategory,
      content: newAnnContent.trim(),
      updatedBy: 'ผู้ดูแลระบบส่วนกลาง BCNR (Admin)',
      isUrgent: newAnnIsUrgent,
    });

    setIsAddAnnModalOpen(false);
    setNewAnnTitle('');
    setNewAnnContent('');
    setNewAnnIsUrgent(false);
    playAudioChime('success');
    showNotification('เผยแพร่ประกาศแนวปฏิบัติของสถาบันเรียบร้อยแล้ว');
  };

  const handleStartEditAnn = (ann: InstitutionalAnnouncement) => {
    setEditingAnnId(ann.id);
    setEditAnnTitle(ann.title);
    setEditAnnWard(ann.wardName);
    setEditAnnCategory(ann.category);
    setEditAnnContent(ann.content);
    setEditAnnIsUrgent(ann.isUrgent);
  };

  const handleSaveAnnEdit = (id: string) => {
    updateInstitutionalAnnouncement(id, {
      title: editAnnTitle.trim(),
      wardName: editAnnWard.trim(),
      category: editAnnCategory,
      content: editAnnContent.trim(),
      isUrgent: editAnnIsUrgent,
      updatedBy: 'ผู้ดูแลระบบส่วนกลาง BCNR (Admin)',
    });
    setEditingAnnId(null);
    playAudioChime('success');
    showNotification('บันทึกการแก้ไขประกาศแนวปฏิบัติเรียบร้อยแล้ว');
  };

  const handleDeleteAnn = (id: string, title: string) => {
    if (window.confirm(`คุณต้องการลบประกาศแนวปฏิบัติ "${title}" หรือไม่?`)) {
      deleteInstitutionalAnnouncement(id);
      playAudioChime('click');
      showNotification(`ลบประกาศ ${title} เรียบร้อยแล้ว`);
    }
  };

  const handleResetAllData = () => {
    if (window.confirm('คุณต้องการรีเซ็ตข้อมูลการฝึกทั้งหมดกลับเป็นค่าเริ่มต้นหรือไม่? ข้อมูลประเมินและสะท้อนคิดในเครื่องนี้จะถูกล้าง')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // Filtered Users List
  const filteredUsers = managedUsers.filter((u) => {
    const matchesQuery =
      u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.code.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.yearOrDept.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.groupOrWard.toLowerCase().includes(userSearchQuery.toLowerCase());

    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    const matchesStatus = userStatusFilter === 'all' || u.status === userStatusFilter;

    return matchesQuery && matchesRole && matchesStatus;
  });

  const studentCount = managedUsers.filter((u) => u.role === 'student').length;
  const instructorCount = managedUsers.filter((u) => u.role === 'instructor').length;
  const activeUserCount = managedUsers.filter((u) => u.status === 'active').length;

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-3xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto shadow-md shadow-purple-500/10">
          <Settings className="w-8 h-8" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-xs font-bold mb-2 border border-purple-200 dark:border-purple-800">
            <span>ผู้ดูแลระบบส่วนกลาง (Central Administrator)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            เข้าสู่ศูนย์จัดการระบบ Admin
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            กรุณากรอกรหัสผ่านเพื่อจัดการสิทธิ์การเข้าถึงข้อมูลนักศึกษาและอาจารย์, หมายเลขฉุกเฉิน, และประกาศแนวปฏิบัติสถาบัน แทนตำแหน่งอาจารย์
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-3">
          <div className="relative">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="กรอกรหัสผ่าน (admin หรือ 1234)"
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-center font-mono text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-slate-100 shadow-xs"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setPinInput('admin')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2 py-1 text-[10px] rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold hover:bg-purple-200"
            >
              ใส่ admin
            </button>
          </div>

          {pinError && <p className="text-xs text-red-500 font-semibold">{pinError}</p>}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition-all cursor-pointer"
            >
              เข้าสู่ระบบ Admin
            </button>
          </div>
        </form>

        <div className="pt-2 text-[11px] text-slate-400 space-y-1">
          <p>* สิทธิ์ Admin ควบคุมการเข้าถึงข้อมูลตำแหน่งนักศึกษาและอาจารย์ทั้งหมด</p>
          <p>* จัดการหมายเลขฉุกเฉิน และประกาศแนวปฏิบัติสถาบัน/หอผู้ป่วย แทนตำแหน่งอาจารย์</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Toast Notification */}
      {adminNotice && (
        <div className="fixed top-16 right-4 z-50 p-3 rounded-2xl bg-purple-900 text-white text-xs font-semibold shadow-xl border border-purple-400/40 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-purple-300" />
          <span>{adminNotice}</span>
        </div>
      )}

      {/* Admin Header & Brand */}
      <div className="bg-gradient-to-r from-purple-800 via-purple-900 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg border border-purple-700/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-purple-200 flex items-center justify-center backdrop-blur-xs border border-white/20 shadow-md">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[11px] tracking-wide">
                BCNR Central Administrator
              </span>
              <span className="text-xs text-purple-200 hidden sm:inline">
                • แทนตำแหน่งอาจารย์ในการบริหารจัดการ
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white mt-1">
              ศูนย์จัดการระบบ BCNR Skill UP
            </h2>
            <p className="text-xs text-purple-200 font-light">
              จัดการสิทธิ์นักศึกษา/อาจารย์ • หมายเลขฉุกเฉิน & ผู้รับผิดชอบ • ประกาศแนวปฏิบัติสถาบัน
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setActiveTab('home')}
            className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            title="กลับสู่หน้าหลัก"
          >
            <Home className="w-3.5 h-3.5" />
            <span>หน้าหลัก</span>
          </button>
          <button
            onClick={() => {
              setIsUnlocked(false);
              setIsAdminMode(false);
              setActiveTab('home');
            }}
            className="px-3 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold transition-all shadow-xs"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
            <span>นักศึกษาในระบบ</span>
            <Stethoscope className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {studentCount} <span className="text-xs font-normal text-slate-500">คน</span>
          </div>
          <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold">
            พร้อมฝึกหัตถการ & Checklist
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
            <span>อาจารย์นิเทศก์</span>
            <GraduationCap className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {instructorCount} <span className="text-xs font-normal text-slate-500">ท่าน</span>
          </div>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
            ผู้ประเมินผลและนิเทศก์
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
            <span>เบอร์โทรฉุกเฉิน SOS</span>
            <Phone className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {sosContacts.length} <span className="text-xs font-normal text-slate-500">คู่สาย</span>
          </div>
          <span className="text-[10px] text-red-600 dark:text-red-400 font-bold">
            ประจำหอผู้ป่วย & สถาบัน
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
            <span>ประกาศแนวปฏิบัติ</span>
            <Megaphone className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {institutionalAnnouncements.length} <span className="text-xs font-normal text-slate-500">เรื่อง</span>
          </div>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">
            มีผลบังคับใช้ทุกหอผู้ป่วย
          </span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 overflow-x-auto">
        <button
          onClick={() => setActiveAdminSection('users')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeAdminSection === 'users'
              ? 'bg-white dark:bg-purple-700 text-purple-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-purple-600 dark:text-purple-300" />
          <span>จัดการสิทธิ์นักศึกษา & อาจารย์</span>
        </button>

        <button
          onClick={() => setActiveAdminSection('sos')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeAdminSection === 'sos'
              ? 'bg-white dark:bg-purple-700 text-purple-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Phone className="w-4 h-4 text-red-500" />
          <span>จัดการหมายเลขฉุกเฉิน & ผู้รับผิดชอบ</span>
        </button>

        <button
          onClick={() => setActiveAdminSection('announcements')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeAdminSection === 'announcements'
              ? 'bg-white dark:bg-purple-700 text-purple-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Megaphone className="w-4 h-4 text-amber-500" />
          <span>ประกาศแนวปฏิบัติของสถาบัน</span>
        </button>

        <button
          onClick={() => setActiveAdminSection('safety')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeAdminSection === 'safety'
              ? 'bg-white dark:bg-purple-700 text-purple-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4 text-teal-600 dark:text-teal-300" />
          <span>ภาพรวมบันทึก & รีเซ็ตข้อมูล</span>
        </button>
      </div>

      {/* SECTION 1: Manage Student & Instructor Access */}
      {activeAdminSection === 'users' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  จัดการการเข้าถึงข้อมูลตำแหน่งนักศึกษาและอาจารย์ (Student & Instructor Access Control)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Admin สามารถตรวจสอบ อนุมัติสิทธิ์ ระงับการเข้าถึง และรีเซ็ตรหัสผ่านของนักศึกษาและอาจารย์
                </p>
              </div>

              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 flex items-center gap-1.5 self-start sm:self-center transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>เพิ่มผู้ใช้งานใหม่</span>
              </button>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  placeholder="ค้นหาชื่อ, รหัส, หรือวอร์ด..."
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex gap-1.5">
                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value as any)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium"
                >
                  <option value="all">ทุกตำแหน่ง (นักศึกษา + อาจารย์)</option>
                  <option value="student">เฉพาะนักศึกษาพยาบาล</option>
                  <option value="instructor">เฉพาะอาจารย์นิเทศก์</option>
                </select>
              </div>

              <div className="flex gap-1.5">
                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value as any)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium"
                >
                  <option value="all">ทุกสถานะการเข้าถึง</option>
                  <option value="active">เฉพาะใช้งานอยู่ (Active)</option>
                  <option value="suspended">เฉพาะที่ถูกระงับสิทธิ์ (Suspended)</option>
                </select>
              </div>
            </div>

            {/* Users List */}
            <div className="space-y-2.5 pt-2">
              {filteredUsers.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  ไม่พบข้อมูลผู้ใช้งานที่ตรงกับเงื่อนไขการค้นหา
                </div>
              ) : (
                filteredUsers.map((u) => {
                  const isStudent = u.role === 'student';
                  const isActive = u.status === 'active';
                  const isEditing = editingUserId === u.id;

                  return (
                    <div
                      key={u.id}
                      className={`p-4 rounded-2xl border transition-all space-y-3 ${
                        isActive
                          ? 'bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700/80'
                          : 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
                      }`}
                    >
                      {isEditing ? (
                        <div className="space-y-2.5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                                ชื่อ-นามสกุล:
                              </label>
                              <input
                                type="text"
                                value={editUserName}
                                onChange={(e) => setEditUserName(e.target.value)}
                                className="w-full p-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                                รหัสประจำตัว:
                              </label>
                              <input
                                type="text"
                                value={editUserCode}
                                onChange={(e) => setEditUserCode(e.target.value)}
                                className="w-full p-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                                ชั้นปี / ภาควิชา:
                              </label>
                              <input
                                type="text"
                                value={editUserYearOrDept}
                                onChange={(e) => setEditUserYearOrDept(e.target.value)}
                                className="w-full p-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                                กลุ่ม / วอร์ดฝึกปฏิบัติ:
                              </label>
                              <input
                                type="text"
                                value={editUserGroupOrWard}
                                onChange={(e) => setEditUserGroupOrWard(e.target.value)}
                                className="w-full p-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              onClick={() => setEditingUserId(null)}
                              className="px-3 py-1.5 rounded-xl border text-xs text-slate-600 dark:text-slate-300"
                            >
                              ยกเลิก
                            </button>
                            <button
                              onClick={() => handleSaveUserEdit(u.id)}
                              className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
                            >
                              บันทึกการแก้ไข
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start sm:items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 font-bold text-xs ${
                                isStudent ? 'bg-teal-600' : 'bg-indigo-600'
                              }`}
                            >
                              {isStudent ? (
                                <Stethoscope className="w-5 h-5" />
                              ) : (
                                <GraduationCap className="w-5 h-5" />
                              )}
                            </div>

                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                                    isStudent
                                      ? 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300'
                                      : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
                                  }`}
                                >
                                  {isStudent ? 'นักศึกษา' : 'อาจารย์นิเทศก์'}
                                </span>
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                  {u.name}
                                </h4>
                                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                                  ({u.code})
                                </span>

                                <span
                                  className={`px-2 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-1 ${
                                    isActive
                                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                                      : 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300'
                                  }`}
                                >
                                  {isActive ? (
                                    <>
                                      <UserCheck className="w-3 h-3 text-emerald-600" />
                                      <span>อนุมัติใช้งาน (Active)</span>
                                    </>
                                  ) : (
                                    <>
                                      <UserX className="w-3 h-3 text-red-600" />
                                      <span>ระงับการเข้าถึง (Suspended)</span>
                                    </>
                                  )}
                                </span>
                              </div>

                              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                                <span>{u.yearOrDept}</span> • <span>{u.groupOrWard}</span> •{' '}
                                <span className="text-slate-400">ใช้งานล่าสุด: {u.lastActive}</span>
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons for this user */}
                          <div className="flex items-center gap-1.5 self-end sm:self-center">
                            {/* Toggle Access */}
                            <button
                              onClick={() => handleToggleUserStatus(u)}
                              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                                isActive
                                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 hover:bg-amber-200'
                                  : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200'
                              }`}
                              title={isActive ? 'คลิกเพื่อระงับการเข้าถึง' : 'คลิกเพื่อเปิดการเข้าถึง'}
                            >
                              {isActive ? (
                                <>
                                  <Lock className="w-3.5 h-3.5" />
                                  <span>ระงับสิทธิ์</span>
                                </>
                              ) : (
                                <>
                                  <Unlock className="w-3.5 h-3.5" />
                                  <span>ปลดล็อกสิทธิ์</span>
                                </>
                              )}
                            </button>

                            {/* Reset PIN */}
                            <button
                              onClick={() => handleResetPin(u)}
                              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                              title="รีเซ็ตรหัสผ่าน/PIN เป็นค่าเริ่มต้น"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                            </button>

                            {/* Edit Info */}
                            <button
                              onClick={() => handleStartEditUser(u)}
                              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                              title="แก้ไขข้อมูลผู้ใช้"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteUser(u)}
                              className="p-1.5 rounded-xl border border-red-200 dark:border-red-900/60 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400"
                              title="ลบผู้ใช้งานนี้"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Emergency SOS Contacts Management */}
      {activeAdminSection === 'sos' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  จัดการหมายเลขโทรฉุกเฉินและผู้รับผิดชอบ (Emergency SOS Contacts)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  กำหนดรายชื่อผู้รับผิดชอบ หมายเลขโทรศัพท์ และหน้าที่ความรับผิดชอบประจำแต่ละหอผู้ป่วย แทนตำแหน่งอาจารย์
                </p>
              </div>

              <button
                onClick={() => setIsAddSosOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/20 flex items-center gap-1.5 self-start sm:self-center transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>เพิ่มผู้รับผิดชอบฉุกเฉิน</span>
              </button>
            </div>

            {/* List of SOS Contacts */}
            <div className="space-y-2.5 pt-1">
              {sosContacts.map((c) => {
                const isEditing = editingContactId === c.id;
                return (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5 text-xs"
                  >
                    {isEditing ? (
                      <div className="space-y-2.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                              ตำแหน่งผู้รับผิดชอบ (ภาษาไทย):
                            </label>
                            <input
                              type="text"
                              value={editContactRoleTh}
                              onChange={(e) => setEditContactRoleTh(e.target.value)}
                              className="w-full p-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                              ชื่อผู้รับผิดชอบ:
                            </label>
                            <input
                              type="text"
                              value={editContactName}
                              onChange={(e) => setEditContactName(e.target.value)}
                              className="w-full p-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                              หมายเลขโทรศัพท์ / เบอร์ภายใน:
                            </label>
                            <input
                              type="text"
                              value={editContactPhone}
                              onChange={(e) => setEditContactPhone(e.target.value)}
                              className="w-full p-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                              หน่วยงาน / หอผู้ป่วย:
                            </label>
                            <input
                              type="text"
                              value={editContactDept}
                              onChange={(e) => setEditContactDept(e.target.value)}
                              className="w-full p-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                            หน้าที่ความรับผิดชอบ:
                          </label>
                          <input
                            type="text"
                            value={editContactDesc}
                            onChange={(e) => setEditContactDesc(e.target.value)}
                            className="w-full p-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            onClick={() => setEditingContactId(null)}
                            className="px-3 py-1.5 rounded-xl border text-slate-600 dark:text-slate-300"
                          >
                            ยกเลิก
                          </button>
                          <button
                            onClick={() => handleSaveContact(c.id)}
                            className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-bold"
                          >
                            บันทึกการแก้ไข
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 font-bold text-[11px]">
                              {c.roleTh}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              ({c.roleEn})
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {c.name} • <span className="text-slate-500 font-normal">{c.department}</span>
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300">
                            {c.description}
                          </p>
                          <p className="font-mono text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5 pt-0.5">
                            <Phone className="w-3.5 h-3.5" />
                            <span>โทร: {c.phoneNumber}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-center">
                          <button
                            onClick={() => handleStartEditContact(c)}
                            className="p-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="แก้ไขผู้ติดต่อนี้"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteContact(c.id, c.name)}
                            className="p-2 rounded-xl border border-red-200 dark:border-red-900 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                            title="ลบผู้ติดต่อนี้"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Institutional Guidelines & Ward Policies */}
      {activeAdminSection === 'announcements' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-purple-600" />
                  ประกาศแนวปฏิบัติของสถาบัน / สถาบันการศึกษาประจำหอผู้ป่วย (แทนตำแหน่งอาจารย์)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  ระเบียบและข้อควรปฏิบัติที่กำหนดโดย Admin ซึ่งจะถูกแสดงในหน้าแรกและหน้าก่อนทำหัตถการของนักศึกษาทุกคน
                </p>
              </div>

              <button
                onClick={() => setIsAddAnnModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 flex items-center gap-1.5 self-start sm:self-center transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>สร้างประกาศใหม่</span>
              </button>
            </div>

            {/* List of Announcements */}
            <div className="space-y-3 pt-1">
              {institutionalAnnouncements.map((ann) => {
                const isEditing = editingAnnId === ann.id;
                return (
                  <div
                    key={ann.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-2.5 text-xs ${
                      ann.isUrgent
                        ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/80'
                        : 'bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700/80'
                    }`}
                  >
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                              หัวข้อประกาศ:
                            </label>
                            <input
                              type="text"
                              value={editAnnTitle}
                              onChange={(e) => setEditAnnTitle(e.target.value)}
                              className="w-full p-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                              หอผู้ป่วย / หน่วยงาน:
                            </label>
                            <input
                              type="text"
                              value={editAnnWard}
                              onChange={(e) => setEditAnnWard(e.target.value)}
                              className="w-full p-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                              หมวดหมู่:
                            </label>
                            <select
                              value={editAnnCategory}
                              onChange={(e) => setEditAnnCategory(e.target.value as any)}
                              className="w-full p-2 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                            >
                              <option value="safety">ความปลอดภัยทางคลินิก (Safety)</option>
                              <option value="procedure">ขั้นตอนหัตถการ (Procedure)</option>
                              <option value="medication">การบริหารยา (Medication)</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-2 pt-5">
                            <input
                              type="checkbox"
                              id="editUrgent"
                              checked={editAnnIsUrgent}
                              onChange={(e) => setEditAnnIsUrgent(e.target.checked)}
                              className="w-4 h-4 text-amber-600 rounded"
                            />
                            <label htmlFor="editUrgent" className="font-bold text-slate-700 dark:text-slate-200">
                              ตั้งเป็นประกาศด่วนมาก (Urgent Clinical Mandate)
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                            เนื้อหาแนวปฏิบัติ:
                          </label>
                          <textarea
                            rows={3}
                            value={editAnnContent}
                            onChange={(e) => setEditAnnContent(e.target.value)}
                            className="w-full p-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                          />
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingAnnId(null)}
                            className="px-3 py-1.5 rounded-xl border text-slate-600 dark:text-slate-300"
                          >
                            ยกเลิก
                          </button>
                          <button
                            onClick={() => handleSaveAnnEdit(ann.id)}
                            className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold"
                          >
                            บันทึกประกาศ
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              {ann.isUrgent && (
                                <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white font-black text-[10px] flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>ด่วนมาก (Urgent Mandate)</span>
                                </span>
                              )}
                              <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold text-[10px]">
                                {ann.category === 'safety'
                                  ? 'ความปลอดภัย'
                                  : ann.category === 'procedure'
                                  ? 'หัตถการ'
                                  : 'การบริหารยา'}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-[10px]">
                                {ann.wardName}
                              </span>
                            </div>

                            <h4 className="font-bold text-sm text-slate-900 dark:text-white pt-0.5">
                              {ann.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1.5 self-end sm:self-start">
                            <button
                              onClick={() => handleStartEditAnn(ann)}
                              className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="แก้ไขประกาศนี้"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteAnn(ann.id, ann.title)}
                              className="p-1.5 rounded-xl border border-red-200 dark:border-red-900 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                              title="ลบประกาศนี้"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1 whitespace-pre-line">
                          {ann.content}
                        </p>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 mt-2">
                          <span>ประกาศโดย: {ann.updatedBy}</span>
                          <span>มีผลบังคับใช้ตั้งแต่: {ann.effectiveDate}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: System Overview & Safety Data */}
      {activeAdminSection === 'safety' && (
        <div className="space-y-4">
          {/* Current Student in this browser */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              ข้อมูลนักศึกษาที่กำลังฝึกปฏิบัติในเครื่องนี้
            </h3>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <p>
                  <strong>ชื่อ-สกุล:</strong> {user.name} ({user.studentCode || 'N/A'})
                </p>
                <p>
                  <strong>ระดับชั้น:</strong> {user.year} | <strong>กลุ่ม:</strong> {user.group || 'N/A'}
                </p>
                <p>
                  <strong>บันทึกสะท้อนคิด (Reflection):</strong> {reflections.length} รายการ
                </p>
                <p>
                  <strong>บันทึกความมั่นใจ (Confidence History):</strong> {confidenceRecords.length} ครั้ง
                </p>
              </div>
            </div>
          </div>

          {/* Reset Session / Danger Zone */}
          <div className="bg-red-50 dark:bg-red-950/30 rounded-3xl p-5 border border-red-200 dark:border-red-900/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-sm text-red-900 dark:text-red-200">
                ล้างข้อมูลการฝึกและรีเซ็ตระบบ (Reset Session Data)
              </h4>
              <p className="text-xs text-red-700 dark:text-red-300">
                ล้างข้อมูลแคชการฝึกปฏิบัติในเบราว์เซอร์นี้ เพื่อเตรียมให้พร้อมสำหรับนักศึกษาหรือกลุ่มฝึกผลัดถัดไป
              </p>
            </div>

            <button
              onClick={handleResetAllData}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all cursor-pointer"
            >
              ล้างข้อมูลทั้งหมด
            </button>
          </div>
        </div>
      )}

      {/* Modal: Add User */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>เพิ่มผู้ใช้งานใหม่ในระบบ (Admin)</span>
              </h3>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">ตำแหน่ง / บทบาท:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewUserRole('student');
                      setNewUserYearOrDept('ชั้นปีที่ 2');
                      setNewUserGroupOrWard('กลุ่ม 2A');
                    }}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      newUserRole === 'student'
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    นักศึกษาพยาบาล
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewUserRole('instructor');
                      setNewUserYearOrDept('กลุ่มวิชาการพยาบาลพื้นฐาน');
                      setNewUserGroupOrWard('อาจารย์นิเทศก์วอร์ดอายุรกรรม');
                    }}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      newUserRole === 'instructor'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    อาจารย์ผู้สอน
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">ชื่อ - นามสกุล:</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                  placeholder={newUserRole === 'student' ? 'เช่น นศพย. ปิยะมาศ ภักดี' : 'เช่น อ.ดร. นันทวัน เกียรติพยาบาล'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  {newUserRole === 'student' ? 'รหัสนักศึกษา:' : 'รหัสประจำตัวอาจารย์:'}
                </label>
                <input
                  type="text"
                  value={newUserCode}
                  onChange={(e) => setNewUserCode(e.target.value)}
                  required
                  placeholder={newUserRole === 'student' ? 'เช่น 6501235' : 'เช่น INS-1002'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">
                    {newUserRole === 'student' ? 'ชั้นปี:' : 'ภาควิชา:'}
                  </label>
                  <input
                    type="text"
                    value={newUserYearOrDept}
                    onChange={(e) => setNewUserYearOrDept(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">
                    {newUserRole === 'student' ? 'กลุ่ม / วอร์ด:' : 'ความรับผิดชอบ:'}
                  </label>
                  <input
                    type="text"
                    value={newUserGroupOrWard}
                    onChange={(e) => setNewUserGroupOrWard(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  บันทึกผู้ใช้
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add SOS Contact */}
      {isAddSosOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span>เพิ่มผู้รับผิดชอบฉุกเฉิน (SOS)</span>
              </h3>
              <button
                onClick={() => setIsAddSosOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSosSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">ตำแหน่ง (ภาษาไทย):</label>
                <input
                  type="text"
                  value={newSosRoleTh}
                  onChange={(e) => setNewSosRoleTh(e.target.value)}
                  required
                  placeholder="เช่น พยาบาลหัวหน้าเวรฉุกเฉิน"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">ชื่อผู้รับผิดชอบ:</label>
                <input
                  type="text"
                  value={newSosName}
                  onChange={(e) => setNewSosName(e.target.value)}
                  required
                  placeholder="เช่น พว. วิภาดา สุขใจ"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">เบอร์โทรศัพท์:</label>
                  <input
                    type="text"
                    value={newSosPhone}
                    onChange={(e) => setNewSosPhone(e.target.value)}
                    required
                    placeholder="เช่น 02-123-4567 หรือ 4110"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">หอผู้ป่วย / แผนก:</label>
                  <input
                    type="text"
                    value={newSosDept}
                    onChange={(e) => setNewSosDept(e.target.value)}
                    required
                    placeholder="เช่น วอร์ดอายุรกรรม 4B"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">หน้าที่ความรับผิดชอบ:</label>
                <input
                  type="text"
                  value={newSosDesc}
                  onChange={(e) => setNewSosDesc(e.target.value)}
                  placeholder="เช่น ตรวจสอบความปลอดภัยยาและรับแจ้งเหตุไม่พึงประสงค์"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddSosOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  บันทึกเบอร์ฉุกเฉิน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Announcement */}
      {isAddAnnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-purple-600" />
                <span>สร้างประกาศแนวปฏิบัติของสถาบัน (Admin)</span>
              </h3>
              <button
                onClick={() => setIsAddAnnModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAnnSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">หัวข้อประกาศ:</label>
                <input
                  type="text"
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  required
                  placeholder="เช่น ข้อบังคับการระบุตัวผู้ป่วยด้วย 2 ตัวบ่งชี้ก่อนให้ยา"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">หอผู้ป่วย / หน่วยงาน:</label>
                  <input
                    type="text"
                    value={newAnnWard}
                    onChange={(e) => setNewAnnWard(e.target.value)}
                    required
                    placeholder="เช่น ทุกหอผู้ป่วยฝึกปฏิบัติ"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">หมวดหมู่:</label>
                  <select
                    value={newAnnCategory}
                    onChange={(e) => setNewAnnCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  >
                    <option value="safety">ความปลอดภัยทางคลินิก (Safety)</option>
                    <option value="procedure">ขั้นตอนหัตถการ (Procedure)</option>
                    <option value="medication">การบริหารยา (Medication)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">เนื้อหาประกาศแนวปฏิบัติ:</label>
                <textarea
                  rows={4}
                  value={newAnnContent}
                  onChange={(e) => setNewAnnContent(e.target.value)}
                  required
                  placeholder="ระบุข้อกำหนด ขั้นตอนปฏิบัติการพยาบาล และข้อควรระวัง..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                <input
                  type="checkbox"
                  id="newUrgent"
                  checked={newAnnIsUrgent}
                  onChange={(e) => setNewAnnIsUrgent(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <label htmlFor="newUrgent" className="font-bold text-amber-900 dark:text-amber-200 text-xs">
                  ตั้งเป็นประกาศด่วนมาก (แสดงแถบแจ้งเตือนพิเศษในหน้าแรก)
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddAnnModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  เผยแพร่ประกาศ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
