import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, ShieldAlert, CheckCircle, ArrowLeft } from 'lucide-react';

export const SafetyAlertModal: React.FC = () => {
  const { safetyAlertStep, setSafetyAlertStep, confirmBypassSafetyAlert } = useApp();

  if (!safetyAlertStep) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-red-500/80 dark:border-red-500 text-slate-900 dark:text-slate-100 space-y-4">
        {/* Header Icon */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 shadow-inner">
            <AlertTriangle className="w-7 h-7 animate-bounce" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              Safety Alert • จุดความปลอดภัยวิกฤต
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
              โปรดตรวจสอบขั้นตอนนี้ก่อนดำเนินการต่อ!
            </h3>
          </div>
        </div>

        {/* Skipped Step Details */}
        <div className="bg-red-50 dark:bg-red-950/40 p-4 rounded-2xl border border-red-200 dark:border-red-800/60 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-xs">
              ขั้นตอนที่ {safetyAlertStep.stepNumber}
            </span>
            <span className="font-bold text-sm text-red-900 dark:text-red-200">
              {safetyAlertStep.titleTh}
            </span>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {safetyAlertStep.descriptionTh}
          </p>

          <div className="pt-2 border-t border-red-200/80 dark:border-red-800/60 text-xs font-semibold text-red-800 dark:text-red-300 flex items-start gap-1.5">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
            <span>
              <strong>เหตุผลทางความปลอดภัย:</strong>{' '}
              {safetyAlertStep.safetyAlertReason ||
                'ขั้นตอนนี้เป็นขั้นตอนวิกฤตที่มีผลต่อสวัสดิภาพและความปลอดภัยของผู้ป่วย การข้ามอาจก่อให้เกิดอันตรายรุนแรง'}
            </span>
          </div>
        </div>

        {/* Advisory Warning */}
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          * ในการปฏิบัติการพยาบาลจริง นักศึกษาต้องตรวจสอบและปฏิบัติตามลำดับความปลอดภัยอย่างเคร่งครัด
          ห้ามข้ามขั้นตอนการยืนยันตัวตน การแพ้ยา หรือการควบคุมการติดเชื้อ
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <button
            onClick={() => setSafetyAlertStep(null)}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-600 font-semibold text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center gap-1.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับไปแก้ไข
          </button>
          <button
            onClick={confirmBypassSafetyAlert}
            className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            ตรวจสอบและทำแล้ว ✓
          </button>
        </div>
      </div>
    </div>
  );
};
