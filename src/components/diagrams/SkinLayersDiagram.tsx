import React, { useState } from 'react';
import { ProcedureType } from '../../types';
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface SkinLayersDiagramProps {
  activeProcedure?: ProcedureType;
  onSelectProcedure?: (code: ProcedureType) => void;
}

export const SkinLayersDiagram: React.FC<SkinLayersDiagramProps> = ({
  activeProcedure = 'IM',
  onSelectProcedure,
}) => {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const layerInfo: Record<string, { nameTh: string; nameEn: string; desc: string; procs: string }> = {
    epidermis: {
      nameTh: 'ชั้นหนังกำพร้า (Epidermis)',
      nameEn: 'Epidermis (0.1 - 1.5 mm)',
      desc: 'ชั้นผิวหนังนอกสุด ปราศจากหลอดเลือด สำหรับหัตถการ ID ปลายเข็มจะตัดผ่านชั้นนี้เพื่อเข้าไปสร้างตุ่มนูนในรอยต่อหนังแท้',
      procs: 'ID (รอยต่อ Dermis)',
    },
    dermis: {
      nameTh: 'ชั้นหนังแท้ (Dermis)',
      nameEn: 'Dermis (1 - 4 mm)',
      desc: 'มีเส้นใยคอลลาเจน ปลายประสาท และหลอดเลือดฝอยจำนวนมาก ดูดซึมยาช้ามาก เหมาะกับการสังเกตปฏิกิริยาภูมิคุ้มกัน (Skin test)',
      procs: 'ID (Intradermal)',
    },
    subcutaneous: {
      nameTh: 'ชั้นไขมันใต้ผิวหนัง (Subcutaneous / Hypodermis)',
      nameEn: 'Subcutaneous Tissue / Adipose',
      desc: 'ประกอบด้วยเซลล์ไขมันและหลอดเลือดขนาดเล็ก ดูดซึมยาช้า สม่ำเสมอ คงที่ เหมาะสำหรับ Insulin และ Heparin',
      procs: 'SC (Subcutaneous)',
    },
    muscle: {
      nameTh: 'ชั้นกล้ามเนื้อ (Muscle Layer)',
      nameEn: 'Muscle Tissue',
      desc: 'มีหลอดเลือดมาเลี้ยงหนาแน่น ดูดซึมยาได้รวดเร็ว รับปริมาตรยาได้มากกว่าชั้นอื่น แต่ต้องระวังเส้นประสาทสำคัญ',
      procs: 'IM (Intramuscular)',
    },
    vein: {
      nameTh: 'หลอดเลือดดำ (Vein Lumen)',
      nameEn: 'Intravenous / Vascular System',
      desc: 'ยาเข้าสู่กระแสเลือดดำทันที ออกฤทธิ์เร็วที่สุด 100% Bioavailability ต้องระมัดระวัง Speed shock และ Phlebitis',
      procs: 'IV (Intravenous)',
    },
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-sm transition-all">
      {/* Header & Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            แผนผังชั้นผิวหนังและมุมการฉีดยา
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Anatomical Layers & Injection Angles
          </p>
        </div>
        {onSelectProcedure && (
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl">
            {(['ID', 'SC', 'IM', 'IV'] as ProcedureType[]).map(p => (
              <button
                key={p}
                onClick={() => onSelectProcedure(p)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeProcedure === p
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-inner">
        <svg
          viewBox="0 0 600 320"
          className="w-full h-auto select-none"
          style={{ maxHeight: '280px' }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="epidermisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5D0A9" />
              <stop offset="100%" stopColor="#E0A96D" />
            </linearGradient>
            <linearGradient id="dermisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D97757" />
              <stop offset="100%" stopColor="#C25A38" />
            </linearGradient>
            <linearGradient id="subcutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="muscleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
            <linearGradient id="veinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Skin surface background */}
          <rect x="0" y="0" width="600" height="40" fill="#0F172A" />

          {/* Hair follicles & surface detail */}
          <path d="M 80 40 Q 75 15 60 5" stroke="#475569" strokeWidth="1.5" fill="none" />
          <path d="M 240 40 Q 245 18 260 8" stroke="#475569" strokeWidth="1.5" fill="none" />
          <path d="M 420 40 Q 415 15 390 6" stroke="#475569" strokeWidth="1.5" fill="none" />

          {/* Layer 1: Epidermis (40 to 65) */}
          <g
            className="cursor-pointer transition-opacity hover:opacity-90"
            onClick={() => setSelectedLayer('epidermis')}
          >
            <rect x="0" y="40" width="600" height="25" fill="url(#epidermisGrad)" />
            <line x1="0" y1="40" x2="600" y2="40" stroke="#FDE047" strokeWidth="1.5" />
            <text x="15" y="57" fill="#78350F" fontSize="11" fontWeight="bold">
              Epidermis (หนังกำพร้า)
            </text>
          </g>

          {/* Layer 2: Dermis (65 to 135) */}
          <g
            className="cursor-pointer transition-opacity hover:opacity-90"
            onClick={() => setSelectedLayer('dermis')}
          >
            <rect x="0" y="65" width="600" height="70" fill="url(#dermisGrad)" />
            {/* Micro capillaries */}
            <path
              d="M 50 85 Q 70 75 90 95 T 130 90"
              stroke="#EF4444"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M 320 100 Q 340 85 360 115"
              stroke="#3B82F6"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />
            <text x="15" y="105" fill="#FFFFFF" fontSize="11" fontWeight="bold">
              Dermis (หนังแท้)
            </text>
          </g>

          {/* Layer 3: Subcutaneous Tissue (135 to 220) */}
          <g
            className="cursor-pointer transition-opacity hover:opacity-90"
            onClick={() => setSelectedLayer('subcutaneous')}
          >
            <rect x="0" y="135" width="600" height="85" fill="url(#subcutGrad)" />
            {/* Adipose fat cells pattern */}
            <circle cx="80" cy="160" r="10" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" opacity="0.6" />
            <circle cx="100" cy="165" r="12" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" opacity="0.6" />
            <circle cx="125" cy="155" r="9" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" opacity="0.6" />
            <circle cx="340" cy="170" r="14" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" opacity="0.6" />
            <circle cx="368" cy="165" r="11" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" opacity="0.6" />
            <circle cx="490" cy="160" r="12" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" opacity="0.6" />

            <text x="15" y="180" fill="#854D0E" fontSize="11" fontWeight="bold">
              Subcutaneous / ไขมันใต้ผิวหนัง
            </text>
          </g>

          {/* Vein inside Subcutaneous / Dermis boundary */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedLayer('vein')}
          >
            <ellipse cx="500" cy="140" rx="35" ry="14" fill="url(#veinGrad)" stroke="#E0F2FE" strokeWidth="2" />
            <ellipse cx="500" cy="140" rx="28" ry="10" fill="#0369A1" />
            <text x="475" y="144" fill="#FFFFFF" fontSize="9" fontWeight="bold">
              Vein (หลอดเลือด)
            </text>
          </g>

          {/* Layer 4: Muscle Layer (220 to 320) */}
          <g
            className="cursor-pointer transition-opacity hover:opacity-90"
            onClick={() => setSelectedLayer('muscle')}
          >
            <rect x="0" y="220" width="600" height="100" fill="url(#muscleGrad)" />
            {/* Muscle fiber striations */}
            <line x1="0" y1="240" x2="600" y2="240" stroke="#7F1D1D" strokeWidth="1.5" strokeDasharray="10,6" />
            <line x1="0" y1="265" x2="600" y2="265" stroke="#7F1D1D" strokeWidth="1.5" strokeDasharray="12,8" />
            <line x1="0" y1="290" x2="600" y2="290" stroke="#7F1D1D" strokeWidth="1.5" strokeDasharray="8,6" />
            <text x="15" y="275" fill="#FEE2E2" fontSize="12" fontWeight="bold">
              Muscle (ชั้นกล้ามเนื้อลึก)
            </text>
          </g>

          {/* NEEDLE OVERLAYS */}

          {/* 1. ID Needle (10-15 degrees) */}
          <g
            opacity={activeProcedure === 'ID' ? 1 : 0.45}
            className="transition-all cursor-pointer"
            onClick={() => onSelectProcedure && onSelectProcedure('ID')}
          >
            {/* Needle shaft */}
            <line
              x1="30"
              y1="22"
              x2="115"
              y2="58"
              stroke="#E2E8F0"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Needle bevel tip */}
            <polygon points="115,58 118,59 110,60" fill="#94A3B8" />
            {/* Syringe barrel hint */}
            <rect
              x="5"
              y="12"
              width="30"
              height="10"
              fill="#38BDF8"
              rx="2"
              transform="rotate(23, 20, 17)"
            />
            {/* Wheal / Bleb formation */}
            <ellipse cx="115" cy="56" rx="9" ry="5" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" opacity="0.9" />
            <text x="110" y="52" fill="#713F12" fontSize="7" fontWeight="bold">ตุ่มนูน</text>
            {/* Label badge */}
            <rect x="35" y="3" width="70" height="18" rx="4" fill="#0284C7" />
            <text x="70" y="15" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
              ID: 10 - 15°
            </text>
          </g>

          {/* 2. SC Needle (45 degrees) */}
          <g
            opacity={activeProcedure === 'SC' ? 1 : 0.45}
            className="transition-all cursor-pointer"
            onClick={() => onSelectProcedure && onSelectProcedure('SC')}
          >
            {/* Skin pinch indicator */}
            <path
              d="M 195 40 Q 230 25 265 40"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeDasharray="3,3"
              fill="none"
            />
            {/* Needle shaft 45 deg */}
            <line
              x1="180"
              y1="40"
              x2="245"
              y2="155"
              stroke="#E2E8F0"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <rect
              x="160"
              y="10"
              width="32"
              height="12"
              fill="#F97316"
              rx="2"
              transform="rotate(60, 175, 16)"
            />
            {/* Medication depot bubble */}
            <circle cx="245" cy="155" r="7" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" opacity="0.85" />
            {/* Label badge */}
            <rect x="195" y="3" width="75" height="18" rx="4" fill="#D97706" />
            <text x="232" y="15" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
              SC: 45 - 90°
            </text>
          </g>

          {/* 3. IM Needle (90 degrees) */}
          <g
            opacity={activeProcedure === 'IM' ? 1 : 0.45}
            className="transition-all cursor-pointer"
            onClick={() => onSelectProcedure && onSelectProcedure('IM')}
          >
            {/* Needle shaft 90 deg down */}
            <line
              x1="380"
              y1="40"
              x2="380"
              y2="255"
              stroke="#F8FAFC"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <rect
              x="372"
              y="5"
              width="16"
              height="35"
              fill="#0D9488"
              rx="3"
            />
            {/* Plunger */}
            <rect x="375" y="-5" width="10" height="10" fill="#94A3B8" />
            {/* Medication depot in muscle */}
            <circle cx="380" cy="255" r="10" fill="#14B8A6" stroke="#042F2E" strokeWidth="1.5" opacity="0.9" />
            {/* Label badge */}
            <rect x="345" y="3" width="70" height="18" rx="4" fill="#0F766E" />
            <text x="380" y="15" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
              IM: 90° ตั้งฉาก
            </text>
          </g>

          {/* 4. IV Catheter (15 - 30 degrees into vein) */}
          <g
            opacity={activeProcedure === 'IV' ? 1 : 0.45}
            className="transition-all cursor-pointer"
            onClick={() => onSelectProcedure && onSelectProcedure('IV')}
          >
            {/* Needle into vein */}
            <line
              x1="455"
              y1="55"
              x2="495"
              y2="136"
              stroke="#E2E8F0"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <rect
              x="435"
              y="25"
              width="30"
              height="12"
              fill="#2563EB"
              rx="2"
              transform="rotate(62, 450, 31)"
            />
            {/* Blood flashback indicator */}
            <circle cx="495" cy="136" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1" />
            {/* Label badge */}
            <rect x="475" y="3" width="80" height="18" rx="4" fill="#2563EB" />
            <text x="515" y="15" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
              IV: 15 - 30°
            </text>
          </g>
        </svg>
      </div>

      {/* Layer detail card if clicked */}
      {selectedLayer && layerInfo[selectedLayer] && (
        <div className="mt-3 p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 rounded-xl text-xs flex items-start justify-between gap-2 animate-fadeIn">
          <div>
            <span className="font-semibold text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              {layerInfo[selectedLayer].nameTh}
            </span>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              {layerInfo[selectedLayer].desc}
            </p>
            <span className="inline-block mt-1 font-medium text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/60 px-2 py-0.5 rounded">
              หัตถการเป้าหมาย: {layerInfo[selectedLayer].procs}
            </span>
          </div>
          <button
            onClick={() => setSelectedLayer(null)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Key Quick Takeaway */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
          <span className="font-bold text-sky-600 dark:text-sky-400 block">ID (10-15°)</span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">ชั้น Dermis / หงาย Bevel</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
          <span className="font-bold text-amber-600 dark:text-amber-400 block">SC (45-90°)</span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">ชั้น Subcut / จับจีบผิว</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
          <span className="font-bold text-teal-600 dark:text-teal-400 block">IM (90°)</span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">ชั้น Muscle / ตั้งฉาก</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
          <span className="font-bold text-blue-600 dark:text-blue-400 block">IV (15-30°)</span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">เข้า Vein / ตรวจ Flashback</span>
        </div>
      </div>
    </div>
  );
};
