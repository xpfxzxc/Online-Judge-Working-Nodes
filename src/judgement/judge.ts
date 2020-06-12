import { execFileSync } from 'child_process';
import { mkdirSync, writeFileSync, rmdirSync, readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

import { randomStr } from '../utils';
import { JudgementResult } from './judgement-result.interface';

export function judge(
  userId: number,
  problemId: number,
  language: string,
  code: string,
) {
  const configJSON = readFileSync('config.json').toString();
  const config = JSON.parse(configJSON) as any;
  const { testSetDirpath, judgerDirpath, judgerFilename } = config;
  const languageExtensionMap = config.code.extension;

  const codeDirName = userId + '_' + randomStr();
  const codeDirPath = join(process.cwd(), 'temp', 'code', codeDirName);
  const codeFilepath = join(
    codeDirPath,
    'code.' + languageExtensionMap[language],
  );
  mkdirSync(codeDirPath, { recursive: true });
  writeFileSync(codeFilepath, code);

  const problemTestSetDirpath = join(testSetDirpath as string, `${problemId}`);
  const judgerFilepath = join(
    judgerDirpath as string,
    judgerFilename as string,
  );
  const judgerOutput = execFileSync(
    judgerFilepath,
    [codeFilepath, language, problemTestSetDirpath],
    {
      encoding: 'utf-8',
    },
  ).toString();
  console.log(judgerOutput);

  rmdirSync(codeDirPath, { recursive: true });

  return yaml.safeLoad(judgerOutput) as JudgementResult;
}
