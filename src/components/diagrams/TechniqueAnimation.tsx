import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Info, ShieldCheck, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TechniqueGuide {
  id: string;
  titleTh: string;
  titleEn: string;
  category: string;
  descriptionTh: string;
  steps: string[];
  keyAdviceTh: string;
  aspirationNote?: string;
  animType: 'ampule' | 'sterile' | 'ztrack' | 'sharps' | 'prep';
}

const TECHNIQUE_GUIDES: TechniqueGuide[] = [
  {
    id: 'tech-ztrack',
    titleTh: 'วิธีฉีดยาแบบ Z-track Method',
    titleEn: 'Z-track Injection Technique (IM)',
    category: 'IM Injection Technique',
    descriptionTh: 'เทคนิคการดึงรั้งผิวหนังและชั้นไขมันไปด้านข้างก่อนแทงเข็ม 90° เพื่อสร้างเส้นทางหักมุมรูปตัว Z ป้องกันยาซึมย้อนกลับสู่ชั้นไขมันหรือผิวหนัง',
    steps: [
      'ใช้มือนอกดึงผิวหนังและชั้นไขมันใต้ผิวหนังไปด้านข้าง 1 - 1.5 นิ้ว (2.5 - 3.8 ซม.)',
      'แทงเข็ม 90° เข้าสู่กล้ามเนื้อลึกด้วยมือข้างที่ถนัดอย่างมั่นคง',
      'ปฏิบัติตามแนวทางการ aspirate ของสถาบัน ฉีดยาช้าๆ อัตรา 10 วินาทีต่อ 1 mL',
      'คงเข็มไว้ในกล้ามเนื้อ 10 วินาทีหลังฉีดยาหมดเพื่อให้ยากระจายตัว',
      'ถอนเข็มออกในมุม 90° เดิม พร้อมปล่อยมือที่ดึงผิวหนังทันที ผิวหนังจะคืนตัวปิดผนึกรอยเข็ม',
      'กดสำลีแห้งเบาๆ ห้ามถูนวด (Do not massage)'
    ],
    keyAdviceTh: 'แนะนำอย่างยิ่งสำหรับยาที่มีฤทธิ์ระคายเคืองสูง เช่น Iron Dextran, Haloperidol เพื่อป้องกันการเปลี่ยนสีผิวและลดความเจ็บปวด',
    aspirationNote: 'การ aspirate ให้ปฏิบัติตามแนวทางของยา/สถาบันที่ใช้ในการเรียนการสอน',
    animType: 'ztrack'
  },
  {
    id: 'tech-ampule',
    titleTh: 'การหัก Ampule อย่างปลอดภัย',
    titleEn: 'Safe Ampule Breaking Technique',
    category: 'Medication Prep',
    descriptionTh: 'การเปิดหลอดแก้วแอมพูลโดยไม่ให้เกิดการบาดเจ็บจากเศษแก้วคมและลดการปนเปื้อน',
    steps: [
      'เคาะยอดหลอดเบาๆ ให้น้ำยาไหลลงส่วนล่าง',
      'ใช้ Gauze หรือ Alcohol swab หุ้มรอบคอหลอดที่มีจุดสีหรือรอยบาก',
      'จับส่วนล่างของหลอดด้วยมือหนึ่ง อีกมือจับส่วนยอดแล้วออกแรงหักออกจากตัว (Break away from body)',
      'ทิ้งหัวแอมพูลลงกล่องของมีคมทันที แล้วใช้ Filter Needle ดูดยาเพื่อกรองเศษแก้ว'
    ],
    keyAdviceTh: 'ห้ามออกแรงดึงหรือหักเข้าหาใบหน้าตนเองเด็ดขาด และห้ามใช้เข็มธรรมดาดูดยาหากมี Filter needle พร้อมใช้งาน',
    animType: 'ampule'
  },
  {
    id: 'tech-sterile',
    titleTh: 'เทคนิคปราศจากเชื้อและการสัมผัส (Aseptic No-Touch)',
    titleEn: 'Aseptic No-Touch Technique (ANTT)',
    category: 'Infection Control',
    descriptionTh: 'การรักษาความปราศจากเชื้อของจุดวิกฤต (Critical Key-parts) ตลอดเวลาในการเตรียมและฉีดยา',
    steps: [
      'ห้ามสัมผัสปลายเข็ม (Bevel & Shaft) เด็ดขาด',
      'ห้ามสัมผัสแกนลูกสูบด้านใน (Plunger inner shaft) สัมผัสได้เฉพาะแป้นกดท้ายลูกสูบ',
      'ห้ามสัมผัสขั้วต่อกระบอกยา (Syringe tip / Luer lock)',
      'เช็ดจุกยาง Vial ด้วย 70% Alcohol นาน 15 วินาทีและปล่อยให้แห้งสนิทก่อนเจาะ'
    ],
    keyAdviceTh: 'หากจุด Key-parts ไปสัมผัสกับสิ่งใดที่ไม่ปลอดเชื้อ ให้เปลี่ยนอุปกรณ์ชุดใหม่ทันที ห้ามนำกลับมาใช้',
    animType: 'sterile'
  },
  {
    id: 'tech-sharps',
    titleTh: 'การจัดการเข็มอย่างปลอดภัย (Sharps Safety)',
    titleEn: 'Safe Needle Disposal & One-hand Scoop',
    category: 'Sharps Safety',
    descriptionTh: 'แนวทางปฏิบัติมาตรฐานเพื่อป้องกันอุบัติเหตุเข็มทิ่มตำ (Needle Stick Injury - NSI)',
    steps: [
      'ห้ามใช้สองมือสวมปลอกเข็มกลับ (No Two-Handed Recapping)',
      'หากจำเป็นต้องสวมปลอกเข็มชั่วคราว ให้ใช้เทคนิคตักมือเดียว (One-Handed Scoop Method) เท่านั้น',
      'ทิ้งเข็มและกระบอกยาลงใน Sharps Container ที่ทนต่อการเจาะทะลุได้ทันทีหลังเสร็จสิ้นหัตถการ',
      'หยุดใช้งานและปิดล็อกถัง Sharps เมื่อปริมาณขยะถึงขีด 3/4 (75%) ห้ามกดอัดของมีคม'
    ],
    keyAdviceTh: 'หากเกิดอุบัติเหตุเข็มตำ ให้บีบเลือดออกเบาๆ ล้างน้ำและสบู่ปริมาณมาก และรายงานพยาบาลพี่เลี้ยง/อาจารย์นิเทศเพื่อรับยา PEP ภายใน 2 ชั่วโมง',
    animType: 'sharps'
  },
  {
    id: 'tech-prep',
    titleTh: 'การเตรียมถาดอุปกรณ์และยา (Tray Preparation)',
    titleEn: 'Aseptic Injection Tray Setup',
    category: 'Equipment Prep',
    descriptionTh: 'การจัดวางอุปกรณ์ในถาดฉีดยาอย่างเป็นระเบียบ สะอาด และถูกต้องตามหลักการควบคุมการติดเชื้อ',
    steps: [
      'เช็ดทำความสะอาดถาดฉีดยาด้วยน้ำยาฆ่าเชื้อก่อนจัดของ',
      'จัดวาง MAR / Medication Card ควบคู่กับตัวยาที่ตรวจสอบแล้ว',
      'เตรียมสำลีแอลกอฮอล์ 70%, สำลีแห้ง, พลาสเตอร์ยา, ถุงมือสะอาด',
      'วางกระบอกยาที่ดูดยาแล้วพร้อมติดป้ายชื่อผู้ป่วย ชื่อยา ขนาดยาอย่างชัดเจน'
    ],
    keyAdviceTh: 'แยกฝั่งของสะอาด (Clean side) และของปนเปื้อน (Contaminated side) ในถาดให้ชัดเจน',
    animType: 'prep'
  }
];

