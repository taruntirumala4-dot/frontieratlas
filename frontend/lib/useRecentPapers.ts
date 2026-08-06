import { useState, useEffect } from 'react';
import type { PaperDetail as PaperDetailType } from "@/lib/papers";

export function useRecentPapers() {
  const [recentPapers, setRecentPapers] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('recent_papers');
      if (stored) {
        setRecentPapers(JSON.parse(stored));
      }
    } catch (error) {
      // If data is corrupted, wipe it
      localStorage.removeItem('recent_papers');
    }
  }, []);

  const addRecentPaper = (paper: PaperDetailType | any) => {
    setRecentPapers((prev) => {
      const id = paper.slug || paper.id;
      // Remove it if it already exists in the history
      const filtered = prev.filter((p) => (p.slug || p.id) !== id);
      
      // 🚨 STRIP DOWN THE OBJECT: Only keep what the Card actually needs
      const lightweightPaper = {
        id: paper.id,
        slug: paper.slug,
        title: paper.title,
        thumbnail: paper.thumbnail || paper.thumbnailUrl, 
        // Only keep the first 3 authors to save space
        authors: (paper.authors || []).slice(0, 3).map((a: any) => ({ name: a.name })),
        githubUrl: paper.githubUrl,
        conference: paper.conferences?.[0]?.name || paper.conference || "",
        citations: paper.citationCount || paper.citations || 0,
      };

      // Add to front, keep exactly 4 items
      const updated = [lightweightPaper, ...filtered].slice(0, 4); 
      
      try {
        localStorage.setItem('recent_papers', JSON.stringify(updated));
      } catch (error) {
        // If storage is completely full for some reason, wipe it clean and save just this one
        console.warn("Storage full, resetting recent papers.");
        localStorage.removeItem('recent_papers');
        localStorage.setItem('recent_papers', JSON.stringify([lightweightPaper]));
      }

      return updated;
    });
  };

  return { recentPapers, addRecentPaper };
}