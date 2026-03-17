/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  User, 
  LayoutDashboard, 
  ChevronRight, 
  Star, 
  Award, 
  Flame,
  CheckCircle2,
  ArrowUpRight,
  Info,
  Settings,
  Save,
  X,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
interface ModelData {
  id: string;
  name: string;
  level: 'Elite' | 'Avanzado' | 'Desarrollo';
  currentTokens: number;
  baseGoal: number;
  challengeGoal: number;
  strategicFocus: string;
  strategyDetails: string;
  lastUpdate: string;
}

// Initial Data
const INITIAL_MODELS: ModelData[] = [
  {
    id: '1',
    name: 'Lorena López',
    level: 'Elite',
    currentTokens: 13000,
    baseGoal: 15000,
    challengeGoal: 17000,
    strategicFocus: 'Monetizar Shows Premium',
    strategyDetails: 'Tus shows de fuckmachine y anal deben tener un precio premium por meta o ticket privado. Aprovecha tu experiencia para guiar a los usuarios "Ballena" (grandes gastadores).',
    lastUpdate: '01 de Marzo'
  },
  {
    id: '2',
    name: 'Ari Espinoza',
    level: 'Elite',
    currentTokens: 10771,
    baseGoal: 12400,
    challengeGoal: 14000,
    strategicFocus: 'Shows Explícitos Costosos',
    strategyDetails: 'Blindar tus shows explícitos e intensos detrás de tickets privados más costosos o metas altas de sala. Monetiza la exclusividad de tu belleza peculiar.',
    lastUpdate: '01 de Marzo'
  },
  {
    id: '3',
    name: 'Natalia Novoa',
    level: 'Avanzado',
    currentTokens: 8959,
    baseGoal: 10300,
    challengeGoal: 11600,
    strategicFocus: 'Exclusividad VIP & Medias',
    strategyDetails: 'Tu meta es cruzar los 10k. Presiona la venta de contenido privado (fotos de pies/tacones/medias) y ofrece shows VIP a tus mejores usuarios con un tono sofisticado.',
    lastUpdate: '01 de Marzo'
  },
  {
    id: '4',
    name: 'Jeimy Escobar',
    level: 'Avanzado',
    currentTokens: 7760,
    baseGoal: 8900,
    challengeGoal: 10000,
    strategicFocus: 'Findom & Fetiches MILF',
    strategyDetails: 'Tu meta es tocar los 10k. Usa tu perfil MILF elegante para aplicar humillación financiera (Findom ligero) a tus cornudos y cobrar por adoración de tus fetiches.',
    lastUpdate: '01 de Marzo'
  },
  {
    id: '5',
    name: 'Liliana Delgado',
    level: 'Desarrollo',
    currentTokens: 1845,
    baseGoal: 5000,
    challengeGoal: 8000,
    strategicFocus: 'Constancia & Aplicación de Líneas',
    strategyDetails: 'Enfócate en la constancia y en aplicar estrictamente tus Líneas de Venta (especialmente Kinky o Cornudo). Tu meta es generar 2 o 3 usuarios recurrentes esta quincena.',
    lastUpdate: '01 de Marzo'
  }
];

const LEVEL_COLORS = {
  Elite: 'bg-red-500/10 text-red-400 border-red-500/20',
  Avanzado: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Desarrollo: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
};

const LEVEL_ICONS = {
  Elite: <Award className="w-4 h-4" />,
  Avanzado: <Star className="w-4 h-4" />,
  Desarrollo: <Flame className="w-4 h-4" />
};

