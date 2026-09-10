import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Sparkles, 
  Heart, 
  BookOpen, 
  Users, 
  School, 
  Eye, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Star, 
  Smile, 
  PartyPopper, 
  CheckCircle2, 
  Compass, 
  Shield, 
  HelpCircle,
  Shuffle,
  ThumbsUp,
  Flame,
  MessageSquareHeart
} from 'lucide-react';

const KINDNESS_TIPS = [
  {
    icon: '🤝',
    title: 'Acolha quem está sozinho',
    desc: 'Viu alguém sentado sozinho no recreio? Puxe conversa com um simples: "Oi, posso sentar aqui com você?"'
  },
  {
    icon: '✨',
    title: 'Corte a plateia do bullying',
    desc: 'Se alguém contar uma piada ofensiva ou zombar de um colega, não ria. Ficar sério já desarma o agressor.'
  },
  {
    icon: '💌',
    title: 'Deixe um elogio sincero',
    desc: 'Envie um recadinho gentil para um amigo no Mural da Gentileza valorizando o esforço dele.'
  },
  {
    icon: '🛡️',
    title: 'Não repasse prints e piadas',
    desc: 'No WhatsApp ou redes sociais, não compartilhe fofocas, apelidos ou memes que ridicularizem colegas.'
  },
  {
    icon: '🌟',
    title: 'Agradeça a equipe escolar',
    desc: 'Diga um caloroso "obrigado(a)" aos profissionais da limpeza, cantina e inspetoria pelo cuidado diário.'
  },
  {
    icon: '⚽',
    title: 'Convide para o seu time',
    desc: 'Na aula de Educação Física ou no pátio, chame aquele colega que sempre fica de fora para jogar com você.'
  }
];

