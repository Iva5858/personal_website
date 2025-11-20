'use client';

import { useState, useRef, useEffect } from 'react';

export default function DigitRecognitionDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size - responsive to container
    const size = Math.min(300, window.innerWidth * 0.35);
    canvas.width = size;
    canvas.height = size;

    // Set drawing styles
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    setHasDrawing(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
  };

  return (
    <div className="h-full bg-white dark:bg-black p-3 md:p-4 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-center text-gray-900 dark:text-gray-100">
          Try it out
        </h1>
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Top Row: Canvas and Square Image */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-3 md:mb-4 flex-[0.48] min-h-0">
            {/* Left Side: Drawable Canvas */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 md:p-5 shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center h-full overflow-hidden">
              <h2 className="text-lg md:text-xl font-bold mb-3 text-center text-gray-900 dark:text-gray-100">
                Draw a Digit (0-9)
              </h2>
              <div className="flex flex-col items-center gap-3 w-full h-full flex-1 min-h-0">
                <canvas
                  ref={canvasRef}
                  className="border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white cursor-crosshair touch-none"
                  style={{ maxWidth: '100%', maxHeight: '100%', aspectRatio: '1', width: 'auto', height: 'auto' }}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={clearCanvas}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm font-semibold"
                  >
                    Clear Canvas
                  </button>
                  <button
                    onClick={() => {
                      // API call will be implemented here
                      console.log('Send image to API');
                    }}
                    disabled={!hasDrawing}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
                  >
                    Send Image
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Square Image Placeholder */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 md:p-5 shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center h-full overflow-hidden">
              <h2 className="text-lg md:text-xl font-bold mb-3 text-center text-gray-900 dark:text-gray-100">
                Recognition Result
              </h2>
              <div className="flex flex-col items-center justify-center w-full h-full flex-1 min-h-0">
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                  <div className="text-center p-4">
                    <svg
                      className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Image will appear here
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">
                      (To be implemented)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Rectangular Image Placeholder */}
          <div className="flex-[0.48] min-h-0">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 md:p-5 shadow-lg border border-gray-200 dark:border-gray-800 h-full flex flex-col">
              <h2 className="text-lg md:text-xl font-bold mb-3 text-center text-gray-900 dark:text-gray-100">
                Additional Analysis
              </h2>
              <div className="flex-1 flex items-center justify-center min-h-0">
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                  <div className="text-center p-4">
                    <svg
                      className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Image will appear here
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">
                      (To be implemented)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

