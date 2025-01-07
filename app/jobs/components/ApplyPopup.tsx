import { useState } from 'react';
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa';

interface ApplyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  jobDetails: {
    title: string;
    company: string;
    location: string;
    type: string;
  };
}

export default function ApplyPopup({ isOpen, onClose, jobDetails }: ApplyPopupProps) {
  const [message, setMessage] = useState('');
  const [resume, setResume] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ message, resume });
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Apply for this position</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Job Details */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-xl text-gray-900 mb-2">{jobDetails.title}</h3>
          <p className="text-gray-600">{jobDetails.company}</p>
          <div className="mt-2 text-sm text-gray-500">
            <span>{jobDetails.location}</span>
            <span className="mx-2">•</span>
            <span>{jobDetails.type}</span>
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Message */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message to hiring manager
            </label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce yourself and explain why you'd be great for this role..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-400 focus:outline-none resize-none"
              required
            />
          </div>

          {/* Resume Upload */}
          <div className="mb-6">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
              Resume
            </label>
            <div className="relative">
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <label
                htmlFor="resume"
                className={`w-full px-4 py-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors
                  ${resume ? 'border-[#ec008c] bg-pink-50' : 'border-gray-300 hover:border-gray-400'}`}
              >
                <FaCloudUploadAlt className={`w-8 h-8 mb-2 ${resume ? 'text-[#ec008c]' : 'text-gray-400'}`} />
                {resume ? (
                  <span className="text-[#ec008c] font-medium">{resume.name}</span>
                ) : (
                  <>
                    <span className="text-gray-600 font-medium">Drop your resume here or click to upload</span>
                    <span className="text-gray-500 text-sm mt-1">PDF, DOC, DOCX (Max 5MB)</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 