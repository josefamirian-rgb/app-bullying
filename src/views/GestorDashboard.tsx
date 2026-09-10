import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
  Search
} from 'lucide-react';

export const GestorDashboard: React.FC = () => {
  const { 
    students, 
    incidents, 
    mediations, 
    earlyWarnings, 
    proposals, 
    setSelectedStudent, 
    setSelectedProposal,
    setIsOfficialReportOpen,
    setIsReportModalOpen
  } = useApp();

  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = students.length;
  const safeCount = students.filter(s => s.status === 'safe').length;
  const monitoringCount = students.filter(s => s.status === 'monitoring').length;
  const interventionCount = students.filter(s => s.status === 'intervention').length;

  const schoolClimateAverage = Math.round(
    students.reduce((acc, curr) => acc + curr.climateScore, 0) / totalStudents
  );

  const urgentWarnings = earlyWarnings.filter(w => w.urgency === 'urgente');

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome & Legal Compliance Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/30">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
            Painel Executivo de Gestão • Lei Federal 13.185/2015 & Lei 14.811/2024
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-xs">
            Programa Integrado de Prevenção ao Bullying e Clima Escolar 🏛️
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed font-medium">
            Monitoramento em tempo real dos índices de convivência, acolhimento de sinais precoces e gestão restaurativa de conflitos. Dados atualizados com garantia de sigilo pedagógico.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setIsOfficialReportOpen(true)}
              className="px-4 py-2.5 bg-white hover:bg-blue-50 text-blue-800 text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              Emitir Relatório Lei 13.185 (MEC)
            </button>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-2.5 bg-blue-800/60 hover:bg-blue-800 text-white text-xs font-bold rounded-xl border border-blue-400/40 transition-all flex items-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4 text-amber-300" />
              Registrar Nova Ocorrência
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Índice Geral de Clima</span>
            <span className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{schoolClimateAverage}%</div>
          <div className="flex items-center gap-1 text-xs text-teal-600 font-medium mt-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Ambiente acolhedor e estável
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Estudantes Protegidos</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-emerald-700">{safeCount} / {totalStudents}</div>
          <p className="text-xs text-slate-500 mt-2">
            {Math.round((safeCount / totalStudents) * 100)}% da base sem indicativo de risco
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Sinais Precoces Ativos</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-amber-700">{earlyWarnings.length}</div>
          <p className="text-xs text-slate-500 mt-2">
            {urgentWarnings.length} requerem triagem prioritária
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Mediações Restaurativas</span>
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-indigo-700">
            {mediations.filter(m => m.status === 'ativo').length}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            0 punições estéreis • 100% dialógicas
          </p>
        </div>

      </div>

      {/* Main Split: Student Monitoring & Early Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Student Climate & Progression Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Monitoramento Individual do Clima & Convivência
              </h2>
              <p className="text-xs text-slate-500">
                Clique no estudante para visualizar prontuário socioemocional, notas e histórico
              </p>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar aluno ou turma..."
                className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 w-full sm:w-56"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                  <th className="pb-3">Estudante</th>
                  <th className="pb-3">Turma</th>
                  <th className="pb-3">Clima</th>
                  <th className="pb-3">Empatia</th>
                  <th className="pb-3">Status Convivencial</th>
                  <th className="pb-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((std) => (
                  <tr 
                    key={std.id}
                    onClick={() => setSelectedStudent(std)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3 font-medium text-slate-900 flex items-center gap-2.5">
                      <img
                        src={std.avatar}
                        alt={std.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <span className="font-semibold block">{std.name}</span>
                        {std.earlyWarnings.length > 0 && (
                          <span className="text-[10px] text-amber-700 font-medium">
                            {std.earlyWarnings.length} alerta(s)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-slate-600">{std.grade}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{std.climateScore}%</span>
                        <div className="w-14 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              std.climateScore >= 80 ? 'bg-emerald-500' : std.climateScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${std.climateScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 font-semibold text-indigo-700">{std.empathyLevel}%</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                        std.status === 'safe'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : std.status === 'monitoring'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {std.statusLabel}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1">
                        Prontuário <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Real-time Incident Heat & Early Warnings Queue */}
        <div className="space-y-6">
          
          {/* Urgent Early Warnings */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Sinais Precoces em Triagem
              </h3>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                {earlyWarnings.length} alertas
              </span>
            </div>

            <div className="space-y-2.5">
              {earlyWarnings.slice(0, 4).map((ew) => (
                <div 
                  key={ew.id}
                  className={`p-3 rounded-xl border text-xs space-y-1 ${
                    ew.urgency === 'urgente' ? 'bg-rose-50/60 border-rose-200' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{ew.studentName} ({ew.grade})</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${
                      ew.urgency === 'urgente' ? 'bg-rose-200 text-rose-900' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {ew.urgency}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-snug">{ew.description}</p>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                    <span>Fonte: {ew.source}</span>
                    <span>{ew.detectedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Restorative Cases */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Círculos Restaurativos Ativos
            </h3>
            {mediations.map((m) => (
              <div key={m.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1">
                <div className="font-bold text-slate-800">{m.title}</div>
                <div className="text-slate-500">Turma: {m.classGroup} • Estágio: <strong className="text-indigo-700">{m.currentStage}</strong></div>
                <div className="text-[11px] text-slate-600">
                  Próximo encontro: {m.nextFollowUpDate}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Pedagogical Proposals Framework Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Propostas Pedagógicas Institucionais do Programa
            </h2>
            <p className="text-xs text-slate-500">
              Protocolos validados com foco em inteligência socioemocional, mediação de conflitos e inclusão escolar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {proposals.map((prop) => (
            <div
              key={prop.id}
              onClick={() => setSelectedProposal(prop)}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/30 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 inline-block">
                  {prop.categoryLabel}
                </span>
                <h3 className="text-xs font-bold text-slate-900 leading-snug">
                  {prop.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-3">
                  {prop.objective}
                </p>
              </div>
              <button className="text-xs text-indigo-600 font-semibold pt-3 flex items-center gap-1">
                Ver Diretriz Completa <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
