
import React, { useState } from 'react';
import { SparklesIcon } from './icons/IconComponents';
import { analyzeImage } from '../services/geminiService';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove 'data:image/jpeg;base64,' part
      resolve(result.split(',')[1]);
    };
    reader.onerror = error => reject(error);
  });
};

export const AnalyzeImage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError(null);
      setAnalysisResult(null); // Clear previous results
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file.');
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };


  const handleAnalyzeClick = async () => {
    if (!selectedFile) {
      setError('Please select an image first.');
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    setError(null);

    try {
      const base64Data = await fileToBase64(selectedFile);
      const result = await analyzeImage(base64Data, selectedFile.type);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetState = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Image Analysis</h2>
        {!imagePreview ? (
             <div 
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
                className={`relative border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center cursor-pointer transition-colors ${isDragging ? 'bg-teal-50 border-teal-400' : 'bg-slate-50 hover:bg-slate-100'}`}
             >
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <p className="font-semibold">Drag & drop an image here</p>
                    <p className="text-sm">or click to select a file</p>
                </div>
            </div>
        ) : (
            <div className="space-y-4">
                <div className="relative group">
                    <img src={imagePreview} alt="Selected preview" className="rounded-2xl w-full h-auto max-h-80 object-contain bg-slate-100" />
                    <button onClick={resetState} className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70 transition opacity-0 group-hover:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <button
                    onClick={handleAnalyzeClick}
                    disabled={isLoading}
                    className="w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-2xl hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-wait shadow-lg shadow-slate-800/20 active:scale-95 transform hover:-translate-y-1"
                >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {isLoading ? 'Analyzing Image...' : 'Analyze Image with AI'}
                </button>
            </div>
        )}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {isLoading && (
            <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 text-center text-slate-600 animate-slide-in-up">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-3"></div>
                <p className="font-semibold">Gemini is analyzing your image...</p>
                <p className="text-sm">This may take a moment.</p>
            </div>
        )}

        {analysisResult && (
            <div className="bg-white p-5 rounded-3xl shadow-lg shadow-slate-200/50 space-y-2 animate-slide-in-up">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><SparklesIcon className="w-5 h-5 text-teal-500"/> AI Analysis</h3>
                <div
                    className="prose prose-sm text-slate-600 max-w-none"
                    dangerouslySetInnerHTML={{ __html: analysisResult.replace(/## (.*)/g, '<h4 class="text-teal-600 font-semibold mt-3 mb-1">$1</h4>') }}
                />
            </div>
        )}
    </div>
  );
};
