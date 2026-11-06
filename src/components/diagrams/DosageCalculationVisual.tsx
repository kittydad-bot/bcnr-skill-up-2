import React, { useState } from 'react';
import {
  Calculator,
  Sparkles,
  RotateCcw,
  Droplets,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  FlaskConical,
} from 'lucide-react';
import { DripCalculationVisual } from './DripCalculationVisual';
import { DrugAdmixtureVisual } from './DrugAdmixtureVisual';

export const DosageCalculationVisual: React.FC = () => {
  // Main Category: bolus vs drip vs admixture
  const [calculationType, setCalculationType] = useState<'bolus' | 'drip' | 'admixture'>('admixture');

  // Interactive Calculator State (Bolus) - Allows blank string so input can be cleared without leaving 0
  const [desiredDose, setDesiredDose] = useState<number | ''>(60);
  const [stockDose, setStockDose] = useState<number | ''>(40);
  const [stockVolume, setStockVolume] = useState<number | ''>(1);

  // Collapsible toggle for Injection Theory / Calculation Methods
  const [showTheory, setShowTheory] = useState<boolean>(false);

  // Normalized numbers for calculation
  const numDesired = desiredDose === '' ? 0 : Number(desiredDose);
  const numStock = stockDose === '' ? 0 : Number(stockDose);
  const numVolume = stockVolume === '' ? 0 : Number(stockVolume);

  // Calculation logic
  const calculatedVolume =
    numStock > 0 && numVolume > 0 && numDesired >= 0
      ? (numDesired / numStock) * numVolume
      : 0;

  const formattedVolume = Number.isInteger(calculatedVolume)
    ? calculatedVolume.toString()
    : parseFloat(calculatedVolume.toFixed(3)).toString();

  const handleResetToStandard = () => {
    setDesiredDose(60);
    setStockDose(40);
    setStockVolume(1);
  };

  // Determine syringe recommendation based on volume
  const getSyringeRecommendation = (vol: number) => {
    if (vol <= 1) return 'Tuberculin Syringe (1 mL) ขีดละ 0.01 mL เพื่อความแม่นยำสูง';
    if (vol <= 3) return 'Syringe 3 mL ขีดละ 0.1 mL';
    if (vol <= 5) return 'Syringe 5 mL ขีดละ 0.2 mL';
    if (vol <= 10) return 'Syringe 10 mL ขีดละ 0.2 mL';
    return 'Syringe 20 mL หรือแบ่งบริหารตามคำสั่งแพทย์';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 3 Main Categories Tab Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-3 bg-slate-100 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 gap-1.5 shadow-xs">
        <button
          onClick={() => setCalculationType('bolus')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            calculationType === 'bolus'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <Calculator className="w-4 h-4 shrink-0" />
          <span className="truncate">1. คำนวณยาฉีดทั่วไป (Dose)</span>
        </button>
        <button
          onClick={() => setCalculationType('drip')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            calculationType === 'drip'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <Droplets className="w-4 h-4 shrink-0" />
          <span className="truncate">2. คำนวณยาดริป (Drop & mL/hr)</span>
        </button>
        <button
          onClick={() => setCalculationType('admixture')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            calculationType === 'admixture'
              ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <FlaskConical className="w-4 h-4 shrink-0" />
          <span className="truncate">3. ดูดยา & ผสมสารน้ำตามสั่งแพทย์</span>
        </button>
      </div>

      {/* RENDER VIEW ACCORDING TO TAB */}
      {calculationType === 'admixture' && <DrugAdmixtureVisual />}
      {calculationType === 'drip' && <DripCalculationVisual />}
      {calculationType === 'bolus' && (
        <div className="space-y-6">
          {/* Main Interactive Dose Calculator (เครื่องคำนวณยาฉีดทั่วไป) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-slate-100">
                    เครื่องคำนวณยาฉีดทั่วไป (Injectable Dose Calculator)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    กรอกตัวเลขเพื่อคำนวณปริมาตรยาที่ต้องดูดฉีด (mL) พร้อมแนะนำขนาดกระบอกฉีดยา (Syringe)
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 flex items-center gap-1 self-start sm:self-auto">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>คำนวณสด Real-time</span>
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* D: Desired Dose */}
              <div className="p-3.5 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 space-y-1.5">
                <label className="text-xs font-bold text-teal-900 dark:text-teal-200 flex items-center justify-between">
                  <span>ขนาดยาที่ต้องการ (D)</span>
                  <span className="text-[10px] font-normal text-teal-600 dark:text-teal-400">Desired Dose</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={desiredDose}
                    onChange={e => setDesiredDose(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-lg font-bold rounded-xl bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">mg</span>
                </div>
              </div>

              {/* H: Stock Dose */}
              <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 space-y-1.5">
                <label className="text-xs font-bold text-indigo-900 dark:text-indigo-200 flex items-center justify-between">
                  <span>ขนาดยาที่มีในขวด (H)</span>
                  <span className="text-[10px] font-normal text-indigo-600 dark:text-indigo-400">Dose on Hand</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0.1"
                    step="any"
                    value={stockDose}
                    onChange={e => setStockDose(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-lg font-bold rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">mg</span>
                </div>
              </div>

              {/* Volume in container */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>ปริมาตรของสารละลาย</span>
                  <span className="text-[10px] font-normal text-slate-400">Stock Volume</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0.1"
                    step="any"
                    value={stockVolume}
                    onChange={e => setStockVolume(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-lg font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">mL</span>
                </div>
              </div>
            </div>

            {/* Real-time Calculation Result Display */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-teal-100 uppercase tracking-wider block">
                  ผลการคำนวณปริมาตรยาที่ต้องดูดฉีด (Dose to Administer):
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black">{formattedVolume}</span>
                  <span className="text-xl font-bold text-teal-100">mL (มิลลิลิตร)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/15 backdrop-blur-xs text-xs space-y-1 sm:text-right border border-white/20">
                <span className="text-[10px] text-teal-100 font-bold block">
                  กระบอกฉีดยา (Syringe) ที่แนะนำ:
                </span>
                <span className="font-extrabold text-white text-sm block">
                  {getSyringeRecommendation(calculatedVolume)}
                </span>
              </div>
            </div>
          </div>

          {/* แท็บซ่อนเล็กๆ สำหรับทฤษฎีและขั้นตอนวิธีคำนวณของยาฉีด (คลิกเพื่อขยายดู / ซ่อน) */}
          <div className="rounded-2xl border border-teal-200 dark:border-teal-800/80 bg-teal-50/40 dark:bg-teal-950/20 overflow-hidden transition-all shadow-2xs">
            <button
              type="button"
              onClick={() => setShowTheory(!showTheory)}
              className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left hover:bg-teal-100/50 dark:hover:bg-teal-900/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-600/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 flex-wrap">
                    <span>📖 ดูทฤษฎีและขั้นตอนวิธีคำนวณของยาฉีด</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800">
                      สูตร D / X = H & บัญญัติไตรยางศ์
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {showTheory
                      ? 'คลิกเพื่อย่อ/ซ่อนแท็บนี้'
                      : 'คลิกเพื่อขยายดูสูตร นิยามตัวแปร D, H, X และตัวอย่างวิธีเทียบบัญญัติไตรยางศ์'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-300 shrink-0 ml-2">
                <span>{showTheory ? 'ซ่อน' : 'ขยายดู'}</span>
                {showTheory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {/* Expanded Content: Cards for Method 1 & Method 2 */}
            {showTheory && (
              <div className="p-4 sm:p-5 border-t border-teal-200 dark:border-teal-800 bg-white dark:bg-slate-850 animate-fadeIn space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                  {/* วิธีที่ 1: การใช้สูตร D/X = H */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-850 border-2 border-teal-500/40 dark:border-teal-600/40 shadow-sm flex flex-col justify-between">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-teal-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
                            1
                          </span>
                          <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-slate-100">
                            วิธีที่ 1: ใช้สูตร <span className="text-teal-700 dark:text-teal-300">D / X = H</span>
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                          สูตรสัดส่วน
                        </span>
                      </div>

                      {/* ความหมายของตัวแปร */}
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1.5 text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          📌 นิยามความหมายของตัวแปร:
                        </span>
                        <div className="grid grid-cols-1 gap-1 text-slate-700 dark:text-slate-300 pl-1 font-medium">
                          <div className="flex items-baseline gap-2">
                            <span className="font-extrabold text-teal-700 dark:text-teal-400 w-5">D</span>
                            <span>= <strong>ขนาดยาที่ต้องการ</strong> (Desired Dose ตามคำสั่งแพทย์)</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-extrabold text-indigo-700 dark:text-indigo-400 w-5">H</span>
                            <span>= <strong>ขนาดยาที่มีบรรจุในขวด</strong> (Dose on Hand / ความเข้มข้นต่อ mL)</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-extrabold text-emerald-700 dark:text-emerald-400 w-5">X</span>
                            <span>= <strong>จำนวนยาที่ต้องการฉีด</strong> (ปริมาตร mL ที่ต้องดูดเข้า Syringe)</span>
                          </div>
                        </div>
                      </div>

                      {/* ตัวอย่างโจทย์และการแทนค่า */}
                      <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-2.5">
                        <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                          <span className="text-teal-800 dark:text-teal-300 font-black">ตัวอย่าง:</span>{' '}
                          ต้องการยาฉีด ชนิด A ขนาด <strong>60 mg</strong> ในขวดบรรจุยา <strong>40 mg/mL</strong> จะต้องเตรียมยาจำนวนเท่าใด
                        </div>

                        {/* กำหนดตัวแปร */}
                        <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-white/90 dark:bg-slate-900/90 text-center text-xs font-semibold border border-teal-100 dark:border-teal-900">
                          <div className="p-1">
                            <span className="block text-[10px] text-slate-400">D</span>
                            <span className="text-teal-700 dark:text-teal-400 font-bold">60 mg</span>
                          </div>
                          <div className="p-1 border-x border-slate-200 dark:border-slate-800">
                            <span className="block text-[10px] text-slate-400">H</span>
                            <span className="text-indigo-700 dark:text-indigo-400 font-bold">40 mg/mL</span>
                          </div>
                          <div className="p-1">
                            <span className="block text-[10px] text-slate-400">X</span>
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">จำนวนยาที่ต้องการ</span>
                          </div>
                        </div>

                        {/* ยกตัวอย่างแทนค่าในสูตร */}
                        <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-[13px] space-y-2 shadow-inner">
                          <div className="text-teal-400 font-bold text-[11px] font-sans">
                            ขั้นตอนแทนค่าในสูตร (Step-by-step):
                          </div>
                          <div className="flex items-center gap-2 pl-2">
                            <span className="text-slate-400">1.</span>
                            <span>60 mg / X = 40 mg/mL</span>
                          </div>
                          <div className="flex items-center gap-2 pl-2">
                            <span className="text-slate-400">2.</span>
                            <span>60 mg / 40 mg/mL = X</span>
                          </div>
                          <div className="flex items-center gap-2 pl-2 font-bold text-amber-300">
                            <span className="text-slate-400">3.</span>
                            <span>1.5 mL = X</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* สรุปคำตอบ วิธีที่ 1 */}
                    <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-black text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ดังนั้น จำนวนยาที่ต้องการ เท่ากับ 1.5 mL
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                        X = 1.5 mL
                      </span>
                    </div>
                  </div>

                  {/* วิธีที่ 2: เทียบบัญญัติไตรยางศ์ */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-850 border-2 border-indigo-500/40 dark:border-indigo-600/40 shadow-sm flex flex-col justify-between">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
                            2
                          </span>
                          <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-slate-100">
                            วิธีที่ 2: <span className="text-indigo-700 dark:text-indigo-300">เทียบบัญญัติไตรยางศ์</span>
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                          Unitary Method
                        </span>
                      </div>

                      {/* คำอธิบายหลักการเทียบบัญญัติไตรยางศ์ */}
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          📌 หลักการเทียบบัญญัติไตรยางศ์:
                        </span>
                        <p className="font-medium leading-relaxed">
                          เทียบจากสิ่งที่ทราบค่าในขวดยา (ยา 40 mg มีในน้ำยา 1 mL) แล้วหาปริมาตรน้ำยาสำหรับขนาดยาที่ต้องการ (60 mg) โดยการคูณไขว้
                        </p>
                      </div>

                      {/* แสดงขั้นตอนการเทียบแบบชัดเจน */}
                      <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-3">
                        <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                          <span className="text-indigo-800 dark:text-indigo-300 font-black">ขั้นตอนการเทียบ:</span>
                        </div>

                        {/* บรรทัดที่ 1 */}
                        <div className="p-2.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-indigo-100 dark:border-indigo-900 text-xs sm:text-sm font-medium flex items-center justify-between">
                          <span className="text-slate-700 dark:text-slate-300">
                            ยา <strong>40 mg</strong>
                          </span>
                          <span className="text-slate-400 font-normal">→</span>
                          <span className="font-bold text-indigo-700 dark:text-indigo-400">
                            ต้องเตรียมยา จำนวน <strong>1 mL</strong>
                          </span>
                        </div>

                        {/* บรรทัดที่ 2 */}
                        <div className="p-2.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-indigo-100 dark:border-indigo-900 text-xs sm:text-sm font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                          <span className="text-slate-700 dark:text-slate-300">
                            ยา <strong>60 mg</strong>
                          </span>
                          <span className="text-slate-400 font-normal hidden sm:inline">→</span>
                          <span className="font-mono font-bold text-indigo-800 dark:text-indigo-300 text-xs sm:text-sm">
                            ต้องเตรียมยาจำนวน <span className="bg-indigo-100/80 dark:bg-indigo-900/80 px-1.5 py-0.5 rounded">1 mL / 40 mg × 60 mg</span> = <span className="text-amber-500 font-extrabold text-sm sm:text-base">1.5 mL</span>
                          </span>
                        </div>

                        {/* Formula visualization */}
                        <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-1.5 shadow-inner">
                          <div className="text-indigo-300 font-bold text-[11px] font-sans">
                            สูตรสมการคำนวณ:
                          </div>
                          <div className="flex items-center gap-2 pl-2">
                            <span className="text-slate-400">สูตร:</span>
                            <span>(ขนาดยาที่ต้องการ × ปริมาตรที่มี) / ขนาดยาที่มี</span>
                          </div>
                          <div className="flex items-center gap-2 pl-2 text-indigo-200">
                            <span className="text-slate-400">แทนค่า:</span>
                            <span>(60 mg × 1 mL) / 40 mg = 60 / 40 = 1.5 mL</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* สรุปคำตอบ วิธีที่ 2 */}
                    <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-black text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ดังนั้น จำนวนยาที่ต้องการ เท่ากับ 1.5 mL
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                        ตอบ 1.5 mL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
