import React, { createContext, useContext, useState } from 'react';
import { 
  User, 
  UserRole, 
  StudentProfile, 
  IncidentReport, 
  MediationCase, 
  PedagogicalProposal, 
  GamificationMission, 
  GamificationBadge,
  EarlyWarningSign,
  IncidentStatus,
  MediationStage,
  KindnessMessage,
  PatioZoneCheck,
  FamilyGuidanceTopic
} from '../types';
import { 
  mockUsers, 
  initialStudents, 
  initialIncidents, 
  initialMediations, 
  earlyWarningSigns, 
  pedagogicalProposals, 
  studentMissions, 
  studentBadges,
  initialKindnessMessages,
  initialPatioZones,
  familyGuidanceTopics
} from '../data/mockData';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: User;
  students: StudentProfile[];
  incidents: IncidentReport[];
  mediations: MediationCase[];
  earlyWarnings: EarlyWarningSign[];
  proposals: PedagogicalProposal[];
  missions: GamificationMission[];
  badges: GamificationBadge[];
  kindnessMessages: KindnessMessage[];
  patioZones: PatioZoneCheck[];
  familyTopics: FamilyGuidanceTopic[];
  
  // Modals & Selected items
  selectedStudent: StudentProfile | null;
  setSelectedStudent: (student: StudentProfile | null) => void;
  
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  
  isMediationModalOpen: boolean;
  setIsMediationModalOpen: (open: boolean) => void;
  
  selectedProposal: PedagogicalProposal | null;
  setSelectedProposal: (prop: PedagogicalProposal | null) => void;

  isOfficialReportOpen: boolean;
  setIsOfficialReportOpen: (open: boolean) => void;
  
  // Actions
  addIncident: (data: {
    type: IncidentReport['type'];
    typeLabel: string;
    severity: IncidentReport['severity'];
    location: string;
    description: string;
    isAnonymous: boolean;
    targetStudent?: string;
    involvedClass: string;
  }) => void;
  
  updateIncidentStatus: (id: string, status: IncidentStatus, restorativeAction?: string) => void;
  
  addMediation: (data: {
    title: string;
    studentsInvolved: string[];
    classGroup: string;
    coreConflict: string;
  }) => void;
  
  updateMediationStage: (id: string, stage: MediationStage, agreementToAdd?: string) => void;
  
  addStudentNote: (studentId: string, noteText: string, type: 'positivo' | 'alerta' | 'intervencao') => void;
  
  addEarlyWarning: (warning: {
    studentId: string;
    studentName: string;
    grade: string;
    category: EarlyWarningSign['category'];
    description: string;
    urgency: EarlyWarningSign['urgency'];
  }) => void;
  
  toggleMission: (id: string) => void;
  submitDailyEmotion: (emotion: 'alegre' | 'calmo' | 'ansioso' | 'triste' | 'irritado' | 'isolado') => void;
  sendKindnessMessage: (data: { recipient: string; message: string; color: string; sticker: string }) => void;
  likeKindnessMessage: (id: string) => void;
  updatePatioZoneStatus: (zoneId: string, riskLevel: 'seguro' | 'atencao' | 'alerta', statusText: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('estudante');
  const [students, setStudents] = useState<StudentProfile[]>(initialStudents);
  const [incidents, setIncidents] = useState<IncidentReport[]>(initialIncidents);
  const [mediations, setMediations] = useState<MediationCase[]>(initialMediations);
  const [earlyWarnings, setEarlyWarnings] = useState<EarlyWarningSign[]>(earlyWarningSigns);
  const [proposals] = useState<PedagogicalProposal[]>(pedagogicalProposals);
  const [missions, setMissions] = useState<GamificationMission[]>(studentMissions);
  const [badges, setBadges] = useState<GamificationBadge[]>(studentBadges);
  const [kindnessMessages, setKindnessMessages] = useState<KindnessMessage[]>(initialKindnessMessages);
  const [patioZones, setPatioZones] = useState<PatioZoneCheck[]>(initialPatioZones);
  const [familyTopics] = useState<FamilyGuidanceTopic[]>(familyGuidanceTopics);

  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isMediationModalOpen, setIsMediationModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<PedagogicalProposal | null>(null);
  const [isOfficialReportOpen, setIsOfficialReportOpen] = useState(false);

  const currentUser = mockUsers[currentRole] || mockUsers['estudante'];

  const addIncident = (data: {
    type: IncidentReport['type'];
    typeLabel: string;
    severity: IncidentReport['severity'];
    location: string;
    description: string;
    isAnonymous: boolean;
    targetStudent?: string;
    involvedClass: string;
  }) => {
    const newReport: IncidentReport = {
      id: `inc-${Date.now()}`,
      code: `REL-2026-0${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('pt-BR'),
      type: data.type,
      typeLabel: data.typeLabel,
      severity: data.severity,
      status: 'novo',
      location: data.location,
      description: data.description,
      isAnonymous: data.isAnonymous,
      reporterRole: data.isAnonymous ? 'Canal Seguro (Anônimo)' : currentUser.roleTitle,
      targetStudent: data.targetStudent || 'A ser identificado',
      involvedClass: data.involvedClass,
      assignedSpecialist: 'Equipe de Orientação Pedagógica',
      restorativeAction: 'Triagem inicial e acolhimento não punitivo.',
      timeline: [
        {
          date: `${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
          action: 'Registro acolhido pelo protocolo EduSafe.',
          user: currentUser.name
        }
      ]
    };

    setIncidents(prev => [newReport, ...prev]);

    // If a specific student was targeted, update their status to monitoring
    if (data.targetStudent) {
      setStudents(prev => prev.map(std => {
        if (std.name.toLowerCase().includes(data.targetStudent!.toLowerCase())) {
          return {
            ...std,
            status: 'monitoring',
            statusLabel: 'Em Monitoramento Preventivo',
            earlyWarnings: [...std.earlyWarnings, `Relato de ${data.typeLabel}`]
          };
        }
        return std;
      }));
    }
  };

  const updateIncidentStatus = (id: string, status: IncidentStatus, restorativeAction?: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        const updatedTimeline = [
          ...inc.timeline,
          {
            date: `${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
            action: `Status atualizado para: ${status}. ${restorativeAction ? `Ação: ${restorativeAction}` : ''}`,
            user: currentUser.name
          }
        ];
        return {
          ...inc,
          status,
          restorativeAction: restorativeAction || inc.restorativeAction,
          timeline: updatedTimeline
        };
      }
      return inc;
    }));
  };

  const addMediation = (data: {
    title: string;
    studentsInvolved: string[];
    classGroup: string;
    coreConflict: string;
  }) => {
    const newMed: MediationCase = {
      id: `med-${Date.now()}`,
      code: `MED-2026-0${Math.floor(10 + Math.random() * 90)}`,
      title: data.title,
      date: new Date().toLocaleDateString('pt-BR'),
      facilitator: currentUser.name,
      studentsInvolved: data.studentsInvolved,
      classGroup: data.classGroup,
      coreConflict: data.coreConflict,
      currentStage: 'acolhimento',
      restorativeAgreements: [
        'Acolhimento individual das narrativas sem culpabilização',
        'Acordo de escuta respeitosa no círculo'
      ],
      nextFollowUpDate: 'Em 7 dias',
      status: 'ativo'
    };

    setMediations(prev => [newMed, ...prev]);
  };

  const updateMediationStage = (id: string, stage: MediationStage, agreementToAdd?: string) => {
    setMediations(prev => prev.map(med => {
      if (med.id === id) {
        return {
          ...med,
          currentStage: stage,
          restorativeAgreements: agreementToAdd 
            ? [...med.restorativeAgreements, agreementToAdd]
            : med.restorativeAgreements,
          status: stage === 'pos_acompanhamento' ? 'concluido' : 'ativo'
        };
      }
      return med;
    }));
  };

  const addStudentNote = (studentId: string, noteText: string, type: 'positivo' | 'alerta' | 'intervencao') => {
    setStudents(prev => prev.map(std => {
      if (std.id === studentId) {
        const newNote = {
          id: `note-${Date.now()}`,
          date: new Date().toLocaleDateString('pt-BR'),
          author: currentUser.name,
          role: currentUser.roleTitle,
          text: noteText,
          type
        };
        return {
          ...std,
          notes: [newNote, ...std.notes],
          status: type === 'intervencao' ? 'intervention' : type === 'alerta' ? 'monitoring' : std.status
        };
      }
      return std;
    }));
  };

  const addEarlyWarning = (warning: {
    studentId: string;
    studentName: string;
    grade: string;
    category: EarlyWarningSign['category'];
    description: string;
    urgency: EarlyWarningSign['urgency'];
  }) => {
    const newEW: EarlyWarningSign = {
      id: `ew-${Date.now()}`,
      studentId: warning.studentId,
      studentName: warning.studentName,
      grade: warning.grade,
      category: warning.category,
      description: warning.description,
      detectedDate: new Date().toLocaleDateString('pt-BR'),
      urgency: warning.urgency,
      source: `${currentUser.name} (${currentUser.roleTitle})`
    };

    setEarlyWarnings(prev => [newEW, ...prev]);

    // Also link to student's early warnings list
    setStudents(prev => prev.map(std => {
      if (std.id === warning.studentId) {
        return {
          ...std,
          status: warning.urgency === 'urgente' ? 'intervention' : 'monitoring',
          statusLabel: warning.urgency === 'urgente' ? 'Intervenção Restaurativa Ativa' : 'Em Monitoramento Preventivo',
          earlyWarnings: [...std.earlyWarnings, warning.description]
        };
      }
      return std;
    }));
  };

  const toggleMission = (id: string) => {
    setMissions(prev => prev.map(m => {
      if (m.id === id) {
        const newCompleted = !m.completed;
        // If completing, check if we unlock a badge
        if (newCompleted) {
          setBadges(badgesPrev => badgesPrev.map(b => {
            if (!b.unlocked && b.id === 'b-5') {
              return { ...b, unlocked: true, unlockedDate: new Date().toLocaleDateString('pt-BR') };
            }
            return b;
          }));
        }
        return { ...m, completed: newCompleted };
      }
      return m;
    }));
  };

  const submitDailyEmotion = (emotion: 'alegre' | 'calmo' | 'ansioso' | 'triste' | 'irritado' | 'isolado') => {
    setStudents(prev => prev.map(std => {
      if (std.id === 'std-1') {
        return {
          ...std,
          recentEmotions: [emotion, ...std.recentEmotions.slice(0, 4)],
          climateScore: Math.min(100, std.climateScore + 2),
          missionsCompleted: std.missionsCompleted + 1
        };
      }
      return std;
    }));
  };

  const sendKindnessMessage = (data: { recipient: string; message: string; color: string; sticker: string }) => {
    const newMsg: KindnessMessage = {
      id: `k-${Date.now()}`,
      author: currentUser.name,
      recipient: data.recipient,
      message: data.message,
      date: 'Agora mesmo',
      color: data.color || 'bg-amber-100 border-amber-300 text-amber-900',
      sticker: data.sticker || '💖',
      likes: 1
    };
    setKindnessMessages(prev => [newMsg, ...prev]);
  };

  const likeKindnessMessage = (id: string) => {
    setKindnessMessages(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, likes: m.likes + 1 };
      }
      return m;
    }));
  };

  const updatePatioZoneStatus = (zoneId: string, riskLevel: 'seguro' | 'atencao' | 'alerta', statusText: string) => {
    setPatioZones(prev => prev.map(z => {
      if (z.id === zoneId) {
        return {
          ...z,
          riskLevel,
          statusText,
          lastInspection: 'Agora há pouco'
        };
      }
      return z;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUser,
        students,
        incidents,
        mediations,
        earlyWarnings,
        proposals,
        missions,
        badges,
        kindnessMessages,
        patioZones,
        familyTopics,
        selectedStudent,
        setSelectedStudent,
        isReportModalOpen,
        setIsReportModalOpen,
        isMediationModalOpen,
        setIsMediationModalOpen,
        selectedProposal,
        setSelectedProposal,
        isOfficialReportOpen,
        setIsOfficialReportOpen,
        addIncident,
        updateIncidentStatus,
        addMediation,
        updateMediationStage,
        addStudentNote,
        addEarlyWarning,
        toggleMission,
        submitDailyEmotion,
        sendKindnessMessage,
        likeKindnessMessage,
        updatePatioZoneStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
