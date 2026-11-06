import {
  ProcedureInfo,
  ChecklistStep,
  TenRight,
  SyringeItem,
  NeedleItem,
  SOSContact,
  Badge,
  ConfidenceRecord,
  ClinicalReflection,
  UserProfile,
  MainSkillTopic,
  ManagedUser,
  InstitutionalAnnouncement,
} from '../types';

import ventroglutealImg from '../assets/images/ventrogluteal_landmark_1790227157609.jpg';
import deltoidImg from '../assets/images/deltoid_landmark_1790227141380.jpg';
import vastusLateralisImg from '../assets/images/vastus_lateralis_landmark_1790227167261.jpg';
import dorsoglutealImg from '../assets/images/dorsogluteal_landmark_1790227178088.jpg';
import scAbdomenImg from '../assets/images/sc_abdomen_site_1789949532605.jpg';
import idForearmImg from '../assets/images/id_forearm_site_1789949544364.jpg';

// Equipment images from user files
import syr1mlImg from '../assets/equipment/syringe_tuberculin.jpg';
import syrInsImg from '../assets/equipment/syringe_insulin.jpg';
import syr3mlImg from '../assets/equipment/syringe_3ml.png';
import syr5mlImg from '../assets/equipment/syringe_5ml.png';
import syr10mlImg from '../assets/equipment/syringe_10ml.jpg';

import needle18Img from '../assets/equipment/needle_18g.jpg';
import needle20Img from '../assets/equipment/needle_20g.jpg';
import needle21Img from '../assets/equipment/needle_21g.jpg';
import needle22Img from '../assets/equipment/needle_22g.jpg';
import needle23Img from '../assets/equipment/needle_23g.jpg';
import needle24Img from '../assets/equipment/needle_24g.jpg';
import needle25Img from '../assets/equipment/needle_25g.jpg';
import needle26Img from '../assets/equipment/needle_26g.jpg';
import needle27Img from '../assets/equipment/needle_27g.jpg';

export const MAIN_SKILL_TOPICS: MainSkillTopic[] = [
  {
    id: 'vital-signs',
    code: 'VS',
    nameTh: 'การวัดสัญญาณชีพ',
    nameEn: 'Vital Signs Assessment',
    descriptionTh: 'การประเมินอุณหภูมิกาย ชีพจร การหายใจ ความดันโลหิต และความอิ่มตัวออกซิเจนในเลือด (T, P, R, BP, SpO₂)',
    iconName: 'Activity',
    isUnlocked: false,
    statusBadge: '🔒 ปิดชั่วคราว • กำลังจัดทำเนื้อหา',
    targetCourse: 'วิชาหลักการและเทคนิคการพยาบาล',
    estimatedHours: '4 ชั่วโมง',
    keySkills: [
      'วัดอุณหภูมิร่างกาย (ปรอทแก้ว/ดิจิทัล/อินฟราเรด)',
      'คลำและนับอัตราจังหวะชีพจร (Radial / Apical)',
      'สังเกตและนับการหายใจ',
      'วัดความดันโลหิตและเลือก Cuff ที่เหมาะสม',
      'แปลผลค่าสัญญาณชีพผิดปกติ'
    ]
  },
  {
    id: 'physical-exam',
    code: 'PE',
    nameTh: 'การตรวจร่างกาย head to toe',
    nameEn: 'Head-to-Toe Physical Examination',
    descriptionTh: 'การประเมินภาวะสุขภาพและระบบต่างๆ ของร่างกายตั้งแต่ศีรษะจรดปลายเท้า ด้วยเทคนิค ดู คลำ เคาะ ฟัง',
    iconName: 'Stethoscope',
    isUnlocked: false,
    statusBadge: '🔒 ปิดชั่วคราว • กำลังจัดทำเนื้อหา',
    targetCourse: 'วิชาการประเมินภาวะสุขภาพ',
    estimatedHours: '6 ชั่วโมง',
    keySkills: [
      'การประเมินระบบประสาทและสติสัมปชัญญะ (GCS)',
      'การตรวจตา หู คอ จมูก และช่องปาก',
      'การฟังเสียงหัวใจและเสียงปอด (Breath sounds)',
      'การตรวจหน้าท้องและคลำตับม้าม',
      'การตรวจการบวมและการไหลเวียนส่วนปลาย'
    ]
  },
  {
    id: 'wound-dressing',
    code: 'WD',
    nameTh: 'การทำแผล',
    nameEn: 'Wound Dressing & Aseptic Care',
    descriptionTh: 'การทำความสะอาดแผล เทคนิคปลอดเชื้อ (Aseptic Technique) และการเลือกใช้วัสดุปิดแผลที่เหมาะสมตามชนิดแผล',
    iconName: 'Bandage',
    isUnlocked: false,
    statusBadge: '🔒 ปิดชั่วคราว • กำลังจัดทำเนื้อหา',
    targetCourse: 'วิชาหลักการและเทคนิคการพยาบาล',
    estimatedHours: '4 ชั่วโมง',
    keySkills: [
      'การเปิดชุดทำแผลและรักษาสภาพ Sterile field',
      'หลักการเช็ดแผล Clean to Dirty',
      'การทำแผลชนิด Dry dressing และ Wet dressing',
      'การเลือกใช้น้ำยาทำความสะอาดแผล (NSS vs Antiseptic)',
      'การประเมินขอบแผล ก้นแผล และสิ่งคัดหลั่ง'
    ]
  },
  {
    id: 'ng-tube',
    code: 'NG',
    nameTh: 'การใส่สายยางให้อาหารทางจมูก',
    nameEn: 'Nasogastric (NG) Tube Insertion',
    descriptionTh: 'การวัดระยะ NEX การหล่อลื่น การใส่สายผ่านโพรงจมูกเข้าสู่กระเพาะอาหาร และการทดสอบตำแหน่งสายอย่างปลอดภัย',
    iconName: 'GitCommit',
    isUnlocked: false,
    statusBadge: '🔒 ปิดชั่วคราว • กำลังจัดทำเนื้อหา',
    targetCourse: 'วิชาหลักการและเทคนิคการพยาบาล',
    estimatedHours: '3 ชั่วโมง',
    keySkills: [
      'การวัดความยาวสายตามสูตร Nose-Ear-Xiphoid (NEX)',
      'การจัดท่าผู้ป่วย High Fowler และการประสานการกลืน',
      'การทดสอบตำแหน่งสาย (ดูด Gastric content & ฟังเสียงลมที่ Epigastrium)',
      'การยึดตรึงสายป้องกันการเลื่อนหลุด',
      'การให้อาหารทางสายยางและการ Flush น้ำ'
    ]
  },
  {
    id: 'suctioning',
    code: 'SUC',
    nameTh: 'การดูดเสมหะ',
    nameEn: 'Airway Suctioning',
    descriptionTh: 'การกำจัดเสมหะในทางเดินหายใจส่วนบนและท่อช่วยหายใจด้วยเทคนิคปลอดเชื้อ พร้อมป้องกันภาวะพร่องออกซิเจน (Hypoxia)',
    iconName: 'Wind',
    isUnlocked: false,
    statusBadge: '🔒 ปิดชั่วคราว • กำลังจัดทำเนื้อหา',
    targetCourse: 'วิชาหลักการและเทคนิคการพยาบาล',
    estimatedHours: '3 ชั่วโมง',
    keySkills: [
      'การปรับตั้งแรงดันลบ (Suction pressure) อย่างถูกต้อง',
      'การสวมถุงมือ Sterile และรักษาสภาพปราศจากเชื้อ',
      'การจำกัดระยะเวลาดูดเสมหะไม่เกิน 10-15 วินาทีต่อครั้ง',
      'การให้ออกซิเจนเสริม (Hyperoxygenation) ก่อนและหลังทำ',
      'การประเมินลักษณะ สี กลิ่น และปริมาณเสมหะ'
    ]
  },
  {
    id: 'oxygen-therapy',
    code: 'O2',
    nameTh: 'การให้ออกซิเจน',
    nameEn: 'Oxygen Therapy & Respiratory Care',
    descriptionTh: 'การบำบัดด้วยออกซิเจนผ่าน Nasal Cannula, Face Mask, Mask with Reservoir และการเฝ้าระวังความปลอดภัยจากไฟไหม้',
    iconName: 'Flame',
    isUnlocked: false,
    statusBadge: '🔒 ปิดชั่วคราว • กำลังจัดทำเนื้อหา',
    targetCourse: 'วิชาหลักการและเทคนิคการพยาบาล',
    estimatedHours: '2 ชั่วโมง',
    keySkills: [
      'การเลือกใช้อุปกรณ์ให้ออกซิเจนตามความต้องการของผู้ป่วย',
      'การต่อและควบคุมกระบอกเพิ่มความชื้น (Humidifier bottle)',
      'การปรับอัตราการไหล (Flow rate L/min) ตามคำสั่งแพทย์',
      'การป้องกันการกดทับผิวหนังบริเวณใบหูและโพรงจมูก',
      'ข้อควรระวังเรื่องประกายไฟและการสูบบุหรี่'
    ]
  },
  {
    id: 'urinary-catheter',
    code: 'UC',
    nameTh: 'การใส่สายสวนปัสสาวะ',
    nameEn: 'Urinary Catheterization',
    descriptionTh: 'การใส่สายสวนปัสสาวะชนิดชั่วคราวและค้างสายด้วยเทคนิคปลอดเชื้อเคร่งครัด เพื่อป้องกันการติดเชื้อ CAUTI',
    iconName: 'Droplet',
    isUnlocked: false,
    statusBadge: '🔒 ปิดชั่วคราว • กำลังจัดทำเนื้อหา',
    targetCourse: 'วิชาหลักการและเทคนิคการพยาบาล',
    estimatedHours: '4 ชั่วโมง',
    keySkills: [
      'การทำความสะอาดอวัยวะสืบพันธุ์ภายนอก (Perineal care)',
      'เทคนิคการใส่สายสวนปัสสาวะในผู้ป่วยเพศหญิงและเพศชาย',
      'การใส่ Sterile water โบลว์บอลลูนอย่างถูกปริมาตร',
      'การต่อถุงปัสสาวะระบบปิด (Closed drainage system)',
      'แนวทางการป้องกันการติดเชื้อในระบบทางเดินปัสสาวะ (CAUTI Bundle)'
    ]
  },
  {
    id: 'injection',
    code: 'INJ',
    nameTh: 'การฉีดยา',
    nameEn: 'Medication Injections (IM, SC, ID, IV)',
    descriptionTh: 'การบริหารยาด้วยการฉีดเข้าสู่ร่างกายอย่างปลอดภัย: เข้ากล้ามเนื้อ (IM), ใต้ผิวหนัง (SC), ในชั้นผิวหนัง (ID), และเข้าหลอดเลือดดำ (IV)',
    iconName: 'Syringe',
    isUnlocked: true,
    statusBadge: '🟢 เปิดใช้งาน • เข้าเรียนรู้ได้ทันที',
    targetCourse: 'วิชาหลักการและเทคนิคการพยาบาล (ปี 2)',
    estimatedHours: '8 ชั่วโมง',
    keySkills: [
      'การคำนวณและเตรียมยาตามหลัก 10 Rights',
      'กายวิภาคและมุมแทงเข็ม (90°, 45°, 10-15°, 15-30°)',
      'การหาตำแหน่ง Landmark ทางคลินิก (Deltoid, Ventrogluteal, Abdomen, Forearm)',
      'การเลือกใช้กระบอกยาและเบอร์เข็มตามชนิดยาและดัชนีมวลกาย',
      'การเฝ้าระวังภาวะแทรกซ้อนและการปฏิบัติตามแนวทางความปลอดภัย'
    ],
    subModules: [
      {
        id: 'inj-visual-atlas',
        titleTh: 'สมุดภาพการเรียนรู้ (Visual Learning Atlas)',
        type: 'visual_atlas',
        descTh: 'แผนภาพกายวิภาคชั้นผิวหนัง, มุมการแทงเข็ม 90° 45° 10-15° 15-30°, ขนาดกระบอกยาและเบอร์เข็ม, ภาพจุด Landmark ทางคลินิก, หลัก 10 Rights, และข้อควรระวังตาม EBP',
        iconName: 'BookOpen'
      },
      {
        id: 'inj-checklist',
        titleTh: 'ตารางประเมินทักษะ (Skill Checklist)',
        type: 'checklist',
        descTh: 'ขั้นตอนการปฏิบัติทีละสเต็ป พร้อมระบบแจ้งเตือน Safety Alert เมื่อมีข้อควรระวังสำคัญทางคลินิก',
        iconName: 'CheckSquare'
      },
      {
        id: 'inj-sbar',
        titleTh: 'การสื่อสารส่งต่อทางคลินิก (SBAR Simulation)',
        type: 'sbar',
        descTh: 'จำลองการรายงานแพทย์และพยาบาลพี่เลี้ยงตามโครงสร้าง Situation-Background-Assessment-Recommendation',
        iconName: 'MessageSquare'
      },
      {
        id: 'inj-reflection',
        titleTh: 'ประเมินความมั่นใจและสะท้อนคิด (Confidence & Reflection)',
        type: 'reflection',
        descTh: 'ระบบประเมินความมั่นใจ Pre/Post Score และบันทึกสะท้อนคิดเพื่อการพัฒนาทักษะต่อเนื่อง',
        iconName: 'Sparkles'
      }
    ]
  }
];

