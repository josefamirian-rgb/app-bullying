import { 
  User, 
  StudentProfile, 
  IncidentReport, 
  MediationCase, 
  PedagogicalProposal, 
  GamificationMission, 
  GamificationBadge,
  EarlyWarningSign,
  KindnessMessage,
  PatioZoneCheck,
  FamilyGuidanceTopic
} from '../types';

export const mockUsers: Record<string, User> = {
  estudante: {
    id: 'u-estudante',
    name: 'Lucas Mendes',
    role: 'estudante',
    roleTitle: 'Estudante - 8º Ano do Ensino Fundamental',
    email: 'lucas.mendes@aluno.edusafe.edu.br',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    schoolName: 'Colégio Integrado EduSafe'
  },
  professor: {
    id: 'u-professor',
    name: 'Profa. Carla Silveira',
    role: 'professor',
    roleTitle: 'Professora Tutora & Língua Portuguesa',
    email: 'carla.silveira@escolaedusafe.edu.br',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    schoolName: 'Colégio Integrado EduSafe'
  },
  orientador: {
    id: 'u-orientador',
    name: 'Prof. Marcos Vinícius',
    role: 'orientador',
    roleTitle: 'Orientador Pedagógico & Especialista em Mediação',
    email: 'marcos.vinicius@escolaedusafe.edu.br',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    schoolName: 'Colégio Integrado EduSafe'
  },
  gestor: {
    id: 'u-gestor',
    name: 'Dra. Helena Castro',
    role: 'gestor',
    roleTitle: 'Diretora Pedagógica & Gestão Escolar',
    email: 'helena.castro@escolaedusafe.edu.br',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    schoolName: 'Colégio Integrado EduSafe'
  },
  familia: {
    id: 'u-familia',
    name: 'Mariana & Roberto Mendes',
    role: 'familia',
    roleTitle: 'Família do Estudante Lucas Mendes (8º B)',
    email: 'familia.mendes@email.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    schoolName: 'Colégio Integrado EduSafe'
  },
  apoio: {
    id: 'u-apoio',
    name: 'Inspetor Carlos Oliveira (Seu Carlos)',
    role: 'apoio',
    roleTitle: 'Monitor de Pátio & Convivência Escolar',
    email: 'carlos.inspetoria@escolaedusafe.edu.br',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    schoolName: 'Colégio Integrado EduSafe'
  }
};

