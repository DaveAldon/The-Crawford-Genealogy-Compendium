import fs from 'fs';
import { generateFamilyTree } from '../generateFamilyTree';
import { writeToFile } from '../writeToFile';
import { generateEdges } from '../generateEdges';
import { families } from '../lib/families';

describe('generate and writeToFile', () => {
  it('results in node json files for each family', async () => {
    families.forEach(async family => {
      const data = await generateFamilyTree(family);
      const path = `./public/data/${family}.json`;
      await writeToFile(data, path);
      const exists = fs.existsSync(path);
      expect(exists).toBe(true);
    });
  });
  it('results in edges json file associated with each family json', async () => {
    families.forEach(async family => {
      const sourcePath = `./public/data/${family}.json`;
      const edgesPath = `./public/data/${family}-edges.json`;
      const data = generateEdges(sourcePath);
      await writeToFile(data, edgesPath);
      const exists = fs.existsSync(edgesPath);
      expect(exists).toBe(true);
    });
  });
});
