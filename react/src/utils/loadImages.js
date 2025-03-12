export const loadSvgs = () => {
  const images = import.meta.glob('/src/assets/images/svg/*.svg', { eager: true });
  const imageMap = {};

  for (const [key, value] of Object.entries(images)) {
    const imageName = key.split('/').pop().replace('.svg', '');
    imageMap[imageName] = value.default;
  }

  return imageMap;
};

export const loadIcons = () => {
  const icons = import.meta.glob('/src/assets/images/icon/*.png', { eager: true });
  const iconMap = {};

  for (const [key, value] of Object.entries(icons)) {
    const iconName = key.split('/').pop().replace('.png', '');
    iconMap[iconName] = value.default;
  }

  return iconMap;
};