export const initialStudents: StudentProfile[] = [
  {
    id: 'std-1',
    name: 'Lucas Mendes',
    grade: '8º Ano B',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    climateScore: 88,
    empathyLevel: 92,
    engagementScore: 85,
    status: 'safe',
    statusLabel: 'Seguro & Engajado',
    earlyWarnings: [],
    badges: ['Guardião da Paz', 'Empatia em Ação', 'Ouvinte Ativo', 'Embaixador da Inclusão'],
    missionsCompleted: 14,
    totalMissions: 18,
    attendanceRate: 98,
    recentEmotions: ['calmo', 'alegre', 'calmo', 'alegre', 'calmo'],
    notes: [
      {
        id: 'n-1',
        date: '10/09/2026',
        author: 'Profa. Carla Silveira',
        role: 'Professora',
        text: 'Lucas acolheu proativamente o aluno recém-transferido no trabalho em grupo de Língua Portuguesa.',
        type: 'positivo'
      }
    ]
  },
  {
    id: 'std-2',
    name: 'Beatriz Vasconcelos',
    grade: '8º Ano B',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    climateScore: 62,
    empathyLevel: 70,
    engagementScore: 58,
    status: 'monitoring',
    statusLabel: 'Em Monitoramento Preventivo',
    earlyWarnings: ['Isolamento no intervalo', 'Queda brusca de participação oral'],
    badges: ['Empatia em Ação', 'Primeiro Passo'],
    missionsCompleted: 6,
    totalMissions: 18,
    attendanceRate: 91,
    recentEmotions: ['triste', 'ansioso', 'isolado', 'calmo', 'ansioso'],
    notes: [
      {
        id: 'n-2',
        date: '08/09/2026',
        author: 'Prof. Marcos Vinícius',
        role: 'Orientador',
        text: 'Identificado padrão de permanência solitária na biblioteca durante os recreios. Realizada conversa de acolhimento inicial sem julgamento.',
        type: 'alerta'
      },
      {
        id: 'n-2b',
        date: '09/09/2026',
        author: 'Profa. Carla Silveira',
        role: 'Professora',
        text: 'Remanejada para dinâmica de pares focada com estudante de apoio socioemocional.',
        type: 'intervencao'
      }
    ]
  },
  {
    id: 'std-3',
    name: 'Gabriel Siqueira',
    grade: '9º Ano A',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    climateScore: 48,
    empathyLevel: 54,
    engagementScore: 60,
    status: 'intervention',
    statusLabel: 'Intervenção Restaurativa Ativa',
    earlyWarnings: ['Apelidos pejorativos reiterados', 'Conflito em rede social da turma', 'Resistência a regras grupais'],
    badges: ['Ouvinte Ativo'],
    missionsCompleted: 4,
    totalMissions: 18,
    attendanceRate: 86,
    recentEmotions: ['irritado', 'irritado', 'ansioso', 'calmo', 'irritado'],
    notes: [
      {
        id: 'n-3',
        date: '05/09/2026',
        author: 'Prof. Marcos Vinícius',
        role: 'Orientador',
        text: 'Convocado círculo restaurativo com presença dos responsáveis para pactuação de compromissos mútuos.',
        type: 'intervencao'
      }
    ]
  },
  {
    id: 'std-4',
    name: 'Mariana Duarte',
    grade: '7º Ano C',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    climateScore: 94,
    empathyLevel: 96,
    engagementScore: 95,
    status: 'safe',
    statusLabel: 'Líder Positiva de Convivência',
    earlyWarnings: [],
    badges: ['Guardião da Paz', 'Empatia em Ação', 'Ouvinte Ativo', 'Embaixador da Inclusão', 'Mediador Mirim'],
    missionsCompleted: 17,
    totalMissions: 18,
    attendanceRate: 99,
    recentEmotions: ['alegre', 'alegre', 'calmo', 'alegre', 'alegre'],
    notes: [
      {
        id: 'n-4',
        date: '02/09/2026',
        author: 'Dra. Helena Castro',
        role: 'Gestora',
        text: 'Parabenizada na comissão de mediação de pares mirins do 7º ano.',
        type: 'positivo'
      }
    ]
  },
  {
    id: 'std-5',
    name: 'Thiago Albuquerque',
    grade: '8º Ano B',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    climateScore: 68,
    empathyLevel: 72,
    engagementScore: 75,
    status: 'monitoring',
    statusLabel: 'Em Acompanhamento',
    earlyWarnings: ['Sensibilidade acentuada a piadas', 'Postura retraída no pátio'],
    badges: ['Empatia em Ação', 'Primeiro Passo'],
    missionsCompleted: 8,
    totalMissions: 18,
    attendanceRate: 94,
    recentEmotions: ['ansioso', 'calmo', 'isolado', 'calmo', 'calmo'],
    notes: [
      {
        id: 'n-5',
        date: '06/09/2026',
        author: 'Profa. Carla Silveira',
        role: 'Professora',
        text: 'Observado desconforto em brincadeiras de deboche velado. Alinhado com a coordenação para sensibilização coletiva.',
        type: 'alerta'
      }
    ]
  }
];

