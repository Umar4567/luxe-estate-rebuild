import { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, DownloadCloud, Upload, X } from 'lucide-react';


interface Amenity {
  id: number;
  name: string;
  x: number;
  y: number;
  color: string;
}

const MasterPlan = () => {
  const [zoom, setZoom] = useState(100);
  const [hoveredAmenity, setHoveredAmenity] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const amenities: Amenity[] = [
    { id: 1, name: 'Entry Portal', x: 15, y: 20, color: 'bg-yellow-300' },
    { id: 2, name: 'Four Grove', x: 20, y: 25, color: 'bg-yellow-300' },
    { id: 3, name: 'Driveway', x: 18, y: 35, color: 'bg-yellow-300' },
    { id: 4, name: 'Arrival Court', x: 22, y: 40, color: 'bg-yellow-300' },
    { id: 5, name: 'Visitor Car Parking', x: 50, y: 15, color: 'bg-yellow-300' },
    { id: 6, name: 'Central Plaza', x: 55, y: 25, color: 'bg-yellow-300' },
    { id: 7, name: 'Tiny Tote Haven', x: 45, y: 35, color: 'bg-yellow-300' },
    { id: 8, name: 'Tot Lot', x: 52, y: 42, color: 'bg-yellow-300' },
    { id: 9, name: 'Kids Play', x: 65, y: 20, color: 'bg-yellow-300' },
    { id: 10, name: 'Stepped Seating Plaza', x: 70, y: 28, color: 'bg-yellow-300' },
    { id: 11, name: 'Kids Plaza', x: 68, y: 38, color: 'bg-yellow-300' },
    { id: 12, name: 'Skating Plaza', x: 72, y: 45, color: 'bg-yellow-300' },
    { id: 13, name: 'Sensory Garden', x: 78, y: 18, color: 'bg-yellow-300' },
    { id: 14, name: 'Basketball Court', x: 82, y: 30, color: 'bg-yellow-300' },
    { id: 15, name: 'Pickleball Court', x: 85, y: 40, color: 'bg-yellow-300' },
    { id: 16, name: 'Outdoor Gym', x: 80, y: 50, color: 'bg-yellow-300' },
    { id: 17, name: 'Fire Gateway', x: 85, y: 55, color: 'bg-yellow-300' },
    { id: 18, name: 'Seniors Plaza', x: 75, y: 60, color: 'bg-yellow-300' },
    { id: 19, name: 'Trail', x: 70, y: 65, color: 'bg-yellow-300' },
    { id: 20, name: 'Tree Grove', x: 88, y: 65, color: 'bg-yellow-300' },
    { id: 21, name: 'Pet Park', x: 92, y: 70, color: 'bg-yellow-300' },
    { id: 22, name: 'Multi-Play Court', x: 82, y: 75, color: 'bg-yellow-300' },
  ];

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom((prev) => {
      const newZoom = direction === 'in' ? prev + 20 : prev - 20;
      return Math.max(50, Math.min(200, newZoom));
    });
  };

  const handleDownload = () => {
    // kept for backward compatibility
    handleDownloadPDF();
  };

  const planRef = useRef<HTMLDivElement | null>(null);

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadSVG = () => {
    try {
      const svg = planRef.current?.querySelector('svg');
      if (!svg) {
        alert('No SVG found to download.');
        return;
      }
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg as SVGSVGElement);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      downloadBlob(blob, 'master-plan.svg');
    } catch (err) {
      console.error(err);
      alert('Failed to export SVG.');
    }
  };

  const downloadUploadedImage = () => {
    if (!uploadedImage) {
      alert('No uploaded image available.');
      return;
    }
    // uploadedImage is a data URL
    const a = document.createElement('a');
    a.href = uploadedImage;
    a.download = 'uploaded-master-plan.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDownloadPDF = async () => {
    if (!planRef.current) {
      alert('Master plan not ready for export.');
      return;
    }

    try {
      const [{ default: html2canvas }, jspdfModule] = await Promise.all([
        import('html2canvas'),
        import('jspdf')
      ]);
      const svg = planRef.current.querySelector('svg');
      if (!svg) {
        alert('No SVG found to export.');
        return;
      }
      // Render SVG to canvas
      const canvas = await html2canvas(svg as unknown as HTMLElement, { backgroundColor: null });
      const imgData = canvas.toDataURL('image/png');
      const jsPDFConstructor = (jspdfModule.jsPDF || jspdfModule.default);
      const pdf = new jsPDFConstructor({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('master-plan.pdf');
    } catch (err: unknown) {
      console.error('PDF export failed', err);
      alert('PDF export requires `html2canvas` and `jspdf` packages. Run: npm install html2canvas jspdf');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setUploadedImage(imageData);
        setShowUploadModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => handleZoom('out')}
            className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <div className="bg-gray-200 rounded-lg px-4 py-2 text-sm font-semibold min-w-20 text-center">
            {zoom}%
          </div>
          <button
            onClick={() => handleZoom('in')}
            className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Plan
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <DownloadCloud className="w-4 h-4" />
            Download Master Plan (PDF)
          </button>
          <button
            onClick={() => {
              // download SVG and uploaded image if available
              downloadSVG();
              if (uploadedImage) downloadUploadedImage();
            }}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <DownloadCloud className="w-4 h-4" />
            Download Files
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-3 text-gray-800">Amenities Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {amenities.slice(0, 22).map((amenity) => (
            <div
              key={amenity.id}
              className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
              onMouseEnter={() => setHoveredAmenity(amenity.id)}
              onMouseLeave={() => setHoveredAmenity(null)}
            >
              <span className="bg-yellow-300 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {amenity.id}
              </span>
              <span className="text-gray-700 truncate">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Master Plan Canvas */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 rounded-lg shadow-xl overflow-hidden border-2 border-green-200">
        <div ref={planRef} className="relative w-full h-96 md:h-[600px] overflow-auto bg-white">
          {uploadedImage ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={uploadedImage}
                alt="Master Plan"
                className="w-full h-full object-contain"
                style={{ transform: `scale(${zoom / 100})` }}
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
                aria-label="Remove image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 800"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
              preserveAspectRatio="xMidYMid meet"
            >
            {/* Background - Green landscape */}
            <rect width="1000" height="800" fill="#e0f2f1" />
            <ellipse cx="150" cy="300" rx="120" ry="180" fill="#7cb342" opacity="0.6" />
            <ellipse cx="850" cy="600" rx="100" ry="150" fill="#7cb342" opacity="0.6" />

            {/* Main residential towers - White rectangles */}
            <rect x="250" y="150" width="200" height="100" fill="#f5f5f5" stroke="#999" strokeWidth="2" />
            <text x="350" y="210" textAnchor="middle" fontSize="14" fontWeight="bold">
              Tower A
            </text>

            <rect x="550" y="150" width="180" height="100" fill="#f5f5f5" stroke="#999" strokeWidth="2" />
            <text x="640" y="210" textAnchor="middle" fontSize="14" fontWeight="bold">
              Tower B
            </text>

            <rect x="300" y="350" width="180" height="100" fill="#f5f5f5" stroke="#999" strokeWidth="2" />
            <text x="390" y="410" textAnchor="middle" fontSize="14" fontWeight="bold">
              Tower C
            </text>

            <rect x="600" y="350" width="200" height="100" fill="#f5f5f5" stroke="#999" strokeWidth="2" />
            <text x="700" y="410" textAnchor="middle" fontSize="14" fontWeight="bold">
              Tower D
            </text>

            {/* Central Plaza - Orange circular area */}
            <circle cx="450" cy="280" r="60" fill="#ff9800" opacity="0.7" />
            <text x="450" y="290" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
              Central Plaza
            </text>

            {/* Roads - Gray lines */}
            <line x1="100" y1="200" x2="900" y2="200" stroke="#999" strokeWidth="8" />
            <line x1="100" y1="400" x2="900" y2="400" stroke="#999" strokeWidth="8" />
            <line x1="300" y1="50" x2="300" y2="750" stroke="#999" strokeWidth="8" />
            <line x1="700" y1="50" x2="700" y2="750" stroke="#999" strokeWidth="8" />

            {/* Amenity Markers */}
            {amenities.map((amenity) => (
              <g
                key={amenity.id}
                onMouseEnter={() => setHoveredAmenity(amenity.id)}
                onMouseLeave={() => setHoveredAmenity(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={amenity.x * 10}
                  cy={amenity.y * 10}
                  r={hoveredAmenity === amenity.id ? 25 : 20}
                  fill="#facc15"
                  stroke="#d97706"
                  strokeWidth="2"
                  style={{ transition: 'r 0.2s ease' }}
                />
                <text
                  x={amenity.x * 10}
                  y={amenity.y * 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#333"
                >
                  {amenity.id}
                </text>

                {/* Tooltip */}
                {hoveredAmenity === amenity.id && (
                  <g>
                    <rect
                      x={amenity.x * 10 - 50}
                      y={amenity.y * 10 - 40}
                      width="100"
                      height="30"
                      fill="#333"
                      rx="4"
                    />
                    <text
                      x={amenity.x * 10}
                      y={amenity.y * 10 - 18}
                      textAnchor="middle"
                      fontSize="10"
                      fill="white"
                      fontWeight="bold"
                    >
                      {amenity.name}
                    </text>
                  </g>
                )}
              </g>
            ))}

            {/* North Arrow */}
            <g transform="translate(900, 100)">
              <circle cx="0" cy="0" r="20" fill="#f5f5f5" stroke="#999" strokeWidth="1" />
              <line x1="0" y1="-15" x2="0" y2="15" stroke="#d32f2f" strokeWidth="2" />
              <polygon points="0,-15 -5,-5 5,-5" fill="#d32f2f" />
              <text x="0" y="35" textAnchor="middle" fontSize="12" fontWeight="bold">
                N
              </text>
            </g>
            </svg>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>📋 Master Plan Information:</strong> This interactive master plan showcases the complete community layout with
          residential towers, amenities, parking, and recreational facilities. Hover over numbered points to see amenity details.
          The layout is subject to change as per developer discretion. For detailed specifications, please download the full
          master plan PDF or contact our sales team.
        </p>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Upload Master Plan</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer group">
                <label className="cursor-pointer block">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-10 h-10 text-blue-500 group-hover:text-blue-600" />
                    <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                      Click to upload Master Plan image
                    </span>
                    <span className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="text-xs text-gray-600 text-center">
                The uploaded image will replace the default SVG master plan visualization.
              </p>
            </div>

            <button
              onClick={() => setShowUploadModal(false)}
              className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterPlan;
