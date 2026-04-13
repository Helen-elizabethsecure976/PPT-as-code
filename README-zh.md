# PPT as Code

deck.md 说明：这份开源版现在支持一个 Slidev-inspired 的 `deck.md` 草稿输入层。它只是更顺手的起稿方式，不是 Slidev 兼容模式，也不会引入 Slidev runtime。

PPTX 导出说明：这份开源版现在包含一条可选的 `PPTX export` 后处理路线。先锁定静态 HTML deck，再通过 `deck_manifest.json` 交给 companion skill 导出 `.pptx`。

中文说明。英文版请看 [README.md](./README.md)。

`PPT as Code` 是一个面向内容创作者和产品表达场景的 HTML 演示文稿 skill。

它不是把“网页”和“PPT”硬拼在一起，而是把一套真正适合演示的工作流结构化出来：

- 先锁主题和结构
- 再锁风格和脚本
- 再处理图片和页面节奏
- 最后再落成 HTML

## 更新日志

### 2026-04-14

- 新增更强的 PPT 文案约束，要求删除与页主旨无关的句子、装饰性废话和空泛的 PPT 腔元语言。
- 新增大字号纪律：不允许靠缩小字号硬塞内容；如果一页装不下，就拆页或删弱文案。
- 扩展 pre-HTML QA，正式检查文案相关性、标题质量和文字密度，避免小字页和废话页进入最终 HTML。

### 2026-04-13

- 收紧了 `basic` 和 `advanced` 的执行语义，默认按严格分步流程运行。
- 新增硬规则：像“继续”这类泛化指令，不视为跳过 blocking checkpoint 的许可。
- 只有用户显性说明跳过某个确认点，或显性要求 end-to-end 无确认执行时，才允许跳步。

### 2026-04-11

- 新增 Slidev-inspired 的 `deck.md` 草稿输入层，会先编译成 `deck_source.json` 再进入正常 deck 流程。
- 新增 source normalization，支持 PDF、DOCX、EPUB、HTML、LaTeX、普通网页、微信页这类材料先转成 markdown。
- 新增 `source-to-scenes` 预拆解，让长文或长材料先压成可能的 slide groups，再进入正式的主题拆解。
- 新增 pre-HTML QA，在落静态 HTML 前检查页序、标题层级、page thesis、缺图和 fallback 链接。
- 新增 reference search pack，把 Behance、Dribbble、SlideShare、Pitch 以及中文 PPT 网站整理成可复用搜索集。
- 新增 visualization layer，让 `basic` 和 `advanced` 可以提前规划图表、流程图、信息图和 KPI 卡。
- 明确 `quick` 不做图表层，保持快速起稿路线的轻量和稳定。
- 同步更新开源版文档，明确这些新增中间层和产物契约。

### 2026-04-10

- 去掉开源版对私有 workspace 结构的默认依赖，改成 conversation-first artifact 策略。
- 增加无浏览、无下载时的正式 fallback，让 `advanced` 不会因为环境能力不足而卡住。
- 把 runtime 规则和 maintainer 规则分开，稳定规则直接写进主 skill 文档。
- 新增中英双语 README，方便公开发布和协作。

### 2026-04-06

- 把 PPTX 导出路线收敛成 screenshot-only workflow。
- 删除可编辑混合导出、模板重建等过度承诺。
- 明确 HTML 仍然是 source of truth，PPTX 是保真交付格式。

## 这个 Skill 的优点

- 更像做一套演示，而不是拼一篇网页长文。
- 不会一上来就乱写代码，先把关键决策锁住。
- 轻模式也有视觉方向，不会只给你一个技术骨架。
- 搜图是按每一页的核心判断来做，不是按整套 deck 大主题瞎搜。
- 没有网络、不能下载图片、不能写文件时，也不会直接卡死。
- `advanced` 先出静态版，再决定要不要补动态，节奏更稳。
- 现在还内置了一个“参考图搜索集”，把高信号英文站和中文 PPT 站分层整理好了。
- `basic` 和 `advanced` 还能提前规划图表和图形表达，而且这些图表会继承整套 deck 的风格。

## 核心特性

### 1. 三档工作流

- `quick`
  适合最小可用版本、快速原型、先跑起来再升级。
- `basic`
  适合先确认主题拆解，再确认脚本，再确认图片方案，最后再落 HTML。
- `advanced`
  适合更强的视觉锁定、更完整的参考图流程、静态优先、后续可补动态。

### 2. 默认对话优先

开源版默认不会假设你的仓库里一定能写文件。

它会先在对话中产出这些阶段性内容：

- brief
- 主题拆解
- 风格选项
- 脚本
- 图片方案
- HTML 路线或静态结果

只有在下面两种情况下，才建议把这些内容真正写进仓库：

- 用户明确要求落地成文件
- 当前仓库结构明显适合这种文件化工作流

### 3. 有网络就增强，没网络也能继续

如果环境支持浏览：

- `advanced` 可以先找 3 个真实 PPT / slide design 参考图
- 可以按页搜索图片
- 可以做更完整的参考图驱动流程

如果环境不支持浏览：

- 不会卡在“必须先搜到参考图”
- 会直接根据风格词、用户给的灵感和主题，生成 structured design constraints
- 会给搜索词和图片意图，而不是假装已经搜过图

### 4. 图片逻辑是按页走，不是按主题走

