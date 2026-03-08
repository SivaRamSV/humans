// ========================================
// SHARE BUTTONS COMPONENT
// Social sharing for viral potential
// ========================================

import { motion } from 'framer-motion';

export function ShareButtons() {
  const shareUrl = 'https://sivaramsv.github.io/humans/';
  const shareTitle = 'Humans appear in the final seconds of the universe';

  const shareLinks = [
    {
      name: 'Twitter',
      icon: '𝕏',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      color: '#000',
      hoverColor: '#1da1f2',
    },
    {
      name: 'Hacker News',
      icon: 'Y',
      url: `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(shareUrl)}&t=${encodeURIComponent(shareTitle)}`,
      color: '#ff6600',
      hoverColor: '#ff8533',
    },
    {
      name: 'Reddit',
      icon: '⬆',
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
      color: '#ff4500',
      hoverColor: '#ff5722',
    },
    {
      name: 'LinkedIn',
      icon: 'in',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: '#0077b5',
      hoverColor: '#00a0dc',
    },
  ];

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <motion.div
      className="fixed top-6 right-6 z-50"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '8px',
        }}
      >
        <div className="text-[8px] text-white/40 font-mono tracking-wider mb-2 text-center">
          SHARE
        </div>
        <div className="flex gap-2">
          {shareLinks.map((link) => (
            <motion.button
              key={link.name}
              onClick={() => handleShare(link.url)}
              className="w-8 h-8 flex items-center justify-center text-sm font-bold"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${link.color}50`,
                color: link.color,
              }}
              whileHover={{
                background: `${link.color}30`,
                borderColor: link.hoverColor,
                scale: 1.1,
              }}
              whileTap={{ scale: 0.95 }}
              title={`Share on ${link.name}`}
            >
              {link.icon}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ShareButtons;