export const DEFAULT_STUDENT_USER: UserProfile = {
  id: 'usr-student-01',
  role: 'student',
  studentCode: '6501234',
  name: 'นศพย. กานต์พิชชา รักษ์ดี',
  year: 'ชั้นปีที่ 2',
  group: 'กลุ่ม 2A (วอร์ดอายุรกรรม 4B)',
  selectedLesson: 'IM',
  supervisingInstructor: 'อ.ดร. นันทวัน เกียรติพยาบาล',
  registeredAt: '2026-09-15T08:30:00Z',
};

export const DEFAULT_INSTRUCTOR_USER: UserProfile = {
  id: 'usr-instructor-01',
  role: 'instructor',
  instructorCode: 'INS-4409',
  name: 'อ.ดร. นันทวัน เกียรติพยาบาล',
  department: 'กลุ่มวิชาการพยาบาลพื้นฐานและบริหารการพยาบาล',
  academicTitle: 'อาจารย์ผู้สอน & ผู้ประเมินคลินิก',
  year: 'อาจารย์ผู้สอน',
  group: 'ผู้ประเมินคลินิก (วอร์ดอายุรกรรม 4B)',
  registeredAt: '2026-09-15T08:00:00Z',
};

export const DEFAULT_ADMIN_USER: UserProfile = {
  id: 'usr-admin-01',
  role: 'admin',
  instructorCode: 'ADM-001',
  name: 'ดร.พว. วราภรณ์ สุขเกษม (Admin)',
  department: 'ศูนย์สนับสนุนการศึกษาและบริหารจัดการคลินิก BCNR',
  academicTitle: 'ผู้ดูแลระบบส่วนกลาง (System Administrator)',
  year: 'ผู้ดูแลระบบ',
  group: 'ส่วนกลาง (Central Admin)',
  registeredAt: '2026-09-01T08:00:00Z',
};

export const DEFAULT_MANAGED_USERS: ManagedUser[] = [
  {
    id: 'usr-stud-1',
    role: 'student',
    name: 'นศพย. กานต์พิชชา รักษ์ดี',
    code: '6501234',
    yearOrDept: 'ชั้นปีที่ 2',
    groupOrWard: 'กลุ่ม 2A (วอร์ดอายุรกรรม 4B)',
    status: 'active',
    lastActive: 'วันนี้ 10:30',
    supervisingInstructor: 'อ.ดร. นันทวัน เกียรติพยาบาล',
    reflectionCount: 3,
    confidenceScoreAvg: 4.5,
    preConfidenceAvg: 2.3,
    postConfidenceAvg: 4.7,
    isRealStudent: true,
    submissionTimestamp: '2026-10-05T03:30:00Z',
    procedureProgress: {
      IM: 100,
      SC: 85,
      ID: 100,
      IV: 80,
    },
    checklistCompleted: {
      IM: true,
      SC: true,
      ID: true,
      IV: false,
    },
    latestReflection: {
      topic: 'IM (Ventrogluteal)',
      strength: 'คลำ Landmark สันปีกสะโพก (ASIS & Iliac crest) ได้แม่นยำ ผู้ป่วยไม่เจ็บ',
      challenge: 'การบริหารความเร็ว 10 วิ/mL ให้สม่ำเสมอ',
      plan: 'ฝึกนับจังหวะการเดินยาในใจให้คงที่',
      date: 'วันนี้ 10:20',
    },
    allReflections: [
      {
        id: 'ref-101',
        topic: 'IM (Ventrogluteal สะโพก)',
        strength: 'คลำ Landmark สันปีกสะโพก (ASIS & Iliac crest) ได้แม่นยำ ผู้ป่วยไม่เจ็บ',
        challenge: 'การบริหารความเร็ว 10 วิ/mL ให้สม่ำเสมอ',
        plan: 'ฝึกนับจังหวะการเดินยาในใจให้คงที่',
        date: 'วันนี้ 10:20',
        preScore: 2,
        postScore: 5,
      },
      {
        id: 'ref-102',
        topic: 'ID (Mantoux Test ในผิวหนัง)',
        strength: 'Bevel up 10-15 องศา เกิด Wheal ใสขนาด 8 mm',
        challenge: 'การทรงตัวเข็มเบอร์ 27G ขณะฉีด',
        plan: 'จับนิ้วนางค้ำแขนผู้ป่วยให้มั่นคง',
        date: 'เมื่อวานนี้',
        preScore: 3,
        postScore: 4,
      },
      {
        id: 'ref-103',
        topic: 'SC (Insulin หน้าท้อง)',
        strength: 'เว้นระยะห่างจากสะดือ 2 นิ้วมือ และเปลี่ยนตำแหน่งฉีด',
        challenge: 'การเลือกมุม 45 vs 90 องศาตามชั้นไขมัน',
        plan: 'ประเมินความหนาของ Subcutaneous tissue ทุกครั้ง',
        date: '3 วันที่แล้ว',
        preScore: 2,
        postScore: 5,
      },
    ],
    instructorFeedback: 'ทำได้ดีมาก ความมั่นใจเพิ่มขึ้นชัดเจน ระมัดระวังเรื่องการทวนสอบ 2 Identifiers ให้ครบทุกรอบ',
    evaluationGrade: 'Excellent',
  },
  {
    id: 'usr-stud-2',
    role: 'student',
    name: 'นศพย. ธนกฤต มั่นคง',
    code: '6501235',
    yearOrDept: 'ชั้นปีที่ 2',
    groupOrWard: 'กลุ่ม 2A (วอร์ดอายุรกรรม 4B)',
    status: 'active',
    lastActive: 'เมื่อวานนี้ 15:40',
    supervisingInstructor: 'อ.ดร. นันทวัน เกียรติพยาบาล',
    reflectionCount: 2,
    confidenceScoreAvg: 4.2,
    preConfidenceAvg: 2.0,
    postConfidenceAvg: 4.2,
    procedureProgress: {
      IM: 80,
      SC: 100,
      ID: 75,
      IV: 60,
    },
    checklistCompleted: {
      IM: true,
      SC: true,
      ID: false,
      IV: false,
    },
    latestReflection: {
      topic: 'SC (Insulin หน้าท้อง)',
      strength: 'จำแนกขีดกระบอกยา Insulin U-100 ฝาส้มได้ถูกต้อง ไม่นวดคลึงหลังฉีด',
      challenge: 'การจับจีบผิวหนัง (Pinch) ในผู้ป่วยสูงอายุที่ผิวบาง',
      plan: 'ปรับมุม 45 องศาเมื่อเนื้อเยื่อไขมันน้อย',
      date: 'เมื่อวานนี้ 15:30',
    },
    allReflections: [
      {
        id: 'ref-201',
        topic: 'SC (Insulin หน้าท้อง)',
        strength: 'จำแนกขีดกระบอกยา Insulin U-100 ฝาส้มได้ถูกต้อง ไม่นวดคลึงหลังฉีด',
        challenge: 'การจับจีบผิวหนัง (Pinch) ในผู้ป่วยสูงอายุที่ผิวบาง',
        plan: 'ปรับมุม 45 องศาเมื่อเนื้อเยื่อไขมันน้อย',
        date: 'เมื่อวานนี้ 15:30',
        preScore: 2,
        postScore: 4,
      },
      {
        id: 'ref-202',
        topic: 'IM (Deltoid ต้นแขน)',
        strength: 'วัดตำแหน่ง 2-3 นิ้วมือใต้ Acromion ได้แม่นยำ',
        challenge: 'ปริมาตรยาห้ามเกิน 1 mL',
        plan: 'ตรวจสอบปริมาตรยาและเปลี่ยนตำแหน่งหากเกินเกณฑ์',
        date: '2 วันที่แล้ว',
        preScore: 2,
        postScore: 4,
      },
    ],
    instructorFeedback: 'เทคนิค Aseptic ดีมาก เพิ่มความคล่องตัวในการผสมยาปฏิชีวนะ',
    evaluationGrade: 'Good',
  },
  {
    id: 'usr-stud-3',
    role: 'student',
    name: 'นศพย. ปรียาภรณ์ แสงสุวรรณ',
    code: '6501236',
    yearOrDept: 'ชั้นปีที่ 2',
    groupOrWard: 'กลุ่ม 2A (วอร์ดอายุรกรรม 4B)',
    status: 'active',
    lastActive: '3 วันที่แล้ว',
    supervisingInstructor: 'อ.ดร. นันทวัน เกียรติพยาบาล',
    reflectionCount: 2,
    confidenceScoreAvg: 3.9,
    preConfidenceAvg: 1.8,
    postConfidenceAvg: 3.9,
    procedureProgress: {
      IM: 90,
      SC: 70,
      ID: 95,
      IV: 50,
    },
    checklistCompleted: {
      IM: true,
      SC: false,
      ID: true,
      IV: false,
    },
    latestReflection: {
      topic: 'ID (Mantoux Test)',
      strength: 'Bevel up ทำมุม 10-15 องศา ได้ Wheal นูนใสขนาด 8 มม. ชัดเจน',
      challenge: 'ตอนแรกเกือบเผลอนำสำลีกดทับตุ่มนูน',
      plan: 'เตือนสติตนเองและอธิบายผู้ป่วยห้ามถูเกา',
      date: '3 วันที่แล้ว',
    },
    instructorFeedback: 'เทคนิค ID ยอดเยี่ยม ควรฝึกทบทวนการเลือกขนาดสายน้ำเกลือ IV เพิ่มเติม',
    evaluationGrade: 'Pass',
  },
  {
    id: 'usr-stud-4',
    role: 'student',
    name: 'นศพย. อภิสิทธิ์ วรรณรัตน์',
    code: '6501237',
    yearOrDept: 'ชั้นปีที่ 2',
    groupOrWard: 'กลุ่ม 2A (วอร์ดอายุรกรรม 4B)',
    status: 'active',
    lastActive: 'วันนี้ 08:50',
    supervisingInstructor: 'อ.ดร. นันทวัน เกียรติพยาบาล',
    reflectionCount: 1,
    confidenceScoreAvg: 3.5,
    preConfidenceAvg: 1.5,
    postConfidenceAvg: 3.5,
    procedureProgress: {
      IM: 75,
      SC: 60,
      ID: 50,
      IV: 40,
    },
    checklistCompleted: {
      IM: false,
      SC: false,
      ID: false,
      IV: false,
    },
    latestReflection: {
      topic: 'IM (Deltoid)',
      strength: 'ตรวจสอบ 10 Rights ครบ 3 รอบก่อนฉีดยา',
      challenge: 'การคลำตำแหน่ง Acromion process ต่ำลงมา 2-3 นิ้วมือ',
      plan: 'ทบทวนตำแหน่งกายวิภาคกับหุ่นจำลองก่อนขึ้นฝึกจริง',
      date: 'วันนี้ 08:45',
    },
    instructorFeedback: 'เน้นย้ำความนิ่งของมือและทวนสอบความดันโลหิตก่อนให้ยาแก้ปวด',
    evaluationGrade: 'Pending',
  },
  {
    id: 'usr-stud-5',
    role: 'student',
    name: 'นศพย. วรินทร ศรีสวัสดิ์',
    code: '6501238',
    yearOrDept: 'ชั้นปีที่ 2',
    groupOrWard: 'กลุ่ม 2B (วอร์ดศัลยกรรม 5A)',
    status: 'active',
    lastActive: 'เมื่อวานนี้',
    supervisingInstructor: 'อ.พย. พิมพ์ใจ สุริยะวงศ์',
    reflectionCount: 3,
    confidenceScoreAvg: 4.4,
    preConfidenceAvg: 2.2,
    postConfidenceAvg: 4.5,
    procedureProgress: {
      IM: 100,
      SC: 90,
      ID: 80,
      IV: 85,
    },
    checklistCompleted: {
      IM: true,
      SC: true,
      ID: true,
      IV: true,
    },
    latestReflection: {
      topic: 'IV Flush & Push',
      strength: 'Flush NSS ทดสอบ Phlebitis และไม่มีแรงต้าน',
      challenge: 'การเปิด clamp สายน้ำเกลือให้หยดตามเรท',
      plan: 'คำนวณ Drop rate ให้แม่นยำ',
      date: 'เมื่อวานนี้',
    },
    instructorFeedback: 'ผ่านเกณฑ์สมรรถนะครบ 4 หัตถการแล้ว มีความมั่นใจสูง',
    evaluationGrade: 'Excellent',
  },
  {
    id: 'usr-stud-6',
    role: 'student',
    name: 'นศพย. ชนนิกานต์ เกษมสุข',
    code: '6501239',
    yearOrDept: 'ชั้นปีที่ 2',
    groupOrWard: 'กลุ่ม 2B (วอร์ดศัลยกรรม 5A)',
    status: 'active',
    lastActive: '2 วันที่แล้ว',
    supervisingInstructor: 'อ.พย. พิมพ์ใจ สุริยะวงศ์',
    reflectionCount: 2,
    confidenceScoreAvg: 4.0,
    preConfidenceAvg: 2.0,
    postConfidenceAvg: 4.0,
    procedureProgress: {
      IM: 85,
      SC: 80,
      ID: 70,
      IV: 75,
    },
    checklistCompleted: {
      IM: true,
      SC: true,
      ID: false,
      IV: false,
    },
    latestReflection: {
      topic: 'IM (Vastus Lateralis ต้นขา)',
      strength: 'แบ่งหน้าขาเป็น 3 ส่วนตามยาวและขวาง ฉีดส่วนกลางด้านนอก',
      challenge: 'ผู้ป่วยมีอาการเกร็งกล้ามเนื้อ',
      plan: 'บอกให้ผู้ป่วยงอเข่าเล็กน้อยเพื่อผ่อนคลายกล้ามเนื้อ',
      date: '2 วันที่แล้ว',
    },
    instructorFeedback: 'มีมนุษยสัมพันธ์ดี สามารถให้กำลังใจผู้ป่วยได้ยอดเยี่ยม',
    evaluationGrade: 'Good',
  },
  {
    id: 'usr-stud-7',
    role: 'student',
    name: 'นศพย. ญาณิศา วงศ์วิจิตร',
    code: '6501240',
    yearOrDept: 'ชั้นปีที่ 2',
    groupOrWard: 'กลุ่ม 2C (วอร์ดสูติ-นรีเวชกรรม 3C)',
    status: 'active',
    lastActive: 'วันนี้ 11:15',
    supervisingInstructor: 'ผศ.ดร. นิตยา พงษ์ศิริ',
    reflectionCount: 3,
    confidenceScoreAvg: 4.6,
    preConfidenceAvg: 2.5,
    postConfidenceAvg: 4.8,
    isRealStudent: true,
    submissionTimestamp: '2026-10-05T04:15:00Z',
    procedureProgress: {
      IM: 95,
      SC: 90,
      ID: 85,
      IV: 90,
    },
    checklistCompleted: {
      IM: true,
      SC: true,
      ID: true,
      IV: true,
    },
    latestReflection: {
      topic: 'SC (Anticoagulant Enoxaparin)',
      strength: 'ฉีดบริเวณผนังหน้าท้องส่วนล่าง ไม่ไล่ฟองอากาศในเข็ม Prefilled syringe',
      challenge: 'การระวังการเกิดรอยช้ำ Hematoma',
      plan: 'กดเบาๆ ด้วยกอซแห้งหลังฉีด ห้ามถูหรือนวดคลึงเด็ดขาด',
      date: 'วันนี้ 11:10',
    },
    instructorFeedback: 'แม่นยำในหลักการยา Anticoagulant และเทคนิคการสื่อสารกับมารดาหลังคลอดดีมาก',
    evaluationGrade: 'Excellent',
  },
  {
    id: 'usr-stud-8',
    role: 'student',
    name: 'นศพย. ภัทรดนัย บุญเรือง',
    code: '6501241',
    yearOrDept: 'ชั้นปีที่ 2',
    groupOrWard: 'กลุ่ม 2D (วอร์ดกุมารเวชกรรม 6B)',
    status: 'active',
    lastActive: 'เมื่อวานนี้ 14:20',
    supervisingInstructor: 'อ.ดร. ศิริพร กอบกุล',
    reflectionCount: 2,
    confidenceScoreAvg: 4.1,
    preConfidenceAvg: 1.9,
    postConfidenceAvg: 4.1,
    procedureProgress: {
      IM: 80,
      SC: 75,
      ID: 80,
      IV: 65,
    },
    checklistCompleted: {
      IM: true,
      SC: false,
      ID: true,
      IV: false,
    },
    latestReflection: {
      topic: 'IM (Vastus Lateralis ในเด็ก)',
      strength: 'เลือกตำแหน่ง Vastus Lateralis ถูกต้องตามหลักกุมารเวชศาสตร์',
      challenge: 'การจัดท่า Immobilize เด็กขณะแทงเข็ม',
      plan: 'ประสานงานกับพี่พยาบาลและผู้ปกครองช่วยจับอย่างนุ่มนวล',
      date: 'เมื่อวานนี้ 14:10',
    },
    instructorFeedback: 'คำนวณขนาดยาตามน้ำหนักตัวเด็กได้ถูกต้องแม่นยำ พัฒนาทักษะการปลอบโยนเด็กได้ดี',
    evaluationGrade: 'Good',
  },
  {
    id: 'usr-inst-1',
    role: 'instructor',
    name: 'อ.ดร. นันทวัน เกียรติพยาบาล',
    code: 'INS-4409',
    yearOrDept: 'กลุ่มวิชาการพยาบาลพื้นฐานและบริหารการพยาบาล',
    groupOrWard: 'อาจารย์นิเทศก์หลัก (วอร์ดอายุรกรรม 4B)',
    status: 'active',
    lastActive: 'วันนี้ 09:15',
  },
  {
    id: 'usr-inst-2',
    role: 'instructor',
    name: 'อ.พย. พิมพ์ใจ สุริยะวงศ์',
    code: 'INS-4412',
    yearOrDept: 'ภาควิชาการพยาบาลพื้นฐาน',
    groupOrWard: 'อาจารย์นิเทศก์วอร์ดศัลยกรรม 5A',
    status: 'active',
    lastActive: 'เมื่อวานนี้ 16:20',
  },
  {
    id: 'usr-inst-3',
    role: 'instructor',
    name: 'พว. นงลักษณ์ สุขสวัสดิ์ (Preceptor)',
    code: 'PRE-201',
    yearOrDept: 'หอผู้ป่วยอายุรกรรมหญิง 4B',
    groupOrWard: 'พยาบาลพี่เลี้ยงคลินิก',
    status: 'active',
    lastActive: 'วันนี้ 11:00',
  },
];

