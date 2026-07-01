import React from 'react';
import { CheckCircle, XCircle, Award, BarChart3 } from 'lucide-react';

const ResultCard = ({ result }) => {
  const { resume_name, score, matched_skills, missing_skills, explanation } = result;

  // Determine color based on score
  let scoreColor = 'text-red-400';
  let scoreBg = 'bg-red-400/10 border-red-400/20';
  if (score >= 75) {
    scoreColor = 'text-emerald-400';
    scoreBg = 'bg-emerald-400/10 border-emerald-400/20';
  } else if (score >= 50) {
    scoreColor = 'text-amber-400';
    scoreBg = 'bg-amber-400/10 border-amber-400/20';
  }

  return (
    <div className="glass-panel p-6 hover:border-indigo-500/50 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-slate-700">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="text-indigo-400" />
            {resume_name}
          </h3>
        </div>
        
        <div className={`mt-4 md:mt-0 px-4 py-2 rounded-xl border flex items-center gap-2 ${scoreBg}`}>
          <BarChart3 className={scoreColor} size={20} />
          <span className={`text-2xl font-black tracking-tight ${scoreColor}`}>
            {score}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-400 mb-3 uppercase tracking-wider">
            <CheckCircle size={16} /> Matched Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {matched_skills.length > 0 ? (
              matched_skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium border border-emerald-500/30">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-slate-500 text-sm italic">No specific skills matched.</span>
            )}
          </div>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-red-400 mb-3 uppercase tracking-wider">
            <XCircle size={16} /> Missing Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {missing_skills.length > 0 ? (
              missing_skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm font-medium border border-red-500/30">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-slate-500 text-sm italic">None identified.</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">AI Analysis</h4>
        <p className="text-slate-300 leading-relaxed text-sm">
          {explanation}
        </p>
      </div>
    </div>
  );
};

const ResultsDashboard = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="mt-12 w-full max-w-6xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
        Analysis Results
      </h2>
      <div className="space-y-6">
        {results.map((result, idx) => (
          <ResultCard key={idx} result={result} />
        ))}
      </div>
    </div>
  );
};

export default ResultsDashboard;
