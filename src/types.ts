export type ProcedureType = 'IM' | 'SC' | 'ID' | 'IV';

export type MainTopicId =
  | 'vital-signs'
  | 'physical-exam'
  | 'wound-dressing'
  | 'ng-tube'
  | 'suctioning'
  | 'oxygen-therapy'
  | 'urinary-catheter'
  | 'injection';

export interface MainSkillTopicSubModule {
  id: string;
  titleTh: string;
  type: 'visual_atlas' | 'checklist' | 'sbar' | 'reflection';
  descTh: string;
  iconName?: string;
}

export interface MainSkillTopic {
  id: MainTopicId;
  code: string;
  nameTh: string;
  nameEn: string;
  descriptionTh: string;
  iconName: string;
  isUnlocked: boolean; // Only 'injection' is true
  statusBadge: string;
  targetCourse: string;
  estimatedHours: string;
  keySkills: string[];
  subModules?: MainSkillTopicSubModule[];
}

export type UserRole = 'instructor' | 'student' | 'admin';

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  studentCode?: string;
  year?: string;
  group?: string;
  selectedLesson?: ProcedureType;
  instructorCode?: string;
  department?: string;
  academicTitle?: string;
  registeredAt: string;
  supervisingInstructor?: string;
}

export interface ProcedureInfo {
  id: string;
  code: ProcedureType;
  nameTh: string;
  nameEn: string;
  definition: string;
  targetLayerTh: string;
  targetLayerEn: string;
  angle: string;
  angleDegrees: number;
  syringeTypes: string[];
  needleSpecs: string;
  maxVolumeAdult: string;
  commonSites: {
    nameTh: string;
    nameEn: string;
    landmarks: string;
    clinicalNotes: string;
    imageUrl?: string;
  }[];
  quickMnemonic5s: string;
  precautions: string[];
  aspirationNote: string;
}

export interface ChecklistStep {
  id: string;
  procedureCode: ProcedureType;
  procedureType?: ProcedureType;
  stepNumber: number;
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  isCriticalSafety: boolean;
  isSafetyAlertTrigger?: boolean;
  safetyAlertReason?: string;
  category: 'PREPARATION' | 'VERIFICATION' | 'EXECUTION' | 'POST_CARE';
  phase?: 'pre' | 'intra' | 'post';
}

export interface ConfidenceRecord {
  id: string;
  userId: string;
  procedureCode: ProcedureType;
  preScore: number;
  postScore?: number;
  timestamp: string;
  dateStr: string;
  notes?: string;
}

export interface ClinicalReflection {
  id: string;
  userId: string;
  procedureCode: ProcedureType;
  procedureType?: ProcedureType;
  strengths: string;
  uncertainties: string;
  nextImprovement: string;
  reviewTopics: string;
  whatWentWell?: string;
  whatWasChallenging?: string;
  actionPlan?: string;
  preConfidenceScore?: number;
  postConfidenceScore?: number;
  timestamp: string;
  dateStr: string;
}

export type ReflectionItem = ClinicalReflection;

export interface SBARRecord {
  id: string;
  userId?: string;
  timestamp: string;
  procedureCode?: ProcedureType;
  bedNumber?: string;
  situation: string;
  situationDetail?: string;
  medicationName?: string;
  administeredTime?: string;
  route?: string;
  backgroundInfo?: string;
  vitals?: {
    bp: string;
    hr: string;
    rr: string;
    spo2: string;
    temp: string;
  };
  clinicalFindings?: string;
  recommendation: string;
  recommendationCustom?: string;
  generatedScript: string;
}

export interface SbarScenario {
  id: string;
  title: string;
  description: string;
  situationTemplate: string;
  backgroundTemplate: string;
  assessmentTemplate: string;
  recommendationTemplate: string;
}

export interface TenRight {
  id: number;
  rightEn: string;
  rightTh: string;
  description: string;
  checkpoint: string;
  iconName: string;
}

export interface SyringeItem {
  id: string;
  size: string;
  nameTh: string;
  nameEn: string;
  subdivisions: string;
  typicalUses: string;
  colorCode: string;
  importantNote: string;
  imageUrl?: string;
}

export interface NeedleItem {
  gauge: string;
  lengthInch: string;
  hubColor: string;
  colorNameTh: string;
  typicalUseTh: string;
  recommendedFor: ProcedureType[];
  imageUrl?: string;
}

export interface SOSContact {
  id: string;
  roleTh: string;
  roleEn: string;
  name: string;
  phoneNumber: string;
  department: string;
  description: string;
}

export interface Badge {
  id: string;
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface StudentReflectionDetail {
  id: string;
  topic: string;
  strength: string;
  challenge: string;
  plan: string;
  date: string;
  preScore?: number;
  postScore?: number;
  timestamp?: string;
}

export interface ManagedUser {
  id: string;
  role: 'student' | 'instructor';
  name: string;
  code: string; // studentCode or instructorCode
  yearOrDept: string;
  groupOrWard: string;
  status: 'active' | 'suspended';
  lastActive: string;
  supervisingInstructor?: string;
  reflectionCount?: number;
  confidenceScoreAvg?: number;
  preConfidenceAvg?: number;
  postConfidenceAvg?: number;
  procedureProgress?: {
    IM: number;
    SC: number;
    ID: number;
    IV: number;
  };
  checklistCompleted?: {
    IM: boolean;
    SC: boolean;
    ID: boolean;
    IV: boolean;
  };
  latestReflection?: {
    topic: string;
    strength: string;
    challenge: string;
    plan: string;
    date: string;
  };
  allReflections?: StudentReflectionDetail[];
  instructorFeedback?: string;
  evaluationGrade?: 'Pass' | 'Good' | 'Excellent' | 'Pending';
  isRealStudent?: boolean;
  submissionTimestamp?: string;
}

export interface InstitutionalAnnouncement {
  id: string;
  title: string;
  wardName: string;
  content: string;
  effectiveDate: string;
  updatedBy: string;
  isUrgent: boolean;
  category: 'safety' | 'procedure' | 'medication';
}
