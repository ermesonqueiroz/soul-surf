import React, { useState } from 'react';
import { X, MessageSquare, Cloud, CalendarPlus, MessageCircle, ThumbsUp, Instagram, User } from 'lucide-react';
import { Beach, Comment, Post, WeatherForecast } from '../types';
import WeatherTab from './WeatherTab';
import { format } from 'date-fns';
import SessionModal from './SessionModal';

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
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'weather'>('info');
  const [showSessionModal, setShowSessionModal] = useState(false);
  
  return (
    <>
      <div className="fixed inset-y-0 right-0 z-30 w-full sm:w-96 lg:w-[420px] bg-white shadow-lg transform transition-transform duration-300 overflow-y-auto">
        <header className="bg-blue-500 text-white px-6 pt-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-blue-100 transition-colors"
            aria-label="Close panel"
          >
            <X size={24} />
          </button>
          
          <h2 className="font-bold text-2xl">{beach.name}</h2>
          <p className="text-blue-100 mt-2">{beach.description}</p>
          
          <div className="flex mt-4 space-x-2">
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
              Dificuldade: {'★'.repeat(beach.difficulty)}
            </div>
          </div>
          
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
                Log a Surf Session
              </button>
              
              {topPost && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-blue-50 p-3 text-blue-800 font-medium flex items-center">
                    <ThumbsUp size={18} className="mr-2" />
                    Most Liked Post This Week
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <User size={20} />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">{topPost.author}</div>
                        <div className="text-sm text-gray-500">
                          {format(new Date(topPost.date), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                    
                    {topPost.imageUrl && (
                      <div className="mb-3 rounded-lg overflow-hidden">
                        <img
                          src={topPost.imageUrl}
                          alt="Post"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}
                    
                    <p className="text-gray-700">{topPost.content}</p>
                    
                    <div className="mt-3 text-sm text-blue-600 font-medium flex items-center">
                      <ThumbsUp size={16} className="mr-1" />
                      {topPost.likes} likes
                    </div>
                  </div>
                </div>
              )}
              
              {topComment && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-amber-50 p-3 text-amber-800 font-medium flex items-center">
                    <MessageCircle size={18} className="mr-2" />
                    Most Relevant Comment
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mt-1">
                        <User size={16} />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">{topComment.author}</div>
                        <div className="text-sm text-gray-500 mb-1">
                          {format(new Date(topComment.date), 'MMM d, yyyy')}
                        </div>
                        <p className="text-gray-700">{topComment.content}</p>
                        
                        <div className="mt-2 text-sm text-amber-600 font-medium flex items-center">
                          <ThumbsUp size={14} className="mr-1" />
                          {topComment.likes} likes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 text-gray-800 font-medium">
                  Recent Comments
                </div>
                
                <div className="divide-y">
                  {recentComments.map((comment) => (
                    <div key={comment.id} className="p-4">
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mt-1">
                          <User size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{comment.author}</div>
                          <div className="text-sm text-gray-500 mb-1">
                            {format(new Date(comment.date), 'MMM d, yyyy')}
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                          
                          <div className="mt-2 text-sm text-gray-500 flex items-center">
                            <ThumbsUp size={14} className="mr-1" />
                            {comment.likes} likes
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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