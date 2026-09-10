import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  AlertTriangle, 
  Sparkles,
  School,
  Lock,
  Heart,
  Eye,
  GraduationCap,
  BookOpen
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    currentUser, 
    setIsReportModalOpen, 
    setIsOfficialReportOpen,
    earlyWarnings,
    showWelcomeScreen,
    setShowWelcomeScreen
  } = useApp();

  const roleConfig: Record<UserRole, { 
    label: string; 
    shortLabel: string;
    group: 'aluno' | 'pedagogico' | 'comunidade';
    icon: React.ReactNode; 
    activeStyle: string;
    badgeColor: string;
  }> = {
    estudante: { 
      label: 'Espaço do Aluno', 
      shortLabel: 'Aluno',
      group: 'aluno',
      icon: <Sparkles className="w-4 h-4" />, 
      activeStyle: 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md',
      badgeColor: 'bg-violet-100 text-violet-700'
    },
    professor: { 
      label: 'Docência & Tutoria', 
      shortLabel: 'Professor',
      group: 'pedagogico',
      icon: <BookOpen className="w-4 h-4" />, 
      activeStyle: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md',
      badgeColor: 'bg-amber-100 text-amber-700'
    },
    orientador: { 
      label: 'Orientação & Psicologia', 
      shortLabel: 'Orientador',
      group: 'pedagogico',
      icon: <Users className="w-4 h-4" />, 
      activeStyle: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md',
      badgeColor: 'bg-emerald-100 text-emerald-700'
    },
    gestor: { 
      label: 'Gestão Escolar', 
      shortLabel: 'Gestor',
      group: 'pedagogico',
      icon: <School className="w-4 h-4" />, 
      activeStyle: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    familia: { 
      label: 'Família & Responsáveis', 
      shortLabel: 'Família',
      group: 'comunidade',
      icon: <Heart className="w-4 h-4" />, 
      activeStyle: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md',
      badgeColor: 'bg-rose-100 text-rose-700'
    },
    apoio: { 
      label: 'Pátio & Inspetoria', 
      shortLabel: 'Pátio',
      group: 'comunidade',
      icon: <Eye className="w-4 h-4" />, 
      activeStyle: 'bg-gradient-to-r from-sky-500 to-cyan-600 text-white shadow-md',
      badgeColor: 'bg-sky-100 text-sky-700'
    }
  };

  const rolesList: UserRole[] = ['estudante', 'professor', 'orientador', 'gestor', 'familia', 'apoio'];
  const urgentCount = earlyWarnings.filter(ew => ew.urgency === 'urgente').length;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Brand with vibrant colors */}
          <button 
            onClick={() => setShowWelcomeScreen(true)}
            className="flex items-center gap-3 shrink-0 text-left hover:opacity-95 transition-all group"
            title="Ir para a Tela Inicial Animada"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-pink-200 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 drop-shadow-xs" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl bg-gradient-to-r from-violet-700 via-purple-700 to-pink-600 bg-clip-text text-transparent tracking-tight">
                  EduSafe
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-black uppercase tracking-wider shadow-2xs">
                  Lei 13.185 & BNCC
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold hidden sm:block">
                Plataforma Escolar de Convivência, Inclusão & Anti-Bullying
              </p>
            </div>
          </button>

          {/* Quick Role Switcher Bar */}
          <div className="flex items-center bg-slate-100/80 p-1 rounded-2xl border border-slate-200 overflow-x-auto max-w-full">
            {/* Dedicated Welcome/Home Screen Tab */}
            <button
              id="nav-home-btn"
              onClick={() => setShowWelcomeScreen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                showWelcomeScreen
                  ? 'bg-gradient-to-r from-violet-600 via-pink-500 to-amber-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="Tela Inicial Animada"
            >
              <Sparkles className={`w-4 h-4 ${showWelcomeScreen ? 'text-amber-300 animate-spin' : 'text-slate-400'}`} />
              <span>Início</span>
            </button>

            <span className="w-px h-4 bg-slate-300 mx-1 shrink-0"></span>

            {rolesList.map((role) => {
              const active = !showWelcomeScreen && currentRole === role;
              const conf = roleConfig[role];
              return (
                <button
                  key={role}
                  id={`role-switcher-${role}`}
                  onClick={() => {
                    setCurrentRole(role);
                    setShowWelcomeScreen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    active
                      ? conf.activeStyle
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                  title={conf.label}
                >
                  {conf.icon}
                  <span className="hidden lg:inline">{conf.label}</span>
                  <span className="lg:hidden">{conf.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Safe Channel Button */}
            <button
              id="open-safe-report-btn"
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-xs transition-all hover:scale-102"
              title="Registrar situação confidencial de bullying ou pedir ajuda"
            >
              <AlertTriangle className="w-4 h-4 text-amber-200" />
              <span className="hidden md:inline">Canal Seguro</span>
            </button>

            {/* Official Report for staff */}
            {(currentRole === 'gestor' || currentRole === 'orientador') && (
              <button
                id="open-official-audit-btn"
                onClick={() => setIsOfficialReportOpen(true)}
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors"
              >
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Auditoria Oficial</span>
              </button>
            )}

            {/* User Profile display */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-violet-300 shadow-2xs"
              />
              <div className="hidden 2xl:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-slate-500 truncate max-w-[130px] font-medium">
                  {currentUser.roleTitle}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Alert bar if urgent signals are pending and user is staff */}
      {currentRole !== 'estudante' && currentRole !== 'familia' && urgentCount > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200 px-4 py-1.5 text-xs text-amber-900 flex items-center justify-between">
          <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <strong>Sinais Precoces:</strong> {urgentCount} alerta(s) de atenção socioemocional requerem triagem da orientação hoje.
            </span>
            <span className="text-[11px] text-amber-800 font-bold hidden sm:inline">
              Ambiente protegido por sigilo pedagógico (LGPD)
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
