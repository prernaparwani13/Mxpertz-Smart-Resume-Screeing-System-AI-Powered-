import React from 'react';
import { Briefcase } from 'lucide-react';

const JobDescriptionInput = ({ jobDescription, setJobDescription }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Briefcase className="text-indigo-400" />
        Job Description
      </h2>
      <div className="flex-grow">
        <textarea
          className="w-full h-full min-h-[250px] bg-slate-800/80 border border-slate-600 rounded-xl p-4 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none shadow-inner"
          placeholder="Paste the Job Description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        ></textarea>
      </div>
    </div>
  );
};

export default JobDescriptionInput;
