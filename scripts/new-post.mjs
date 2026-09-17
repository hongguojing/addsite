import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const rawTitle = args[0];

if (!rawTitle) {
  console.error("用法: npm run new:post -- \"文章标题\" [track]");
  console.error("track 可选: understand | assessment | treatment | life");
  console.error("兼容旧参数: science | practice | belike");
  console.error("可选参数: --tags \"沟通,关系\" --publish");
  process.exit(1);
}

const sectionToTrack = {
  science: "understand",
  practice: "assessment",
  belike: "life",
};

const trackLabel = {
  understand: "认识 ADHD",
  assessment: "评估与诊断",
  treatment: "治疗",
  life: "生活",
};

const valueOptions = new Set(["--tags"]);

function parseFlags(inputArgs) {
  const flags = {
    publish: false,
    tags: [],
  };

  for (let i = 0; i < inputArgs.length; i += 1) {
    const token = inputArgs[i];

    if (token === "--publish") {
      flags.publish = true;
      continue;
    }

    if (!valueOptions.has(token)) {
      continue;
    }

    const value = inputArgs[i + 1];
    if (!value || value.startsWith("--")) {
      console.error(`参数缺少值: ${token}`);
      process.exit(1);
    }

    if (token === "--tags") {
      const parsedTags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      flags.tags = parsedTags;
    }

    i += 1;
  }

  return flags;
}

const secondArg = args[1];
const optionArgs = args.slice(2);
const flags = parseFlags(optionArgs);
const normalized = typeof secondArg === "string" ? secondArg.toLowerCase() : "";

const track = normalized in trackLabel
  ? normalized
  : (normalized in sectionToTrack ? sectionToTrack[normalized] : "understand");

const draft = flags.publish ? "false" : "true";
const tags = flags.tags.length > 0 ? flags.tags : ["待补充"];
const tagsBlock = tags.map((tag) => `  - ${tag}`).join("\n");

const now = new Date();
const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, "0");
const dd = String(now.getDate()).padStart(2, "0");
const date = `${yyyy}-${mm}-${dd}`;

const slug = rawTitle
  .toLowerCase()
  .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-");

const folderName = `${date}-${slug || "new-post"}`;
const outDir = path.resolve("src/content/posts", folderName);
const outPath = path.join(outDir, "index.mdx");
const refsPath = path.join(outDir, "refs.bib");

// 封面：frontmatter 里写相对路径，图片必须真实存在，否则 Astro 的 image() 会报错，
// 所以这里顺手生成一张占位图，替换成自己的封面即可（文件名改了要同步改 frontmatter）。
const coverRel = "./x.png";
const coverPath = path.join(outDir, "x.png");

if (fs.existsSync(outDir)) {
  console.error(`目录已存在: ${outDir}`);
  process.exit(1);
}

const coverSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1a2e"/>
      <stop offset="1" stop-color="#16404f"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.74" cy="0.26" r="0.62">
      <stop offset="0" stop-color="#5a9ea5" stop-opacity="0.42"/>
      <stop offset="1" stop-color="#5a9ea5" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g fill="none" stroke="#8fc9c1" stroke-opacity="0.28" stroke-width="2">
    <circle cx="980" cy="474" r="168"/>
    <circle cx="980" cy="474" r="104"/>
  </g>
</svg>`;

async function writePlaceholderCover() {
  try {
    const { default: sharp } = await import("sharp");
    await sharp(Buffer.from(coverSvg)).png().toFile(coverPath);
    return true;
  } catch (error) {
    console.error(`占位封面生成失败: ${error.message}`);
    console.error("本次不写入 cover 字段；需要封面时放入图片再手动添加。");
    return false;
  }
}

fs.mkdirSync(outDir, { recursive: true });
const coverCreated = await writePlaceholderCover();
const coverBlock = coverCreated ? `cover: ${coverRel}\n` : "";

const template = `---
title: ${rawTitle}
date: ${date}
track: ${track}
excerpt: 请在这里写一句摘要
${coverBlock}tags:
${tagsBlock}
draft: ${draft}
---

在这里开始写正文。
`;

fs.writeFileSync(outPath, template, "utf8");
fs.writeFileSync(refsPath, "", "utf8");
console.log(`已创建: ${outPath}`);
if (coverCreated) {
  console.log(`已创建: ${coverPath}（占位封面，替换成自己的封面即可）`);
}
console.log(`已创建: ${refsPath} (可选论文文献)`);
console.log(`栏目: track=${track} -> ${trackLabel[track]}`);
console.log(`标签: ${tags.join("/")}`);
if (coverCreated) {
  console.log(`封面: frontmatter 已写 cover: ${coverRel}；若改了图片文件名，请同步修改这一行`);
} else {
  console.log("封面: 未生成，需要时放入图片并在 frontmatter 添加 cover: ./文件名.png");
}
if (draft === "true") {
  console.log("下一步: 发布前将 draft 改为 false");
}
console.log("下一步: 运行 npm run dev 预览；运行 npm run build 生成搜索索引");
