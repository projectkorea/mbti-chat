import { loadSvgs, loadIcons } from "./loadImages.js";

export const loadFiles = (directory) => {
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
