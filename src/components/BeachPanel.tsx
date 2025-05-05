import React, { useState } from 'react';
import { X, MessageSquare, Cloud, CalendarPlus, MessageCircle, ThumbsUp, User } from 'lucide-react';
import { Beach, Comment, Post, WeatherForecast } from '../types';
import WeatherTab from './WeatherTab';
import { format } from 'date-fns';
import SessionModal from './SessionModal';
import { v4 as uuidv4 } from 'uuid';

interface BeachPanelProps {
  beach: Beach;
  topPost?: Post;
  topComment?: Comment;
  recentComments: Comment[];
  weatherForecasts: WeatherForecast[];
  onClose: () => void;
}

const BeachPanel: React.FC<BeachPanelProps> = ({
  beach,
  topPost,
  topComment,
  recentComments,
  weatherForecasts,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'weather'>('info');
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [likedPost, setLikedPost] = useState(false);
  const [likedComment, setLikedComment] = useState(false);
  const [likedRecent, setLikedRecent] = useState<Set<string>>(new Set());
  const [commentsState, setCommentsState] = useState<Comment[]>([...recentComments]);
  const [newComment, setNewComment] = useState('');

  const togglePostLike = () => {
    if (topPost) {
      topPost.likes += likedPost ? -1 : 1;
      setLikedPost(!likedPost);
    }
  };

  const toggleTopCommentLike = () => {
    if (topComment) {
      topComment.likes += likedComment ? -1 : 1;
      setLikedComment(!likedComment);
    }
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
      author: 'surfista',
      content: newComment.trim(),
      date: new Date().toISOString(),
      likes: 0,
      locationId: beach.id,
    } as Comment;
    setCommentsState([fresh, ...commentsState]);
    setNewComment('');
  };

  return (
    <>
      <div className="fixed inset-y-0 right-0 z-30 w-full sm:w-96 lg:w-[420px] bg-white shadow-lg transform transition-transform duration-300 overflow-y-auto">
        <header className="bg-blue-500 text-white px-6 pt-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-blue-100 transition-colors" aria-label="Close panel">
            <X size={24} />
          </button>
          <h2 className="font-bold text-2xl">{beach.name}</h2>
          <p className="text-blue-100 mt-2">{beach.description}</p>

          <div className="flex mt-6 space-x-3">
            <button
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'info'
                  ? 'bg-white text-blue-600 font-medium'
                  : 'bg-blue-500 text-white'
              }`}
              onClick={() => setActiveTab('info')}
            >
              <MessageSquare size={18} className="inline mr-2" />
              Comunidade
            </button>

            <button
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'weather'
                  ? 'bg-white text-blue-600 font-medium'
                  : 'bg-blue-500 text-white'
              }`}
              onClick={() => setActiveTab('weather')}
            >
              <Cloud size={18} className="inline mr-2" />
              Previsão
            </button>
          </div>
        </header>

        <div className="p-4">
          {activeTab === 'info' ? (
            <div className="space-y-6">
              <button
                onClick={() => setShowSessionModal(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg flex justify-center items-center transition-colors"
              >
                <CalendarPlus size={20} className="mr-2" />
                Faça um registro
              </button>

              {topPost && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-blue-50 p-3 text-blue-800 font-medium flex items-center">
                    <ThumbsUp size={18} className="mr-2" />
                    Registro mais curtido da semana
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
                      {topPost.likes} curtidas
                    </button>
                  </div>
                </div>
              )}

              {topComment && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-amber-50 p-3 text-amber-800 font-medium flex items-center">
                    <MessageCircle size={18} className="mr-2" />
                    Comentário mais curtido da semana
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
                          {topComment.likes} curtidas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 text-gray-800 font-medium">Comentários recentes</div>
                <div className="divide-y">
                  {recentComments.map((comment) => (
                    <div key={comment.id} className="p-4">
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mt-1">
                          <User size={16} />
                        </div>
                        <div className="ml-3 w-full">
                          <div className="font-medium">{comment.author}</div>
                          <div className="text-sm text-gray-500 mb-1">{format(new Date(comment.date), 'dd/MM/yyyy HH:mm')}</div>
                          <p className="text-gray-700">{comment.content}</p>
                          <button
                            onClick={() => toggleRecentCommentLike(comment.id)}
                            className={`mt-2 text-sm font-medium flex items-center transition-colors ${likedRecent.has(comment.id) ? 'text-gray-800' : 'text-gray-600 hover:underline'}`}
                          >
                            <ThumbsUp size={14} className="mr-1" />
                            {comment.likes} curtidas
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t mt-4">
                  <textarea
                    className="w-full border rounded-lg p-2 text-sm resize-none"
                    rows={3}
                    placeholder="Escreva um comentário..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    onClick={handleAddComment}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg"
                  >
                    Comentar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <WeatherTab forecasts={weatherForecasts} isLoading={false} />
          )}
        </div>
      </div>

      {showSessionModal && (
        <SessionModal
          beach={beach}
          onClose={() => setShowSessionModal(false)}
          onSubmit={(data) => {
            console.log('Session logged:', data);
            setShowSessionModal(false);
          }}
        />
      )}
    </>
  );
};

export default BeachPanel;
