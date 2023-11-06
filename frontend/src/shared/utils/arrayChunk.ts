export const arrayChunk = <T>(arr: T[], by: number) => {
  const array = arr.slice();
  const chunks = [];
  while (array.length) chunks.push(array.splice(0, by));
  return chunks;
};
