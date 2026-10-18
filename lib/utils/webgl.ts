let cachedSupport: boolean | null = null;

/**
 * Deterministically checks for WebGL2 / WebGL support once and caches the result.
 * Explicitly releases the temporary test context using WEBGL_lose_context
 * so it never leaks or churns browser GPU context limits.
 */
export function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  if (cachedSupport !== null) return cachedSupport;

  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as
      | WebGLRenderingContext
      | WebGL2RenderingContext
      | null;

    cachedSupport = Boolean(window.WebGLRenderingContext && gl);

    if (gl) {
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) {
        ext.loseContext();
      }
    }
  } catch {
    cachedSupport = false;
  }

  return cachedSupport;
}
