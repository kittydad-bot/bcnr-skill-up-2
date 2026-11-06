import React, { useState } from 'react';
import {
  Droplets,
  Clock,
  Activity,
  Calculator,
  Sparkles,
  RotateCcw,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Zap,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export const DripCalculationVisual: React.FC = () => {
  // Calculator State 1: Drop/min
  const [dripVolume, setDripVolume] = useState<number | ''>(1000);
  const [dripTimeValue, setDripTimeValue] = useState<number | ''>(8);
  const [dripTimeUnit, setDripTimeUnit] = useState<'hours' | 'minutes'>('hours');
  const [dropFactor, setDropFactor] = useState<number>(15);

  // Calculator State 2: mL/hr (Infusion / Syringe Pump)
  const [pumpVolume, setPumpVolume] = useState<number | ''>(1000);
  const [pumpTimeValue, setPumpTimeValue] = useState<number | ''>(8);
  const [pumpTimeUnit, setPumpTimeUnit] = useState<'hours' | 'minutes'>('hours');

  // Collapsible toggle for Drip Theory / Formulas / Shortcuts
  const [showDripTheory, setShowDripTheory] = useState<boolean>(false);

  // Normalized numbers for calculations
  const numDripVolume = typeof dripVolume === 'number' ? dripVolume : 0;
  const numDripTimeValue = typeof dripTimeValue === 'number' ? dripTimeValue : 0;
  const numPumpVolume = typeof pumpVolume === 'number' ? pumpVolume : 0;
  const numPumpTimeValue = typeof pumpTimeValue === 'number' ? pumpTimeValue : 0;

  // 1. Calculations for Drop/min
  const totalDripMinutes = dripTimeUnit === 'hours' ? numDripTimeValue * 60 : numDripTimeValue;
  const calculatedDropsPerMin =
    totalDripMinutes > 0 && numDripVolume > 0 && dropFactor > 0
      ? (numDripVolume * dropFactor) / totalDripMinutes
      : 0;

  const roundedDropsPerMin = Math.round(calculatedDropsPerMin);
  const secondsPerDrop =
    calculatedDropsPerMin > 0 ? (60 / calculatedDropsPerMin).toFixed(1) : '0';

  // 2. Calculations for mL/hr (Infusion Pump)
  const pumpTimeInHours = pumpTimeUnit === 'hours' ? numPumpTimeValue : numPumpTimeValue / 60;
  const calculatedPumpRate =
    pumpTimeInHours > 0 && numPumpVolume > 0 ? numPumpVolume / pumpTimeInHours : 0;
  const formattedPumpRate = calculatedPumpRate.toFixed(1);

  const handleReset = () => {
    setDripVolume(1000);
    setDripTimeValue(8);
    setDripTimeUnit('hours');
    setDropFactor(15);

    setPumpVolume(1000);
    setPumpTimeValue(8);
    setPumpTimeUnit('hours');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-cyan-950/40 dark:to-slate-900 border-2 border-teal-500/40 dark:border-teal-700/60 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-cyan-600/30 shrink-0">
              <Droplets className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                  เครื่องคำนวณยาดริป & สารน้ำทางหลอดเลือดดำ (IV Drip Calculator)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-600 text-white">
                  Drop/min & mL/hr
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                คำนวณอัตราหยดต่อนาทีสำหรับสายน้ำเกลือธรรมดา (Drop/min) และคำนวณอัตราเร็วสำหรับ Infusion/Syringe Pump (mL/hr)
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl border border-teal-300 dark:border-teal-700 bg-white/90 dark:bg-slate-800 hover:bg-teal-50 text-teal-800 dark:text-teal-200 text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto shrink-0 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>รีเซ็ตค่ามาตรฐาน</span>
          </button>
        </div>
      </div>

      {/* Main 2 Interactive Calculators (เครื่องคำนวณอัตราหยด & เครื่องคำนวณอัตราเร็วปั๊ม) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ========================================================= */}
        {/* CALCULATOR 1: เครื่องคำนวณจำนวนหยดต่อนาที (Drop/min) */}
        {/* ========================================================= */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                    เครื่องคำนวณอัตราหยด (Drop/min)
                  </h4>
                  <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                    สำหรับปรับสายน้ำเกลือธรรมดา (Gravity Infusion Set)
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                หยด/นาที
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Volume */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 block">
                  1. ปริมาณสารน้ำ (mL)
                </label>
                <input
                  type="number"
                  min="1"
                  step="10"
                  value={dripVolume}
                  onChange={e => setDripVolume(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full px-3.5 py-2.5 sm:py-3 text-lg sm:text-2xl font-black rounded-xl border-2 border-teal-400 dark:border-teal-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner focus:outline-none focus:ring-4 focus:ring-teal-500/20"
                />
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {[100, 250, 500, 1000].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setDripVolume(v)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all ${
                        dripVolume === v
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                      }`}
                    >
                      {v} mL
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
                    2. เวลาที่ต้องให้
                  </label>
                  <span className="text-[10px] text-teal-700 dark:text-teal-300 font-bold">
                    {dripTimeUnit === 'hours' ? 'ชั่วโมง' : 'นาที'}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    min="0.1"
                    step="any"
                    value={dripTimeValue}
                    onChange={e => setDripTimeValue(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full px-3.5 py-2.5 sm:py-3 text-lg sm:text-2xl font-black rounded-xl border-2 border-teal-400 dark:border-teal-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner focus:outline-none focus:ring-4 focus:ring-teal-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setDripTimeUnit(dripTimeUnit === 'hours' ? 'minutes' : 'hours')}
                    className="px-3 py-2.5 sm:py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-black shrink-0 transition-colors shadow-xs"
                    title="คลิกเพื่อสลับหน่วย ชั่วโมง / นาที"
                  >
                    {dripTimeUnit === 'hours' ? 'ชม.' : 'นาที'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {dripTimeUnit === 'hours' ? (
                    [1, 2, 4, 8, 12, 24].map(h => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setDripTimeValue(h)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all ${
                          dripTimeValue === h
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                        }`}
                      >
                        {h} ชม.
                      </button>
                    ))
                  ) : (
                    [15, 30, 45, 60, 120].map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setDripTimeValue(m)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all ${
                          dripTimeValue === m
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                        }`}
                      >
                        {m} นาที
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Drop Factor */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 block">
                  3. Drop Factor ของสาย
                </label>
                <select
                  value={dropFactor}
                  onChange={e => setDropFactor(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-black rounded-xl border-2 border-teal-400 dark:border-teal-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner focus:outline-none focus:ring-4 focus:ring-teal-500/20"
                >
                  <option value={15}>Macro 15 drops/mL (สาย 15)</option>
                  <option value={20}>Macro 20 drops/mL (สาย 20)</option>
                  <option value={60}>Micro 60 drops/mL (ชุดเด็ก/ยา HAD)</option>
                </select>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {[15, 20, 60].map(df => (
                    <button
                      key={df}
                      type="button"
                      onClick={() => setDropFactor(df)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all ${
                        dropFactor === df
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                      }`}
                    >
                      {df === 60 ? 'Micro 60' : `Macro ${df}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Result Box Drop/min */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 text-white shadow-xl border-2 border-teal-400/40 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/20">
              <span className="text-xs sm:text-sm text-teal-200 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-cyan-300 animate-bounce" />
                อัตราการปรับหยดสารน้ำที่ต้องตั้ง (Gravity Drop Rate):
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-teal-100 self-start sm:self-auto">
                สายชุด {dropFactor} drops/mL
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-black text-white tracking-tight drop-shadow-md">
                    {roundedDropsPerMin}
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-teal-200">
                    หยด / นาที
                  </span>
                  <span className="text-xs font-mono text-teal-300 font-semibold">
                    ({calculatedDropsPerMin.toFixed(2)} drops/min)
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-400/25 border border-emerald-300/40 text-emerald-100 text-xs sm:text-sm font-bold shadow-2xs">
                  <Clock className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>
                    จังหวะ: <strong>1 หยด ทุกๆ {secondsPerDrop} วินาที</strong>
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs space-y-1 sm:max-w-xs w-full">
                <div className="text-[11px] text-teal-200 font-extrabold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>คำแนะนำการตรวจนับ:</span>
                </div>
                <p className="text-[11px] text-white leading-relaxed">
                  💡 ปรับ Roller clamp แล้วยืนนับหยดในกระเปาะด้วยนาฬิกาเข็มวินาทีให้ครบ 1 นาทีเต็มเพื่อความแม่นยำ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CALCULATOR 2: เครื่องคำนวณอัตราเร็วเป็น mL/hr (Infusion / Syringe Pump) */}
        {/* ========================================================= */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-xs shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                    เครื่องคำนวณอัตราเร็ว (mL/hr)
                  </h4>
                  <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">
                    สำหรับ Infusion Pump & Syringe Pump อัตโนมัติ
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                mL/hr
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Volume */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 block">
                  1. ปริมาณสารน้ำรวม (mL)
                </label>
                <input
                  type="number"
                  min="1"
                  step="10"
                  value={pumpVolume}
                  onChange={e => setPumpVolume(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full px-3.5 py-2.5 sm:py-3 text-lg sm:text-2xl font-black rounded-xl border-2 border-cyan-400 dark:border-cyan-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
                />
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {[50, 100, 250, 500, 1000].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setPumpVolume(v)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all ${
                        pumpVolume === v
                          ? 'bg-cyan-600 text-white border-cyan-600'
                          : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-400'
                      }`}
                    >
                      {v} mL
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
                    2. ระยะเวลา ({pumpTimeUnit === 'hours' ? 'ชั่วโมง' : 'นาที'})
                  </label>
                  <span className="text-[10px] text-cyan-700 dark:text-cyan-300 font-bold">
                    {pumpTimeUnit === 'hours' ? 'ชั่วโมง' : 'นาที'}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    min="0.1"
                    step="any"
                    value={pumpTimeValue}
                    onChange={e => setPumpTimeValue(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full px-3.5 py-2.5 sm:py-3 text-lg sm:text-2xl font-black rounded-xl border-2 border-cyan-400 dark:border-cyan-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setPumpTimeUnit(pumpTimeUnit === 'hours' ? 'minutes' : 'hours')}
                    className="px-3 py-2.5 sm:py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black shrink-0 transition-colors shadow-xs"
                    title="คลิกเพื่อสลับหน่วย ชั่วโมง / นาที"
                  >
                    {pumpTimeUnit === 'hours' ? 'ชม.' : 'นาที'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {pumpTimeUnit === 'hours' ? (
                    [1, 2, 4, 8, 12, 24].map(h => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setPumpTimeValue(h)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all ${
                          pumpTimeValue === h
                            ? 'bg-cyan-600 text-white border-cyan-600'
                            : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-400'
                        }`}
                      >
                        {h} ชม.
                      </button>
                    ))
                  ) : (
                    [15, 30, 45, 60, 120].map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPumpTimeValue(m)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all ${
                          pumpTimeValue === m
                            ? 'bg-cyan-600 text-white border-cyan-600'
                            : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-400'
                        }`}
                      >
                        {m} นาที
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Simulated Digital Infusion Pump Display */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 text-white shadow-xl border-2 border-cyan-500/50 relative overflow-hidden space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                <span className="text-xs font-mono font-black text-emerald-400 tracking-wider">
                  DIGITAL INFUSION PUMP SCREEN
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                STATUS: INFUSING
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-mono block">
                  TARGET INFUSION RATE:
                </span>
                <div className="flex items-baseline gap-2 font-mono text-cyan-300 mt-0.5">
                  <span className="text-5xl sm:text-6xl font-black tracking-tight drop-shadow-md">
                    {formattedPumpRate}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-cyan-200">
                    mL / hr
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs font-mono space-y-1 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 flex items-center justify-between sm:justify-end gap-3">
                  <span>VTBI (ปริมาตร):</span>
                  <span className="text-white font-bold text-sm">{pumpVolume} mL</span>
                </div>
                <div className="text-slate-400 flex items-center justify-between sm:justify-end gap-3">
                  <span>DURATION (เวลา):</span>
                  <span className="text-white font-bold text-sm">
                    {pumpTimeUnit === 'hours' ? `${pumpTimeValue} hr` : `${pumpTimeValue} min (${pumpTimeInHours.toFixed(2)} hr)`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* แท็บซ่อนเล็กๆ สำหรับสูตรและขั้นตอนคำนวณของยาดริป (คลิกเพื่อขยายดู / ซ่อน) */}
      <div className="rounded-2xl border border-cyan-200 dark:border-cyan-800/80 bg-cyan-50/40 dark:bg-cyan-950/20 overflow-hidden transition-all shadow-2xs">
        <button
          type="button"
          onClick={() => setShowDripTheory(!showDripTheory)}
          className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left hover:bg-cyan-100/50 dark:hover:bg-cyan-900/30 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-600/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 flex-wrap">
                <span>📖 ดูสูตรและขั้นตอนวิธีคำนวณของยาดริป</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-800">
                  Drop/min, สูตรลัด, mL/hr & ตารางสรุป
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {showDripTheory
                  ? 'คลิกเพื่อย่อ/ซ่อนแท็บนี้'
                  : 'คลิกเพื่อขยายดูสูตรมาตรฐาน Drop/min, สูตรลัดพยาบาล, สูตรคำนวณ mL/hr และตารางเปรียบเทียบ'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-300 shrink-0 ml-2">
            <span>{showDripTheory ? 'ซ่อน' : 'ขยายดู'}</span>
            {showDripTheory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {/* Expanded Content: Drop/min formulas, mL/hr formulas, and comparison table */}
        {showDripTheory && (
          <div className="p-4 sm:p-6 border-t border-cyan-200 dark:border-cyan-800 bg-white dark:bg-slate-850 animate-fadeIn space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* สูตรคำนวณ Drop/min */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-850 border-2 border-teal-500/40 dark:border-teal-600/40 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 font-black text-xs flex items-center justify-center">
                        1
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                          สูตรคำนวณจำนวนหยดต่อนาที (Drop/min)
                        </h4>
                        <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                          สำหรับปรับสายน้ำเกลือธรรมดา (Gravity Infusion Set)
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      หยด/นาที
                    </span>
                  </div>

                  {/* When to use */}
                  <div className="p-2.5 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-800/60 text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-teal-900 dark:text-teal-200 block mb-0.5">📌 ใช้เมื่อใด:</strong>
                    ใช้เมื่อต้องการรู้ว่าต้องปรับสายน้ำเกลือ (Roller clamp) ให้หยดกี่ครั้งต่อนาที เพื่อให้สารน้ำหมดพอดีตามเวลาที่แพทย์กำหนด
                  </div>

                  {/* Formula Box */}
                  <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-center shadow-inner relative overflow-hidden">
                    <div className="text-[10px] uppercase tracking-wider text-teal-400 font-bold mb-1">
                      สูตรมาตรฐาน (Standard Formula)
                    </div>
                    <div className="text-xs sm:text-sm font-bold flex items-center justify-center gap-2 flex-wrap py-1">
                      <span className="text-teal-300 font-black">อัตราส่วน (หยด/นาที)</span>
                      <span className="text-slate-400 font-bold">=</span>
                      <span className="inline-flex flex-col items-center">
                        <span className="border-b border-white/60 pb-0.5 px-2 text-white">
                          ปริมาณสารน้ำทั้งหมด (mL) × Drop Factor
                        </span>
                        <span className="pt-0.5 px-2 text-teal-200">
                          เวลาทั้งหมดเป็นนาที
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Drop Factor Definitions */}
                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-teal-600" />
                      Drop Factor (ค่าคงที่ของชุดให้สารน้ำ):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-cyan-950 dark:text-cyan-200">Micro-drip set</span>
                          <span className="px-1.5 py-0.5 rounded bg-cyan-200 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-100 font-black text-[10px]">
                            60 drops/mL
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                          มีเข็มหยดเล็กในกระเปาะ มักใช้กับ<strong>เด็ก ทารก</strong> หรือยาที่ต้องควบคุมปริมาณแม่นยำ
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-teal-950 dark:text-teal-200">Macro-drip set</span>
                          <span className="px-1.5 py-0.5 rounded bg-teal-200 dark:bg-teal-900 text-teal-900 dark:text-teal-100 font-black text-[10px]">
                            15 หรือ 20 drops/mL
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                          ชุดหยดมาตรฐานสำหรับผู้ใหญ่ (ขึ้นอยู่กับยี่ห้อและรุ่นของสายน้ำเกลือ)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Nurse Shortcut Formulas */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-300 dark:border-amber-800/80 space-y-2">
                    <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-xs">
                      <Zap className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
                      <span>สูตรลัดพยาบาล (Nurse Shortcuts):</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                      <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-900/60 border border-amber-200 dark:border-amber-800/50">
                        <span className="font-bold text-amber-900 dark:text-amber-200 block">⚡ ชุด 15 drops/mL:</span>
                        <div className="font-mono text-xs font-bold text-teal-700 dark:text-teal-300 mt-0.5">
                          mL ÷ (4 × ชม.)
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                          (เพราะ 60 นาที ÷ 15 = 4)
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-900/60 border border-amber-200 dark:border-amber-800/50">
                        <span className="font-bold text-amber-900 dark:text-amber-200 block">⚡ ชุด 20 drops/mL:</span>
                        <div className="font-mono text-xs font-bold text-teal-700 dark:text-teal-300 mt-0.5">
                          mL ÷ (3 × ชม.)
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                          (เพราะ 60 นาที ÷ 20 = 3)
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-900/60 border border-amber-200 dark:border-amber-800/50">
                        <span className="font-bold text-amber-900 dark:text-amber-200 block">⚡ ชุด 60 drops/mL:</span>
                        <div className="font-mono text-xs font-bold text-teal-700 dark:text-teal-300 mt-0.5">
                          Drop/min = mL/hr
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                          หยด/นาที = mL/hr ทันที!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* สูตรคำนวณอัตราเร็ว mL/hr */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-850 border-2 border-cyan-500/40 dark:border-cyan-600/40 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-cyan-100 dark:cyan-950 text-cyan-800 dark:text-cyan-200 font-black text-xs flex items-center justify-center">
                        2
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                          สูตรคำนวณอัตราเร็วเป็น mL/hr
                        </h4>
                        <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">
                          กรณีใช้ Syringe Pump หรือ Infusion Pump อัตโนมัติ
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                      mL/hr
                    </span>
                  </div>

                  {/* When to use */}
                  <div className="p-2.5 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200/80 dark:border-cyan-800/60 text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-cyan-900 dark:text-cyan-200 block mb-0.5">📌 ใช้เมื่อใด:</strong>
                    เครื่องปั๊มสารน้ำ (Infusion Pump) หรือกระบอกฉีดยาอัตโนมัติ (Syringe Pump) จะต้องตั้งค่าตัวเลขความเร็วเป็นหน่วย <strong>มิลลิลิตรต่อชั่วโมง (mL/hr)</strong> เพื่อให้เครื่องจ่ายยาได้อย่างแม่นยำ
                  </div>

                  {/* Formula Box */}
                  <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-center shadow-inner relative overflow-hidden">
                    <div className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold mb-1">
                      สูตรหลัก (Infusion Pump Rate Formula)
                    </div>
                    <div className="text-sm font-bold flex items-center justify-center gap-2 flex-wrap py-1">
                      <span className="text-cyan-300 font-black">Rate (mL/hr)</span>
                      <span className="text-slate-400 font-bold">=</span>
                      <span className="inline-flex flex-col items-center">
                        <span className="border-b border-white/60 pb-0.5 px-3 text-white">
                          ปริมาณสารน้ำทั้งหมด (mL)
                        </span>
                        <span className="pt-0.5 px-3 text-cyan-200">
                          เวลาเป็นชั่วโมง (hr)
                        </span>
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      *หากเวลาเป็นนาที: Rate (mL/hr) = (ปริมาณ mL × 60) ÷ เวลา (นาที)
                    </div>
                  </div>

                  {/* Concrete Step-by-Step Clinical Examples */}
                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                      ตัวอย่างโจทย์และการแทนค่าในงานจริง:
                    </span>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 dark:text-slate-100">ตัวอย่าง 1: สารน้ำทั่วไป 1,000 mL ใน 8 ชม.</strong>
                        <span className="text-[10px] text-teal-600 font-bold">Infusion Pump</span>
                      </div>
                      <div className="font-mono text-teal-700 dark:text-teal-300 text-xs">
                        Rate = 1,000 mL ÷ 8 hr = <strong>125 mL/hr</strong>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 dark:text-slate-100">ตัวอย่าง 2: ยาปฏิชีวนะ 100 mL ดริปใน 30 นาที</strong>
                        <span className="text-[10px] text-cyan-600 font-bold">เวลาเป็นนาที</span>
                      </div>
                      <div className="font-mono text-cyan-700 dark:text-cyan-300 text-xs">
                        Rate = 100 mL ÷ 0.5 hr (หรือ 100 × 60 ÷ 30) = <strong>200 mL/hr</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Reference Table: ชุดให้สารน้ำแต่ละชนิด */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-600 shrink-0" />
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  ตารางสรุปเปรียบเทียบชุดให้สารน้ำ (IV Administration Sets Comparison)
                </h4>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                      <th className="p-2.5">ชนิดชุดให้สารน้ำ</th>
                      <th className="p-2.5">Drop Factor (หยด/mL)</th>
                      <th className="p-2.5">สูตรลัดหา Drop/min</th>
                      <th className="p-2.5">ข้อบ่งใช้หลักทางคลินิก</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="p-2.5 font-bold text-teal-800 dark:text-teal-200">
                        Macro-drip set (15 drops)
                      </td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 font-bold text-teal-800 dark:text-teal-200">
                          15 drops/mL
                        </span>
                      </td>
                      <td className="p-2.5 font-mono text-teal-700 dark:text-teal-300 font-bold">
                        mL ÷ (4 × ชม.)
                      </td>
                      <td className="p-2.5">
                        ผู้ใหญ่ทั่วไป ให้สารน้ำทดแทนปริมาณปกติหรือเร็วปานกลาง
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-teal-800 dark:text-teal-200">
                        Macro-drip set (20 drops)
                      </td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 font-bold text-teal-800 dark:text-teal-200">
                          20 drops/mL
                        </span>
                      </td>
                      <td className="p-2.5 font-mono text-teal-700 dark:text-teal-300 font-bold">
                        mL ÷ (3 × ชม.)
                      </td>
                      <td className="p-2.5">
                        ชุดมาตรฐานที่หลายโรงพยาบาลใช้งาน ให้สารน้ำทั่วไปในผู้ใหญ่
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-cyan-800 dark:text-cyan-200">
                        Micro-drip set (Pediatric / Soluset)
                      </td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded bg-cyan-100 dark:cyan-950 font-bold text-cyan-800 dark:text-cyan-200">
                          60 drops/mL
                        </span>
                      </td>
                      <td className="p-2.5 font-mono text-cyan-700 dark:text-cyan-300 font-bold">
                        Drop/min = mL/hr ทันที
                      </td>
                      <td className="p-2.5">
                        เด็ก ทารก ผู้ป่วยโรคไต/โรคหัวใจที่จำกัดน้ำ หรือยา Inotrope ความเสี่ยงสูง
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-rose-800 dark:text-rose-200">
                        Blood Transfusion Set
                      </td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 font-bold text-rose-800 dark:text-rose-200">
                          10 - 15 drops/mL
                        </span>
                      </td>
                      <td className="p-2.5 font-mono text-rose-700 dark:text-rose-300 font-bold">
                        ตาม Drop Factor ข้างซอง
                      </td>
                      <td className="p-2.5">
                        สำหรับการให้เลือดและส่วนประกอบของเลือด มีแผ่นกรอง (Filter) ป้องกันลิ่มเลือด
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
