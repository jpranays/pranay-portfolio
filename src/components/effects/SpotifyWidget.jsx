import { memo } from "react";
import { motion } from "framer-motion";
import { useSpotifyNowPlaying } from "../../hooks/useSpotifyNowPlaying";

function PlayingBars() {
  return (
    <span className="flex items-end gap-[2px] h-3.5" aria-label="Now playing">
      {[1, 0.55, 0.8].map((peak, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-[#1db954]"
          animate={{ scaleY: [peak, 0.25, peak] }}
          transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
          style={{ height: 14, originY: 1, display: "block" }}
        />
      ))}
    </span>
  );
}

function SpotifyIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 1 1-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.973-.519.781.781 0 0 1 .52-.972c3.633-1.102 8.147-.568 11.233 1.328a.78.78 0 0 1 .257 1.072zm.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156a.935.935 0 1 1-.543-1.79c3.532-1.073 9.404-.866 13.115 1.337a.935.935 0 0 1-.954 1.609z" />
    </svg>
  );
}

function SpotifyWidget() {
  const { loading, data } = useSpotifyNowPlaying();

  if (loading || !data?.title) return null;

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 px-3 py-2 rounded-xl
                 border border-slate-200 dark:border-white/[0.07]
                 bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm
                 hover:border-[#1db954]/40 hover:bg-[#1db954]/[0.04]
                 transition-all duration-200"
      aria-label={`${data.isPlaying ? "Now playing" : "Last played"}: ${data.title} by ${data.artist} on Spotify`}
    >
      {data.albumArt && (
        <img
          src={data.albumArt}
          alt={data.album}
          className="w-8 h-8 rounded-md flex-shrink-0 object-cover"
          loading="lazy"
        />
      )}

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate max-w-[140px] sm:max-w-[180px]">
          {data.title}
        </p>
        <p className="text-[11px] text-slate-400 truncate max-w-[140px] sm:max-w-[180px]">
          {data.artist}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 ml-1">
        {data.isPlaying ? (
          <PlayingBars />
        ) : (
          <span className="text-[10px] text-slate-400 font-mono">last played</span>
        )}
        <SpotifyIcon className="w-4 h-4 text-[#1db954] flex-shrink-0" />
      </div>
    </a>
  );
}

export default memo(SpotifyWidget);
