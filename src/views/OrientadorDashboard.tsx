import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  MessageSquare, 
  CheckCircle2, 
  Plus, 
  FileText, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  Clock
} from 'lucide-react';
import { IncidentStatus, MediationStage } from '../types';

export const OrientadorDashboard: React.FC = () => {
  const { 
    incidents, 
    mediations, 
    earlyWarnings, 
    students,
    updateIncidentStatus, 
    updateMediationStage,
    setIsMediationModalOpen, 
    setSelectedStudent,
    setSelectedProposal,
    proposals
  } = useApp();

  const [activeTab, setActiveTab] = useState<'relatos' | 'mediacoes' | 'sinais'>('relatos');

  const stageLabels: Record<MediationStage, { label: string; step: number }> = {
    acolhimento: { label: '1. Acolhimento Individual', step: 1 },
    escuta_ativa: { label: '2. Escuta Ativa Sem Julgamento', step: 2 },
    circulo_restaurativo: { label: '3. Círculo Restaurativo', step: 3 },
    acordo_assinado: { label: '4. Acordo de Convivência', step: 4 },
    pos_acompanhamento: { label: '5. Pós-Acompanhamento', step: 5 }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/30">
            <Users className="w-3.5 h-3.5 text-emerald-200" />
            Serviço de Orientação Pedagógica & Psicologia Escolar
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-xs">
            Central de Escuta, Mediação Restaurativa e Apoio Emocional 🌿
          </h1>
          <p className="text-emerald-100 text-sm leading-relaxed font-medium">
            Triagem humanizada de denúncias, facilitação de círculos de paz e acolhimento clínico-pedagógico dos estudantes sob sigilo profissional.
          </p>
          <div className="flex gap-3 pt-3">
            <button
              onClick={() => setIsMediationModalOpen(true)}
              className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-emerald-600" />
              Instaurar Nova Mediação de Conflito
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('relatos')}
          className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'relatos'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Canal de Relatos & Denúncias ({incidents.length})
        </button>

        <button
          onClick={() => setActiveTab('mediacoes')}
          className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'mediacoes'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Casos de Mediação & Círculos ({mediations.length})
        </button>

        <button
          onClick={() => setActiveTab('sinais')}
          className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'sinais'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Sinais Precoces & Vulnerabilidades ({earlyWarnings.length})
        </button>
      </div>

      {/* Tab Content: Relatos */}
      {activeTab === 'relatos' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900">
              Ocorrências Registradas (Canal Seguro & Docentes)
            </h2>
            <span className="text-xs text-slate-500">
              Ações baseadas na Lei 13.185/2015 (prevenção e conciliação)
            </span>
          </div>

          <div className="space-y-4">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                      {inc.code}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{inc.typeLabel}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      inc.severity === 'critica' || inc.severity === 'alta'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      Gravidade: {inc.severity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{inc.date}</span>
                    <span>• {inc.reporterRole}</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Local do Fato:</span>
                    <strong className="text-slate-700">{inc.location}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Turma Envolvida:</span>
                    <strong className="text-slate-700">{inc.involvedClass}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Estudante Alvo / Apoio:</span>
                    <strong className="text-indigo-700">{inc.targetStudent || 'Não especificado'}</strong>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-800 block mb-1">Narrativa do Relato:</strong>
                  {inc.description}
                </div>

                {/* Restorative Action and Status Transition */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                  <div className="text-xs">
                    <span className="font-bold text-emerald-900 block">Conduta Restaurativa Aplicada:</span>
                    <span className="text-slate-600">{inc.restorativeAction}</span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-bold text-slate-600">Status:</span>
                    <select
                      value={inc.status}
                      onChange={(e) => updateIncidentStatus(inc.id, e.target.value as IncidentStatus)}
                      className="text-xs p-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
                    >
                      <option value="novo">Novo</option>
                      <option value="em_analise">Em Análise</option>
                      <option value="mediacao_agendada">Mediação Agendada</option>
                      <option value="em_acompanhamento">Em Acompanhamento</option>
                      <option value="resolvido">Resolvido & Pactuado</option>
                    </select>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Mediações */}
      {activeTab === 'mediacoes' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Processos de Justiça Restaurativa e Círculos de Paz
              </h2>
              <p className="text-xs text-slate-500">
                Acompanhamento passo a passo da reparação do vínculo relacional
              </p>
            </div>
            <button
              onClick={() => setIsMediationModalOpen(true)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Nova Mediação
            </button>
          </div>

          <div className="space-y-6">
            {mediations.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                      {med.code}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{med.title}</h3>
                    <p className="text-xs text-slate-500">
                      Turma: {med.classGroup} • Facilitador: {med.facilitator}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    med.status === 'ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {med.status === 'ativo' ? 'Em Andamento' : 'Concluído'}
                  </span>
                </div>

                {/* Stage Stepper */}
                <div>
                  <span className="text-xs font-bold text-slate-600 block mb-2">
                    Progresso da Mediação Restaurativa:
                  </span>
                  <div className="grid grid-cols-5 gap-2 text-center text-[11px]">
                    {(['acolhimento', 'escuta_ativa', 'circulo_restaurativo', 'acordo_assinado', 'pos_acompanhamento'] as MediationStage[]).map((st) => {
                      const isCurrent = med.currentStage === st;
                      const isPast = stageLabels[med.currentStage].step >= stageLabels[st].step;
                      return (
                        <button
                          key={st}
                          onClick={() => updateMediationStage(med.id, st)}
                          className={`p-2 rounded-lg border transition-all text-left ${
                            isCurrent
                              ? 'bg-emerald-600 text-white font-bold border-emerald-700 shadow-xs'
                              : isPast
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-medium'
                              : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <div className="font-semibold leading-tight">{stageLabels[st].label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Students involved & Conflict */}
                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong className="text-slate-800 block mb-1">Estudantes no Círculo:</strong>
                    <div className="flex flex-wrap gap-1">
                      {med.studentsInvolved.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slate-300 text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong className="text-slate-800 block mb-1">Conflito Central Tratado:</strong>
                    <p className="text-slate-600">{med.coreConflict}</p>
                  </div>
                </div>

                {/* Agreements list */}
                <div>
                  <strong className="text-xs font-bold text-emerald-900 block mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Acordos Restaurativos de Convivência Mútua:
                  </strong>
                  <ul className="space-y-1">
                    {med.restorativeAgreements.map((agr, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-emerald-50/40 p-2 rounded-lg border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                        <span>{agr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Sinais Precoces */}
      {activeTab === 'sinais' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Painel de Sinais Precoces de Vulnerabilidade
              </h2>
              <p className="text-xs text-slate-500">
                Detecção antecipada antes que atritos se convertam em intimidação sistemática
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {earlyWarnings.map((ew) => {
              const matchedStudent = students.find(s => s.id === ew.studentId);
              return (
                <div
                  key={ew.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{ew.studentName}</h3>
                      <span className="text-xs text-slate-500">{ew.grade} • Categoria: {ew.category}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                      ew.urgency === 'urgente' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ew.urgency}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {ew.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 text-[11px]">Detectado em: {ew.detectedDate}</span>
                    {matchedStudent && (
                      <button
                        onClick={() => setSelectedStudent(matchedStudent)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        Ver Prontuário <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pedagogical Interventions Support */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          Roteiros Pedagógicos para Atendimento de Casos
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {proposals.map((prop) => (
            <button
              key={prop.id}
              onClick={() => setSelectedProposal(prop)}
              className="text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 transition-all text-xs space-y-1"
            >
              <div className="font-bold text-slate-800">{prop.title}</div>
              <div className="text-[11px] text-slate-500 line-clamp-2">{prop.objective}</div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