export const DEFAULT_INSTITUTIONAL_ANNOUNCEMENTS: InstitutionalAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'แนวปฏิบัติความปลอดภัยการฉีดยาและการระบุตัวตนผู้ป่วยประจำหอผู้ป่วย (2 Identifiers & 10 Rights)',
    wardName: 'ทุกหอผู้ป่วยในและคลินิกปฏิบัติการพยาบาล BCNR',
    content: '1. ตรวจสอบบัตรประจำตัวผู้ป่วยและแถบข้อมือด้วย 2 ตัวบ่งชี้ (ชื่อ-สกุล และ HN) เสมอ\n2. ต้องทวนสอบคำสั่งยากับ MAR อย่างน้อย 3 ครั้งก่อนบริหารยา\n3. การบริหารยา High Alert Drugs (HAD) เช่น Insulin, Heparin, KCL ต้องมีพยาบาลวิชาชีพ Double Check ร่วมทุกครั้งก่อนฉีด',
    effectiveDate: 'ปีการศึกษา 2568 - ปัจจุบัน',
    updatedBy: 'ผู้ดูแลระบบส่วนกลาง BCNR (Admin)',
    isUrgent: true,
    category: 'safety',
  },
  {
    id: 'ann-2',
    title: 'ระเบียบปฏิบัติเมื่อเกิดอุบัติการณ์เข็มทิ่มตำ (Needle Stick Injury - NSI Protocol)',
    wardName: 'ศูนย์ความปลอดภัยและควบคุมการติดเชื้อ (IC)',
    content: '1. บีบไล่เลือดบริเวณแผลใต้สายน้ำไหลผ่านทันที ล้างด้วยสบู่หรือน้ำยาฆ่าเชื้อนานอย่างน้อย 5 นาที\n2. ห้ามบีบเค้นแผลแรงเกินไป\n3. รายงานพยาบาลพี่เลี้ยงและอาจารย์นิเทศก์ทันที พร้อมนำตัวอย่างเลือดผู้ป่วยตรวจและพบแพทย์ตรวจประเมินรับยา PEP ภายใน 2 ชั่วโมง',
    effectiveDate: '1 กันยายน 2568',
    updatedBy: 'ผู้ดูแลระบบส่วนกลาง BCNR (Admin)',
    isUrgent: true,
    category: 'safety',
  },
  {
    id: 'ann-3',
    title: 'ข้อกำหนดเทคนิค Aspiration และมุมเข็มตามหลักฐานเชิงประจักษ์ (Evidence-Based Clinical Update)',
    wardName: 'หอผู้ป่วยอายุรกรรมและศัลยกรรม',
    content: 'การฉีดยาเข้ากล้ามเนื้อ (IM) ตำแหน่ง Deltoid และ Ventrogluteal สำหรับวัคซีนไม่แนะนำให้ดูดย้อน (Aspiration) แต่สำหรับการฉีดยาปฏิชีวนะหรือยาที่มีความหนืดสูงให้ปฏิบัติตามคำแนะนำของยาแต่ละรายการและการประเมินของพยาบาลพี่เลี้ยง',
    effectiveDate: '15 สิงหาคม 2568',
    updatedBy: 'ผู้ดูแลระบบส่วนกลาง BCNR (Admin)',
    isUrgent: false,
    category: 'procedure',
  },
];

export const DEFAULT_USER: UserProfile = DEFAULT_STUDENT_USER;

