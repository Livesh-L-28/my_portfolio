export type ProjectCategory =
  | 'All Projects'
  | 'LLM & RAG'
  | 'AI Security'
  | 'Reliability Engineering'
  | 'Machine Learning'
  | 'Computer Vision'
  | 'Developer Infrastructure'
  | 'Full Stack';

export interface ArchitectureNode {
  id: string;
  label: string;
  role: string;
  tech: string;
  description: string;
}

export interface ArchitectureFlow {
  nodes: ArchitectureNode[];
  connections: { from: string; to: string; label?: string }[];
}

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  fullName: string;
  tagline: string;
  category: ProjectCategory;
  categories: (ProjectCategory | string)[];
  featured: boolean;
  technologies: string[];
  keyAchievement: string;
  stats?: { label: string; value: string }[];
  summary: string;
  description: string;

  // Link registry
  links: {
    githubUrl?: string;
    liveUrl?: string;
    pypiUrl?: string;
    publishedPackageName?: string;
    installCommand?: string;
    demoVideoUrl?: string; // Direct video path or iframe embed
    demoVideoType?: 'local' | 'youtube' | 'vimeo' | 'gdrive' | 'embed';
    documentationUrl?: string;
  };

  // Visuals
  thumbnail?: string;
  architectureDiagram?: ArchitectureFlow;

  // Case Study Content
  caseStudy: {
    problemStatement: string;
    engineeringGoals: string[];
    systemArchitecture: string;
    pipelineSteps?: { step: string; title: string; detail: string }[];
    implementationHighlights: string[];
    technicalTradeoffs: { decision: string; rationale: string; alternativeRejected: string }[];
    testingAndEvaluation: {
      metrics: string[];
      methodology: string;
      testCount?: number;
    };
    securityReliability: string[];
    keyLearnings: string[];
    localDeploymentInstructions?: string[];
    disclaimer?: string;
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: 'Internship' | 'Full-Time' | 'Open Source';
  summary: string;
  achievements: string[];
  technologies: string[];
  projectsLinked?: string[];
  badgeColor?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    highlight?: boolean;
    level?: string;
    linkedProject?: string;
  }[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  scoreOrHonor?: string;
  credentialUrl?: string;
  year?: string;
}

export type Project3DType =
  | 'nexarag'
  | 'llmfirewall'
  | 'visualmemory'
  | 'aegis'
  | 'medical'
  | 'stock'
  | 'aireliability'
  | 'fastapicicd'
  | 'skillascend'
  | 'leviathan';

export function getProject3DType(slug: string): Project3DType {
  switch (slug) {
    case 'nexarag':
      return 'nexarag';
    case 'venipuncture-vr':
    case 'medical-transformer-lm':
      return 'medical';
    case 'llmfirewall-core':
    case 'llmfirewall':
      return 'llmfirewall';
    case 'aireliability':
    case 'aireliability-testing':
      return 'aireliability';
    case 'aegis-framework':
    case 'aegis':
      return 'aegis';
    case 'fastapi-cicd-lab':
    case 'fastapicicd':
      return 'fastapicicd';
    case 'stock-price-prediction':
    case 'stock':
      return 'stock';
    case 'skill-ascend':
    case 'ai-skill-assistance':
      return 'skillascend';
    case 'ai-visual-memory':
    case 'visualmemory':
      return 'visualmemory';
    case 'leviathan':
    case 'greenwashing-detector':
      return 'leviathan';
    default:
      return 'nexarag';
  }
}
