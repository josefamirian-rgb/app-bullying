import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Radio, 
  Coffee, 
  Trophy, 
  Trees, 
  Shield,
  Clock,
  Send,
  Sparkles,
  Users,
  Megaphone
} from 'lucide-react';

export const ApoioDashboard: React.FC = () => {
  const { 
    currentUser, 
    patioZones, 
    updatePatioZoneStatus, 
    addIncident, 
    setIsReportModalOpen 
  } = useApp();

  const [quickStudentName, setQuickStudentName] = useState('');
  const [quickLocation, setQuickLocation] = useState('Pátio Central');
  const [quickObs, setQuickObs] = useState('');
  const [quickType, setQuickType] = useState<'isolamento' | 'empurrao' | 'apelido' | 'outro'>('isolamento');
  const [justReported, setJustReported] = useState(false);

  const getZoneIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="w-5 h-5 text-amber-600" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-rose-600" />;
      case 'Trees': return <Trees className="w-5 h-5 text-emerald-600" />;
      default: return <Shield className="w-5 h-5 text-sky-600" />;
    }
  };

  const handleQuickPatioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickObs.trim()) return;

    addIncident({
      type: quickType === 'empurrao' ? 'fisico' : quickType === 'apelido' ? 'verbal' : 'exclusao_social',
      typeLabel: quickType === 'empurrao' ? 'Atrito Físico no Recreio' : quickType === 'apelido' ? 'Provocação Verbal' : 'Isolamento / Exclusão no Pátio',
      severity: quickType === 'empurrao' ? 'media' : 'baixa',
      location: quickLocation,
      description: `[Alerta de Ronda no Pátio - ${currentUser.name}]: ${quickObs}`,
      isAnonymous: false,
      targetStudent: quickStudentName || undefined,
      involvedClass: 'Recreio Geral'
    });

    setJustReported(true);
    setTimeout(() => {
      setQuickObs('');
      setQuickStudentName('');
      setJustReported(false);
    }, 3500);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Energetic & Colorful Staff Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500 via-blue-600 to-emerald-500 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/30">
              <Eye className="w-3.5 h-3.5 text-sky-200" />
              Equipe de Apoio & Inspetoria • Olhar Atento no Recreio
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-xs">
              Olá, {currentUser.name}! 🛡️
            </h1>
            <p className="text-sky-100 text-sm leading-relaxed">
              Mais de 70% dos episódios de bullying ocorrem em pontos cegos durante o intervalo. Sua presença amiga e olhar acolhedor salvam vidas todos os dias!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Megaphone className="w-4 h-4 text-blue-600" />
              Acionar Orientação Imediata
            </button>
          </div>
        </div>
      </div>

      {/* Patio Zones Real-time Radar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-600" />
              Radar do Pátio & Pontos de Convivência Escolar
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Acompanhamento contínuo dos setores durante a entrada, intervalos e saída
            </p>
          </div>
          <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 self-start sm:self-auto flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
            Ronda Ativa em Tempo Real
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {patioZones.map((zone) => {
            const riskColors = {
              seguro: 'border-emerald-300 bg-emerald-50/40 text-emerald-950',
              atencao: 'border-amber-300 bg-amber-50/50 text-amber-950',
              alerta: 'border-rose-300 bg-rose-50/50 text-rose-950'
            };

            const riskBadge = {
              seguro: 'bg-emerald-100 text-emerald-800 border-emerald-300',
              atencao: 'bg-amber-100 text-amber-800 border-amber-300',
              alerta: 'bg-rose-100 text-rose-800 border-rose-300'
            };

            return (
              <div
                key={zone.id}
                className={`rounded-2xl border-2 p-5 space-y-4 shadow-2xs transition-all hover:shadow-md flex flex-col justify-between ${riskColors[zone.riskLevel]}`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="p-2.5 rounded-xl bg-white shadow-2xs">
                      {getZoneIcon(zone.iconName)}
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${riskBadge[zone.riskLevel]}`}>
                      {zone.riskLevel === 'seguro' ? 'Tranquilo' : zone.riskLevel === 'atencao' ? 'Atenção' : 'Ação Rápida'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-slate-900">{zone.zoneName}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">{zone.location}</p>
                  </div>

                  <p className="text-xs text-slate-700 leading-snug font-medium">
                    {zone.statusText}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {zone.activeMonitors} monitor(es)
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {zone.lastInspection}
                    </span>
                  </div>

                  {/* Quick Change Action */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <button
                      onClick={() => updatePatioZoneStatus(zone.id, 'seguro', 'Checagem feita: ambiente tranquilo e acolhedor.')}
                      className="text-[10px] font-bold py-1 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-2xs"
                    >
                      ✓ Tudo Ok
                    </button>
                    <button
                      onClick={() => updatePatioZoneStatus(zone.id, 'atencao', 'Movimento agitado ou provocação detectada. Rondas intensificadas.')}
                      className="text-[10px] font-bold py-1 px-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-2xs"
                    >
                      ⚠️ Atenção
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two columns: Fast Incident Log & Staff Prevention Manual */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Fast Patio Incident Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-sky-100 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                Registro Ágil (15 Segundos)
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                Registrar Situação Observada no Intervalo
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Sua anotação gera uma notificação direta para o plantão da Orientação Pedagógica
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
              <Send className="w-5 h-5" />
            </div>
          </div>

          <form onSubmit={handleQuickPatioSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Type Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo Observado</label>
                <select
                  value={quickType}
                  onChange={(e) => setQuickType(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-400 bg-white"
                >
                  <option value="isolamento">Aluno Isolado / Triste</option>
                  <option value="apelido">Zombaria / Apelido Pejorativo</option>
                  <option value="empurrao">Atrito Físico / Empurrão</option>
                  <option value="outro">Exclusão em Brincadeira</option>
                </select>
              </div>

              {/* Location Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Local Exato</label>
                <select
                  value={quickLocation}
                  onChange={(e) => setQuickLocation(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-400 bg-white"
                >
                  <option value="Pátio Central">Pátio Central</option>
                  <option value="Fila da Cantina">Fila da Cantina</option>
                  <option value="Quadra Poliesportiva">Quadra Poliesportiva</option>
                  <option value="Acesso aos Banheiros">Acesso aos Banheiros</option>
                  <option value="Mesas Externas">Mesas Externas</option>
                </select>
              </div>

              {/* Student name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Aluno (se souber)</label>
                <input
                  type="text"
                  placeholder="Ex: Aluno do 8º B ou João"
                  value={quickStudentName}
                  onChange={(e) => setQuickStudentName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-400"
                />
              </div>
            </div>

            {/* Observation text */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">O que você presenciou?</label>
              <textarea
                rows={3}
                value={quickObs}
                onChange={(e) => setQuickObs(e.target.value)}
                placeholder="Descreva rapidamente: 'Dois alunos estavam rindo e escondendo o estojo de outro colega perto do bebedouro...'"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-400 resize-none text-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Encaminhar Observação à Orientação
            </button>

            {justReported && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Observação registrada com sucesso! A orientação foi acionada para acompanhar os estudantes.</span>
              </div>
            )}
          </form>
        </div>

        {/* Practical Intervention Guide for Staff */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border-2 border-amber-200 p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Guia de Ouro da Inspetoria Acolhedora
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            Como intervir com respeito e desarmar conflitos no recreio:
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-100 space-y-1">
              <strong className="text-amber-900 block">1. Acolha com sutileza o aluno sozinho</strong>
              <p className="text-slate-600 text-[11px]">
                Em vez de expor (&quot;por que está isolado?&quot;), convide com gentileza: &quot;Oi! Pode me ajudar a levar este cone até o armário?&quot; ou &quot;Como foi sua aula hoje?&quot;.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/80 border border-amber-100 space-y-1">
              <strong className="text-amber-900 block">2. Desarme a plateia zombeteira</strong>
              <p className="text-slate-600 text-[11px]">
                Aproxime-se com calma. Ao ver um monitor por perto, a provocação se dissolve. Convide o grupo a mudar de assunto sem criar espetáculo.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/80 border border-amber-100 space-y-1">
              <strong className="text-amber-900 block">3. Não humilhe o agressor em público</strong>
              <p className="text-slate-600 text-[11px]">
                Separe com firmeza e converse em particular: &quot;Aqui nós respeitamos todos. Vamos até a orientação para conversar com calma&quot;.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-amber-200 text-center">
            <span className="text-[11px] font-bold text-amber-900 block">Linha de Emergência Interna</span>
            <span className="text-xs text-slate-600">Ramal da Coordenação: <strong>#204</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
};
