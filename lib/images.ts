// Free photos from Unsplash (Unsplash License: free for commercial use, no permission needed).
// To use your own photos later: put them in /public/photos/ and replace the `src` with '/photos/your-file.jpg'.
const U = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const IMG = {
  teamLaptops: U('1522071820081-009f0129c71c'),
  teamSticky: U('1552664730-d307ca884978'),
  teamGroup: U('1531545514256-b1400bc00f31'),
  teamTable: U('1521737604893-d14cc237f11d'),
  highFive: U('1600880292203-757bb62b4baf'),
  colleagues: U('1758873268364-15bef4162221'),
  devs: U('1629904853893-c2c8981a1dc5'),
  camera: U('1590486803833-1c5dc8ddd4c8'),
  photographer: U('1492691527719-9d1e07e534b4'),
  videoEdit: U('1574717024653-61fd2cf4d44d'),
  swatches: U('1561070791-2526d30994b5'),
  wireframe: U('1581291518857-4e27b48ff24e'),
  analytics: U('1460925895917-afdab827c52f'),
  socialPhone: U('1759215524472-1b0686fdbd87'),
  consulting: U('1517048676732-d65bc937f952'),
  villa: U('1600596542815-ffad4c1539a9'),
  house: U('1600585154340-be6161a56a0c'),
  hotelPool: U('1566073771259-6a8506099945'),
  riad: U('1750859464437-b66433efd869'),
  cafe: U('1554118811-1e0d58224f24'),
  clinic: U('1519494026892-80bbd2d6fd0d'),
  retail: U('1441986300917-64674bd600d8'),
  startup: U('1559136555-9303baea8ebd'),
  sme: U('1556761175-5973dc0f32e7'),
  volunteers: U('1559027615-cd4628902d4a'),
  marrakech: U('1597212618440-806262de4f6b'),
  casablanca: U('1538230575309-59dfc388ae36'),
} as const;

export type ImgKey = keyof typeof IMG;

/** Build a responsive srcset from the Unsplash CDN (auto WebP/AVIF, resized, compressed). */
export function srcSet(src: string, ratio = 0.66) {
  if (!src.startsWith('https://images.unsplash.com')) return { src, srcSet: undefined };
  const q = (w: number) => `${src}?auto=format&fit=crop&q=70&w=${w}&h=${Math.round(w * ratio)}`;
  return {
    src: q(1200),
    srcSet: [480, 800, 1200, 1600].map((w) => `${q(w)} ${w}w`).join(', '),
  };
}
