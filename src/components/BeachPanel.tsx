import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Cloud, CalendarPlus, MessageCircle, ThumbsUp, User } from 'lucide-react';
import { Beach, Comment, Post, WeatherForecast } from '../types';
import WeatherTab from './WeatherTab';
import { format } from 'date-fns';
import SessionModal from './SessionModal';
import { v4 as uuidv4 } from 'uuid';

// A interface que representa um registro.
interface SessionRecord extends Post {}

interface BeachPanelProps {
  beach: Beach;
  topPost?: Post; // Estes continuarão vindo do mockdata.ts, como props
  topComment?: Comment; // Estes continuarão vindo do mockdata.ts, como props
  recentComments: Comment[]; // Estes continuarão vindo do mockdata.ts, como props
  weatherForecasts: WeatherForecast[]; // Estes continuarão vindo do mockdata.ts, como props
  onClose: () => void;
}

// --- DADOS MOCKADOS PARA REGISTROS (DENTRO DO COMPONENTE) ---
// Perfeito para uma apresentação, pois torna o componente autossuficiente.
const allMockRecordsByBeachId: { [key: string]: SessionRecord[] } = {
  'beach-1': [ // Corresponde ao id da Praia do Futuro
    {
      id: uuidv4(),
      author: 'Medina',
      date: '2025-06-09T08:30:00',
      content: 'Hoje tava dificil viu haha, praia do futuro tem dia que tá com raiva',
      likes: 152,
      locationId: 'beach-1',
      imageUrl: 'https://imagens.ebc.com.br/U6g70x4QG-sLrWqpwzGKwws-he8=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2024/08/05/whatsapp_image_2024-08-05_at_18.37.12.jpeg?itok=Xq-k7mtQ',
    },
    {
      id: uuidv4(),
      author: 'Ermeson Sampaio',
      date: new Date(new Date().setHours(new Date().getHours() - 5)).toISOString(),
      content: 'Simplesmente o mar mais agressivo que já vi, juro que vi até o Medina apanhando',
      likes: 18,
      locationId: 'beach-1',
      imageUrl: 'https://midias.correio24horas.com.br/2023/03/10/-1180792.jpg',
    },
  ],
  'beach-2': [ // Corresponde ao id da Praia de Iracema
    {
      id: uuidv4(),
      author: 'Lucas',
      date: '2025-06-09T16:45:00',
      content: 'Fim de tarde dourado pra lavar a alma e fechar a segunda com chave de ouro. Depois de um banho de mar, a natureza caprichou no espetáculo! #FiltroPraQue',
      likes: 15,
      locationId: 'beach-2',
      imageUrl: 'https://i.imgur.com/6bAvm2k.jpeg',
    },
    {
      id: uuidv4(),
      author: 'Valentim',
      date: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString(),
      content: 'O registro de hoje: um pouco de surf, um pouco de bike. Só pra quebrar o velho costume de que segunda-feira é o pior dia da semana. #euAmoMinhaVida 🤙',
      likes: 9,
      locationId: 'beach-2',
      imageUrl: 'https://i.imgur.com/uvcLQbF.jpeg',
    },
  ],
  'beach-3': [ // Corresponde ao id da Praia do Titanzinho
    {
      id: uuidv4(),
      author: 'João Frango',
      date: '2025-06-09T07:15:00',
      content: 'Hoje o mar pediu calma e a gente obedeceu. Às vezes, a melhor onda é essa, a da tranquilidade. Valeu pela foto Cadu 🌊 #FortalMelhorQueOFrioDeJaneiro',
      likes: 100,
      locationId: 'beach-3',
      imageUrl: 'https://wallpapers.com/images/high/surfing-chicken-joe-water-walk-loac9daktzd4csvb.webp',
    },
  ],
};
// --- FIM DOS DADOS MOCKADOS ---

