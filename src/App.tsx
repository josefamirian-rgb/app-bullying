import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { GestorDashboard } from './views/GestorDashboard';
import { OrientadorDashboard } from './views/OrientadorDashboard';
import { ProfessorDashboard } from './views/ProfessorDashboard';
import { EstudanteDashboard } from './views/EstudanteDashboard';
import { FamiliaDashboard } from './views/FamiliaDashboard';
import { ApoioDashboard } from './views/ApoioDashboard';
import { StudentDossierModal } from './components/StudentDossierModal';
import { NewSafeReportModal } from './components/NewSafeReportModal';
import { NewMediationModal } from './components/NewMediationModal';
import { PedagogicalGuideModal } from './components/PedagogicalGuideModal';
import { OfficialReportModal } from './components/OfficialReportModal';
import { ShieldCheck, Heart, FileText } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { currentRole } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
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