export const PROCEDURES_DATA: ProcedureInfo[] = [
  {
    id: 'proc-im',
    code: 'IM',
    nameTh: 'การฉีดยาเข้ากล้ามเนื้อ',
    nameEn: 'Intramuscular Injection (IM)',
    definition: 'การบริหารยาเข้าสู่ชั้นเนื้อเยื่อกล้ามเนื้อลึก ยาจะถูกดูดซึมได้รวดเร็วกว่าชั้นใต้ผิวหนังเนื่องจากมีหลอดเลือดมาเลี้ยงมาก',
    targetLayerTh: 'ชั้นกล้ามเนื้อ (Muscle Layer)',
    targetLayerEn: 'Muscle Layer',
    angle: '90 องศา',
    angleDegrees: 90,
    syringeTypes: ['3 mL', '5 mL'],
    needleSpecs: 'เบอร์ 21G - 23G (ยาว 1 - 1.5 นิ้ว)',
    maxVolumeAdult: 'กล้ามเนื้อ Deltoid ≤ 1-2 mL, Ventrogluteal ≤ 3-4 mL, Vastus lateralis ≤ 2-3 mL',
    commonSites: [
      {
        nameTh: 'กล้ามเนื้อสะโพกส่วนหน้าด้านข้าง (Ventrogluteal)',
        nameEn: 'Ventrogluteal site',
        landmarks: 'วางฝ่ามือบน Greater trochanter นิ้วชี้ชี้ไปที่ Anterior superior iliac spine (ASIS) นิ้วกลางกางไปทาง Iliac crest ฉีดตรงกลางรูปตัว V',
        clinicalNotes: 'ตำแหน่งที่ปลอดภัยที่สุด ปราศจากเส้นประสาทและหลอดเลือดขนาดใหญ่ แนะนำเป็น First Choice ในผู้ใหญ่',
        imageUrl: ventroglutealImg,
      },
      {
        nameTh: 'กล้ามเนื้อต้นแขนด้านข้าง (Deltoid)',
        nameEn: 'Deltoid muscle',
        landmarks: 'ต่ำกว่าปุ่ม Acromion process ประมาณ 2-3 นิ้วมือ (3-5 ซม.) บริเวณกึ่งกลางกล้ามเนื้อสามเหลี่ยม',
        clinicalNotes: 'เหมาะสำหรับยาปริมาตรน้อย (ไม่เกิน 1-2 mL) เช่น วัคซีน ไม่ควรฉีดหากกล้ามเนื้อลีบเล็ก',
        imageUrl: deltoidImg,
      },
      {
        nameTh: 'กล้ามเนื้อต้นขาด้านหน้าและด้านนอก (Vastus lateralis)',
        nameEn: 'Vastus lateralis site',
        landmarks: 'แบ่งความยาวระหว่าง Greater trochanter ถึง Lateral femoral condyle เป็น 3 ส่วนเท่าๆ กัน ฉีดส่วน 1/3 ตรงกลาง ด้านหน้าค่อนไปทางข้าง',
        clinicalNotes: 'เป็นตำแหน่งที่พัฒนาดี ปลอดภัย เหมาะทั้งในเด็กและผู้ใหญ่',
        imageUrl: vastusLateralisImg,
      },
      {
        nameTh: 'กล้ามเนื้อสะโพกด้านหลัง (Dorsogluteal) - ข้อควรระวังสูง',
        nameEn: 'Dorsogluteal site (Use with caution)',
        landmarks: 'แบ่งแก้มก้นเป็น 4 ส่วน ฉีด Quadrant บนด้านนอก (Upper outer quadrant)',
        clinicalNotes: 'ปัจจุบันมีคำแนะนำให้หลีกเลี่ยงหากเลือกตำแหน่งอื่นได้ เนื่องจากเสี่ยงต่อการโดน Sciatic nerve และ Superior gluteal artery',
        imageUrl: dorsoglutealImg,
      }
    ],
    quickMnemonic5s: 'แทงมุม 90° ตั้งฉาก มั่นคง ดึงผิวตึงหรือใช้ Z-track ปล่อยยาช้าๆ 10 วินาที/1 mL',
    precautions: [
      'ประเมินมวลกล้ามเนื้อและปริมาตรยาอย่างรอบคอบ ไม่ฉีดเกินขีดจำกัดของตำแหน่งนั้น',
      'หลีกเลี่ยงบริเวณที่มีรอยช้ำ อักเสบ บวม แข็งตัว หรือมีแผลเป็น',
      'เทคนิค Z-track แนะนำสำหรับยาที่ระคายเคืองสูง เช่น ธาตุเหล็ก เพื่อป้องกันการซึมย้อนกลับสู่ชั้นใต้ผิวหนัง',
      'เข็มต้องยาวพอที่จะทะลุชั้นไขมันลงสู่กล้ามเนื้ออย่างแท้จริง'
    ],
    aspirationNote: 'การ aspirate ให้ปฏิบัติตามแนวทางของยา/สถาบันที่ใช้ในการเรียนการสอน (เช่น องค์การอนามัยโลก (WHO) และ CDC ไม่แนะนำให้ aspirate ในการฉีดวัคซีนทั่วไป แต่ยาบางกลุ่มหรือบางสถาบันอาจยังมี protocol แนะนำ)'
  },
  {
    id: 'proc-sc',
    code: 'SC',
    nameTh: 'การฉีดยาเข้าใต้ผิวหนัง',
    nameEn: 'Subcutaneous Injection (SC/SQ)',
    definition: 'การบริหารยาเข้าสู่ชั้นเนื้อเยื่อไขมันใต้ผิวหนัง การดูดซึมช้าและสม่ำเสมอ เหมาะสำหรับยาเช่น Insulin, Heparin',
    targetLayerTh: 'ชั้นไขมันใต้ผิวหนัง (Subcutaneous Tissue)',
    targetLayerEn: 'Subcutaneous Tissue / Adipose Tissue',
    angle: '45 - 90 องศา',
    angleDegrees: 45,
    syringeTypes: ['1 mL (Tuberculin)', 'Insulin syringe U-100'],
    needleSpecs: 'เบอร์ 25G - 27G (ยาว 3/8 - 5/8 นิ้ว)',
    maxVolumeAdult: 'ปริมาตรไม่เกิน 0.5 - 1.5 mL',
    commonSites: [
      {
        nameTh: 'หน้าท้อง (Abdomen)',
        nameEn: 'Abdomen',
        landmarks: 'บริเวณรอบสะดือ ห่างจากขอบสะดืออย่างน้อย 2 นิ้ว (5 ซม.) หลีกเลี่ยงบริเวณเข็มขัด',
        clinicalNotes: 'ดูดซึมได้เร็วและสม่ำเสมอที่สุด เหมาะสำหรับการฉีด Insulin และ LMWH (Enoxaparin)',
        imageUrl: scAbdomenImg,
      },
      {
        nameTh: 'ด้านหลังของต้นแขน (Posterior upper arm)',
        nameEn: 'Outer posterior aspect of upper arm',
        landmarks: 'ส่วนกึ่งกลาง 1/3 ของด้านหลังต้นแขน',
        clinicalNotes: 'ใช้บ่อยสำหรับวัคซีนป้องกันหัด (Measles), MMR'
      },
      {
        nameTh: 'ต้นขาด้านหน้า (Anterior thigh)',
        nameEn: 'Anterior aspect of thighs',
        landmarks: 'บริเวณกึ่งกลางของหน้าขา ระหว่างข้อสะโพกและหัวเข่า',
        clinicalNotes: 'ผู้ป่วยสามารถฉีดด้วยตนเองได้ง่าย ดูดซึมช้ากว่าหน้าท้องเล็กน้อย'
      }
    ],
    quickMnemonic5s: 'จับจีบผิวหนังขึ้น (Pinch) แทง 45° (หรือ 90° หากใช้เข็มสั้น/คนรูปร่างท้วม) ไม่นวดคลึงหลังฉีด Insulin/Heparin',
    precautions: [
      'หมุนเวียนตำแหน่งฉีด (Rotation site) เสมอเพื่อป้องกัน Lipodystrophy หรือก้อนแข็งใต้ผิวหนัง',
      'ห้ามถูนวดบริเวณที่ฉีด Heparin หรือ LMWH เพราะจะทำให้เกิดรอยฟกช้ำหรือเลือดออกใต้ผิวหนัง (Hematoma)',
      'ห้ามไล่อากาศในกระบอกยาสำเร็จรูปของ LMWH (Pre-filled syringe with air bubble) เพราะฟองอากาศช่วยดันยาไม่ให้ตกค้างในเข็ม'
    ],
    aspirationNote: 'การฉีดยาเข้าชั้นใต้ผิวหนัง โดยเฉพาะ Insulin และ Heparin ไม่ต้อง aspirate เพื่อป้องกันการฉีกขาดของเนื้อเยื่อและการเกิดรอยช้ำ'
  },
  {
    id: 'proc-id',
    code: 'ID',
    nameTh: 'การฉีดยาเข้าในชั้นผิวหนัง',
    nameEn: 'Intradermal Injection (ID)',
    definition: 'การบริหารยาเข้าสู่ชั้นหนังแท้ (Dermis) มีการดูดซึมช้าที่สุด เหมาะสำหรับการทดสอบภูมิแพ้ (Skin test), Tuberculin test (PPD), วัคซีน BCG',
    targetLayerTh: 'ชั้นหนังแท้ (Dermis)',
    targetLayerEn: 'Dermis',
    angle: '10 - 15 องศา',
    angleDegrees: 15,
    syringeTypes: ['1 mL (Tuberculin Syringe) ขีดละเอียด 0.01 mL'],
    needleSpecs: 'เบอร์ 26G - 27G (ยาว 3/8 - 1/2 นิ้ว)',
    maxVolumeAdult: 'ปริมาตรน้อยมากเพียง 0.01 - 0.1 mL',
    commonSites: [
      {
        nameTh: 'ท้องแขนด้านใน (Inner aspect of forearm)',
        nameEn: 'Ventral forearm',
        landmarks: 'ต่ำกว่าข้อพับแขน 3-4 นิ้วมือ และสูงกว่าข้อมือ 2-3 นิ้วมือ เลือกบริเวณที่ไม่มีขนและเส้นเลือดเด่นชัด',
        clinicalNotes: 'ตำแหน่งมาตรฐานสำหรับการทดสอบ PPD Mantoux test และ Drug skin test สังเกตปฏิกิริยาตุ่มนูนได้ชัดเจน',
        imageUrl: idForearmImg,
      },
      {
        nameTh: 'แผ่นหลังส่วนบน (Upper back under scapula)',
        nameEn: 'Subscapular region',
        landmarks: 'บริเวณใต้สะบักทั้งสองข้าง',
        clinicalNotes: 'มักใช้ในการทำ Allergy skin testing หลากหลายชนิดพร้อมกัน'
      }
    ],
    quickMnemonic5s: 'หงายปลายเข็มขึ้น (Bevel up) ทำมุม 10-15° เรียบเกือบแนบผิว แทงลึกแค่รอยตัดเข็ม ต้องเกิดตุ่มนูนใส (Wheal/Bleb) ขนาด 6-10 mm',
    precautions: [
      'หากไม่เกิดตุ่มนูน (Wheal) หรือมีเลือดออก แสดงว่าแทงลึกเกินไปเข้าสู่ชั้นใต้ผิวหนัง (SC) ผลการทดสอบจะไม่น่าเชื่อถือ',
      'ห้ามถู นวด หรือปิดพลาสเตอร์ทับตุ่มนูนเด็ดขาด เพราะจะรบกวนผลการทดสอบ',
      'วงขอบตุ่มนูนด้วยปากกาพร้อมระบุวันเวลาและชื่อยาที่ทดสอบ แนะนำผู้ป่วยไม่ให้เกา'
    ],
    aspirationNote: 'การฉีดในชั้นผิวหนัง (ID) ห้าม aspirate เนื่องจากชั้นหนังแท้ไม่มีหลอดเลือดขนาดใหญ่ และจะทำให้สูญเสียตุ่มนูนที่ถูกต้อง'
  },
  {
    id: 'proc-iv',
    code: 'IV',
    nameTh: 'การฉีดยาเข้าหลอดเลือดดำ',
    nameEn: 'Intravenous Injection (IV Push / Direct IV)',
    definition: 'การบริหารยาเข้าสู่กระแสเลือดดำโดยตรง ยาออกฤทธิ์เร็วที่สุด (Immediate effect) และมี Bioavailability 100% ต้องใช้ความระมัดระวังสูงสุด',
    targetLayerTh: 'หลอดเลือดดำ (Vein Lumen)',
    targetLayerEn: 'Vein Lumen (Intravenous)',
    angle: '15 - 30 องศา (แล้วลดมุมลง 10-15° ขนานกับหลอดเลือด)',
    angleDegrees: 25,
    syringeTypes: ['3 mL', '5 mL', '10 mL (ขึ้นกับขนาดยาและการเจือจาง)'],
    needleSpecs: 'สำหรับเตรียมยา: เข็มเบอร์ 18G/21G, สำหรับฉีดเข้า IV catheter/Extension tube: ปฏิบัติตาม Aseptic needleless connector',
    maxVolumeAdult: 'ขึ้นกับชนิดยา อัตราการให้ยา และคำสั่งการรักษา ห้าม Push เร็วกว่าที่กำหนด',
    commonSites: [
      {
        nameTh: 'หลอดเลือดดำที่หลังมือและแขน (Dorsal venous network & Forearm veins)',
        nameEn: 'Cephalic vein, Basilic vein, Median antebrachial',
        landmarks: 'เลือกเส้นเลือดที่ตรง ไม่อยู่ตรงข้อพับ คลำแล้วนุ่มยืดหยุ่น (Bouncy) ปราศจากการอักเสบ',
        clinicalNotes: 'ควรประเมินตำแหน่ง IV catheter ว่าไม่มี Phlebitis, Infiltration หรือ Extravasation ก่อนฉีดทุกครั้ง'
      }
    ],
    quickMnemonic5s: 'Check 10 Rights → Flush ก่อนฉีดด้วย NSS → Push ยาช้าๆ ตามเวลาที่กำหนด (เช่น 2-5 นาที) → Flush ปิดท้ายตามอัตราเดียวกับยา',
    precautions: [
      'ตรวจสอบ IV Site เสมอ: ไม่มีบวม แดง ร้อน ปวด หากมีข้อสงสัยห้ามฉีดเด็ดขาด ให้แจ้งพยาบาลพี่เลี้ยงทันที',
      'การ Push ยาเร็วเกินไป (Speed shock) อาจทำให้เกิดหัวใจเต้นผิดจังหวะ ช็อก หรือหมดสติได้',
      'ตรวจสอบความเข้ากันได้ของยา (Drug Compatibility) กับสารน้ำเดิมที่กำลังหยดอยู่',
      'หากยาหลุดออกนอกเส้นเลือด (Extravasation) โดยเฉพาะยา Vesicant ให้หยุดฉีดทันที ห้ามถอนเข็มก่อนดูดยาตกค้างออกตามโปรโตคอล'
    ],
    aspirationNote: 'สำหรับ IV Direct/Catheter ให้ทดสอบดูดย้อน (Aspirate) เพื่อสังเกต Blood return และ Flush ด้วย NSS ดูว่าไหลสะดวก ไม่บวม ไม่ต้าน ก่อนให้ยาทุกครั้ง'
  }
];