export const initialIncidents: IncidentReport[] = [
  {
    id: 'inc-101',
    code: 'REL-2026-089',
    date: '09/09/2026',
    type: 'exclusao_social',
    typeLabel: 'Exclusão Social e Isolamento Sistemático',
    severity: 'media',
    status: 'em_acompanhamento',
    location: 'Refeitório / Pátio Sul',
    description: 'Relatado que alunas impediram deliberadamente a aluna Beatriz de sentar-se na mesa do lanche com deboches discretos.',
    isAnonymous: true,
    reporterRole: 'Estudante (Canal Seguro)',
    targetStudent: 'Beatriz Vasconcelos',
    involvedClass: '8º Ano B',
    assignedSpecialist: 'Prof. Marcos Vinícius (Orientação)',
    restorativeAction: 'Aplicação de Dinâmica de Círculo Restaurativo de Não-Exclusão e tutoria de pares.',
    timeline: [
      { date: '09/09 10:15', action: 'Registro sigiloso recebido via Canal de Escuta Segura', user: 'Sistema EduSafe' },
      { date: '09/09 11:30', action: 'Triagem de gravidade e verificação presencial pelo Orientador', user: 'Prof. Marcos Vinícius' },
      { date: '09/09 14:00', action: 'Acolhimento individual com acolhimento emocional', user: 'Prof. Marcos Vinícius' }
    ]
  },
  {
    id: 'inc-102',
    code: 'REL-2026-084',
    date: '06/09/2026',
    type: 'cyberbullying',
    typeLabel: 'Cyberbullying / Grupo de Mensagens',
    severity: 'alta',
    status: 'mediacao_agendada',
    location: 'Ambiente Virtual (Grupo de WhatsApp da turma)',
    description: 'Circulação de figurinhas pejorativas alterando fotos de um estudante durante a gincana escolar.',
    isAnonymous: false,
    reporterRole: 'Professora Tutora',
    targetStudent: 'Thiago Albuquerque',
    involvedClass: '8º Ano B',
    assignedSpecialist: 'Prof. Marcos Vinícius e Dra. Helena Castro',
    restorativeAction: 'Oficina de Cidadania Digital e Direito à Imagem; diálogo restaurativo mediado.',
    timeline: [
      { date: '06/09 16:40', action: 'Alerta formal encaminhado pela professora tutora', user: 'Profa. Carla Silveira' },
      { date: '07/09 09:00', action: 'Notificação confidencial aos responsáveis para sensibilização formativa', user: 'Dra. Helena Castro' },
      { date: '08/09 15:30', action: 'Mediação agendada para pactuação de compromisso digital', user: 'Prof. Marcos Vinícius' }
    ]
  },
  {
    id: 'inc-103',
    code: 'REL-2026-077',
    date: '01/09/2026',
    type: 'verbal',
    typeLabel: 'Ofensa Verbal e Apelidos Constrangedores',
    severity: 'media',
    status: 'resolvido',
    location: 'Quadra Poliesportiva',
    description: 'Comentários ofensivos durante aula de educação física após erro esportivo.',
    isAnonymous: false,
    reporterRole: 'Professor de Educação Física',
    targetStudent: 'Aluno 9º Ano',
    involvedClass: '9º Ano A',
    assignedSpecialist: 'Prof. Marcos Vinícius',
    restorativeAction: 'Círculo de Respeito às Diferenças no Esporte; termo de convivência firmado com sucesso.',
    timeline: [
      { date: '01/09 11:00', action: 'Intervenção pedagógica imediata na quadra', user: 'Professor de Ed. Física' },
      { date: '02/09 14:00', action: 'Sessão de mediação dialógica e pedido mútuo de reparação', user: 'Prof. Marcos Vinícius' },
      { date: '08/09 10:00', action: 'Checagem pós-acompanhamento sem reincidência. Caso encerrado.', user: 'Prof. Marcos Vinícius' }
    ]
  }
];

export const initialMediations: MediationCase[] = [
  {
    id: 'med-1',
    code: 'MED-2026-012',
    title: 'Mediação Relacional: Convivência e Empatia no 8º B',
    date: '10/09/2026',
    facilitator: 'Prof. Marcos Vinícius (Orientador)',
    studentsInvolved: ['Beatriz Vasconcelos', 'Grupo de Colegas do 8º B'],
    classGroup: '8º Ano B',
    coreConflict: 'Sensação de desamparo e brincadeiras depreciativas não consentidas.',
    currentStage: 'escuta_ativa',
    restorativeAgreements: [
      'Estabelecimento de regras de ouro para o grupo de estudos',
      'Compromisso de intervenção dos colegas se houver comentários jocosos',
      'Rotatividade positiva nas mesas do refeitório'
    ],
    nextFollowUpDate: '15/09/2026',
    status: 'ativo'
  },
  {
    id: 'med-2',
    code: 'MED-2026-009',
    title: 'Círculo de Justiça Restaurativa: Ciberespaço e Respeito',
    date: '04/09/2026',
    facilitator: 'Prof. Marcos Vinícius e Dra. Helena Castro',
    studentsInvolved: ['Gabriel Siqueira', 'Thiago Albuquerque'],
    classGroup: 'Turmas do 8º e 9º Anos',
    coreConflict: 'Uso indevido de canais digitais para apelidar colegas.',
    currentStage: 'acordo_assinado',
    restorativeAgreements: [
      'Exclusão imediata do material depreciativo com pedido de desculpas sincero',
      'Apresentação de trabalho colaborativo sobre empatia digital e Lei 13.185/2015',
      'Acompanhamento quinzenal com a equipe de psicologia escolar'
    ],
    nextFollowUpDate: '18/09/2026',
    status: 'ativo'
  }
];