export const WelcomeScreen: React.FC = () => {
  const { 
    setCurrentRole, 
    setShowWelcomeScreen, 
    setIsReportModalOpen 
  } = useApp();

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isSpinningTip, setIsSpinningTip] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  useEffect(() => {
    // Gentle cheerful greeting confetti on entrance
    const timer = setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#06b6d4']
      });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Trigger cheerful confetti on launch or on button click
  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#06b6d4']
    });
    setHasCelebrated(true);
    setTimeout(() => setHasCelebrated(false), 2500);
  };

  const handleNextTip = () => {
    setIsSpinningTip(true);
    setTimeout(() => {
      setCurrentTipIndex((prev) => (prev + 1) % KINDNESS_TIPS.length);
      setIsSpinningTip(false);
    }, 200);
  };

  const selectRoleAndEnter = (role: UserRole) => {
    // Quick burst of confetti when entering
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#8b5cf6', '#ec4899', '#10b981']
    });

    setCurrentRole(role);
    setShowWelcomeScreen(false);
  };

  const roleCards: {
    role: UserRole;
    title: string;
    badge: string;
    gradient: string;
    borderHover: string;
    bgAccent: string;
    textColor: string;
    icon: React.ReactNode;
    description: string;
    tags: string[];
  }[] = [
    {
      role: 'estudante',
      title: 'Espaço do Aluno',
      badge: 'Gamificação & Empatia',
      gradient: 'from-violet-500 via-fuchsia-500 to-pink-500',
      borderHover: 'hover:border-fuchsia-400 hover:shadow-fuchsia-200/50',
      bgAccent: 'bg-violet-50 text-violet-700',
      textColor: 'text-violet-950',
      icon: <Sparkles className="w-7 h-7 text-white" />,
      description: 'Termômetro emocional diário, missões de gentileza, mural coletivo de elogios e insígnias para conquistar.',
      tags: ['Mural de Post-its', 'Missões Semanais', 'Super Aliado']
    },
    {
      role: 'professor',
      title: 'Docência & Tutoria',
      badge: 'Sala de Aula & BNCC',
      gradient: 'from-amber-500 via-orange-500 to-rose-500',
      borderHover: 'hover:border-amber-400 hover:shadow-amber-200/50',
      bgAccent: 'bg-amber-50 text-amber-700',
      textColor: 'text-amber-950',
      icon: <BookOpen className="w-7 h-7 text-white" />,
      description: 'Termômetro do clima da turma, identificação precoce de isolamento e dinâmicas socioemocionais práticas.',
      tags: ['Sinais Precoces', 'Plano de Aula BNCC', 'Clima Coletivo']
    },
    {
      role: 'orientador',
      title: 'Orientação & Psicologia',
      badge: 'Justiça Restaurativa',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      borderHover: 'hover:border-emerald-400 hover:shadow-emerald-200/50',
      bgAccent: 'bg-emerald-50 text-emerald-700',
      textColor: 'text-emerald-950',
      icon: <Users className="w-7 h-7 text-white" />,
      description: 'Triagem humanizada do Canal Seguro, condução dos 5 passos de mediação de conflitos e círculos de paz.',
      tags: ['Canal Seguro', 'Círculos de Paz', 'Sigilo Ético']
    },
    {
      role: 'gestor',
      title: 'Gestão Escolar',
      badge: 'Lei 13.185 & Métricas',
      gradient: 'from-blue-600 via-indigo-600 to-violet-600',
      borderHover: 'hover:border-blue-400 hover:shadow-blue-200/50',
      bgAccent: 'bg-blue-50 text-blue-700',
      textColor: 'text-blue-950',
      icon: <School className="w-7 h-7 text-white" />,
      description: 'Painel executivo em tempo real, auditoria oficial do MEC, metas de convivência e compliance institucional.',
      tags: ['Auditoria MEC', 'Lei 14.811/2024', 'Indicadores']
    },
    {
      role: 'familia',
      title: 'Família & Responsáveis',
      badge: 'Acolhimento Parental',
      gradient: 'from-rose-500 via-pink-500 to-amber-500',
      borderHover: 'hover:border-rose-400 hover:shadow-rose-200/50',
      bgAccent: 'bg-rose-50 text-rose-700',
      textColor: 'text-rose-950',
      icon: <Heart className="w-7 h-7 text-white" />,
      description: 'Checklist de sinais em casa, guia prático contra cyberbullying e agendamento de escuta acolhedora.',
      tags: ['Sinais em Casa', 'Guia de Redes', 'Diálogo Escolar']
    },
    {
      role: 'apoio',
      title: 'Pátio & Inspetoria',
      badge: 'Recreio Seguro & Radar',
      gradient: 'from-sky-500 via-cyan-500 to-emerald-500',
      borderHover: 'hover:border-sky-400 hover:shadow-sky-200/50',
      bgAccent: 'bg-sky-50 text-sky-700',
      textColor: 'text-sky-950',
      icon: <Eye className="w-7 h-7 text-white" />,
      description: 'Radar de convivência no intervalo, registro rápido em 15 segundos e guia de ouro para desarmar provocações.',
      tags: ['Radar do Recreio', 'Registro Ágil', 'Presença Amiga']
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden pb-16">
      
      {/* Animated Floating Bubbles / Soft Gradient Blobs in background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-pink-300/40 via-purple-300/30 to-violet-300/20 blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 20, 0],
            y: [0, 30, -30, 0],
            scale: [1, 1.05, 0.9, 1]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-amber-200/40 via-orange-300/30 to-rose-200/30 blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, 25, -25, 0],
            y: [0, -30, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 left-1/4 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-emerald-200/40 via-teal-300/30 to-sky-200/30 blur-3xl"
        />
      </div>

      {/* Hero Welcome Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-10">
        
        {/* Top Floating Badge & Hero Headline */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-xs text-xs font-bold text-slate-700"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-violet-700 font-black">EduSafe 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">Lei Federal 13.185/2015 & Lei 14.811/2024</span>
            <span className="text-slate-400">•</span>
            <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent font-black">
              Escola Sem Bullying & Mais Empatia
            </span>
          </motion.div>

          {/* Main Title with Animated Entrance */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]"
          >
            Onde Todo Mundo é{' '}
            <span className="bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
              Bem-Vindo, Seguro
            </span>{' '}
            e Ouvido! 🌈
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            A convivência saudável começa no olhar atento e nas pequenas atitudes.
            Escolha seu perfil abaixo para entrar na experiência interativa da nossa comunidade escolar:
          </motion.p>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <button
              onClick={() => selectRoleAndEnter('estudante')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-black text-sm shadow-md hover:shadow-lg transition-all hover:scale-102 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Entrar como Aluno
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={fireConfetti}
              className="px-4 py-3 rounded-2xl bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 font-bold text-sm border border-slate-200 shadow-2xs hover:shadow-sm transition-all flex items-center gap-2 active:scale-95"
            >
              <PartyPopper className={`w-4 h-4 text-pink-500 ${hasCelebrated ? 'animate-bounce' : ''}`} />
              Chuva de Confetes! 🎉
            </button>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-sm border border-rose-200 shadow-2xs transition-all flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Canal Seguro (Sigiloso)
            </button>
          </motion.div>
        </div>

        {/* 6 Colorful Interactive Role Selection Cards */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-violet-600" />
                Portais de Acesso da Comunidade Escolar
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Selecione quem você é para acessar ferramentas personalizadas para o seu dia a dia
              </p>
            </div>
            <span className="text-xs font-bold text-violet-800 bg-violet-100/70 px-3 py-1 rounded-full self-start sm:self-auto">
              6 Perfis Conectados
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {roleCards.map((card, idx) => (
              <motion.div
                key={card.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + idx * 0.07 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => selectRoleAndEnter(card.role)}
                className={`group cursor-pointer relative rounded-3xl bg-white border-2 border-slate-200/80 p-6 flex flex-col justify-between shadow-sm transition-all hover:shadow-xl ${card.borderHover}`}
              >
                {/* Top Role Header */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      {card.icon}
                    </div>

                    <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${card.bgAccent}`}>
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-xl font-black ${card.textColor} group-hover:text-violet-600 transition-colors`}>
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1.5">
                      {card.description}
                    </p>
                  </div>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-white group-hover:shadow-2xs transition-colors border border-slate-200/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Enter Action */}
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-700 group-hover:text-violet-700 transition-colors">
                    Acessar este Painel
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 group-hover:bg-gradient-to-r ${card.gradient} group-hover:text-white transition-all shadow-2xs group-hover:translate-x-1`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Feature Row: Pílula de Gentileza & Termômetro de Convivência */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          
          {/* Pílula de Gentileza do Dia (Interactive generator) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 border-2 border-amber-200 p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/70 text-amber-900 text-xs font-black">
                  <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                  Pílula de Gentileza do Dia
                </span>

                <button
                  onClick={handleNextTip}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 shadow-2xs transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Shuffle className={`w-3.5 h-3.5 ${isSpinningTip ? 'animate-spin' : ''}`} />
                  Sortear Outra Atitude
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTipIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2 pt-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-2xl bg-white shadow-2xs">
                      {KINDNESS_TIPS[currentTipIndex].icon}
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900">
                      {KINDNESS_TIPS[currentTipIndex].title}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium pl-1 sm:pl-16">
                    &quot;{KINDNESS_TIPS[currentTipIndex].desc}&quot;
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-amber-200/80 text-xs text-amber-900 font-medium">
              <span>💡 Dica: Pequenos gestos desarmam mais de 70% das brigas no recreio.</span>
              <button
                onClick={() => selectRoleAndEnter('estudante')}
                className="text-xs font-black text-pink-700 hover:text-pink-800 flex items-center gap-1 underline underline-offset-4"
              >
                Ver Mural da Gentileza Completo →
              </button>
            </div>
          </motion.div>

          {/* Quick Safe Space / Immediate Confidential Help Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 text-white p-6 sm:p-8 flex flex-col justify-between shadow-lg space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-white">
                Precisa de Ajuda ou Quer Fazer um Relato?
              </h3>
              <p className="text-xs text-rose-100 leading-relaxed font-medium">
                Você não está sozinho(a). Nosso Canal Seguro é 100% sigiloso e acolhe situações de bullying, cyberbullying ou isolamento sem julgamentos.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="w-full py-3 rounded-2xl bg-white hover:bg-rose-50 text-rose-700 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 hover:scale-102"
              >
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Abrir Canal Seguro Agora
              </button>
              <p className="text-[10px] text-center text-rose-200 font-medium">
                Sigilo pedagógico garantido pela Lei 13.185 e LGPD
              </p>
            </div>
          </motion.div>
        </div>

        {/* Collective Pillars of Safe School (BNCC, Peace Circles, Respect) */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Pilares da Convivência Escolar
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Como Transformamos a Escola Juntos
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-violet-50/60 border border-violet-100 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center font-black text-xs">
                1
              </div>
              <h4 className="text-sm font-black text-slate-900">Prevenção e Escuta</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Identificamos atritos antes que virem bullying crônico através de rondas no pátio e termômetro emocional.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-pink-600 text-white flex items-center justify-center font-black text-xs">
                2
              </div>
              <h4 className="text-sm font-black text-slate-900">Justiça Restaurativa</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Em vez de punições cegas que geram mágoa, usamos círculos de paz e reparação do vínculo afetivo.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xs">
                3
              </div>
              <h4 className="text-sm font-black text-slate-900">Poder do Espectador</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Empoderamos os colegas de classe para não darem plateia ao agressor e acolherem quem estiver sozinho.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                4
              </div>
              <h4 className="text-sm font-black text-slate-900">Aliança Escola & Família</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Pais e responsáveis acompanham orientações de apoio socioemocional e diálogo transparente.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