export const DEFAULT_CHECKLIST_STEPS: ChecklistStep[] = [
  // Common steps for IM
  {
    id: 'im-step-1',
    procedureCode: 'IM',
    stepNumber: 1,
    titleTh: 'ตรวจสอบคำสั่งการรักษาและข้อมูลยาตามหลัก 10 R',
    titleEn: 'Verify Medication Order 10R',
    descriptionTh: 'ตรวจสอบคำสั่งการรักษาและข้อมูลยาตามหลัก 10 R ตรวจสอบชื่อยา ขนาดยา วันหมดอายุ และความถูกต้องตามแผนการรักษา',
    isCriticalSafety: true,
    safetyAlertReason: 'การให้ยาผิดชนิดต้องตรวจสอบอย่างรอบคอบตามหลัก 10 Rights',
    category: 'VERIFICATION'
  },
  {
    id: 'im-step-2',
    procedureCode: 'IM',
    stepNumber: 2,
    titleTh: 'ล้างมือและเตรียมอุปกรณ์ ได้ถูกต้อง ครบถ้วน และป้องกันการปนเปื้อนเชื้อ',
    titleEn: 'Perform Hand Hygiene & Prepare Equipment',
    descriptionTh: 'ล้างมือด้วยสบู่และน้ำ หรือ Alcohol gel 70% ตามหลัก 7 ขั้นตอน และจัดเตรียมอุปกรณ์ปลอดเชื้อให้พร้อม',
    isCriticalSafety: true,
    safetyAlertReason: 'การละเลยการทำความสะอาดมืออาจนำเชื้อโรคเข้าสู่ร่างกายผู้ป่วยผ่านบาดแผลเข็มแทง',
    category: 'PREPARATION'
  },
  {
    id: 'im-step-3',
    procedureCode: 'IM',
    stepNumber: 3,
    titleTh: 'คำนวณและเตรียมยาได้ถูกต้อง',
    titleEn: 'Calculate & Prepare Medication',
    descriptionTh: 'คำนวณและเตรียมยาได้ถูกต้องตามขนาดที่แพทย์สั่ง ทั้งยาชนิด Vial และ Ampule',
    isCriticalSafety: true,
    safetyAlertReason: 'การคำนวณผิดขนาดอาจส่งผลกระทบต่อประสิทธิภาพการรักษาหรือเกิดพิษจากยา',
    category: 'PREPARATION'
  },
  {
    id: 'im-step-4',
    procedureCode: 'IM',
    stepNumber: 4,
    titleTh: 'ดูดยาและเตรียมกระบอกฉีดยา เตรียมเข็ม ได้ถูกต้องและปลอดเชื้อ',
    titleEn: 'Draw Medication & Prepare Syringe/Needle Aseptically',
    descriptionTh: 'เลือกกระบอกยาและเข็มที่เหมาะสม เช็ดจุกยาง Vial หรือคอ Ampule ด้วย 70% Alcohol ปล่อยให้แห้ง ดูดยาตามขนาดที่ถูกต้อง เปลี่ยนเข็มสำหรับฉีดเพื่อความคมและปลอดเชื้อ',
    isCriticalSafety: true,
    safetyAlertReason: 'มีความเสี่ยงต่อการปนเปื้อน (Contamination) และการระคายเคืองหากใช้เข็มดูดยามาฉีดผู้ป่วยโดยตรง',
    category: 'PREPARATION'
  },
  {
    id: 'im-step-5',
    procedureCode: 'IM',
    stepNumber: 5,
    titleTh: 'เก็บรักษายาที่เตรียมแล้วและนำยาไปให้ผู้ป่วยพร้อมอุปกรณ์',
    titleEn: 'Transport Prepared Medication Safely to Patient',
    descriptionTh: 'เก็บรักษายาที่เตรียมแล้วและนำยาไปให้ผู้ป่วยอย่างถูกต้องปลอดภัย พร้อมถาดอุปกรณ์และใบแจ้งการบริหารยา (MAR)',
    isCriticalSafety: true,
    safetyAlertReason: 'หากเตรียมอุปกรณ์ไม่ครบหรือติดฉลากไม่ชัดเจนอาจเกิดการสลับตัวยาหรือผู้ป่วย',
    category: 'PREPARATION'
  },
  {
    id: 'im-step-6',
    procedureCode: 'IM',
    stepNumber: 6,
    titleTh: 'ตรวจสอบและเตรียมผู้ป่วยก่อนฉีดยา อธิบายขั้นตอนและให้ข้อมูลแก่ผู้ป่วย',
    titleEn: 'Verify Patient ID & Explain Procedure',
    descriptionTh: 'ตรวจสอบและเตรียมผู้ป่วยก่อนฉีดยา ได้แก่ แนะนำตนเอง ตรวจสอบชื่อ-สกุล HN อธิบายวัตถุประสงค์ ผลข้างเคียงที่อาจพบ และวิธีปฏิบัติตัวขณะฉีดยา',
    isCriticalSafety: false,
    category: 'PREPARATION'
  },
  {
    id: 'im-step-7',
    procedureCode: 'IM',
    stepNumber: 7,
    titleTh: 'จัดท่าผู้ป่วยและหาตำแหน่งที่ถูกต้อง ทำความสะอาดผิวหนัง',
    titleEn: 'Position Patient & Locate Anatomical Landmark',
    descriptionTh: 'จัดท่าให้กล้ามเนื้อผ่อนคลาย คลำหาจุดสำคัญทางกายวิภาค (Landmarks) ให้แม่นยำ เช็ดผิวด้วย 70% Alcohol วนจากจุดกึ่งกลางออกสู่ด้านนอกเส้นผ่าศูนย์กลาง 2 นิ้ว รอให้แห้งสนิท',
    isCriticalSafety: true,
    safetyAlertReason: 'การระบุตำแหน่งผิดพลาดอาจทำให้เข็มโดนเส้นประสาท Sciatic nerve หรือหลอดเลือดขนาดใหญ่',
    category: 'EXECUTION'
  },
  {
    id: 'im-step-8',
    procedureCode: 'IM',
    stepNumber: 8,
    titleTh: 'ฉีดยาได้ถูกต้องตามหลักการ',
    titleEn: 'Inject Medication with Proper Technique',
    descriptionTh: 'ฉีดยาได้ถูกต้อง ตรึงผิวหนังให้ตึงหรือใช้ Z-track technique ปักเข็มทำมุม 90 องศาอย่างรวดเร็วและมั่นคง ดันยาช้าๆ 1 mL ต่อ 10 วินาที เพื่อให้กล้ามเนื้อดูดซึมยาได้ดี',
    isCriticalSafety: true,
    safetyAlertReason: 'การแทงเข็มผิดมุมทำให้ปวดและเพิ่มความเสี่ยงต่อการบาดเจ็บต่อเนื้อเยื่อ',
    category: 'EXECUTION'
  },
  {
    id: 'im-step-9',
    procedureCode: 'IM',
    stepNumber: 9,
    titleTh: 'ดูแลผู้ป่วยหลังฉีดยา ถอนเข็มอย่างถูกวิธี',
    titleEn: 'Withdraw Needle & Dispose Safely',
    descriptionTh: 'ถอนเข็มตามมุมที่แทงอย่างรวดเร็ว กดสำลีแห้งเบาๆ ไม่คลึงหากฉีดด้วยเทคนิค Z-track ทิ้งเข็มและกระบอกยาลงถังขยะมีคมติดเชื้อทันทีโดยไม่สวมปลอกเข็มกลับ (No Recapping)',
    isCriticalSafety: true,
    safetyAlertReason: 'การสวมปลอกเข็มกลับเป็นสาเหตุอันดับหนึ่งของอุบัติเหตุเข็มทิ่มตำ (Needle Stick Injury)',
    category: 'POST_CARE'
  },
  {
    id: 'im-step-10',
    procedureCode: 'IM',
    stepNumber: 10,
    titleTh: 'ประเมินผู้ป่วยหลังฉีดและบันทึกข้อมูล (Post-Assessment & Document)',
    titleEn: 'Assess Post-Injection & Document in MAR',
    descriptionTh: 'ประเมินอาการปวด รอยแดง เลือดออก หรืออาการไม่พึงประสงค์ บันทึกชื่อยา ปริมาตร ตำแหน่งที่ฉีด วันเวลา และลงชื่อผู้ฉีดใน MAR ทันที',
    isCriticalSafety: false,
    category: 'POST_CARE'
  },

  // SC Steps (Subcutaneous - รวมถึงการฉีดอินซูลิน)
  {
    id: 'sc-step-1',
    procedureCode: 'SC',
    stepNumber: 1,
    titleTh: 'ตรวจสอบคำสั่งการรักษาและข้อมูลยาตามหลัก 10 R',
    titleEn: 'Verify Medication Order 10R',
    descriptionTh: 'ตรวจสอบคำสั่งการรักษาและข้อมูลยาตามหลัก 10 R ตรวจสอบชื่อยา ขนาดยา ชนิดของอินซูลิน/ยา วันหมดอายุ และความถูกต้องตามแผนการรักษา',
    isCriticalSafety: true,
    safetyAlertReason: 'การให้ยาผิดชนิดหรือผิดขนาดในกลุ่มอินซูลินเป็น High-Alert Drug อาจทำให้เกิดอันตรายถึงชีวิต',
    category: 'VERIFICATION'
  },
  {
    id: 'sc-step-2',
    procedureCode: 'SC',
    stepNumber: 2,
    titleTh: 'ล้างมือและเตรียมอุปกรณ์ ได้ถูกต้อง ครบถ้วน และป้องกันการปนเปื้อนเชื้อ',
    titleEn: 'Perform Hand Hygiene & Prepare Equipment',
    descriptionTh: 'ล้างมือด้วยสบู่และน้ำ หรือ Alcohol gel 70% ตามหลัก 7 ขั้นตอน และจัดเตรียมกระบอกฉีดอินซูลินหรือปากกาอินซูลินให้พร้อม',
    isCriticalSafety: true,
    safetyAlertReason: 'การละเลยการทำความสะอาดมือนำไปสู่การติดเชื้อที่ผิวหนังและเนื้อเยื่อใต้ผิวหนัง',
    category: 'PREPARATION'
  },
  {
    id: 'sc-step-3',
    procedureCode: 'SC',
    stepNumber: 3,
    titleTh: 'คำนวณและเตรียมยาได้ถูกต้อง (อินซูลิน / ยาใต้ผิวหนัง)',
    titleEn: 'Calculate & Prepare Insulin / SC Medication',
    descriptionTh: 'คำนวณขนาดยา ยูนิต (Units) ให้ตรงตามแพทย์สั่ง ตรวจระดับน้ำตาลปลายนิ้ว (DTX) ก่อนฉีดอินซูลิน หากเป็นยาขุ่น (NPH) ให้กลิ้งขวดบนฝ่ามือ 10-20 ครั้ง (ห้ามเขย่า) และจำหลักดูดยาใสก่อนขุ่น (Clear before cloudy)',
    isCriticalSafety: true,
    safetyAlertReason: 'การดูดยาผิดยูนิตหรือเขย่าขวดยาขุ่นอย่างรุนแรงอาจทำให้โมเลกุลยาเสียสภาพและเกิดภาวะน้ำตาลต่ำวิกฤต (Severe Hypoglycemia)',
    category: 'PREPARATION'
  },
  {
    id: 'sc-step-4',
    procedureCode: 'SC',
    stepNumber: 4,
    titleTh: 'ดูดยาและเตรียมกระบอกฉีดยา เตรียมเข็ม ได้ถูกต้องและปลอดเชื้อ',
    titleEn: 'Draw Medication & Prepare Syringe/Needle Aseptically',
    descriptionTh: 'เลือก Insulin Syringe U-100 หรือเข็มปากกา (Pen Needle) ที่เหมาะสม เช็ดจุกยาง Vial ด้วย 70% Alcohol ปล่อยให้แห้ง ดูดยาตามขีด Unit ที่ถูกต้อง ไล่ฟองอากาศให้หมดเพื่อความแม่นยำ',
    isCriticalSafety: true,
    safetyAlertReason: 'ห้ามนำ Syringe ชนิด mL ธรรมดามาฉีดอินซูลินเด็ดขาด เพราะสเกลต่างกันอาจทำให้ผู้ป่วยได้รับยาเกินขนาดถึง 10 เท่า',
    category: 'PREPARATION'
  },
  {
    id: 'sc-step-5',
    procedureCode: 'SC',
    stepNumber: 5,
    titleTh: 'เก็บรักษายาที่เตรียมแล้วและนำยาไปให้ผู้ป่วยพร้อมอุปกรณ์',
    titleEn: 'Transport Prepared Medication Safely to Patient',
    descriptionTh: 'เก็บรักษายาที่เตรียมแล้วและนำยาไปให้ผู้ป่วยอย่างถูกต้องปลอดภัย พร้อมอุปกรณ์และใบสั่งยา MAR นำอาหารหรือของว่างให้พร้อมกรณีฉีดอินซูลินก่อนอาหาร',
    isCriticalSafety: true,
    safetyAlertReason: 'หากฉีดอินซูลินออกฤทธิ์เร็วแล้วผู้ป่วยไม่ได้รับประทานอาหารตามเวลา จะเกิดภาวะน้ำตาลในเลือดต่ำเฉียบพลัน',
    category: 'PREPARATION'
  },
  {
    id: 'sc-step-6',
    procedureCode: 'SC',
    stepNumber: 6,
    titleTh: 'ตรวจสอบและเตรียมผู้ป่วยก่อนฉีดยา อธิบายขั้นตอนและให้ข้อมูลแก่ผู้ป่วย',
    titleEn: 'Verify Patient ID & Explain Procedure',
    descriptionTh: 'ตรวจสอบและเตรียมผู้ป่วยก่อนฉีดยา ได้แก่ แนะนำตนเอง ตรวจสอบชื่อ-สกุล อธิบายวัตถุประสงค์ อาการเตือนของภาวะน้ำตาลต่ำ และวิธีปฏิบัติตัวขณะฉีดยา',
    isCriticalSafety: false,
    category: 'PREPARATION'
  },
  {
    id: 'sc-step-7',
    procedureCode: 'SC',
    stepNumber: 7,
    titleTh: 'จัดท่าผู้ป่วยและหาตำแหน่งที่ถูกต้อง ทำความสะอาดผิวหนัง',
    titleEn: 'Position Patient & Locate Anatomical Landmark',
    descriptionTh: 'จัดท่าผู้ป่วยให้ผ่อนคลาย เลือกตำแหน่งฉีด เช่น บริเวณหน้าท้องรอบสะดือ (ห่างจากสะดืออย่างน้อย 2 นิ้ว) หรือต้นแขนด้านหลัง หมุนเวียนจุดฉีด (Rotation) เช็ดผิวด้วย 70% Alcohol วนออกด้านนอก รอให้แห้ง',
    isCriticalSafety: true,
    safetyAlertReason: 'การฉีดซ้ำตำแหน่งเดิมบ่อยๆ จะทำให้เกิดก้อนไขมันผิดปกติ (Lipodystrophy) ทำให้ยาไม่ดูดซึม',
    category: 'EXECUTION'
  },
  {
    id: 'sc-step-8',
    procedureCode: 'SC',
    stepNumber: 8,
    titleTh: 'ฉีดยาได้ถูกต้องตามหลักการ',
    titleEn: 'Inject Medication with Proper SC Technique',
    descriptionTh: 'จับจีบผิวหนังยกขึ้น (Pinch skin) แทงเข็มทำมุม 45-90 องศาตามความหนาของชั้นไขมัน ปล่อยมือที่จับจีบ ดันยาช้าๆ โดย "ไม่ต้องดึงดูดย้อน (No aspiration)" หากใช้ปากกาอินซูลินให้กดค้างไว้นับ 1-10 วินาทีก่อนถอนเข็ม',
    isCriticalSafety: true,
    safetyAlertReason: 'การ Aspirate ในชั้นใต้ผิวหนังจะทำให้เนื้อเยื่อบอบช้ำและเสี่ยงต่อการเกิดรอยช้ำเลือด และการถอนเข็มปากกาเร็วเกินไปทำให้ยาย้อนซึมออกมา',
    category: 'EXECUTION'
  },
  {
    id: 'sc-step-9',
    procedureCode: 'SC',
    stepNumber: 9,
    titleTh: 'ดูแลผู้ป่วยหลังฉีดยา ถอนเข็มอย่างถูกวิธี',
    titleEn: 'Withdraw Needle & Dispose Safely',
    descriptionTh: 'ถอนเข็มตามแนวองศาที่แทง ใช้สำลีแห้งกดเบาๆ "ห้ามถูนวดบริเวณที่ฉีดอินซูลินเด็ดขาด" ปลดหัวเข็มหรือทิ้งลงถังขยะติดเชื้อมีคมทันทีโดยไม่สวมปลอกเข็มกลับ',
    isCriticalSafety: true,
    safetyAlertReason: 'การถูนวดจะทำให้อินซูลินดูดซึมเร็วเกินไปจนน้ำตาลในเลือดตกฉับพลัน หรือทำให้เกิดรอยจ้ำเลือดใต้ผิวหนัง',
    category: 'POST_CARE'
  },
  {
    id: 'sc-step-10',
    procedureCode: 'SC',
    stepNumber: 10,
    titleTh: 'ประเมินผู้ป่วยหลังฉีดและบันทึกข้อมูล (Post-Assessment & Document)',
    titleEn: 'Assess Post-Injection & Document in MAR',
    descriptionTh: 'สังเกตอาการภาวะน้ำตาลต่ำ (เหงื่อแตก ใจสั่น หน้ามืด สับสน) บันทึกชื่อยาอินซูลิน จำนวนยูนิต ตำแหน่งที่ฉีด เวลา และระดับน้ำตาล DTX ลงใน MAR ทันที',
    isCriticalSafety: false,
    category: 'POST_CARE'
  },

  // ID Steps (Intradermal - สำหรับการทดสอบภูมิแพ้ / Mantoux test)
  {
    id: 'id-step-1',
    procedureCode: 'ID',
    stepNumber: 1,
    titleTh: 'ตรวจสอบคำสั่งการรักษาและข้อมูลยาตามหลัก 10 R',
    titleEn: 'Verify Medication Order 10R',
    descriptionTh: 'ตรวจสอบคำสั่งการรักษาและข้อมูลยาตามหลัก 10 R ตรวจสอบชนิดน้ำยาสำหรับทดสอบ (เช่น PPD Mantoux test หรือยาปฏิชีวนะที่ต้องทำ Skin test)',
    isCriticalSafety: true,
    safetyAlertReason: 'การให้ยาหรือน้ำยาทดสอบผิดชนิดอาจเกิดการแพ้รุนแรง (Anaphylaxis)',
    category: 'VERIFICATION'
  },
  {
    id: 'id-step-2',
    procedureCode: 'ID',
    stepNumber: 2,
    titleTh: 'ล้างมือและเตรียมอุปกรณ์ ได้ถูกต้อง ครบถ้วน และป้องกันการปนเปื้อนเชื้อ',
    titleEn: 'Perform Hand Hygiene & Prepare Equipment',
    descriptionTh: 'ล้างมือด้วยสบู่และน้ำ หรือ Alcohol gel 70% ตามหลัก 7 ขั้นตอน เตรียมกระบอกฉีด 1 mL (Tuberculin Syringe) และเข็มเบอร์ 26-27G',
    isCriticalSafety: true,
    safetyAlertReason: 'การละเลยการทำความสะอาดมือนำไปสู่การติดเชื้อเฉพาะที่',
    category: 'PREPARATION'
  },
  {
    id: 'id-step-3',
    procedureCode: 'ID',
    stepNumber: 3,
    titleTh: 'คำนวณและเตรียมยาได้ถูกต้อง',
    titleEn: 'Calculate & Prepare Medication',
    descriptionTh: 'คำนวณและเตรียมยาหรือน้ำยาทดสอบตามปริมาตรที่กำหนดอย่างแม่นยำ (ปกติ 0.01 - 0.1 mL)',
    isCriticalSafety: true,
    safetyAlertReason: 'ปริมาตรยาที่มากเกินไปจะทำให้ตุ่มนูนฉีกขาดและแทรกซึมเข้าชั้นใต้ผิวหนัง',
    category: 'PREPARATION'
  },
  {
    id: 'id-step-4',
    procedureCode: 'ID',
    stepNumber: 4,
    titleTh: 'ดูดยาและเตรียมกระบอกฉีดยา เตรียมเข็ม ได้ถูกต้องและปลอดเชื้อ',
    titleEn: 'Draw Medication & Prepare Syringe/Needle Aseptically',
    descriptionTh: 'ใช้กระบอกฉีด Tuberculin ดูดยาตามขีดปริมาตรที่แม่นยำ เช็ดจุกยางด้วย 70% Alcohol ไล่ฟองอากาศให้หมดสิ้น',
    isCriticalSafety: true,
    safetyAlertReason: 'ฟองอากาศเพียงเล็กน้อยจะทำให้ปริมาตรยาทดสอบคลาดเคลื่อน',
    category: 'PREPARATION'
  },
  {
    id: 'id-step-5',
    procedureCode: 'ID',
    stepNumber: 5,
    titleTh: 'เก็บรักษายาที่เตรียมแล้วและนำยาไปให้ผู้ป่วยพร้อมอุปกรณ์',
    titleEn: 'Transport Prepared Medication Safely to Patient',
    descriptionTh: 'เก็บรักษายาที่เตรียมแล้วและนำยาไปให้ผู้ป่วยอย่างถูกต้องปลอดภัย พร้อมอุปกรณ์ ไม้บรรทัดวัดตุ่มนูน และปากกาทำเครื่องหมาย',
    isCriticalSafety: true,
    safetyAlertReason: 'ต้องเตรียมปากกาและไม้บรรทัดวัดผลให้พร้อมเพื่อติดตามอ่านผลได้ตามเวลาที่มาตรฐานกำหนด',
    category: 'PREPARATION'
  },
  {
    id: 'id-step-6',
    procedureCode: 'ID',
    stepNumber: 6,
    titleTh: 'ตรวจสอบและเตรียมผู้ป่วยก่อนฉีดยา อธิบายขั้นตอนและให้ข้อมูลแก่ผู้ป่วย',
    titleEn: 'Verify Patient ID & Explain Procedure',
    descriptionTh: 'ตรวจสอบชื่อ-สกุล อธิบายวัตถุประสงค์ของการทดสอบ แจ้งว่าอาจมีความรู้สึกแสบตึงเล็กน้อย และห้ามถูหรือเกาบริเวณที่ฉีด',
    isCriticalSafety: false,
    category: 'PREPARATION'
  },
  {
    id: 'id-step-7',
    procedureCode: 'ID',
    stepNumber: 7,
    titleTh: 'จัดท่าผู้ป่วยและหาตำแหน่งที่ถูกต้อง ทำความสะอาดผิวหนัง',
    titleEn: 'Position Patient & Locate Anatomical Landmark',
    descriptionTh: 'จัดให้ผู้ป่วยนั่งหรือนอน วางแขนในท่าหงาย เลือกบริเวณท้องแขนด้านใน (Volar surface of forearm) ห่างจากข้อมือ 3-4 นิ้วมือ เช็ดด้วย 70% Alcohol รอให้แห้งสนิท',
    isCriticalSafety: true,
    safetyAlertReason: 'หากแอลกอฮอล์ยังไม่แห้ง แอลกอฮอล์จะเข้าสู่ชั้นผิวหนังทำให้เกิดการระคายเคืองและผลการทดสอบคลาดเคลื่อน',
    category: 'EXECUTION'
  },
  {
    id: 'id-step-8',
    procedureCode: 'ID',
    stepNumber: 8,
    titleTh: 'ฉีดยาได้ถูกต้องตามหลักการ',
    titleEn: 'Inject Medication with Proper ID Technique',
    descriptionTh: 'ดึงผิวหนังให้ตึง หงายปลายเข็มขึ้น (Bevel up) แทงเข็มทำมุม 10-15 องศากับผิวหนัง ให้ปลายเข็มเข้าไปใต้ชั้นหนังกำพร้าเพียง 1-2 มม. ดันยาช้าๆ จนเกิดตุ่มนูนใส (Wheal/Bleb) ขนาดเส้นผ่าศูนย์กลางประมาณ 6-10 มม.',
    isCriticalSafety: true,
    safetyAlertReason: 'หากแทงเข็มลึกเกินไปยาจะเข้าชั้นใต้ผิวหนัง (SC) ทำให้ไม่เกิดตุ่มนูนและแปลผลการทดสอบไม่ได้',
    category: 'EXECUTION'
  },
  {
    id: 'id-step-9',
    procedureCode: 'ID',
    stepNumber: 9,
    titleTh: 'ดูแลผู้ป่วยหลังฉีดยา ถอนเข็มอย่างถูกวิธี',
    titleEn: 'Withdraw Needle & Dispose Safely',
    descriptionTh: 'ถอนเข็มออกในมุมเดิม ใช้สำลีแห้งซับเบาๆ หากมีเลือดซึม "ห้ามกดหรือถูนวดตุ่มนูนเด็ดขาด" ทิ้งเข็มลงถังขยะติดเชื้อมีคมทันทีโดยไม่สวมปลอกเข็มกลับ',
    isCriticalSafety: true,
    safetyAlertReason: 'การถูนวดจะทำให้ตุ่มนูนยุบตัวและน้ำยากระจายตัว ทำให้การแปลผลการทดสอบทางผิวหนังผิดพลาด',
    category: 'POST_CARE'
  },
  {
    id: 'id-step-10',
    procedureCode: 'ID',
    stepNumber: 10,
    titleTh: 'ประเมินผู้ป่วยหลังฉีดและบันทึกข้อมูล (Post-Assessment & Document)',
    titleEn: 'Assess Post-Injection & Document in MAR',
    descriptionTh: 'ใช้ปากกาเขียนวงกลมล้อมรอบตุ่มนูน ระบุวันเวลาที่ฉีด และแจ้งเวลานัดหมายอ่านผล (เช่น 15-30 นาทีสำหรับ Skin test หรือ 48-72 ชั่วโมงสำหรับ Mantoux test) บันทึกใน MAR',
    isCriticalSafety: false,
    category: 'POST_CARE'
  },

  // IV Steps
  {
    id: 'iv-step-1',
    procedureCode: 'IV',
    stepNumber: 1,
    titleTh: 'ล้างมือตามหลักปราศจากเชื้อ (Strict Hand Hygiene)',
    titleEn: 'Hand Hygiene',
    descriptionTh: 'ล้างมือก่อนสัมผัสอุปกรณ์ IV ทุกครั้ง',
    isCriticalSafety: true,
    safetyAlertReason: 'หลอดเลือดดำเชื่อมตรงสู่หัวใจ การปนเปื้อนนำสู่การติดเชื้อในกระแสเลือด (Bacteremia)',
    category: 'PREPARATION'
  },
  {
    id: 'iv-step-2',
    procedureCode: 'IV',
    stepNumber: 2,
    titleTh: 'ตรวจสอบคำสั่งยาและอัตราการให้ยา (Check Order, Dilution & Rate)',
    titleEn: 'Verify Drug, Rate, and Diluent',
    descriptionTh: 'ตรวจชนิดยา สารน้ำเจือจาง และความเร็วในการฉีด (Push rate) เช่น ห้ามฉีดเร็วกว่า 2-5 นาที',
    isCriticalSafety: true,
    safetyAlertReason: 'การ Push ยาเร็วเกินไปอาจทำให้เกิด Speed Shock หรือหัวใจหยุดเต้น',
    category: 'VERIFICATION'
  },
  {
    id: 'iv-step-3',
    procedureCode: 'IV',
    stepNumber: 3,
    titleTh: 'ตรวจสอบตัวตนและประวัติแพ้ยา (Check Patient ID & Allergy)',
    titleEn: 'Confirm Patient ID & Allergies',
    descriptionTh: 'ตรวจสอบชื่อ-สกุล HN และประวัติการแพ้ยา',
    isCriticalSafety: true,
    safetyAlertReason: 'อันตรายถึงชีวิตหากให้ยาผิดคนทางหลอดเลือดดำ',
    category: 'VERIFICATION'
  },
  {
    id: 'iv-step-4',
    procedureCode: 'IV',
    stepNumber: 4,
    titleTh: 'ประเมินตำแหน่ง IV Site (Assess IV Site for Phlebitis/Infiltration)',
    titleEn: 'Inspect IV Cannula Site',
    descriptionTh: 'ตรวจดูว่าไม่มีบวม แดง ร้อน ปวด ไม่มียารั่วออกนอกเส้น (Extravasation)',
    isCriticalSafety: true,
    safetyAlertReason: 'หาก IV Catheter บวมหรือหลุดออกนอกเส้น การฉีดยาเข้าไปจะทำให้เนื้อเยื่อตาย (Tissue Necrosis)',
    category: 'VERIFICATION'
  },
  {
    id: 'iv-step-5',
    procedureCode: 'IV',
    stepNumber: 5,
    titleTh: 'เช็ด Aseptic Port ด้วยแอลกอฮอล์ 15 วินาที (Scrub the Hub)',
    titleEn: 'Scrub the Hub for 15 Seconds',
    descriptionTh: 'เช็ดจุกฉีดยา (Needleless connector) ด้วย 70% Alcohol อย่างทั่วถึงนาน 15 วินาที รอแห้ง',
    isCriticalSafety: true,
    safetyAlertReason: 'การละเลยการ Scrub the hub นำไปสู่การติดเชื้อ Catheter-Related Bloodstream Infection (CRBSI)',
    category: 'PREPARATION'
  },
  {
    id: 'iv-step-6',
    procedureCode: 'IV',
    stepNumber: 6,
    titleTh: 'ทดสอบ Flush ด้วย NSS และตรวจ Blood Return (Aspirate & Pre-flush)',
    titleEn: 'Aspirate Blood & Flush with Normal Saline',
    descriptionTh: 'ต่อ Syringe NSS 5-10 mL ดูดย้อนสังเกตเลือด และ Flush เบาๆ ประเมินความคล่องตัว ไม่มีความต้านทานและไม่บวม',
    isCriticalSafety: true,
    safetyAlertReason: 'ต้องยืนยันว่า Catheter อยู่ในหลอดเลือดดำอย่างแท้จริงก่อนให้ยา',
    category: 'EXECUTION'
  },
  {
    id: 'iv-step-7',
    procedureCode: 'IV',
    stepNumber: 7,
    titleTh: 'ฉีดยาช้าๆ ตามเวลาที่กำหนด (Slow IV Push per Protocol)',
    titleEn: 'Administer Medication at Prescribed Rate',
    descriptionTh: 'ฉีดยาเข้าพอร์ตช้าๆ มองนาฬิกาจับเวลาอย่างเคร่งครัด สังเกตสีหน้าและอาการของผู้ป่วยตลอดเวลา',
    isCriticalSafety: true,
    safetyAlertReason: 'การปล่อยยาเร็วกว่าเวลาที่กำหนดมีความเสี่ยงอันตรายเฉียบพลัน',
    category: 'EXECUTION'
  },
  {
    id: 'iv-step-8',
    procedureCode: 'IV',
    stepNumber: 8,
    titleTh: 'Flush ปิดท้ายด้วย NSS ตามอัตราเดียวกับยา (Post-Flush SAS Method)',
    titleEn: 'Post-Flush at Same Rate as Drug',
    descriptionTh: 'Flush ด้วย NSS อีกครั้งอย่างช้าๆ ในอัตราเดียวกับยา เพื่อดันยาที่ค้างในสายเข้าสู่หลอดเลือดโดยไม่ดันกะทันหัน',
    isCriticalSafety: false,
    category: 'EXECUTION'
  },
  {
    id: 'iv-step-9',
    procedureCode: 'IV',
    stepNumber: 9,
    titleTh: 'ทิ้งขยะและของมีคมตามมาตรฐาน (Proper Waste Disposal)',
    titleEn: 'Sharps & Clinical Waste Disposal',
    descriptionTh: 'ทิ้งเข็มลงถัง Sharps ทิ้งขยะปนเปื้อนลงถังขยะติดเชื้อสีแดง',
    isCriticalSafety: true,
    safetyAlertReason: 'การจัดการขยะติดเชื้อไม่ปลอดภัยเสี่ยงต่อการแพร่เชื้อในหอผู้ป่วย',
    category: 'POST_CARE'
  },
  {
    id: 'iv-step-10',
    procedureCode: 'IV',
    stepNumber: 10,
    titleTh: 'ประเมินอาการแพ้และบันทึกเวชระเบียน (Evaluate Response & Document)',
    titleEn: 'Monitor Adverse Reactions & Document in MAR',
    descriptionTh: 'เฝ้าระวังอาการข้างเคียง สัญญาณชีพ และบันทึกรายละเอียดใน MAR ทันที',
    isCriticalSafety: false,
    category: 'POST_CARE'
  }
];