export const earlyWarningSigns: EarlyWarningSign[] = [
  {
    id: 'ew-1',
    studentId: 'std-2',
    studentName: 'Beatriz Vasconcelos',
    grade: '8º Ano B',
    category: 'social',
    description: 'Permanência isolada em cantos do pátio durante 4 dias consecutivos.',
    detectedDate: '08/09/2026',
    urgency: 'urgente',
    source: 'Monitor de Pátio / Inspetoria'
  },
  {
    id: 'ew-2',
    studentId: 'std-2',
    studentName: 'Beatriz Vasconcelos',
    grade: '8º Ano B',
    category: 'academico',
    description: 'Queda súbita de entregas de lições e recusa a falar em apresentações orais.',
    detectedDate: '07/09/2026',
    urgency: 'atencao',
    source: 'Profa. Carla Silveira'
  },
  {
    id: 'ew-3',
    studentId: 'std-3',
    studentName: 'Gabriel Siqueira',
    grade: '9º Ano A',
    category: 'comportamental',
    description: 'Reações explosivas a feedbacks corretivos em sala de aula.',
    detectedDate: '05/09/2026',
    urgency: 'urgente',
    source: 'Prof. de História'
  },
  {
    id: 'ew-4',
    studentId: 'std-5',
    studentName: 'Thiago Albuquerque',
    grade: '8º Ano B',
    category: 'emocional',
    description: 'Queixas somáticas frequentes (dor de cabeça/estômago) no horário das aulas de educação física.',
    detectedDate: '03/09/2026',
    urgency: 'atencao',
    source: 'Enfermaria Escolar'
  }
];

