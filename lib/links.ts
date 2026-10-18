export const PROFILE_LINKS = {
  name: "Livesh L",
  role: "AI Developer · LLM Applications & Security",
  email: "liveshjaidj@gmail.com",
  phone: "+91 9345406612",
  github: "https://github.com/Livesh-L-28",
  linkedin: "https://linkedin.com/in/livesh-l-aa9821322",
  pypi: "https://pypi.org/user/Livesh-L-28/",
  location: "Tamil Nadu, India",
  education: {
    degree: "B.Tech in Artificial Intelligence & Data Science",
    college: "Prathyusha Engineering College",
    period: "2023 – Expected 2027",
    cgpa: "8.53 / 10",
    backlogs: "No active backlogs",
  },
  resumePdf: "/resume/Livesh_L_Resume.pdf",
} as const;

export function isValidHttpUrl(stringUrl?: string | null): boolean {
  if (!stringUrl) return false;
  try {
    const url = new URL(stringUrl);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function getEmbeddableVideoUrl(rawUrl?: string): {
  type: "embed" | "direct" | "invalid";
  url: string;
} {
  if (!rawUrl) return { type: "invalid", url: "" };

  const trimmed = rawUrl.trim();

  // Local media paths
  if (trimmed.startsWith("/") || trimmed.startsWith("./")) {
    return { type: "direct", url: trimmed };
  }

  // Direct MP4 / WebM / MOV
  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(trimmed)) {
    return { type: "direct", url: trimmed };
  }

  // Google Drive preview embed (drive.google.com/file/d/FILE_ID/...)
  const gdriveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (gdriveMatch && gdriveMatch[1]) {
    return {
      type: "embed",
      url: `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`,
    };
  }

  // YouTube transformation
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return {
      type: "embed",
      url: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // Vimeo transformation
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "embed",
      url: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  return { type: "invalid", url: "" };
}