export const TEN_RIGHTS_DATA: TenRight[] = [
  {
    id: 1,
    rightEn: 'Right Patient',
    rightTh: 'ถูกคน (ผู้ป่วยถูกต้อง)',
    description: 'ตรวจสอบชื่อ-นามสกุล และ HN อย่างน้อย 2 ตัวบ่งชี้ เทียบกับป้ายข้อมือและ MAR ห้ามถามนำชื่อ',
    checkpoint: 'ถามชื่อ-นามสกุลให้ผู้ป่วยตอบเอง และสแกน/ตรวจป้ายข้อมือ',
    iconName: 'UserCheck'
  },
  {
    id: 2,
    rightEn: 'Right drug',
    rightTh: 'ถูกยา (ยาถูกต้อง)',
    description: 'อ่านฉลากยาเทียบกับ MAR ทำ Triple Check: 1) ตอนหยิบยา 2) ตอนเตรียมยา 3) ก่อนนำไปให้ผู้ป่วย ระวังยาชื่อพ้องมองคล้าย (LASA)',
    checkpoint: 'ตรวจสอบชื่อสามัญทางยาและความแรงบนหลอด/ขวดยา',
    iconName: 'Pill'
  },
  {
    id: 3,
    rightEn: 'Right Dose',
    rightTh: 'ถูกขนาด (ขนาดยาถูกต้อง)',
    description: 'คำนวณขนาดยาอย่างแม่นยำ เลือกกระบอกยาที่มีขีดวัดละเอียดเหมาะสม หากเป็นยาความเสี่ยงสูงต้อง Double Check',
    checkpoint: 'ตรวจสอบหน่วย มก. (mg), มคก. (mcg), ยูนิต (Units) ห้ามสับสน',
    iconName: 'Scale'
  },
  {
    id: 4,
    rightEn: 'Right Route',
    rightTh: 'ถูกวิถีทาง (ช่องทางบริหารยาถูกต้อง)',
    description: 'ตรวจสอบว่าคำสั่งเป็น IM, SC, ID หรือ IV ยาบางชนิดผลิตเฉพาะทาง ห้ามฉีดยา IV เข้า IM หรือห้ามฉีดยาแขวนตะกอนเข้า IV',
    checkpoint: 'ตรวจสอบข้อบ่งชี้บนฉลากยาและคำสั่งแพทย์',
    iconName: 'GitCommit'
  },
  {
    id: 5,
    rightEn: 'Right Time & Frequency',
    rightTh: 'ถูกเวลาและความถี่',
    description: 'บริหารยาตรงตามรอบเวลาที่กำหนด (เช่น stat, q 8 hr, ac, pc) ปฏิบัติตามหน้าต่างเวลา 30 นาทีตามเกณฑ์ความปลอดภัย',
    checkpoint: 'ตรวจสอบเวลาล่าสุดที่ผู้ป่วยได้รับยาเพื่อป้องกันการให้ซ้ำซ้อน',
    iconName: 'Clock'
  },
  {
    id: 6,
    rightEn: 'Right Documentation',
    rightTh: 'ถูกบันทึก (บันทึกข้อมูลถูกต้องและทันที)',
    description: 'ลงบันทึกใน MAR ทันทีหลังให้ยาเสร็จ ห้ามเซ็นล่วงหน้า ระบุชื่อยา ขนาด ตำแหน่งที่ฉีด และเวลาจริง',
    checkpoint: 'บันทึกพร้อมลงลายมือชื่อทันทีหลังการปฏิบัติ',
    iconName: 'FileText'
  },
  {
    id: 7,
    rightEn: 'Right Reason / Indication',
    rightTh: 'ถูกเหตุผล (มีข้อบ่งชี้ทางคลินิกที่สมเหตุสมผล)',
    description: 'เข้าใจเหตุผลที่ผู้ป่วยต้องได้รับยานี้ สอดคล้องกับพยาธิสภาพและการวินิจฉัยโรค',
    checkpoint: 'ทราบกลไกและเป้าหมายการรักษาของยานั้นๆ',
    iconName: 'HelpCircle'
  },
  {
    id: 8,
    rightEn: 'Right Response / Evaluation',
    rightTh: 'ถูกการประเมินการตอบสนอง',
    description: 'ติดตามผลลัพธ์ของการให้ยา เช่น อาการปวดลดลง น้ำตาลในเลือดลดลง หรือผลข้างเคียงที่ไม่พึงประสงค์',
    checkpoint: 'ประเมิน Vitals และอาการเฉพาะหลังได้รับยา 15-30 นาที',
    iconName: 'Activity'
  },
  {
    id: 9,
    rightEn: 'Right to Refuse',
    rightTh: 'ถูกสิทธิในการปฏิเสธของผู้ป่วย',
    description: 'ผู้ป่วยมีสิทธิปฏิเสธการรับยา พยาบาลต้องอธิบายผลกระทบ แจ้งแพทย์ และบันทึกเหตุผลในเวชระเบียน',
    checkpoint: 'รับฟังความกังวลของผู้ป่วยและรายงานทีมแพทย์ตามระบบ',
    iconName: 'ShieldAlert'
  },
  {
    id: 10,
    rightEn: 'Right Patient Education',
    rightTh: 'ถูกการให้ความรู้แก่ผู้ป่วย',
    description: 'ให้ข้อมูลเกี่ยวกับชื่อยา วัตถุประสงค์ ผลข้างเคียงที่อาจเกิดขึ้น และข้อควรระวังแก่ผู้ป่วยและญาติอย่างเหมาะสม',
    checkpoint: 'เปิดโอกาสให้ผู้ป่วยซักถามและสังเกตอาการผิดปกติ',
    iconName: 'BookOpen'
  }
];

