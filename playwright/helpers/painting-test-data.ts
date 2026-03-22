export interface TestFilePayload {
  name: string;
  mimeType: string;
  buffer: Buffer;
}

export interface PaintingFormInput {
  title: string;
  tags: string;
  description: string;
  artist: string;
  price: string;
  width: string;
  height: string;
  medium: string;
  base: string;
}

export function buildPaintingFormInput(title: string): PaintingFormInput {
  return {
    title,
    tags: 'ocean, blue, light, abstract, e2e',
    description: 'E2E test painting created by Playwright.',
    artist: 'E2E Artist',
    price: '150',
    width: '50',
    height: '40',
    medium: 'Oil',
    base: 'Paper',
  };
}

export function createTestPaintingImage(
  name = 'e2e-painting.png',
): TestFilePayload {
  return {
    name,
    mimeType: 'image/png',
    buffer: Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=',
      'base64',
    ),
  };
}
