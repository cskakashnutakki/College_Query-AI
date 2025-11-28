import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { GroundingMetadata } from '../types';

interface GroundingSourcesProps {
  metadata: GroundingMetadata;
}

const GroundingSources: React.FC<GroundingSourcesProps> = ({ metadata }) => {
  if (!metadata || !metadata.groundingChunks || metadata.groundingChunks.length === 0) {
    return null;
  }

  // Filter out chunks that don't have web data
  const sources = metadata.groundingChunks.filter(chunk => chunk.web?.uri && chunk.web?.title);

  if (sources.length === 0) return null;

  return (
    <div className="mt-4 pt-3 border-t border-slate-200">
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
        <Globe size={12} />
        Sources
      </h4>
      <div className="flex flex-wrap gap-2">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.web?.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm"
          >
            <span className="truncate max-w-[150px]">{source.web?.title}</span>
            <ExternalLink size={10} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default GroundingSources;
