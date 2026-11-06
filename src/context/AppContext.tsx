import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProcedureType,
  UserProfile,
  ProcedureInfo,
  ChecklistStep,
  TenRight,
  SOSContact,
  Badge,
  ConfidenceRecord,
  ClinicalReflection,
  SBARRecord,
  MainSkillTopic,
  MainTopicId,
  ManagedUser,
  InstitutionalAnnouncement,
} from '../types';
import {
  DEFAULT_USER,
  DEFAULT_ADMIN_USER,
  DEFAULT_MANAGED_USERS,
  DEFAULT_INSTITUTIONAL_ANNOUNCEMENTS,
  PROCEDURES_DATA,
  DEFAULT_CHECKLIST_STEPS,
  TEN_RIGHTS_DATA,
  DEFAULT_SOS_CONTACTS,
  DEFAULT_BADGES,
  DEFAULT_CONFIDENCE_HISTORY,
  DEFAULT_REFLECTIONS,
  MAIN_SKILL_TOPICS,
} from '../data/defaultData';

export type NavTab = 'home' | 'review' | 'checklist' | 'sbar' | 'profile' | 'admin';

interface AppContextType {
  user: UserProfile;
  isLoggedIn: boolean;
  loginAsAdmin: (info?: { name?: string; department?: string }) => void;
  loginAsInstructor: (info: { name: string; department?: string; instructorCode?: string }) => void;
  loginAsStudent: (info: {
    name: string;
    studentCode?: string;
    year?: string;
    group?: string;
    selectedLesson?: ProcedureType;
    supervisingInstructor?: string;
  }) => void;
  logout: () => void;
  switchRole: () => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  reviewSubTab: 'landmarks' | 'visual' | 'medications' | 'dosage-calc' | 'equipment' | '10rights';
  setReviewSubTab: (tab: 'landmarks' | 'visual' | 'medications' | 'dosage-calc' | 'equipment' | '10rights') => void;
  openDosageCalculator: () => void;
  selectedProcedure: ProcedureType;
  setSelectedProcedure: (code: ProcedureType) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSOSModalOpen: boolean;
  setIsSOSModalOpen: (val: boolean) => void;
  isSafetyDisclaimerOpen: boolean;
  setIsSafetyDisclaimerOpen: (val: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (val: boolean) => void;
  isQuickReviewModalOpen: boolean;
  setIsQuickReviewModalOpen: (val: boolean) => void;
  isWelcomeGuideOpen: boolean;
  setIsWelcomeGuideOpen: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // 8 Main Clinical Topics
  mainTopics: MainSkillTopic[];
  selectedMainTopic: MainTopicId;
  setSelectedMainTopic: (id: MainTopicId) => void;
  lockedTopicModal: MainSkillTopic | null;
  setLockedTopicModal: (topic: MainSkillTopic | null) => void;
  openTopic: (topic: MainSkillTopic) => void;

  // Procedures & Checklists
  procedures: ProcedureInfo[];
  checklistSteps: ChecklistStep[];
  checkedStepIds: string[];
  toggleChecklistStep: (stepId: string) => boolean; // returns false if safety alert triggered
  resetChecklist: (code: ProcedureType) => void;
  isChecklistComplete: (code: ProcedureType) => boolean;
  getProcedureProgress: (code: ProcedureType) => number;
  safetyAlertStep: ChecklistStep | null;
  setSafetyAlertStep: (step: ChecklistStep | null) => void;
  confirmBypassSafetyAlert: () => void;

  // Confidence & Reflection
  confidenceHistory: ConfidenceRecord[];
  confidenceRecords: ConfidenceRecord[];
  latestPreScore: number | null;
  latestPostScore: number | null;
  savePreConfidence: (code: ProcedureType, score: number) => void;
  savePostConfidence: (code: ProcedureType, score: number) => void;
  addConfidenceRecord: (record: { procedureType: ProcedureType; preScore: number; postScore: number; notes?: string }) => void;
  reflections: ClinicalReflection[];
  saveReflection: (reflection: {
    procedureCode: ProcedureType;
    strengths: string;
    uncertainties: string;
    nextImprovement: string;
    reviewTopics: string;
  }) => void;
  addReflection: (item: {
    procedureType: ProcedureType;
    preConfidenceScore: number;
    postConfidenceScore: number;
    whatWentWell: string;
    whatWasChallenging: string;
    actionPlan: string;
  }) => void;
  deleteReflection: (id: string) => void;

  // SBAR
  sbarHistory: SBARRecord[];
  saveSBAR: (sbar: SBARRecord) => void;

  // Admin & Content Management (ผู้ดูแลระบบส่วนกลาง)
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
  tenRights: TenRight[];
  sosContacts: SOSContact[];
  badges: Badge[];
  updateUser: (profile: Partial<UserProfile>) => void;
  updateChecklistStep: (updated: ChecklistStep) => void;
  addChecklistStep: (newStep: ChecklistStep) => void;
  deleteChecklistStep: (id: string) => void;
  updateTenRight: (updated: TenRight) => void;
  updateSOSContact: (updated: SOSContact) => void;
  updateSosContact: (id: string, updated: Partial<SOSContact>) => void;
  addSosContact: (newContact: Omit<SOSContact, 'id'>) => void;
  deleteSosContact: (id: string) => void;

  // Student & Instructor Access Control (การจัดการสิทธิ์การเข้าถึงข้อมูล)
  managedUsers: ManagedUser[];
  updateManagedUserStatus: (id: string, status: 'active' | 'suspended') => void;
  updateManagedUser: (id: string, updated: Partial<ManagedUser>) => void;
  addManagedUser: (newUser: Omit<ManagedUser, 'id' | 'lastActive'>) => void;
  deleteManagedUser: (id: string) => void;
  resetManagedUserPin: (id: string) => string;
  evaluateStudent: (
    studentId: string,
    grade: 'Pass' | 'Good' | 'Excellent' | 'Pending',
    feedback: string
  ) => void;

  // Institutional Guidelines & Ward Policies (ประกาศแนวปฏิบัติของสถาบันและหอผู้ป่วย)
  institutionalAnnouncements: InstitutionalAnnouncement[];
  addInstitutionalAnnouncement: (newAnn: Omit<InstitutionalAnnouncement, 'id' | 'effectiveDate'>) => void;
  updateInstitutionalAnnouncement: (id: string, updated: Partial<InstitutionalAnnouncement>) => void;
  deleteInstitutionalAnnouncement: (id: string) => void;

  // Sound & Speech
  playAudioChime: (type: 'success' | 'alert' | 'click') => void;
  speakText: (text: string) => void;
  stopSpeech: () => void;
  isSpeaking: boolean;

  // Data Sync & Reset
  resetAllDataToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const CURRENT_DATA_VERSION = '2026-10-05-v4-ward-summary-real-students';

  // Persistence helpers with automatic cache invalidation for code updates
  const getStored = <T,>(key: string, defaultVal: T): T => {
    try {
      const savedVersion = localStorage.getItem('nic_data_version');
      // If code version changed, invalidate stale cached static checklist, procedures & managed users
      if (savedVersion !== CURRENT_DATA_VERSION && (key === 'checklist_steps' || key === 'procedures' || key === 'managed_users')) {
        localStorage.removeItem(`nic_${key}`);
        localStorage.setItem('nic_data_version', CURRENT_DATA_VERSION);
        return defaultVal;
      }
      const item = localStorage.getItem(`nic_${key}`);
      return item ? JSON.parse(item) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  const setStored = <T,>(key: string, val: T) => {
    try {
      localStorage.setItem(`nic_${key}`, JSON.stringify(val));
    } catch {
      // ignore
    }
  };

  // State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => getStored('is_logged_in', false));
  const [user, setUser] = useState<UserProfile>(() => getStored('user', DEFAULT_USER));
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [reviewSubTab, setReviewSubTab] = useState<'landmarks' | 'visual' | 'medications' | 'dosage-calc' | 'equipment' | '10rights'>('landmarks');
  const [selectedProcedure, setSelectedProcedure] = useState<ProcedureType>(() => {
    return user.selectedLesson || 'IM';
  });

  const openDosageCalculator = () => {
    setActiveTab('review');
    setReviewSubTab('dosage-calc');
  };
  const isDarkMode = false;
  const toggleDarkMode = () => {};
  const [isSOSModalOpen, setIsSOSModalOpen] = useState<boolean>(false);
  const [isSafetyDisclaimerOpen, setIsSafetyDisclaimerOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isQuickReviewModalOpen, setIsQuickReviewModalOpen] = useState<boolean>(false);
  const [isWelcomeGuideOpen, setIsWelcomeGuideOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>(() => getStored('favorites', ['proc-im', 'right-1', 'syr-3ml']));

  // 8 Main Clinical Topics State
  const [mainTopics] = useState<MainSkillTopic[]>(MAIN_SKILL_TOPICS);
  const [selectedMainTopic, setSelectedMainTopic] = useState<MainTopicId>('injection');
  const [lockedTopicModal, setLockedTopicModal] = useState<MainSkillTopic | null>(null);

  const [procedures, setProcedures] = useState<ProcedureInfo[]>(() => getStored('procedures', PROCEDURES_DATA));
  const [checklistSteps, setChecklistSteps] = useState<ChecklistStep[]>(() => getStored('checklist_steps', DEFAULT_CHECKLIST_STEPS));
  const [checkedStepIds, setCheckedStepIds] = useState<string[]>(() => getStored('checked_steps', ['im-step-1', 'im-step-2']));
  const [safetyAlertStep, setSafetyAlertStep] = useState<ChecklistStep | null>(null);

  const [confidenceHistory, setConfidenceHistory] = useState<ConfidenceRecord[]>(() => getStored('conf_history', DEFAULT_CONFIDENCE_HISTORY));
  const [reflections, setReflections] = useState<ClinicalReflection[]>(() => getStored('reflections', DEFAULT_REFLECTIONS));
  const [sbarHistory, setSbarHistory] = useState<SBARRecord[]>(() => getStored('sbar_history', []));
  const [tenRights, setTenRights] = useState<TenRight[]>(() => getStored('ten_rights', TEN_RIGHTS_DATA));
  const [sosContacts, setSosContacts] = useState<SOSContact[]>(() => getStored('sos_contacts', DEFAULT_SOS_CONTACTS));
  const [managedUsers, setManagedUsers] = useState<ManagedUser[]>(() => getStored('managed_users', DEFAULT_MANAGED_USERS));
  const [institutionalAnnouncements, setInstitutionalAnnouncements] = useState<InstitutionalAnnouncement[]>(() =>
    getStored('inst_announcements', DEFAULT_INSTITUTIONAL_ANNOUNCEMENTS)
  );
  const [badges, setBadges] = useState<Badge[]>(() => getStored('badges', DEFAULT_BADGES));
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Helper to synchronize any active student's real input into managedUsers database
  const syncStudentDataToManagedUsers = (
    studentProfile: UserProfile,
    updates: Partial<ManagedUser>
  ) => {
    setManagedUsers(prev => {
      const targetCode = studentProfile.studentCode?.trim();
      const targetId = studentProfile.id;
      const index = prev.findIndex(
        u => (targetCode && u.code === targetCode) || u.id === targetId || (u.role === 'student' && u.name === studentProfile.name)
      );

      if (index !== -1) {
        const existing = prev[index];
        const updatedItem: ManagedUser = {
          ...existing,
          ...updates,
          name: studentProfile.name || existing.name,
          code: studentProfile.studentCode || existing.code,
          groupOrWard: studentProfile.group || existing.groupOrWard,
          yearOrDept: studentProfile.year || existing.yearOrDept,
          supervisingInstructor: studentProfile.supervisingInstructor || existing.supervisingInstructor,
          isRealStudent: true,
          procedureProgress: {
            IM: updates.procedureProgress?.IM ?? existing.procedureProgress?.IM ?? 0,
            SC: updates.procedureProgress?.SC ?? existing.procedureProgress?.SC ?? 0,
            ID: updates.procedureProgress?.ID ?? existing.procedureProgress?.ID ?? 0,
            IV: updates.procedureProgress?.IV ?? existing.procedureProgress?.IV ?? 0,
          },
          checklistCompleted: {
            IM: updates.checklistCompleted?.IM ?? existing.checklistCompleted?.IM ?? false,
            SC: updates.checklistCompleted?.SC ?? existing.checklistCompleted?.SC ?? false,
            ID: updates.checklistCompleted?.ID ?? existing.checklistCompleted?.ID ?? false,
            IV: updates.checklistCompleted?.IV ?? existing.checklistCompleted?.IV ?? false,
          },
        };
        const nextList = [...prev];
        nextList[index] = updatedItem;
        return nextList;
      } else {
        const newStudent: ManagedUser = {
          id: studentProfile.id || `usr-stud-${Date.now()}`,
          role: 'student',
          name: studentProfile.name,
          code: studentProfile.studentCode || '6501' + Math.floor(100 + Math.random() * 900),
          yearOrDept: studentProfile.year || 'ชั้นปีที่ 2',
          groupOrWard: studentProfile.group || 'กลุ่ม 2A (วอร์ดอายุรกรรม 4B)',
          status: 'active',
          lastActive: 'เพิ่งลงชื่อเข้าใช้ระบบจริง',
          supervisingInstructor: studentProfile.supervisingInstructor || 'อ.ดร. นันทวัน เกียรติพยาบาล',
          isRealStudent: true,
          reflectionCount: updates.reflectionCount ?? 0,
          confidenceScoreAvg: updates.confidenceScoreAvg ?? 0,
          preConfidenceAvg: updates.preConfidenceAvg ?? 0,
          postConfidenceAvg: updates.postConfidenceAvg ?? 0,
          procedureProgress: updates.procedureProgress ?? { IM: 0, SC: 0, ID: 0, IV: 0 },
          checklistCompleted: updates.checklistCompleted ?? { IM: false, SC: false, ID: false, IV: false },
          allReflections: updates.allReflections ?? [],
          latestReflection: updates.latestReflection,
          submissionTimestamp: new Date().toISOString(),
          ...updates,
        };
        return [newStudent, ...prev];
      }
    });
  };

  // Permanent Light Mode (Enforce Light Theme exclusively)
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.documentElement.style.colorScheme = 'light';
    try {
      localStorage.removeItem('nic_dark_mode');
    } catch {
      // ignore
    }
  }, []);

  // Sync state to LocalStorage
  useEffect(() => { setStored('is_logged_in', isLoggedIn); }, [isLoggedIn]);
  useEffect(() => { setStored('user', user); }, [user]);
  useEffect(() => { setStored('favorites', favorites); }, [favorites]);
  useEffect(() => { setStored('procedures', procedures); }, [procedures]);
  useEffect(() => { setStored('checklist_steps', checklistSteps); }, [checklistSteps]);
  useEffect(() => { setStored('checked_steps', checkedStepIds); }, [checkedStepIds]);
  useEffect(() => { setStored('conf_history', confidenceHistory); }, [confidenceHistory]);
  useEffect(() => { setStored('reflections', reflections); }, [reflections]);
  useEffect(() => { setStored('sbar_history', sbarHistory); }, [sbarHistory]);
  useEffect(() => { setStored('ten_rights', tenRights); }, [tenRights]);
  useEffect(() => { setStored('sos_contacts', sosContacts); }, [sosContacts]);
  useEffect(() => { setStored('managed_users', managedUsers); }, [managedUsers]);
  useEffect(() => { setStored('inst_announcements', institutionalAnnouncements); }, [institutionalAnnouncements]);
  useEffect(() => { setStored('badges', badges); }, [badges]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const openTopic = (topic: MainSkillTopic) => {
    if (topic.isUnlocked) {
      setSelectedMainTopic(topic.id);
      playAudioChime('click');
    } else {
      playAudioChime('alert');
      setLockedTopicModal(topic);
    }
  };

  // Audio effects
  const playAudioChime = (type: 'success' | 'alert' | 'click') => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'alert') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(370, now + 0.12);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  // Text to Speech
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const cleanText = text.replace(/[*_#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'th-TH';
    utterance.rate = 0.95;

    // Try to find a Thai voice if available
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices.find(v => v.lang.includes('th') || v.lang.includes('TH'));
    if (thaiVoice) utterance.voice = thaiVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Checklist logic with Safety Alert detection
  const toggleChecklistStep = (stepId: string): boolean => {
    const currentSteps = checklistSteps.filter(s => s.procedureCode === selectedProcedure);
    const targetIndex = currentSteps.findIndex(s => s.id === stepId);
    if (targetIndex === -1) return true;

    const targetStep = currentSteps[targetIndex];
    const isCurrentlyChecked = checkedStepIds.includes(stepId);

    // If unchecking, simply allow
    if (isCurrentlyChecked) {
      playAudioChime('click');
      const newChecked = checkedStepIds.filter(id => id !== stepId);
      setCheckedStepIds(newChecked);

      if (user.role === 'student') {
        const getProgressForCode = (code: ProcedureType) => {
          const steps = checklistSteps.filter(s => s.procedureCode === code);
          if (steps.length === 0) return 0;
          const comp = steps.filter(s => newChecked.includes(s.id)).length;
          return Math.round((comp / steps.length) * 100);
        };
        syncStudentDataToManagedUsers(user, {
          procedureProgress: {
            IM: getProgressForCode('IM'),
            SC: getProgressForCode('SC'),
            ID: getProgressForCode('ID'),
            IV: getProgressForCode('IV'),
          },
          checklistCompleted: {
            IM: getProgressForCode('IM') === 100,
            SC: getProgressForCode('SC') === 100,
            ID: getProgressForCode('ID') === 100,
            IV: getProgressForCode('IV') === 100,
          },
          lastActive: 'ปรับปรุง Checklist เมื่อสักครู่',
        });
      }
      return true;
    }

    // Checking: Check if any prior step was critical and not yet completed!
    for (let i = 0; i < targetIndex; i++) {
      const priorStep = currentSteps[i];
      if (priorStep.isCriticalSafety && !checkedStepIds.includes(priorStep.id)) {
        // Trigger Safety Alert!
        playAudioChime('alert');
        setSafetyAlertStep(priorStep);
        return false;
      }
    }

    // Step can be completed safely
    playAudioChime('click');
    const newChecked = [...checkedStepIds, stepId];
    setCheckedStepIds(newChecked);

    if (user.role === 'student') {
      const getProgressForCode = (code: ProcedureType) => {
        const steps = checklistSteps.filter(s => s.procedureCode === code);
        if (steps.length === 0) return 0;
        const comp = steps.filter(s => newChecked.includes(s.id)).length;
        return Math.round((comp / steps.length) * 100);
      };
      syncStudentDataToManagedUsers(user, {
        procedureProgress: {
          IM: getProgressForCode('IM'),
          SC: getProgressForCode('SC'),
          ID: getProgressForCode('ID'),
          IV: getProgressForCode('IV'),
        },
        checklistCompleted: {
          IM: getProgressForCode('IM') === 100,
          SC: getProgressForCode('SC') === 100,
          ID: getProgressForCode('ID') === 100,
          IV: getProgressForCode('IV') === 100,
        },
        lastActive: 'บันทึก Checklist จริงเมื่อสักครู่',
      });
    }

    // Check if full procedure completed
    const allCheckedForProcedure = currentSteps.every(s => newChecked.includes(s.id));
    if (allCheckedForProcedure) {
      playAudioChime('success');
      // Unlock badge if needed
      unlockBadge('badge-first-checklist');
      // Check if all 4 procedures are completed
      checkAllProceduresCompleted(newChecked);
    }

    return true;
  };

  const confirmBypassSafetyAlert = () => {
    if (!safetyAlertStep) return;
    // Automatically check the skipped critical step to enforce safety
    const newChecked = [...new Set([...checkedStepIds, safetyAlertStep.id])];
    setCheckedStepIds(newChecked);

    if (user.role === 'student') {
      const getProgressForCode = (code: ProcedureType) => {
        const steps = checklistSteps.filter(s => s.procedureCode === code);
        if (steps.length === 0) return 0;
        const comp = steps.filter(s => newChecked.includes(s.id)).length;
        return Math.round((comp / steps.length) * 100);
      };
      syncStudentDataToManagedUsers(user, {
        procedureProgress: {
          IM: getProgressForCode('IM'),
          SC: getProgressForCode('SC'),
          ID: getProgressForCode('ID'),
          IV: getProgressForCode('IV'),
        },
        checklistCompleted: {
          IM: getProgressForCode('IM') === 100,
          SC: getProgressForCode('SC') === 100,
          ID: getProgressForCode('ID') === 100,
          IV: getProgressForCode('IV') === 100,
        },
        lastActive: 'แก้ไข Critical Safety Checklist',
      });
    }

    playAudioChime('success');
    setSafetyAlertStep(null);
  };

  const resetChecklist = (code: ProcedureType) => {
    const stepIdsForProc = checklistSteps.filter(s => s.procedureCode === code).map(s => s.id);
    const newChecked = checkedStepIds.filter(id => !stepIdsForProc.includes(id));
    setCheckedStepIds(newChecked);

    if (user.role === 'student') {
      const getProgressForCode = (pCode: ProcedureType) => {
        const steps = checklistSteps.filter(s => s.procedureCode === pCode);
        if (steps.length === 0) return 0;
        const comp = steps.filter(s => newChecked.includes(s.id)).length;
        return Math.round((comp / steps.length) * 100);
      };
      syncStudentDataToManagedUsers(user, {
        procedureProgress: {
          IM: getProgressForCode('IM'),
          SC: getProgressForCode('SC'),
          ID: getProgressForCode('ID'),
          IV: getProgressForCode('IV'),
        },
        checklistCompleted: {
          IM: getProgressForCode('IM') === 100,
          SC: getProgressForCode('SC') === 100,
          ID: getProgressForCode('ID') === 100,
          IV: getProgressForCode('IV') === 100,
        },
        lastActive: `รีเซ็ต Checklist ${code}`,
      });
    }
  };

  const isChecklistComplete = (code: ProcedureType) => {
    const steps = checklistSteps.filter(s => s.procedureCode === code);
    if (steps.length === 0) return false;
    return steps.every(s => checkedStepIds.includes(s.id));
  };

  const getProcedureProgress = (code: ProcedureType): number => {
    const steps = checklistSteps.filter(s => s.procedureCode === code);
    if (steps.length === 0) return 0;
    const completedCount = steps.filter(s => checkedStepIds.includes(s.id)).length;
    return Math.round((completedCount / steps.length) * 100);
  };

  // Badges check
  const unlockBadge = (badgeId: string) => {
    setBadges(prev =>
      prev.map(b => (b.id === badgeId && !b.isUnlocked ? { ...b, isUnlocked: true, unlockedAt: new Date().toISOString() } : b))
    );
  };

  const checkAllProceduresCompleted = (checkedIds: string[]) => {
    const procs: ProcedureType[] = ['IM', 'SC', 'ID', 'IV'];
    const allDone = procs.every(p => {
      const procSteps = checklistSteps.filter(s => s.procedureCode === p);
      return procSteps.length > 0 && procSteps.every(s => checkedIds.includes(s.id));
    });
    if (allDone) {
      unlockBadge('badge-procedure-master');
    }
  };

  // Confidence scores
  const savePreConfidence = (code: ProcedureType, score: number) => {
    const now = new Date();
    const dateStr = `${now.getDate()} ${['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'][now.getMonth()]} ${now.getFullYear() + 543}`;
    setConfidenceHistory(prev => {
      const openIndex = prev.findIndex(r => r.procedureCode === code && !r.postScore);
      if (openIndex !== -1) {
        const updated = [...prev];
        updated[openIndex] = {
          ...updated[openIndex],
          preScore: score,
          timestamp: now.toISOString(),
          dateStr,
        };
        return updated;
      }
      const newRecord: ConfidenceRecord = {
        id: `conf-${Date.now()}`,
        userId: user.id,
        procedureCode: code,
        preScore: score,
        timestamp: now.toISOString(),
        dateStr,
      };
      return [newRecord, ...prev];
    });
    playAudioChime('success');
  };

  const savePostConfidence = (code: ProcedureType, score: number) => {
    setConfidenceHistory(prev => {
      const existingIndex = prev.findIndex(r => r.procedureCode === code && !r.postScore);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], postScore: score };
        return updated;
      }
      // If no open preScore, create new
      const now = new Date();
      const dateStr = `${now.getDate()} ${['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'][now.getMonth()]} ${now.getFullYear() + 543}`;
      return [
        {
          id: `conf-${Date.now()}`,
          userId: user.id,
          procedureCode: code,
          preScore: 3, // fallback default
          postScore: score,
          timestamp: now.toISOString(),
          dateStr,
        },
        ...prev,
      ];
    });
    playAudioChime('success');
  };

  const latestPreScore = confidenceHistory.find(r => r.procedureCode === selectedProcedure)?.preScore ?? null;
  const latestPostScore = confidenceHistory.find(r => r.procedureCode === selectedProcedure)?.postScore ?? null;

  // Reflection
  const saveReflection = (data: {
    procedureCode: ProcedureType;
    strengths: string;
    uncertainties: string;
    nextImprovement: string;
    reviewTopics: string;
  }) => {
    const now = new Date();
    const dateStr = `${now.getDate()} ${['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'][now.getMonth()]} ${now.getFullYear() + 543}`;
    const newRef: ClinicalReflection = {
      id: `ref-${Date.now()}`,
      userId: user.id,
      ...data,
      timestamp: now.toISOString(),
      dateStr,
    };
    setReflections(prev => [newRef, ...prev]);

    if (user.role === 'student') {
      const newRefDetail = {
        id: newRef.id,
        topic: `${data.procedureCode}`,
        strength: data.strengths,
        challenge: data.uncertainties,
        plan: data.nextImprovement,
        date: dateStr,
        timestamp: now.toISOString(),
      };
      setManagedUsers(prevManaged => {
        const targetCode = user.studentCode?.trim();
        const targetId = user.id;
        const index = prevManaged.findIndex(
          u => (targetCode && u.code === targetCode) || u.id === targetId || (u.role === 'student' && u.name === user.name)
        );
        if (index !== -1) {
          const current = prevManaged[index];
          const allRefs = [newRefDetail, ...(current.allReflections || [])];
          const updated: ManagedUser = {
            ...current,
            reflectionCount: allRefs.length,
            latestReflection: {
              topic: newRefDetail.topic,
              strength: newRefDetail.strength,
              challenge: newRefDetail.challenge,
              plan: newRefDetail.plan,
              date: dateStr,
            },
            allReflections: allRefs,
            lastActive: 'บันทึกสะท้อนคิดจริงเมื่อสักครู่',
            isRealStudent: true,
          };
          const next = [...prevManaged];
          next[index] = updated;
          return next;
        } else {
          return prevManaged;
        }
      });
    }

    playAudioChime('success');
  };

  // SBAR
  const saveSBAR = (sbar: SBARRecord) => {
    setSbarHistory(prev => [sbar, ...prev]);
    unlockBadge('badge-sbar-practice');
    playAudioChime('success');
  };

  // User Profile
  const updateUser = (updated: Partial<UserProfile>) => {
    setUser(prev => {
      const nextUser = { ...prev, ...updated };
      if (nextUser.role === 'student') {
        syncStudentDataToManagedUsers(nextUser, {
          name: nextUser.name,
          code: nextUser.studentCode || '',
          groupOrWard: nextUser.group || 'กลุ่ม 2A (วอร์ดอายุรกรรม 4B)',
          yearOrDept: nextUser.year || 'ชั้นปีที่ 2',
          supervisingInstructor: nextUser.supervisingInstructor,
          isRealStudent: true,
          lastActive: 'แก้ไขข้อมูลโปรไฟล์เมื่อสักครู่',
        });
      }
      return nextUser;
    });
  };

  const loginAsAdmin = (info?: { name?: string; department?: string }) => {
    const updatedUser: UserProfile = {
      ...DEFAULT_ADMIN_USER,
      id: 'usr-admin-' + Date.now(),
      role: 'admin',
      name: info?.name?.trim() || DEFAULT_ADMIN_USER.name,
      department: info?.department?.trim() || DEFAULT_ADMIN_USER.department,
      registeredAt: new Date().toISOString(),
    };
    setUser(updatedUser);
    setIsAdminMode(true);
    setIsLoggedIn(true);
    setIsWelcomeGuideOpen(true);
    setActiveTab('admin');
    playAudioChime('success');
  };

  const loginAsInstructor = (info: { name: string; department?: string; instructorCode?: string }) => {
    const updatedUser: UserProfile = {
      id: 'usr-instructor-' + Date.now(),
      role: 'instructor',
      name: info.name.trim() || 'อ.ดร. นันทวัน เกียรติพยาบาล',
      department: info.department?.trim() || 'กลุ่มวิชาการพยาบาลพื้นฐานและบริหารการพยาบาล',
      instructorCode: info.instructorCode?.trim() || 'INS-4409',
      academicTitle: 'อาจารย์ผู้สอน & ผู้ประเมินคลินิก',
      year: 'อาจารย์ผู้สอน',
      group: 'อาจารย์นิเทศก์คลินิก',
      selectedLesson: 'IM',
      registeredAt: new Date().toISOString(),
    };
    setUser(updatedUser);
    setIsAdminMode(false);
    setIsLoggedIn(true);
    setIsWelcomeGuideOpen(true);
    setActiveTab('home');
    playAudioChime('success');
  };

  const loginAsStudent = (info: {
    name: string;
    studentCode?: string;
    year?: string;
    group?: string;
    selectedLesson?: ProcedureType;
    supervisingInstructor?: string;
  }) => {
    const chosenLesson = info.selectedLesson || 'IM';
    const updatedUser: UserProfile = {
      id: 'usr-student-' + Date.now(),
      role: 'student',
      name: info.name.trim() || 'นศพย. กานต์พิชชา รักษ์ดี',
      studentCode: info.studentCode?.trim() || '6501234',
      year: info.year || 'ชั้นปีที่ 2',
      group: info.group?.trim() || 'กลุ่ม 2A (วอร์ดอายุรกรรม 4B)',
      selectedLesson: chosenLesson,
      supervisingInstructor: info.supervisingInstructor?.trim() || 'อ.ดร. นันทวัน เกียรติพยาบาล',
      registeredAt: new Date().toISOString(),
    };
    setUser(updatedUser);
    setSelectedProcedure(chosenLesson);
    setIsAdminMode(false);
    setIsLoggedIn(true);
    setIsWelcomeGuideOpen(true);
    setActiveTab('home');
    playAudioChime('success');

    // Register / Sync into managed students database
    syncStudentDataToManagedUsers(updatedUser, {
      lastActive: 'เข้าสู่ระบบเมื่อสักครู่',
      isRealStudent: true,
      submissionTimestamp: new Date().toISOString(),
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
    playAudioChime('click');
  };

  const switchRole = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
    playAudioChime('click');
  };

  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  const addConfidenceRecord = (record: { procedureType: ProcedureType; preScore: number; postScore: number; notes?: string }) => {
    const now = new Date();
    const dateStr = `${now.getDate()} ${['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'][now.getMonth()]} ${now.getFullYear() + 543}`;
    const newRecord: ConfidenceRecord = {
      id: `conf-${Date.now()}`,
      userId: user.id,
      procedureCode: record.procedureType,
      preScore: record.preScore,
      postScore: record.postScore,
      notes: record.notes,
      timestamp: now.toISOString(),
      dateStr,
    };
    setConfidenceHistory(prev => {
      const nextHistory = [newRecord, ...prev];
      if (user.role === 'student') {
        const preScores = nextHistory.filter(c => c.preScore > 0);
        const postScores = nextHistory.filter(c => (c.postScore ?? 0) > 0);
        const avgPre = preScores.length > 0 ? preScores.reduce((a, b) => a + b.preScore, 0) / preScores.length : record.preScore;
        const avgPost = postScores.length > 0 ? postScores.reduce((a, b) => a + (b.postScore || 0), 0) / postScores.length : record.postScore;
        syncStudentDataToManagedUsers(user, {
          preConfidenceAvg: Number(avgPre.toFixed(1)),
          postConfidenceAvg: Number(avgPost.toFixed(1)),
          confidenceScoreAvg: Number(avgPost.toFixed(1)),
          lastActive: 'บันทึกประเมินความมั่นใจจริงเมื่อสักครู่',
          isRealStudent: true,
        });
      }
      return nextHistory;
    });
  };

  const addReflection = (item: {
    procedureType: ProcedureType;
    preConfidenceScore: number;
    postConfidenceScore: number;
    whatWentWell: string;
    whatWasChallenging: string;
    actionPlan: string;
  }) => {
    const now = new Date();
    const dateStr = `${now.getDate()} ${['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'][now.getMonth()]} ${now.getFullYear() + 543}`;
    const newRef: ClinicalReflection = {
      id: `ref-${Date.now()}`,
      userId: user.id,
      procedureCode: item.procedureType,
      procedureType: item.procedureType,
      strengths: item.whatWentWell,
      uncertainties: item.whatWasChallenging,
      nextImprovement: item.actionPlan,
      reviewTopics: '10 Rights, Anatomical landmarks, Safety verification',
      whatWentWell: item.whatWentWell,
      whatWasChallenging: item.whatWasChallenging,
      actionPlan: item.actionPlan,
      preConfidenceScore: item.preConfidenceScore,
      postConfidenceScore: item.postConfidenceScore,
      timestamp: now.toISOString(),
      dateStr,
    };
    setReflections(prev => [newRef, ...prev]);

    if (user.role === 'student') {
      const newRefDetail = {
        id: newRef.id,
        topic: `${item.procedureType}`,
        strength: item.whatWentWell,
        challenge: item.whatWasChallenging,
        plan: item.actionPlan,
        date: dateStr,
        preScore: item.preConfidenceScore,
        postScore: item.postConfidenceScore,
        timestamp: now.toISOString(),
      };
      setManagedUsers(prevManaged => {
        const targetCode = user.studentCode?.trim();
        const targetId = user.id;
        const index = prevManaged.findIndex(
          u => (targetCode && u.code === targetCode) || u.id === targetId || (u.role === 'student' && u.name === user.name)
        );
        if (index !== -1) {
          const current = prevManaged[index];
          const allRefs = [newRefDetail, ...(current.allReflections || [])];
          const updated: ManagedUser = {
            ...current,
            reflectionCount: allRefs.length,
            latestReflection: {
              topic: newRefDetail.topic,
              strength: newRefDetail.strength,
              challenge: newRefDetail.challenge,
              plan: newRefDetail.plan,
              date: dateStr,
            },
            allReflections: allRefs,
            preConfidenceAvg: Number(((current.preConfidenceAvg || 2.0) * 0.5 + item.preConfidenceScore * 0.5).toFixed(1)),
            postConfidenceAvg: Number(((current.postConfidenceAvg || 4.0) * 0.5 + item.postConfidenceScore * 0.5).toFixed(1)),
            lastActive: 'บันทึกสะท้อนคิดจริงเมื่อสักครู่',
            isRealStudent: true,
          };
          const next = [...prevManaged];
          next[index] = updated;
          return next;
        } else {
          const newStudent: ManagedUser = {
            id: user.id,
            role: 'student',
            name: user.name,
            code: user.studentCode || '6501' + Math.floor(100 + Math.random() * 900),
            yearOrDept: user.year || 'ชั้นปีที่ 2',
            groupOrWard: user.group || 'กลุ่ม 2A (วอร์ดอายุรกรรม 4B)',
            status: 'active',
            lastActive: 'บันทึกสะท้อนคิดจริงเมื่อสักครู่',
            supervisingInstructor: user.supervisingInstructor || 'อ.ดร. นันทวัน เกียรติพยาบาล',
            isRealStudent: true,
            reflectionCount: 1,
            confidenceScoreAvg: item.postConfidenceScore,
            preConfidenceAvg: item.preConfidenceScore,
            postConfidenceAvg: item.postConfidenceScore,
            procedureProgress: { IM: 50, SC: 0, ID: 0, IV: 0 },
            checklistCompleted: { IM: false, SC: false, ID: false, IV: false },
            allReflections: [newRefDetail],
            latestReflection: {
              topic: newRefDetail.topic,
              strength: newRefDetail.strength,
              challenge: newRefDetail.challenge,
              plan: newRefDetail.plan,
              date: dateStr,
            },
            submissionTimestamp: now.toISOString(),
          };
          return [newStudent, ...prevManaged];
        }
      });
    }
  };

  const deleteReflection = (id: string) => {
    setReflections(prev => prev.filter(r => r.id !== id));
  };

  const updateChecklistStep = (updated: ChecklistStep) => {
    setChecklistSteps(prev => prev.map(s => (s.id === updated.id ? updated : s)));
  };

  const updateSosContact = (id: string, updated: Partial<SOSContact>) => {
    setSosContacts(prev => prev.map(c => (c.id === id ? { ...c, ...updated } : c)));
  };

  const addChecklistStep = (newStep: ChecklistStep) => {
    setChecklistSteps(prev => [...prev, newStep]);
  };

  const deleteChecklistStep = (id: string) => {
    setChecklistSteps(prev => prev.filter(s => s.id !== id));
  };

  const updateTenRight = (updated: TenRight) => {
    setTenRights(prev => prev.map(r => (r.id === updated.id ? updated : r)));
  };

  const updateSOSContact = (updated: SOSContact) => {
    setSosContacts(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const addSosContact = (newContact: Omit<SOSContact, 'id'>) => {
    const contact: SOSContact = {
      ...newContact,
      id: `sos-${Date.now()}`,
    };
    setSosContacts(prev => [...prev, contact]);
    playAudioChime('success');
  };

  const deleteSosContact = (id: string) => {
    setSosContacts(prev => prev.filter(c => c.id !== id));
    playAudioChime('click');
  };

  // User Directory & Access Control (Admin)
  const updateManagedUserStatus = (id: string, status: 'active' | 'suspended') => {
    setManagedUsers(prev => prev.map(u => (u.id === id ? { ...u, status } : u)));
    playAudioChime('click');
  };

  const updateManagedUser = (id: string, updated: Partial<ManagedUser>) => {
    setManagedUsers(prev => prev.map(u => (u.id === id ? { ...u, ...updated } : u)));
    playAudioChime('success');
  };

  const addManagedUser = (newUser: Omit<ManagedUser, 'id' | 'lastActive'>) => {
    const created: ManagedUser = {
      ...newUser,
      id: `usr-${Date.now()}`,
      lastActive: 'เพิ่งเพิ่มเมื่อสักครู่',
    };
    setManagedUsers(prev => [created, ...prev]);
    playAudioChime('success');
  };

  const deleteManagedUser = (id: string) => {
    setManagedUsers(prev => prev.filter(u => u.id !== id));
    playAudioChime('click');
  };

  const resetManagedUserPin = (id: string): string => {
    const defaultPin = '1234';
    setManagedUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, status: 'active', lastActive: 'รีเซ็ตรหัส PIN แล้ว' } : u))
    );
    playAudioChime('success');
    return defaultPin;
  };

