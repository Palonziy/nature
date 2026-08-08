import React, { useEffect, useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

interface SecurityWrapperProps {
  children: React.ReactNode;
}

export const SecurityWrapper: React.FC<SecurityWrapperProps> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showSecurityNotice = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    // 1. Disable Right Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showSecurityNotice('Aethera® Protected Content — Right-click inspection restricted.');
    };

    // 2. Disable DevTools Hotkeys & Source Inspection
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // F12 key
      if (e.key === 'F12') {
        e.preventDefault();
        showSecurityNotice('Developer tools access is restricted.');
        return;
      }

      // Ctrl/Cmd + Shift + I (Inspect Element)
      if (isCtrlOrCmd && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        showSecurityNotice('Source code inspection is protected.');
        return;
      }

      // Ctrl/Cmd + Shift + J (Console)
      if (isCtrlOrCmd && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        showSecurityNotice('Console inspection is protected.');
        return;
      }

      // Ctrl/Cmd + U (View Source)
      if (isCtrlOrCmd && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        showSecurityNotice('Source view is restricted.');
        return;
      }

      // Ctrl/Cmd + S (Save Page)
      if (isCtrlOrCmd && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        showSecurityNotice('Page saving is restricted.');
        return;
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative min-h-screen select-none">
      {children}

      {/* Security Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-[#1E3A27] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-700/40 animate-fade-rise text-xs font-sans">
          <ShieldAlert size={18} className="text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-emerald-200 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
