import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { GestorDashboard } from './views/GestorDashboard';
import { OrientadorDashboard } from './views/OrientadorDashboard';
import { ProfessorDashboard } from './views/ProfessorDashboard';
import { EstudanteDashboard } from './views/EstudanteDashboard';
import { FamiliaDashboard } from './views/FamiliaDashboard';
import { ApoioDashboard } from './views/ApoioDashboard';
import { WelcomeScreen } from './views/WelcomeScreen';
import { StudentDossierModal } from './components/StudentDossierModal';
import { NewSafeReportModal } from './components/NewSafeReportModal';
import { NewMediationModal } from './components/NewMediationModal';
import { PedagogicalGuideModal } from './components/PedagogicalGuideModal';
import { OfficialReportModal } from './components/OfficialReportModal';
import { ShieldCheck, Heart, FileText, ArrowLeft, Sparkles } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { currentRole, showWelcomeScreen, setShowWelcomeScreen } = useApp();

  if (showWelcomeScreen) {
    return <WelcomeScreen />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {/* Return to Entrance Screen quick floating bar */}
      <div className="mb-6 flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <button
          onClick={() => setShowWelcomeScreen(true)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-violet-700 transition-colors group"
        >
          <div className="w-6 h-6 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
          <span>Voltar à Tela Inicial Colorida</span>
        </button>

        <span className="text-[11px] font-bold text-slate-400 hidden sm:inline flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Perfil Ativo: <strong className="text-slate-700 capitalize">{currentRole}</strong>
        </span>
      </div>

      {currentRole === 'estudante' && <EstudanteDashboard />}
      {currentRole === 'professor' && <ProfessorDashboard />}
      {currentRole === 'orientador' && <OrientadorDashboard />}
      {currentRole === 'gestor' && <GestorDashboard />}
      {currentRole === 'familia' && <FamiliaDashboard />}
      {currentRole === 'apoio' && <ApoioDashboard />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
        <Navbar />
        <div className="grow">
          <DashboardContent />
        </div>

        {/* Global Modals */}
        <StudentDossierModal />
        <NewSafeReportModal />
        <NewMediationModal />
        <PedagogicalGuideModal />
        <OfficialReportModal />

        {/* Accessible Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span className="font-semibold text-slate-700">EduSafe</span>
              <span>• Programa Institucional de Prevenção ao Bullying e Clima Escolar</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <span>Lei 13.185/2015</span>
              <span>•</span>
              <span>Lei 14.811/2024</span>
              <span>•</span>
              <span>BNCC (Comp. 8, 9 e 10)</span>
              <span>•</span>
              <span>Conformidade LGPD Escolar</span>
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