  const evaluateStudent = (
    studentId: string,
    grade: 'Pass' | 'Good' | 'Excellent' | 'Pending',
    feedback: string
  ) => {
    setManagedUsers(prev =>
      prev.map(u =>
        u.id === studentId
          ? {
              ...u,
              evaluationGrade: grade,
              instructorFeedback: feedback,
              lastActive: 'ประเมินโดยอาจารย์แล้ว',
            }
          : u
      )
    );
    playAudioChime('success');
  };

  // Institutional Announcements & Ward Policies (Admin)
  const addInstitutionalAnnouncement = (newAnn: Omit<InstitutionalAnnouncement, 'id' | 'effectiveDate'>) => {
    const now = new Date();
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear() + 543}`;
    const created: InstitutionalAnnouncement = {
      ...newAnn,
      id: `ann-${Date.now()}`,
      effectiveDate: dateStr,
    };
    setInstitutionalAnnouncements(prev => [created, ...prev]);
    playAudioChime('success');
  };

  const updateInstitutionalAnnouncement = (id: string, updated: Partial<InstitutionalAnnouncement>) => {
    setInstitutionalAnnouncements(prev => prev.map(a => (a.id === id ? { ...a, ...updated } : a)));
    playAudioChime('success');
  };

  const deleteInstitutionalAnnouncement = (id: string) => {
    setInstitutionalAnnouncements(prev => prev.filter(a => a.id !== id));
    playAudioChime('click');
  };

  const resetAllDataToDefault = () => {
    setChecklistSteps(DEFAULT_CHECKLIST_STEPS);
    setProcedures(PROCEDURES_DATA);
    setCheckedStepIds([]);
    setStored('checklist_steps', DEFAULT_CHECKLIST_STEPS);
    setStored('procedures', PROCEDURES_DATA);
    setStored('checked_steps', []);
    try {
      localStorage.setItem('nic_data_version', CURRENT_DATA_VERSION);
    } catch {
      // ignore
    }
    playAudioChime('success');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        loginAsAdmin,
        loginAsInstructor,
        loginAsStudent,
        logout,
        switchRole,
        activeTab,
        setActiveTab,
        reviewSubTab,
        setReviewSubTab,
        openDosageCalculator,
        selectedProcedure,
        setSelectedProcedure,
        isDarkMode,
        toggleDarkMode,
        isSOSModalOpen,
        setIsSOSModalOpen,
        isSafetyDisclaimerOpen,
        setIsSafetyDisclaimerOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isQuickReviewModalOpen,
        setIsQuickReviewModalOpen,
        isWelcomeGuideOpen,
        setIsWelcomeGuideOpen,
        searchQuery,
        setSearchQuery,
        favorites,
        toggleFavorite,
        isFavorite,
        mainTopics,
        selectedMainTopic,
        setSelectedMainTopic,
        lockedTopicModal,
        setLockedTopicModal,
        openTopic,
        procedures,
        checklistSteps,
        checkedStepIds,
        toggleChecklistStep,
        resetChecklist,
        isChecklistComplete,
        getProcedureProgress,
        safetyAlertStep,
        setSafetyAlertStep,
        confirmBypassSafetyAlert,
        confidenceHistory,
        confidenceRecords: confidenceHistory,
        latestPreScore,
        latestPostScore,
        savePreConfidence,
        savePostConfidence,
        addConfidenceRecord,
        reflections,
        saveReflection,
        addReflection,
        deleteReflection,
        sbarHistory,
        saveSBAR,
        isAdminMode,
        setIsAdminMode,
        tenRights,
        sosContacts,
        badges,
        updateUser,
        updateChecklistStep,
        addChecklistStep,
        deleteChecklistStep,
        updateTenRight,
        updateSOSContact,
        updateSosContact,
        addSosContact,
        deleteSosContact,
        managedUsers,
        updateManagedUserStatus,
        updateManagedUser,
        addManagedUser,
        deleteManagedUser,
        resetManagedUserPin,
        evaluateStudent,
        institutionalAnnouncements,
        addInstitutionalAnnouncement,
        updateInstitutionalAnnouncement,
        deleteInstitutionalAnnouncement,
        playAudioChime,
        speakText,
        stopSpeech,
        isSpeaking,
        resetAllDataToDefault,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppContextProvider = AppProvider;

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
