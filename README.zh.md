# 🏝️ dsh-animal-island-ui（动物小岛皮肤）

**动物小岛 (Animal Island)** —— 面向 dsh Web GUI 的动物之森风格**皮肤**，按
[dsh-web](https://github.com/zhu1090093659/dsh-web)（`dev` 分支）项目的
**皮肤插件开发规范（skin-center v2）** 重构：皮肤 = 纯资产目录，由皮肤中心
作为唯一加载器渲染，交互严格遵守当前 dsh UI 规范，皮肤仍为 **animal-island**
主题，图标/字体等资源尽量复刻打包。

> 设计源：[guokaigdg/animal-island-ui](https://github.com/guokaigdg/animal-island-ui)
> (CC BY-NC 4.0)。本皮肤重实现其视觉语言并内置其 Nunito 字体与树叶图标等资源，
> 不依赖该组件库。

## 外观

暖羊皮纸画布 · 土棕文字（绝无纯黑/冷灰）· 薄荷主色 `#19c8b9` · 50px 药丸控件 ·
主/发送按钮带 3D「游戏键」按压深度 · Nunito（拉丁）+ 系统中文回退，完全离线 ·
黄色焦点环（绝无冷蓝）。同时内置深色「森林夜」暖棕配色。

## 目录结构（纯资产目录）

本仓库**即皮肤本体**——按 v2 规范，皮肤不含 `package.json`、无构建步骤：

```
dsh-animal-island-ui/            # 皮肤目录 → 以 id="animal-island" 安装
├── skin.json                    # v2 清单（skinManifestVersion: 2）
├── skin.css                     # L1 官方 --dsw-* token 重映射 + @font-face
├── patches.css                  # L3 自由选择器组件补丁（自动作用域于
│                                #   html[data-dsh-skin="animal-island"]）
├── hooks.mjs                    # 可选：树叶 favicon（受信 facet）
├── assets/
│   ├── leaf-icon.png            # 复刻自 animal-island-ui
│   └── fonts/nunito-latin-*.woff2
├── preview/light.jpg|dark.jpg   # 皮肤中心展示图
├── README.md / README.zh.md
└── NOTICE                       # 素材署名 / CC BY-NC
```

## 安装与使用（皮肤中心）

按皮肤中心「用户皮肤」流程安装——**无需 plugin add、无需重启、不改
cordis.patch.yml**：

```sh
# 1. 把皮肤目录放进目标 dsh 实例的 home
cp -R dsh-animal-island-ui "$DSH_HOME/skins/animal-island"
# （注意不要多套一层：skin.json 必须直接在 skins/animal-island/ 下）
```

打开 GUI → 设置 → **皮肤中心**：目录中出现 **动物小岛** 卡片，**Try-on**
即时试穿，**Apply** 持久生效（也可直接写
`$DSH_HOME/skin-center-active.json` 为 `{"active":"animal-island"}` 后刷新）。
皮肤切换是页面内原子切换，不改动当前 UI 的任何交互。

卸载：

```sh
rm -rf "$DSH_HOME/skins/animal-island"
```

## 说明与依赖

- 宿主 dsh Web GUI 需加载 **skin-center** 运行时并支持 **v2 皮肤清单**
  （`@linxin666/dsh-web-all` / `@linxin666/dsh-client-ui-skin-center`，
  或 dsh-web 仓库内的皮肤中心）。
- `skin.css` 只重映射官方 `--dsw-*` token（亮色 `:root`，暗色
  `body[data-ds-dark-theme]`）；`patches.css` 为已披露的 L3 层。
- `hooks.mjs`（树叶 favicon）仅在内置 / 官方市场校验安装下执行；手动放入
  `$DSH_HOME/skins/<id>` 的用户皮肤不会执行 hooks（声明式部分照常生效）。
- 可选校验：在 dsh-web 仓库对该目录运行 `scripts/dsh-skin validate` 与
  `pnpm skin-center:check`，并用其市场模拟器 `?skin=animal-island` 试穿。

## 重新生成 preview

改动外观后，请在应用了该皮肤的 dsh web 实例上重拍 `preview/{light,dark}.jpg`
（亮/暗两态整窗截图）并随改动一并提交。

## License

代码（skin.json / css / patches / hooks）MIT（另有说明除外）。打包的视觉素材与
视觉风格来自 guokaigdg/animal-island-ui —— **CC BY-NC 4.0**（非商用）。详见
`NOTICE`。
