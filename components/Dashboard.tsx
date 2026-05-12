import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { UserProgress, SubjectType } from '../types';
import { COURSES } from '../constants';
import { Trophy, Star, Target } from 'lucide-react';

interface DashboardProps {
  userProgress: UserProgress;
  onClose: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userProgress, onClose }) => {
  // Calculate stats
  const totalLessons = COURSES.reduce((acc, course) => 
    acc + course.topics.reduce((tAcc, topic) => tAcc + topic.lessons.length, 0), 0
  );
  
  const completedLessons = Object.values(userProgress.progress).filter((p: any) => p.completed).length;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100) || 0;
  
  // Data for Chart
  const data = COURSES.map(course => {
    const courseLessonIds = course.topics.flatMap(t => t.lessons.map(l => l.id));
    const completed = courseLessonIds.filter(id => userProgress.progress[id]?.completed).length;
    return {
      name: course.id === SubjectType.MATH ? 'Toán' : 'Tiếng Việt',
      completed: completed,
      total: courseLessonIds.length,
      color: course.color.replace('bg-', 'text-').replace('-500', '-500') // rough mapping
    };
  });

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
          <Trophy className="text-yellow-500" size={40} fill="currentColor" />
          Bảng Thành Tích
        </h2>
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-xl font-bold hover:bg-gray-300">
          Quay lại
        </button>
      </div>

      <div id="stats-summary" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-lg border-b-4 border-blue-500 flex flex-col items-center">
            <Target className="text-blue-500 mb-2" size={32} />
            <span className="text-gray-500 text-sm font-bold uppercase">Tiến độ tổng</span>
            <span className="text-4xl font-black text-blue-600">{progressPercent}%</span>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-lg border-b-4 border-green-500 flex flex-col items-center">
            <Star className="text-green-500 mb-2" size={32} fill="currentColor"/>
            <span className="text-gray-500 text-sm font-bold uppercase">Bài đã học</span>
            <span className="text-4xl font-black text-green-600">{completedLessons}/{totalLessons}</span>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-lg border-b-4 border-yellow-500 flex flex-col items-center">
             <Trophy className="text-yellow-500 mb-2" size={32} />
            <span className="text-gray-500 text-sm font-bold uppercase">Huy hiệu</span>
            <span className="text-4xl font-black text-yellow-600">{Math.floor(completedLessons / 5)}</span>
        </div>
      </div>

      <div id="stats-chart" className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6 text-gray-700">Biểu đồ học tập</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{fontSize: 14, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} hide />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
              />
              <Bar dataKey="completed" radius={[10, 10, 0, 0]} barSize={60}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'Toán' ? '#3B82F6' : '#10B981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};