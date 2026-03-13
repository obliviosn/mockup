import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { Upload, Download, Layout, Image as ImageIcon } from 'lucide-react';

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [padding, setPadding] = useState(64);
  const [borderRadius, setBorderRadius] = useState(16);
  const [shadow, setShadow] = useState('shadow-2xl');
  const [background, setBackground] = useState('bg-gradient-to-br from-purple-500 to-indigo-600');
  const [frameStyle, setFrameStyle] = useState('macos'); // none, macos, windows, iphone, ipad, mac

  const previewRef = useRef<HTMLDivElement>(null);
  
  const isDeviceFrame = ['iphone', 'ipad', 'mac'].includes(frameStyle);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await toPng(previewRef.current, { 
          cacheBust: true,
          pixelRatio: 2, // Higher quality export
        });
        download(dataUrl, 'mockup.png');
      } catch (err) {
        console.error('Failed to generate image', err);
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans text-gray-900">
      {/* Sidebar - 20% width */}
      <div className="w-[20%] min-w-[280px] h-full bg-white border-r border-gray-200 p-6 overflow-y-auto flex flex-col gap-8 shadow-sm z-20">
        <h1 className="text-xl font-bold flex items-center gap-2 text-indigo-600">
          <Layout className="w-6 h-6" />
          Mockup Studio
        </h1>

        {/* Upload */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Image</label>
          <label className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-gray-50 border-2 border-gray-300 border-dashed rounded-xl appearance-none cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 focus:outline-none">
            <Upload className="w-6 h-6 text-gray-400 mb-2" />
            <span className="font-medium text-gray-600 text-sm text-center">
              {image ? 'Change Image' : 'Click or drop image'}
            </span>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>

        {/* Padding */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex justify-between">
            <span>Padding</span>
            <span className="text-indigo-600">{padding}px</span>
          </label>
          <input 
            type="range" 
            min="0" 
            max="128" 
            value={padding} 
            onChange={(e) => setPadding(Number(e.target.value))} 
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
          />
        </div>

        {/* Border Radius */}
        {!isDeviceFrame && (
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex justify-between">
              <span>Border Radius</span>
              <span className="text-indigo-600">{borderRadius}px</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="48" 
              value={borderRadius} 
              onChange={(e) => setBorderRadius(Number(e.target.value))} 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
            />
          </div>
        )}

        {/* Shadow */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Shadow</label>
          <select 
            value={shadow} 
            onChange={(e) => setShadow(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none"
          >
            <option value="shadow-none">None</option>
            <option value="shadow-sm">Small</option>
            <option value="shadow-md">Medium</option>
            <option value="shadow-lg">Large</option>
            <option value="shadow-xl">Extra Large</option>
            <option value="shadow-2xl">2XL</option>
          </select>
        </div>

        {/* Frame Style */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Frame Style</label>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setFrameStyle('none')} 
              className={`py-2 text-sm font-medium rounded-lg border transition-colors ${frameStyle === 'none' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              None
            </button>
            <button 
              onClick={() => setFrameStyle('macos')} 
              className={`py-2 text-sm font-medium rounded-lg border transition-colors ${frameStyle === 'macos' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              macOS
            </button>
            <button 
              onClick={() => setFrameStyle('windows')} 
              className={`py-2 text-sm font-medium rounded-lg border transition-colors ${frameStyle === 'windows' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              Windows
            </button>
            <button 
              onClick={() => setFrameStyle('iphone')} 
              className={`py-2 text-sm font-medium rounded-lg border transition-colors ${frameStyle === 'iphone' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              iPhone
            </button>
            <button 
              onClick={() => setFrameStyle('ipad')} 
              className={`py-2 text-sm font-medium rounded-lg border transition-colors ${frameStyle === 'ipad' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              iPad
            </button>
            <button 
              onClick={() => setFrameStyle('mac')} 
              className={`py-2 text-sm font-medium rounded-lg border transition-colors ${frameStyle === 'mac' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              MacBook
            </button>
          </div>
        </div>

        {/* Background */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Background</label>
          <div className="grid grid-cols-4 gap-3">
            {[
              'bg-gradient-to-br from-purple-500 to-indigo-600',
              'bg-gradient-to-br from-pink-500 to-orange-400',
              'bg-gradient-to-br from-teal-400 to-emerald-500',
              'bg-gradient-to-br from-cyan-500 to-blue-500',
              'bg-gradient-to-br from-gray-800 to-gray-900',
              'bg-white',
              'bg-gray-100',
              'bg-transparent'
            ].map((bg) => (
              <button
                key={bg}
                onClick={() => setBackground(bg)}
                className={`w-full aspect-square rounded-lg border-2 transition-all ${background === bg ? 'border-indigo-600 scale-110 shadow-md' : 'border-transparent hover:scale-105'} ${bg} shadow-sm relative overflow-hidden`}
                title={bg}
              >
                {bg === 'bg-transparent' && (
                  <div className="absolute inset-0" style={{ backgroundImage: 'conic-gradient(#e5e7eb 25%, white 25%, white 50%, #e5e7eb 50%, #e5e7eb 75%, white 75%, white)', backgroundSize: '10px 10px' }} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-200">
          <button
            onClick={handleDownload}
            disabled={!image}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
          >
            <Download className="w-5 h-5" />
            Export Mockup
          </button>
        </div>
      </div>

      {/* Preview Area - 80% width */}
      <div className="w-[80%] h-full bg-gray-100 flex items-center justify-center p-12 overflow-auto relative">
        {/* Checkerboard background for transparent backgrounds */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'conic-gradient(#000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '24px 24px' }} />
        
        <div className="relative z-10 max-w-full max-h-full flex items-center justify-center">
          {image ? (
            <div
              ref={previewRef}
              className={`transition-all duration-300 ease-in-out flex items-center justify-center ${background}`}
              style={{ padding: `${padding}px` }}
            >
              {!isDeviceFrame ? (
                <div
                  className={`overflow-hidden bg-white ${shadow} flex flex-col transition-all duration-300`}
                  style={{ borderRadius: `${borderRadius}px` }}
                >
                  {frameStyle === 'macos' && (
                    <div className="h-10 bg-[#f6f6f6] border-b border-gray-200 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                    </div>
                  )}
                  {frameStyle === 'windows' && (
                    <div className="h-10 bg-white border-b border-gray-200 flex items-center justify-end px-4 gap-4">
                      <div className="w-3 h-[1px] bg-gray-600"></div>
                      <div className="w-3 h-3 border border-gray-600"></div>
                      <div className="w-3 h-3 relative flex items-center justify-center">
                        <div className="w-3 h-[1px] bg-gray-600 rotate-45 absolute"></div>
                        <div className="w-3 h-[1px] bg-gray-600 -rotate-45 absolute"></div>
                      </div>
                    </div>
                  )}
                  <img src={image} alt="Mockup" className="max-w-full max-h-[70vh] object-contain block" />
                </div>
              ) : (
                <>
                  {frameStyle === 'iphone' && (
                    <div className={`relative bg-gray-900 p-3 sm:p-4 rounded-[3rem] ${shadow} transition-all duration-300`}>
                      {/* Dynamic Island / Notch */}
                      <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-1/3 max-w-[120px] h-6 bg-gray-900 rounded-b-3xl z-20"></div>
                      <div className="relative overflow-hidden rounded-[2.25rem] bg-white">
                        <img src={image} alt="iPhone Mockup" className="max-w-full max-h-[70vh] object-contain block" />
                      </div>
                    </div>
                  )}
                  {frameStyle === 'ipad' && (
                    <div className={`relative bg-gray-900 p-4 sm:p-6 rounded-[2rem] ${shadow} transition-all duration-300`}>
                      {/* Camera */}
                      <div className="absolute top-1/2 left-2 sm:left-3 -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full z-20"></div>
                      <div className="relative overflow-hidden rounded-[1.25rem] bg-white">
                        <img src={image} alt="iPad Mockup" className="max-w-full max-h-[70vh] object-contain block" />
                      </div>
                    </div>
                  )}
                  {frameStyle === 'mac' && (
                    <div className={`relative flex flex-col items-center ${shadow} transition-all duration-300`}>
                      <div className="relative bg-gray-900 p-3 pb-8 rounded-t-2xl rounded-b-sm w-full">
                        {/* Camera */}
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-800 rounded-full z-20"></div>
                        <div className="relative overflow-hidden bg-white rounded-sm">
                          <img src={image} alt="Mac Mockup" className="max-w-full max-h-[70vh] object-contain block" />
                        </div>
                        {/* Logo space */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 font-bold tracking-widest">MacBook Pro</div>
                      </div>
                      {/* Base */}
                      <div className="w-[115%] h-4 bg-gray-300 rounded-t-sm rounded-b-xl relative shadow-md">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/6 h-1.5 bg-gray-400 rounded-b-md"></div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400 flex flex-col items-center gap-4 bg-white/50 p-12 rounded-3xl border border-gray-200 border-dashed backdrop-blur-sm">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <ImageIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700">No Image Selected</h2>
              <p className="text-gray-500 max-w-sm">Upload a screenshot from the sidebar to start generating your beautiful mockup.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
