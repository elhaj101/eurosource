import { getImagePath } from '@/lib/image-utils';

describe('getImagePath utility', () => {
  // Store original env
  const originalEnv = process.env.NEXT_PUBLIC_BASEPATH;

  afterEach(() => {
    // Restore original env
    process.env.NEXT_PUBLIC_BASEPATH = originalEnv;
  });

  describe('With basePath (/eurosource)', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_BASEPATH = '/eurosource';
    });

    test('should prefix simple image paths', () => {
      const result = getImagePath('/Mercedes-1_1920x1080.webp');
      expect(result).toBe('/eurosource/Mercedes-1_1920x1080.webp');
    });

    test('should prefix gallery images', () => {
      const images = [
        '/labeling-machine.webp',
        '/furniture-production.webp',
        '/forklift.webp',
        '/legoland-lego-fabrik.webp',
      ];
      
      images.forEach(img => {
        const result = getImagePath(img);
        expect(result).toBe(`/eurosource${img}`);
      });
    });

    test('should prefix German flag image', () => {
      const result = getImagePath('/abstract-representation-german-flag-paint-brush-strokes-isolated-white-background-stroke-368550399-removebg-preview.png');
      expect(result).toBe('/eurosource/abstract-representation-german-flag-paint-brush-strokes-isolated-white-background-stroke-368550399-removebg-preview.png');
    });

    test('should NOT double-prefix already prefixed paths', () => {
      const result = getImagePath('/eurosource/Mercedes-1_1920x1080.webp');
      expect(result).toBe('/eurosource/Mercedes-1_1920x1080.webp');
    });

    test('should NOT prefix full URLs', () => {
      const urls = [
        'https://example.com/image.webp',
        'http://example.com/image.jpg',
      ];
      
      urls.forEach(url => {
        const result = getImagePath(url);
        expect(result).toBe(url);
      });
    });

    test('should prefix shipping container image', () => {
      const result = getImagePath('/shipping-container-eu-2.webp');
      expect(result).toBe('/eurosource/shipping-container-eu-2.webp');
    });
  });

  describe('Without basePath (localhost)', () => {
    beforeEach(() => {
      delete process.env.NEXT_PUBLIC_BASEPATH;
    });

    test('should return path as-is when no basePath', () => {
      const result = getImagePath('/Mercedes-1_1920x1080.webp');
      expect(result).toBe('/Mercedes-1_1920x1080.webp');
    });

    test('should handle multiple images correctly', () => {
      const images = [
        '/labeling-machine.webp',
        '/furniture-production.webp',
      ];
      
      images.forEach(img => {
        const result = getImagePath(img);
        expect(result).toBe(img);
      });
    });

    test('should still not prefix full URLs', () => {
      const result = getImagePath('https://example.com/image.webp');
      expect(result).toBe('https://example.com/image.webp');
    });
  });

  describe('Edge cases', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_BASEPATH = '/eurosource';
    });

    test('should handle empty string gracefully', () => {
      const result = getImagePath('');
      // Empty string gets basePath prefixed, which is acceptable behavior
      expect(result).toBe('/eurosource');
    });

    test('should handle paths with query parameters', () => {
      const result = getImagePath('/image.webp?v=1');
      expect(result).toBe('/eurosource/image.webp?v=1');
    });

    test('should handle paths with special characters', () => {
      const result = getImagePath('/pngtree-large-metal-storage-container-png-image_14351531-removebg-preview%20(1).png');
      expect(result).toBe('/eurosource/pngtree-large-metal-storage-container-png-image_14351531-removebg-preview%20(1).png');
    });
  });
});
