import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SbarScenario, SBARRecord } from '../../types';
import { SBAR_DEFAULT_SCENARIOS } from '../../data/defaultData';
import {
  MessageSquare,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  ShieldAlert,
  HelpCircle,
  FileText,
  Award,
  Clock,
  History,
  CheckCircle2,
  Home,
  ArrowLeft,
  ChevronRight,
  Syringe,
  BookOpen,
  CheckSquare,
} from 'lucide-react';

export const SbarView: React.FC = () => {
  const { speakText, stopSpeech, isSpeaking, playAudioChime, saveSBAR, sbarHistory, user, setActiveTab } = useApp();

  const [scenarios] = useState<SbarScenario[]>(SBAR_DEFAULT_SCENARIOS);
  const [selectedScenario, setSelectedScenario] = useState<SbarScenario>(SBAR_DEFAULT_SCENARIOS[0]);

  // SBAR form fields
  const [situation, setSituation] = useState(SBAR_DEFAULT_SCENARIOS[0].situationTemplate);
  const [background, setBackground] = useState(SBAR_DEFAULT_SCENARIOS[0].backgroundTemplate);
  const [assessment, setAssessment] = useState(SBAR_DEFAULT_SCENARIOS[0].assessmentTemplate);
  const [recommendation, setRecommendation] = useState(SBAR_DEFAULT_SCENARIOS[0].recommendationTemplate);

  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSelectScenario = (sc: SbarScenario) => {
    setSelectedScenario(sc);
    setSituation(sc.situationTemplate);
    setBackground(sc.backgroundTemplate);
    setAssessment(sc.assessmentTemplate);
    setRecommendation(sc.recommendationTemplate);
  };

  const handleResetToTemplate = () => {
    setSituation(selectedScenario.situationTemplate);
    setBackground(selectedScenario.backgroundTemplate);
    setAssessment(selectedScenario.assessmentTemplate);
    setRecommendation(selectedScenario.recommendationTemplate);
    playAudioChime('click');
  };

  const compiledScript = `[รายงานแบบ SBAR สำหรับสถานการณ์: ${selectedScenario.title}]
1. Situation (สถานการณ์ปัจจุบัน):
${situation}

2. Background (ข้อมูลภูมิหลัง):
${background}

3. Assessment (การประเมินสภาพ):
${assessment}

4. Recommendation (ข้อเสนอแนะที่ต้องการ):
${recommendation}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledScript);
    setCopied(true);
    playAudioChime('success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      speakText(compiledScript);
    }
  };

  const handleSavePractice = () => {
    const newRecord: SBARRecord = {
      id: `sbar-${Date.now()}`,
      userId: user.id,
      timestamp: new Date().toISOString(),
      procedureCode: 'IM',
      situation,
      backgroundInfo: background,
      clinicalFindings: assessment,
      recommendation,
      generatedScript: compiledScript,
    };

    saveSBAR(newRecord);
    setSavedSuccess(true);
    playAudioChime('success');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Header */}
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
            <MessageSquare className="w-3 h-3 text-teal-600" />
            ฝึกรายงาน SBAR
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold text-xs">
              Unit 3: ฝึกทักษะการสื่อสารทางคลินิก (SBAR)
            </span>
            <span className="text-xs text-slate-400">• Interprofessional Communication</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            SBAR Pitching Simulator (เครื่องมือจำลองสคริปต์รายงานฉุกเฉิน)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ฝึกรายงานพยาบาลพี่เลี้ยงหรือแพทย์อย่างกระชับ ชัดเจน และมีโครงสร้าง เมื่อเกิดเหตุการณ์ไม่พึงประสงค์จากการฉีดยา
          </p>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
          เลือกสถานการณ์จำลองทางคลินิก (Clinical Scenarios):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {scenarios.map(sc => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                selectedScenario.id === sc.id
                  ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/50 shadow-xs ring-2 ring-teal-500/20'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block mb-1">
                {sc.title}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                {sc.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* SBAR Interactive Form */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            โครงสร้างการรายงาน 4 องค์ประกอบ (S - B - A - R)
          </h3>
          <button
            onClick={handleResetToTemplate}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-teal-600 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            รีเซ็ตเป็นค่าเริ่มต้น
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {/* S */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">
                S
              </span>
              Situation (สถานการณ์ปัจจุบัน: ตัวท่านเป็นใคร, ผู้ป่วยเตียงไหน, เกิดอะไรขึ้น):
            </label>
            <textarea
              value={situation}
              onChange={e => setSituation(e.target.value)}
              rows={2}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* B */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">
                B
              </span>
              Background (ภูมิหลัง: ประวัติการเจ็บป่วย, ยาที่เพิ่งได้รับ, ประวัติแพ้ยา):
            </label>
            <textarea
              value={background}
              onChange={e => setBackground(e.target.value)}
              rows={2}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* A */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                A
              </span>
              Assessment (การประเมิน: สัญญาณชีพ BP, PR, SpO2, อาการแสดงที่ตรวจพบ):
            </label>
            <textarea
              value={assessment}
              onChange={e => setAssessment(e.target.value)}
              rows={2}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* R */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">
                R
              </span>
              Recommendation (ข้อเสนอแนะ: ต้องการให้พี่มาดูทันที, ขอคำสั่งหยุดยา, เตรียมยาฉุกเฉิน):
            </label>
            <textarea
              value={recommendation}
              onChange={e => setRecommendation(e.target.value)}
              rows={2}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Generated Script Display & Practice */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-400" />
            <span className="font-bold text-xs uppercase tracking-wider text-teal-400">
              สคริปต์สำหรับพูดรายงานจริง (Generated Verbal Script)
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleSpeak}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold flex items-center gap-1 transition-all ${
                isSpeaking
                  ? 'bg-teal-600 text-white ring-1 ring-teal-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {isSpeaking ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? 'หยุดอ่าน' : '🔊 ฟังเสียงต้นแบบ'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'คัดลอกแล้ว' : 'คัดลอกสคริปต์'}</span>
            </button>

            <button
              onClick={handleSavePractice}
              className="px-3 py-1 text-xs rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center gap-1 transition-all shadow-sm"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>บันทึกแล้ว!</span>
                </>
              ) : (
                <>
                  <Award className="w-3.5 h-3.5" />
                  <span>บันทึกการฝึกซ้อม (รับ Badge)</span>
                </>
              )}
            </button>
          </div>
        </div>

        <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
          {compiledScript}
        </pre>
      </div>

      {/* SBAR Practice History */}
      {sbarHistory.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3 text-xs">
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <History className="w-4 h-4 text-teal-600" />
            ประวัติการฝึกซ้อม SBAR ที่บันทึกไว้ ({sbarHistory.length} รายการ)
          </h4>
          <div className="space-y-2">
            {sbarHistory.slice(0, 3).map(rec => (
              <div
                key={rec.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-700 dark:text-teal-300">
                    {rec.situation.slice(0, 45)}...
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(rec.timestamp).toLocaleDateString('th-TH')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1">
                  <strong>ข้อเสนอแนะ:</strong> {rec.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
