import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, PhoneCall, AlertOctagon, X, Check, ShieldAlert, LifeBuoy, ArrowRight } from 'lucide-react';

export const SOSModal: React.FC = () => {
  const { isSOSModalOpen, setIsSOSModalOpen, sosContacts, playAudioChime } = useApp();
  const [callingId, setCallingId] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'contacts' | 'algorithm'>('contacts');

  if (!isSOSModalOpen) return null;

  const handleSimulateCall = (id: string, phone: string) => {
    playAudioChime('alert');
    setCallingId(id);
    setTimeout(() => {
      setCallingId(null);
    }, 3000);
  };

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border-2 border-red-500 text-slate-900 dark:text-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-500/30 animate-pulse">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                Emergency & Clinical Escalation
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                ต้องการความช่วยเหลือฉุกเฉิน (SOS)
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsSOSModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'contacts'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            ติดต่อผู้รับผิดชอบ
          </button>
          <button
            onClick={() => setActiveTab('algorithm')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'algorithm'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            แนวทางเมื่อเกิดเหตุผิดปกติ
          </button>
        </div>

        {/* 1. CONTACTS LIST */}
        {activeTab === 'contacts' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              เมื่อพบความผิดปกติหรือเหตุการณ์ไม่ปลอดภัย ให้หยุดหัตถการและแจ้งพยาบาลพี่เลี้ยงหรืออาจารย์ทันที:
            </p>

            {sosContacts.map(contact => (
              <div
                key={contact.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 space-y-2 hover:border-red-300 dark:hover:border-red-800 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 block">
                      {contact.roleTh}
                    </span>
                    <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                      {contact.name}
                    </p>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {contact.department}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-[10px] font-bold shrink-0">
                    24 ชั่วโมง
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  {contact.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700/80">
                  <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                    📞 {contact.phoneNumber}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleCopyPhone(contact.phoneNumber)}
                      className="px-2.5 py-1 text-[11px] rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1"
                    >
                      {copiedPhone === contact.phoneNumber ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" /> คัดลอกแล้ว
                        </>
                      ) : (
                        'คัดลอกเบอร์'
                      )}
                    </button>
                    <button
                      onClick={() => handleSimulateCall(contact.id, contact.phoneNumber)}
                      className={`px-3 py-1 text-[11px] rounded-lg font-bold text-white flex items-center gap-1 shadow-xs transition-all ${
                        callingId === contact.id ? 'bg-amber-600 animate-pulse' : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      <PhoneCall className="w-3 h-3" />
                      {callingId === contact.id ? 'กำลังเชื่อมต่อ...' : 'โทรออกด่วน'}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <p className="text-[10px] text-slate-400 dark:text-slate-500 italic text-center">
              * หมายเลขและชื่อผู้รับผิดชอบสามารถปรับปรุงแก้ไขได้ในโหมดผู้ดูแลระบบ (Admin)
            </p>
          </div>
        )}

        {/* 2. EMERGENCY ALGORITHM */}
        {activeTab === 'algorithm' && (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-900 dark:text-red-300 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-sm">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                อัลกอริทึมปฏิบัติการเมื่อเกิดภาวะแทรกซ้อนเฉียบพลัน
              </span>
              <p className="text-[11px]">
                เช่น แพ้ยารุนแรง (Anaphylaxis), ผู้ป่วยเป็นลมหมดสติ (Vasovagal syncope), หรือเข็มหัก/หลุด
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-100">
                    หยุดการฉีดยาทันที (STOP INJECTION)
                  </h5>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                    หากกำลังฉีด ให้หยุดดันยาทันที หากเป็น IV ให้คง IV line ไว้สำหรับให้สารน้ำ/ยาฉุกเฉิน
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-100">
                    ร้องขอความช่วยเหลือ & ไม่ทิ้งผู้ป่วย (CALL FOR HELP)
                  </h5>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                    กดกริ่งเรียกพยาบาลพี่เลี้ยงทันที หรือตะโกนขอความช่วยเหลือ ห้ามเดินหนีทิ้งผู้ป่วยไว้ลำพังเด็ดขาด
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-100">
                    ประเมินทางเดินหายใจและสัญญาณชีพ (AIRWAY & VITALS)
                  </h5>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                    จัดท่านอนราบยกขาสูง (หากความดันตก) หรือนั่งพิง (หากหายใจลำบาก) ตรวจวัด BP, HR, SpO2 ทันที
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  4
                </span>
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-100">
                    รายงานด้วยระบบ SBAR อย่างรวดเร็ว (REPORT SBAR)
                  </h5>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                    บอก Situation, Background (ยาที่ฉีด), Assessment (สัญญาณชีพและอาการ), Recommendation ชัดเจน
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2">
          <button
            onClick={() => setIsSOSModalOpen(false)}
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 font-semibold text-xs text-slate-700 dark:text-slate-200 transition-all"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
