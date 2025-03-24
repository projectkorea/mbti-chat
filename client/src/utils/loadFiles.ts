// Type definition for module imports
interface ImportedModule {
  default: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const loadSvgs = (): Record<string, string> => {
  // Use type assertion for import.meta.glob
  const images = (import.meta as any).glob('/src/assets/images/svg/*.svg', { eager: true });
  const imageMap: Record<string, string> = {};

  for (const [key, value] of Object.entries(images)) {
    const imageName = key.split('/').pop()?.replace('.svg', '') || '';
    // Use type assertion for value
    imageMap[imageName] = (value as ImportedModule).default;
  }

  return imageMap;
};

const loadIcons = (): Record<string, string> => {
  // Use type assertion for import.meta.glob
  const icons = (import.meta as any).glob('/src/assets/images/icon/*.png', { eager: true });
  const iconMap: Record<string, string> = {};

  for (const [key, value] of Object.entries(icons)) {
    const iconName = key.split('/').pop()?.replace('.png', '') || '';
    // Use type assertion for value
    iconMap[iconName] = (value as ImportedModule).default;
  }

  return iconMap;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export const loadFiles = (directory: string): Record<string, string> => {
  if (directory === "svg") {
    return loadSvgs();
  } else if (directory === "icon") {
    return loadIcons();
  }
  // Add more conditions as needed
  else {
    throw new Error(`Unsupported directory (${directory})`);
  }
};
