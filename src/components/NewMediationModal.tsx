import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Users, Sparkles, Plus, Check } from 'lucide-react';

export const NewMediationModal: React.FC = () => {
  const { isMediationModalOpen, setIsMediationModalOpen, addMediation } = useApp();
  
  const [title, setTitle] = useState('');
  const [classGroup, setClassGroup] = useState('8º Ano B');
  const [studentInput, setStudentInput] = useState('');
  const [students, setStudents] = useState<string[]>(['Beatriz Vasconcelos', 'Grupo de Alunos']);
  const [coreConflict, setCoreConflict] = useState('');

  if (!isMediationModalOpen) return null;

  const handleAddStudent = () => {
    if (studentInput.trim() && !students.includes(studentInput.trim())) {
      setStudents([...students, studentInput.trim()]);
      setStudentInput('');
    }
  };

  const handleRemoveStudent = (name: string) => {
    setStudents(students.filter(s => s !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !coreConflict.trim()) return;

    addMediation({
      title,
      studentsInvolved: students,
      classGroup,
      coreConflict
    });

    setIsMediationModalOpen(false);
    setTitle('');
    setCoreConflict('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-emerald-700 text-white p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-200" />
              <h2 className="text-xl font-bold">Instaurar Mediação Restaurativa</h2>
            </div>
            <p className="text-xs text-emerald-100 mt-1">
              Princípios da Justiça Restaurativa: reparação de danos, escuta ativa e recomposição dos laços comunitários.
            </p>
          </div>
          <button
            onClick={() => setIsMediationModalOpen(false)}
            className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-emerald-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Título da Mediação / Círculo de Paz: *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Círculo de Convivência e Respeito no 8º B"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Turma / Segmento:
              </label>
              <select
                value={classGroup}
                onChange={(e) => setClassGroup(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
              >
                <option value="6º Ano A">6º Ano A</option>
                <option value="7º Ano C">7º Ano C</option>
                <option value="8º Ano B">8º Ano B</option>
                <option value="9º Ano A">9º Ano A</option>
                <option value="Ensino Médio">Ensino Médio</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Partes Envolvidas / Estudantes:
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={studentInput}
                onChange={(e) => setStudentInput(e.target.value)}
                placeholder="Nome do participante..."
                className="grow text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
              />
              <button
                type="button"
                onClick={handleAddStudent}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {students.map((st, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-1.5"
                >
                  {st}
                  <button
                    type="button"
                    onClick={() => handleRemoveStudent(st)}
                    className="text-emerald-500 hover:text-emerald-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Matriz do Conflito / Foco Relacional: *
            </label>
            <textarea
              required
              value={coreConflict}
              onChange={(e) => setCoreConflict(e.target.value)}
              rows={3}
              placeholder="Descreva o atrito sem culpar partes (ex: 'Ruptura na comunicação em grupos de estudo e brincadeiras pejorativas')..."
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 space-y-1">
            <span className="font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Diretrizes de Facilitação Restaurativa:
            </span>
            <p className="text-[11px] text-emerald-800">
              O facilitador não julga nem impõe castigos. Conduz com o bastão da palavra para que cada parte expresse como se sentiu e pactue acordos recíprocos de convivência.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsMediationModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Check className="w-4 h-4" />
              Abrir Processo de Mediação
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
