export interface VenipunctureDemo {
  id: string;
  demoNumber: string;
  title: string;
  shortTitle: string;
  filename: string;
  description: string;
  category: 'Medical AI' | 'VR Experience' | 'Test Mode' | 'Training Mode';
  badgeStyle: {
    bg: string;
    text: string;
    border: string;
    glow: string;
  };
  driveFileId: string;
  embedUrl: string;
  directDriveUrl: string;
  fileSize: string;
  format: 'MOV' | 'MP4';
  availabilityStatus: 'verified' | 'requires_auth';
  keyHighlights: string[];
}

export const VENIPUNCTURE_FOLDER_SOURCE = {
  url: 'https://drive.google.com/drive/folders/1QKQjTEhglhceLNXSP659OIIYJv5zLr-E?usp=sharing',
  folderId: '1QKQjTEhglhceLNXSP659OIIYJv5zLr-E',
  title: 'Venipunchur T&T Google Drive Repository',
  totalFiles: 5,
  totalSizeApprox: '791 MB',
};

export const VENIPUNCTURE_DEMOS: VenipunctureDemo[] = [
  {
    id: 'demo-01-medical-ai',
    demoNumber: 'Demo 01',
    title: 'Medical AI Assistant',
    shortTitle: 'Medical AI Assistant',
    filename: 'Medical_ llm_demo.mov',
    description:
      'Demonstration of the medical language-model component and AI-assisted medical question answering grounded in clinical standards.',
    category: 'Medical AI',
    badgeStyle: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/20',
    },
    driveFileId: '1e-FHVrl8yPM0FLprSQB5PGm-cP9oIBOn',
    embedUrl: 'https://drive.google.com/file/d/1e-FHVrl8yPM0FLprSQB5PGm-cP9oIBOn/preview',
    directDriveUrl: 'https://drive.google.com/file/d/1e-FHVrl8yPM0FLprSQB5PGm-cP9oIBOn/view?usp=sharing',
    fileSize: '46.2 MB',
    format: 'MOV',
    availabilityStatus: 'verified',
    keyHighlights: [
      'Custom MedicalTransformerLM inference',
      'Clinical question answering & knowledge grounding',
      'Zero hallucination verification against medical protocols',
    ],
  },
  {
    id: 'demo-02-vr-web-walkthrough',
    demoNumber: 'Demo 02',
    title: 'Medical VR Web Demo',
    shortTitle: 'Medical VR Web Walkthrough',
    filename: 'Medical_VR_web_demo.mov',
    description:
      'Comprehensive walkthrough of the medical VR project, its virtual clinical room environment, and hands-on phlebotomy training experience.',
    category: 'VR Experience',
    badgeStyle: {
      bg: 'bg-violet-500/10',
      text: 'text-violet-400',
      border: 'border-violet-500/30',
      glow: 'shadow-violet-500/20',
    },
    driveFileId: '1LHKsk5CE26J-j----wyzhhJFx95zEkkN',
    embedUrl: 'https://drive.google.com/file/d/1LHKsk5CE26J-j----wyzhhJFx95zEkkN/preview',
    directDriveUrl: 'https://drive.google.com/file/d/1LHKsk5CE26J-j----wyzhhJFx95zEkkN/view?usp=sharing',
    fileSize: '406.6 MB',
    format: 'MOV',
    availabilityStatus: 'verified',
    keyHighlights: [
      'Full clinical healthcare suite in Unity 3D',
      'Realistic equipment grabbing & two-handed manipulation',
      'End-to-end procedural workflow demonstration',
    ],
  },
  {
    id: 'demo-03-test-scene-console',
    demoNumber: 'Demo 03',
    title: 'Venipuncture Test Scene with Console',
    shortTitle: 'Test Scene with Console Telemetry',
    filename: 'TEST SCENE VENI WITH CONSOLE.mp4',
    description:
      'Demonstration of the venipuncture test scene, including the live visible developer console for real-time inspection of the state machine workflow.',
    category: 'Test Mode',
    badgeStyle: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      glow: 'shadow-amber-500/20',
    },
    driveFileId: '1zWQD5pKK7L9uwzOQmxHvMWi8vSTIh3ur',
    embedUrl: 'https://drive.google.com/file/d/1zWQD5pKK7L9uwzOQmxHvMWi8vSTIh3ur/preview',
    directDriveUrl: 'https://drive.google.com/file/d/1zWQD5pKK7L9uwzOQmxHvMWi8vSTIh3ur/view?usp=sharing',
    fileSize: '77.2 MB',
    format: 'MP4',
    availabilityStatus: 'verified',
    keyHighlights: [
      'Blind assessment mode without visual assist prompts',
      'Active developer console logging state transitions',
      'Procedural error detection & milestone checks',
    ],
  },
  {
    id: 'demo-04-test-scene',
    demoNumber: 'Demo 04',
    title: 'Venipuncture Test Scene',
    shortTitle: 'Venipuncture Assessment Scene',
    filename: 'TEST SCENE VENI.mp4',
    description:
      'Demonstration of the unassisted venipuncture assessment scene, evaluating procedural accuracy, technique execution, and sequential workflow.',
    category: 'Test Mode',
    badgeStyle: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      glow: 'shadow-amber-500/20',
    },
    driveFileId: '1_J_3thKYuFoiE93j1GI5OmFfVxoPXefm',
    embedUrl: 'https://drive.google.com/file/d/1_J_3thKYuFoiE93j1GI5OmFfVxoPXefm/preview',
    directDriveUrl: 'https://drive.google.com/file/d/1_J_3thKYuFoiE93j1GI5OmFfVxoPXefm/view?usp=sharing',
    fileSize: '127.6 MB',
    format: 'MP4',
    availabilityStatus: 'verified',
    keyHighlights: [
      'Objective student evaluation protocol',
      'Insertion angle validation (15°–30° range)',
      'Sharps disposal and patient care checklist verification',
    ],
  },
  {
    id: 'demo-05-training-scene',
    demoNumber: 'Demo 05',
    title: 'Venipuncture Training Scene with Console & Local Services',
    shortTitle: 'Training Scene with Local Services',
    filename: 'TRAINING SCENE WITH CONSOLE AND LOCAL STORAGE.mp4',
    description:
      'Demonstration of the guided training environment, developer console output, and local-service integration for procedural progression and telemetry caching.',
    category: 'Training Mode',
    badgeStyle: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      glow: 'shadow-cyan-500/20',
    },
    driveFileId: '1uaGaZkgWgm6VOjKgNuNhNcz_JySiwsvE',
    embedUrl: 'https://drive.google.com/file/d/1uaGaZkgWgm6VOjKgNuNhNcz_JySiwsvE/preview',
    directDriveUrl: 'https://drive.google.com/file/d/1uaGaZkgWgm6VOjKgNuNhNcz_JySiwsvE/view?usp=sharing',
    fileSize: '133.4 MB',
    format: 'MP4',
    availabilityStatus: 'verified',
    keyHighlights: [
      'Interactive visual step indicators & clinical guidance hints',
      'Local storage telemetry and FastAPI service synchronization',
      'Real-time equipment feedback & vein palpation confirmation',
    ],
  },
];