export const pedagogicalProposals: PedagogicalProposal[] = [
  {
    id: 'prop-1',
    title: 'Protocolo de Intervenção Imediata: Método STOP & CONVIVER',
    category: 'intervencao_imediata',
    categoryLabel: 'Intervenção Imediata em Crise',
    targetGrade: 'Fundamental II e Ensino Médio',
    duration: '10 a 15 minutos (na ocorrência) + desdobramento',
    objective: 'Cessar a agressão instantaneamente sem humilhação pública e restabelecer a segurança psicológica do ambiente escolar.',
    bnccCompetencies: [
      'Competência Geral 8: Autoconhecimento e Autocuidado',
      'Competência Geral 9: Empatia e Cooperação',
      'Competência Geral 10: Responsabilidade e Cidadania'
    ],
    protocolSteps: [
      '1. INTERRUPÇÃO FIRME E CALMA: Nomear a conduta, não o aluno. "Nesta sala não aceitamos apelidos ou deboches. Vamos parar agora."',
      '2. SEPARAÇÃO SEM JULGAMENTO SUMÁRIO: Afastar os alunos do foco de espectadores, garantindo espaço privado para a vítima respirar.',
      '3. ACOLHIMENTO IMEDIATO DO ALVO: Validar a dor sem minimizar. "Eu vi o que aconteceu e você está seguro(a) aqui. Isso não é sua culpa."',
      '4. RESPONSABILIZAÇÃO DIALÓGICA DO AGRESSOR: Questionar o impacto, não a intenção. "Qual efeito você acha que essa fala causa no outro?"',
      '5. ENCAMINHAMENTO À ORIENTAÇÃO: Registro no prontuário socioemocional EduSafe sem aplicação de punições estéreis sem reflexão.'
    ],
    practicalMaterials: [
      'Ficha de Registro Rápido de Ocorrência ConVivência',
      'Cartão de Bolso do Educador: Frases Acolhedoras vs. Frases Proibidas',
      'Roteiro de Escuta Inicial'
    ],
    recommendedWhen: 'Ao flagrar episódios de intimidação, humilhação verbal, exclusão ostensiva ou agressão física iminente.',
    immediateInterventionGuide: {
      teacherAction: [
        'Mantenha o tom de voz sereno e firme, sem gritar ou ironizar.',
        'Posicione-se fisicamente entre as partes de forma protetiva e não ameaçadora.',
        'Desfaça imediatamente a plateia pedindo que os outros alunos retomem suas tarefas.'
      ],
      studentPrompt: '"Aqui cuidamos uns dos outros. O que podemos fazer agora para que todos voltem a se sentir respeitados?"',
      whatToAvoid: [
        'NUNCA forçar um aperto de mãos ou desculpas falsas imediatas sob ameaça.',
        'NUNCA dizer: "Vocês são amigos, isso é só brincadeira / mimimi".',
        'NUNCA expor o estudante agredido a confrontar o agressor na frente de toda a classe.'
      ]
    }
  },
  {
    id: 'prop-2',
    title: 'Círculos Restaurativos de Convivência e Paz (Kay Pranis)',
    category: 'mediacao',
    categoryLabel: 'Mediação de Conflitos e Justiça Restaurativa',
    targetGrade: '6º ao 9º Ano',
    duration: '50 minutos (semanal ou quinzenal)',
    objective: 'Fortalecer os vínculos comunitários e resolver atritos relacionais através da fala com bastão da palavra e escuta empática.',
    bnccCompetencies: [
      'Competência Geral 9: Empatia e Resolução Não-Violenta de Conflitos',
      'Competência Geral 7: Argumentação respeitosa'
    ],
    protocolSteps: [
      '1. DISPOSIÇÃO CIRCULAR: Cadeiras sem mesas para garantir contato visual igualitário.',
      '2. PEÇA DA PALAVRA (TALKING PIECE): Apenas quem segura o objeto tem direito à fala; os demais praticam escuta ativa.',
      '3. PACTUAÇÃO DE VALORES: O grupo define coletivamente os valores do círculo (confidencialidade, respeito, não-julgamento).',
      '4. RODADAS DE PERGUNTAS GUIA: De perguntas amenas a reflexões profundas sobre sentimentos de exclusão e companheirismo.',
      '5. ENCERRAMENTO COM PLANO DE COMPROMISSO: Ações concretas pactuadas para a rotina semanal.'
    ],
    practicalMaterials: [
      'Objeto da palavra com significado simbólico (ex: pedra polida ou mini planta)',
      'Tapete central de valores ou cartaz com regras da roda',
      'Caderno de Acordos Restaurativos'
    ],
    recommendedWhen: 'Ambientes com tensões veladas, panelinhas excludentes ou após superação de episódio de conflito para reparação de vínculo.'
  },
  {
    id: 'prop-3',
    title: 'Programa de Tutoria de Pares: "Embaixadores da Convivência"',
    category: 'inclusao',
    categoryLabel: 'Diretrizes de Inclusão e Equidade Escolar',
    targetGrade: 'Todos os anos',
    duration: 'Contínuo durante todo o ano letivo',
    objective: 'Capacitar estudantes voluntários como multiplicadores da empatia, acolhimento de novos alunos e defensores da inclusão neurodiversa.',
    bnccCompetencies: [
      'Competência Geral 3: Senso estético e valorização das diferenças',
      'Competência Geral 9: Exercitar a empatia, o diálogo e a cooperação'
    ],
    protocolSteps: [
      '1. FORMAÇÃO EM COMUNICAÇÃO NÃO-VIOLENTA (CNV): Oficinas práticas sobre empatia, escuta empática e preconceito implícito.',
      '2. MAPA DE RECREIO PROTEGIDO: Presença de embaixadores identificados para propor jogos inclusivos no intervalo.',
      '3. ACOLHIMENTO DE ESTUDANTES COM TEA E PCDs: Dinâmicas de adaptação de ambientes sensoriais e inclusão em trabalhos grupais.',
      '4. REUNIÕES DE SUPERVISÃO: Encontros quinzenais com a Orientação Pedagógica para acolher os próprios embaixadores.'
    ],
    practicalMaterials: [
      'Crachá / Broche do Embaixador da Convivência',
      'Guia Prático de Inclusão Escolar e Neurodiversidade',
      'Painel de Atividades Colaborativas de Intervalo'
    ],
    recommendedWhen: 'Prevenção primária sistemática (Lei 13.185/2015 e Lei 14.811/2024).'
  },
  {
    id: 'prop-4',
    title: 'Termômetro Emocional e Roda das Emoções (Marc Brackett - RULER)',
    category: 'socioemocional',
    categoryLabel: 'Inteligência Socioemocional (SEL)',
    targetGrade: 'Fundamental I e II',
    duration: '5 a 10 minutos no início da aula',
    objective: 'Desenvolver a consciência emocional, ampliação do vocabulário de sentimentos e regulação do estresse escolar.',
    bnccCompetencies: [
      'Competência Geral 8: Conhecer-se, apreciar-se e cuidar de sua saúde física e emocional',
      'Competência Geral 9: Respeitar a si e ao outro'
    ],
    protocolSteps: [
      '1. CHECK-IN DIÁRIO NO EDU-SAFE: Alunos selecionam sua energia e agradabilidade em uma escala cromática acessível.',
      '2. NOMEAÇÃO PRECISA: Distinção entre raiva, frustração, sobrecarga, tristeza e solidão.',
      '3. ESTRATÉGIAS DE AUTORREGULAÇÃO: Técnicas de respiração diafragmática 4-7-8 ou escrita expressiva de 3 minutos.',
      '4. MAPEAMENTO DE TURMA PARA O PROFESSOR: Painel térmico do clima da sala para ajustar a didática do dia.'
    ],
    practicalMaterials: [
      'Módulo Interativo de Check-in no EduSafe',
      'Quadro Físico "Como Chego Hoje"',
      'Cartões de Regulação Emocional'
    ],
    recommendedWhen: 'Rotina pedagógica diária para prevenção de crises e redução da agressividade impulsiva.'
  }
];

