import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Heart, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Circle, 
  Smile, 
  Meh, 
  Frown, 
  AlertTriangle,
  Flame,
  Star,
  MessageSquareHeart,
  Send,
  ThumbsUp,
  Gift,
  HelpCircle,
  Zap,
  Users,
  Compass
} from 'lucide-react';

export const EstudanteDashboard: React.FC = () => {
  const { 
    currentUser, 
    missions, 
    badges, 
    toggleMission, 
    submitDailyEmotion, 
    setIsReportModalOpen,
    students,
    kindnessMessages,
    sendKindnessMessage,
    likeKindnessMessage
  } = useApp();

  const currentStudent = students.find(s => s.name === currentUser.name) || students[0];
  const [selectedEmotionToday, setSelectedEmotionToday] = useState<string | null>(null);
  const [emotionFeedback, setEmotionFeedback] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'missoes' | 'mural' | 'insignias' | 'aliado'>('missoes');

  // Kindness form state
  const [newRecipient, setNewRecipient] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newColor, setNewColor] = useState('bg-amber-100 border-amber-300 text-amber-900');
  const [newSticker, setNewSticker] = useState('⭐');
  const [postSuccess, setPostSuccess] = useState(false);

  const completedCount = missions.filter(m => m.completed).length;
  const totalPoints = missions.reduce((acc, curr) => curr.completed ? acc + curr.points : acc, 120);

  const emotionsList = [
    { 
      id: 'alegre' as const, 
      label: 'Radiante', 
      emoji: '😄',
      bgClass: 'bg-emerald-100 border-emerald-400 text-emerald-950',
      advice: 'Que energia maravilhosa! Que tal contagiar o dia de um colega com um elogio sincero no Mural da Gentileza?' 
    },
    { 
      id: 'calmo' as const, 
      label: 'Tranquilo', 
      emoji: '😌',
      bgClass: 'bg-teal-100 border-teal-400 text-teal-950',
      advice: 'A serenidade é perfeita para ouvir e cultivar boas conversas com os amigos.' 
    },
    { 
      id: 'ansioso' as const, 
      label: 'Ansioso', 
      emoji: '😬',
      bgClass: 'bg-amber-100 border-amber-400 text-amber-950',
      advice: 'Respire fundo em 4 tempos. Se a ansiedade persistir, você pode conversar com a orientação escolar sem julgamentos.' 
    },
    { 
      id: 'triste' as const, 
      label: 'Pra Baixo', 
      emoji: '😔',
      bgClass: 'bg-sky-100 border-sky-400 text-sky-950',
      advice: 'Dias difíceis acontecem. Lembre-se que você tem valor e não está sozinho(a). Quer desabafar no Canal Seguro?' 
    },
    { 
      id: 'irritado' as const, 
      label: 'Irritado', 
      emoji: '😤',
      bgClass: 'bg-rose-100 border-rose-400 text-rose-950',
      advice: 'Tente dar uma pausa antes de responder a provocações. Proteger sua paz e não revidar é seu superpoder.' 
    },
    { 
      id: 'isolado' as const, 
      label: 'Sozinho', 
      emoji: '🥺',
      bgClass: 'bg-violet-100 border-violet-400 text-violet-950',
      advice: 'Sua presença tem muito valor! Nossos embaixadores de convivência e a equipe de orientação estão aqui por você.' 
    }
  ];

  const handleSelectEmotion = (em: typeof emotionsList[0]) => {
    setSelectedEmotionToday(em.id);
    setEmotionFeedback(em.advice);
    submitDailyEmotion(em.id);
  };

  const handlePostKindness = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipient.trim() || !newMessage.trim()) return;

    sendKindnessMessage({
      recipient: newRecipient,
      message: newMessage,
      color: newColor,
      sticker: newSticker
    });

    setPostSuccess(true);
    setNewRecipient('');
    setNewMessage('');
    setTimeout(() => setPostSuccess(false), 3000);
  };

  const colorOptions = [
    { label: 'Amarelo Sol', value: 'bg-amber-100 border-amber-300 text-amber-900' },
    { label: 'Rosa Afeto', value: 'bg-pink-100 border-pink-300 text-pink-900' },
    { label: 'Menta Fresca', value: 'bg-emerald-100 border-emerald-300 text-emerald-900' },
    { label: 'Azul Céu', value: 'bg-sky-100 border-sky-300 text-sky-900' },
    { label: 'Lavanda Paz', value: 'bg-purple-100 border-purple-300 text-purple-900' }
  ];

  const stickerOptions = ['⭐', '💖', '🎨', '🌈', '🚀', '⚽', '🧁', '🌱', '🤝'];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Super Colorful Gamified Student Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-md border border-white/30">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Espaço do Aluno • Comunidade Amiga & Sem Bullying
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-xs">
              E aí, {currentUser.name}! 🌟
            </h1>
            <p className="text-violet-100 text-sm sm:text-base leading-relaxed font-medium">
              Sua gentileza e suas atitudes transformam nossa escola num lugar onde todo mundo se sente seguro, respeitado e acolhido.
            </p>
          </div>

          {/* Points & Streak Card */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-6 shrink-0 shadow-lg">
            <div>
              <span className="text-[11px] text-violet-200 uppercase font-black tracking-wider block">Pontos de Empatia</span>
              <div className="text-3xl font-black text-amber-300 flex items-center gap-1.5 drop-shadow-xs">
                <Star className="w-6 h-6 text-amber-300 fill-amber-300" />
                {totalPoints} pts
              </div>
            </div>
            <div className="border-l border-white/20 pl-6">
              <span className="text-[11px] text-violet-200 uppercase font-black tracking-wider block">Sequência Gentil</span>
              <div className="text-3xl font-black text-rose-300 flex items-center gap-1.5 drop-shadow-xs">
                <Flame className="w-6 h-6 text-rose-400 fill-rose-400" />
                7 dias
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mood / Emotional Check-in */}
      <div className="bg-white rounded-3xl border-2 border-violet-100 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              Termômetro do Dia: Como você está se sentindo agora?
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Seu registro é 100% privado e ajuda você a se conhecer melhor a cada dia
            </p>
          </div>
          <span className="text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200 self-start sm:self-auto">
            +5 Pontos ao Registrar
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {emotionsList.map((em) => {
            const isSelected = selectedEmotionToday === em.id;
            return (
              <button
                key={em.id}
                onClick={() => handleSelectEmotion(em)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 hover:scale-105 active:scale-95 ${
                  isSelected
                    ? `${em.bgClass} ring-4 ring-violet-400 font-black shadow-md scale-105`
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <span className="text-3xl">{em.emoji}</span>
                <span className="text-xs font-bold leading-tight">{em.label}</span>
              </button>
            );
          })}
        </div>

        {emotionFeedback && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-50 via-pink-50 to-amber-50 border-2 border-violet-200 text-violet-950 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-violet-600 shrink-0" />
              <span className="font-semibold">{emotionFeedback}</span>
            </div>
            {['triste', 'irritado', 'isolado', 'ansioso'].includes(selectedEmotionToday || '') && (
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shrink-0 shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                Desabafar com a Orientação
              </button>
            )}
          </div>
        )}
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('missoes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'missoes'
              ? 'bg-violet-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-300" />
          Missões da Semana ({completedCount}/{missions.length})
        </button>

        <button
          onClick={() => setActiveTab('mural')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'mural'
              ? 'bg-pink-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <MessageSquareHeart className="w-4 h-4" />
          Mural da Gentileza & Elogios ✨
        </button>

        <button
          onClick={() => setActiveTab('insignias')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'insignias'
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          Insígnias ({badges.filter(b => b.unlocked).length}/{badges.length})
        </button>

        <button
          onClick={() => setActiveTab('aliado')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'aliado'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Poder do Super Aliado
        </button>
      </div>

      {/* TAB 1: MISSIONS */}
      {activeTab === 'missoes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Missions Checklist */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                  Missões da Semana: Convivência e Empatia
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Clique para marcar como feita e subir de nível na comunidade escolar
                </p>
              </div>
              <span className="text-xs font-black text-violet-700 bg-violet-100 px-3 py-1 rounded-full">
                {completedCount} concluídas
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {missions.map((mis) => {
                const categoryTheme = {
                  empatia: 'border-l-4 border-l-pink-500',
                  inclusao: 'border-l-4 border-l-teal-500',
                  dialogo: 'border-l-4 border-l-indigo-500',
                  autocuidado: 'border-l-4 border-l-amber-500'
                };

                return (
                  <div
                    key={mis.id}
                    onClick={() => toggleMission(mis.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 hover:shadow-md ${categoryTheme[mis.category]} ${
                      mis.completed
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="mt-0.5">
                      {mis.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300" />
                      )}
                    </div>

                    <div className="grow space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-bold ${mis.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {mis.title}
                        </h3>
                        <span className="text-xs font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                          +{mis.points} pts
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug font-medium">
                        {mis.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 1 Col: Bystander Emergency Card */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-6 text-white shadow-lg space-y-4">
              <div className="flex items-center gap-2 font-black text-base">
                <AlertTriangle className="w-5 h-5 text-amber-300" />
                Viu alguém sofrendo zombarias?
              </div>
              <p className="text-xs text-rose-100 leading-relaxed font-medium">
                Você não precisa brigar. Pequenos gestos mudam tudo: aproxime-se do alvo e chame-o para caminhar com você.
              </p>
              
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="w-full py-3 bg-white text-rose-700 hover:bg-rose-50 font-black text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                Avisar a Orientação em Sigilo
              </button>
            </div>

            {/* Daily Affirmation Card */}
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl border-2 border-teal-200 p-6 space-y-2 text-teal-950">
              <span className="text-[11px] font-black uppercase text-teal-700 tracking-wider">
                Lembrete do Dia
              </span>
              <p className="text-xs font-bold leading-relaxed">
                &quot;Quem tem coragem de acolher quem está sozinho é quem realmente lidera a turma.&quot;
              </p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MURAL DA GENTILEZA (Kindness Wall) */}
      {activeTab === 'mural' && (
        <div className="space-y-8">
          
          {/* Post a Kindness Note Form */}
          <div className="bg-white rounded-3xl border-2 border-pink-100 shadow-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-pink-700 font-black text-lg">
              <MessageSquareHeart className="w-6 h-6 text-pink-600" />
              Enviar um Recado de Gentileza ou Elogio
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Elogios constroem amizades e transformam o clima da nossa turma. Todos os recados passam por filtro de respeito e carinho!
            </p>

            <form onSubmit={handlePostKindness} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Para quem é o recado?</label>
                  <input
                    type="text"
                    placeholder="Ex: Davi (8º B) ou Turma toda"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Escolha uma Figurinha</label>
                  <div className="flex items-center gap-2">
                    {stickerOptions.map((stk) => (
                      <button
                        key={stk}
                        type="button"
                        onClick={() => setNewSticker(stk)}
                        className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                          newSticker === stk ? 'bg-pink-100 ring-2 ring-pink-500 scale-110' : 'bg-slate-100 hover:bg-slate-200'
                        }`}
                      >
                        {stk}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sua Mensagem Gentil</label>
                <textarea
                  rows={3}
                  placeholder="Escreva algo legal: 'Valeu por me ajudar ontem', 'Adorei conversar com você no intervalo', 'Você desenha muito!'..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-pink-400 resize-none text-slate-800"
                />
              </div>

              {/* Color picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cor do Cartão</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => setNewColor(c.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${c.value} ${
                        newColor === c.value ? 'ring-2 ring-pink-500 shadow-xs' : 'opacity-80'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Publicar no Mural da Gentileza (+10 Pontos)
              </button>

              {postSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Recado publicado com sucesso! Obrigado por espalhar boas vibrações.
                </div>
              )}
            </form>
          </div>

          {/* Sticky Notes Grid */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
              Recados Recentes da Comunidade
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kindnessMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-3xl border-2 shadow-sm transition-all hover:scale-102 flex flex-col justify-between gap-4 ${msg.color}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{msg.sticker}</span>
                      <span className="text-[10px] opacity-75 font-semibold">{msg.date}</span>
                    </div>
                    <div className="text-xs font-black">
                      Para: <span className="underline">{msg.recipient}</span>
                    </div>
                    <p className="text-xs leading-relaxed font-medium">
                      &quot;{msg.message}&quot;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold opacity-80">De: {msg.author}</span>
                    <button
                      onClick={() => likeKindnessMessage(msg.id)}
                      className="px-2 py-1 rounded-lg bg-white/70 hover:bg-white text-rose-600 font-bold flex items-center gap-1 shadow-2xs transition-all active:scale-90"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span>{msg.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: INSÍGNIAS (Badges) */}
      {activeTab === 'insignias' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                Coleção de Insígnias de Convivência
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Conquiste novos selos praticando empatia, acolhimento e respeito no dia a dia
              </p>
            </div>
            <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              {badges.filter(b => b.unlocked).length} de {badges.length} desbloqueadas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((bg) => (
              <div
                key={bg.id}
                className={`p-5 rounded-3xl border-2 transition-all flex items-start gap-4 ${
                  bg.unlocked
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300 text-amber-950 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-xl shadow-xs ${
                  bg.unlocked ? 'bg-amber-400 text-white ring-4 ring-amber-200' : 'bg-slate-200 text-slate-400'
                }`}>
                  <Award className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-black text-slate-900">{bg.title}</h3>
                    {bg.unlocked && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800">
                        Conquistada
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-snug font-medium">{bg.description}</p>
                  {bg.unlockedDate && (
                    <span className="text-[10px] text-amber-700 font-bold block pt-1">
                      Desbloqueada em {bg.unlockedDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SUPER ALIADO (Bystander Guide) */}
      {activeTab === 'aliado' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-md uppercase tracking-wider">
              Guia Prático do Aluno
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Os 4 Superpoderes de Quem Não Aceita o Bullying
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              A plateia é o que mantém o agressor ativo. Quando os colegas se posicionam com respeito, o bullying acaba em menos de 10 segundos!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-rose-50 border-2 border-rose-200 space-y-2">
              <div className="flex items-center gap-2 text-rose-900 font-black text-sm">
                <span className="w-7 h-7 rounded-xl bg-rose-600 text-white flex items-center justify-center text-xs font-black">1</span>
                Corte a Risada
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Rir de piadas de mau gosto ou apelidos pejorativos faz o agressor achar que está abafando. Ficar sério já tira metade da força dele.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
                <span className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xs font-black">2</span>
                Mude o Assunto & Puxe para Perto
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Vá até o colega e diga com naturalidade: &quot;Vem cá, me ajuda a ver uma coisa ali na quadra&quot; ou &quot;Vamos até a cantina comigo?&quot;.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-sky-50 border-2 border-sky-200 space-y-2">
              <div className="flex items-center gap-2 text-sky-900 font-black text-sm">
                <span className="w-7 h-7 rounded-xl bg-sky-600 text-white flex items-center justify-center text-xs font-black">3</span>
                Não Repasse nas Redes (Cyberbullying)
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Se mandarem figurinha, montagem ou fofoca no grupo de WhatsApp, diga: &quot;Galera, nada a ver isso aí. Vamos parar&quot;. Não compartilhe.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
                <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs font-black">4</span>
                Avisar não é Fofoca, é Cuidar
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Avisar um professor ou mandar mensagem no Canal Seguro não é ser &quot;dedo-duro&quot;. É proteger a vida e a saúde mental de quem precisa.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
