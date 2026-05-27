import type { Summary } from 'benny/lib/internal/common-types';

export const VALID = Object.freeze({
  string: 'SX3',
  number: 33,
  maxNumber: Number.MAX_VALUE,
  boolean: true,
  nested: {
    string: 'SX3',
    number: 33,
    minNumber: Number.MIN_VALUE,
    boolean: false,
    deepNumberArray: [1, 2, 3, 4, 5],
  },
  longString:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivendum intellegat et qui, ei denique consequuntur vix. Semper aeterno percipit ut his, sea ex utinam referrentur repudiandae. No epicuri hendrerit consetetur sit, sit dicta adipiscing ex, in facete detracto deterruisset duo. Quot populo ad qui. Sit fugit nostrum et. Ad per diam dicant interesset, lorem iusto sensibus ut sed. No dicam aperiam vis. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Ex nam agam veri, dicunt efficiantur ad qui, ad legere adversarium sit. Commune platonem mel id, brute adipiscing duo an. Vivendum intellegat et qui, ei denique consequuntur vix. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
});

export const INVALID = Object.freeze({
  string: 'SX3',
  number: 3323,
  maxNumber: Number.MAX_VALUE,
  boolean: false,
  nested: {
    string: '333',
    number: 33,
    minNumber: Number.MIN_VALUE,
    boolean: false,
    // ! Invalid
    deepNumberArray: [1, 2, 'ds', 4, 5],
  },
  lingString: VALID.longString,
});

export const EXTRA_KEYS = Object.freeze({
  ...VALID,
  extraTop: 'extra',
  nested: {
    ...VALID.nested,
    extraNested: 'extra',
  },
});

export interface PlatformMeta {
  runtime: { name: 'node' | 'bun' | 'deno'; version: string };
  timestamp: number;
  env: {
    cpu: string;
    memory: number;
    arch: string;
    os: { name: string; version: string };
  };
}

export interface LibraryEntry {
  name: string;
  version: string;
  summary: Summary;
  npm?: string;
  github?: string;
  downloads?: number;
}

/** One file = one platform, all libraries tested separately but merged. */
export interface PlatformResult {
  meta: PlatformMeta;
  libraries: LibraryEntry[];
}

/** meta.json beside index.ts — optional per-case metadata. */
export interface CaseMeta {
  /** npm package name (required — used for require() and directory-as-slug support). */
  package: string;
  npm?: string;
  github?: string;
}
