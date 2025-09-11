---
publishedAt: '2024-10-04T00:00:00'
title: 'Using Github Repository To Host NPM Packages'
description: "Work around npm scope issues by hosting tarballs on GitHub; pros/cons, caching gotchas, scripts, and future improvements."



---

I was excited to release the first half-working version of **January** and share it with world, but to my surprise, the name was already taken. I made a mistake of not checking if the **“@january”** scope was available on npm. “Who would pick January as a package name?" I thought. Well, someone had—seven years ago.

### The Name Game

It’s difficult to choose otherwise. I can, but I’d rather not. So, I reached out to npm support, making a case that the original owner hadn't published anything under that name in seven years. It was a long shot, but worth trying.

_I have **@januarylabs** as a backup option but the name is not sitting well with me._

While waiting for npm's response, I needed a way to make January available to developers. So googled for a solution and found that I can do with:

1. Self-hosted package registry
2. Github Packages
3. File storage

The **first option** is about having your own npm on a server so that you can pretty much have any scope or package name you wish. It’s an excellent option, really, and the preferred one in my case, but it comes with caveats:

- You need to maintain a server and make sure it’s always **AVAILABLE**
- Developers need to configure their `.npmrc` file to use your registry:

```bash
@january:registry=https://packages.january.sh/
```

I only know about [Verdaccio](~https://verdaccio.org/~), which can make it possible for you without having to set up the API for publishing and installing.

The **second option** was to use [GitHub Packages](~https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry~). I've used it a few times to host internal packages for clients but never for public ones. After looking deeper into the documentation, it seems that an authentication token is required for almost every action (publishing, installing, etc.), so I had to pass.

The **third option**, which I’m using at the moment, is to manually tar the packages, publish them to a file storage, and have the developers reference the full URL in package.json instead of the version.

```json
{
  "dependencies": {
    "@january/declarative": "https://github.com/JanuaryLabs/dist/raw/main/declarative.tar.gz",
    "@january/extensions": "https://github.com/JanuaryLabs/dist/raw/main/extensions.tar.gz",
    "@january/canary": "https://github.com/JanuaryLabs/dist/raw/main/canary.tar.gz",
    "@january/docker": "https://github.com/JanuaryLabs/dist/raw/main/docker.tar.gz"
  }
}
```

I'm using GitHub repository as file storage. basically, I've created a repository named **dist** and commit the packages (tar files) with each release.
Although this works and gets the job done, it has an important caveat: **You cannot instruct `npm i` to install the latest version** because npm will try to use the cached version if available.

To get around this, you need to upload the tar files with the version in the name so that instead of

`https://github.com/JanuaryLabs/dist/raw/main/canary.tar.gz`

You need

`https://github.com/JanuaryLabs/dist/raw/main/1.2.3/canary.tar.gz`

Where _1.2.3_ is the version, you can also add a random query param every time you want to perform an update.

**Note: The point here is to workaround npm cache.**

Even `npm update` won’t work AFAIK given that it uses semver checks to determine whether a package should be updated.

---

From the implementation perspective, I'm using git tags to keep up with package versions (managed for me by the fabulous [NX](~https://nx.dev/~) tooling).

It works by manually running the script below, that will

- Look up the latest release tag to determine the version.
- Tar the package and store it in the tmp directory.
- Make sure the `package.json` version for each package is the same as the latest release version.
- Publish to the root "dist" repository.
- Publish to a folder named by the version to avoid the issue outlined before.
- If you try to publish the same version or file, it’ll update the existing one. _It works as an upsert operation._

_Note: You can run it via GitHub actions instead._

_Note: it's better not to use the version as a package name prefix or suffix. Otherwise you'll have many files in GitHub file explorer_

```ts
import { Octokit } from '@octokit/core';
import { execSync } from 'child_process';
import { readFile, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import path, { basename, join } from 'path';
import tar from 'tar';

const [owner, repo] = 'JanuaryLabs/dist'.split('/');

const octokit = new Octokit({
  // auth: better to use token if you release frequently.
});

const projects = [
  'extensions',
  'canary',
  'remote',
  'docker',
  'inventory',
  'console',
];

const [releaseTag] = execSync('git tag --sort=-creatordate --list "release/*"')
  .toString()
  .trim()
  .split('\n');

for (const project of projects) {
  const dir = path.join(process.cwd(), 'dist', 'libs', project);
  const tarPath = join(tmpdir(), `${basename(project)}.tar.gz`);

  const packageJson = JSON.parse(
    await readFile(join(dir, 'package.json'), 'utf-8')
  );

  const releaseVersion = releaseTag.replace('release/', '');
  packageJson.version = releaseVersion;
  await writeFile(
    join(dir, 'package.json'),
    JSON.stringify(packageJson, null, 2),
    'utf-8'
  );
  await tar.c(
    {
      gzip: true,
      file: tarPath,
      cwd: dir,
    },
    ['.']
  );

  // publish in version directory
  await publish(join(releaseVersion, basename(tarPath)), tarPath);

  // publish without version
  await publish(join(basename(tarPath)), tarPath);

  console.log(`Release ${basename(tarPath)}@${releaseVersion}`);
}

async function publish(path: string, tarPath: string) {
  const sha = await octokit
    .request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path: path,
      ref: 'main',
    })
    .then(res => ('sha' in res.data ? res.data.sha : undefined))
    .catch(() => undefined);
  await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    sha: sha,
    path: path,
    message: `Releasing ${basename(path)}`,
    content: Buffer.from(await readFile(tarPath)).toString('base64'),
  });
}
```

### Future plans

I'm sticking with the URL approach for now. However, using GitHub releases instead of creating a dedicated repository to store the packages, which also have excellent presentations for release notes and are commonly used for this kind of thing would be a better solution.