这个 skill 不会拿整套 deck 的大主题直接搜图。

它会先：

1. 压出这一页到底想说什么
2. 提炼这页自己的关键词
3. 再拿关键词加风格方向去搜

关键词规则：

- `basic`：每页 1 到 2 个关键词
- `advanced`：每页 3 到 4 个关键词

### 5. 动态是第二阶段，不是默认第一阶段

在 `advanced` 里，动态效果不是默认先做。

顺序是：

1. 先锁风格
2. 先锁脚本和图片
3. 先出静态 HTML
4. 用户确认后，再决定要不要补动态

这样能避免很多“动画先飞起来了，但内容和结构其实还没锁”的问题。

## 原理很简单

这个 skill 的底层原理，其实就几条：

- 不要过早锁定最终页面
- 不要把“网页排版”误当成“演示设计”
- 不要用整套 deck 的大主题去粗暴搜图
- 不要把高风险决策混成一步做完
- 不要把网络能力、下载能力、写文件能力当成理所当然

所以它的流程设计是：

1. 先补缺口
2. 再做阶段性产物
3. 再确认高风险决策
4. 最后才进入 HTML

如果你把它理解成一句话，就是：

先把演示逻辑做对，再把页面做出来。

## 它适合什么场景

- 想用 HTML 做 stage-like 演示的人
- 想把 deck workflow 结构化的人
- 有 rough notes，但没有清晰拆解和风格方向的人
- 想先锁静态版，再决定要不要补动画的人
- 想把图片逻辑做得更贴页，而不是更花哨的人

## Package 结构

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
`-- workflows/
    |-- mode-delivery.md
    `-- evolution-writeback.md
```

## PPTX Export Route

- `ppt-as-code` 继续负责主题、风格、脚本、图片和静态 HTML。
- `pptx-export-for-ppt-as-code` 负责读取 `index.html`、`deck_manifest.json` 和 `assets/`，然后输出 `output.pptx`。
- 简单页优先走可编辑 PPT 元素，复杂页允许整页截图 fallback。
- 动效仍然只属于 HTML，不强行翻译成 PowerPoint 动画。

## 三种模式分别会给什么

### Quick

一般会给你：

- 轻量 brief
- 3 到 4 个风格方向
- 一个推荐方向
- 最小 slide 结构
- 一个最小 HTML 路线或 prompt pack

### Basic

一般会给你：

- brief
- 主题拆解
- 风格选项
- 确认过的脚本
- 图片方案
- 静态 HTML

### Advanced

一般会给你：

- brief
- 风格选项
- 参考图分支或无网络 fallback
- structured design constraints
- 确认过的脚本
- 图片方案
- 静态 HTML
- 可选的动态补全

## 文件落地策略

开源版是保守的。

它默认不假设自己可以直接写你的仓库。

默认行为是：

- 先在对话里输出阶段性内容
- 只有用户明确要求、或者仓库结构明显支持时，才真正写出这些文件

可能写出的文件包括：

- `deck_brief.md`
- `theme_breakdown.md`
- `style_options.md`
- `deck_script.md`
- `image_plan.md`
- `index.html`
- `assets/`

## 网络与下载策略

### 能浏览时

它可以：

- 在 `advanced` 里找 3 个参考图
- 按页搜图
- 用真实参考图锁视觉方向

### 不能浏览时

它会：

- 跳过 web reference 分支
- 直接根据风格词和用户灵感生成 structured design constraints
- 给出搜索词、图片意图和实现约束

### 不能下载时

它会：

- 保留图片链接或搜索字符串
- 标记为需要手动下载
- 不让整个流程卡住

## 参考图搜索集

这份开源版现在内置了一个参考图搜索集，用来减少“随便搜图、结果很飘”的问题。

英文高信号来源：

- Behance
- Dribbble
- SlideShare
- Pitch

中文来源：

- 优品PPT
- OfficePLUS
- 稻壳儿 / Docer
- 51PPT模板网
- 站酷
- iSlide

它们的职责不完全一样：

- Behance / Dribbble 更适合锁视觉方向
- SlideShare / Pitch 更适合看真实 deck 节奏
- 中文 PPT 站更适合补中文办公场景、汇报场景和本地视觉语境

## 图表与图形层

这份开源版现在把图表和图形表达也接进了正式工作流，但只在 `basic` 和 `advanced` 中启用。

- `quick` 不做图表层，避免把快速版拖重。
- `basic` 和 `advanced` 会先产出 `visual_plan.md`，再进入最终 HTML。
- 每一页会先判断它到底更适合：
  - `text-led`
  - `image-led`
  - `chart-led`
  - `diagram-led`
  - `card-led`
- 当前第一批接入的图形引擎是：
  - `vega`
  - `infographic`
  - `infocard`
  - `mermaid`
  - `architecture`
- 图表放置位置也会提前规划，而不是到 HTML 阶段临时塞。
- 所有图表和图形都必须继承 deck 的设计风格，而不是各自长成另一套系统。

## 示例 Prompt

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

这份开源版把“运行时文档”和“维护者文档”分开了。

如果你想看维护规则，可以继续看：

- [README.md](./README.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [workflows/evolution-writeback.md](./workflows/evolution-writeback.md)
- [references/evolution-log.md](./references/evolution-log.md)

维护原则很简单：

稳定规则，直接写回主文档。
不要长期堆在 log 里。
