import React, { useState } from 'react';
import { SYRINGES_DATA, NEEDLES_DATA } from '../../data/defaultData';
import { SyringeItem, NeedleItem } from '../../types';
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Sparkles,
  Camera,
  Eye,
  X,
  RotateCcw,
  ZoomIn,
  ImageIcon,
  Calculator,
} from 'lucide-react';
import { DosageCalculationVisual } from './DosageCalculationVisual';

import realSyringesDefaultImg from '../../assets/images/real_syringes_photo_1789949830822.jpg';
import realNeedlesDefaultImg from '../../assets/images/real_needles_photo_1789949844299.jpg';

export const SyringeNeedleVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'syringes' | 'needles' | 'route-comparison' | 'vial-ampule' | 'safe-ampule' | 'dosage-calc'
  >('syringes');
  const [selectedSyringe, setSelectedSyringe] = useState<SyringeItem>(SYRINGES_DATA[0]);
  const [selectedNeedle, setSelectedNeedle] = useState<NeedleItem>(NEEDLES_DATA[2]); // 21G green default

  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; subtitle: string } | null>(null);

  // Helper to get active real photo for syringe or needle
  const getSyringePhoto = (item: SyringeItem) => {
    return item.imageUrl || realSyringesDefaultImg;
  };

  const getNeedlePhoto = (item: NeedleItem) => {
    return item.imageUrl || realNeedlesDefaultImg;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
      {/* Sub-tab Switcher */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('syringes')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'syringes'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          💉 กระบอกฉีดยา (Syringes)
        </button>
        <button
          onClick={() => setActiveTab('needles')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'needles'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          📍 ขนาดเข็ม (Needle Gauges)
        </button>
        <button
          onClick={() => setActiveTab('route-comparison')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'route-comparison'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <span>📋 ตารางเปรียบเทียบตามช่องทางฉีด (Route Guide)</span>
        </button>
        <button
          onClick={() => setActiveTab('dosage-calc')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'dosage-calc'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-teal-50/50 dark:bg-teal-950/20'
          }`}
        >
          <Calculator className="w-3.5 h-3.5 text-teal-500" />
          <span>🧮 การคำนวณยาฉีด (Dosage Calculation)</span>
        </button>
        <button
          onClick={() => setActiveTab('vial-ampule')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'vial-ampule'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          🧪 Vial vs Ampule
        </button>
        <button
          onClick={() => setActiveTab('safe-ampule')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'safe-ampule'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          🛡️ เทคนิคหัก Ampule ปลอดภัย
        </button>
      </div>

      {/* 1. SYRINGES VIEW */}
      {activeTab === 'syringes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {SYRINGES_DATA.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSyringe(s)}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  selectedSyringe.id === s.id
                    ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                    {s.size}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: s.colorCode }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-1">
                  {s.subdivisions}
                </p>
              </button>
            ))}
          </div>

          {/* Detailed Syringe Visual Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Syringe SVG Graphic */}
              <div className="w-full md:w-1/2 flex justify-center py-2">
                <svg viewBox="0 0 320 80" className="w-full max-w-[280px] h-auto select-none">
                  {/* Needle tip & Hub */}
                  <line x1="20" y1="40" x2="65" y2="40" stroke="#94A3B8" strokeWidth="2.5" />
                  <polygon points="65,33 78,36 78,44 65,47" fill={selectedSyringe.colorCode} />
                  {/* Syringe Barrel */}
                  <rect x="78" y="24" width="160" height="32" rx="3" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" opacity="0.9" />
                  {/* Volume markings */}
                  {[95, 115, 135, 155, 175, 195, 215].map((x, i) => (
                    <g key={i}>
                      <line x1={x} y1="24" x2={x} y2={i % 2 === 0 ? "35" : "30"} stroke="#334155" strokeWidth="1.2" />
                    </g>
                  ))}
                  {/* Plunger */}
                  <rect x="180" y="27" width="55" height="26" fill="#0D9488" opacity="0.3" />
                  <rect x="235" y="28" width="50" height="24" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
                  <line x1="285" y1="20" x2="285" y2="60" stroke="#64748B" strokeWidth="3" />
                  {/* Text on syringe */}
                  <text x="135" y="44" fill="#0F172A" fontSize="10" fontWeight="bold">
                    {selectedSyringe.size}
                  </text>
                </svg>
              </div>

              {/* Syringe Info */}
              <div className="w-full md:w-1/2 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                    {selectedSyringe.nameTh} ({selectedSyringe.nameEn})
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                    ความจุ {selectedSyringe.size}
                  </span>
                </div>
                <div className="space-y-1">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">ขีดความละเอียด:</span>{' '}
                    <span className="text-slate-600 dark:text-slate-300">{selectedSyringe.subdivisions}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">ข้อบ่งใช้ทางคลินิก:</span>{' '}
                    <span className="text-slate-600 dark:text-slate-300">{selectedSyringe.typicalUses}</span>
                  </div>
                  <div className="text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-1.5 rounded border border-amber-200 dark:border-amber-800/40 mt-1">
                    <span className="font-bold">⚠️ ข้อควรจำ:</span> {selectedSyringe.importantNote}
                  </div>
                </div>
              </div>
            </div>

            {/* REAL PHOTO SECTION FOR SELECTED SYRINGE */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-teal-600" />
                  ภาพถ่ายกระบอกยาจริง: {selectedSyringe.size}
                </span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                  คลิกที่ภาพเพื่อขยายดูรายละเอียด
                </span>
              </div>

              {/* Real Photo Thumbnail */}
              <div
                onClick={() =>
                  setLightboxImage({
                    url: getSyringePhoto(selectedSyringe),
                    title: `ภาพกระบอกฉีดยาจริง: ${selectedSyringe.nameTh} (${selectedSyringe.size})`,
                    subtitle: `ขีดความละเอียด: ${selectedSyringe.subdivisions} | ${selectedSyringe.typicalUses}`,
                  })
                }
                className="relative h-40 sm:h-48 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 cursor-pointer group shadow-inner"
              >
                <img
                  src={getSyringePhoto(selectedSyringe)}
                  alt={`Real photo of ${selectedSyringe.size} syringe`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                  <span className="text-[11px] text-white font-medium flex items-center gap-1 bg-black/40 px-2 py-1 rounded-md backdrop-blur-xs">
                    <ZoomIn className="w-3.5 h-3.5" /> แตะเพื่อขยายภาพดูขีดบอกปริมาตรจริง
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
            * ให้เลือกกระบอกยาตามชนิดยา ปริมาตรยา และแนวทางของหน่วยงานเสมอ
          </p>
        </div>
      )}

      {/* 2. NEEDLES GAUGE VIEW */}
      {activeTab === 'needles' && (
        <div className="space-y-4">
          {/* Gauge Concept Notice */}
          <div className="p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl text-xs flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-bold text-teal-900 dark:text-teal-200">
                หลักการจำ Gauge (ขนาดรูเข็ม):
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                <strong>เลข Gauge ยิ่งมาก = รูเข็มยิ่งเล็ก</strong> (เช่น 27G เข็มเล็กมากสำหรับ ID/Insulin) |{' '}
                <strong>เลข Gauge ยิ่งน้อย = รูเข็มยิ่งใหญ่</strong> (เช่น 18G รูใหญ่สำหรับดูดยา/ผสมยา)
              </p>
            </div>
          </div>

          {/* Needles Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {NEEDLES_DATA.map(n => (
              <button
                key={n.gauge}
                onClick={() => setSelectedNeedle(n)}
                className={`p-2 rounded-xl text-center border transition-all ${
                  selectedNeedle.gauge === n.gauge
                    ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/50 shadow-sm ring-2 ring-teal-500/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full mx-auto mb-1.5 border border-white dark:border-slate-900 shadow-xs flex items-center justify-center text-[10px] text-white font-bold"
                  style={{ backgroundColor: n.hubColor }}
                >
                  •
                </div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-100 block">
                  {n.gauge}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                  {n.colorNameTh}
                </span>
              </button>
            ))}
          </div>

          {/* Selected Needle Detail */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-md"
                  style={{ backgroundColor: selectedNeedle.hubColor }}
                >
                  {selectedNeedle.gauge}
                </div>
                <span className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                  {selectedNeedle.colorNameTh}
                </span>
                <span className="text-[11px] text-slate-400">ความยาว: {selectedNeedle.lengthInch}</span>
              </div>

              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200">การใช้งานตามหลักการพยาบาล:</span>
                  <div className="flex gap-1">
                    {selectedNeedle.recommendedFor.map(r => (
                      <span key={r} className="px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 font-bold text-[10px]">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedNeedle.typicalUseTh}
                </p>
              </div>
            </div>

            {/* REAL PHOTO SECTION FOR SELECTED NEEDLE */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-teal-600" />
                  ภาพถ่ายเข็มจริง: {selectedNeedle.gauge} ({selectedNeedle.colorNameTh})
                </span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                  คลิกที่ภาพเพื่อขยายดูรายละเอียด
                </span>
              </div>

              {/* Real Needle Photo Thumbnail */}
              <div
                onClick={() =>
                  setLightboxImage({
                    url: getNeedlePhoto(selectedNeedle),
                    title: `ภาพเข็มฉีดยาจริง: เบอร์ ${selectedNeedle.gauge} (${selectedNeedle.colorNameTh})`,
                    subtitle: `ความยาว: ${selectedNeedle.lengthInch} | ${selectedNeedle.typicalUseTh}`,
                  })
                }
                className="relative h-40 sm:h-48 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 cursor-pointer group shadow-inner"
              >
                <img
                  src={getNeedlePhoto(selectedNeedle)}
                  alt={`Real photo of ${selectedNeedle.gauge} needle`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                  <span className="text-[11px] text-white font-medium flex items-center gap-1 bg-black/40 px-2 py-1 rounded-md backdrop-blur-xs">
                    <ZoomIn className="w-3.5 h-3.5" /> แตะเพื่อขยายภาพดูสีหัวเข็มและซองบรรจุจริง
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              <strong>คำเตือน:</strong> สีและขนาดอุปกรณ์อาจมีความแตกต่างกันได้ตามมาตรฐานของผู้ผลิตแต่ละราย ตรวจสอบฉลากบรรจุภัณฑ์เสมอก่อนใช้งาน
            </span>
          </div>
        </div>
      )}

      {/* 2.5 ROUTE COMPARISON VIEW (ตารางเปรียบเทียบการเลือกขนาดเข็มและกระบอกฉีดยา ช่องทางการฉีด) */}
      {activeTab === 'route-comparison' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Header Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-teal-950/40 dark:to-slate-900 border border-teal-300 dark:border-teal-700/60 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-teal-950 dark:text-teal-200">
                  ตารางเปรียบเทียบการเลือกขนาดเข็มและกระบอกฉีดยา ช่องทางการฉีด
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  แนวทางการเลือกขนาดหัวเข็ม (Gauge), ความยาวเข็ม (Length) และขนาดกระบอกฉีดยา (Syringe) ตามช่องทางการให้ยาในผู้ใหญ่และเด็ก
                </p>
              </div>
            </div>
          </div>

          {/* Desktop & Tablet Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                  <th className="p-3.5 w-1/4">ช่องทางการฉีด (Route)</th>
                  <th className="p-3.5 w-1/4">ขนาดเข็ม (ผู้ใหญ่)</th>
                  <th className="p-3.5 w-1/4">ขนาดเข็ม (เด็ก)</th>
                  <th className="p-3.5 w-1/4">ขนาดกระบอกฉีด (Syringe)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                {/* 1. ชั้นผิวหนัง (Intradermal) */}
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 align-top">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
                        ID
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">ชั้นผิวหนัง</span>
                        <span className="text-[10px] text-slate-400">Intradermal Injection (10°-15°)</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 align-top">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 font-bold text-emerald-800 dark:text-emerald-300 text-xs">
                      26 gauge
                    </span>
                  </td>
                  <td className="p-3.5 align-top">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 font-bold text-emerald-800 dark:text-emerald-300 text-xs">
                      26 gauge
                    </span>
                  </td>
                  <td className="p-3.5 align-top">
                    <div className="font-bold text-teal-700 dark:text-teal-300 text-xs">
                      tuberculin (1 mL)
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">ขีดละเอียด 0.01 mL สำหรับ 0.01 - 0.1 mL</span>
                  </td>
                </tr>

                {/* 2. ชั้นใต้ผิวหนัง (Subcutaneous) */}
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 align-top">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                        SC
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">ชั้นใต้ผิวหนัง</span>
                        <span className="text-[10px] text-slate-400">Subcutaneous Injection (45°-90°)</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 align-top">
                    <div className="font-bold text-amber-900 dark:text-amber-200 text-xs">
                      25 - 27 gauge
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">ยาว 3/8 - 5/8 นิ้ว</span>
                  </td>
                  <td className="p-3.5 align-top">
                    <div className="font-bold text-amber-900 dark:text-amber-200 text-xs">
                      27 gauge
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">ยาว 5/8 นิ้ว</span>
                  </td>
                  <td className="p-3.5 align-top">
                    <div className="font-bold text-teal-700 dark:text-teal-300 text-xs">
                      1 mL
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">หรือ Insulin Syringe (U-100)</span>
                  </td>
                </tr>

                {/* 3. ชั้นกล้ามเนื้อ (Intramuscular) */}
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 align-top">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold text-xs flex items-center justify-center shrink-0">
                        IM
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">ชั้นกล้ามเนื้อ</span>
                        <span className="text-[10px] text-slate-400">Intramuscular Injection (90°)</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 align-top">
                    <div className="font-bold text-teal-900 dark:text-teal-200 text-xs">
                      21 - 25 gauge
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">ยาว 1 - 1½ นิ้ว</span>
                  </td>
                  <td className="p-3.5 align-top">
                    <div className="font-bold text-teal-900 dark:text-teal-200 text-xs">
                      25 gauge
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">ยาว 1 นิ้ว</span>
                  </td>
                  <td className="p-3.5 align-top">
                    <div>
                      <span className="font-bold text-teal-800 dark:text-teal-200">ผู้ใหญ่:</span> 2 - 5 mL
                    </div>
                    <div className="mt-0.5">
                      <span className="font-bold text-teal-800 dark:text-teal-200">เด็ก:</span> 0.5 - 1 mL
                    </div>
                  </td>
                </tr>

                {/* 4. หลอดเลือดดำ (Intravenous) */}
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 align-top">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold text-xs flex items-center justify-center shrink-0">
                        IV
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">หลอดเลือดดำ</span>
                        <span className="text-[10px] text-slate-400">Intravenous Injection / Push / Drip</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 align-top">
                    <div className="space-y-1">
                      <div>
                        <span className="font-bold text-sky-900 dark:text-sky-200 block">• ฉีดเข้า injection plug / สายน้ำเกลือ:</span>{' '}
                        <span className="inline-block px-1.5 py-0.5 rounded bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 font-bold text-sky-700 dark:text-sky-300">
                          เข็มขนาด 27 gauge
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-sky-900 dark:text-sky-200 block">• ฉีดเข้าจุกปิด เปิด 3 ทาง (Three-way):</span>{' '}
                        <span className="text-amber-700 dark:text-amber-400 font-bold">ไม่ต้องใส่หัวเข็ม</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 align-top">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                      เช่นเดียวกับผู้ใหญ่
                    </span>
                  </td>
                  <td className="p-3.5 align-top">
                    <div className="font-bold text-sky-800 dark:text-sky-200 text-xs">
                      ตามขนาดยา
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">เลือกกระบอกฉีดตามปริมาตรยาและสารละลายเจือจาง</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quick Guidance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 text-xs space-y-1">
              <span className="font-bold text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                หลักการจำความสัมพันธ์ Gauge & ช่องทาง
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                ID (26G) &gt; SC (25-27G) &gt; IM (21-25G) : ยิ่งต้องการฉีดลึกเข้าชั้นกล้ามเนื้อ ต้องใช้เข็มที่ยาวขึ้นและขนาดรูเข็ม (G) ที่เหมาะสมเพื่อลดแรงต้าน
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
              <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                ความปลอดภัยกรณีให้ยาทาง IV
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                การต่อ Syringe เข้ากับ Three-way Stopcock โดยตรงโดยไม่ต้องใช้เข็ม ช่วยป้องกันอุบัติเหตุเข็มทิ่มตำ (Needlestick Injury) ตามมาตรฐานสากล
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. DOSAGE CALCULATION VIEW (การคำนวณยาฉีด 2 วิธี) */}
      {activeTab === 'dosage-calc' && <DosageCalculationVisual />}

      {/* 4. VIAL VS AMPULE VIEW (ORIGINAL - PRESERVED) */}
      {activeTab === 'vial-ampule' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vial Card */}
            <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧴</span>
                  <div>
                    <h4 className="font-bold text-sm text-sky-900 dark:text-sky-200">
                      ขวดยาไวอัล (Vial)
                    </h4>
                    <p className="text-[11px] text-sky-700 dark:text-sky-300">
                      Closed System ขวดแก้ว/พลาสติกที่มียางเจาะ
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-sky-200 dark:bg-sky-900 text-sky-800 dark:text-sky-200">
                  มีจุกยาง
                </span>
              </div>

              {/* Vial Graphic */}
              <div className="flex justify-center py-2">
                <svg viewBox="0 0 100 120" className="w-20 h-auto select-none">
                  {/* Cap / Flip-off */}
                  <rect x="35" y="10" width="30" height="8" rx="2" fill="#0284C7" />
                  {/* Rubber stopper */}
                  <rect x="40" y="18" width="20" height="10" fill="#475569" />
                  {/* Neck */}
                  <rect x="38" y="28" width="24" height="12" fill="#CBD5E1" stroke="#94A3B8" />
                  {/* Body */}
                  <rect x="25" y="40" width="50" height="70" rx="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" opacity="0.9" />
                  {/* Liquid */}
                  <rect x="27" y="65" width="46" height="43" rx="4" fill="#38BDF8" opacity="0.4" />
                  {/* Label */}
                  <rect x="28" y="50" width="44" height="30" fill="#FFFFFF" stroke="#CBD5E1" />
                  <text x="50" y="66" fill="#0F172A" fontSize="7" fontWeight="bold" textAnchor="middle">DRUG VIAL</text>
                </svg>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
                  <span><strong>หลักสำคัญ:</strong> ต้องดันลมเข้าไปเท่ากับปริมาตรยาที่จะดูด (Equal Air Displacement) เพื่อปรับความดันสุญญากาศ</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
                  <span><strong>Aseptic:</strong> เช็ดจุกยางด้วย 70% Alcohol นาน 15 วินาที และรอให้แห้งสนิทก่อนแทงเข็ม</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
                  <span>มีทั้งแบบ Single-dose และ Multi-dose (ต้องลงวัน-เวลาเปิดขวด)</span>
                </div>
              </div>
            </div>

            {/* Ampule Card */}
            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧪</span>
                  <div>
                    <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200">
                      หลอดยาแอมพูล (Ampule)
                    </h4>
                    <p className="text-[11px] text-amber-700 dark:text-amber-300">
                      Open System หลอดแก้วล้วน ปิดผนึกด้วยความร้อน
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                  หลอดแก้ว
                </span>
              </div>

              {/* Ampule Graphic */}
              <div className="flex justify-center py-2">
                <svg viewBox="0 0 100 120" className="w-20 h-auto select-none">
                  {/* Head */}
                  <path d="M 40 25 C 40 12, 60 12, 60 25 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
                  {/* Constricted Neck (Break point) */}
                  <rect x="46" y="25" width="8" height="12" fill="#E2E8F0" stroke="#64748B" />
                  {/* Colored break dot or ring */}
                  <circle cx="50" cy="31" r="2" fill="#EF4444" />
                  {/* Body */}
                  <path d="M 32 45 C 32 37, 68 37, 68 45 L 68 110 C 68 115, 32 115, 32 110 Z" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" opacity="0.9" />
                  {/* Liquid inside */}
                  <rect x="34" y="65" width="32" height="45" rx="3" fill="#FBBF24" opacity="0.45" />
                  <text x="50" y="85" fill="#78350F" fontSize="7" fontWeight="bold" textAnchor="middle">AMPULE</text>
                </svg>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <span><strong>ห้ามอัดลม:</strong> เมื่อหักแล้วเป็นระบบเปิด ห้ามดันลมเข้าไปเด็ดขาด น้ำยาจะพุ่งกระจาย</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <span><strong>Filter Needle:</strong> ควรใช้เข็มกรอง (Filter Needle) ดูดยาออกจาก Ampule เสมอเพื่อป้องกันเศษแก้วขนาดเล็ก</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <span>ก่อนฉีดผู้ป่วย <strong>ต้องเปลี่ยนเป็นเข็มฉีดยาธรรมดา</strong> ห้ามใช้ Filter needle ฉีดเข้าผู้ป่วย</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SAFE AMPULE TECHNIQUE (ORIGINAL - PRESERVED) */}
      {activeTab === 'safe-ampule' && (
        <div className="space-y-3">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl">
            <h4 className="font-bold text-xs text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-teal-600" />
              ขั้นตอนการหัก Ampule อย่างปลอดภัย ป้องกันบาดแผลจากเศษแก้ว
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs mb-1">
                1
              </div>
              <p className="font-semibold text-slate-800 dark:text-slate-100">เคาะน้ำยาลงก้นหลอด</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                ดีดหรือเคาะเบาๆ ที่ส่วนยอดของ Ampule ให้น้ำยาที่ค้างอยู่บริเวณคอหลอดไหลลงสู่ส่วนล่างจนหมด
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs mb-1">
                2
              </div>
              <p className="font-semibold text-slate-800 dark:text-slate-100">ใช้ Gauze / Swab หุ้มคอหลอด</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                นำผ้าก๊อซหรือสำลีชุบแอลกอฮอล์มาหุ้มรอบคอ Ampule เพื่อป้องกันไม่ให้เศษแก้วบาดนิ้วมือ
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs mb-1">
                3
              </div>
              <p className="font-semibold text-slate-800 dark:text-slate-100">หักออกจากตัว (Break Away)</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                ออกแรงหักคอหลอดแก้ว <strong>พุ่งทิศทางออกจากร่างกาย</strong> ไม่หักเข้าหาหน้าหรือตัวเด็ดขาด
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs mb-1">
                4
              </div>
              <p className="font-semibold text-slate-800 dark:text-slate-100">ทิ้งหัว Ampule ลงถัง Sharps</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                ทิ้งชิ้นส่วนยอดแอมพูลลงในกล่องทิ้งของมีคมทันที แล้วใช้ Filter needle ดูดยา
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Full-res Equipment Inspection */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden max-w-2xl w-full border border-slate-700 shadow-2xl space-y-0"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-teal-300">{lightboxImage.title}</h3>
                <p className="text-xs text-slate-400">{lightboxImage.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2 bg-slate-950 flex items-center justify-center">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="p-3 bg-slate-100 dark:bg-slate-900 text-center text-xs text-slate-500 dark:text-slate-400">
              💡 ตรวจสอบวันหมดอายุ (EXP) และความสมบูรณ์ของซองปลอดเชื้อก่อนนำมาใช้งานจริงเสมอ
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
