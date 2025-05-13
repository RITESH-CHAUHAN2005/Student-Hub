
/**
 * Custom component tagger for development purposes
 * This replaces the Lovable tagger with our own implementation
 */
export const taggerPlugin = () => {
  return {
    name: 'custom-component-tagger',
    // Minimal implementation that doesn't add any tags
    transform(code, id) {
      return code;
    }
  };
};
