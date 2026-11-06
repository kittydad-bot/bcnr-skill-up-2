import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, X, CheckCircle, ShieldAlert, ArrowRight } from 'lucide-react';

export const QuickReviewModal: React.FC = () => {
  const { isQuickReviewModalOpen, setIsQuickReviewModalOpen, setActiveTab, setSelectedProcedure } = useApp();

  if (!isQuickReviewModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-teal-500/50 text-slate-900 dark:text-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                สรุปย่อด่วนใน 30 วินาที (30s Clinical Cheat Sheet)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                คู่มือสรุปย่อด่วนสำหรับการทบทวนก่อนเข้าหาผู้ป่วย
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsQuickReviewModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Procedures Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          {/* IM */}
          <div
            onClick={() => {
              setSelectedProcedure('IM');
              setIsQuickReviewModalOpen(false);
              setActiveTab('checklist');
            }}
            className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 hover:border-teal-400 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-teal-800 dark:text-teal-300">IM (กล้ามเนื้อ)</span>
              <span className="px-1.5 py-0.5 rounded bg-teal-200 dark:bg-teal-900 text-[10px] font-bold text-teal-900 dark:text-teal-200">
                90°
              </span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
              <li>• เข็ม 21-23G ยาว 1-1.5 นิ้ว</li>
              <li>• Ventrogluteal ปลอดภัยที่สุด</li>
              <li>• Z-track สำหรับยาที่ระคายเคืองสูง</li>
              <li>• ฉีดช้าๆ 10 วิ/mL คงเข็ม 10 วิ</li>
            </ul>
          </div>

          {/* SC */}
          <div
            onClick={() => {
              setSelectedProcedure('SC');
              setIsQuickReviewModalOpen(false);
              setActiveTab('checklist');
            }}
            className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 hover:border-amber-400 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-amber-800 dark:text-amber-300">SC (ใต้ผิวหนัง)</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-[10px] font-bold text-amber-900 dark:text-amber-200">
                45° - 90°
              </span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
              <li>• เข็ม 25-27G สั้น 3/8-5/8 นิ้ว</li>
              <li>• หน้าท้องห่างสะดือ 2 นิ้ว หมุนเวียนจุด</li>
              <li>• จับจีบผิวหนังยกขึ้น (Pinch)</li>
              <li>• ห้ามถูนวด Heparin/Insulin เด็ดขาด</li>
            </ul>
          </div>

          {/* ID */}
          <div
            onClick={() => {
              setSelectedProcedure('ID');
              setIsQuickReviewModalOpen(false);
              setActiveTab('checklist');
            }}
            className="p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 hover:border-sky-400 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sky-800 dark:text-sky-300">ID (ในชั้นผิวหนัง)</span>
              <span className="px-1.5 py-0.5 rounded bg-sky-200 dark:bg-sky-900 text-[10px] font-bold text-sky-900 dark:text-sky-200">
                10° - 15°
              </span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
              <li>• Syringe 1 mL ขีดละเอียด 0.01</li>
              <li>• หงายปลายเข็มขึ้น (Bevel up)</li>
              <li>• ต้องเกิดตุ่มนูนใส (Wheal) 6-10 mm</li>
              <li>• ห้ามกด ห้ามถู ห้ามปิดพลาสเตอร์</li>
            </ul>
          </div>

          {/* IV */}
          <div
            onClick={() => {
              setSelectedProcedure('IV');
              setIsQuickReviewModalOpen(false);
              setActiveTab('checklist');
            }}
            className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 hover:border-blue-400 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-blue-800 dark:text-blue-300">IV Push (หลอดเลือด)</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-200 dark:bg-blue-900 text-[10px] font-bold text-blue-900 dark:text-blue-200">
                15° - 30°
              </span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
              <li>• Scrub the Hub 15 วิ รอแห้ง</li>
              <li>• ตรวจ Blood return & Flush NSS ก่อน</li>
              <li>• ปล่อยยาช้าๆ ตามที่กำหนด ห้ามรีบ Push</li>
              <li>• Flush ปิดท้ายอัตราเดียวกับยา</li>
            </ul>
          </div>
        </div>

        {/* Universal Safety Gold Rules */}
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs space-y-1.5">
          <div className="font-bold text-red-700 dark:text-red-300 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            กฎเหล็กความปลอดภัย 3 ข้อ:
          </div>
          <p className="text-[11px] text-red-900 dark:text-red-200 leading-snug">
            1. ตรวจสอบชื่อ-นามสกุล, HN, และประวัติแพ้ยาทุกครั้ง<br />
            2. ห้ามสวมปลอกเข็มกลับด้วยสองมือ (No Recapping) ทิ้งลงถัง Sharps ทันที<br />
            3. ปฏิบัติตามแนวทางของสถาบัน โรงพยาบาล และคำแนะนำของอาจารย์ผู้สอน
          </p>
        </div>

        <button
          onClick={() => setIsQuickReviewModalOpen(false)}
          className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all"
        >
          เข้าใจแล้ว เริ่มลงมือปฏิบัติ
        </button>
      </div>
    </div>
  );
};
