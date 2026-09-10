import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IncidentType, IncidentSeverity } from '../types';
import { 
  X, 
  ShieldCheck, 
  Send, 
  Lock, 
  AlertOctagon, 
  HelpCircle,
  CheckCircle
} from 'lucide-react';

export const NewSafeReportModal: React.FC = () => {
  const { isReportModalOpen, setIsReportModalOpen, addIncident } = useApp();
  
  const [type, setType] = useState<IncidentType>('verbal');
  const [severity, setSeverity] = useState<IncidentSeverity>('media');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [location, setLocation] = useState('Pátio / Recreio');
  const [involvedClass, setInvolvedClass] = useState('8º Ano B');
  const [targetStudent, setTargetStudent] = useState('');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isReportModalOpen) return null;

  const incidentTypes: { id: IncidentType; label: string; desc: string }[] = [
    { id: 'verbal', label: 'Ofensa Verbal ou Apelidos', desc: 'Xingamentos reiterados, piadas discriminatórias, boatos ou humilhações orais.' },
    { id: 'exclusao_social', label: 'Exclusão Social / Isolamento', desc: 'Ignorar sistematicamente, proibir de sentar junto ou participar de grupos.' },
    { id: 'cyberbullying', label: 'Cyberbullying / Digital', desc: 'Figurinhas depreciativas, grupos de ódio em redes sociais ou exposição.' },
    { id: 'psicologico', label: 'Pressão Psicológica / Ameaça', desc: 'Chantagem, intimidação, perseguição velada ou coação velada.' },
    { id: 'fisico', label: 'Agressão Física ou Dano Material', desc: 'Empurrões, tapas, depredação intencional de materiais escolares.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const selectedTypeObj = incidentTypes.find(t => t.id === type);

    addIncident({
      type,
      typeLabel: selectedTypeObj?.label || 'Intimidação Sistemática',
      severity,
      location,
      description,
      isAnonymous,
      targetStudent: targetStudent.trim() || undefined,
      involvedClass
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsReportModalOpen(false);
      // Reset
      setDescription('');
      setTargetStudent('');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-rose-700 text-white p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-rose-200" />
              <h2 className="text-xl font-bold">Canal de Escuta Segura & Acolhimento</h2>
            </div>
            <p className="text-xs text-rose-100 mt-1">
              Espaço protegido para relatar situações de bullying, intimidação ou sofrimento emocional.
            </p>
          </div>
          <button
            onClick={() => setIsReportModalOpen(false)}
            className="text-rose-200 hover:text-white p-1 rounded-lg hover:bg-rose-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form or Success State */}
        {isSuccess ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Relato Registrado com Segurança!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Sua voz foi ouvida pela equipe de orientação e psicologia escolar. Nenhuma ação será punitiva ou causará exposição. Obrigado por ajudar a construir uma escola mais segura e gentil.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Guarantee Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-slate-600">
              <Lock className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-slate-800 block mb-0.5">Compromisso de Sigilo e Não-Exposição:</strong>
                Este relato é tratado pela equipe de Mediação e Psicologia Escolar. O objetivo não é punir, mas sim cessar a dor, restaurar o diálogo e garantir a segurança de todos os estudantes envolvidos.
              </div>
            </div>

            {/* Anonymous Toggle */}
            <div className="bg-indigo-50/50 border border-indigo-200 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-900 block">Identificação do Relato</span>
                <span className="text-[11px] text-indigo-700">
                  {isAnonymous ? 'Seu nome não será gravado nem divulgado.' : 'Seu nome será visível apenas à Orientação Pedagógica.'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAnonymous(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isAnonymous ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  Anônimo
                </button>
                <button
                  type="button"
                  onClick={() => setIsAnonymous(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    !isAnonymous ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  Identificado
                </button>
              </div>
            </div>

            {/* Type of Incident */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Tipo de Ocorrência ou Comportamento Observado:
              </label>
              <div className="grid sm:grid-cols-2 gap-2">
                {incidentTypes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setType(item.id)}
                    className={`text-left p-3 rounded-xl border text-xs transition-all ${
                      type === item.id
                        ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-semibold text-slate-800">{item.label}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-tight">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location & Class */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Onde ocorreu / Ambiente:
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Pátio / Recreio">Pátio / Intervalo</option>
                  <option value="Sala de Aula">Sala de Aula</option>
                  <option value="Banheiro / Vestiário">Banheiro / Vestiário</option>
                  <option value="Refeitório">Refeitório</option>
                  <option value="Ambiente Digital / Redes Sociais">Ambiente Digital / Redes Sociais</option>
                  <option value="Entrada / Saída da Escola">Entrada / Saída da Escola</option>
                  <option value="Transporte Escolar">Transporte Escolar</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Turma ou Ano Envolvido:
                </label>
                <select
                  value={involvedClass}
                  onChange={(e) => setInvolvedClass(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="6º Ano A">6º Ano A</option>
                  <option value="7º Ano B">7º Ano B</option>
                  <option value="8º Ano B">8º Ano B</option>
                  <option value="9º Ano A">9º Ano A</option>
                  <option value="Ensino Médio">Ensino Médio</option>
                  <option value="Múltiplas Turmas">Múltiplas Turmas</option>
                </select>
              </div>
            </div>

            {/* Target Student (optional) */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nome do(a) Colega que Precisa de Ajuda (Opcional):
              </label>
              <input
                type="text"
                value={targetStudent}
                onChange={(e) => setTargetStudent(e.target.value)}
                placeholder="Ex: Beatriz ou 'Não sei o nome exato'"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Severity */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nível de Urgência / Frequência:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'baixa', label: 'Baixa', sub: 'Fato isolado' },
                  { id: 'media', label: 'Média', sub: 'Ocorre às vezes' },
                  { id: 'alta', label: 'Alta', sub: 'Repetitivo / Intenso' },
                  { id: 'critica', label: 'Crítica', sub: 'Risco iminente' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSeverity(s.id as IncidentSeverity)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      severity === s.id
                        ? 'border-rose-600 bg-rose-50 font-bold text-rose-800'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="text-xs">{s.label}</div>
                    <div className="text-[10px] text-slate-400">{s.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                O que aconteceu? Conte com suas palavras: *
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Explique o que presenciou ou viveu, como a pessoa se sentiu e o que mais achar importante relatar..."
                className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-4 h-4" />
                Enviar com Proteção
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
