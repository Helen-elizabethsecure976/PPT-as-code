# PPT as Code

中文说明。英文版请看 [README.md](./README.md)。

`PPT as Code` 是一个面向内容创作者的演示文稿工作流 skill，用来规划、设计并生成 HTML 版 PPT。它不是把“网页”和“PPT”粗暴拼在一起，而是把做 deck 真正需要的几个关键环节拆开并按顺序锁定：结构、风格、脚本、配图、可视化、HTML 落地，以及可选的 PPTX 交付。

这个开源版保留了核心工作流，但去掉了私有仓库依赖，默认更保守地处理写文件、联网搜索和图片下载，也补上了明确的 fallback 路径。

## 优点和特性

- 演示优先，不是长网页优先。
- `quick / basic / advanced` 三档保留，但 `basic` 和 `advanced` 默认都按确认式流程走。
- 轻量模式也必须有风格方向，不会只给一个技术骨架。
- 图片逻辑按页来做，不按整套 deck 的大主题粗搜。
- 静态 HTML 先锁定，再决定要不要补动态。
- 支持把 PDF、文档、网页等资料先规整成 markdown，再进入 deck 流程。
- 支持在 HTML 落地前先规划图表、信息图和 KPI 卡。
- 现在已经带有一个可运行的 PPT 工作台原型，可做更像 PPT 的画布编辑。

## 原理很简单

这个 skill 的底层原则其实就几条：

- 不要太早锁死最终视觉。
- 不要把网页排版误当成演示设计。
- 不要用整套 deck 的大主题去模糊搜图。
- 不要把高风险决策混成一步做完。
- 不要默认假设一定能联网、能下载、能写文件。

所以它的工作流是：

1. 先补齐缺口。
2. 再产出阶段性 artifact。
3. 再确认高风险决策。
4. 最后才进入 HTML。

一句话概括就是：

先把演示逻辑做对，再把页面做出来。

## 更新日志

### 2026-04-14

- 正式定义了 Workbench 方向，把 `deck_model.json` 设为未来画布编辑的统一真源。
- 增加了 Workbench 架构与同步规范，明确 Canvas、Inspector、Outline、Sync Engine、Preview / Export 的职责。
- 增加了可运行的 `workbench/` 原型，支持更像 PPT 的画布编辑、吸附线、快捷键、更多元素类型和 artifact 导出。
- 增加了双编辑模式：
  - `Deck Mode`：基于 `deck_model.json` 做对象化编辑
  - `HTML Mode`：直接打开兼容的 HTML deck，在渲染结果上修改
- 增加了 `HTML Direct Mode v1`：可以打开已有成品 deck，选中文本或图片节点，在 Inspector 里直接改，并导出修改后的源 HTML。
- 增加了受控 HTML 导入导出，输出稳定的 `data-*` 标记和内嵌 model JSON。
- 增加了更强的 PPT 文案约束，减少与主旨无关的句子、PPT 腔和低信号装饰语。
- 增加了大字号纪律：不要靠缩小字号硬塞内容；装不下就拆页或删弱文案。
- 扩展了 pre-HTML QA，增加对文案相关性、标题质量和文字密度的检查。
- 增加了修改请求路由规则，收到修改指令时先判断改的是结构、文案、图表、配图、样式还是导出行为，再去编辑对应上游 artifact。
- 增加了 `style_system.json`，用来承接字体、颜色、间距、页面家具和图表样式的修改。
- 增加了规则：除非是实现层 hotfix，或根本没有可用上游 artifact，否则不要先改 `index.html`。

### 2026-04-13

- 收紧了 `basic` 和 `advanced` 的执行语义，默认按严格步骤运行。
- 增加硬规则：像“继续”这种泛化指令，不视为跳过 blocking checkpoint 的许可。
- 只有用户显式说明跳过某个确认点，或显式要求 end-to-end 无确认执行时，才允许跳步。

### 2026-04-11

- 增加了 Slidev-inspired 的 `deck.md` 草稿输入层，会先编译成 `deck_source.json` 再进入正常 deck 流程。
- 增加了 source normalization，支持 PDF、DOCX、EPUB、HTML、LaTeX、普通网页、高摩擦网页等先转成 markdown。
- 增加了 `source-to-scenes` 预拆解，让长文或长资料先压成可能的 slide groups，再进入正式主题拆解。
- 增加了 pre-HTML QA，在落静态 HTML 前检查页序、标题层级、页级 thesis、缺图和 fallback 链接。
- 增加了 reference search pack，把英文高信号站点和中文 PPT 站点整理成可复用搜索集。
- 增加了 visualization layer，让 `basic` 和 `advanced` 可以先规划图表、流程图、信息图和 KPI 卡，再进入 HTML。
- 明确 `quick` 不做图表层，保持快速起稿路线轻量稳定。

### 2026-04-10

