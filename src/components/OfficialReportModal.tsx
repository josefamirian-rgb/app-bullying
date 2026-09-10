import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck,
  Calendar,
  School,
  AlertTriangle
} from 'lucide-react';

export const OfficialReportModal: React.FC = () => {
  const { isOfficialReportOpen, setIsOfficialReportOpen, incidents, mediations, earlyWarnings, students, currentUser } = useApp();

  if (!isOfficialReportOpen) return null;

  const resolvedCount = incidents.filter(i => i.status === 'resolvido').length;
  const inProgressCount = incidents.filter(i => i.status !== 'resolvido').length;
  const activeMediationsCount = mediations.filter(m => m.status === 'ativo').length;
  const safeStudentsCount = students.filter(s => s.status === 'safe').length;
  const monitoringCount = students.filter(s => s.status === 'monitoring').length;
  const interventionCount = students.filter(s => s.status === 'intervention').length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Top Control Bar */}
        <div className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-teal-400" />
            <span className="text-sm font-bold">Relatório Oficial de Governança Escolar (Lei 13.185/15)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-semibold rounded-lg text-white transition-colors"
            >
              <Printer className="w-4 h-4" />
              Imprimir / PDF
            </button>
            <button
              onClick={() => setIsOfficialReportOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Printable Report Document */}
        <div className="p-8 max-h-[80vh] overflow-y-auto space-y-8 bg-white text-slate-900 print:p-0 print:max-h-none">
          
          {/* Header Document */}
          <div className="border-b-2 border-slate-900 pb-6 text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-indigo-900 font-extrabold text-xl tracking-wide">
              <School className="w-6 h-6 text-indigo-700" />
              COLÉGIO INTEGRADO EDUSAFE
            </div>
            <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
              Secretaria de Educação e Coordenação Pedagógica • Sistema de Gestão de Clima Escolar
            </p>
            <h1 className="text-lg font-bold text-slate-900 mt-3">
              RELATÓRIO AUDITÁVEL DE PREVENÇÃO À INTIMIDAÇÃO SISTEMÁTICA (BULLYING)
            </h1>
            <p className="text-xs text-slate-500">
              Conformidade com a Lei Federal nº 13.185/2015 e Lei nº 14.811/2024 • Emissão: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Executive Summary Metrics */}
          <div>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1 mb-3">
              1. Panorama Consolidado do Clima e Segurança Psicológica
            </h2>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="p-3 border rounded-lg bg-slate-50">
                <span className="text-[11px] text-slate-500 font-medium">Estudantes Seguros</span>
                <div className="text-xl font-bold text-emerald-700 mt-0.5">{safeStudentsCount} ({Math.round((safeStudentsCount / students.length) * 100)}%)</div>
              </div>
              <div className="p-3 border rounded-lg bg-slate-50">
                <span className="text-[11px] text-slate-500 font-medium">Monitoramento Preventivo</span>
                <div className="text-xl font-bold text-amber-700 mt-0.5">{monitoringCount}</div>
              </div>
              <div className="p-3 border rounded-lg bg-slate-50">
                <span className="text-[11px] text-slate-500 font-medium">Intervenções em Curso</span>
                <div className="text-xl font-bold text-rose-700 mt-0.5">{interventionCount}</div>
              </div>
              <div className="p-3 border rounded-lg bg-slate-50">
                <span className="text-[11px] text-slate-500 font-medium">Mediações Restaurativas</span>
                <div className="text-xl font-bold text-indigo-700 mt-0.5">{activeMediationsCount} ativas</div>
              </div>
            </div>
          </div>

          {/* Incidents Table */}
          <div>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1 mb-3">
              2. Registro de Ocorrências e Ações Restaurativas Adotadas
            </h2>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b">
                  <th className="p-2.5 font-semibold">Código</th>
                  <th className="p-2.5 font-semibold">Data</th>
                  <th className="p-2.5 font-semibold">Tipificação</th>
                  <th className="p-2.5 font-semibold">Severidade</th>
                  <th className="p-2.5 font-semibold">Turma</th>
                  <th className="p-2.5 font-semibold">Status / Ação Convivencial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {incidents.map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono font-medium text-slate-700">{inc.code}</td>
                    <td className="p-2.5 text-slate-600">{inc.date}</td>
                    <td className="p-2.5 font-medium text-slate-800">{inc.typeLabel}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        inc.severity === 'critica' || inc.severity === 'alta' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inc.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-600">{inc.involvedClass}</td>
                    <td className="p-2.5 text-slate-700">{inc.restorativeAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Restorative Justice and Mediation */}
          <div>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1 mb-3">
              3. Círculos de Paz e Acordos Restaurativos Celebrados
            </h2>
            <div className="space-y-3">
              {mediations.map((med) => (
                <div key={med.id} className="p-3 border border-slate-200 rounded-lg text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{med.title} ({med.code})</span>
                    <span className="text-slate-500 font-normal">Facilitador: {med.facilitator}</span>
                  </div>
                  <p className="text-slate-600"><strong>Foco Relacional:</strong> {med.coreConflict}</p>
                  <div>
                    <strong className="text-emerald-800 block mb-1">Acordos de Convivência Pactuados:</strong>
                    <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                      {med.restorativeAgreements.map((ac, i) => (
                        <li key={i}>{ac}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Certification and Signatures */}
          <div className="border-t-2 border-slate-200 pt-6 space-y-4">
            <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg">
              <strong>Certificação Institucional:</strong> Certificamos que os protocolos aqui listados priorizam a conscientização, a inteligência socioemocional e a resolução pacífica e não-punitiva de desavenças, em estrito cumprimento às determinações do Ministério da Educação (MEC) e da Legislação Federal de Combate ao Bullying.
            </div>

            <div className="grid grid-cols-2 gap-12 pt-8 text-center text-xs">
              <div>
                <div className="border-t border-slate-400 pt-2 font-bold text-slate-800">
                  Dra. Helena Castro
                </div>
                <div className="text-slate-500">Direção Geral & Pedagógica</div>
              </div>
              <div>
                <div className="border-t border-slate-400 pt-2 font-bold text-slate-800">
                  Prof. Marcos Vinícius
                </div>
                <div className="text-slate-500">Coordenação de Orientação & Mediação</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-4 flex justify-between items-center">
          <span className="text-xs text-slate-500">
            Documento com rastreabilidade digital EduSafe
          </span>
          <button
            onClick={() => setIsOfficialReportOpen(false)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition-colors"
          >
            Fechar Relatório
          </button>
        </div>

      </div>
    </div>
  );
};
