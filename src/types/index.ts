export type UserRole = 'estudante' | 'professor' | 'orientador' | 'gestor' | 'familia' | 'apoio';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
  roleTitle: string;
  schoolName: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  grade: string;
  avatar: string;
  climateScore: number; // 0 to 100
  empathyLevel: number; // 0 to 100
  engagementScore: number; // 0 to 100
  status: 'safe' | 'monitoring' | 'intervention';
  statusLabel: string;
  earlyWarnings: string[];
  badges: string[];
  missionsCompleted: number;
  totalMissions: number;
  attendanceRate: number; // e.g. 96%
  notes: {
    id: string;
    date: string;
    author: string;
    role: string;
    text: string;
    type: 'positivo' | 'alerta' | 'intervencao';
  }[];
  recentEmotions: ('alegre' | 'calmo' | 'ansioso' | 'triste' | 'irritado' | 'isolado')[];
}

export type IncidentType = 'verbal' | 'fisico' | 'psicologico' | 'cyberbullying' | 'exclusao_social';
export type IncidentSeverity = 'baixa' | 'media' | 'alta' | 'critica';
export type IncidentStatus = 'novo' | 'em_analise' | 'mediacao_agendada' | 'em_acompanhamento' | 'resolvido';

export interface IncidentReport {
  id: string;
  code: string;
  date: string;
  type: IncidentType;
  typeLabel: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  location: string;
  description: string;
  isAnonymous: boolean;
  reporterRole: string;
  targetStudent?: string;
  involvedClass: string;
  assignedSpecialist: string;
  restorativeAction: string;
  timeline: {
    date: string;
    action: string;
    user: string;
  }[];
}

export type MediationStage = 'acolhimento' | 'escuta_ativa' | 'circulo_restaurativo' | 'acordo_assinado' | 'pos_acompanhamento';

export interface MediationCase {
  id: string;
  code: string;
  title: string;
  date: string;
  facilitator: string;
  studentsInvolved: string[];
  classGroup: string;
  coreConflict: string;
  currentStage: MediationStage;
  restorativeAgreements: string[];
  nextFollowUpDate: string;
  status: 'ativo' | 'concluido';
}

export interface PedagogicalProposal {
  id: string;
  title: string;
  category: 'socioemocional' | 'mediacao' | 'inclusao' | 'intervencao_imediata';
  categoryLabel: string;
  targetGrade: string;
  duration: string;
  objective: string;
  bnccCompetencies: string[];
  protocolSteps: string[];
  practicalMaterials: string[];
  recommendedWhen: string;
  immediateInterventionGuide?: {
    teacherAction: string[];
    studentPrompt: string;
    whatToAvoid: string[];
  };
}

export interface GamificationMission {
  id: string;
  title: string;
  description: string;
  category: 'empatia' | 'inclusao' | 'autocuidado' | 'dialogo';
  points: number;
  completed: boolean;
  frequency: 'diaria' | 'semanal';
  icon: string;
}

export interface GamificationBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedDate?: string;
  category: string;
}

export interface EarlyWarningSign {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  category: 'comportamental' | 'social' | 'academico' | 'emocional';
  description: string;
  detectedDate: string;
  urgency: 'atencao' | 'urgente';
  source: string;
}

export interface KindnessMessage {
  id: string;
  author: string;
  recipient: string;
  message: string;
  date: string;
  color: string;
  sticker: string;
  likes: number;
}

export interface PatioZoneCheck {
  id: string;
  zoneName: string;
  location: string;
  riskLevel: 'seguro' | 'atencao' | 'alerta';
  activeMonitors: number;
  lastInspection: string;
  statusText: string;
  iconName: string;
  reportedIncidents: number;
}

export interface FamilyGuidanceTopic {
  id: string;
  title: string;
  category: 'sinais_alerta' | 'cyberbullying' | 'dialogo_emocional' | 'parceria_escola';
  categoryLabel: string;
  readingTime: string;
  summary: string;
  keySigns: string[];
  actionSteps: string[];
  recommendedPhrases: string[];
  tagColor: string;
}