- 去掉了开源版对私有 workspace 结构的默认依赖，改成 conversation-first artifact 策略。
- 增加了无浏览、无下载能力时的正式 fallback，避免 `advanced` 假装已经联网执行。
- 分离了运行时规则和维护者规则，把稳定规则直接写进主 skill 文档。
- 增加了中英双语 README。

### 2026-04-06

- 把 PPTX 导出路线收敛成 screenshot-only workflow。
- 明确 HTML 仍是 source of truth，PPTX 是保真交付格式。

## 模式结构

这个 skill 保留三种模式：

1. `quick`
   适合 MVP、快速原型、先跑起来再升级的需求。
2. `basic`
   适合先确认主题拆解，再确认脚本和图片方案，最后再落 HTML。
3. `advanced`
   适合更强的设计锁定、更完整的参考图流程、静态优先以及后续可选的动态补全。

额外支持的能力包括：

- 创作者导向的风格推荐
- 结构化设计约束
- 页级关键词提取与搜图
- 图片下载失败时的链接 fallback
- 可选 artifact：`deck_brief.md`、`theme_breakdown.md`、`deck_script.md`、`image_plan.md`、`index.html`
- 可选 `visual_plan.md`，用于图表、图解、信息图、KPI 卡规划
- 可选 `deck.md` 输入和 `deck_source.json`
- 可选 `deck_model.json`，作为工作台编辑真源
- 可选导出目标：`html`、`pptx`、`both`
- 可选 `deck_manifest.json`，给 PPTX 导出 companion skill 使用

## 工作流怎么走

高层流程是这样的：

1. 先接收主题、受众、上下文和已有素材。
2. 如果输入来自 PDF、DOCX、EPUB、HTML、LaTeX 或网页，先规整成 markdown。
3. 如果素材仍然是长文，先做 source-to-scenes 预拆解。
4. 判断输入是普通结构化输入，还是 `deck.md` 草稿。
5. 如果有 `deck.md`，先编译成 `deck_source.json`。
6. 判断缺的是结构、风格、参考、脚本还是图片。
7. 路由到 `quick`、`basic` 或 `advanced`。
8. 先产出阶段性 artifact，再进入最终 HTML。
9. 在 `basic` 和 `advanced` 中，需要时先规划图表、图解和信息图。
10. 对高风险步骤设置明确确认点。
11. 在 HTML 前跑一轮轻量 QA。
12. 先落静态 HTML。
13. 如果需要 PPTX，再通过 `deck_manifest.json` 交给 companion skill。
14. 动效永远是后续阶段，不抢在前面做。

## 开源版的安全默认值

### 不硬编码目录结构

开源版不假设你一定有 `20_Projects/` 这种目录。
如果当前环境没有明显兼容的项目结构，就默认把 artifact 先保留在对话里，只有用户明确要求落地时才写文件。

### 不强依赖本地文风文件

如果本地有写作风格相关文件，可以扫描类似下面这些：

- `voice_profile.md`
- `brand.md`
- `writing_style.md`
- 项目笔记

这些都只是提示信息，不是硬依赖。

### 不强依赖联网搜索

如果能联网，`advanced` 可以去找真实参考图。
如果不能联网，就直接根据：

- 已选风格方向
- 用户提供的参考或灵感
- 主题与受众

来生成结构化设计约束，而不是假装已经搜过图。

### 不强依赖图片下载

如果能下载，就把选中的图片放进 `assets/`。
如果不能下载或下载失败，就记录原图链接或搜索词，并明确告诉用户哪些图需要手动处理。

## 资料规整层

这个包支持从还没长成 deck 的资料开始：

- 先把文档或网页规整成 markdown。
- 如果结果仍是长文，再先拆成潜在 scenes。
- 从这些 markdown 里提取 deck thesis 和可能的页面组。
- 然后再喂给 `quick`、`basic` 或 `advanced`。

推荐适配器映射：

- PDF -> `pdf_to_md.py`
- DOCX / EPUB / HTML / LaTeX -> `doc_to_md.py`
- 普通网页 -> `web_to_md.py`
- 高摩擦网页，如微信页 -> `web_to_md.cjs`

这是一层上游规划能力，不是渲染层。最终演示输出仍然是 HTML。

## 参考图搜索集

开源版现在内置了一套参考图搜索集，减少“随便搜图、结果很飘”的问题。

全局来源：

- Behance
- Dribbble
- SlideShare
- Pitch

中文来源：

- 优品PPT
- OfficePLUS
- Docer
- 51PPT
- 站酷
- iSlide

它的作用不是替你自动完成设计，而是让参考锁定更可复用、更稳定。

## 轻量 QA

在非 trivial 的流程里，静态 HTML 落地前可以先跑一轮轻量 QA。

它重点检查：

- 页序是否连贯
- 标题层级是否一致
- 是否缺图或缺 fallback 链接
- 每页是否有明确 thesis
- 文案是否真的服务于页面主旨
- 文字是否过密，已经不适合演示

