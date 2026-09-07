# 发文操作卡片（优化版）

## 1) 新建文章
```bash
npm run new:post -- "你的文章标题" life
```
推荐第二参数直接用 track：
- `understand`：认识 ADHD
- `assessment`：评估与诊断
- `treatment`：治疗
- `life`：生活

兼容旧参数：`science` / `practice` / `belike`

可选参数：
- `--publish`：新文章直接 `draft: false`
- `--minutes 8`：阅读时长
- `--views 2.3k`：初始阅读量展示
- `--tags "沟通,关系"`：一次写入多个标签

完整示例：
```bash
npm run new:post -- "如何建立可持续节奏" life --minutes 9 --views 1.2k --tags "节奏,复盘" --publish
```

## 2) 写内容
- 打开新生成目录下的 `index.mdx`
- 可选放封面到同目录（`cover.webp`），并在 frontmatter 添加 `cover: ./cover.webp`
- 若暂时没有封面，不要写 `cover` 字段，避免本地预览报错
- 在 frontmatter 填写 `excerpt`、`keyPoint`、`tags`，可选 `readMinutes`、`views`
- 若要改栏目，直接改 `track: understand | assessment | treatment | life`
- 如有论文文献，可写在 `refs.bib`
- 发布前把 `draft: true` 改为 `draft: false`

## 3) 预览与构建
```bash
npm run dev
npm run build
```
- 本地预览：`http://localhost:4321`
- 构建产物：`dist/`（同时生成 Pagefind 搜索索引）

## 推荐目录模板
```text
src/content/posts/
└── 日期-文章标题/
	├── index.mdx
	├── cover.webp
	├── fig1.svg
	├── fig2.webp
	└── refs.bib
```
