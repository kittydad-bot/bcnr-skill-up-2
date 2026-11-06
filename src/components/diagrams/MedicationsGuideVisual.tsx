import React, { useState } from 'react';
import {
  Pill,
  AlertTriangle,
  ShieldAlert,
  Info,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Syringe,
  Sparkles,
  Flame,
  Activity,
  HeartPulse,
  Clock,
  Thermometer,
  Layers,
  ArrowRight,
  Eye,
} from 'lucide-react';

export const MedicationsGuideVisual: React.FC = () => {
  // Collapsible section states (accordion/tabs)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    insulin: true,
    antibiotics: false,
    analgesics: false,
    emergency: false,
  });

  // Interactive Insulin Syringe Scale Simulator State
  const [selectedSyringeCapacity, setSelectedSyringeCapacity] = useState<'30' | '50' | '100'>('50');
  const [selectedUnits, setSelectedUnits] = useState<number>(14);

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Unit subdivisions rule for Insulin Syringes
  const getSubdivisionInfo = (capacity: '30' | '50' | '100') => {
    switch (capacity) {
      case '30':
        return {
          title: 'กระบอก 30 Units (0.3 mL)',
          step: 1,
          max: 30,
          markDesc: '1 ขีดเล็ก = 1 Unit (หรือ 0.5 Unit ในบางรุ่น)',
          safetyText: 'เหมาะมากสำหรับผู้ป่วยเด็ก หรือผู้ใหญ่ที่ใช้ขนาดยาน้อย อ่านค่าแม่นยำ ไม่คลาดเคลื่อน',
          color: 'teal',
        };
      case '50':
        return {
          title: 'กระบอก 50 Units (0.5 mL)',
          step: 1,
          max: 50,
          markDesc: '1 ขีดเล็ก = 1 Unit',
          safetyText: 'ขนาดมาตรฐานยอดนิยม อ่านง่าย ขีดละ 1 ยูนิตอย่างชัดเจน ลดข้อผิดพลาด',
          color: 'emerald',
        };
      case '100':
        return {
          title: 'กระบอก 100 Units (1.0 mL)',
          step: 2,
          max: 100,
          markDesc: '⚠️ 1 ขีดเล็ก = 2 Units (ระวังอย่างสูง!)',
          safetyText: '⚠️ ข้อควรระวังสูงสุด: ขีดละ 2 ยูนิต ห้ามนับผิดเป็นขีดละ 1 ยูนิต เพราะผู้ป่วยจะได้ยาเกินขนาด 2 เท่า เสี่ยงภาวะน้ำตาลในเลือดต่ำรุนแรง (Severe Hypoglycemia)!',
          color: 'rose',
        };
    }
  };

  const currentScale = getSubdivisionInfo(selectedSyringeCapacity);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. TOP HEADER BANNER */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-50 via-cyan-50 to-indigo-50 dark:from-slate-900 dark:via-teal-950/40 dark:to-slate-900 border-2 border-teal-500/30 dark:border-teal-700/50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/30 shrink-0">
            <Pill className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                คู่มือยาฉีดสำคัญทางคลินิก (Essential Injectable Medications Guide)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-600 text-white">
                4 กลุ่มยาหลัก
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
              ข้อมูลเบื้องต้น, ผลข้างเคียง (Side Effects), สัญญาณการแพ้ยา, ข้อควรระวังพิเศษ และเทคนิคการบริหารยาความเสี่ยงสูง
            </p>
          </div>
        </div>
      </div>

      {/* QUICK JUMP CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-xs font-bold text-slate-400 shrink-0">เลือกกลุ่มยา:</span>
        <button
          onClick={() => {
            setOpenSections({ insulin: true, antibiotics: false, analgesics: false, emergency: false });
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
            openSections.insulin
              ? 'bg-teal-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50'
          }`}
        >
          <Syringe className="w-3.5 h-3.5" />
          อินซูลิน (Insulin) ⭐ ละเอียด
        </button>
        <button
          onClick={() => {
            setOpenSections({ insulin: false, antibiotics: true, analgesics: false, emergency: false });
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
            openSections.antibiotics
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          ยาฆ่าเชื้อ (Antibiotics)
        </button>
        <button
          onClick={() => {
            setOpenSections({ insulin: false, antibiotics: false, analgesics: true, emergency: false });
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
            openSections.analgesics
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-50'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          ยาแก้ปวด (Analgesics)
        </button>
        <button
          onClick={() => {
            setOpenSections({ insulin: false, antibiotics: false, analgesics: false, emergency: true });
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
            openSections.emergency
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50'
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5" />
          ยาฉุกเฉิน & หัวใจ (Emergency)
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. GROUP 1: INSULIN (อินซูลิน) - HIGHEST DETAIL ACCORDING TO USER PROMPT */}
      {/* ========================================================================= */}
      <div className="rounded-2xl border-2 border-teal-500/40 dark:border-teal-600/40 bg-white dark:bg-slate-850 shadow-sm overflow-hidden">
        {/* Accordion Header */}
        <button
          onClick={() => toggleSection('insulin')}
          className="w-full p-4 sm:p-5 text-left bg-teal-50/70 dark:bg-teal-950/40 hover:bg-teal-100/70 dark:hover:bg-teal-900/40 transition-colors flex items-center justify-between border-b border-teal-100 dark:border-teal-900"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              💉
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-black text-base sm:text-lg text-teal-950 dark:text-teal-100">
                  1. อินซูลิน (Insulin & Diabetes Injections)
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-600 text-white animate-pulse">
                  High-Alert Drug (HAD)
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
                การคำนวณยา, การดูสเกลไซริงค์ และเทคนิคการฉีด SC
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-700 dark:text-teal-300 hidden sm:inline">
              {openSections.insulin ? 'ย่อข้อมูล' : 'แสดงรายละเอียด'}
            </span>
            {openSections.insulin ? (
              <ChevronUp className="w-5 h-5 text-teal-700 dark:text-teal-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-teal-700 dark:text-teal-300" />
            )}
          </div>
        </button>

        {/* Collapsible Content */}
        {openSections.insulin && (
          <div className="p-4 sm:p-6 space-y-6">
            {/* Overview / Indication & Mechanism */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-teal-800 dark:text-teal-300">
                  <Info className="w-4 h-4 text-teal-600" />
                  <span>ข้อมูลเบื้องต้น & ข้อบ่งใช้ (Basic Information):</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  ฮอร์โมนลดระดับน้ำตาลในเลือด โดยพากลูโคสเข้าสู่เซลล์กล้ามเนื้อและไขมัน และยับยั้งการสร้างน้ำตาลจากตับ ใช้รักษาโรคเบาหวานชนิดที่ 1 (Type 1 DM), โรคเบาหวานชนิดที่ 2 (Type 2 DM) ที่ควบคุมไม่ได้, ภาวะเบาหวานขณะตั้งครรภ์ (GDM), และภาวะกรดคีโตนคั่ง (DKA) หรือโพแทสเซียมในเลือดสูง (Hyperkalemia)
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>ผลข้างเคียง & ลักษณะการแพ้ยา (Side Effects & Allergy):</span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
                  <p>
                    • <strong>ภาวะน้ำตาลต่ำ (Hypoglycemia):</strong> เหงื่อแตก ตัวเย็น มือสั่น ใจสั่น เวียนศีรษะ สับสน ชัก หมดสติ (หากรู้สึกตัวให้ดื่มน้ำหวาน/อมลูกอมทันที)
                  </p>
                  <p>
                    • <strong>Lipodystrophy / Lipohypertrophy:</strong> ก้อนไขมันหรือรอยบุ๋มใต้ผิวหนังจากการฉีดซ้ำตำแหน่งเดิม
                  </p>
                  <p>
                    • <strong>อาการแพ้ยา:</strong> ผื่นลมพิษ คัน แดงเฉพาะที่ หรือแพ้รุนแรง (Anaphylaxis: หายใจลำบาก แน่นหน้าอก บวมรอบปาก)
                  </p>
                </div>
              </div>
            </div>

            {/* A. การคำนวณยาอินซูลิน (Insulin Dose Calculation) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-teal-200 dark:border-teal-800">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-600 text-white text-xs font-black flex items-center justify-center">
                    A
                  </span>
                  <h5 className="font-black text-sm sm:text-base text-slate-900 dark:text-slate-100">
                    การคำนวณยาอินซูลิน (Insulin Dose Calculation)
                  </h5>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">
                  มาตรฐานความเข้มข้น U-100 (100 Units / 1 mL)
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                {/* Regular vs Sliding Scale */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-bold text-teal-800 dark:text-teal-300 block">
                    1. การเทียบยูนิตเป็นปริมาตร (Units to mL):
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    อินซูลินในโรงพยาบาลและคลินิกปัจจุบันคือ <strong>U-100</strong> หมายถึงมีตัวยา <strong>100 ยูนิตในน้ำยา 1 mL</strong>
                  </p>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 font-mono text-slate-800 dark:text-slate-200 space-y-1">
                    <p>• สั่งฉีด 10 Units = 10 / 100 = <strong>0.10 mL</strong></p>
                    <p>• สั่งฉีด 24 Units = 24 / 100 = <strong>0.24 mL</strong></p>
                    <p className="text-teal-700 dark:text-teal-300 font-bold">
                      → ใช้ Insulin Syringe ชนิด U-100 ดูดตามขีด Unit ได้โดยตรง ไม่ต้องแปลงเป็น mL!
                    </p>
                  </div>
                </div>

                {/* Mixing Insulin (ใสก่อนขุ่น) */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-bold text-indigo-800 dark:text-indigo-300 block">
                    2. ขั้นตอนการผสมอินซูลิน 2 ชนิดในหลอดเดียว (Clear before Cloudy - ใสก่อนขุ่น):
                  </span>
                  <div className="space-y-1 text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    <p>1. กลิ้งขวดขุ่น (NPH) บนฝ่ามือเบาๆ 10-20 ครั้ง (ห้ามเขย่า)</p>
                    <p>2. ดันลมเท่าขนาดยา NPH เข้า <strong>ขวดขุ่น</strong> แล้วดึงเข็มออก (ยังไม่ดูดยา)</p>
                    <p>3. ดันลมเท่าขนาดยา RI เข้า <strong>ขวดใส</strong> แล้วคว่ำขวด <strong>ดูดยาใส (RI) ก่อน</strong> ให้ครบ</p>
                    <p>4. นำเข็มไปแทงขวดขุ่น (NPH) คว่ำขวด แล้ว <strong>ดูดยาขุ่นตามขนาดยารวม</strong> อย่างแม่นยำ</p>
                    <p className="text-rose-600 dark:text-rose-400 font-bold text-[11px]">
                      ⚠️ กฎเหล็ก: หากดูดยาขุ่นเกิน ห้ามดันยากลับเข้าขวดเด็ดขาด! ต้องทิ้งและเริ่มเตรียมใหม่ทันที
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* B. การดูสเกลยาต่อยูนิตไซริ้ง (Insulin Syringe Scale Reading) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center justify-center">
                    B
                  </span>
                  <h5 className="font-black text-sm sm:text-base text-slate-900 dark:text-slate-100">
                    การดูสเกลยาต่อยูนิตไซริงค์ (Insulin Syringe Scale Reading Simulator)
                  </h5>
                </div>
                <span className="text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> ห้ามใช้ Syringe ชนิดอื่นฉีดอินซูลินเด็ดขาด
                </span>
              </div>

              {/* Syringe Capacity Selector */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  เลือกขนาดกระบอกฉีดยาอินซูลิน (Insulin Syringe Sizes):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setSelectedSyringeCapacity('30');
                      if (selectedUnits > 30) setSelectedUnits(15);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedSyringeCapacity === '30'
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm text-slate-900 dark:text-slate-100">0.3 mL (30 Units)</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">
                        ขีดละ 1 Unit
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      เหมาะกับเด็กหรือผู้ใหญ่ที่ฉีดไม่เกิน 30 ยูนิต
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedSyringeCapacity('50');
                      if (selectedUnits > 50) setSelectedUnits(25);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedSyringeCapacity === '50'
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm text-slate-900 dark:text-slate-100">0.5 mL (50 Units)</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                        ขีดละ 1 Unit
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      ขนาดยอดนิยม อ่านง่าย แม่นยำ ฉีดไม่เกิน 50 ยูนิต
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedSyringeCapacity('100');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedSyringeCapacity === '100'
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm text-slate-900 dark:text-slate-100">1.0 mL (100 Units)</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-600 text-white animate-pulse">
                        ⚠️ ขีดละ 2 Units!
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      ⚠️ 1 ขีดเล็ก = 2 ยูนิต ห้ามนับผิดเด็ดขาด!
                    </p>
                  </button>
                </div>
              </div>

              {/* Interactive Scale Adjuster Slider */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    ทดลองเลื่อนปรับขนาดยาที่ต้องการดูด:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">ขนาดยา:</span>
                    <span className="text-lg font-black text-teal-700 dark:text-teal-400 font-mono">
                      {selectedUnits} Units
                    </span>
                    <span className="text-xs text-slate-400">
                      ({(selectedUnits / 100).toFixed(2)} mL)
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max={currentScale.max}
                  step={selectedSyringeCapacity === '100' ? 2 : 1}
                  value={selectedUnits}
                  onChange={e => setSelectedUnits(parseInt(e.target.value) || 0)}
                  className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />

                {/* Graphical Syringe Barrel Scale Representation */}
                <div className="p-4 rounded-xl bg-slate-950 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-1 border-b border-slate-800">
                    <span>0 U (จุดเริ่มต้นขอบลูกสูบ)</span>
                    <span className="text-teal-400 font-bold">
                      ตำแหน่งขอบยางดำหน้า: {selectedUnits} Units
                    </span>
                    <span>{currentScale.max} U</span>
                  </div>

                  {/* Visual Barrel */}
                  <div className="relative h-12 bg-slate-900 rounded-lg border-2 border-slate-700 overflow-hidden flex items-center px-1">
                    {/* Liquid fill */}
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 opacity-80 transition-all duration-150 rounded-l"
                      style={{ width: `${(selectedUnits / currentScale.max) * 100}%` }}
                    />
                    {/* Plunger Rubber Stopper */}
                    <div
                      className="absolute top-0 bottom-0 w-3 bg-slate-300 border-x-2 border-slate-600 shadow-md transition-all duration-150"
                      style={{ left: `calc(${(selectedUnits / currentScale.max) * 100}% - 6px)` }}
                    />
                  </div>

                  <div className="text-[11px] text-slate-300 flex items-center justify-between">
                    <span>{currentScale.markDesc}</span>
                    <span className="text-teal-300 font-bold">
                      {selectedSyringeCapacity === '100'
                        ? `นับขีดเล็กได้: ${selectedUnits / 2} ขีด`
                        : `นับขีดเล็กได้: ${selectedUnits} ขีด`}
                    </span>
                  </div>
                </div>

                {/* Safety Warning for 100 Units syringe */}
                <div
                  className={`p-3 rounded-xl text-xs font-semibold ${
                    selectedSyringeCapacity === '100'
                      ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                      : 'bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200'
                  }`}
                >
                  {currentScale.safetyText}
                </div>
              </div>
            </div>

            {/* C. เทคนิคการฉีดอินซูลิน (Insulin Injection Technique) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-teal-200 dark:border-teal-800">
                <span className="w-6 h-6 rounded-lg bg-teal-600 text-white text-xs font-black flex items-center justify-center">
                  C
                </span>
                <h5 className="font-black text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  เทคนิคและมาตรฐานการฉีดอินซูลิน (Standard SC Injection Techniques)
                </h5>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="font-bold text-teal-800 dark:text-teal-300 block">
                    📍 ตำแหน่ง & อัตราการดูดซึม:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    • <strong>หน้าท้อง (Abdomen):</strong> ดูดซึมเร็วและสม่ำเสมอที่สุด (เว้นรอบสะดือ 2 นิ้ว หรือ 5 cm)
                    <br />• <strong>ต้นแขนด้านนอก (Arms):</strong> ดูดซึมปานกลาง
                    <br />• <strong>หน้าขา (Thighs) และสะโพก (Buttocks):</strong> ดูดซึมช้าที่สุด เหมาะสำหรับยาฉีดก่อนนอน
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="font-bold text-teal-800 dark:text-teal-300 block">
                    🔄 การหมุนเวียนตำแหน่ง (Rotation):
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    ห้ามฉีดซ้ำที่เดิมติดต่อกัน! ให้หมุนเวียนห่างจากจุดเดิมอย่างน้อย 1 นิ้ว (2.5 cm) และใช้ตารางบันทึก หรือแบ่งหน้าท้องเป็น 4 Quadrants เพื่อป้องกันการเกิดก้อนไขมันแข็งใต้ผิวหนัง (Lipohypertrophy)
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="font-bold text-teal-800 dark:text-teal-300 block">
                    📐 มุมฉีด & ความลึก:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    • เข็มสั้น 4-6 mm (เข็มปากกา): แทงมุม 90° ตรง ไม่จำเป็นต้องยกผิวหนัง (ยกเว้นคนผอมมาก)
                    <br />• เข็ม 8-12.7 mm (เข็มไซริงค์): ดึงยกผิวหนัง (Pinch skin) แทงมุม 45° หรือ 90° เข้าชั้นใต้ผิวหนัง (SC)
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="font-bold text-rose-700 dark:text-rose-300 block">
                    ❌ ห้าม Aspirate (ไม่ต้องดึงดูเลือด):
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    การฉีดอินซูลินเข้าชั้น SC <strong>ไม่ต้องดึงลูกสูบดูเลือด (No aspiration needed)</strong> เพราะชั้นไขมันไม่มีเส้นเลือดใหญ่ การดึงลูกสูบจะทำให้เนื้อเยื่อบอบช้ำและเสี่ยงต่อการเกิดรอยช้ำ
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 block">
                    ⏱️ กดค้างไว้ 6-10 วินาที:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    กรณีใช้ปากกาอินซูลิน (Insulin Pen) หลังกดปุ่มยาจนสุดเลข 0 แล้ว <strong>ต้องกดปุ่มค้างไว้และนับ 1 ถึง 10 วินาทีในใจก่อนถอนเข็ม</strong> เพื่อให้ยาไหลเข้าใต้ผิวหนังครบทุกหยด ป้องกันยาย้อนไหลออก
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="font-bold text-amber-700 dark:text-amber-300 block">
                    🚫 ห้ามนวดหรือคลึงบริเวณฉีด:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    หลังถอนเข็ม ให้ใช้สำลีกดเบาๆ ได้ แต่ <strong>ห้ามนวดหรือคลึงเป็นอันขาด</strong> เพราะการนวดจะเพิ่มการไหลเวียนเลือด ทำให้ยาดูดซึมเร็วเกินไป เกิดภาวะน้ำตาลในเลือดตกเฉียบพลันได้
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. GROUP 2: ANTIBIOTICS (ยาฆ่าเชื้อ / ยาปฏิชีวนะ) */}
      {/* ========================================================================= */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('antibiotics')}
          className="w-full p-4 sm:p-5 text-left bg-blue-50/60 dark:bg-blue-950/30 hover:bg-blue-100/60 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-between border-b border-blue-100 dark:border-blue-900"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              🦠
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-black text-base sm:text-lg text-blue-950 dark:text-blue-100">
                  2. ยาฆ่าเชื้อ / ยาปฏิชีวนะ (Antibiotics & Antimicrobials)
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                  Skin Test & Allergy Watch
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
                Ceftriaxone, Ampicillin, Gentamicin, Vancomycin - ข้อควรระวังและการสังเกตอาการแพ้
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 hidden sm:inline">
              {openSections.antibiotics ? 'ย่อข้อมูล' : 'แสดงรายละเอียด'}
            </span>
            {openSections.antibiotics ? (
              <ChevronUp className="w-5 h-5 text-blue-700 dark:text-blue-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-700 dark:text-blue-300" />
            )}
          </div>
        </button>

        {openSections.antibiotics && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-xs text-blue-800 dark:text-blue-300 block">
                  📌 ข้อมูลเบื้องต้น & กลุ่มยาสำคัญ:
                </span>
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium leading-relaxed">
                  <p>• <strong>Cephalosporins (เช่น Ceftriaxone, Cefazolin):</strong> ฉีด IV/IM รักษาการติดเชื้อแบคทีเรียหลากหลายระบบ</p>
                  <p>• <strong>Penicillins (เช่น Ampicillin, Penicillin G):</strong> เสี่ยงต่อการแพ้สูงสุด</p>
                  <p>• <strong>Aminoglycosides (เช่น Gentamicin, Amikacin):</strong> พิษต่อไต (Nephrotoxicity) และหูชั้นใน (Ototoxicity)</p>
                  <p>• <strong>Glycopeptides (เช่น Vancomycin):</strong> ต้องให้แบบ IV Drip ช้าๆ อย่างน้อย 60 นาที</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-2">
                <span className="font-bold text-xs text-rose-800 dark:text-rose-300 block">
                  🚨 สัญญาณการแพ้ยาและ Anaphylaxis:
                </span>
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium leading-relaxed">
                  <p>• <strong>อาการทางผิวหนัง:</strong> ผื่นแดง คัน ลมพิษ (Urticaria), บวมรอบตาและริมฝีปาก (Angioedema)</p>
                  <p>• <strong>อาการทางระบบหายใจ:</strong> แน่นหน้าอก หายใจเสียงหวีด (Wheezing), หายใจมีเสียงฮืด (Stridor), เสียงแหบ</p>
                  <p>• <strong>ระบบหัวใจและหลอดเลือด:</strong> ความดันโลหิตตกเฉียบพลัน (Shock), หน้ามืด เป็นลม ชีพจรเต้นเร็วและเบา</p>
                  <p className="text-rose-600 dark:text-rose-400 font-bold">
                    → หากเกิดอาการ หยุดยาทันที! รายงานแพทย์ เตรียม Adrenaline 1:1,000 ฉีด IM ที่กล้ามเนื้อหน้าขาทันที
                  </p>
                </div>
              </div>
            </div>

            {/* ข้อควรระวังในการฉีดยาฆ่าเชื้อ */}
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 space-y-2 text-xs">
              <span className="font-bold text-blue-900 dark:text-blue-200 block">
                🛡️ ข้อควรระวังพิเศษในการบริหารยาฆ่าเชื้อ:
              </span>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                <li>
                  <strong>ซักประวัติการแพ้ยาอย่างละเอียด:</strong> ถามชื่อยา อาการแพ้ที่เคยเป็น และตรวจป้ายข้อมือผู้ป่วย (Allergy Band) ทุกครั้ง
                </li>
                <li>
                  <strong>การผสมยา (Reconstitution):</strong> ละลายผงยาให้ละลายหมด ไม่เป็นตะกอน ตรวจสอบสารละลายที่เข้ากันได้ (Compatibility) เช่น Ceftriaxone <strong>ห้ามผสมกับสารน้ำที่มีแคลเซียม (Calcium-containing solutions เช่น Ringer's lactate)</strong> เพราะจะเกิดตะกอนแคลเซียมอุดตันในปอดและไต
                </li>
                <li>
                  <strong>Red Man Syndrome จาก Vancomycin:</strong> หากฉีดหรือดริปเร็วเกินไป จะเกิดผิวหนังแดง ร้อนวูบวาบ และความดันตก ต้องให้ IV Infusion ช้าๆ ไม่น้อยกว่า 60 นาที
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. GROUP 3: ANALGESICS (ยาแก้ปวด - OPIOIDS & NSAIDS) */}
      {/* ========================================================================= */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('analgesics')}
          className="w-full p-4 sm:p-5 text-left bg-purple-50/60 dark:bg-purple-950/30 hover:bg-purple-100/60 dark:hover:bg-purple-900/30 transition-colors flex items-center justify-between border-b border-purple-100 dark:border-purple-900"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              💊
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-black text-base sm:text-lg text-purple-950 dark:text-purple-100">
                  3. ยาแก้ปวด (Analgesics & Opioids)
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-600 text-white">
                  Narcotic / Respiratory Watch
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
                Morphine, Pethidine, Fentanyl, Tramadol, Ketorolac - การประเมินสัญญาณชีพและ Antidote
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 hidden sm:inline">
              {openSections.analgesics ? 'ย่อข้อมูล' : 'แสดงรายละเอียด'}
            </span>
            {openSections.analgesics ? (
              <ChevronUp className="w-5 h-5 text-purple-700 dark:text-purple-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-purple-700 dark:text-purple-300" />
            )}
          </div>
        </button>

        {openSections.analgesics && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-xs text-purple-800 dark:text-purple-300 block">
                  📌 ข้อมูลเบื้องต้น & กลไกการออกฤทธิ์:
                </span>
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium leading-relaxed">
                  <p>• <strong>Opioids (Morphine, Pethidine, Fentanyl):</strong> จับกับ Mu-opioid receptors ในระบบประสาทส่วนกลาง ระงับความเจ็บปวดรุนแรง (Pain score 7-10)</p>
                  <p>• <strong>Tramadol:</strong> ยาแก้ปวดระดับปานกลาง ออกฤทธิ์แบบผสมผสาน</p>
                  <p>• <strong>Injectable NSAIDs (Ketorolac, Dynastat):</strong> ลดการสร้าง Prostaglandins ลดการอักเสบและปวด</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
                <span className="font-bold text-xs text-amber-800 dark:text-amber-300 block">
                  ⚠️ ผลข้างเคียงสำคัญ (Side Effects):
                </span>
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium leading-relaxed">
                  <p>• <strong>กดการหายใจ (Respiratory Depression):</strong> หายใจช้ากว่า 10-12 ครั้ง/นาที รูม่านตาหดเล็กเป็นจุด (Pinpoint pupils)</p>
                  <p>• <strong>ความดันโลหิตต่ำและหัวใจเต้นช้า:</strong> เกิดขึ้นได้บ่อยเมื่อฉีด IV push เร็วเกินไป</p>
                  <p>• <strong>คลื่นไส้ อาเจียน ท้องผูก ง่วงซึม:</strong> เกิดจากการกระตุ้น CTZ ในสมอง</p>
                </div>
              </div>
            </div>

            {/* ข้อควรระวังและยาแก้พิษ */}
            <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 space-y-2 text-xs">
              <span className="font-bold text-purple-900 dark:text-purple-200 block">
                🛡️ กฎความปลอดภัยและการบริหารยาแก้ปวด:
              </span>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                <li>
                  <strong>วัดอัตราการหายใจ (Respiration Rate) และ Pain Score:</strong> ก่อนฉีดทุกครั้ง หากการหายใจ <strong>&lt; 10-12 ครั้ง/นาที ให้งดฉีดยา และรายงานแพทย์ทันที</strong>
                </li>
                <li>
                  <strong>เจือจางและฉีดช้าๆ (Slow IV Push):</strong> เช่น Morphine ควรเจือจางด้วย NSS ให้ได้ความเข้มข้น 1 mg/mL และฉีดช้าๆ นานอย่างน้อย 4-5 นาที
                </li>
                <li>
                  <strong>ยาต้านฤทธิ์/แก้พิษ (Specific Antidote):</strong> สำหรับยากลุ่ม Opioids คือ <strong>Naloxone (Narcan)</strong> ต้องเตรียมพร้อมใช้งานเสมอในหอผู้ป่วย
                </li>
                <li>
                  <strong>Double Check ยาเสพติดให้โทษ:</strong> พยาบาลวิชาชีพ 2 ท่านต้องร่วมตรวจสอบคำสั่งแพทย์ ขนาดยา และลงชื่อเบิก-จ่ายในสมุดควบคุมยาเสพติดเสมอ
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5. GROUP 4: EMERGENCY & CARDIOVASCULAR (ยาฉุกเฉินและระบบหัวใจหลอดเลือด) */}
      {/* ========================================================================= */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('emergency')}
          className="w-full p-4 sm:p-5 text-left bg-rose-50/60 dark:bg-rose-950/30 hover:bg-rose-100/60 dark:hover:bg-rose-900/30 transition-colors flex items-center justify-between border-b border-rose-100 dark:border-rose-900"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              🚨
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-black text-base sm:text-lg text-rose-950 dark:text-rose-100">
                  4. ยาฉุกเฉินและระบบหัวใจ (Emergency & Cardiovascular Drugs)
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                  Life-Saving Drugs
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
                Adrenaline (Epinephrine), Atropine, Furosemide, Heparin/Enoxaparin
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-300 hidden sm:inline">
              {openSections.emergency ? 'ย่อข้อมูล' : 'แสดงรายละเอียด'}
            </span>
            {openSections.emergency ? (
              <ChevronUp className="w-5 h-5 text-rose-700 dark:text-rose-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-rose-700 dark:text-rose-300" />
            )}
          </div>
        </button>

        {openSections.emergency && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Adrenaline */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-bold text-rose-700 dark:text-rose-300 block">
                  • Adrenaline (Epinephrine 1:1,000 / 1 mg/mL):
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  <strong>Anaphylaxis:</strong> ฉีด <strong>IM ที่กล้ามเนื้อหน้าขา (Vastus lateralis)</strong> ขนาด 0.3-0.5 mg (ผู้ใหญ่) เพื่อการดูดซึมเร็วที่สุด
                  <br /><strong>Cardiac Arrest:</strong> ฉีด 1 mg IV push ตามด้วย NSS flush 20 mL ทุก 3-5 นาที
                </p>
              </div>

              {/* Atropine */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block">
                  • Atropine Sulfate (0.6 mg/mL):
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  รักษาภาวะหัวใจเต้นช้าผิดปกติ (Symptomatic Bradycardia)
                  <br /><strong>ข้อควรระวัง:</strong> ขนาดยาขั้นต่ำในผู้ใหญ่ต้องไม่ต่ำกว่า 0.5 mg เพราะหากให้ต่ำกว่านี้อาจทำให้หัวใจเต้นช้าลงกว่าเดิม (Paradoxical bradycardia)
                </p>
              </div>

              {/* Furosemide */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-bold text-teal-700 dark:text-teal-300 block">
                  • Furosemide (Lasix 20 mg/2 mL):
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  ยาขับปัสสาวะรักษาภาวะน้ำท่วมปอด (Pulmonary Edema) และหัวใจล้มเหลว
                  <br /><strong>ข้อควรระวัง:</strong> ต้องฉีดช้าๆ (Slow IV push ไม่เกิน 4 mg/นาที) เพื่อป้องกันพิษต่อหู (Ototoxicity/หูอื้อถาวร)
                </p>
              </div>

              {/* Enoxaparin / Heparin */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-bold text-purple-700 dark:text-purple-300 block">
                  • Enoxaparin (Clexane) / LMWH:
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  ยาต้านการแข็งตัวของเลือด ฉีดเข้าชั้นใต้ผิวหนัง (SC) บริเวณหน้าท้องด้านข้าง (Love handles)
                  <br /><strong>กฎเหล็ก:</strong> <strong>ห้ามไล่ฟองอากาศในหลอดสำเร็จรูปออก และห้ามนวดคลึงหลังฉีด</strong> เพื่อป้องกันรอยฟกช้ำและเลือดออกใต้ผิวหนัง
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
