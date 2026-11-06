import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ProcedureType, TenRight } from '../../types';
import { PROCEDURES_DATA, TEN_RIGHTS_DATA } from '../../data/defaultData';
import { SkinLayersDiagram } from '../diagrams/SkinLayersDiagram';
import { SyringeNeedleVisual } from '../diagrams/SyringeNeedleVisual';
import { TechniqueAnimation } from '../diagrams/TechniqueAnimation';
import { DosageCalculationVisual } from '../diagrams/DosageCalculationVisual';
import { MedicationsGuideVisual } from '../diagrams/MedicationsGuideVisual';
import {
  Volume2,
  VolumeX,
  ShieldAlert,
  Compass,
  CheckCircle2,
  ChevronRight,
  Eye,
  X,
  Camera,
  Check,
  Syringe,
  BookOpen,
  ArrowLeft,
  Home,
} from 'lucide-react';

export const ReviewView: React.FC = () => {
  const {
    selectedProcedure,
    setSelectedProcedure,
    speakText,
    stopSpeech,
    isSpeaking,
    playAudioChime,
    setActiveTab,
    reviewSubTab,
    setReviewSubTab,
  } = useApp();

  const activeSubTab = reviewSubTab;
  const setActiveSubTab = setReviewSubTab;
  const [selected10Right, setSelected10Right] = useState<TenRight>(TEN_RIGHTS_DATA[0]);

  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; subtitle: string } | null>(null);

  const currentProcData = PROCEDURES_DATA.find(p => p.code === selectedProcedure) || PROCEDURES_DATA[0];

  const handleSpeakProcedure = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      if (activeSubTab === 'landmarks') {
        speakText(
          'คู่มือตำแหน่งทางกายวิภาคและการคลำหาจุดฉีด รวมทั้ง 4 ช่องทาง ได้แก่ การฉีดเข้ากล้ามเนื้อ IM, ใต้ผิวหนัง SC, ในชั้นผิวหนัง ID, และเข้าหลอดเลือดดำ IV รวมจุด Landmark สำคัญทั้งหมด'
        );
      } else {
        speakText(
          `คู่มือการฉีดยาแบบ ${currentProcData.nameTh}. ${currentProcData.definition}. มุมการแทงเข็ม ${currentProcData.angleDegrees} องศา. ชั้นเป้าหมาย: ${currentProcData.targetLayerTh}. สรุปเทคนิค: ${currentProcData.quickMnemonic5s}`
        );
      }
    }
  };

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Top Header & Procedure Selector */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        {/* Breadcrumb Hierarchy with กลับหน้าหลัก button */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-700/60">
          <button
            onClick={() => setActiveTab('home')}
            className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-700/80 hover:bg-teal-50 dark:hover:bg-teal-950 text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1.5 font-bold transition-all text-xs border border-slate-200 dark:border-slate-600 shadow-2xs hover:scale-[1.02] active:scale-95"
            title="กลับสู่หน้าหลัก (8 หัวข้อหลักทางการพยาบาล)"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <Home className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>กลับหน้าหลัก (8 หัวข้อ)</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="px-2 py-0.5 rounded-lg bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800 flex items-center gap-1">
            <Syringe className="w-3 h-3 -rotate-45" />
            หัวข้อหลัก: การฉีดยา (Medication Injections)
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-teal-600" />
            สมุดภาพการเรียนรู้ (Visual Learning Atlas)
          </span>
        </div>

        {/* Header Title & Audio Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 font-bold text-xs">
                สมุดภาพประกอบการเรียนรู้ (Visual Atlas)
              </span>
              <span className="text-xs text-slate-400">• กายวิภาค, มุมฉีด, กระบอกยา & เข็ม, 10 Rights</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              คู่มือภาพและหลักการทางคลินิก (Visual Guide & EBP)
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakProcedure}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isSpeaking
                  ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-400'
                  : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200'
              }`}
            >
              {isSpeaking ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
              <span>{isSpeaking ? 'หยุดอ่าน' : '🔊 อ่านออกเสียง'}</span>
            </button>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div
          style={{ backgroundColor: '#fcffd1' }}
          className="flex overflow-x-auto no-scrollbar gap-1.5 p-1.5 rounded-2xl border border-amber-200/80 dark:border-slate-700"
        >
          <button
            onClick={() => setActiveSubTab('landmarks')}
            style={{ backgroundColor: '#fffdd8' }}
            className={`p-4 text-sm rounded-xl font-bold whitespace-nowrap transition-all text-slate-900 border border-blue-300 shadow-2xs ${
              activeSubTab === 'landmarks'
                ? 'ring-2 ring-blue-600/60 font-extrabold'
                : 'opacity-90 hover:opacity-100'
            }`}
          >
            🧭 ตำแหน่งทางกายวิภาค (รวม IM • SC • ID • IV)
          </button>
          <button
            onClick={() => setActiveSubTab('visual')}
            className={`p-4 text-sm  rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'visual'
                ? 'bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-200 border border-teal-300 dark:border-teal-700'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            📐 กายวิภาค & มุมฉีด
          </button>
          <button
            onClick={() => setActiveSubTab('medications')}
            className={`p-4 text-sm  rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'medications'
                ? 'bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-200 border border-teal-300 dark:border-teal-700'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            💊 ยาฉีดที่พบบ่อย (Medications)
          </button>
          <button
            onClick={() => setActiveSubTab('dosage-calc')}
            className={`p-4 text-sm  rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'dosage-calc'
                ? 'bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-200 border border-teal-300 dark:border-teal-700'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            🧮 คำนวณยาฉีด & ยาดริป
          </button>
          <button
            onClick={() => setActiveSubTab('equipment')}
            className={`p-4 text-sm  rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'equipment'
                ? 'bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-200 border border-teal-300 dark:border-teal-700'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            💉 อุปกรณ์ & ขนาดเข็ม
          </button>
          <button
            onClick={() => setActiveSubTab('10rights')}
            className={`p-4 text-sm  rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === '10rights'
                ? 'bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-200 border border-teal-300 dark:border-teal-700'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            🛡️ หลัก 10 Rights
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: ANATOMY & ANGLES + TECHNIQUE ANIMATION */}
      {activeSubTab === 'visual' && (
        <div className="space-y-5">
          {/* Interactive Skin Layers & Angle Visual */}
          <SkinLayersDiagram />

          {/* Looping Technique Simulation Cards */}
          <TechniqueAnimation />
        </div>
      )}

      {/* SUB-TAB: MEDICATIONS GUIDE */}
      {activeSubTab === 'medications' && (
        <div className="space-y-4">
          <MedicationsGuideVisual />
        </div>
      )}

      {/* SUB-TAB: DOSAGE CALCULATION */}
      {activeSubTab === 'dosage-calc' && (
        <div className="space-y-4">
          <DosageCalculationVisual />
        </div>
      )}

      {/* SUB-TAB 2: EQUIPMENT & SYRINGES */}
      {activeSubTab === 'equipment' && (
        <div className="space-y-4">
          <SyringeNeedleVisual />
        </div>
      )}

      {/* SUB-TAB 3: ANATOMY SITES & LANDMARKS (รวม IM • SC • ID • IV ทั้งหมดในหน้าเดียว) */}
      {activeSubTab === 'landmarks' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Render each procedure's landmarks */}
          {PROCEDURES_DATA.map((proc, pIndex) => (
            <section
              key={proc.id}
              id={`site-section-${proc.code}`}
              className="space-y-4 pt-2 scroll-mt-20"
            >
              {/* Section Header for this procedure */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b-2 border-teal-500/40 dark:border-teal-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0">
                    {proc.code}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                        {proc.nameTh} ({proc.nameEn})
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[11px] font-bold">
                        มุม {proc.angle}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-semibold">
                        {proc.targetLayerTh}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {proc.quickMnemonic5s} • {proc.commonSites.length} ตำแหน่งทางกายวิภาคที่แนะนำ
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-medium self-start sm:self-center">
                  หมวดที่ {pIndex + 1} จาก {PROCEDURES_DATA.length}
                </div>
              </div>

              {/* Sites Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {proc.commonSites.map((site, index) => {
                  const activeImage = site.imageUrl;

                  return (
                    <div
                      key={site.nameEn}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs flex flex-col justify-between hover:border-teal-300 dark:hover:border-teal-700 transition-all"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-bold text-sm text-teal-800 dark:text-teal-300 block">
                              {site.nameTh}
                            </span>
                            <span className="text-xs text-slate-400 italic">{site.nameEn}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-[10px]">
                              {proc.code}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px]">
                              ตำแหน่งที่ {index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Anatomical Image Display */}
                        {activeImage ? (
                          <div
                            onClick={() =>
                              setLightboxImage({
                                url: activeImage,
                                title: `${proc.code}: ${site.nameTh}`,
                                subtitle: site.nameEn,
                              })
                            }
                            className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 h-48 group cursor-pointer shadow-inner"
                          >
                            <img
                              src={activeImage}
                              alt={site.nameTh}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                              <span className="text-[11px] text-white font-medium flex items-center gap-1 bg-black/40 px-2 py-1 rounded-md backdrop-blur-xs">
                                <Eye className="w-3.5 h-3.5" /> แตะเพื่อขยายภาพ
                              </span>
                              <span className="text-[10px] text-teal-200 font-bold bg-teal-900/80 px-2 py-0.5 rounded-md">
                                {proc.code}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 h-36 flex flex-col items-center justify-center p-3 text-center bg-slate-50/50 dark:bg-slate-900/40">
                            <Camera className="w-6 h-6 text-slate-400 mb-1" />
                            <span className="text-xs text-slate-500 font-medium">ภาพประกอบตำแหน่งทางกายวิภาค</span>
                            <span className="text-[10px] text-slate-400">{site.nameTh} ({site.nameEn})</span>
                          </div>
                        )}

                        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                          <p>
                            <strong className="text-slate-800 dark:text-slate-200">จุดสังเกตคลำหา (Landmarks):</strong>{' '}
                            {site.landmarks}
                          </p>
                          <p>
                            <strong className="text-slate-800 dark:text-slate-200">ข้อควรระวังทางคลินิก:</strong>{' '}
                            {site.clinicalNotes}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* SUB-TAB 5: 10 RIGHTS */}
      {activeSubTab === '10rights' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs">
            <h4 className="font-bold text-sm text-teal-900 dark:text-teal-200 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-teal-600" />
              หลัก 10 ประการเพื่อความปลอดภัยในการบริหารยา (10 Rights of Medication Administration)
            </h4>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              หัวใจสำคัญที่สุดเพื่อป้องกัน Medication Error ในนักศึกษาพยาบาล
            </p>
          </div>

          {/* 10 Rights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {TEN_RIGHTS_DATA.map(item => (
              <button
                key={item.id}
                onClick={() => setSelected10Right(item)}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  selected10Right.id === item.id
                    ? 'border-teal-500 bg-teal-50/80 dark:bg-teal-950/60 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {item.id}
                  </span>
                  {selected10Right.id === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  )}
                </div>
                <p className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">
                  {item.rightTh}
                </p>
                <p className="text-[10px] text-slate-400 truncate">{item.rightEn}</p>
              </button>
            ))}
          </div>

          {/* Selected 10 Right Expanded Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                {selected10Right.id}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {selected10Right.rightTh} ({selected10Right.rightEn})
                </h4>
                <p className="text-xs text-teal-700 dark:text-teal-400">
                  แนวทางตรวจสอบมาตรฐานทางการพยาบาล
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
              {selected10Right.description}
            </p>

            <div className="p-3 rounded-xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 text-xs">
              <span className="font-bold text-teal-900 dark:text-teal-200 block mb-1">
                🔍 วิธีการตรวจสอบทางคลินิก (Clinical Verification):
              </span>
              <p className="text-slate-600 dark:text-slate-300">
                {selected10Right.checkpoint}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Full-res Anatomical Inspection */}
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
              💡 ทบทวนจุดเกาะกระดูก (Bony Landmarks) และแนวเส้นประสาทก่อนลงมือฉีดยาจริง
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
