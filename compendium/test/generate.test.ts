import fs from 'fs';
import { generateFamilyTree } from '../generateFamilyTree';
import { writeToFile } from '../writeToFile';
import { getArtifacts } from '../metadata';
import { generateEdges } from '../generateEdges';

describe('generate and writeToFile', () => {
  it('results in node json file', async () => {
    const data = await generateFamilyTree();
    await writeToFile(data, './compendium/data/people.json');

    const exists = fs.existsSync('./compendium/data/people.json');
    expect(exists).toBe(true);
  });
  it('results in edges json file', async () => {
    const data = generateEdges();
    await writeToFile(data, './compendium/data/edges.json');
    const exists = fs.existsSync('./compendium/data/edges.json');
    expect(exists).toBe(true);
  });
});