export const SYRINGES_DATA: SyringeItem[] = [
  {
    id: 'syr-1ml',
    size: '1 mL (Tuberculin)',
    nameTh: 'กระบอกฉีดยาขนาด 1 มิลลิลิตร (ทูเบอร์คูลิน)',
    nameEn: '1 mL Tuberculin Syringe',
    subdivisions: 'ขีดแบ่งละเอียด 0.01 mL',
    typicalUses: 'ใช้สำหรับการฉีดในชั้นผิวหนัง (ID Skin test, BCG), ยาเด็กเล็ก หรือยาที่ต้องการความแม่นยำสูงมาก',
    colorCode: '#0284C7',
    importantNote: 'หัวฉีดมักเป็น Slip tip หรือมีเข็มติดมากับกระบอกยา ระวังการอ่านขีดวัดระดับลูกสูบ',
    imageUrl: syr1mlImg,
  },
  {
    id: 'syr-ins',
    size: 'Insulin Syringe U-100',
    nameTh: 'กระบอกฉีดอินซูลิน ชนิด 100 ยูนิต (ฝาสีส้ม)',
    nameEn: 'Insulin Syringe U-100 (Orange Cap)',
    subdivisions: 'หน่วยเป็น Units (ขีดละ 1 หรือ 2 ยูนิต)',
    typicalUses: 'ใช้สำหรับดูดและฉีด Insulin U-100 เท่านั้น ห้ามใช้ดูดยาชนิดอื่น',
    colorCode: '#EA580C',
    importantNote: 'สัญลักษณ์ฝาส้มมาตรฐานสากล ห้ามนำกระบอกยา mL ธรรมดามาคำนวณแทน Insulin syringe หากไม่ได้รับการฝึกอบรมพิเศษ',
    imageUrl: syrInsImg,
  },
  {
    id: 'syr-3ml',
    size: '3 mL',
    nameTh: 'กระบอกฉีดยาขนาด 3 มิลลิลิตร',
    nameEn: '3 mL Standard Syringe',
    subdivisions: 'ขีดแบ่ง 0.1 mL',
    typicalUses: 'ใช้บ่อยที่สุดสำหรับการฉีดยาเข้ากล้ามเนื้อ (IM) และใต้ผิวหนัง (SC) ปริมาตร 1 - 3 mL',
    colorCode: '#0D9488',
    importantNote: 'มีทั้งแบบ Luer-Lok (เกลียวหมุนแน่นหนา ป้องกันเข็มหลุด) และ Luer-Slip',
    imageUrl: syr3mlImg,
  },
  {
    id: 'syr-5ml',
    size: '5 mL',
    nameTh: 'กระบอกฉีดยาขนาด 5 มิลลิลิตร',
    nameEn: '5 mL Syringe',
    subdivisions: 'ขีดแบ่ง 0.2 mL',
    typicalUses: 'ใช้สำหรับการผสมยาปฏิชีวนะ, การฉีด IV push หรือ IM ปริมาตร 3 - 5 mL',
    colorCode: '#059669',
    importantNote: 'สำหรับ IM ผู้ใหญ่ในตำแหน่ง Ventrogluteal ปริมาตรไม่ควรเกิน 3-4 mL',
    imageUrl: syr5mlImg,
  },
  {
    id: 'syr-10ml',
    size: '10 mL',
    nameTh: 'กระบอกฉีดยาขนาด 10 มิลลิลิตร',
    nameEn: '10 mL Syringe',
    subdivisions: 'ขีดแบ่ง 0.2 - 0.5 mL',
    typicalUses: 'ใช้สำหรับละลายยาผง (Reconstitution), การ Flush NSS ทาง IV Line หรือการผสมยาฉีดเข้าสายน้ำเกลือ',
    colorCode: '#4F46E5',
    importantNote: 'แรงดันการ Flush ของกระบอกยาขนาด 10 mL มีความปลอดภัยต่อผนังหลอดเลือดและสาย PICC/CVC',
    imageUrl: syr10mlImg,
  }
];