export default function App() {
  const [models, setModels] = useState<ModelData[]>(() => {
    const saved = localStorage.getItem('studio_models');
    return saved ? JSON.parse(saved) : INITIAL_MODELS;
  });
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [view, setView] = useState<'dashboard' | 'model' | 'admin'>('dashboard');
  const [editingModel, setEditingModel] = useState<ModelData | null>(null);

  useEffect(() => {
    localStorage.setItem('studio_models', JSON.stringify(models));
  }, [models]);

  const selectedModel = models.find(m => m.id === selectedModelId);

  const handleSelectModel = (id: string) => {
    setSelectedModelId(id);
    setView('model');
  };

  const handleUpdateModel = (updatedModel: ModelData) => {
    setModels(prev => prev.map(m => m.id === updatedModel.id ? updatedModel : m));
    setEditingModel(null);
  };

  const handleAddModel = () => {
    const newModel: ModelData = {
      id: Date.now().toString(),
      name: 'Nueva Modelo',
      level: 'Desarrollo',
      currentTokens: 0,
      baseGoal: 0,
      challengeGoal: 0,
      strategicFocus: '',
      strategyDetails: '',
      lastUpdate: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long' })
    };
    setModels(prev => [...prev, newModel]);
    setEditingModel(newModel);
  };

  const handleDeleteModel = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta modelo?')) {
      setModels(prev => prev.filter(m => m.id !== id));
      if (selectedModelId === id) setSelectedModelId(null);
    }
  };

  const calculateGoals = (tokens: number) => {
    return {
      base: Math.round(tokens * 1.15),
      challenge: Math.round(tokens * 1.30)
    };
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('dashboard')}>
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-black rounded-lg flex items-center justify-center shadow-lg shadow-red-500/20">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Tribu 1126 Models <span className="text-red-500 text-sm font-medium ml-1">v1.1</span>
            </h1>
          </div>
          
          <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            <button 
              onClick={() => setView('dashboard')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${view === 'dashboard' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              Estudio
            </button>
            <button 
              disabled={!selectedModelId}
              onClick={() => setView('model')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${view === 'model' ? 'bg-white text-black' : 'text-white/60 hover:text-white disabled:opacity-30'}`}
            >
              Mi Meta
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${view === 'admin' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {view === 'dashboard' ? (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Hero Section */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-900/40 to-black/40 border border-white/10 p-8 md:p-12">
                <div className="relative z-10 max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    Estrategia Quincenal <br/>
                    <span className="text-red-400">Próxima Quincena</span>
                  </h2>
                  <p className="text-white/60 text-lg mb-8">
                    Fijamos metas de crecimiento del 15% al 30% para asegurar el progreso continuo y salir de la zona de confort.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-medium">Meta Base: +15%</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm font-medium">Meta Reto: +30%</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-l from-red-500/50 to-transparent blur-3xl"></div>
                </div>
              </div>

              {/* Models Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {models.map((model) => (
                  <motion.div
                    key={model.id}
                    whileHover={{ y: -5 }}
                    onClick={() => handleSelectModel(model.id)}
                    className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all hover:border-white/20"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${LEVEL_COLORS[model.level]}`}>
                          {LEVEL_ICONS[model.level]}
                          {model.level}
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors">{model.name}</h3>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-white/40 text-xs uppercase font-bold tracking-widest">Actual</span>
                        <span className="text-2xl font-mono font-bold">{model.currentTokens.toLocaleString()} <span className="text-xs text-white/40">TK</span></span>
                      </div>
                      
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-yellow-400 w-[60%] rounded-full"></div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                          <span className="block text-[10px] text-white/40 font-bold uppercase mb-1">Meta Base</span>
                          <span className="text-sm font-bold text-emerald-400">{model.baseGoal.toLocaleString()}</span>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                          <span className="block text-[10px] text-white/40 font-bold uppercase mb-1">Meta Reto</span>
                          <span className="text-sm font-bold text-yellow-400">{model.challengeGoal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : view === 'model' ? (
            <motion.div 
              key="model-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* Model Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-600 to-black flex items-center justify-center text-3xl font-bold shadow-2xl shadow-red-500/20">
                    {selectedModel?.name.charAt(0)}
                  </div>
                  <div>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-2 ${LEVEL_COLORS[selectedModel!.level]}`}>
                      {LEVEL_ICONS[selectedModel!.level]}
                      Nivel {selectedModel?.level}
                    </div>
                    <h2 className="text-4xl font-bold">{selectedModel?.name}</h2>
                    <p className="text-white/40 flex items-center gap-2 mt-1">
                      <Info className="w-4 h-4" />
                      Actualizado al {selectedModel?.lastUpdate}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setView('dashboard')}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl text-sm font-bold transition-all"
                >
                  Volver al Estudio
                </button>
              </div>

              {/* Goals Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest block mb-4">Estado Actual</span>
                    <div className="text-4xl font-mono font-bold mb-2">{selectedModel?.currentTokens.toLocaleString()}</div>
                    <div className="text-white/40 text-sm">Tokens generados</div>
                  </div>
                  <User className="absolute -bottom-4 -right-4 w-24 h-24 text-white/[0.02]" />
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-emerald-400/60 text-xs font-bold uppercase tracking-widest block mb-4">Meta Base (+15%)</span>
                    <div className="text-4xl font-mono font-bold text-emerald-400 mb-2">{selectedModel?.baseGoal.toLocaleString()}</div>
                    <div className="text-emerald-400/60 text-sm">Progreso constante</div>
                  </div>
                  <TrendingUp className="absolute -bottom-4 -right-4 w-24 h-24 text-emerald-400/[0.05]" />
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-yellow-400/60 text-xs font-bold uppercase tracking-widest block mb-4">Meta Reto (+30%)</span>
                    <div className="text-4xl font-mono font-bold text-yellow-400 mb-2">{selectedModel?.challengeGoal.toLocaleString()}</div>
                    <div className="text-yellow-400/60 text-sm">Salto de nivel</div>
                  </div>
                  <Zap className="absolute -bottom-4 -right-4 w-24 h-24 text-yellow-400/[0.05]" />
                </div>
              </div>

              {/* Strategy Section */}
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
                    <LayoutDashboard className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Tu Foco Estratégico</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="bg-red-500/10 border-l-4 border-red-500 p-6 rounded-r-2xl">
                      <h4 className="text-red-400 font-bold text-lg mb-2">{selectedModel?.strategicFocus}</h4>
                      <p className="text-white/80 leading-relaxed text-lg italic">
                        "{selectedModel?.strategyDetails}"
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Pasos a seguir:</h4>
                      <ul className="space-y-3">
                        {[
                          "Identificar usuarios recurrentes",
                          "Aplicar líneas de venta específicas",
                          "Optimizar tiempos de show",
                          "Actualizar metas visuales en sala"
                        ].map((step, i) => (
                          <li key={i} className="flex items-center gap-3 text-white/70">
                            <CheckCircle2 className="w-5 h-5 text-red-500" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                      <ArrowUpRight className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">¿Cómo alcanzarlo?</h4>
                    <p className="text-white/50 text-sm mb-8">
                      La clave de esta quincena es la calidad sobre la cantidad. Enfócate en los usuarios que realmente valoran tu contenido.
                    </p>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-emerald-500"
                      />
                    </div>
                    <div className="mt-4 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                      65% de probabilidad de éxito
                    </div>
                  </div>
                </div>
              </div>

              {/* Motivational Quote */}
              <div className="text-center py-12">
                <p className="text-white/20 text-sm italic">
                  "El éxito no es el final, el fracaso no es fatal: lo que cuenta es el valor para continuar."
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="admin"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold">Gestión del Estudio</h2>
                  <p className="text-white/40">Actualiza los datos y proyecciones para la próxima quincena.</p>
                </div>
                <button 
                  onClick={handleAddModel}
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-red-500/20"
                >
                  <Plus className="w-5 h-5" />
                  Añadir Modelo
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Modelo</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Tokens Actuales</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Meta Base</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Meta Reto</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {models.map((model) => (
                      <tr key={model.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs">
                              {model.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold">{model.name}</div>
                              <div className="text-[10px] text-white/40 uppercase tracking-wider">{model.level}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono">{model.currentTokens.toLocaleString()}</td>
                        <td className="px-6 py-4 font-mono text-emerald-400">{model.baseGoal.toLocaleString()}</td>
                        <td className="px-6 py-4 font-mono text-yellow-400">{model.challengeGoal.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setEditingModel(model)}
                              className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-white"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteModel(model.id)}
                              className="p-2 hover:bg-red-500/10 rounded-xl transition-all text-red-400/60 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Edit Modal */}
              <AnimatePresence>
                {editingModel && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setEditingModel(null)}
                      className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl"
                    >
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold">Editar Modelo</h3>
                        <button onClick={() => setEditingModel(null)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Nombre</label>
                          <input 
                            type="text" 
                            value={editingModel.name}
                            onChange={(e) => setEditingModel({...editingModel, name: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Nivel</label>
                          <select 
                            value={editingModel.level}
                            onChange={(e) => setEditingModel({...editingModel, level: e.target.value as any})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all"
                          >
                            <option value="Elite">Elite</option>
                            <option value="Avanzado">Avanzado</option>
                            <option value="Desarrollo">Desarrollo</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Tokens Actuales</label>
                          <input 
                            type="number" 
                            value={editingModel.currentTokens}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0;
                              const goals = calculateGoals(val);
                              setEditingModel({
                                ...editingModel, 
                                currentTokens: val,
                                baseGoal: goals.base,
                                challengeGoal: goals.challenge
                              });
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all font-mono"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Fecha Actualización</label>
                          <input 
                            type="text" 
                            value={editingModel.lastUpdate}
                            onChange={(e) => setEditingModel({...editingModel, lastUpdate: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Meta Base (Auto: +15%)</label>
                          <input 
                            type="number" 
                            value={editingModel.baseGoal}
                            onChange={(e) => setEditingModel({...editingModel, baseGoal: parseInt(e.target.value) || 0})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all font-mono text-emerald-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Meta Reto (Auto: +30%)</label>
                          <input 
                            type="number" 
                            value={editingModel.challengeGoal}
                            onChange={(e) => setEditingModel({...editingModel, challengeGoal: parseInt(e.target.value) || 0})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all font-mono text-yellow-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-6 mb-8">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Foco Estratégico (Título)</label>
                          <input 
                            type="text" 
                            value={editingModel.strategicFocus}
                            onChange={(e) => setEditingModel({...editingModel, strategicFocus: e.target.value})}
                            placeholder="Ej: Monetizar Shows Premium"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Detalles de la Estrategia</label>
                          <textarea 
                            value={editingModel.strategyDetails}
                            onChange={(e) => setEditingModel({...editingModel, strategyDetails: e.target.value})}
                            rows={3}
                            placeholder="Describe cómo alcanzar las metas..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleUpdateModel(editingModel)}
                          className="flex-1 bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-500/20"
                        >
                          <Save className="w-5 h-5" />
                          Guardar Cambios
                        </button>
                        <button 
                          onClick={() => setEditingModel(null)}
                          className="px-8 bg-white/5 hover:bg-white/10 py-4 rounded-2xl font-bold transition-all"
                        >
                          Cancelar
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-40">
            <Target className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">StudioGoals Management System</span>
          </div>
          <div className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">
            © 2026 Studio Management • All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
