import fs from 'fs';
import { generateFamilyTree } from '../generateFamilyTree';
import { writeToFile } from '../writeToFile';

describe('generate and writeToFile', () => {
  it('results in generated json file', async () => {
    const data = await generateFamilyTree();
    await writeToFile(data, './compendium/data/people.json');

    const exists = fs.existsSync('./compendium/data/people.json');
    expect(exists).toBe(true);
  });
});
