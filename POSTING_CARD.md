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
- `--tags "沟通,关系"`：一次写入多个标签

完整示例：
```bash
npm run new:post -- "如何建立可持续节奏" life --tags "节奏,复盘" --publish
```

模板会生成三个文件：
- `index.mdx`：frontmatter 只含 `title`、`date`、`track`、`excerpt`、`cover`、`tags`、`draft`
- `x.png`：1200×630 的占位封面（换成自己的封面即可）
- `refs.bib`：可选论文文献，留空

## 2) 写内容
- 打开新生成目录下的 `index.mdx`
- 封面：模板默认写 `cover: ./x.png`，指向同目录的占位图。换成自己的封面图后，把 frontmatter 里的文件名同步改掉（或直接把新图命名为 `x.png` 覆盖掉占位图）
- `cover` 指向的图片必须真实存在，否则构建会报错
- 在 frontmatter 填写 `excerpt` 和 `tags`
- 文末会自动生成一个「一句话结论」框，取 `keyPoint`，没写 `keyPoint` 时自动退回用 `excerpt`。若想让文末摘要和结论分开，可另加一行 `keyPoint: ……`（模板默认不写；两者内容相同时只会显示结论框，不会重复）
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
	├── x.png          ← 封面（默认占位图，替换即可）
	├── fig1.svg
	├── fig2.webp
	└── refs.bib
```