export const studentMissions: GamificationMission[] = [
  {
    id: 'mis-1',
    title: 'Check-in Emocional do Dia',
    description: 'Registre como você está se sentindo hoje e identifique o que influenciou seu humor.',
    category: 'autocuidado',
    points: 20,
    completed: true,
    frequency: 'diaria',
    icon: 'HeartHandshake'
  },
  {
    id: 'mis-2',
    title: 'Acolher Alguém no Intervalo',
    description: 'Convide um colega que esteja sozinho para o lanche, para um jogo ou uma conversa agradável.',
    category: 'inclusao',
    points: 50,
    completed: true,
    frequency: 'semanal',
    icon: 'Users'
  },
  {
    id: 'mis-3',
    title: 'Desafio do Elogio Sincero',
    description: 'Diga algo positivo e verdadeiro para um colega sobre suas qualidades ou dedicação.',
    category: 'empatia',
    points: 30,
    completed: false,
    frequency: 'semanal',
    icon: 'Sparkles'
  },
  {
    id: 'mis-4',
    title: 'Guardião Digital: Não Repasse',
    description: 'Se vir piadas ofensivas ou fotos de colegas em grupos de mensagem, não compartilhe e apoie quem precisa.',
    category: 'dialogo',
    points: 40,
    completed: false,
    frequency: 'semanal',
    icon: 'ShieldCheck'
  },
  {
    id: 'mis-5',
    title: 'Prática de Escuta Ativa',
    description: 'Ouça um amigo por 3 minutos sem interromper e sem julgar antes de responder.',
    category: 'empatia',
    points: 35,
    completed: true,
    frequency: 'semanal',
    icon: 'MessageCircle'
  }
];

