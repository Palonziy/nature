import React, { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

export const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isResettingRef = useRef<boolean>(false);

  useEffect(() => {
    let animFrameId: number;

    const checkVideoFade = () => {
      const video = videoRef.current;

      if (video && !video.paused && video.duration && !isResettingRef.current) {
        const currentTime = video.currentTime;
        const duration = video.duration;

        let calculatedOpacity = 1;

        // Fade in over 0.5s at the start (opacity 0 to 1)
        if (currentTime < 0.5) {
          calculatedOpacity = Math.max(0, Math.min(1, currentTime / 0.5));
        }
        // Fade out over 0.5s before the end (opacity 1 to 0)
        else if (duration - currentTime < 0.5) {
          calculatedOpacity = Math.max(0, Math.min(1, (duration - currentTime) / 0.5));
        } else {
          calculatedOpacity = 1;
        }

        video.style.opacity = calculatedOpacity.toString();
      }

      animFrameId = requestAnimationFrame(checkVideoFade);
    };

    animFrameId = requestAnimationFrame(checkVideoFade);

    return () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, []);

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    isResettingRef.current = true;
    video.style.opacity = '0';

    // Wait 100ms, reset currentTime = 0, then play() again
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        isResettingRef.current = false;
        videoRef.current.play().catch((err) => {
          console.warn('Autoplay exception on video loop reset:', err);
        });
      }
    }, 100);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="w-full h-full object-cover object-center transition-opacity duration-75 ease-linear"
        style={{ opacity: 0 }}
      />
      {/* Light top contrast vignette & smooth bottom edge blend into linen background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#FDFBF7] pointer-events-none" />
    </div>
  );
};
