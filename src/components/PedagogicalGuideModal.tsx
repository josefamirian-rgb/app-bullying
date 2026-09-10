import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  FileText,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const PedagogicalGuideModal: React.FC = () => {
  const { selectedProposal, setSelectedProposal } = useApp();

  if (!selectedProposal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30 inline-block">
              {selectedProposal.categoryLabel}
            </span>
            <h2 className="text-xl font-bold text-white leading-tight">
              {selectedProposal.title}
            </h2>
            <p className="text-xs text-slate-400">
              Público: {selectedProposal.targetGrade} • Duração estimada: {selectedProposal.duration}
            </p>
          </div>
          <button
            onClick={() => setSelectedProposal(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Objective Box */}
          <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm mb-1">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Objetivo Pedagógico & Formativo
            </div>
            <p className="text-xs text-teal-950 leading-relaxed">
              {selectedProposal.objective}
            </p>
          </div>

          {/* Immediate Intervention Guide (if available) */}
          {selectedProposal.immediateInterventionGuide && (
            <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                Guia Rápido de Ação Imediata para Professores e Inspetores
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-3 rounded-lg border border-rose-200">
                  <strong className="text-emerald-700 block mb-1">O Que Fazer no Momento do Fato:</strong>
                  <ul className="space-y-1 text-slate-700">
                    {selectedProposal.immediateInterventionGuide.teacherAction.map((act, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-3 rounded-lg border border-rose-200">
                  <strong className="text-rose-700 block mb-1">O Que JAMAIS Fazer (Erros Comuns):</strong>
                  <ul className="space-y-1 text-slate-700">
                    {selectedProposal.immediateInterventionGuide.whatToAvoid.map((avoid, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <X className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <span>{avoid}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-rose-200 text-xs">
                <strong className="text-slate-800">Frase Pedagógica Chave para Desarmar a Hostilidade:</strong>
                <p className="text-indigo-800 font-medium italic mt-1 bg-indigo-50 p-2 rounded-md">
                  {selectedProposal.immediateInterventionGuide.studentPrompt}
                </p>
              </div>
            </div>
          )}

          {/* BNCC Competencies */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-slate-500" />
              Alinhamento com as Competências Gerais da BNCC
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {selectedProposal.bnccCompetencies.map((comp, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-800 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Protocol Step-by-Step */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-slate-500" />
              Passo a Passo de Aplicação Prática
            </h3>
            <div className="space-y-2.5">
              {selectedProposal.protocolSteps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors text-xs text-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    {idx + 1}
                  </span>
                  <div className="grow pt-0.5 leading-relaxed font-normal">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Materials & When to Apply */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <strong className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                Materiais e Instrumentos Sugeridos:
              </strong>
              <ul className="space-y-1 text-xs text-slate-600">
                {selectedProposal.practicalMaterials.map((mat, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <strong className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                Quando Aplicar Esta Metodologia:
              </strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProposal.recommendedWhen}
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex justify-between items-center">
          <span className="text-[11px] text-slate-500">
            Diretrizes validadas para prevenção sistemática (Lei 13.185/2015)
          </span>
          <button
            onClick={() => setSelectedProposal(null)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Concluir Consulta
          </button>
        </div>

      </div>
    </div>
  );
};
