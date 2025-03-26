#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .usage('[options] <filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    console.log(`Comparing files:
File 1: ${filepath1}
File 2: ${filepath2}
Format: ${options.format}`);
  });

program.parse(process.argv);