import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const rawTitle = args[0];

if (!rawTitle) {
  console.error("用法: npm run new:post -- \"文章标题\" [track]");
  console.error("track 可选: understand | assessment | treatment | life");
  console.error("兼容旧参数: science | practice | belike");
  console.error("可选参数: --minutes 8 --views 2.3k --tags \"沟通,关系\" --publish");
  process.exit(1);
}

const sectionToTrack = {
  science: "understand",
  practice: "assessment",
  belike: "life",
};

const trackToSection = {
  understand: "science",
  assessment: "practice",
  treatment: "belike",
  life: "belike",
};

const valueOptions = new Set(["--minutes", "--views", "--tags"]);

function parseFlags(inputArgs) {
  const flags = {
    publish: false,
    minutes: null,
    views: null,
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

    if (token === "--minutes") {
      const parsed = Number.parseInt(value, 10);
      if (!Number.isFinite(parsed) || parsed <= 0) {
        console.error("--minutes 需要正整数，例如 --minutes 8");
        process.exit(1);
      }
      flags.minutes = parsed;
    }

    if (token === "--views") {
      flags.views = value;
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

const track = normalized in trackToSection
  ? normalized
  : (normalized in sectionToTrack ? sectionToTrack[normalized] : "understand");

const section = trackToSection[track];
const draft = flags.publish ? "false" : "true";
const defaultReadMinutes = 8;
const readMinutes = flags.minutes ?? defaultReadMinutes;
const views = flags.views ?? "0";
const escapedViews = String(views).replaceAll('"', '\\"');
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

if (fs.existsSync(outDir)) {
  console.error(`目录已存在: ${outDir}`);
  process.exit(1);
}

const template = `---
title: ${rawTitle}
date: ${date}
section: ${section}
track: ${track}
excerpt: 请在这里写一句摘要
keyPoint: 请在这里写本文最重要的一句话
readMinutes: ${readMinutes}
views: "${escapedViews}"
tags:
${tagsBlock}
draft: ${draft}
---

在这里开始写正文。
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, template, "utf8");
fs.writeFileSync(refsPath, "", "utf8");
console.log(`已创建: ${outPath}`);
console.log(`已创建: ${refsPath} (可选论文文献)`);
console.log(`栏目映射: track=${track} -> section=${section}`);
console.log(`已写入: readMinutes=${readMinutes}, views=${views}, tags=${tags.join("/")}`);
console.log("可选: 将 WebP 封面放在同目录 cover.webp，并在 frontmatter 增加 cover: ./cover.webp");
if (draft === "true") {
  console.log("下一步: 发布前将 draft 改为 false");
}
console.log("下一步: 运行 npm run dev 预览；运行 npm run build 生成搜索索引");
