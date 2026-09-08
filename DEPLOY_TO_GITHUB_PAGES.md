# addsite GitHub Pages 部署说明

我已经把项目改成适合部署到：

https://hongguojing.github.io/addsite/

## 已修改

1. `astro.config.mjs`
   - `site` 改为 `https://hongguojing.github.io`
   - 增加 `base: "/addsite"`

2. 新增 `.github/workflows/deploy.yml`
   - 使用 Astro 官方 GitHub Action 构建
   - 自动部署到 GitHub Pages

3. 修正项目内部链接
   - 首页、分类页、文章页、搜索页等会自动使用 `/addsite/` 前缀
   - Pagefind 搜索脚本也改为使用 `/addsite/` 路径
   - `/belike` 跳转也改为带 `/addsite/` 前缀

## 部署

不要覆盖你现有项目的 `.git` 文件夹。

把这个压缩包解压后，将里面的文件复制到你现有的 `H:\addsite` 项目中，覆盖同名文件即可。

然后在 PowerShell：

```powershell
cd H:\addsite
git add .
git commit -m "configure GitHub Pages deployment"
git push origin main
```

GitHub 仓库的 Settings → Pages → Build and deployment → Source 保持：

`GitHub Actions`

然后进入仓库的 Actions 页面，等待 `Deploy to GitHub Pages` 完成。

完成后访问：

https://hongguojing.github.io/addsite/