export const studentBadges: GamificationBadge[] = [
  {
    id: 'b-1',
    title: 'Guardião da Paz',
    description: 'Completou 10 missões de apoio mútuo e convivência pacífica.',
    icon: 'Shield',
    color: 'amber',
    unlocked: true,
    unlockedDate: '01/09/2026',
    category: 'Convivência'
  },
  {
    id: 'b-2',
    title: 'Empatia em Ação',
    description: 'Realizou check-in socioemocional e apoiou colegas com escuta generosa.',
    icon: 'Heart',
    color: 'rose',
    unlocked: true,
    unlockedDate: '03/09/2026',
    category: 'Socioemocional'
  },
  {
    id: 'b-3',
    title: 'Ouvinte Ativo',
    description: 'Participou do círculo restaurativo praticando escuta atenta.',
    icon: 'Ear',
    color: 'sky',
    unlocked: true,
    unlockedDate: '06/09/2026',
    category: 'Comunicação'
  },
  {
    id: 'b-4',
    title: 'Embaixador da Inclusão',
    description: 'Atuou proativamente acolhendo estudantes novatos e neurodiversos.',
    icon: 'Sparkles',
    color: 'emerald',
    unlocked: true,
    unlockedDate: '08/09/2026',
    category: 'Inclusão'
  },
  {
    id: 'b-5',
    title: 'Mediador Mirim',
    description: 'Ajudou a transformar um desentendimento em um acordo saudável.',
    icon: 'Award',
    color: 'purple',
    unlocked: false,
    category: 'Mediação'
  },
  {
    id: 'b-6',
    title: 'Cidadão Digital Consciente',
    description: 'Completou a trilha contra o cyberbullying e segurança nas redes.',
    icon: 'Laptop',
    color: 'indigo',
    unlocked: false,
    category: 'Segurança'
  }
];

export const initialKindnessMessages: KindnessMessage[] = [
  {
    id: 'k-1',
    author: 'Lucas M.',
    recipient: 'Davi S.',
    message: 'Valeu por me ajudar com o exercício de ciências ontem, você explica muito bem!',
    date: 'Hoje, 10:15',
    color: 'bg-amber-100 border-amber-300 text-amber-900',
    sticker: '⭐',
    likes: 6
  },
  {
    id: 'k-2',
    author: 'Beatriz V.',
    recipient: 'Ana Clara',
    message: 'Adorei o seu desenho na aula de artes! Você tem um talento incrível!',
    date: 'Hoje, 09:40',
    color: 'bg-pink-100 border-pink-300 text-pink-900',
    sticker: '🎨',
    likes: 9
  },
  {
    id: 'k-3',
    author: 'Equipe de Convivência',
    recipient: 'Turma do 8º B',
    message: 'Parabéns a todos por terem acolhido a aluna nova com tanto carinho na hora do lanche!',
    date: 'Ontem, 14:20',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    sticker: '💚',
    likes: 15
  },
  {
    id: 'k-4',
    author: 'Matheus R.',
    recipient: 'Gabriel T.',
    message: 'Foi muito massa jogar basquete com você no recreio. Tamo junto no time!',
    date: 'Ontem, 11:30',
    color: 'bg-sky-100 border-sky-300 text-sky-900',
    sticker: '🏀',
    likes: 4
  }
];

export const initialPatioZones: PatioZoneCheck[] = [
  {
    id: 'zone-1',
    zoneName: 'Pátio Central & Cantina',
    location: 'Área coberta do térreo',
    riskLevel: 'seguro',
    activeMonitors: 2,
    lastInspection: 'Há 15 min',
    statusText: 'Clima animado e saudável durante o lanche. Sem aglomerações com atrito.',
    iconName: 'Coffee',
    reportedIncidents: 0
  },
  {
    id: 'zone-2',
    zoneName: 'Quadra Poliesportiva & Arquibancadas',
    location: 'Bloco Esportivo',
    riskLevel: 'atencao',
    activeMonitors: 1,
    lastInspection: 'Há 30 min',
    statusText: 'Jogos acirrados no intervalo. Monitoramento preventivo de provocações esportivas.',
    iconName: 'Trophy',
    reportedIncidents: 1
  },
  {
    id: 'zone-3',
    zoneName: 'Corredores dos Armários e Acesso aos Banheiros',
    location: 'Piso 1 - Ala Norte',
    riskLevel: 'seguro',
    activeMonitors: 2,
    lastInspection: 'Há 10 min',
    statusText: 'Ponto de atenção preventiva para evitar exclusão. Rondas a cada 15 minutos.',
    iconName: 'Shield',
    reportedIncidents: 0
  },
  {
    id: 'zone-4',
    zoneName: 'Área Verde & Mesas de Jogos',
    location: 'Jardim Externo',
    riskLevel: 'seguro',
    activeMonitors: 1,
    lastInspection: 'Há 25 min',
    statusText: 'Grupos mistos conversando e jogando jogos de tabuleiro. Clima muito acolhedor.',
    iconName: 'Trees',
    reportedIncidents: 0
  }
];