这一步故意保持轻量，目的是在实现硬化前抓住最常见的 deck 结构问题。

## Workbench

仓库现在已经带有一个可运行的 `workbench/` 原型，目标是提供更像 PPT 的编辑体验。

当前方向是：

- `Deck Mode`：编辑 `deck_model.json`，以对象模型为核心
- `HTML Mode`：直接打开兼容的 HTML deck，在渲染页面上做改动
- 支持更像 PPT 的元素和样式编辑，而不是让用户直接想 CSS
- 可以从当前模型导出这些上游 artifact：
  - `deck_brief.md`
  - `theme_breakdown.md`
  - `deck_script.md`
  - `visual_plan.md`
  - `image_plan.md`
  - `qa_report.md`
  - `style_system.json`
  - `deck_manifest.json`

它现在还是作者工具原型，不是完整生产级编辑器，但已经能覆盖三类很实际的场景：

- 更快地调布局
- 用 PPT 式的方式改文字、颜色、间距和图层
- 在不打碎原始页面结构的前提下，直接修已有 HTML deck

## 修改路由

- 改结构，优先改 `theme_breakdown.md`
- 改文案，优先改 `deck_script.md`
- 改图表或信息图，优先改 `visual_plan.md`
- 改配图，优先改 `image_plan.md`
- 改样式，比如字号、颜色、间距、页眉页脚、进度条，优先改 `style_system.json`
- 改导出行为，优先改 `deck_manifest.json`
- `index.html` 默认是下游渲染结果，不是第一编辑入口；除非是实现层 hotfix

## PPTX 导出路线

这个项目故意把 HTML 创作和 PPTX 交付分开：

- `ppt-as-code` 负责主题、风格、脚本、配图和静态 HTML
- `pptx-export-for-ppt-as-code` 负责读取 `index.html`、`deck_manifest.json` 和 `assets/`
- 每一页都从稳定的 HTML 渲染状态导出为截图
- PowerPoint 被当作保真交付容器，不是原生重建目标
- 动效仍然只属于 HTML

## 包结构

```text
ppt-as-code-open/
|-- SKILL.md
|-- README.md
|-- README-zh.md
|-- LICENSE
|-- CONTRIBUTING.md
|-- agents/
|   `-- openai.yaml
|-- references/
|   |-- quick-mode.md
|   |-- basic-mode.md
|   |-- advanced-mode.md
|   |-- visual-and-images.md
|   |-- visualization-layer.md
|   |-- visualization-engines.md
|   |-- reference-search-pack.md
|   |-- component-libraries.md
|   |-- source-normalization.md
|   |-- source-to-scenes.md
|   |-- quality-checker.md
|   |-- deck-dsl.md
|   |-- deck-source-contract.md
|   |-- change-routing.md
|   |-- style-system-contract.md
|   |-- deck-model-contract.md
|   |-- workbench-architecture.md
|   |-- workbench-sync.md
|   |-- pptx-export-handoff.md
|   `-- evolution-log.md
|-- companion-skills/
|   `-- pptx-export-for-ppt-as-code/
|       |-- SKILL.md
|       |-- agents/
|       |   `-- openai.yaml
|       `-- references/
|           |-- manifest-contract.md
|           `-- rendering-rules.md
|-- workflows/
|   |-- mode-delivery.md
|   `-- evolution-writeback.md
`-- workbench/
    |-- index.html
    |-- styles.css
    |-- app.js
    |-- deck_model.sample.json
    `-- README.md
```

## 安装说明

这个文件夹名是 `ppt-as-code-open`，是为了避免和私有本地版本冲突。

如果你想把它作为标准包发布或安装：

1. 需要时把目录重命名为 `ppt-as-code`
2. 保持 `SKILL.md` 里的 skill 名仍为 `ppt-as-code`
3. 在你自己的 skill 目录中安装，或直接从这个目录发布

## 提示词示例

### Quick

```text
Use ppt-as-code to help me build a fast HTML deck about AI workflow design for product teams.
I want something lightweight and stage-like, not a long article.
Start with a quick mode route.
```

### Basic

```text
Use ppt-as-code to help me build a presentation about why AI-native teams need new operating habits.
I have rough notes but no clear structure or style yet.
Please use a basic workflow and confirm the breakdown before writing HTML.
```

### Advanced

```text
Use ppt-as-code to build a premium HTML deck about AI product differentiation.
I want stronger design direction and a static-first workflow.
If browsing is available, give me real presentation references.
If not, synthesize the design constraints directly from the style direction.
```

## 维护与贡献

这个包把运行时规则和维护者规则分开了。

维护和贡献相关内容见：

- [README.md](./README.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [workflows/evolution-writeback.md](./workflows/evolution-writeback.md)
- [references/evolution-log.md](./references/evolution-log.md)

维护原则很简单：

稳定规则应当回写进主文档，而不是长期堆在日志里。
