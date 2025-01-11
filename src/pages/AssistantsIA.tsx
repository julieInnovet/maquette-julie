import React, { useState } from 'react';
import {
  Brain,
  Search,
  Mic,
  MicOff,
  Star,
  MessageCircle,
  Clock,
  FileText,
  Stethoscope,
  Calculator,
  Mail,
  Microscope,
  Heart,
  Filter,
  BarChart2,
  Send,
  Calendar,
  History
} from 'lucide-react';

type AgentCategory = 'clinical' | 'management' | 'communication' | 'analysis' | 'care';

interface AIAgent {
  id: string;
  name: string;
  category: AgentCategory;
  description: string;
  icon: React.ReactNode;
  responseTime: string;
  accuracy: number;
}

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'ai';
  agentId?: string;
}

interface ConversationHistory {
  id: string;
  title: string;
  lastMessage: string;
  date: Date;
  agents: string[];
}

export function AssistantsIA() {
  const [isRecording, setIsRecording] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [historySearchTerm, setHistorySearchTerm] = useState('');

  // Mock data for conversation history
  const conversationHistory: ConversationHistory[] = [
    {
      id: '1',
      title: 'Analyse radiographie Spirit',
      lastMessage: "L'analyse suggère une légère inflammation...",
      date: new Date('2024-03-20T14:00:00'),
      agents: ['Assistant Diagnostic', 'Assistant Analyses']
    },
    {
      id: '2',
      title: 'Suivi post-opératoire Luna',
      lastMessage: "Les recommandations pour le suivi sont...",
      date: new Date('2024-03-19T15:30:00'),
      agents: ['Assistant Soins', 'Assistant Communication']
    }
  ];

  // Mock data for agents
  const agents: AIAgent[] = [
    {
      id: '1',
      name: 'Assistant Diagnostic',
      category: 'clinical',
      description: 'Aide au diagnostic clinique et suggestions de traitements',
      icon: <Stethoscope className="w-6 h-6" />,
      responseTime: '< 5s',
      accuracy: 95
    },
    {
      id: '2',
      name: 'Assistant Gestion',
      category: 'management',
      description: 'Optimisation administrative et analyse financière',
      icon: <Calculator className="w-6 h-6" />,
      responseTime: '< 3s',
      accuracy: 98
    },
    {
      id: '3',
      name: 'Assistant Communication',
      category: 'communication',
      description: 'Rédaction et personnalisation des communications clients',
      icon: <Mail className="w-6 h-6" />,
      responseTime: '< 2s',
      accuracy: 97
    },
    {
      id: '4',
      name: 'Assistant Analyses',
      category: 'analysis',
      description: 'Interprétation des résultats d\'analyses et examens',
      icon: <Microscope className="w-6 h-6" />,
      responseTime: '< 4s',
      accuracy: 96
    },
    {
      id: '5',
      name: 'Assistant Soins',
      category: 'care',
      description: 'Recommandations de soins et suivi post-consultation',
      icon: <Heart className="w-6 h-6" />,
      responseTime: '< 3s',
      accuracy: 94
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date(),
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Je suis l'assistant multi-agents. Je vais analyser votre demande et coordonner les réponses des agents appropriés.",
        timestamp: new Date(),
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const filteredHistory = conversationHistory.filter(conv => 
    conv.title.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
    conv.agents.some(agent => agent.toLowerCase().includes(historySearchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Brain className="h-8 w-8 text-navy-600" />
              <h1 className="text-2xl font-bold text-navy-600">Assistants IA</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-navy-600 transition-colors"
              >
                <Filter size={20} />
                Filtres
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600">
                <BarChart2 size={20} />
                Statistiques
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Active Agents */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Agents disponibles</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Les agents s'activeront automatiquement selon vos besoins
                </p>
              </div>
              <div className="divide-y divide-gray-200">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="p-4 flex items-center gap-4"
                  >
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {agent.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-500">{agent.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={16} />
                      {agent.responseTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Conversation Area */}
          <div className="col-span-6">
            <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-12rem)] flex flex-col">
              {/* Conversation Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-navy-50 rounded-lg">
                    <Brain className="w-6 h-6 text-navy-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Assistant Multi-Agents</h2>
                    <p className="text-sm text-gray-500">
                      Posez votre question, les agents appropriés vous répondront automatiquement
                    </p>
                  </div>
                </div>
              </div>

              {/* Conversation Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-4 ${
                        msg.sender === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        msg.sender === 'user' ? 'bg-turquoise-50' : 'bg-navy-50'
                      }`}>
                        {msg.sender === 'user' ? (
                          <MessageCircle className="w-6 h-6 text-turquoise-600" />
                        ) : (
                          <Brain className="w-6 h-6 text-navy-600" />
                        )}
                      </div>
                      <div className={`flex-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                        <div className={`inline-block p-4 rounded-lg ${
                          msg.sender === 'user' ? 'bg-turquoise-100' : 'bg-gray-100'
                        }`}>
                          <p className="text-gray-900">{msg.content}</p>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {msg.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Posez votre question ou utilisez la dictée vocale..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`p-3 rounded-lg ${
                        isRecording
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                      }`}
                    >
                      {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                    <button 
                      onClick={handleSendMessage}
                      className="p-3 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conversation History */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Historique des conversations</h2>
                <div className="mt-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Rechercher dans l'historique..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                      value={historySearchTerm}
                      onChange={(e) => setHistorySearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200 max-h-[calc(100vh-20rem)] overflow-y-auto">
                {filteredHistory.map((conv) => (
                  <div key={conv.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{conv.title}</h3>
                      <span className="text-sm text-gray-500">
                        {conv.date.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {conv.lastMessage}
                    </p>
                    <div className="flex items-center gap-2">
                      {conv.agents.map((agent, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-navy-50 text-navy-600 rounded-full text-xs"
                        >
                          {agent}
                        </span>
                      ))}
                    </div>
                    <button className="mt-2 text-sm text-turquoise-600 hover:text-turquoise-700 font-medium">
                      Reprendre la conversation
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Questions suggérées */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Questions suggérées</h3>
            <div className="space-y-2">
              {[
                "Comment interpréter ces résultats d'analyse ?",
                "Quelles sont les recommandations post-consultation ?",
                "Générer un compte-rendu de consultation",
                "Analyser la rentabilité du mois",
                "Rédiger un email de suivi",
              ].map((question, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(question)}
                  className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Ressources */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Ressources</h3>
            <div className="space-y-2">
              {[
                { name: "Guide d'utilisation", icon: FileText },
                { name: "Protocoles internes", icon: FileText },
                { name: "Articles scientifiques", icon: FileText },
              ].map((resource, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <resource.icon size={16} />
                  {resource.name}
                </button>
              ))}
            </div>
          </div>

          {/* Performances globales */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Performances globales</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Temps de réponse moyen</span>
                  <span className="text-gray-900">{'< 3s'}</span>
                </div>
                <div className="mt-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-3/4 bg-turquoise-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Précision moyenne</span>
                  <span className="text-gray-900">96%</span>
                </div>
                <div className="mt-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-[96%] bg-turquoise-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}