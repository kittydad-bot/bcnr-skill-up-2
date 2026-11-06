import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Syringe,
  Droplets,
  Clock,
  Activity,
  Calculator,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Link,
  RefreshCw,
} from 'lucide-react';

interface PrescriptionPreset {
  id: string;
  name: string;
  drugName: string;
  orderDose: number;
  orderUnit: 'mg' | 'g' | 'mcg' | 'unit';
  stockDose: number;
  stockUnit: 'mg' | 'g' | 'mcg' | 'unit';
  stockVolume: number;
  diluentName: string;
  diluentVolume: number;
  adminRoute: 'drip' | 'iv_push';
  targetPushVolume?: number;
  durationValue: number;
  durationUnit: 'minutes' | 'hours';
  dropFactor: 15 | 20 | 60;
  clinicalNote: string;
}

const COMMON_PRESCRIPTIONS: PrescriptionPreset[] = [
  {
    id: 'ceftriaxone-1g',
    name: 'Ceftriaxone 1 g IV drip in NSS 100 mL (30 นาที)',
    drugName: 'Ceftriaxone',
    orderDose: 1,
    orderUnit: 'g',
    stockDose: 1,
    stockUnit: 'g',
    stockVolume: 10,
    diluentName: '0.9% Normal Saline (NSS)',
    diluentVolume: 100,
    adminRoute: 'drip',
    durationValue: 30,
    durationUnit: 'minutes',
    dropFactor: 20,
    clinicalNote: 'ละลายขวด 1 g ด้วย NSS 10 mL ดูดยา 10 mL ผสมในถุง NSS 100 mL ดริปใน 30 นาที (ห้ามผสมกับ Calcium/LRS)',
  },
  {
    id: 'morphine-4mg',
    name: 'Morphine 4 mg Slow IV push เจือจางใน NSS รวมเป็น 10 mL (5 นาที)',
    drugName: 'Morphine sulfate',
    orderDose: 4,
    orderUnit: 'mg',
    stockDose: 10,
    stockUnit: 'mg',
    stockVolume: 1,
    diluentName: '0.9% Normal Saline (NSS)',
    diluentVolume: 9.6,
    adminRoute: 'iv_push',
    targetPushVolume: 10,
    durationValue: 5,
    durationUnit: 'minutes',
    dropFactor: 20,
    clinicalNote: 'ดูดยา 0.4 mL (จาก 10 mg/1 mL) ผสม NSS 9.6 mL รวม 10 mL ฉีดช้าๆ 5 นาที (ประเมิน Respiration)',
  },
  {
    id: 'omeprazole-40mg',
    name: 'Omeprazole 40 mg IV drip in NSS 100 mL (30 นาที)',
    drugName: 'Omeprazole (Losec)',
    orderDose: 40,
    orderUnit: 'mg',
    stockDose: 40,
    stockUnit: 'mg',
    stockVolume: 10,
    diluentName: '0.9% Normal Saline (NSS)',
    diluentVolume: 100,
    adminRoute: 'drip',
    durationValue: 30,
    durationUnit: 'minutes',
    dropFactor: 20,
    clinicalNote: 'ละลายด้วยตัวทำละลายเฉพาะ 10 mL แล้วดูดยา 10 mL ผสม NSS 100 mL ดริปใน 20-30 นาที',
  },
  {
    id: 'furosemide-push',
    name: 'Furosemide 40 mg Slow IV push เจือจางใน NSS รวมเป็น 10 mL (5 นาที)',
    drugName: 'Furosemide (Lasix)',
    orderDose: 40,
    orderUnit: 'mg',
    stockDose: 20,
    stockUnit: 'mg',
    stockVolume: 2,
    diluentName: '0.9% Normal Saline (NSS)',
    diluentVolume: 6,
    adminRoute: 'iv_push',
    targetPushVolume: 10,
    durationValue: 5,
    durationUnit: 'minutes',
    dropFactor: 20,
    clinicalNote: 'ดูดยา 40 mg (ได้ 4 mL จากหลอด 20 mg/2 mL 2 หลอด) ดูด NSS เพิ่ม 6 mL รวม 10 mL ฉีดช้าๆ 5 นาที (ไม่เกิน 4 mg/นาที)',
  },
];