export const familyGuidanceTopics: FamilyGuidanceTopic[] = [
  {
    id: 'fg-1',
    title: 'Como identificar sinais de que seu filho(a) pode estar sofrendo intimidação',
    category: 'sinais_alerta',
    categoryLabel: 'Sinais em Casa',
    readingTime: '3 min',
    summary: 'Muitas crianças e adolescentes têm medo ou vergonha de contar espontaneamente. Fique atento a mudanças sutis de rotina.',
    keySigns: [
      'Relutância repentina ou desculpas frequentes para não ir à escola (dores de barriga, dor de cabeça matinal)',
      'Objetos escolares ou roupas que voltam rasgados ou somem sem explicação coerente',
      'Mudança de humor drástica ao chegar em casa: isolamento no quarto, tristeza súbita ou irritabilidade',
      'Queda repentina no rendimento escolar e perda de interesse pelas amizades habituais'
    ],
    actionSteps: [
      'Crie um momento tranquilo de escuta sem julgamento imediato nem interrupções',
      'Valide a dor da criança: "Eu acredito em você e estou do seu lado para resolvermos juntos"',
      'Não instrua seu filho a "revidar com violência" – isso costuma agravar a situação',
      'Entre em contato imediatamente com a coordenação pedagógica da escola pelo EduSafe'
    ],
    recommendedPhrases: [
      '"Percebi que você parece um pouco chateado hoje. Quer me contar como foi o intervalo?"',
      '"Você nunca precisa passar por nada difícil sozinho(a). A culpa nunca é sua."'
    ],
    tagColor: 'rose'
  },
  {
    id: 'fg-2',
    title: 'Cyberbullying: Protegendo nossos filhos nas redes sociais e grupos de mensagem',
    category: 'cyberbullying',
    categoryLabel: 'Segurança Digital',
    readingTime: '4 min',
    summary: 'Agressões em grupos de WhatsApp, jogos online e redes sociais ultrapassam os muros escolares e exigem acompanhamento com afeto e limites claros.',
    keySigns: [
      'Ansiedade ou nervosismo perceptível ao receber notificações no celular',
      'Esconder a tela do celular ou computador rapidamente quando alguém da família se aproxima',
      'Privação de sono por uso excessivo de aparelhos na madrugada',
      'Comentários autodepreciativos após passar tempo nas redes'
    ],
    actionSteps: [
      'Estabeleça "zonas livres de telas" durante as refeições e antes de dormir',
      'Ensine seu filho(a) a printar e guardar evidências sem responder às ofensas com mais ofensas',
      'Converse abertamente sobre pegada digital e a importância de nunca repassar figurinhas vexatórias de colegas',
      'Acione a orientação escolar se o episódio envolver colegas de turma'
    ],
    recommendedPhrases: [
      '"Se alguém te enviar algo desconfortável ou maldoso na internet, não precisa ter vergonha de me mostrar. Eu vou te apoiar."'
    ],
    tagColor: 'indigo'
  },
  {
    id: 'fg-3',
    title: 'E se meu filho estiver praticando agressões ou exclusão com colegas?',
    category: 'dialogo_emocional',
    categoryLabel: 'Parentalidade Ativa',
    readingTime: '3 min',
    summary: 'Descobrir que o próprio filho magoou outro colega dói profundamente, mas é uma oportunidade fundamental de aprendizado socioemocional e reparação restaurativa.',
    keySigns: [
      'Tendência a culpar os outros por tudo e resistência a assumir responsabilidade por erros',
      'Preocupação excessiva com popularidade ou pressão para pertencer a grupos que desdenham dos outros',
      'Comportamento agressivo ou zombeteiro com irmãos ou familiares mais novos'
    ],
    actionSteps: [
      'Converse com firmeza amorosa: condene a atitude agressiva, mas acolha o ser humano para ensiná-lo a reparar o dano',
      'Exercite a tomada de perspectiva: "Como você se sentiria se fizessem isso com você?"',
      'Participe dos Círculos Restaurativos promovidos pela escola',
      'Supervisione atitudes e incentive atos genuínos de retratação e empatia'
    ],
    recommendedPhrases: [
      '"Nós te amamos, mas nesta casa nós não toleramos desrespeito ou humilhação com ninguém. Vamos consertar isso juntos."'
    ],
    tagColor: 'amber'
  }
];