const BeachPanel: React.FC<BeachPanelProps> = ({
  beach,
  topPost,
  topComment,
  recentComments,
  weatherForecasts,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'weather' | 'registro'>('info');
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [likedPost, setLikedPost] = useState(false);
  const [likedComment, setLikedComment] = useState(false);
  const [likedRecent, setLikedRecent] = useState<Set<string>>(new Set());
  const [commentsState, setCommentsState] = useState<Comment[]>(recentComments);

  // --- LÓGICA PARA REGISTROS USANDO DADOS INTERNOS ---
  const [sessionRecords, setSessionRecords] = useState<SessionRecord[]>([]);
  const [likedRecords, setLikedRecords] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Busca os registros do objeto 'allMockRecordsByBeachId' definido acima
    const recordsForThisBeach = allMockRecordsByBeachId[beach.id] || [];
    setSessionRecords(recordsForThisBeach);
    setLikedRecords(new Set());
  }, [beach.id]);

  // Atualiza os comentários quando a praia muda
  useEffect(() => {
    setCommentsState(recentComments);
  }, [recentComments]);

  const toggleRecordLike = (id: string) => {
    const hasLiked = likedRecords.has(id);
    const updatedRecords = sessionRecords.map(r =>
      r.id === id ? { ...r, likes: r.likes + (hasLiked ? -1 : 1) } : r
    );
    const updatedLiked = new Set(likedRecords);
    if (hasLiked) {
      updatedLiked.delete(id);
    } else {
      updatedLiked.add(id);
    }
    setSessionRecords(updatedRecords);
    setLikedRecords(updatedLiked);
  };
  // --- FIM DA LÓGICA DE REGISTROS ---

  const [newComment, setNewComment] = useState('');

  const togglePostLike = () => {
    if (topPost) {
      // Esta lógica pode precisar de ajuste se os likes forem vir do estado
    }
    setLikedPost(!likedPost);
  };

  const toggleTopCommentLike = () => {
    setLikedComment(!likedComment);
  };

  const toggleRecentCommentLike = (id: string) => {
    const hasLiked = likedRecent.has(id);
    const updated = commentsState.map(c =>
      c.id === id ? { ...c, likes: c.likes + (hasLiked ? -1 : 1) } : c
    );
    const updatedLiked = new Set(likedRecent);
    if (hasLiked) {
      updatedLiked.delete(id);
    } else {
      updatedLiked.add(id);
    }
    setCommentsState(updated);
    setLikedRecent(updatedLiked);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const fresh: Comment = {
      id: uuidv4(),
      author: 'Você',
      content: newComment.trim(),
      date: new Date().toISOString(),
      likes: 0,
      locationId: beach.id,
    };
    setCommentsState([fresh, ...commentsState]);
    setNewComment('');
  };

  return (
    <>
      <div
        className="fixed inset-y-0 right-0 w-full sm:w-96 lg:w-[420px] bg-white shadow-lg transform transition-transform duration-300 overflow-y-auto"
        style={{ zIndex: 1001 }}
      >
        <header className="bg-blue-500 text-white px-6 pt-6 pb-0 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-blue-100 transition-colors" aria-label="Close panel">
            <X size={24} />
          </button>
          <h2 className="font-bold text-2xl">{beach.name}</h2>
          <p className="text-blue-100 mt-2">{beach.description}</p>

          <div className="flex mt-6 -mb-px">
            <button
              className={`px-4 py-3 border-b-4 transition-colors ${
                activeTab === 'info'
                  ? 'border-white text-white font-semibold'
                  : 'border-transparent text-blue-200 hover:text-white'
              }`}
              onClick={() => setActiveTab('info')}
            >
              <MessageSquare size={18} className="inline mr-2" />
              Comunidade
            </button>

            <button
              className={`px-4 py-3 border-b-4 transition-colors ${
                activeTab === 'weather'
                  ? 'border-white text-white font-semibold'
                  : 'border-transparent text-blue-200 hover:text-white'
              }`}
              onClick={() => setActiveTab('weather')}
            >
              <Cloud size={18} className="inline mr-2" />
              Previsão
            </button>

            <button
              className={`px-4 py-3 border-b-4 transition-colors ${
                activeTab === 'registro'
                  ? 'border-white text-white font-semibold'
                  : 'border-transparent text-blue-200 hover:text-white'
              }`}
              onClick={() => setActiveTab('registro')}
            >
              <CalendarPlus size={18} className="inline mr-2" />
              Registros
            </button>
          </div>
        </header>

        <div className="bg-gray-50 p-4">
          {activeTab === 'info' && (
             <div className="space-y-6">

              {topPost && (
                <div className="bg-white border rounded-lg overflow-hidden shadow">
                  <div className="bg-blue-50 p-3 text-blue-800 font-medium flex items-center">
                    <ThumbsUp size={18} className="mr-2" />
                    Registro mais popular
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <User size={20} />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">{topPost.author}</div>
                        <div className="text-sm text-gray-500">{format(new Date(topPost.date), 'dd/MM/yyyy HH:mm')}</div>
                      </div>
                    </div>
                    {topPost.imageUrl && (
                      <img src={topPost.imageUrl} alt="Post" className="mb-3 rounded-lg w-full h-64 object-cover" />
                    )}
                    <p className="text-gray-700">{topPost.content}</p>
                    <button
                      onClick={togglePostLike}
                      className={`mt-3 text-sm font-medium flex items-center transition-colors ${likedPost ? 'text-blue-800' : 'text-blue-600 hover:underline'}`}
                    >
                      <ThumbsUp size={16} className="mr-1" />
                      {topPost.likes + (likedPost ? 1 : 0)} curtidas
                    </button>
                  </div>
                </div>
              )}

              {topComment && (
                <div className="bg-white border rounded-lg overflow-hidden shadow">
                  <div className="bg-amber-50 p-3 text-amber-800 font-medium flex items-center">
                    <MessageCircle size={18} className="mr-2" />
                    Comentário em destaque
                  </div>
                   <div className="p-4">
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mt-1">
                        <User size={16} />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">{topComment.author}</div>
                        <div className="text-sm text-gray-500 mb-1">{format(new Date(topComment.date), 'dd/MM/yyyy HH:mm')}</div>
                        <p className="text-gray-700">{topComment.content}</p>
                        <button
                          onClick={toggleTopCommentLike}
                          className={`mt-2 text-sm font-medium flex items-center transition-colors ${likedComment ? 'text-amber-800' : 'text-amber-600 hover:underline'}`}
                        >
                          <ThumbsUp size={14} className="mr-1" />
                          {topComment.likes + (likedComment ? 1 : 0)} curtidas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white border rounded-lg overflow-hidden shadow">
                <div className="p-3 text-gray-800 font-medium">Comentários mais recentes</div>
                <div className="p-4 border-t">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                      <User size={20} />
                    </div>
                    <textarea
                      className="w-full border rounded-lg p-2 text-sm resize-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Como está o mar agora?"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleAddComment}
                      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                      disabled={!newComment.trim()}
                    >
                      Publicar
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {commentsState.map((comment) => (
                    <div key={comment.id} className="p-4">
                       <div className="flex items-start">
                        <div className="p-2 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mt-1 mr-3">
                          <User size={16} />
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-800">{comment.author}</span>
                            <span className="text-xs text-gray-400">{format(new Date(comment.date), 'HH:mm')}</span>
                          </div>
                          <p className="text-gray-700 mt-1">{comment.content}</p>
                          <button
                            onClick={() => toggleRecentCommentLike(comment.id)}
                            className={`mt-2 text-sm font-medium flex items-center transition-colors ${likedRecent.has(comment.id) ? 'text-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
                          >
                            <ThumbsUp size={14} className="mr-1" />
                            {comment.likes}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'weather' && (
            <WeatherTab forecasts={weatherForecasts} isLoading={false} />
          )}

          {activeTab === 'registro' && (
            <div className="space-y-6">
              <button
                onClick={() => setShowSessionModal(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg flex justify-center items-center transition-colors shadow"
              >
                <CalendarPlus size={20} className="mr-2" />
                Fazer um registro
              </button>

              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Últimos Registros em {beach.name}</h3>

              {sessionRecords.length > 0 ? (
                <div className="space-y-4">
                  {sessionRecords.map((record) => (
                    <div key={record.id} className="bg-white border rounded-lg overflow-hidden shadow">
                      <div className="p-4">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                            <User size={20} />
                          </div>
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">{record.author}</div>
                            <div className="text-sm text-gray-500">{format(new Date(record.date), 'dd/MM/yyyy HH:mm')}</div>
                          </div>
                        </div>
                        {record.imageUrl && (
                          <img src={record.imageUrl} alt={`Registro de ${record.author}`} className="mb-3 rounded-lg w-full h-64 object-cover" />
                        )}
                        <p className="text-gray-700">{record.content}</p>
                        <button
                          onClick={() => toggleRecordLike(record.id)}
                          className={`mt-3 text-sm font-medium flex items-center transition-colors ${
                            likedRecords.has(record.id) ? 'text-blue-800' : 'text-blue-600 hover:underline'
                          }`}
                        >
                          <ThumbsUp size={16} className="mr-1" />
                          {record.likes} curtidas
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white text-center text-gray-500 p-8 rounded-lg border shadow">
                  <CalendarPlus size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-semibold text-gray-600">Nenhum registro encontrado.</p>
                  <p className="text-sm">Seja o primeiro a registrar sua session em {beach.name}!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showSessionModal && (
        <SessionModal
          beach={beach}
          onClose={() => setShowSessionModal(false)}
          onSubmit={(data) => {
            console.log('Session logged:', data);
            const newRecord: SessionRecord = {
              ...data,
              id: uuidv4(),
              author: 'Você', // Ou o nome do usuário logado
              date: new Date().toISOString(),
              likes: 0,
              locationId: beach.id,
            };
            setSessionRecords([newRecord, ...sessionRecords]);
            setShowSessionModal(false);
            setActiveTab('registro');
          }}
        />
      )}
    </>
  );
};

export default BeachPanel;