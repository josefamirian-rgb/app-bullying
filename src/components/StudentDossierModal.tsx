import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Heart, 
  Award, 
  Send,
  Calendar,
  Smile,
  Meh,
  Frown,
  Activity,
  ShieldCheck
} from 'lucide-react';

export const StudentDossierModal: React.FC = () => {
  const { selectedStudent, setSelectedStudent, addStudentNote, currentUser } = useApp();
  const [newNoteText, setNewNoteText] = useState('');
  const [noteType, setNoteType] = useState<'positivo' | 'alerta' | 'intervencao'>('positivo');

  if (!selectedStudent) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addStudentNote(selectedStudent.id, newNoteText, noteType);
    setNewNoteText('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'safe':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Seguro & Engajado</span>;
      case 'monitoring':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Monitoramento Preventivo</span>;
      case 'intervention':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Intervenção Restaurativa</span>;
      default:
        return null;
    }
  };

  const renderEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'alegre':
        return <span className="p-1 rounded-md bg-emerald-100 text-emerald-700 text-xs flex items-center gap-1" title="Alegre"><Smile className="w-3.5 h-3.5" /> Alegre</span>;
      case 'calmo':
        return <span className="p-1 rounded-md bg-teal-100 text-teal-700 text-xs flex items-center gap-1" title="Calmo"><Smile className="w-3.5 h-3.5" /> Tranquilo</span>;
      case 'ansioso':
        return <span className="p-1 rounded-md bg-amber-100 text-amber-700 text-xs flex items-center gap-1" title="Ansioso"><Meh className="w-3.5 h-3.5" /> Ansioso</span>;
      case 'triste':
      case 'isolado':
        return <span className="p-1 rounded-md bg-sky-100 text-sky-700 text-xs flex items-center gap-1" title="Triste / Isolado"><Frown className="w-3.5 h-3.5" /> Retraído</span>;
      case 'irritado':
        return <span className="p-1 rounded-md bg-rose-100 text-rose-700 text-xs flex items-center gap-1" title="Irritado"><Frown className="w-3.5 h-3.5" /> Irritado</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={selectedStudent.avatar}
              alt={selectedStudent.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{selectedStudent.name}</h2>
                {getStatusBadge(selectedStudent.status)}
              </div>
              <p className="text-sm text-slate-400 mt-0.5">
                Turma: {selectedStudent.grade} • Assiduidade Escolar: {selectedStudent.attendanceRate}%
              </p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                Prontuário Socioemocional Confidencial (EduSafe Care)
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedStudent(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Metrics Overview */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <span className="text-xs text-slate-500 font-medium">Índice de Clima Individual</span>
              <div className="text-2xl font-bold text-slate-800 mt-1">{selectedStudent.climateScore}%</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    selectedStudent.climateScore >= 80 ? 'bg-emerald-500' : selectedStudent.climateScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${selectedStudent.climateScore}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <span className="text-xs text-slate-500 font-medium">Empatia & Relacionamento</span>
              <div className="text-2xl font-bold text-indigo-700 mt-1">{selectedStudent.empathyLevel}%</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${selectedStudent.empathyLevel}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <span className="text-xs text-slate-500 font-medium">Engajamento Convivencial</span>
              <div className="text-2xl font-bold text-teal-700 mt-1">{selectedStudent.engagementScore}%</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-teal-500"
                  style={{ width: `${selectedStudent.engagementScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Early Warning Flags Alert Box */}
          {selectedStudent.earlyWarnings.length > 0 && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Sinais Precoces Identificados pela Equipe Pedagógica
              </div>
              <ul className="space-y-1.5">
                {selectedStudent.earlyWarnings.map((warning, idx) => (
                  <li key={idx} className="text-xs text-amber-800 flex items-start gap-2 bg-amber-100/60 p-2 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5"></span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recent Emotion Timeline */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-slate-500" />
              Últimos Check-ins Socioemocionais (Autorregistro do Aluno)
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedStudent.recentEmotions.map((em, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400">Dia -{idx}:</span>
                  {renderEmotionIcon(em)}
                </div>
              ))}
            </div>
          </div>

          {/* Gamification Badges */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-slate-500" />
              Conquistas e Insígnias de Convivência
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedStudent.badges.map((b, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  {b}
                </span>
              ))}
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                {selectedStudent.missionsCompleted}/{selectedStudent.totalMissions} Missões de Empatia Concluídas
              </span>
            </div>
          </div>

          {/* Notes and Intervention History */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              Histórico de Observações e Intervenções da Equipe
            </h3>
            <div className="space-y-3">
              {selectedStudent.notes.map((note) => (
                <div 
                  key={note.id} 
                  className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                    note.type === 'intervencao' 
                      ? 'bg-rose-50/50 border-rose-200 text-rose-950' 
                      : note.type === 'alerta'
                      ? 'bg-amber-50/50 border-amber-200 text-amber-950'
                      : 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className="flex items-center gap-1.5">
                      {note.author} ({note.role})
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">{note.date}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{note.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add Pedagogical Note Form */}
          <form onSubmit={handleAddNote} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Registrar Nova Observação Pedagógica</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setNoteType('positivo')}
                  className={`px-2 py-1 rounded-md text-xs font-medium border ${
                    noteType === 'positivo' ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  Positivo
                </button>
                <button
                  type="button"
                  onClick={() => setNoteType('alerta')}
                  className={`px-2 py-1 rounded-md text-xs font-medium border ${
                    noteType === 'alerta' ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  Alerta
                </button>
                <button
                  type="button"
                  onClick={() => setNoteType('intervencao')}
                  className={`px-2 py-1 rounded-md text-xs font-medium border ${
                    noteType === 'intervencao' ? 'bg-rose-100 border-rose-300 text-rose-800' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  Intervenção
                </button>
              </div>
            </div>

            <textarea
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Descreva o comportamento observado, acolhimento realizado ou estratégia adotada..."
              className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
              rows={3}
            />

            <div className="flex justify-between items-center text-[11px] text-slate-500">
              <span>Registrando como: {currentUser.name} ({currentUser.roleTitle})</span>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Salvar no Prontuário
              </button>
            </div>
          </form>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex justify-end">
          <button
            onClick={() => setSelectedStudent(null)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors"
          >
            Fechar Prontuário
          </button>
        </div>

      </div>
    </div>
  );
};
