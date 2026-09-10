import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Sparkles, 
  AlertTriangle, 
  Plus, 
  HeartHandshake, 
  BookOpen, 
  CheckCircle2, 
  Send,
  Eye,
  Smile,
  Frown,
  Activity,
  ArrowRight
} from 'lucide-react';
import { EarlyWarningSign } from '../types';

export const ProfessorDashboard: React.FC = () => {
  const { 
    students, 
    addEarlyWarning, 
    setSelectedStudent, 
    setSelectedProposal, 
    proposals,
    currentUser
  } = useApp();

  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [warningCategory, setWarningCategory] = useState<EarlyWarningSign['category']>('social');
  const [warningDesc, setWarningDesc] = useState('');
  const [urgency, setUrgency] = useState<EarlyWarningSign['urgency']>('atencao');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const selectedStudentObj = students.find(s => s.id === studentId);

  const handleCreateWarning = (e: React.FormEvent) => {
    e.preventDefault();
    if (!warningDesc.trim() || !selectedStudentObj) return;

    addEarlyWarning({
      studentId: selectedStudentObj.id,
      studentName: selectedStudentObj.name,
      grade: selectedStudentObj.grade,
      category: warningCategory,
      description: warningDesc,
      urgency
    });

    setWarningDesc('');
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 2500);
  };

  const stopProposal = proposals.find(p => p.id === 'prop-1');
  const emotionProposal = proposals.find(p => p.id === 'prop-4');

  return (
    <div className="space-y-8 pb-12">
      
      {/* Teacher Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/30">
            <BookOpen className="w-3.5 h-3.5 text-amber-200" />
            Docência Conectada • Mediação em Sala de Aula & BNCC
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-xs">
            Gestão Pedagógica de Convivência & Clima da Turma 📚
          </h1>
          <p className="text-amber-100 text-sm leading-relaxed font-medium">
            Ferramentas ágeis para o professor identificar sinais precoces de isolamento, aplicar dinâmicas de acolhimento socioemocional e intervir imediatamente em situações de conflito.
          </p>
        </div>
      </div>

      {/* Immediate Intervention Quick Box: STOP & CONVIVER */}
      {stopProposal && (
        <div className="bg-white rounded-2xl border-2 border-indigo-200 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm">
                STOP
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Protocolo de Intervenção Imediata: Método STOP & CONVIVER
                </h2>
                <p className="text-xs text-slate-500">
                  Diretriz rápida para quando você presenciar deboches, apelidos ou hostilidade em sala de aula
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedProposal(stopProposal)}
              className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs rounded-lg border border-indigo-200 flex items-center gap-1 shrink-0"
            >
              Consultar Roteiro Completo <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong className="text-indigo-900 block mb-1">1. Interromper Sem Humilhar</strong>
              <p className="text-slate-600">
                Firmeza serena: &quot;Nesta turma cuidamos uns dos outros. Vamos parar agora.&quot; Não agrida o agressor.
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong className="text-indigo-900 block mb-1">2. Desfazer a Plateia</strong>
              <p className="text-slate-600">
                Direcione os espectadores de volta para a tarefa pedagógica para cessar o reforço social do bullying.
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong className="text-indigo-900 block mb-1">3. Acolhimento em Separado</strong>
              <p className="text-slate-600">
                Valide os sentimentos do alvo e registre o alerta para mediação com a equipe de orientação.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Quick Early Warning Form & Class Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 1 Col: Quick Signal Registration Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Registrar Sinal Precoce Observado
            </h3>
            <p className="text-xs text-slate-500">
              Percebeu recusa ao recreio, choro discreto, queda brusca de rendimento ou apelido? Notifique a orientação.
            </p>
          </div>

          {showSuccessAlert && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Sinal precocemente registrado e encaminhado à Orientação!</span>
            </div>
          )}

          <form onSubmit={handleCreateWarning} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Estudante Observado:</label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.grade})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Tipo de Sinal:</label>
              <select
                value={warningCategory}
                onChange={(e) => setWarningCategory(e.target.value as EarlyWarningSign['category'])}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="social">Social (Isolamento, exclusão de grupos)</option>
                <option value="comportamental">Comportamental (Irritabilidade, agressividade súbita)</option>
                <option value="academico">Acadêmico (Queda súbita, desatenção, faltas)</option>
                <option value="emocional">Emocional (Choro, queixas físicas, retraimento)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Gravidade Sugerida:</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency('atencao')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold ${
                    urgency === 'atencao' ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  Atenção
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('urgente')}
                  className={`flex-1 py-1.5 rounded-lg border font-semibold ${
                    urgency === 'urgente' ? 'bg-rose-100 border-rose-300 text-rose-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  Urgente
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Descrição do Comportamento:</label>
              <textarea
                required
                value={warningDesc}
                onChange={(e) => setWarningDesc(e.target.value)}
                rows={3}
                placeholder="Ex: Não quis sair para o intervalo pelo segundo dia consecutivo e demonstrou inquietação quando determinado grupo passou..."
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              Gravar Alerta Pedagógico
            </button>
          </form>
        </div>

        {/* Right 2 Cols: Class Roster & Socio-emotional Pulse */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Termômetro de Convivência da Turma (8º Ano B)
              </h3>
              <p className="text-xs text-slate-500">
                Acompanhamento diário dos níveis de empatia e clima relacional dos estudantes
              </p>
            </div>
            {emotionProposal && (
              <button
                onClick={() => setSelectedProposal(emotionProposal)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" /> Dinâmica RULER
              </button>
            )}
          </div>

          <div className="space-y-3">
            {students.map((st) => (
              <div
                key={st.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{st.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        st.status === 'safe'
                          ? 'bg-emerald-100 text-emerald-800'
                          : st.status === 'monitoring'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {st.statusLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 mt-0.5">
                      <span>Clima: <strong className="text-slate-700">{st.climateScore}%</strong></span>
                      <span>• Empatia: <strong className="text-indigo-700">{st.empathyLevel}%</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="flex gap-1">
                    {st.recentEmotions.slice(0, 3).map((em, idx) => (
                      <span key={idx} className="p-1 rounded bg-white border border-slate-200 text-[10px] text-slate-600 capitalize">
                        {em}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedStudent(st)}
                    className="px-3 py-1.5 bg-white border border-slate-300 hover:border-indigo-500 text-slate-700 font-semibold rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> Prontuário
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Classroom Socioemotional Activities */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          Dinâmicas Práticas Recomendadas para a Aula de Hoje
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          {proposals.slice(1).map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProposal(p)}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50 cursor-pointer transition-all space-y-2"
            >
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                {p.categoryLabel}
              </span>
              <div className="font-bold text-slate-800">{p.title}</div>
              <p className="text-[11px] text-slate-500 line-clamp-2">{p.objective}</p>
              <div className="text-indigo-600 font-semibold pt-1 flex items-center gap-1">
                Ver Guia de Aplicação <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
