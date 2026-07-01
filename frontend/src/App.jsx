import React, { useState } from 'react';
import { Loader2, Zap } from 'lucide-react';
import ResumeUpload from './components/ResumeUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import ResultsDashboard from './components/ResultsDashboard';
import { analyzeResumes } from './services/api';

function App() {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Please provide a job description.');
      return;
    }
    if (files.length === 0) {
      setError('Please upload at least one resume.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const data = await analyzeResumes(jobDescription, files);
      setResults(data);
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.detail || err.message || 'An error occurred while analyzing the resumes.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <Zap className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Smart<span className="text-indigo-400">Resume</span> AI
            </h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Perfect Match</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Upload resumes and paste a job description. Our AI will analyze the skills, calculate compatibility scores, and provide instant insights.
          </p>
        </div>

        {/* Input Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="glass-panel p-6 h-full flex flex-col">
            <ResumeUpload files={files} setFiles={setFiles} />
          </div>
          
          <div className="glass-panel p-6 h-[400px]">
            <JobDescriptionInput jobDescription={jobDescription} setJobDescription={setJobDescription} />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8 bg-red-500/10 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl flex items-center gap-3">
            <div className="bg-red-500/20 p-1 rounded-full">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            </div>
            {error}
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="btn-primary text-lg flex items-center gap-3 min-w-[200px] justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Analyzing AI Models...
              </>
            ) : (
              <>
                <Zap className="fill-white" size={20} />
                Analyze Resumes
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {!loading && results.length > 0 && (
          <ResultsDashboard results={results} />
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>Built with FastAPI, React, and TF-IDF Cosine Similarity.</p>
      </footer>
    </div>
  );
}

export default App;