export const NEEDLES_DATA: NeedleItem[] = [
  {
    gauge: '18G',
    lengthInch: '1.5 นิ้ว',
    hubColor: '#EC4899',
    colorNameTh: 'สีชมพู (Pink)',
    typicalUseTh: 'ใช้สำหรับดูดยา ผสมยา เจือจางยา ละลายผงยา หรือดูดเลือด ห้ามใช้ฉีดเข้ากล้ามเนื้อหรือผิวหนังผู้ป่วยโดยตรงเพราะรูเข็มใหญ่มากทำให้เจ็บและเนื้อเยื่อบาดเจ็บ',
    recommendedFor: ['IV'],
    imageUrl: needle18Img,
  },
  {
    gauge: '20G',
    lengthInch: '1 - 1.5 นิ้ว',
    hubColor: '#EAB308',
    colorNameTh: 'สีเหลือง (Yellow)',
    typicalUseTh: 'ใช้ผสมยาหนืด หรือให้เลือด/สารน้ำความหนืดสูงทาง IV',
    recommendedFor: ['IV'],
    imageUrl: needle20Img,
  },
  {
    gauge: '21G',
    lengthInch: '1 - 1.5 นิ้ว',
    hubColor: '#22C55E',
    colorNameTh: 'สีเขียว (Green)',
    typicalUseTh: 'ใช้ฉีดยาเข้ากล้ามเนื้อ (IM) สำหรับยาที่มีความหนืดปานกลาง เช่น วิตามิน ยาปฏิชีวนะ หรือเจาะเก็บเลือด',
    recommendedFor: ['IM'],
    imageUrl: needle21Img,
  },
  {
    gauge: '22G',
    lengthInch: '1 - 1.5 นิ้ว',
    hubColor: '#1E293B',
    colorNameTh: 'สีดำ (Black)',
    typicalUseTh: 'ใช้ฉีดยาเข้ากล้ามเนื้อ (IM) เป็นขนาดมาตรฐานสำหรับผู้ใหญ่ ยาละลายน้ำทั่วไป',
    recommendedFor: ['IM'],
    imageUrl: needle22Img,
  },
  {
    gauge: '23G',
    lengthInch: '1 - 1.25 นิ้ว',
    hubColor: '#0EA5E9',
    colorNameTh: 'สีฟ้า (Blue)',
    typicalUseTh: 'ใช้ฉีด IM กล้ามเนื้อ Deltoid (วัคซีน) หรือในเด็กโต/ผู้ใหญ่รูปร่างผอม ยาไม่หนืด',
    recommendedFor: ['IM'],
    imageUrl: needle23Img,
  },
  {
    gauge: '24G',
    lengthInch: '0.75 - 1 นิ้ว',
    hubColor: '#A855F7',
    colorNameTh: 'สีม่วง (Purple)',
    typicalUseTh: 'ใช้ฉีด IM ในเด็กเล็ก หรือฉีดเข้าชั้นใต้ผิวหนัง',
    recommendedFor: ['IM', 'SC'],
    imageUrl: needle24Img,
  },
  {
    gauge: '25G',
    lengthInch: '5/8 นิ้ว',
    hubColor: '#F97316',
    colorNameTh: 'สีส้ม (Orange)',
    typicalUseTh: 'ใช้สำหรับฉีดเข้าใต้ผิวหนัง (SC) เช่น วัคซีน MMR หรือยาที่ไม่ระคายเคือง',
    recommendedFor: ['SC'],
    imageUrl: needle25Img,
  },
  {
    gauge: '26G',
    lengthInch: '0.5 นิ้ว',
    hubColor: '#78350F',
    colorNameTh: 'สีน้ำตาล (Brown)',
    typicalUseTh: 'ใช้สำหรับการฉีดในชั้นผิวหนัง (ID Skin test) หรือ SC',
    recommendedFor: ['ID', 'SC'],
    imageUrl: needle26Img,
  },
  {
    gauge: '27G',
    lengthInch: '0.5 นิ้ว',
    hubColor: '#94A3B8',
    colorNameTh: 'สีเทา (Grey)',
    typicalUseTh: 'ใช้สำหรับการทดสอบภูมิแพ้ทางผิวหนัง (ID Mantoux test, PPD) หรือเข็มอินซูลิน',
    recommendedFor: ['ID', 'SC'],
    imageUrl: needle27Img,
  }
];

export const DEFAULT_SOS_CONTACTS: SOSContact[] = [
  {
    id: 'sos-1',
    roleTh: 'พยาบาลพี่เลี้ยงประจำเวร (Preceptor)',
    roleEn: 'Charge Nurse / Clinical Preceptor',
    name: 'พว. นงลักษณ์ สุขสวัสดิ์ (วอร์ด 4B)',
    phoneNumber: '02-555-0142 (สายใน 4122)',
    department: 'หอผู้ป่วยอายุรกรรมหญิง',
    description: 'ติดต่อทันทีเมื่อมีข้อสงสัยเกี่ยวกับยา, คำสั่งการรักษาไม่ชัดเจน หรือขั้นตอนการแทงเข็มติดขัด'
  },
  {
    id: 'sos-2',
    roleTh: 'อาจารย์นิเทศประจำกลุ่ม (Clinical Instructor)',
    roleEn: 'Nursing Faculty Supervisor',
    name: 'อ.ดร.พย. พิมพ์ใจ สุริยะวงศ์',
    phoneNumber: '089-123-4567 (มือถือประจำวอร์ด)',
    department: 'ภาควิชาการพยาบาลพื้นฐาน',
    description: 'ติดต่อเมื่อเกิดเหตุผิดปกติทางคลินิก, ต้องการคำปรึกษาการตัดสินใจ หรือแจ้งรายงานอุบัติการณ์'
  },
  {
    id: 'sos-3',
    roleTh: 'ทีมกู้ชีพอุบัติเหตุและ CPR (Code Blue Team)',
    roleEn: 'Rapid Response / Code Blue',
    name: 'ศูนย์รับแจ้งเหตุวิกฤตโรงพยาบาล',
    phoneNumber: 'สายใน 1111 หรือ 02-555-9999',
    department: 'ศูนย์อุบัติเหตุและกู้ชีพฉุกเฉิน',
    description: 'กดเรียกทันทีหากผู้ป่วย Anaphylaxis รุนแรง หยุดหายใจ หัวใจหยุดเต้น หรือหมดสติ'
  }
];

export const DEFAULT_BADGES: Badge[] = [
  {
    id: 'badge-first-checklist',
    titleTh: 'First Checklist',
    titleEn: 'First Checklist Done',
    descriptionTh: 'ทำ Checklist ขั้นตอนการฉีดยาสำเร็จครั้งแรก',
    icon: 'Target',
    isUnlocked: true,
    unlockedAt: '2026-09-18T10:15:00Z'
  },
  {
    id: 'badge-knowledge-explorer',
    titleTh: 'Knowledge Explorer',
    titleEn: 'Visual Guide Explorer',
    descriptionTh: 'ทบทวนคู่มือภาพอุปกรณ์และกายวิภาคครบทุกหมวด',
    icon: 'BookOpen',
    isUnlocked: true,
    unlockedAt: '2026-09-19T14:20:00Z'
  },
  {
    id: 'badge-procedure-master',
    titleTh: 'Procedure Learner',
    titleEn: '4-Procedures Learner',
    descriptionTh: 'ผ่านการทบทวนและฝึกครบทั้ง 4 หัตถการ (IM, SC, ID, IV)',
    icon: 'Award',
    isUnlocked: false
  },
  {
    id: 'badge-sbar-practice',
    titleTh: 'SBAR Communicator',
    titleEn: 'SBAR Pitching Practice',
    descriptionTh: 'ฝึกสร้างบทพูดรายงานแพทย์/พยาบาลพี่เลี้ยงด้วยระบบ SBAR สำเร็จ',
    icon: 'MessageSquare',
    isUnlocked: true,
    unlockedAt: '2026-09-20T09:00:00Z'
  },
  {
    id: 'badge-safety-champion',
    titleTh: 'Safety Champion',
    titleEn: 'Zero Safety Violation',
    descriptionTh: 'ผ่านทุกขั้นตอน Safety Alert โดยไม่ข้ามจุดวิกฤต',
    icon: 'ShieldCheck',
    isUnlocked: false
  }
];

export const DEFAULT_CONFIDENCE_HISTORY: ConfidenceRecord[] = [
  {
    id: 'conf-1',
    userId: 'usr-student-01',
    procedureCode: 'IM',
    preScore: 2,
    postScore: 4,
    timestamp: '2026-09-17T09:30:00Z',
    dateStr: '17 ก.ย. 2026'
  },
  {
    id: 'conf-2',
    userId: 'usr-student-01',
    procedureCode: 'SC',
    preScore: 3,
    postScore: 4,
    timestamp: '2026-09-18T11:00:00Z',
    dateStr: '18 ก.ย. 2026'
  },
  {
    id: 'conf-3',
    userId: 'usr-student-01',
    procedureCode: 'ID',
    preScore: 2,
    postScore: 5,
    timestamp: '2026-09-19T15:45:00Z',
    dateStr: '19 ก.ย. 2026'
  },
  {
    id: 'conf-4',
    userId: 'usr-student-01',
    procedureCode: 'IV',
    preScore: 2,
    postScore: 3,
    timestamp: '2026-09-20T10:15:00Z',
    dateStr: '20 ก.ย. 2026'
  }
];

export const DEFAULT_REFLECTIONS: ClinicalReflection[] = [
  {
    id: 'ref-1',
    userId: 'usr-student-01',
    procedureCode: 'IM',
    strengths: 'คลำ Anatomical landmark ที่ Ventrogluteal ได้แม่นยำ และแทงเข็มมุม 90° นิ่งมาก ผู้ป่วยบอกว่าไม่เจ็บ',
    uncertainties: 'ยังกังวลเรื่องการ aspirate ว่ายาแต่ละชนิดมีแนวทางต่างกันอย่างไร',
    nextImprovement: 'ทบทวนประกาศแนวทางปฏิบัติการฉีดวัคซีนและยาปฏิชีวนะของโรงพยาบาลก่อนขึ้นเวร',
    reviewTopics: 'Z-track method และการเลือกขนาดเข็มตามดัชนีมวลกายของผู้ป่วย',
    timestamp: '2026-09-17T10:10:00Z',
    dateStr: '17 ก.ย. 2026'
  },
  {
    id: 'ref-2',
    userId: 'usr-student-01',
    procedureCode: 'ID',
    strengths: 'หงายปลายเข็ม Bevel up ทำมุม 10 องศาได้สวยงาม เกิดตุ่มนูนใส (Wheal) ขนาด 8 mm ตามเกณฑ์เป๊ะ',
    uncertainties: 'ตอนแรกเกือบเผลอเอาสำลีไปกดตุ่มนูน โชคดีที่นึกถึง safety alert ได้ทัน',
    nextImprovement: 'อธิบายผู้ป่วยให้ชัดเจนขึ้นว่าห้ามถูหรือเกาบริเวณที่ฉีด',
    reviewTopics: 'การอ่านผล Mantoux test (Induration vs Erythema)',
    timestamp: '2026-09-19T16:00:00Z',
    dateStr: '19 ก.ย. 2026'
  }
];

export const SBAR_DEFAULT_SCENARIOS = [
  {
    id: 'sbar-sc-1',
    title: 'ผู้ป่วยมีผื่นแดงและคันหลังฉีดยาปฏิชีวนะ (Suspected Allergic Reaction)',
    description: 'หลังฉีด Ceftriaxone 1g IV ไปได้ 10 นาที ผู้ป่วยเริ่มมีผื่นลมพิษ (Urticaria) ที่หน้าอกและคอ ชีพจรเร็วขึ้น',
    situationTemplate: 'ผู้ป่วยเตียง 12 มีอาการผื่นคันแดงขึ้นบริเวณลำคอและหน้าอกเฉียบพลันหลังได้รับยาปฏิชีวนะ IV',
    backgroundTemplate: 'ผู้ป่วยหญิง 45 ปี Admit ด้วย CAP ได้รับ Ceftriaxone 1g IV dose แรกเมื่อ 10 นาทีที่แล้ว ไม่มีประวัติแพ้ยาในอดีต',
    assessmentTemplate: 'V/S: BP 110/70 mmHg, HR 108 bpm, RR 22 bpm, SpO2 98% room air ตรวจพบ erythematous wheals กระจายที่คอและหน้าอก ยังไม่มี stridor หรือ wheezing',
    recommendationTemplate: 'ขออนุญาตให้แพทย์มาประเมินอาการผู้ป่วยที่เตียงทันที และพิจารณาเปิด NSS TKO พร้อมเตรียมยา Antihistamine/Epinephrine ตามโปรโตคอล'
  },
  {
    id: 'sbar-sc-2',
    title: 'หลอดเลือดดำอักเสบ/บวมต้านขณะ Flush IV (IV Phlebitis / Infiltration)',
    description: 'ก่อนฉีดยาแก้ปวด IV พบตำแหน่ง IV Catheter หลังมือบวม แดง ผู้ป่วยบ่นปวดแปลบเมื่อทดสอบ Flush',
    situationTemplate: 'ตำแหน่ง IV Catheter บริเวณหลังมือขวาของผู้ป่วยเตียง 8 มีอาการบวม แดง และมีแรงต้านขณะ Flush',
    backgroundTemplate: 'ผู้ป่วยชาย 58 ปี หลังผ่าตัด วันที่ 2 ได้รับ Tramadol 50 mg IV prn pain ขณะนี้ IV มีอายุ 48 ชั่วโมง',
    assessmentTemplate: 'IV site บวมขนาด 2x2 ซม. ผิวหนังตึงแดง กดเจ็บ Flush ไม่เข้า ไม่มี blood return คาดว่ามี Phlebitis grade 2 หรือ Infiltration',
    recommendationTemplate: 'ขออนุญาตเปิด IV Catheter ตำแหน่งใหม่ที่แขนซ้าย และประคบอุ่นบริเวณเดิม พร้อมทั้งชะลอการให้ยาแก้ปวดทางเส้นเดิม'
  },
  {
    id: 'sbar-sc-3',
    title: 'คำสั่งการรักษามีขนาดยาผิดปกติหรือไม่ชัดเจน (Dose Discrepancy Inquiry)',
    description: 'คำสั่งแพทย์เขียน Morphine 10 mg IV push ในผู้ป่วยสูงอายุที่ไม่เคยได้รับ Opioid มาก่อน',
    situationTemplate: 'ขอปรึกษาและทวนสอบคำสั่งการรักษา Morphine IV ของผู้ป่วยเตียง 15 ครับ/ค่ะ',
    backgroundTemplate: 'ผู้ป่วยหญิงอายุ 82 ปี นน. 42 kg มีภาวะ Acute abdomen เพิ่งย้ายมาจาก ER',
    assessmentTemplate: 'คำสั่งแพทย์ระบุ Morphine 10 mg IV push แต่ผู้ป่วยเป็นผู้สูงอายุน้ำหนักตัวน้อยและ Opioid-naive ซึ่งขนาดยามาตรฐานควรเริ่มที่ 2-3 mg',
    recommendationTemplate: 'ขออนุญาตให้แพทย์ทบทวนและยืนยันขนาดยาที่เหมาะสมอีกครั้งเพื่อความปลอดภัยของผู้ป่วยครับ/ค่ะ'
  }
];

