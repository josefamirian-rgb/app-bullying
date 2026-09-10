import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Smile, 
  ShieldCheck, 
  BookOpen, 
  MessageCircle, 
  Sparkles, 
  PhoneCall, 
  CheckCircle2, 
  HelpCircle,
  AlertCircle,
  Star,
  Flame,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const FamiliaDashboard: React.FC = () => {
  const { 
    currentUser, 
    students, 
    familyTopics, 
    setIsReportModalOpen 
  } = useApp();

  const student = students.find(s => s.name.includes('Lucas')) || students[0];
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>('fg-1');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [parentMessage, setParentMessage] = useState('');
  const [dialogueScore, setDialogueScore] = useState<number | null>(null);

  const handleSendFamilyMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentMessage.trim()) return;
    setContactSuccess(true);
    setTimeout(() => {
      setParentMessage('');
      setContactSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Colorful Warm Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 p-6 sm:p-8 text-white shadow-lg">
        <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/30">
              <Heart className="w-3.5 h-3.5 text-rose-200 fill-rose-200" />
              Portal da Família & Responsáveis • Conexão Afetiva
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-xs">
              Bem-vindos, {currentUser.name}! 🏡
            </h1>
            <p className="text-rose-100 text-sm leading-relaxed">
              A parceria entre a família e a escola é o alicerce mais poderoso para prevenir o bullying, acolher inseguranças e cultivar a empatia do seu filho.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white text-rose-700 hover:bg-rose-50 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-rose-600" />
              Canal Seguro de Escuta
            </button>
          </div>
        </div>
      </div>

      {/* Child Wellness Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Child Profile Snapshot */}
        <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-rose-100 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-50">
            <div className="flex items-center gap-4">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-rose-200 shadow-sm"
              />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                  Acompanhamento Socioemocional
                </span>
                <h2 className="text-xl font-black text-slate-900">{student.name}</h2>
                <p className="text-xs text-slate-500 font-medium">{student.grade} • Frequência Escolar: {student.attendanceRate}%</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold self-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Ambiente Escolar Seguro & Acolhido
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 space-y-1">
              <span className="text-xs font-bold text-teal-800 flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-teal-600" />
                Bem-Estar no Colégio
              </span>
              <div className="text-2xl font-black text-teal-900">{student.climateScore}%</div>
              <p className="text-[11px] text-teal-700">Índice positivo de convivência e pertencimento</p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 space-y-1">
              <span className="text-xs font-bold text-indigo-800 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                Empatia Praticada
              </span>
              <div className="text-2xl font-black text-indigo-900">{student.empathyLevel}%</div>
              <p className="text-[11px] text-indigo-700">Participação em atitudes de acolhimento</p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 space-y-1">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
                Missões Concluídas
              </span>
              <div className="text-2xl font-black text-amber-900">{student.missionsCompleted} / {student.totalMissions}</div>
              <p className="text-[11px] text-amber-700">Atividades socioemocionais no app</p>
            </div>
          </div>

          {/* Emotional Timeline in the last days */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Check-ins Emocionais Recentes do Estudante
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {student.recentEmotions.map((em, idx) => {
                const emotionBadge: Record<string, { label: string; bg: string; text: string; icon: string }> = {
                  alegre: { label: 'Radiante', bg: 'bg-emerald-100 border-emerald-300', text: 'text-emerald-800', icon: '😄' },
                  calmo: { label: 'Tranquilo', bg: 'bg-teal-100 border-teal-300', text: 'text-teal-800', icon: '😌' },
                  ansioso: { label: 'Ansioso', bg: 'bg-amber-100 border-amber-300', text: 'text-amber-800', icon: '😐' },
                  triste: { label: 'Desanimado', bg: 'bg-sky-100 border-sky-300', text: 'text-sky-800', icon: '😔' },
                  irritado: { label: 'Irritado', bg: 'bg-rose-100 border-rose-300', text: 'text-rose-800', icon: '😤' },
                  isolado: { label: 'Sozinho', bg: 'bg-indigo-100 border-indigo-300', text: 'text-indigo-800', icon: '🥺' }
                };
                const item = emotionBadge[em] || emotionBadge['calmo'];
                return (
                  <div
                    key={idx}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${item.bg} ${item.text}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    <span className="text-[10px] opacity-75">D-{idx + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Direct Dialog with Orientation & Guidance */}
        <div className="bg-white rounded-3xl border-2 border-indigo-100 shadow-sm p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
              <MessageCircle className="w-5 h-5 text-indigo-600" />
              Diálogo Aberto com a Orientação
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Notou alguma mudança de comportamento em casa? Quer tirar uma dúvida sobre amizades, rendimento ou convivência? Fale diretamente com o Orientador Marcos Vinícius.
            </p>

            <form onSubmit={handleSendFamilyMessage} className="space-y-3 pt-2">
              <textarea
                value={parentMessage}
                onChange={(e) => setParentMessage(e.target.value)}
                placeholder="Escreva uma mensagem para a coordenação ou orientação..."
                rows={4}
                className="w-full text-xs p-3 rounded-2xl border border-indigo-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-400 resize-none text-slate-800 placeholder-slate-400"
              />
              
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                Enviar Mensagem para a Orientação
              </button>
            </form>

            {contactSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Mensagem enviada! A coordenação responderá em até 24h úteis.
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            Canal confidencial amparado pela LGPD escolar.
          </div>
        </div>

      </div>

      {/* Interactive Family Guidance Accordion */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
            Guia Prático para Pais e Mães
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Como Agir em Situações de Bullying & Intimidação
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Orientações embasadas pela psicologia educacional e pela Lei Federal nº 13.185/2015
          </p>
        </div>

        <div className="space-y-4">
          {familyTopics.map((topic) => {
            const isExpanded = expandedTopicId === topic.id;
            return (
              <div
                key={topic.id}
                className={`rounded-2xl border-2 transition-all overflow-hidden ${
                  isExpanded ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                        {topic.categoryLabel}
                      </span>
                      <span className="text-[11px] text-slate-400">Tempo de leitura: {topic.readingTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{topic.title}</h3>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-600 shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 space-y-5 border-t border-rose-100/60 text-xs text-slate-700">
                    <p className="text-slate-600 leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-100">
                      {topic.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Key Signs */}
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                        <h4 className="font-black text-amber-900 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          Sinais de Atenção em Casa:
                        </h4>
                        <ul className="space-y-1.5">
                          {topic.keySigns.map((sign, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-slate-700">
                              <span className="text-amber-600 font-bold">•</span>
                              <span>{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Steps */}
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                        <h4 className="font-black text-emerald-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          O que fazer (Passo a Passo):
                        </h4>
                        <ul className="space-y-1.5">
                          {topic.actionSteps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-slate-700">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Recommended Phrases */}
                    <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
                      <h4 className="font-black text-indigo-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        Frases Recomendadas para Abrir o Diálogo com seu Filho:
                      </h4>
                      <div className="space-y-1.5">
                        {topic.recommendedPhrases.map((phrase, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-white border border-indigo-100 text-indigo-950 font-medium italic">
                            {phrase}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
