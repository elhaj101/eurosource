export const getImagePath = (path: string): string => {
  const basePath = process.env.NEXT_PUBLIC_BASEPATH || '';
  
  // Only add basePath if not already present
  if (path.startsWith('/eurosource/') || path.startsWith(basePath)) {
    return path;
  }
  
  // Don't add basePath to full URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  return basePath ? `${basePath}${path}` : path;
};
