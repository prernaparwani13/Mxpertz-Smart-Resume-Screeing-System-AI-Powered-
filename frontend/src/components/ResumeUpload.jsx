import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, X } from 'lucide-react';

const ResumeUpload = ({ files, setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  });

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <UploadCloud className="text-blue-400" />
        Upload Resumes
      </h2>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? 'border-blue-400 bg-blue-400/10'
            : 'border-slate-600 hover:border-slate-400 hover:bg-slate-800/30'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <UploadCloud className="w-12 h-12 text-slate-400" />
          <p className="text-lg text-slate-300">
            {isDragActive
              ? 'Drop the resumes here...'
              : 'Drag & drop resumes here, or click to select'}
          </p>
          <p className="text-sm text-slate-500">Supported formats: PDF, DOCX</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">
            Selected Files ({files.length})
          </h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="text-indigo-400 flex-shrink-0" size={20} />
                  <span className="truncate text-sm text-slate-200">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-slate-700 rounded-md text-slate-400 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