export const DrugAdmixtureVisual: React.FC = () => {
  // Prescription Form State (Using number | '' so users can completely clear inputs without sticky '0')
  const [drugName, setDrugName] = useState<string>('Ceftriaxone');
  const [orderDose, setOrderDose] = useState<number | ''>(1);
  const [orderUnit, setOrderUnit] = useState<'mg' | 'g' | 'mcg' | 'unit'>('g');

  const [stockDose, setStockDose] = useState<number | ''>(1);
  const [stockUnit, setStockUnit] = useState<'mg' | 'g' | 'mcg' | 'unit'>('g');
  const [stockVolume, setStockVolume] = useState<number | ''>(10);

  const [diluentName, setDiluentName] = useState<string>('0.9% Normal Saline (NSS)');
  const [diluentVolume, setDiluentVolume] = useState<number | ''>(100);

  // Auto-sync configuration:
  // When 'auto_scale' is enabled, changing orderDose or orderUnit automatically recalculates diluentVolume proportionally!
  const [dripDiluentMode, setDripDiluentMode] = useState<'auto_scale' | 'fixed_bag' | 'custom'>('auto_scale');
  // Baseline ratio: mg to diluent mL (default Ceftriaxone 1000 mg in 100 mL = 0.1 mL/mg)
  const [baselineRatio, setBaselineRatio] = useState<{ mg: number; diluentMl: number }>({
    mg: 1000,
    diluentMl: 100,
  });

  const [adminRoute, setAdminRoute] = useState<'drip' | 'iv_push'>('drip');
  const [targetPushVolume, setTargetPushVolume] = useState<number>(10);
  const [autoSyncPushDiluent, setAutoSyncPushDiluent] = useState<boolean>(true);

  const [durationValue, setDurationValue] = useState<number | ''>(30);
  const [durationUnit, setDurationUnit] = useState<'minutes' | 'hours'>('minutes');
  const [dropFactor, setDropFactor] = useState<15 | 20 | 60>(20);

  const [selectedPresetId, setSelectedPresetId] = useState<string>('ceftriaxone-1g');
  const [lastSyncTimestamp, setLastSyncTimestamp] = useState<number>(Date.now());

  // Unit normalization to mg for standard calculations
  const toMg = (val: number, unit: string) => {
    if (unit === 'g') return val * 1000;
    if (unit === 'mcg') return val / 1000;
    return val;
  };

  const numOrderDose = typeof orderDose === 'number' ? orderDose : 0;
  const numStockDose = typeof stockDose === 'number' ? stockDose : 0;
  const numStockVolume = typeof stockVolume === 'number' ? stockVolume : 0;
  const numDurationValue = typeof durationValue === 'number' ? durationValue : 0;

  const normOrdered = toMg(numOrderDose, orderUnit);
  const normStock = toMg(numStockDose, stockUnit);

  // 1. Volume to draw from vial / ampoule (Calculated directly from Section 1: Dose & Stock)
  const calculatedDrawVolume =
    normStock > 0 && numStockVolume > 0 && normOrdered >= 0
      ? (normOrdered / normStock) * numStockVolume
      : 0;

  const formattedDrawVolume = Number.isInteger(calculatedDrawVolume)
    ? calculatedDrawVolume.toString()
    : parseFloat(calculatedDrawVolume.toFixed(2)).toString();

  // Automatic Syringe recommendation based on drawn volume
  const getSyringeRecommendation = (vol: number) => {
    if (vol <= 0) return 'ระบุขนาดยา';
    if (vol <= 1) return 'Tuberculin Syringe 1 mL (ขีดละ 0.01 mL เพื่อความแม่นยำ)';
    if (vol <= 3) return 'Syringe 3 mL (ขีดละ 0.1 mL)';
    if (vol <= 5) return 'Syringe 5 mL (ขีดละ 0.2 mL)';
    if (vol <= 10) return 'Syringe 10 mL (ขีดละ 0.2 mL)';
    if (vol <= 20) return 'Syringe 20 mL';
    return 'Syringe 50 mL หรือแบ่งบริหาร';
  };

  // DYNAMIC LIVE SYNCHRONIZATION EFFECT:
  // When orderDose or orderUnit or stock changes, automatically recalculate diluentVolume and push volumes!
  useEffect(() => {
    if (adminRoute === 'drip' && dripDiluentMode === 'auto_scale') {
      if (normOrdered > 0 && baselineRatio.mg > 0 && baselineRatio.diluentMl > 0) {
        // Proportional scale: (ordered mg / baseline mg) * baseline diluent
        const autoScaledDiluent = (normOrdered / baselineRatio.mg) * baselineRatio.diluentMl;
        const cleanDiluent = parseFloat(autoScaledDiluent.toFixed(1));
        setDiluentVolume(cleanDiluent);
        setLastSyncTimestamp(Date.now());
      }
    } else if (adminRoute === 'iv_push' && autoSyncPushDiluent) {
      // In IV push, if drawn volume exceeds current target, automatically scale syringe target
      if (calculatedDrawVolume > targetPushVolume) {
        if (calculatedDrawVolume <= 10) setTargetPushVolume(10);
        else if (calculatedDrawVolume <= 20) setTargetPushVolume(20);
        else setTargetPushVolume(Math.ceil(calculatedDrawVolume + 5));
      }
      setLastSyncTimestamp(Date.now());
    }
  }, [normOrdered, normStock, numStockVolume, adminRoute, dripDiluentMode, baselineRatio.mg, baselineRatio.diluentMl]);

  // 2. Dynamic Auto-Sync for Diluent Volume in Section 2:
  // For IV Push: target total volume - drawn drug volume
  // For IV Drip: diluentVolume
  const effectiveDiluentVolume =
    adminRoute === 'iv_push' && autoSyncPushDiluent
      ? Math.max(0, parseFloat((targetPushVolume - calculatedDrawVolume).toFixed(2)))
      : (typeof diluentVolume === 'number' ? diluentVolume : 0);

  const formattedEffectiveDiluent = Number.isInteger(effectiveDiluentVolume)
    ? effectiveDiluentVolume.toString()
    : parseFloat(effectiveDiluentVolume.toFixed(2)).toString();

  // Total Final Volume
  const totalFinalVolume =
    adminRoute === 'iv_push' && autoSyncPushDiluent
      ? Math.max(calculatedDrawVolume, targetPushVolume)
      : effectiveDiluentVolume + calculatedDrawVolume;

  const formattedTotalVolume = Number.isInteger(totalFinalVolume)
    ? totalFinalVolume.toString()
    : parseFloat(totalFinalVolume.toFixed(2)).toString();

  // 3. Final concentration (mg/mL)
  const finalConcentration =
    totalFinalVolume > 0 && normOrdered > 0 ? normOrdered / totalFinalVolume : 0;

  // 4. Administration Rate
  const durationInMinutes = durationUnit === 'hours' ? numDurationValue * 60 : numDurationValue;
  const durationInHours = durationInMinutes / 60;

  const pumpRateMlHr =
    durationInHours > 0 && totalFinalVolume > 0 ? totalFinalVolume / durationInHours : 0;

  const dropsPerMinute =
    durationInMinutes > 0 && totalFinalVolume > 0 && dropFactor > 0
      ? (totalFinalVolume * dropFactor) / durationInMinutes
      : 0;

  const secondsPerDrop =
    dropsPerMinute > 0 ? (60 / dropsPerMinute).toFixed(1) : '0';

  const ivPushRatePerMin =
    durationInMinutes > 0 && totalFinalVolume > 0 ? totalFinalVolume / durationInMinutes : 0;

  // Handler when preset is selected
  const handleApplyPreset = (preset: PrescriptionPreset) => {
    setSelectedPresetId(preset.id);
    setDrugName(preset.drugName);
    setOrderDose(preset.orderDose);
    setOrderUnit(preset.orderUnit);
    setStockDose(preset.stockDose);
    setStockUnit(preset.stockUnit);
    setStockVolume(preset.stockVolume);
    setDiluentName(preset.diluentName);
    setDiluentVolume(preset.diluentVolume);
    setAdminRoute(preset.adminRoute);

    // Initialize baseline ratio for proportional auto-scaling
    const presetNormMg = toMg(preset.orderDose, preset.orderUnit);
    setBaselineRatio({
      mg: presetNormMg > 0 ? presetNormMg : 1000,
      diluentMl: preset.diluentVolume > 0 ? preset.diluentVolume : 100,
    });
    setDripDiluentMode('auto_scale');

    if (preset.targetPushVolume) {
      setTargetPushVolume(preset.targetPushVolume);
      setAutoSyncPushDiluent(true);
    } else {
      setAutoSyncPushDiluent(false);
    }
    setDurationValue(preset.durationValue);
    setDurationUnit(preset.durationUnit);
    setDropFactor(preset.dropFactor);
    setLastSyncTimestamp(Date.now());
  };

  const handleReset = () => {
    handleApplyPreset(COMMON_PRESCRIPTIONS[0]);
  };

  // Manual trigger to force re-sync Section 2 with Section 1
  const handleForceSyncWithDose = () => {
    if (normOrdered > 0 && baselineRatio.mg > 0) {
      const autoScaledDiluent = parseFloat(((normOrdered / baselineRatio.mg) * baselineRatio.diluentMl).toFixed(1));
      setDiluentVolume(autoScaledDiluent);
      setDripDiluentMode('auto_scale');
      setLastSyncTimestamp(Date.now());
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-teal-950/40 dark:to-slate-900 border-2 border-emerald-500/40 dark:border-emerald-700/60 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 shrink-0">
              <FlaskConical className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                  เครื่องคำนวณการดูดยาและผสมสารน้ำตามคำสั่งแพทย์ (Dilution & Admixture)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white flex items-center gap-1 shadow-2xs">
                  <Zap className="w-3 h-3 text-amber-300" />
                  คำนวณสดเชื่อมโยงอัตโนมัติ 100%
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                เมื่อปรับเปลี่ยนตัวเลขใน <span className="font-bold text-teal-700 dark:text-teal-300">หัวข้อ 1 ขนาดยาตามสั่ง & ขวดยา (Dose & Stock)</span> ตัวเลขคำนวณทั้งหมดใน <span className="font-bold text-cyan-700 dark:text-cyan-300">หัวข้อ 2 ผสมกับสารน้ำอะไร เท่าไหร่ (Admixture & Diluent)</span> จะเปลี่ยนตามทันที
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-white/90 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto shrink-0 shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>รีเซ็ตค่ามาตรฐาน</span>
          </button>
        </div>
      </div>

      {/* Quick Prescription Presets */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          ตัวอย่างคำสั่งแพทย์ที่พบบ่อย (คลิกเพื่อโหลดค่าอัตโนมัติ):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {COMMON_PRESCRIPTIONS.map(p => {
            const isSelected = selectedPresetId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleApplyPreset(p)}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400'
                }`}
              >
                <span className="font-bold block truncate">{p.name}</span>
                <span
                  className={`text-[10px] block mt-0.5 truncate ${
                    isSelected ? 'text-emerald-100' : 'text-slate-400'
                  }`}
                >
                  {p.clinicalNote}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Form: 2 Sections (Drug Stock/Draw + Admixture/Administration) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ========================================================= */}
        {/* SECTION 1: ข้อมูลยาจากขวด & ขนาดยาที่แพทย์สั่ง           */}
        {/* ========================================================= */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-850 border-2 border-teal-500/30 dark:border-teal-700/50 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Syringe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  1. ขนาดยาตามสั่ง & ขวดยา (Dose & Stock)
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  ระบุขนาดยาที่แพทย์สั่งและปริมาณยาในขวดเพื่อหาปริมาตรดูดยา
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
              ยาต้นทาง
            </span>
          </div>

          <div className="space-y-3.5">
            {/* Drug Name Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                ชื่อยา (Drug Name):
              </label>
              <input
                type="text"
                value={drugName}
                onChange={e => {
                  setDrugName(e.target.value);
                  setSelectedPresetId('');
                }}
                placeholder="เช่น Ceftriaxone, Morphine, Omeprazole, Furosemide"
                className="w-full px-3.5 py-2 rounded-xl text-sm font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Doctor's Ordered Dose */}
            <div className="p-3.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border-2 border-teal-300 dark:border-teal-700/80 space-y-1.5">
              <label className="text-xs font-bold text-teal-950 dark:text-teal-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-pulse" />
                  <span>ขนาดยาที่แพทย์สั่ง (Doctor's Order):</span>
                </span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">Desired Dose</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={orderDose}
                  onChange={e => {
                    const val = e.target.value;
                    const parsed = val === '' ? '' : parseFloat(val);
                    setOrderDose(parsed);
                    setSelectedPresetId('');
                  }}
                  placeholder="กรอกขนาดยาตามสั่ง (ลบได้ไม่ต้องเหลือ 0)"
                  className="w-full px-3 py-2 text-lg font-black rounded-lg bg-white dark:bg-slate-900 border-2 border-teal-400 dark:border-teal-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <select
                  value={orderUnit}
                  onChange={e => {
                    setOrderUnit(e.target.value as any);
                    setSelectedPresetId('');
                  }}
                  className="px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border-2 border-teal-400 dark:border-teal-600 text-xs font-bold text-slate-800 dark:text-slate-200 shrink-0 focus:outline-none cursor-pointer"
                >
                  <option value="mg">mg (มิลลิกรัม)</option>
                  <option value="g">g (กรัม)</option>
                  <option value="mcg">mcg (ไมโครกรัม)</option>
                  <option value="unit">unit (ยูนิต)</option>
                </select>
              </div>
              <p className="text-[10px] text-teal-700 dark:text-teal-300 font-medium">
                💡 เปลี่ยนขนาดยานี้ ตัวเลขในหัวข้อ 2 ผสมสารน้ำจะคำนวณปรับตามแบบอัตโนมัติทันที
              </p>
            </div>

            {/* Stock Vial Info */}
            <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/80 space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-indigo-950 dark:text-indigo-200 flex items-center justify-between">
                  <span>ขนาดยาที่มีในขวด / แอมพูล (Stock on Hand):</span>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">Vial Strength</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0.01"
                    step="any"
                    value={stockDose}
                    onChange={e => {
                      const val = e.target.value;
                      setStockDose(val === '' ? '' : parseFloat(val));
                      setSelectedPresetId('');
                    }}
                    placeholder="กรอกขนาดยาในขวด"
                    className="w-full px-3 py-2 text-base font-bold rounded-lg bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <select
                    value={stockUnit}
                    onChange={e => {
                      setStockUnit(e.target.value as any);
                      setSelectedPresetId('');
                    }}
                    className="px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700 text-xs font-bold text-slate-800 dark:text-slate-200 shrink-0 focus:outline-none cursor-pointer"
                  >
                    <option value="mg">mg (มิลลิกรัม)</option>
                    <option value="g">g (กรัม)</option>
                    <option value="mcg">mcg (ไมโครกรัม)</option>
                    <option value="unit">unit (ยูนิต)</option>
                  </select>
                </div>
              </div>

              {/* Volume of Diluent Added to Reconstitute */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>ปริมาตรน้ำละลายยาในขวด / ปริมาตรแอมพูล:</span>
                  <span className="text-[10px] text-slate-500">Reconstituted Volume (mL)</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0.01"
                    step="any"
                    value={stockVolume}
                    onChange={e => {
                      const val = e.target.value;
                      setStockVolume(val === '' ? '' : parseFloat(val));
                      setSelectedPresetId('');
                    }}
                    placeholder="กรอกปริมาตร mL"
                    className="w-full px-3 py-2 text-base font-bold rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">mL</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {[1, 2, 4, 5, 10, 20].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setStockVolume(v)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                        stockVolume === v
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      ละลาย {v} mL
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sub-result: Volume to Draw Out */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-teal-100 uppercase tracking-wider block">
                  👉 ปริมาตรยาที่ต้องดูดออกจากขวด:
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-mono">
                  สูตร: (Dose / Stock) × Vol
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black">{formattedDrawVolume}</span>
                <span className="text-base font-bold text-teal-100">mL (มิลลิลิตร)</span>
              </div>
              <p className="text-[11px] text-teal-100 font-medium">
                ขนาดกระบอกฉีดที่แนะนำ: <strong>{getSyringeRecommendation(calculatedDrawVolume)}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: สารน้ำที่ใช้ผสม & การบริหารยา (Admixture & Diluent) */}
        {/* ========================================================= */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-850 border-2 border-cyan-500/40 dark:border-cyan-700/60 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  2. ผสมกับสารน้ำอะไร เท่าไหร่ (Admixture & Diluent)
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  ตัวเลขคำนวณสารน้ำจะเปลี่ยนตาม ขนาดยา & ขวดยา (Dose & Stock) จากข้อ 1 แบบ Real-time
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 flex items-center gap-1 ring-1 ring-cyan-400/40 animate-pulse">
              <Zap className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              <span>Live Synced</span>
            </span>
          </div>

          <div className="space-y-3.5">
            {/* Visual Link Ribbon indicating active link to Section 1 */}
            <div className="p-2.5 rounded-xl bg-cyan-50/80 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/80 flex items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-1.5 text-cyan-900 dark:text-cyan-200 font-bold truncate">
                <Link className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span className="truncate">
                  เชื่อมโยงยาจากข้อ 1: <strong className="text-teal-700 dark:text-teal-300">{drugName || 'ยา'}</strong> ({orderDose || 0} {orderUnit}) ➔ ดูดยา <strong className="text-amber-600 dark:text-amber-400">{formattedDrawVolume} mL</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={handleForceSyncWithDose}
                className="px-2 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-black shrink-0 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                title="กดเพื่อคำนวณปริมาณสารน้ำใหม่ตามขนาดยา"
              >
                <RefreshCw className="w-3 h-3" />
                <span>ซิงค์ขนาดยา</span>
              </button>
            </div>

            {/* Diluent Name Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                สารน้ำที่ใช้ผสม (Diluent Solution):
              </label>
              <select
                value={diluentName}
                onChange={e => {
                  setDiluentName(e.target.value);
                  setSelectedPresetId('');
                }}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              >
                <option value="0.9% Normal Saline (NSS)">0.9% Normal Saline Solution (NSS)</option>
                <option value="5% Dextrose in Water (D5W)">5% Dextrose in Water (D5W)</option>
                <option value="Sterile Water for Injection (SWFI)">Sterile Water for Injection (SWFI)</option>
                <option value="5% Dextrose in 1/2 NSS (5% D/N/2)">5% Dextrose in 1/2 Normal Saline (5% D/N/2)</option>
                <option value="Lactated Ringer's Solution (LRS)">Lactated Ringer's Solution (LRS)</option>
                <option value="0.45% Normal Saline (1/2 NSS)">0.45% Normal Saline (1/2 NSS)</option>
              </select>
            </div>

            {/* Administration Route Selector */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                วิธีการให้ยา (Administration Route):
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAdminRoute('drip');
                    setAutoSyncPushDiluent(false);
                    if (diluentVolume === 9.6 || diluentVolume === 6) {
                      setDiluentVolume(100);
                    }
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                    adminRoute === 'drip'
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  💧 IV Drip (ดริปผสมถุงสารน้ำ)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAdminRoute('iv_push');
                    setAutoSyncPushDiluent(true);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                    adminRoute === 'iv_push'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  💉 Slow IV Push (ฉีดช้าๆ ทางสายยาง)
                </button>
              </div>
            </div>

            {/* Diluent Volume Input & Auto-Sync Configuration */}
            {adminRoute === 'iv_push' ? (
              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>คำนวณปริมาณสารน้ำเจือจางอัตโนมัติ (IV Push Auto-Sync):</span>
                  </label>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-700">
                    ปรับตามขนาดยาทันที
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>เป้าหมายปริมาตรรวมในกระบอกฉีด (Target Syringe Volume):</span>
                    <span className="font-bold text-indigo-700 dark:text-indigo-300">{targetPushVolume} mL</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[5, 10, 20].map(vol => (
                      <button
                        key={vol}
                        type="button"
                        onClick={() => {
                          setTargetPushVolume(vol);
                          setAutoSyncPushDiluent(true);
                        }}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          targetPushVolume === vol && autoSyncPushDiluent
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        รวมเป็น {vol} mL
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auto-calculated Diluent Result */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">สารน้ำที่ต้องดูดเติมเพิ่ม:</span>
                    <span className="text-base font-black text-indigo-600 dark:text-indigo-400">
                      {formattedEffectiveDiluent} mL
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    สูตรคิดคำนวณ: ปริมาตรรวมเป้าหมาย ({targetPushVolume} mL) - ยาที่ดูดจากข้อ 1 ({formattedDrawVolume} mL) = <strong>{formattedEffectiveDiluent} mL</strong>
                  </p>
                </div>
              </div>
            ) : (
              /* IV Drip Volume Selection with Mode Switcher (Auto-scale vs Fixed Bag) */
              <div className="p-3.5 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/20 border-2 border-cyan-300 dark:border-cyan-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-cyan-950 dark:text-cyan-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>ปริมาณสารน้ำที่ต้องใช้ผสม (Diluent Volume):</span>
                  </label>
                  {/* Mode badge */}
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    dripDiluentMode === 'auto_scale'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                  }`}>
                    {dripDiluentMode === 'auto_scale' ? '⚡ ปรับตามขนาดยาอัตโนมัติ' : '📦 ถุงสารน้ำคงที่'}
                  </span>
                </div>

                {/* Mode Selector Toggle */}
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-cyan-200 dark:border-cyan-800 text-[11px]">
                  <button
                    type="button"
                    onClick={() => {
                      setDripDiluentMode('auto_scale');
                      handleForceSyncWithDose();
                    }}
                    className={`py-1.5 px-2 rounded-lg font-bold transition-all text-center cursor-pointer ${
                      dripDiluentMode === 'auto_scale'
                        ? 'bg-cyan-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600'
                    }`}
                  >
                    ⚡ คำนวณตามขนาดยา (Auto-Scale)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDripDiluentMode('fixed_bag')}
                    className={`py-1.5 px-2 rounded-lg font-bold transition-all text-center cursor-pointer ${
                      dripDiluentMode === 'fixed_bag'
                        ? 'bg-cyan-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600'
                    }`}
                  >
                    📦 ถุงสารน้ำสำเร็จรูป (Fixed Bag)
                  </button>
                </div>

                {/* Input Volume */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={diluentVolume}
                    onChange={e => {
                      const val = e.target.value;
                      setDiluentVolume(val === '' ? '' : parseFloat(val));
                      setDripDiluentMode('custom');
                      setSelectedPresetId('');
                    }}
                    placeholder="กรอกปริมาณสารน้ำ เช่น 100 (ลบได้)"
                    className="w-full px-3 py-2 text-lg font-black rounded-lg bg-white dark:bg-slate-900 border-2 border-cyan-400 dark:border-cyan-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">mL</span>
                </div>

                {/* Quick Fixed Bag Buttons */}
                <div className="flex flex-wrap items-center gap-1 pt-0.5">
                  <span className="text-[10px] text-slate-500 font-bold mr-1">เลือกถุงด่วน:</span>
                  {[50, 100, 250, 500, 1000].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => {
                        setDiluentVolume(v);
                        setDripDiluentMode('fixed_bag');
                      }}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                        diluentVolume === v
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-2xs'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {v} mL
                    </button>
                  ))}
                </div>

                {dripDiluentMode === 'auto_scale' && (
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-300 font-medium">
                    ✓ ปริมาณสารน้ำคำนวณตามสัดส่วนขนาดยา {orderDose || 0} {orderUnit} โดยอัตโนมัติ (อัปเดตแบบ Real-time)
                  </p>
                )}
              </div>
            )}

            {/* Duration Input */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  ระยะเวลาที่ต้องให้ยาจนหมด (Duration):
                </label>
                <button
                  type="button"
                  onClick={() => setDurationUnit(durationUnit === 'minutes' ? 'hours' : 'minutes')}
                  className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                >
                  สลับเป็น {durationUnit === 'minutes' ? 'ชั่วโมง' : 'นาที'}
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={durationValue}
                  onChange={e => {
                    const val = e.target.value;
                    setDurationValue(val === '' ? '' : parseFloat(val));
                  }}
                  placeholder="กรอกเวลา เช่น 30"
                  className="w-full px-3 py-2 text-sm font-bold rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <span className="text-xs font-bold text-slate-500 shrink-0">
                  {durationUnit === 'minutes' ? 'นาที' : 'ชม.'}
                </span>
              </div>
            </div>

            {/* Drop Factor Selector if Drip */}
            {adminRoute === 'drip' && (
              <div className="space-y-1 pt-0.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Drop Factor ของชุดสายน้ำเกลือ:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[15, 20, 60].map(df => (
                    <button
                      key={df}
                      type="button"
                      onClick={() => setDropFactor(df as any)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-all text-center cursor-pointer ${
                        dropFactor === df
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-2xs'
                          : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {df === 60 ? 'Micro 60' : `Macro ${df}`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* DYNAMIC LIVE CALCULATION SUMMARY CARD IN SECTION 2 */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950 via-slate-900 to-teal-950 text-white border-2 border-cyan-400/50 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-cyan-200 uppercase tracking-wide flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>ผลลัพธ์คำนวณสด (เปลี่ยนตามขนาดยา & ขวดยาทันที)</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 font-mono font-bold border border-cyan-400/30">
                  Live Synced
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/10">
                  <span className="text-[10px] text-cyan-200 block">💉 ยาที่ดูด (จากข้อ 1):</span>
                  <span className="text-base font-black text-amber-300">{formattedDrawVolume} mL</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/10">
                  <span className="text-[10px] text-cyan-200 block">💧 สารน้ำที่ผสม (ข้อ 2):</span>
                  <span className="text-base font-black text-cyan-300">{formattedEffectiveDiluent} mL</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/10">
                  <span className="text-[10px] text-cyan-200 block">🧪 ปริมาตรรวมหลังผสม:</span>
                  <span className="text-base font-black text-white">{formattedTotalVolume} mL</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/10">
                  <span className="text-[10px] text-cyan-200 block">⏱️ อัตราเร็วที่ต้องให้:</span>
                  <span className="text-base font-black text-emerald-300">
                    {adminRoute === 'drip'
                      ? `${pumpRateMlHr.toFixed(1)} mL/hr`
                      : `${ivPushRatePerMin.toFixed(2)} mL/นาที`}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/15 text-[11px] text-cyan-200 flex items-center justify-between">
                <span>ความเข้มข้นหลังผสม: <strong>{finalConcentration.toFixed(2)} mg/mL</strong></span>
                {adminRoute === 'drip' && (
                  <span>อัตราหยด: <strong className="text-amber-300 font-bold">{Math.round(dropsPerMinute)} หยด/นาที</strong> ({secondsPerDrop} วิ/หยด)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. STEP-BY-STEP ACTIONABLE CLINICAL SUMMARY CARD          */}
      {/* ========================================================= */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white shadow-xl border-2 border-emerald-500/50 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/15">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black">
              📋
            </span>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                สรุปขั้นตอนการเตรียมยา & ผสมสารน้ำตามคำสั่งแพทย์ (Action Plan)
              </h4>
              <span className="text-[11px] text-emerald-300 font-medium">
                {drugName ? `ยา: ${drugName}` : 'ยาตามคำสั่ง'} • สั่ง {orderDose || 0} {orderUnit} • เชื่อมโยงผลคำนวณสด
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 self-start sm:self-auto flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ready for Administration</span>
          </span>
        </div>

        {/* 3 Step Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* STEP 1: DRAW DRUG */}
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                <Syringe className="w-3.5 h-3.5 text-teal-300" />
                ขั้นที่ 1: ดูดยา
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/30 text-teal-200 font-bold">
                ขวดยา
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                ดูด <span className="text-amber-300">{formattedDrawVolume} mL</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-snug">
                จากขวด {drugName} ({stockDose || 0} {stockUnit}/{stockVolume || 0} mL)
              </p>
            </div>
            <div className="pt-1 border-t border-white/10 text-[11px] text-teal-200">
              💡 แนะนำ: {getSyringeRecommendation(calculatedDrawVolume)}
            </div>
          </div>

          {/* STEP 2: MIX WITH DILUENT */}
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-cyan-300" />
                ขั้นที่ 2: ผสมสารน้ำ
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/30 text-cyan-200 font-bold">
                ผสมกับ
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                ผสม <span className="text-cyan-300">{formattedEffectiveDiluent} mL</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-snug truncate" title={diluentName}>
                กับ <strong>{diluentName}</strong>
              </p>
            </div>
            <div className="pt-1 border-t border-white/10 text-[11px] text-cyan-200 flex items-center justify-between">
              <span>ปริมาตรรวม: <strong>{formattedTotalVolume} mL</strong></span>
              <span>ความเข้มข้น: <strong>{finalConcentration.toFixed(2)} mg/mL</strong></span>
            </div>
          </div>

          {/* STEP 3: ADMINISTRATION RATE */}
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-300" />
                ขั้นที่ 3: บริหารยา
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 font-bold">
                {adminRoute === 'drip' ? 'IV Drip' : 'IV Push'}
              </span>
            </div>
            <div>
              {adminRoute === 'drip' ? (
                <>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">
                    {pumpRateMlHr.toFixed(1)} <span className="text-base text-white font-sans font-bold">mL/hr</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    หรือปรับสาย {dropFactor} drops: <strong className="text-amber-300">{Math.round(dropsPerMinute)} หยด/นาที</strong>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">
                    {ivPushRatePerMin.toFixed(2)} <span className="text-base text-white font-sans font-bold">mL/นาที</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    ฉีดช้าๆ สม่ำเสมอนาน <strong>{durationValue || 0} นาที</strong>
                  </div>
                </>
              )}
            </div>
            <div className="pt-1 border-t border-white/10 text-[11px] text-emerald-200">
              ⏱️ ให้หมดภายใน: <strong>{durationValue || 0} {durationUnit === 'hours' ? 'ชั่วโมง' : 'นาที'}</strong>
              {adminRoute === 'drip' && ` (1 หยด ทุก ${secondsPerDrop} วิ)`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