export const TechniqueAnimation: React.FC = () => {
  const { speakText, stopSpeech, isSpeaking } = useApp();
  const [selectedTech, setSelectedTech] = useState<TechniqueGuide>(TECHNIQUE_GUIDES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isAudioNarrated, setIsAudioNarrated] = useState<boolean>(false);

  // Simple frame loop animation simulation
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const toggleNarration = () => {
    if (isAudioNarrated) {
      stopSpeech();
      setIsAudioNarrated(false);
    } else {
      setIsAudioNarrated(true);
      speakText(`${selectedTech.titleTh}. ${selectedTech.descriptionTh}. ข้อสำคัญ: ${selectedTech.keyAdviceTh}`);
    }
  };

  const handleSelectTech = (tech: TechniqueGuide) => {
    setSelectedTech(tech);
    setCurrentFrame(0);
    if (isAudioNarrated) {
      speakText(`${tech.titleTh}. ${tech.descriptionTh}. ข้อสำคัญ: ${tech.keyAdviceTh}`);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
      {/* Title & Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping"></span>
            คลิปภาพจำลองเทคนิคหัตถการ (Technique Simulation Cards)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ภาพจำลองการเคลื่อนไหวแบบ Loop สั้น 5–10 วินาที สำหรับทบทวนก่อนปฏิบัติ
          </p>
        </div>
      </div>

      {/* Pill Buttons for Techniques */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1">
        {TECHNIQUE_GUIDES.map(t => (
          <button
            key={t.id}
            onClick={() => handleSelectTech(t)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              selectedTech.id === t.id
                ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-500/20'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {t.titleTh}
          </button>
        ))}
      </div>

      {/* Video / Animated Simulation Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: Interactive Canvas Screen */}
        <div className="md:col-span-6 bg-slate-950 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden min-h-[240px] border border-slate-800">
          {/* Top Canvas Bar */}
          <div className="flex items-center justify-between z-10">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {selectedTech.category}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {isPlaying ? 'กำลังเล่นวนซ้ำ (Loop)' : 'หยุดชั่วคราว'}
            </div>
          </div>

          {/* Central Animated Graphic SVG depending on technique */}
          <div className="my-auto py-2 flex flex-col items-center justify-center">
            {selectedTech.animType === 'ztrack' && (
              <svg viewBox="0 0 240 140" className="w-48 h-auto select-none">
                {/* Skin & Subcut layers */}
                <rect x="20" y="30" width="200" height="20" fill="#E0A96D" rx="2" />
                <rect x="20" y="50" width="200" height="40" fill="#F59E0B" opacity="0.8" />
                <rect x="20" y="90" width="200" height="45" fill="#991B1B" />
                <text x="25" y="115" fill="#FECACA" fontSize="8" fontWeight="bold">Muscle Layer</text>

                {/* Lateral traction arrow */}
                <g className={currentFrame >= 1 ? 'opacity-100' : 'opacity-40'} style={{ transition: 'all 0.5s' }}>
                  <path d="M 120 40 L 160 40" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
                  <polygon points="160,36 168,40 160,44" fill="#38BDF8" />
                  <text x="110" y="25" fill="#38BDF8" fontSize="8">ดึงผิวไปข้างๆ</text>
                </g>

                {/* Needle 90 deg */}
                <g transform={currentFrame >= 2 ? 'translate(0, 0)' : 'translate(0, -25)'} style={{ transition: 'transform 0.6s' }}>
                  <line x1="120" y1="10" x2="120" y2="105" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  <rect x="114" y="5" width="12" height="18" fill="#0D9488" rx="2" />
                  {currentFrame === 3 && (
                    <circle cx="120" cy="105" r="7" fill="#14B8A6" stroke="#FFFFFF" strokeWidth="1" opacity="0.9" />
                  )}
                </g>
              </svg>
            )}

            {selectedTech.animType === 'ampule' && (
              <svg viewBox="0 0 240 140" className="w-44 h-auto select-none">
                {/* Ampule body */}
                <path d="M 100 70 C 100 60, 140 60, 140 70 L 140 125 C 140 130, 100 130, 100 125 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
                <rect x="102" y="85" width="36" height="38" fill="#FBBF24" opacity="0.6" />
                {/* Break direction arrow */}
                <path d="M 120 35 Q 160 25 175 40" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeDasharray="3,2" />
                <polygon points="175,35 182,42 173,46" fill="#EF4444" />
                {/* Ampule Head */}
                <g transform={currentFrame >= 2 ? 'translate(20, -10) rotate(25, 120, 45)' : 'translate(0, 0)'} style={{ transition: 'all 0.5s' }}>
                  <path d="M 110 50 C 110 38, 130 38, 130 50 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
                  <rect x="116" y="50" width="8" height="15" fill="#E2E8F0" stroke="#64748B" />
                  {/* Gauze protection overlay */}
                  <rect x="106" y="44" width="28" height="18" rx="2" fill="#FFFFFF" opacity="0.75" stroke="#38BDF8" strokeDasharray="2,2" />
                </g>
                <text x="120" y="20" fill="#EF4444" fontSize="9" textAnchor="middle" fontWeight="bold">
                  หักออกจากตัว (Break Away)
                </text>
              </svg>
            )}

            {selectedTech.animType === 'sterile' && (
              <svg viewBox="0 0 240 140" className="w-48 h-auto select-none">
                {/* Syringe & needle with DO NOT TOUCH indicators */}
                <rect x="70" y="60" width="100" height="24" rx="2" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
                <line x1="25" y1="72" x2="70" y2="72" stroke="#CBD5E1" strokeWidth="3" />
                {/* No-touch circle on needle */}
                <circle cx="45" cy="72" r="14" fill="#DC2626" opacity="0.25" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,2" />
                <text x="45" y="52" fill="#F87171" fontSize="8" textAnchor="middle" fontWeight="bold">ห้ามแตะปลายเข็ม</text>
                {/* Plunger shaft */}
                <rect x="170" y="70" width="50" height="4" fill="#94A3B8" />
                <rect x="220" y="62" width="6" height="20" fill="#64748B" rx="1" />
                <circle cx="195" cy="72" r="12" fill="#DC2626" opacity="0.25" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2,2" />
                <text x="195" y="52" fill="#F87171" fontSize="8" textAnchor="middle" fontWeight="bold">ห้ามแตะแกนใน</text>
              </svg>
            )}

            {selectedTech.animType === 'sharps' && (
              <svg viewBox="0 0 240 140" className="w-44 h-auto select-none">
                {/* Sharps Container */}
                <rect x="80" y="45" width="80" height="85" rx="6" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
                <rect x="90" y="35" width="60" height="15" rx="3" fill="#B91C1C" />
                {/* Biohazard symbol hint */}
                <circle cx="120" cy="85" r="14" fill="#7F1D1D" />
                <text x="120" y="89" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">☣</text>
                <text x="120" y="110" fill="#FEE2E2" fontSize="7" textAnchor="middle" fontWeight="bold">SHARPS 3/4 MAX</text>
                {/* Dropping needle */}
                <g transform={currentFrame >= 2 ? 'translate(0, 30)' : 'translate(0, 0)'} style={{ transition: 'transform 0.5s' }}>
                  <line x1="120" y1="10" x2="120" y2="40" stroke="#FFFFFF" strokeWidth="2.5" />
                  <rect x="116" y="5" width="8" height="12" fill="#38BDF8" rx="1" />
                </g>
              </svg>
            )}

            {selectedTech.animType === 'prep' && (
              <svg viewBox="0 0 240 140" className="w-48 h-auto select-none">
                {/* Medication Tray */}
                <rect x="30" y="40" width="180" height="85" rx="6" fill="#334155" stroke="#475569" strokeWidth="2" />
                {/* Clean side */}
                <rect x="40" y="50" width="75" height="65" rx="4" fill="#1E293B" />
                <text x="77" y="65" fill="#38BDF8" fontSize="8" textAnchor="middle" fontWeight="bold">CLEAN ZONE</text>
                {/* Syringe & alcohol */}
                <rect x="48" y="75" width="55" height="12" rx="2" fill="#FFFFFF" />
                {/* MAR card */}
                <rect x="125" y="50" width="75" height="65" rx="4" fill="#0F172A" stroke="#0D9488" strokeWidth="1" />
                <text x="162" y="65" fill="#2DD4BF" fontSize="8" textAnchor="middle" fontWeight="bold">MAR CARD</text>
                <line x1="135" y1="78" x2="190" y2="78" stroke="#64748B" strokeWidth="1.5" />
                <line x1="135" y1="88" x2="180" y2="88" stroke="#64748B" strokeWidth="1.5" />
              </svg>
            )}

            <p className="text-[11px] text-slate-300 text-center mt-2 px-2">
              ขั้นตอนที่ {currentFrame + 1}: {selectedTech.steps[currentFrame % selectedTech.steps.length]}
            </p>
          </div>

          {/* Bottom Video Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 z-10">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs flex items-center gap-1"
                title={isPlaying ? 'หยุดชั่วคราว' : 'เล่นต่อ'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="text-[10px]">{isPlaying ? 'พัก' : 'เล่น'}</span>
              </button>
              <button
                onClick={() => setCurrentFrame(0)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs flex items-center gap-1"
                title="ดูซ้ำตั้งแต่ต้น"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-[10px]">ดูซ้ำ</span>
              </button>
            </div>

            <button
              onClick={toggleNarration}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all ${
                isAudioNarrated
                  ? 'bg-teal-600 text-white ring-1 ring-teal-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isAudioNarrated ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="text-[10px]">{isAudioNarrated ? 'ปิดเสียงบรรยาย' : '🔊 เปิดเสียงบรรยาย'}</span>
            </button>
          </div>
        </div>

        {/* Right: Steps & Clinical Details */}
        <div className="md:col-span-6 space-y-3 text-xs">
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              {selectedTech.titleTh}
            </h4>
            <p className="text-slate-500 dark:text-slate-400 italic text-[11px]">
              {selectedTech.titleEn}
            </p>
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
            {selectedTech.descriptionTh}
          </p>

          {/* Sequential Step List */}
          <div className="space-y-1.5">
            <span className="font-semibold text-slate-700 dark:text-slate-200 block">
              ขั้นตอนสำคัญในการปฏิบัติ:
            </span>
            {selectedTech.steps.map((step, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg border transition-all flex items-start gap-2 ${
                  currentFrame === idx % 4
                    ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-300 dark:border-teal-700 text-teal-900 dark:text-teal-200'
                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug text-[11px]">{step}</span>
              </div>
            ))}
          </div>

          {/* Key Advice */}
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 text-[11px] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <span className="font-bold">ข้อควรระวัง / Key Advice: </span>
              {selectedTech.keyAdviceTh}
            </div>
          </div>

          {/* Aspiration specific note requirement */}
          {selectedTech.aspirationNote && (
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-[11px] text-blue-800 dark:text-blue-300 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
              <span>{selectedTech.aspirationNote}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
