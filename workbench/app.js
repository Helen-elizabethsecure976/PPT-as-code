const BASE_WIDTH = 1600;
const BASE_HEIGHT = 900;
const SNAP_THRESHOLD = 12;

const TEXTUAL_TYPES = new Set(["text", "bullets", "quote", "stat", "card", "container"]);
const VARIANT_OPTIONS = {
  text: ["body", "title", "caption"],
  bullets: ["body", "caption"],
  quote: ["body", "title"],
  stat: ["metric", "title"],
  card: ["body", "metric", "title"],
  image: ["hero", "support"],
  shape: ["decorative", "divider"],
  container: ["frame", "panel"],
  chart: ["chart"],
  diagram: ["diagram"],
};

const HTML_DIRECT_EDITABLE_SELECTORS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "li",
  "blockquote",
  "strong",
  ".stat-number",
  ".stat-label",
  ".closing-point",
  ".summary-card-label",
  ".summary-card-text",
  ".compare-tag",
  ".annotation-source",
  ".annotation-seq",
  "img",
].join(", ");

const UI_I18N = {
  en: {
    documentTitle: "PPT as Code Workbench",
    wbTitle: "PPT as Code Visual Editor",
    wbSubtitle: "Deck-first canvas editing with controlled HTML round-trip.",
    modeDeckBtn: "Deck Mode",
    modeHtmlBtn: "HTML Mode",
    importHtmlDirectBtn: "Open HTML Direct",
    langToggle: "中文",
    newSlideBtn: "New Slide",
    deleteSlideBtn: "Delete Slide",
    addElementBtn: "Add Element",
    duplicateBtn: "Duplicate",
    deleteBtn: "Delete",
    layerUpBtn: "Bring Forward",
    layerDownBtn: "Send Backward",
    exportModelBtn: "Export Model",
    exportArtifactsBtn: "Export Artifacts",
    exportHtmlBtn: "Export HTML",
    importModelBtn: "Import Model",
    importHtmlBtn: "Import HTML",
    slidesHeading: "Slides",
    slidesNote: "Select a slide to work on. The HTML exporter includes stable data markers for round-trip import.",
    elementsHeading: "Elements",
    elementsNote: "Elements are object-based, like PPT, not free DOM fragments.",
    shortcutsHeading: "Shortcuts",
    shortcutsNote: "Delete, Cmd/Ctrl+D duplicate, Cmd/Ctrl+C copy, Cmd/Ctrl+V paste, arrows move, Shift+arrows move faster.",
    syncPrefix: "Sync",
    deckStyleHeading: "Deck Style",
    deckTitleLabel: "Deck Title",
    bodyFontLabel: "Body Font",
    displayFontLabel: "Display Font",
    bgColorLabel: "Background",
    fgColorLabel: "Foreground",
    accentColorLabel: "Accent",
    mutedColorLabel: "Muted",
    inspectorHeading: "Element Inspector",
    inspectorEmpty: "Select an element on the canvas.",
    elTypeLabel: "Type",
    elVariantLabel: "Variant",
    elTextLabel: "Text / Lines",
    elSrcLabel: "Image URL",
    elXLabel: "X",
    elYLabel: "Y",
    elWLabel: "W",
    elHLabel: "H",
    elSizeLabel: "Font Size",
    elWeightLabel: "Weight",
    elAlignLabel: "Align",
    elVAlignLabel: "Vertical",
    elLineHeightLabel: "Line Height",
    elLetterSpacingLabel: "Letter Spacing",
    elParagraphSpacingLabel: "Paragraph Space",
    elPaddingLabel: "Padding",
    elColorLabel: "Text",
    elFillLabel: "Fill",
    elBorderColorLabel: "Border",
    elAccentLabel: "Accent",
    elBorderWidthLabel: "Border W",
    elRadiusLabel: "Radius",
    elShapeVariantLabel: "Shape Variant",
    elAppearanceLabel: "Appearance",
    elListStyleLabel: "List Style",
    elFitLabel: "Image Fit",
    elSyncLabel: "sync_status",
    invalidModelJson: "Invalid model JSON.",
    invalidHtmlImport: "Could not import HTML. Use a ppt-as-code generated deck, a compatible exported HTML file, or a reveal.js deck.",
    atLeastOneSlide: "At least one slide is required.",
    untitledDeck: "Untitled Deck",
    newSlideTitle: "New Slide {count}",
    importedSlideTitle: "Imported Slide {count}",
    elementsCount: "{count} elements",
    layerLabel: "layer {count}",
    metricFallback: "Metric",
    cardFallback: "Card",
    imageLabel: "Image",
    imagePlaceholder: "Image placeholder",
    containerFallback: "Container",
    placeholderSuffix: "placeholder",
    typeElementFallback: "{type} element",
    role_cover: "cover",
    role_content: "content",
    role_compare: "compare",
    role_data: "data",
    role_quote: "quote",
    role_divider: "divider",
    type_text: "Text",
    type_bullets: "Bullets",
    type_quote: "Quote",
    type_stat: "Stat",
    type_card: "Card",
    type_image: "Image",
    type_shape: "Shape",
    type_container: "Container",
    type_diagram: "Diagram",
    type_chart: "Chart",
    value_body: "body",
    value_title: "title",
    value_caption: "caption",
    value_metric: "metric",
    value_hero: "hero",
    value_support: "support",
    value_decorative: "decorative",
    value_divider: "divider",
    value_frame: "frame",
    value_panel: "panel",
    value_chart: "chart",
    value_diagram: "diagram",
    value_left: "left",
    value_center: "center",
    value_right: "right",
    value_start: "start",
    value_end: "end",
    value_rect: "rect",
    value_rounded: "rounded",
    value_pill: "pill",
    value_circle: "circle",
    value_line: "line",
    value_arrow: "arrow",
    value_plain: "plain",
    value_outlined: "outlined",
    value_filled: "filled",
    value_soft: "soft",
    value_glass: "glass",
    value_disc: "disc",
    value_dash: "dash",
    value_decimal: "decimal",
    value_cover: "cover",
    value_contain: "contain",
    value_synced: "synced",
    value_needs_review: "needs_review",
    value_html_only_override: "html_only_override",
  },
  zh: {
    documentTitle: "PPT as Code 工作台",
    wbTitle: "PPT as Code 可视化编辑器",
    wbSubtitle: "以 deck 为真源的画布编辑，并支持受控 HTML 往返导入。",
    langToggle: "EN",
    newSlideBtn: "新建页",
    deleteSlideBtn: "删除页",
    addElementBtn: "新增元素",
    duplicateBtn: "复制",
    deleteBtn: "删除",
    layerUpBtn: "上移一层",
    layerDownBtn: "下移一层",
    exportModelBtn: "导出模型",
    exportArtifactsBtn: "导出产物",
    exportHtmlBtn: "导出 HTML",
    importModelBtn: "导入模型",
    importHtmlBtn: "导入 HTML",
    slidesHeading: "页面",
    slidesNote: "选择一页开始编辑。HTML 导出会带稳定的 data 标记，便于再导回工作台。",
    elementsHeading: "元素",
    elementsNote: "元素是对象模型，像 PPT 一样，不是随意拼接的 DOM 片段。",
    shortcutsHeading: "快捷键",
    shortcutsNote: "Delete 删除，Cmd/Ctrl+D 复制，Cmd/Ctrl+C 复制元素，Cmd/Ctrl+V 粘贴，方向键移动，Shift+方向键快速移动。",
    syncPrefix: "同步",
    deckStyleHeading: "整套样式",
    deckTitleLabel: "Deck 标题",
    bodyFontLabel: "正文字体",
    displayFontLabel: "展示字体",
    bgColorLabel: "背景",
    fgColorLabel: "前景",
    accentColorLabel: "强调色",
    mutedColorLabel: "弱化色",
    inspectorHeading: "元素检查器",
    inspectorEmpty: "先在画布上选中一个元素。",
    elTypeLabel: "类型",
    elVariantLabel: "变体",
    elTextLabel: "文本 / 行内容",
    elSrcLabel: "图片链接",
    elXLabel: "X",
    elYLabel: "Y",
    elWLabel: "宽",
    elHLabel: "高",
    elSizeLabel: "字号",
    elWeightLabel: "字重",
    elAlignLabel: "对齐",
    elVAlignLabel: "垂直对齐",
    elLineHeightLabel: "行高",
    elLetterSpacingLabel: "字距",
    elParagraphSpacingLabel: "段距",
    elPaddingLabel: "内边距",
    elColorLabel: "文字色",
    elFillLabel: "填充",
    elBorderColorLabel: "边框",
    elAccentLabel: "强调色",
    elBorderWidthLabel: "边框宽",
    elRadiusLabel: "圆角",
    elShapeVariantLabel: "形状变体",
    elAppearanceLabel: "外观",
    elListStyleLabel: "列表样式",
    elFitLabel: "图片适配",
    elSyncLabel: "同步状态",
    invalidModelJson: "模型 JSON 无法解析。",
    invalidHtmlImport: "HTML 导入失败。请使用 ppt-as-code 导出的 deck、兼容导出的 HTML，或 reveal.js 风格的 deck。",
    atLeastOneSlide: "至少要保留一页。",
    untitledDeck: "未命名 Deck",
    newSlideTitle: "新页面 {count}",
    importedSlideTitle: "导入页面 {count}",
    elementsCount: "{count} 个元素",
    layerLabel: "第 {count} 层",
    metricFallback: "指标",
    cardFallback: "卡片",
    imageLabel: "图片",
    imagePlaceholder: "图片占位",
    containerFallback: "容器",
    placeholderSuffix: "占位",
    typeElementFallback: "{type} 元素",
    role_cover: "封面",
    role_content: "内容",
    role_compare: "对比",
    role_data: "数据",
    role_quote: "引言",
    role_divider: "分隔",
    type_text: "文本",
    type_bullets: "列表",
    type_quote: "引用",
    type_stat: "数据卡",
    type_card: "卡片",
    type_image: "图片",
    type_shape: "形状",
    type_container: "容器",
    type_diagram: "图解",
    type_chart: "图表",
    value_body: "正文",
    value_title: "标题",
    value_caption: "说明",
    value_metric: "指标",
    value_hero: "主图",
    value_support: "辅助",
    value_decorative: "装饰",
    value_divider: "分隔",
    value_frame: "框架",
    value_panel: "面板",
    value_chart: "图表",
    value_diagram: "图解",
    value_left: "左对齐",
    value_center: "居中",
    value_right: "右对齐",
    value_start: "顶部",
    value_end: "底部",
    value_rect: "直角",
    value_rounded: "圆角",
    value_pill: "胶囊",
    value_circle: "圆形",
    value_line: "线条",
    value_arrow: "箭头",
    value_plain: "基础",
    value_outlined: "描边",
    value_filled: "填充",
    value_soft: "柔和",
    value_glass: "玻璃",
    value_disc: "圆点",
    value_dash: "横线",
    value_decimal: "数字",
    value_cover: "铺满",
    value_contain: "完整显示",
    value_synced: "已同步",
    value_needs_review: "待复核",
    value_html_only_override: "仅 HTML 覆盖",
  },
};

const LOCALIZED_TEXT_IDS = {
  "wb-title": "wbTitle",
  "wb-subtitle": "wbSubtitle",
  "new-slide-btn": "newSlideBtn",
  "delete-slide-btn": "deleteSlideBtn",
  "add-element-btn": "addElementBtn",
  "duplicate-el-btn": "duplicateBtn",
  "delete-el-btn": "deleteBtn",
  "layer-up-btn": "layerUpBtn",
  "layer-down-btn": "layerDownBtn",
  "export-btn": "exportModelBtn",
  "export-artifacts-btn": "exportArtifactsBtn",
  "export-html-btn": "exportHtmlBtn",
  "import-model-label": "importModelBtn",
  "import-html-label": "importHtmlBtn",
  "slides-heading": "slidesHeading",
  "slides-note": "slidesNote",
  "elements-heading": "elementsHeading",
  "elements-note": "elementsNote",
  "shortcuts-heading": "shortcutsHeading",
  "shortcuts-note": "shortcutsNote",
  "sync-prefix": "syncPrefix",
  "deck-style-heading": "deckStyleHeading",
  "deck-title-label-text": "deckTitleLabel",
  "body-font-label-text": "bodyFontLabel",
  "display-font-label-text": "displayFontLabel",
  "bg-color-label-text": "bgColorLabel",
  "fg-color-label-text": "fgColorLabel",
  "accent-color-label-text": "accentColorLabel",
  "muted-color-label-text": "mutedColorLabel",
  "inspector-heading": "inspectorHeading",
  "inspector-empty": "inspectorEmpty",
  "el-type-label-text": "elTypeLabel",
  "el-variant-label-text": "elVariantLabel",
  "el-text-label-text": "elTextLabel",
  "el-src-label-text": "elSrcLabel",
  "el-x-label-text": "elXLabel",
  "el-y-label-text": "elYLabel",
  "el-w-label-text": "elWLabel",
  "el-h-label-text": "elHLabel",
  "el-size-label-text": "elSizeLabel",
  "el-weight-label-text": "elWeightLabel",
  "el-align-label-text": "elAlignLabel",
  "el-v-align-label-text": "elVAlignLabel",
  "el-line-height-label-text": "elLineHeightLabel",
  "el-letter-spacing-label-text": "elLetterSpacingLabel",
  "el-paragraph-spacing-label-text": "elParagraphSpacingLabel",
  "el-padding-label-text": "elPaddingLabel",
  "el-color-label-text": "elColorLabel",
  "el-fill-label-text": "elFillLabel",
  "el-border-color-label-text": "elBorderColorLabel",
  "el-accent-label-text": "elAccentLabel",
  "el-border-width-label-text": "elBorderWidthLabel",
  "el-radius-label-text": "elRadiusLabel",
  "el-shape-variant-label-text": "elShapeVariantLabel",
  "el-appearance-label-text": "elAppearanceLabel",
  "el-list-style-label-text": "elListStyleLabel",
  "el-fit-label-text": "elFitLabel",
  "el-sync-label-text": "elSyncLabel",
};

const state = {
  editorMode: "deck",
  model: createDefaultModel(),
  htmlDirect: createEmptyHtmlDirectState(),
  activeSlideId: "slide_1",
  activeElementId: null,
  drag: null,
  resize: null,
  clipboard: null,
  guides: [],
  listDrag: null,
  uiLang: loadInitialLanguage(),
};

const el = {
  modeDeckBtn: document.getElementById("mode-deck-btn"),
  modeHtmlBtn: document.getElementById("mode-html-btn"),
  langToggleBtn: document.getElementById("lang-toggle-btn"),
  slidesList: document.getElementById("slides-list"),
  elementsList: document.getElementById("elements-list"),
  canvasViewport: document.getElementById("canvas-viewport"),
  slideCanvas: document.getElementById("slide-canvas"),
  htmlDirectFrame: document.getElementById("html-direct-frame"),
  deckTitleLabel: document.getElementById("deck-title-label"),
  slideSizeLabel: document.getElementById("slide-size-label"),
  syncStatusLabel: document.getElementById("sync-status-label"),
  deckTitleInput: document.getElementById("deck-title-input"),
  bodyFontInput: document.getElementById("body-font-input"),
  displayFontInput: document.getElementById("display-font-input"),
  bgColorInput: document.getElementById("bg-color-input"),
  fgColorInput: document.getElementById("fg-color-input"),
  accentColorInput: document.getElementById("accent-color-input"),
  mutedColorInput: document.getElementById("muted-color-input"),
  inspectorEmpty: document.getElementById("inspector-empty"),
  inspectorFields: document.getElementById("inspector-fields"),
  newElementType: document.getElementById("new-element-type"),
  importModelInput: document.getElementById("import-model-input"),
  importHtmlInput: document.getElementById("import-html-input"),
  importHtmlDirectInput: document.getElementById("import-html-direct-input"),
  elTypeInput: document.getElementById("el-type-input"),
  elVariantInput: document.getElementById("el-variant-input"),
  elTextInput: document.getElementById("el-text-input"),
  elSrcInput: document.getElementById("el-src-input"),
  elXInput: document.getElementById("el-x-input"),
  elYInput: document.getElementById("el-y-input"),
  elWInput: document.getElementById("el-w-input"),
  elHInput: document.getElementById("el-h-input"),
  elSizeInput: document.getElementById("el-size-input"),
  elWeightInput: document.getElementById("el-weight-input"),
  elAlignInput: document.getElementById("el-align-input"),
  elVAlignInput: document.getElementById("el-v-align-input"),
  elLineHeightInput: document.getElementById("el-line-height-input"),
  elLetterSpacingInput: document.getElementById("el-letter-spacing-input"),
  elParagraphSpacingInput: document.getElementById("el-paragraph-spacing-input"),
  elPaddingInput: document.getElementById("el-padding-input"),
  elColorInput: document.getElementById("el-color-input"),
  elFillInput: document.getElementById("el-fill-input"),
  elBorderColorInput: document.getElementById("el-border-color-input"),
  elAccentInput: document.getElementById("el-accent-input"),
  elBorderWidthInput: document.getElementById("el-border-width-input"),
  elRadiusInput: document.getElementById("el-radius-input"),
  elShapeVariantInput: document.getElementById("el-shape-variant-input"),
  elAppearanceInput: document.getElementById("el-appearance-input"),
  elListStyleInput: document.getElementById("el-list-style-input"),
  elFitInput: document.getElementById("el-fit-input"),
  elSyncInput: document.getElementById("el-sync-input"),
};

setup();

function setup() {
  wireLanguageToggle();
  wireTopbarActions();
  wireDeckFields();
  wireInspectorFields();
  wireCanvasEvents();
  wireKeyboardShortcuts();
  if (bootstrapFromWindowPreset()) return;
  renderAll();
}

function wireLanguageToggle() {
  el.langToggleBtn?.addEventListener("click", () => {
    state.uiLang = state.uiLang === "zh" ? "en" : "zh";
    try {
      window.localStorage.setItem("ppt-workbench-lang", state.uiLang);
    } catch (error) {
      // Ignore localStorage failures in restricted contexts.
    }
    renderAll();
  });
}

function bootstrapFromWindowPreset() {
  try {
    const bootstrapModel = window.PPT_WORKBENCH_BOOTSTRAP_MODEL;
    if (bootstrapModel && typeof bootstrapModel === "object") {
      setModel(normalizeModel(bootstrapModel));
      return true;
    }

    const bootstrapHtmlRaw = window.PPT_WORKBENCH_BOOTSTRAP_HTML;
    const bootstrapHtml =
      typeof bootstrapHtmlRaw === "string"
        ? bootstrapHtmlRaw
        : bootstrapHtmlRaw && typeof bootstrapHtmlRaw.value === "string"
          ? bootstrapHtmlRaw.value
          : "";
    if (typeof bootstrapHtml === "string" && bootstrapHtml.trim()) {
      const basePath = typeof window.PPT_WORKBENCH_BOOTSTRAP_BASE === "string" ? window.PPT_WORKBENCH_BOOTSTRAP_BASE : "";
      if (window.PPT_WORKBENCH_BOOTSTRAP_DIRECT_MODE === true) {
        loadHtmlDirect(bootstrapHtml, { basePath, fileName: "index.html" });
      } else {
        setModel(importDeckFromHtml(bootstrapHtml, { basePath }));
      }
      return true;
    }
  } catch (error) {
    console.error("Failed to bootstrap workbench preset.", error);
  }
  return false;
}

function loadInitialLanguage() {
  try {
    const saved = window.localStorage.getItem("ppt-workbench-lang");
    if (saved === "en" || saved === "zh") return saved;
  } catch (error) {
    // Ignore storage failures.
  }
  return String(window.navigator?.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";
}

function t(key, vars = {}) {
  const dictionary = UI_I18N[state.uiLang] || UI_I18N.en;
  let value = dictionary[key] ?? UI_I18N.en[key] ?? key;
  Object.entries(vars).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, String(replacement));
  });
  return value;
}

function applyLanguage() {
  document.documentElement.lang = state.uiLang === "zh" ? "zh-CN" : "en";
  document.title = t("documentTitle");

  Object.entries(LOCALIZED_TEXT_IDS).forEach(([id, key]) => {
    const node = document.getElementById(id);
    if (node) node.textContent = t(key);
  });

  if (el.langToggleBtn) el.langToggleBtn.textContent = t("langToggle");
  localizeSelectOptions();
}

function localizeSelectOptions() {
  setSelectOptionLabels(el.newElementType, {
    text: t("type_text"),
    bullets: t("type_bullets"),
    quote: t("type_quote"),
    stat: t("type_stat"),
    card: t("type_card"),
    image: t("type_image"),
    shape: t("type_shape"),
    container: t("type_container"),
    diagram: t("type_diagram"),
    chart: t("type_chart"),
  });

  setSelectOptionLabels(el.elVariantInput, {
    body: t("value_body"),
    title: t("value_title"),
    caption: t("value_caption"),
    metric: t("value_metric"),
    hero: t("value_hero"),
    support: t("value_support"),
    decorative: t("value_decorative"),
    divider: t("value_divider"),
    frame: t("value_frame"),
    panel: t("value_panel"),
    chart: t("value_chart"),
    diagram: t("value_diagram"),
  });

  setSelectOptionLabels(el.elAlignInput, {
    left: t("value_left"),
    center: t("value_center"),
    right: t("value_right"),
  });

  setSelectOptionLabels(el.elVAlignInput, {
    start: t("value_start"),
    center: t("value_center"),
    end: t("value_end"),
  });

  setSelectOptionLabels(el.elShapeVariantInput, {
    rect: t("value_rect"),
    rounded: t("value_rounded"),
    pill: t("value_pill"),
    circle: t("value_circle"),
    line: t("value_line"),
    arrow: t("value_arrow"),
  });

  setSelectOptionLabels(el.elAppearanceInput, {
    plain: t("value_plain"),
    outlined: t("value_outlined"),
    filled: t("value_filled"),
    soft: t("value_soft"),
    glass: t("value_glass"),
    metric: t("value_metric"),
  });

  setSelectOptionLabels(el.elListStyleInput, {
    disc: t("value_disc"),
    dash: t("value_dash"),
    decimal: t("value_decimal"),
  });

  setSelectOptionLabels(el.elFitInput, {
    cover: t("value_cover"),
    contain: t("value_contain"),
  });

  setSelectOptionLabels(el.elSyncInput, {
    synced: t("value_synced"),
    needs_review: t("value_needs_review"),
    html_only_override: t("value_html_only_override"),
  });
}

function setSelectOptionLabels(select, mapping) {
  if (!select) return;
  [...select.options].forEach((option) => {
    option.textContent = mapping[option.value] || option.value;
  });
}

function getTypeLabel(type) {
  return t(`type_${type}`) || type;
}

function getRoleLabel(role) {
  return t(`role_${role}`) || role;
}

function getLocalizedValueLabel(value) {
  return t(`value_${value}`) || value;
}

function wireTopbarActions() {
  el.modeDeckBtn?.addEventListener("click", () => {
    state.editorMode = "deck";
    renderAll();
  });

  el.modeHtmlBtn?.addEventListener("click", () => {
    state.editorMode = "html";
    renderAll();
  });

  document.getElementById("new-slide-btn").addEventListener("click", addSlide);
  document.getElementById("delete-slide-btn").addEventListener("click", deleteSlide);
  document.getElementById("add-element-btn").addEventListener("click", () => addElement(el.newElementType.value));
  document.getElementById("duplicate-el-btn").addEventListener("click", duplicateActiveElement);
  document.getElementById("delete-el-btn").addEventListener("click", deleteActiveElement);
  document.getElementById("layer-up-btn").addEventListener("click", () => moveActiveElementLayer("up"));
  document.getElementById("layer-down-btn").addEventListener("click", () => moveActiveElementLayer("down"));

  document.getElementById("export-btn").addEventListener("click", () => {
    if (state.editorMode === "html") {
      downloadFile(state.htmlDirect.fileName || "index.html", serializeHtmlDirectSource(), "text/html");
      return;
    }
    downloadFile("deck_model.json", JSON.stringify(state.model, null, 2), "application/json");
  });

  document.getElementById("export-artifacts-btn").addEventListener("click", () => {
    if (state.editorMode === "html") return;
    buildArtifactBundle(state.model).forEach((file) => {
      downloadFile(file.name, file.content, file.mime);
    });
  });

  document.getElementById("export-html-btn").addEventListener("click", () => {
    if (state.editorMode === "html") {
      downloadFile(state.htmlDirect.fileName || "index.html", serializeHtmlDirectSource(), "text/html");
      return;
    }
    downloadFile("index.html", renderDeckHtml(state.model), "text/html");
  });

  el.importModelInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setModel(normalizeModel(JSON.parse(await file.text())));
    } catch (error) {
      window.alert(t("invalidModelJson"));
    } finally {
      el.importModelInput.value = "";
    }
  });

  el.importHtmlInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setModel(importDeckFromHtml(await file.text()));
    } catch (error) {
      window.alert(t("invalidHtmlImport"));
    } finally {
      el.importHtmlInput.value = "";
    }
  });

  el.importHtmlDirectInput?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      loadHtmlDirect(await file.text(), { fileName: file.name });
    } catch (error) {
      window.alert(t("invalidHtmlImport"));
    } finally {
      el.importHtmlDirectInput.value = "";
    }
  });
}

function wireDeckFields() {
  el.deckTitleInput.addEventListener("input", () => {
    if (state.editorMode === "html") {
      updateHtmlDirectDocumentTitle(el.deckTitleInput.value || t("untitledDeck"));
      return;
    }
    state.model.deck.title = el.deckTitleInput.value || t("untitledDeck");
    markDirty();
    renderMeta();
  });

  el.bodyFontInput.addEventListener("input", () => {
    if (state.editorMode === "html") return;
    state.model.style_system.typography.font_body = el.bodyFontInput.value || "IBM Plex Sans";
    markDirty();
    renderCanvas();
  });

  el.displayFontInput.addEventListener("input", () => {
    if (state.editorMode === "html") return;
    state.model.style_system.typography.font_display = el.displayFontInput.value || "Space Grotesk";
    markDirty();
    renderCanvas();
  });

  [["bgColorInput", "bg"], ["fgColorInput", "fg"], ["accentColorInput", "accent"], ["mutedColorInput", "muted"]].forEach(
    ([id, key]) => {
      el[id].addEventListener("input", () => {
        if (state.editorMode === "html") {
          updateHtmlDirectRootVariable(key, el[id].value);
          return;
        }
        state.model.style_system.color[key] = el[id].value;
        markDirty();
        renderCanvas();
      });
    }
  );
}

function wireInspectorFields() {
  el.elVariantInput.addEventListener("change", () => updateActiveElement((element) => {
    if (state.editorMode === "html") return;
    element.variant = el.elVariantInput.value;
  }));

  el.elTextInput.addEventListener("input", () => {
    if (state.editorMode === "html") {
      updateHtmlDirectSelectedText(el.elTextInput.value);
      return;
    }
    updateActiveElement((element) => {
      element.text = el.elTextInput.value;
    });
  });

  el.elSrcInput.addEventListener("input", () => {
    if (state.editorMode === "html") {
      updateHtmlDirectSelectedSrc(el.elSrcInput.value);
      return;
    }
    updateActiveElement((element) => {
      element.src = el.elSrcInput.value;
    });
  });

    [["elXInput", "x"], ["elYInput", "y"], ["elWInput", "w"], ["elHInput", "h"]].forEach(([id, key]) => {
      el[id].addEventListener("input", () => {
        if (state.editorMode === "html") {
          updateHtmlDirectGeometry(key, clampNumeric(key, el[id].value, key === "w" ? 320 : key === "h" ? 120 : 0));
          return;
        }
        updateActiveElement((element) => {
          element.geometry[key] = clampNumeric(key, el[id].value, element.geometry[key]);
        });
        constrainActiveGeometry();
      });
  });

  [
    ["elSizeInput", "font_size", 10],
    ["elWeightInput", "font_weight", 400],
    ["elLineHeightInput", "line_height", 1],
    ["elLetterSpacingInput", "letter_spacing", 0],
    ["elParagraphSpacingInput", "paragraph_spacing", 0],
    ["elPaddingInput", "padding", 0],
    ["elBorderWidthInput", "border_width", 0],
    ["elRadiusInput", "border_radius", 0],
  ].forEach(([id, key, minimum]) => {
    el[id].addEventListener("input", () => {
      if (state.editorMode === "html") {
        updateHtmlDirectStyle(key, Math.max(minimum, numeric(el[id].value, minimum)));
        return;
      }
      updateActiveElement((element) => {
        element.style[key] = Math.max(minimum, numeric(el[id].value, element.style[key]));
      });
    });
  });

  [["elAlignInput", "text_align"], ["elVAlignInput", "vertical_align"], ["elShapeVariantInput", "shape_variant"], ["elAppearanceInput", "appearance_preset"], ["elListStyleInput", "list_style"], ["elFitInput", "object_fit"]].forEach(
    ([id, key]) => {
      el[id].addEventListener("change", () => {
        if (state.editorMode === "html") {
          updateHtmlDirectStyle(key, el[id].value);
          return;
        }
        updateActiveElement((element) => {
          element.style[key] = el[id].value;
        });
      });
    }
  );

  [["elColorInput", "color"], ["elFillInput", "fill"], ["elBorderColorInput", "border_color"], ["elAccentInput", "accent"]].forEach(
    ([id, key]) => {
      el[id].addEventListener("input", () => {
        if (state.editorMode === "html") {
          updateHtmlDirectStyle(key, el[id].value);
          return;
        }
        updateActiveElement((element) => {
          element.style[key] = el[id].value;
        });
      });
    }
  );

  el.elSyncInput.addEventListener("change", () => {
    if (state.editorMode === "html") return;
    updateActiveElement((element) => {
      element.sync_status = el.elSyncInput.value;
    });
  });
}

function wireCanvasEvents() {
  el.slideCanvas.addEventListener("mousedown", onCanvasPointerDown);
  el.htmlDirectFrame?.addEventListener("load", bindHtmlDirectFrame);
  window.addEventListener("mousemove", onCanvasPointerMove);
  window.addEventListener("mouseup", onCanvasPointerUp);
  window.addEventListener("resize", renderCanvas);
}

function wireKeyboardShortcuts() {
  window.addEventListener("keydown", (event) => {
    if (isEditingTextField(event.target)) return;
    if (state.editorMode === "html") {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key) && state.htmlDirect.selectedNodeId) {
        event.preventDefault();
        const delta = event.shiftKey ? 10 : 1;
        if (event.key === "ArrowLeft") nudgeHtmlDirectSelection(-delta, 0);
        if (event.key === "ArrowRight") nudgeHtmlDirectSelection(delta, 0);
        if (event.key === "ArrowUp") nudgeHtmlDirectSelection(0, -delta);
        if (event.key === "ArrowDown") nudgeHtmlDirectSelection(0, delta);
      }
      return;
    }

    if (event.key === "Delete" || event.key === "Backspace") {
      if (state.activeElementId) {
        event.preventDefault();
        deleteActiveElement();
      }
      return;
    }

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "d") {
      event.preventDefault();
      duplicateActiveElement();
      return;
    }

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "c") {
      if (!state.activeElementId) return;
      event.preventDefault();
      const element = getActiveElement();
      if (element) state.clipboard = cloneElement(element);
      return;
    }

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "v") {
      if (!state.clipboard) return;
      event.preventDefault();
      pasteClipboardElement();
      return;
    }

    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key) && state.activeElementId) {
      event.preventDefault();
      const delta = event.shiftKey ? 10 : 1;
      updateActiveElement((element) => {
        if (event.key === "ArrowLeft") element.geometry.x -= delta;
        if (event.key === "ArrowRight") element.geometry.x += delta;
        if (event.key === "ArrowUp") element.geometry.y -= delta;
        if (event.key === "ArrowDown") element.geometry.y += delta;
      });
      constrainActiveGeometry();
    }
  });
}

function onCanvasPointerDown(event) {
  const elementNode = event.target.closest(".canvas-element");
  if (!elementNode) {
    state.activeElementId = null;
    state.guides = [];
    renderCanvas();
    renderInspector();
    renderElementsList();
    return;
  }

  const element = getElementById(elementNode.dataset.id);
  if (!element) return;

  state.activeElementId = element.id;
  const scale = getCanvasScale();

  if (event.target.classList.contains("resize-handle")) {
    state.resize = {
      id: element.id,
      startX: event.clientX,
      startY: event.clientY,
      originW: element.geometry.w,
      originH: element.geometry.h,
      scale,
    };
  } else {
    state.drag = {
      id: element.id,
      offsetX: event.clientX / scale - element.geometry.x,
      offsetY: event.clientY / scale - element.geometry.y,
      scale,
    };
  }

  renderCanvas();
  renderInspector();
  renderElementsList();
}

function onCanvasPointerMove(event) {
  const element = state.drag ? getElementById(state.drag.id) : state.resize ? getElementById(state.resize.id) : null;
  if (!element) return;

  if (state.drag) {
    const proposed = {
      x: event.clientX / state.drag.scale - state.drag.offsetX,
      y: event.clientY / state.drag.scale - state.drag.offsetY,
    };
    const snapped = snapDragGeometry(element, proposed);
    element.geometry.x = snapped.x;
    element.geometry.y = snapped.y;
    state.guides = snapped.guides;
  }

  if (state.resize) {
    const proposed = {
      w: Math.max(40, state.resize.originW + (event.clientX - state.resize.startX) / state.resize.scale),
      h: Math.max(28, state.resize.originH + (event.clientY - state.resize.startY) / state.resize.scale),
    };
    const snapped = snapResizeGeometry(element, proposed);
    element.geometry.w = snapped.w;
    element.geometry.h = snapped.h;
    state.guides = snapped.guides;
  }

  constrainGeometry(element);
  markDirty();
  renderCanvas();
  renderInspector();
}

function onCanvasPointerUp() {
  state.drag = null;
  state.resize = null;
  state.guides = [];
  renderCanvas();
}

function addSlide() {
  const id = createId("slide");
  state.model.slides.push({
    id,
    title: t("newSlideTitle", { count: state.model.slides.length + 1 }),
    role: "content",
    z_order: state.model.slides.length + 1,
    elements: [],
    style_refs: { global: true, slide_override_key: id },
    content_refs: {},
    sync_status: "synced",
  });
  state.activeSlideId = id;
  state.activeElementId = null;
  normalizeSlideLayers();
  markDirty();
  renderAll();
}

function deleteSlide() {
  if (state.model.slides.length <= 1) {
    window.alert(t("atLeastOneSlide"));
    return;
  }
  state.model.slides = state.model.slides.filter((slide) => slide.id !== state.activeSlideId);
  normalizeSlideLayers();
  state.activeSlideId = state.model.slides[0]?.id || null;
  state.activeElementId = null;
  markDirty();
  renderAll();
}

function addElement(type) {
  const slide = getActiveSlide();
  if (!slide) return;
  const element = createElementPreset(type, slide.elements.length);
  slide.elements.push(element);
  normalizeElementLayers(slide);
  state.activeElementId = element.id;
  markDirty();
  renderAll();
}

function duplicateActiveElement() {
  const slide = getActiveSlide();
  const element = getActiveElement();
  if (!slide || !element) return;

  const duplicate = cloneElement(element);
  duplicate.id = createId(element.type);
  duplicate.geometry.x += 24;
  duplicate.geometry.y += 24;
  slide.elements.push(duplicate);
  normalizeElementLayers(slide);
  state.activeElementId = duplicate.id;
  markDirty();
  renderAll();
}

function deleteActiveElement() {
  const slide = getActiveSlide();
  if (!slide || !state.activeElementId) return;
  slide.elements = slide.elements.filter((item) => item.id !== state.activeElementId);
  normalizeElementLayers(slide);
  state.activeElementId = null;
  markDirty();
  renderAll();
}

function pasteClipboardElement() {
  const slide = getActiveSlide();
  if (!slide || !state.clipboard) return;
  const duplicate = cloneElement(state.clipboard);
  duplicate.id = createId(duplicate.type || "element");
  duplicate.geometry.x += 28;
  duplicate.geometry.y += 28;
  slide.elements.push(normalizeElement(duplicate, slide.elements.length));
  normalizeElementLayers(slide);
  state.activeElementId = duplicate.id;
  markDirty();
  renderAll();
}

function moveActiveElementLayer(direction) {
  const slide = getActiveSlide();
  const element = getActiveElement();
  if (!slide || !element) return;
  const sorted = [...slide.elements].sort((a, b) => a.layer - b.layer);
  const index = sorted.findIndex((item) => item.id === element.id);
  if (index < 0) return;

  if (direction === "up" && index < sorted.length - 1) {
    const next = sorted[index + 1];
    [element.layer, next.layer] = [next.layer, element.layer];
  }

  if (direction === "down" && index > 0) {
    const prev = sorted[index - 1];
    [element.layer, prev.layer] = [prev.layer, element.layer];
  }

  normalizeElementLayers(slide);
  markDirty();
  renderAll();
}

function updateActiveElement(mutator) {
  const element = getActiveElement();
  if (!element) return;
  mutator(element);
  markDirty();
  renderCanvas();
  renderInspector();
  renderElementsList();
}

function constrainActiveGeometry() {
  const element = getActiveElement();
  if (!element) return;
  constrainGeometry(element);
  renderCanvas();
  renderInspector();
}

function constrainGeometry(element) {
  element.geometry.w = Math.max(40, element.geometry.w);
  element.geometry.h = Math.max(28, element.geometry.h);
  element.geometry.x = clamp(element.geometry.x, 0, BASE_WIDTH - element.geometry.w);
  element.geometry.y = clamp(element.geometry.y, 0, BASE_HEIGHT - element.geometry.h);
}

function snapDragGeometry(element, proposed) {
  const others = getSnapTargets(element.id);
  const elementAnchorsX = [
    { delta: 0 },
    { delta: element.geometry.w / 2 },
    { delta: element.geometry.w },
  ];
  const elementAnchorsY = [
    { delta: 0 },
    { delta: element.geometry.h / 2 },
    { delta: element.geometry.h },
  ];

  const snapX = findBestSnap(proposed.x, elementAnchorsX, others.vertical);
  const snapY = findBestSnap(proposed.y, elementAnchorsY, others.horizontal);

  return {
    x: clamp(snapX.value, 0, BASE_WIDTH - element.geometry.w),
    y: clamp(snapY.value, 0, BASE_HEIGHT - element.geometry.h),
    guides: [
      snapX.guide != null ? { orientation: "vertical", position: snapX.guide } : null,
      snapY.guide != null ? { orientation: "horizontal", position: snapY.guide } : null,
    ].filter(Boolean),
  };
}

function snapResizeGeometry(element, proposed) {
  const others = getSnapTargets(element.id);
  let width = proposed.w;
  let height = proposed.h;
  let guideX = null;
  let guideY = null;

  const rightEdge = element.geometry.x + width;
  const bottomEdge = element.geometry.y + height;

  others.vertical.forEach((target) => {
    const delta = Math.abs(target.position - rightEdge);
    if (delta <= SNAP_THRESHOLD && (guideX == null || delta < Math.abs(guideX - rightEdge))) {
      width = target.position - element.geometry.x;
      guideX = target.position;
    }
  });

  others.horizontal.forEach((target) => {
    const delta = Math.abs(target.position - bottomEdge);
    if (delta <= SNAP_THRESHOLD && (guideY == null || delta < Math.abs(guideY - bottomEdge))) {
      height = target.position - element.geometry.y;
      guideY = target.position;
    }
  });

  return {
    w: clamp(width, 40, BASE_WIDTH - element.geometry.x),
    h: clamp(height, 28, BASE_HEIGHT - element.geometry.y),
    guides: [
      guideX != null ? { orientation: "vertical", position: guideX } : null,
      guideY != null ? { orientation: "horizontal", position: guideY } : null,
    ].filter(Boolean),
  };
}

function getSnapTargets(activeElementId) {
  const slide = getActiveSlide();
  const vertical = [{ position: 0 }, { position: BASE_WIDTH / 2 }, { position: BASE_WIDTH }];
  const horizontal = [{ position: 0 }, { position: BASE_HEIGHT / 2 }, { position: BASE_HEIGHT }];

  if (!slide) return { vertical, horizontal };

  slide.elements
    .filter((item) => item.id !== activeElementId)
    .forEach((item) => {
      vertical.push({ position: item.geometry.x });
      vertical.push({ position: item.geometry.x + item.geometry.w / 2 });
      vertical.push({ position: item.geometry.x + item.geometry.w });
      horizontal.push({ position: item.geometry.y });
      horizontal.push({ position: item.geometry.y + item.geometry.h / 2 });
      horizontal.push({ position: item.geometry.y + item.geometry.h });
    });

  return { vertical, horizontal };
}

function findBestSnap(origin, anchors, targets) {
  let best = { value: origin, guide: null, distance: Infinity };
  anchors.forEach((anchor) => {
    const anchorPosition = origin + anchor.delta;
    targets.forEach((target) => {
      const distance = Math.abs(target.position - anchorPosition);
      if (distance <= SNAP_THRESHOLD && distance < best.distance) {
        best = {
          value: origin + (target.position - anchorPosition),
          guide: target.position,
          distance,
        };
      }
    });
  });
  return best;
}

function renderAll() {
  renderMeta();
  renderSlides();
  renderElementsList();
  renderCanvas();
  renderInspector();
  applyLanguage();
  renderModeControls();
}

function renderMeta() {
  if (state.editorMode === "html") {
    renderHtmlDirectMeta();
    return;
  }
  el.deckTitleLabel.textContent = state.model.deck.title || t("untitledDeck");
  el.slideSizeLabel.textContent = state.model.deck.slide_size;
  el.syncStatusLabel.textContent = getLocalizedValueLabel(state.model.sync_status);
  el.deckTitleInput.value = state.model.deck.title || t("untitledDeck");
  el.bodyFontInput.value = state.model.style_system.typography.font_body;
  el.displayFontInput.value = state.model.style_system.typography.font_display;
  el.bgColorInput.value = normalizeColor(state.model.style_system.color.bg);
  el.fgColorInput.value = normalizeColor(state.model.style_system.color.fg);
  el.accentColorInput.value = normalizeColor(state.model.style_system.color.accent);
  el.mutedColorInput.value = normalizeColor(state.model.style_system.color.muted);
}

function renderModeControls() {
  el.modeDeckBtn?.classList.toggle("is-active", state.editorMode === "deck");
  el.modeHtmlBtn?.classList.toggle("is-active", state.editorMode === "html");

  const disableDeckActions = state.editorMode === "html";
  document.getElementById("new-slide-btn").disabled = disableDeckActions;
  document.getElementById("delete-slide-btn").disabled = disableDeckActions;
  document.getElementById("add-element-btn").disabled = disableDeckActions;
  document.getElementById("duplicate-el-btn").disabled = disableDeckActions;
  document.getElementById("delete-el-btn").disabled = disableDeckActions;
  document.getElementById("layer-up-btn").disabled = disableDeckActions;
  document.getElementById("layer-down-btn").disabled = disableDeckActions;
  document.getElementById("export-artifacts-btn").disabled = disableDeckActions;
  el.newElementType.disabled = disableDeckActions;
}

function renderHtmlDirectMeta() {
  const doc = state.htmlDirect.sourceDoc;
  const title = doc?.title?.trim() || state.htmlDirect.fileName || t("untitledDeck");
  const slideCount = state.htmlDirect.slides.length || 0;
  el.deckTitleLabel.textContent = title;
  el.slideSizeLabel.textContent = `${state.htmlDirect.viewport.width} × ${state.htmlDirect.viewport.height} | ${slideCount} slides`;
  el.syncStatusLabel.textContent = t("value_html_only_override");
  el.deckTitleInput.value = title;
  el.bodyFontInput.value = "";
  el.displayFontInput.value = "";
  el.bgColorInput.value = getHtmlDirectRootVariable("bg", "#070707");
  el.fgColorInput.value = getHtmlDirectRootVariable("text", "#f3f1eb");
  el.accentColorInput.value = getHtmlDirectRootVariable("accent", "#a73a3a");
  el.mutedColorInput.value = getHtmlDirectRootVariable("text-muted", "#a99f96");
}

function renderHtmlDirectSlides() {
  el.slidesList.innerHTML = "";
  state.htmlDirect.slides.forEach((slide, index) => {
    const node = document.createElement("li");
    node.className = `slide-item ${index === state.htmlDirect.activeSlideIndex ? "active" : ""}`;
    node.style.cursor = "pointer";
    node.innerHTML = `
      <p class="slide-item-title">${escapeHtml(slide.title || t("importedSlideTitle", { count: index + 1 }))}</p>
      <div class="slide-item-meta">HTML section | ${escapeHtml(t("elementsCount", { count: slide.editableCount || 0 }))}</div>
    `;
    node.addEventListener("click", () => {
      state.htmlDirect.activeSlideIndex = index;
      state.htmlDirect.selectedNodeId = null;
      state.htmlDirect.needsReload = true;
      renderAll();
    });
    el.slidesList.appendChild(node);
  });
}

function renderHtmlDirectElements() {
  el.elementsList.innerHTML = "";
  const section = getActiveHtmlDirectSection();
  if (!section) return;

  getHtmlDirectEditableNodes(section).forEach((node) => {
    const htmlId = node.dataset.pacHtmlEditableId;
    const item = document.createElement("li");
    item.className = `element-item ${htmlId === state.htmlDirect.selectedNodeId ? "active" : ""}`;
    item.style.cursor = "pointer";
    item.dataset.elementId = htmlId;
    item.innerHTML = `
      <p class="element-item-title">${escapeHtml(getHtmlDirectNodeLabel(node))}</p>
      <div class="element-item-meta">${escapeHtml(getHtmlDirectNodeTypeLabel(node))}</div>
    `;
    item.addEventListener("click", () => {
      state.htmlDirect.selectedNodeId = htmlId;
      applyHtmlDirectSelectionToFrame();
      renderInspector();
      renderElementsList();
    });
    el.elementsList.appendChild(item);
  });
}

function renderHtmlDirectCanvas() {
  el.slideCanvas.classList.add("hidden");
  el.htmlDirectFrame.classList.remove("hidden");
  el.htmlDirectFrame.style.aspectRatio = `${state.htmlDirect.viewport.width} / ${state.htmlDirect.viewport.height}`;

  if (!state.htmlDirect.sourceDoc) {
    el.htmlDirectFrame.srcdoc = buildHtmlDirectEmptyState();
    return;
  }

  if (!state.htmlDirect.needsReload && el.htmlDirectFrame.dataset.loaded === "true") {
    applyHtmlDirectSelectionToFrame();
    return;
  }

  el.htmlDirectFrame.dataset.loaded = "false";
  el.htmlDirectFrame.srcdoc = buildHtmlDirectPreview();
}

function renderHtmlDirectInspector() {
  const node = getSelectedHtmlDirectSourceNode();
  if (!node) {
    el.inspectorEmpty.classList.remove("hidden");
    el.inspectorFields.classList.add("hidden");
    return;
  }

  const computed = getHtmlDirectComputedStyle(node);
  const geometry = getHtmlDirectGeometry();
  const isImage = node.tagName?.toLowerCase() === "img";
  el.inspectorEmpty.classList.add("hidden");
  el.inspectorFields.classList.remove("hidden");

  el.elTypeInput.value = getHtmlDirectNodeTypeLabel(node);
  el.elVariantInput.value = "body";
  el.elTextInput.value = isImage ? "" : node.textContent || "";
  el.elSrcInput.value = isImage ? node.getAttribute("src") || "" : "";
  el.elXInput.value = String(Math.round(geometry.x));
  el.elYInput.value = String(Math.round(geometry.y));
  el.elWInput.value = geometry.w ? String(Math.round(geometry.w)) : "";
  el.elHInput.value = geometry.h ? String(Math.round(geometry.h)) : "";
  el.elSizeInput.value = String(Math.round(parsePixel(computed.fontSize, 24)));
  el.elWeightInput.value = String(Number.parseInt(computed.fontWeight || "400", 10) || 400);
  el.elAlignInput.value = computed.textAlign === "right" ? "right" : computed.textAlign === "center" ? "center" : "left";
  el.elVAlignInput.value = "start";
  el.elLineHeightInput.value = String(roundNumber(parseLineHeight(computed.lineHeight, computed.fontSize), 2));
  el.elLetterSpacingInput.value = String(roundNumber(parsePixel(computed.letterSpacing, 0), 2));
  el.elParagraphSpacingInput.value = "0";
  el.elPaddingInput.value = String(Math.round(parseBoxShorthand(computed.padding).top));
  el.elColorInput.value = normalizeColor(computed.color || "#111111");
  el.elFillInput.value = normalizeColor(computed.backgroundColor || "transparent");
  el.elBorderColorInput.value = normalizeColor(computed.borderColor || "#111111");
  el.elAccentInput.value = normalizeColor(computed.color || "#111111");
  el.elBorderWidthInput.value = String(Math.round(parsePixel(computed.borderWidth, 0)));
  el.elRadiusInput.value = String(Math.round(parsePixel(computed.borderRadius, 0)));
  el.elShapeVariantInput.value = "rect";
  el.elAppearanceInput.value = "plain";
  el.elListStyleInput.value = "disc";
  el.elFitInput.value = computed.objectFit || "cover";
  el.elSyncInput.value = "html_only_override";

  toggleInspectorField(el.elVariantInput.parentElement, false);
  toggleInspectorField(el.elTextInput.parentElement, !isImage);
  toggleInspectorField(el.elSrcInput.parentElement, isImage);
  toggleInspectorField(el.elXInput.parentElement, true);
  toggleInspectorField(el.elYInput.parentElement, true);
  toggleInspectorField(el.elWInput.parentElement, true);
  toggleInspectorField(el.elHInput.parentElement, true);
  toggleInspectorField(el.elParagraphSpacingInput.parentElement, false);
  toggleInspectorField(el.elVAlignInput.parentElement, false);
  toggleInspectorField(el.elShapeVariantInput.parentElement, false);
  toggleInspectorField(el.elAppearanceInput.parentElement, false);
  toggleInspectorField(el.elListStyleInput.parentElement, false);
  toggleInspectorField(el.elFitInput.parentElement, isImage);
  toggleInspectorField(el.elSyncInput.parentElement, false);
  localizeSelectOptions();
}

function buildHtmlDirectEmptyState() {
  return `<!doctype html><html><head><style>body{margin:0;display:grid;place-items:center;height:100vh;font-family:IBM Plex Sans,sans-serif;color:#6b645b;background:#f7f2e8;}</style></head><body><div>Open an HTML file in HTML Direct mode.</div></body></html>`;
}

function renderSlides() {
  if (state.editorMode === "html") {
    renderHtmlDirectSlides();
    return;
  }
  el.slidesList.innerHTML = "";
  state.model.slides.forEach((slide, index) => {
    const node = document.createElement("li");
    node.className = `slide-item ${slide.id === state.activeSlideId ? "active" : ""}`;
    node.innerHTML = `
      <p class="slide-item-title">${escapeHtml(slide.title || t("importedSlideTitle", { count: index + 1 }))}</p>
      <div class="slide-item-meta">${escapeHtml(getRoleLabel(slide.role || "content"))} | ${escapeHtml(t("elementsCount", { count: slide.elements.length }))}</div>
    `;
    node.addEventListener("click", () => {
      state.activeSlideId = slide.id;
      state.activeElementId = null;
      renderAll();
    });
    el.slidesList.appendChild(node);
  });
}

function renderElementsList() {
  if (state.editorMode === "html") {
    renderHtmlDirectElements();
    return;
  }
  const slide = getActiveSlide();
  el.elementsList.innerHTML = "";
  if (!slide) return;

  [...slide.elements]
    .sort((a, b) => b.layer - a.layer)
    .forEach((element) => {
      const node = document.createElement("li");
      node.className = `element-item ${element.id === state.activeElementId ? "active" : ""}`;
      node.draggable = true;
      node.dataset.elementId = element.id;
      node.innerHTML = `
        <p class="element-item-title">${escapeHtml(getElementLabel(element))}</p>
        <div class="element-item-meta">${escapeHtml(getTypeLabel(element.type))} | ${escapeHtml(t("layerLabel", { count: element.layer }))}</div>
      `;
      node.addEventListener("click", () => {
        state.activeElementId = element.id;
        renderCanvas();
        renderInspector();
        renderElementsList();
      });
      node.addEventListener("dragstart", (event) => {
        state.listDrag = { draggedId: element.id, targetId: null, position: null };
        node.classList.add("dragging");
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", element.id);
      });
      node.addEventListener("dragover", (event) => {
        event.preventDefault();
        if (!state.listDrag || state.listDrag.draggedId === element.id) return;
        const rect = node.getBoundingClientRect();
        const position = event.clientY < rect.top + rect.height / 2 ? "before" : "after";
        state.listDrag.targetId = element.id;
        state.listDrag.position = position;
        updateElementDropIndicators();
      });
      node.addEventListener("drop", (event) => {
        event.preventDefault();
        if (!state.listDrag || state.listDrag.draggedId === element.id && !state.listDrag.position) return;
        reorderElementsByListDrop(state.listDrag.draggedId, element.id, state.listDrag.position || "after");
      });
      node.addEventListener("dragend", () => {
        clearElementListDragState();
      });
      el.elementsList.appendChild(node);
    });
}

function renderCanvas() {
  if (state.editorMode === "html") {
    renderHtmlDirectCanvas();
    return;
  }
  el.htmlDirectFrame.classList.add("hidden");
  el.slideCanvas.classList.remove("hidden");
  const slide = getActiveSlide();
  el.slideCanvas.innerHTML = "";
  if (!slide) return;

  applyCanvasFrameStyle();
  const scale = getCanvasScale();
  const width = Math.round(BASE_WIDTH * scale);
  const height = Math.round(BASE_HEIGHT * scale);
  el.slideCanvas.style.width = `${width}px`;
  el.slideCanvas.style.height = `${height}px`;

  [...slide.elements]
    .sort((a, b) => a.layer - b.layer)
    .forEach((element) => {
      const node = document.createElement("div");
      node.className = `canvas-element ${element.id === state.activeElementId ? "active" : ""}`;
      node.dataset.id = element.id;
      node.style.left = `${element.geometry.x * scale}px`;
      node.style.top = `${element.geometry.y * scale}px`;
      node.style.width = `${element.geometry.w * scale}px`;
      node.style.height = `${element.geometry.h * scale}px`;
      node.style.zIndex = String(element.layer || 1);

      const body = renderElementBody(element, scale);
      node.appendChild(body);

      if (element.id === state.activeElementId) {
        const handle = document.createElement("div");
        handle.className = "resize-handle";
        node.appendChild(handle);
      }

      el.slideCanvas.appendChild(node);
    });

  state.guides.forEach((guide) => {
    const node = document.createElement("div");
    node.className = `canvas-guide ${guide.orientation}`;
    if (guide.orientation === "vertical") node.style.left = `${guide.position * scale}px`;
    if (guide.orientation === "horizontal") node.style.top = `${guide.position * scale}px`;
    el.slideCanvas.appendChild(node);
  });
}

function updateElementDropIndicators() {
  [...el.elementsList.querySelectorAll(".element-item")].forEach((node) => {
    node.classList.remove("drop-before", "drop-after");
    if (!state.listDrag || node.dataset.elementId !== state.listDrag.targetId) return;
    if (state.listDrag.position === "before") node.classList.add("drop-before");
    if (state.listDrag.position === "after") node.classList.add("drop-after");
  });
}

function clearElementListDragState() {
  state.listDrag = null;
  [...el.elementsList.querySelectorAll(".element-item")].forEach((node) => {
    node.classList.remove("dragging", "drop-before", "drop-after");
  });
}

function reorderElementsByListDrop(draggedId, targetId, position) {
  const slide = getActiveSlide();
  if (!slide || !draggedId || !targetId || draggedId === targetId) {
    clearElementListDragState();
    return;
  }

  const visibleOrder = [...slide.elements].sort((a, b) => b.layer - a.layer).map((item) => item.id);
  const draggedIndex = visibleOrder.indexOf(draggedId);
  const targetIndex = visibleOrder.indexOf(targetId);
  if (draggedIndex < 0 || targetIndex < 0) {
    clearElementListDragState();
    return;
  }

  visibleOrder.splice(draggedIndex, 1);
  const adjustedTargetIndex = visibleOrder.indexOf(targetId);
  const insertIndex = position === "after" ? adjustedTargetIndex + 1 : adjustedTargetIndex;
  visibleOrder.splice(insertIndex, 0, draggedId);

  [...visibleOrder].reverse().forEach((id, index) => {
    const element = slide.elements.find((item) => item.id === id);
    if (element) element.layer = index + 1;
  });

  markDirty();
  clearElementListDragState();
  renderAll();
}

function renderElementBody(element, scale) {
  const body = document.createElement("div");
  const style = getResolvedElementStyle(element);
  body.className = getElementBodyClass(element);
  body.style.display = element.type === "shape" || element.type === "image" ? "block" : "flex";
  body.style.flexDirection = "column";
  body.style.color = style.color;
  body.style.background = style.fill;
  body.style.border = `${style.border_width * scale}px solid ${style.border_color}`;
  body.style.borderRadius = `${style.border_radius * scale}px`;
  body.style.padding = `${style.padding * scale}px`;
  body.style.fontSize = `${style.font_size * scale}px`;
  body.style.fontWeight = String(style.font_weight);
  body.style.lineHeight = String(style.line_height);
  body.style.letterSpacing = `${style.letter_spacing * scale}px`;
  body.style.textAlign = style.text_align;
  body.style.boxShadow = resolveShadow(style, scale);
  body.style.opacity = String(style.opacity);
  body.style.justifyContent = mapVerticalAlign(style.vertical_align);
  body.style.fontFamily = pickFontFamily(element, style);

  if (element.type === "text") {
    body.textContent = element.text || "";
    return body;
  }

  if (element.type === "bullets") {
    renderBullets(body, element, style, scale);
    return body;
  }

  if (element.type === "quote") {
    body.textContent = element.text || "";
    return body;
  }

  if (element.type === "stat") {
    renderStat(body, element);
    return body;
  }

  if (element.type === "card") {
    applyCardShapeVariant(body, element, scale);
    renderCard(body, element);
    return body;
  }

  if (element.type === "image") {
    const img = document.createElement("img");
    img.className = "element-image";
    img.draggable = false;
    img.alt = "";
    img.src = element.src || "";
    img.style.objectFit = style.object_fit;
    img.style.borderRadius = `${style.border_radius * scale}px`;
    body.style.padding = "0";
    body.appendChild(img);
    return body;
  }

  if (element.type === "shape") {
    renderShape(body, style);
    return body;
  }

  if (element.type === "container") {
    body.textContent = element.text || t("containerFallback");
    return body;
  }

  body.textContent = `${getTypeLabel(element.type)} ${t("placeholderSuffix")}`;
  return body;
}

function renderBullets(body, element, style, scale) {
  body.style.setProperty("--paragraph-gap", `${style.paragraph_spacing * scale}px`);
  body.classList.toggle("list-dash", style.list_style === "dash");
  const list = document.createElement("ul");
  if (style.list_style === "decimal") list.style.listStyle = "decimal";
  splitLines(element.text).forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    list.appendChild(item);
  });
  body.appendChild(list);
}

function renderStat(body, element) {
  const [value, ...rest] = splitLines(element.text);
  const valueNode = document.createElement("div");
  valueNode.className = "element-stat-value";
  valueNode.textContent = value || "42%";
  const labelNode = document.createElement("div");
  labelNode.className = "element-stat-label";
  labelNode.textContent = rest.join(" ") || t("metricFallback");
  body.append(valueNode, labelNode);
}

function renderCard(body, element) {
  const [title, ...rest] = splitLines(element.text);
  const titleNode = document.createElement("div");
  titleNode.className = "card-title";
  titleNode.textContent = title || t("cardFallback");
  const contentNode = document.createElement("div");
  contentNode.className = "card-body";
  contentNode.textContent = rest.join("\n") || "";
  body.append(titleNode, contentNode);
}

function renderShape(body, style) {
  body.className = `element-shape shape-${style.shape_variant}`;
  body.style.background = style.shape_variant === "line" || style.shape_variant === "arrow" ? "transparent" : style.fill;
  body.style.color = style.accent || style.color;
  body.style.borderColor = style.border_color;
  body.style.borderWidth = `${style.border_width}px`;
  body.style.borderStyle = "solid";
  if (style.shape_variant === "pill") body.style.borderRadius = "999px";
  if (style.shape_variant === "circle") body.style.borderRadius = "999px";
}

function applyCardShapeVariant(body, element, scale) {
  const variant = element.style?.shape_variant || "rounded";
  if (variant === "rect") body.style.borderRadius = `${8 * scale}px`;
  if (variant === "rounded") body.style.borderRadius = `${18 * scale}px`;
  if (variant === "pill") body.style.borderRadius = "999px";
  if (variant === "circle") body.style.borderRadius = `${Math.min(element.geometry.w, element.geometry.h) * 0.5 * scale}px`;
}

function getElementBodyClass(element) {
  return {
    text: "element-text",
    bullets: "element-bullets",
    quote: "element-quote",
    stat: "element-stat",
    card: "element-card",
    image: "element-frame",
    shape: "element-shape",
    container: "element-container",
    chart: "element-placeholder",
    diagram: "element-placeholder",
  }[element.type] || "element-placeholder";
}

function renderInspector() {
  if (state.editorMode === "html") {
    renderHtmlDirectInspector();
    return;
  }
  const element = getActiveElement();
  if (!element) {
    el.inspectorEmpty.classList.remove("hidden");
    el.inspectorFields.classList.add("hidden");
    return;
  }

  el.inspectorEmpty.classList.add("hidden");
  el.inspectorFields.classList.remove("hidden");

  const style = getResolvedElementStyle(element);
  const variants = VARIANT_OPTIONS[element.type] || ["body"];
  el.elVariantInput.innerHTML = variants.map((variant) => `<option value="${escapeHtml(variant)}">${escapeHtml(variant)}</option>`).join("");
  el.elVariantInput.value = element.variant || variants[0];
  el.elTypeInput.value = getTypeLabel(element.type);
  el.elTextInput.value = element.text || "";
  el.elSrcInput.value = element.src || "";
  el.elXInput.value = String(Math.round(element.geometry.x));
  el.elYInput.value = String(Math.round(element.geometry.y));
  el.elWInput.value = String(Math.round(element.geometry.w));
  el.elHInput.value = String(Math.round(element.geometry.h));
  el.elSizeInput.value = String(style.font_size);
  el.elWeightInput.value = String(style.font_weight);
  el.elAlignInput.value = style.text_align;
  el.elVAlignInput.value = style.vertical_align;
  el.elLineHeightInput.value = String(style.line_height);
  el.elLetterSpacingInput.value = String(style.letter_spacing);
  el.elParagraphSpacingInput.value = String(style.paragraph_spacing);
  el.elPaddingInput.value = String(style.padding);
  el.elColorInput.value = normalizeColor(style.color);
  el.elFillInput.value = normalizeColor(style.fill);
  el.elBorderColorInput.value = normalizeColor(style.border_color);
  el.elAccentInput.value = normalizeColor(style.accent);
  el.elBorderWidthInput.value = String(style.border_width);
  el.elRadiusInput.value = String(style.border_radius);
  el.elShapeVariantInput.value = style.shape_variant;
  el.elAppearanceInput.value = style.appearance_preset;
  el.elListStyleInput.value = style.list_style;
  el.elFitInput.value = style.object_fit;
  el.elSyncInput.value = element.sync_status || "synced";

  toggleInspectorField(el.elTextInput.parentElement, TEXTUAL_TYPES.has(element.type));
  toggleInspectorField(el.elSrcInput.parentElement, element.type === "image");
  toggleInspectorField(el.elListStyleInput.parentElement, element.type === "bullets");
  toggleInspectorField(el.elFitInput.parentElement, element.type === "image");
  toggleInspectorField(el.elShapeVariantInput.parentElement, element.type === "shape" || element.type === "card");
  toggleInspectorField(el.elAppearanceInput.parentElement, element.type === "card" || element.type === "shape" || element.type === "container");
  localizeSelectOptions();
}

function createEmptyHtmlDirectState() {
  return {
    sourceDoc: null,
    slides: [],
    activeSlideIndex: 0,
    selectedNodeId: null,
    drag: null,
    viewport: { width: 1600, height: 900 },
    fileName: "index.html",
    basePath: "",
    needsReload: false,
  };
}

function loadHtmlDirect(html, options = {}) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  prepareHtmlDirectDocument(doc);
  state.htmlDirect = {
    sourceDoc: doc,
    slides: extractHtmlDirectSlides(doc),
    activeSlideIndex: 0,
    selectedNodeId: null,
    drag: null,
    viewport: extractHtmlDirectViewport(doc, html),
    fileName: options.fileName || "index.html",
    basePath: options.basePath || "",
    needsReload: true,
  };
  state.editorMode = "html";
  renderAll();
}

function prepareHtmlDirectDocument(doc) {
  getHtmlDirectSections(doc).forEach((section, sectionIndex) => {
    section.dataset.pacSlideIndex = String(sectionIndex);
  });

  [...doc.querySelectorAll(HTML_DIRECT_EDITABLE_SELECTORS)].forEach((node, index) => {
    if (!node.dataset.pacHtmlEditableId) {
      node.dataset.pacHtmlEditableId = `html_node_${index + 1}`;
    }
  });
}

function extractHtmlDirectSlides(doc) {
  return getHtmlDirectSections(doc).map((section, index) => ({
    index,
    title: extractRevealTitle(section) || extractRevealSubtitle(section) || t("importedSlideTitle", { count: index + 1 }),
    editableCount: getHtmlDirectEditableNodes(section).length,
  }));
}

function getHtmlDirectSections(doc = state.htmlDirect.sourceDoc) {
  if (!doc) return [];
  const revealSections = [...doc.querySelectorAll(".reveal .slides > section")];
  if (revealSections.length > 0) return revealSections;
  const genericSections = [...doc.querySelectorAll("section")];
  if (genericSections.length > 0) return genericSections;
  return doc.body ? [doc.body] : [];
}

function getActiveHtmlDirectSection(doc = state.htmlDirect.sourceDoc) {
  return getHtmlDirectSections(doc)[state.htmlDirect.activeSlideIndex] || null;
}

function getHtmlDirectEditableNodes(section) {
  if (!section) return [];
  return [...section.querySelectorAll(HTML_DIRECT_EDITABLE_SELECTORS)].filter((node) => node.dataset.pacHtmlEditableId);
}

function getSelectedHtmlDirectSourceNode() {
  if (!state.htmlDirect.sourceDoc || !state.htmlDirect.selectedNodeId) return null;
  return state.htmlDirect.sourceDoc.querySelector(`[data-pac-html-editable-id="${escapeAttributeSelector(state.htmlDirect.selectedNodeId)}"]`);
}

function getSelectedHtmlDirectFrameNode() {
  const doc = el.htmlDirectFrame.contentDocument;
  if (!doc || !state.htmlDirect.selectedNodeId) return null;
  return doc.querySelector(`[data-pac-html-editable-id="${escapeAttributeSelector(state.htmlDirect.selectedNodeId)}"]`);
}

function getHtmlDirectNodeTypeLabel(node) {
  const tag = node.tagName?.toLowerCase() || "node";
  if (tag === "img") return `${t("type_image")} <img>`;
  return `<${tag}>`;
}

function getHtmlDirectNodeLabel(node) {
  if (node.tagName?.toLowerCase() === "img") {
    return node.getAttribute("alt") || node.getAttribute("src") || t("imageLabel");
  }
  return collapseWhitespace(node.textContent || "").slice(0, 64) || getHtmlDirectNodeTypeLabel(node);
}

function buildHtmlDirectPreview() {
  const sourceDoc = state.htmlDirect.sourceDoc;
  const viewport = state.htmlDirect.viewport || { width: 1600, height: 900 };
  const clonedHtml = sourceDoc.documentElement.cloneNode(true);
  [...clonedHtml.querySelectorAll("script")].forEach((node) => node.remove());

  const head = clonedHtml.querySelector("head") || clonedHtml.insertBefore(sourceDoc.createElement("head"), clonedHtml.firstChild);
  if (state.htmlDirect.basePath && !head.querySelector("base")) {
    const base = sourceDoc.createElement("base");
    base.setAttribute("href", state.htmlDirect.basePath.replace(/[^/]+$/, ""));
    head.prepend(base);
  }

  const style = sourceDoc.createElement("style");
  style.textContent = `
    html, body { margin: 0; min-height: 100%; overflow: auto; }
    body {
      background: #0b0b0b;
      display: grid;
      justify-items: center;
      align-items: start;
    }
    .reveal {
      width: ${viewport.width}px !important;
      max-width: ${viewport.width}px !important;
      margin: 0 auto !important;
      background: transparent;
      transform: none !important;
    }
    .reveal .slides {
      width: ${viewport.width}px !important;
      min-height: ${viewport.height}px !important;
      height: auto !important;
      overflow: visible !important;
      transform: none !important;
    }
    .reveal .slides > section { display: none !important; }
    .reveal .slides > section[data-pac-slide-index="${state.htmlDirect.activeSlideIndex}"] {
      display: block !important;
      width: ${viewport.width}px !important;
      min-height: ${viewport.height}px !important;
      height: auto !important;
      overflow: visible !important;
      padding-bottom: 32px !important;
      box-sizing: border-box !important;
      position: relative !important;
      margin: 0 auto !important;
      transform: none !important;
    }
    [data-pac-html-editable-id] {
      cursor: grab;
      transition: outline-color 120ms ease, box-shadow 120ms ease;
    }
    [data-pac-html-selected="true"] { outline: 3px solid #ff7a45 !important; outline-offset: 3px !important; }
    [data-pac-html-dragging="true"] { cursor: grabbing !important; }
  `;
  head.appendChild(style);

  return `<!doctype html>\n${clonedHtml.outerHTML}`;
}

function bindHtmlDirectFrame() {
  const frameDoc = el.htmlDirectFrame.contentDocument;
  if (!frameDoc) return;

  frameDoc.addEventListener("click", onHtmlDirectFrameClick);
  frameDoc.addEventListener("mousedown", onHtmlDirectFramePointerDown);
  frameDoc.addEventListener("mousemove", onHtmlDirectFramePointerMove);
  frameDoc.addEventListener("mouseup", onHtmlDirectFramePointerUp);
  frameDoc.defaultView?.addEventListener("mouseup", onHtmlDirectFramePointerUp);
  frameDoc.defaultView?.addEventListener("blur", onHtmlDirectFramePointerUp);
  applyHtmlDirectSelectionToFrame();
  el.htmlDirectFrame.dataset.loaded = "true";
  state.htmlDirect.needsReload = false;
}

function getHtmlDirectEventTargetElement(target) {
  if (!target) return null;
  const textNode = el.htmlDirectFrame.contentWindow?.Node?.TEXT_NODE;
  if (typeof textNode === "number" && target.nodeType === textNode) {
    return target.parentElement || null;
  }
  return target;
}

function onHtmlDirectFramePointerDown(event) {
  if (event.button !== 0) return;
  const candidate = getHtmlDirectEventTargetElement(event.target)?.closest?.(HTML_DIRECT_EDITABLE_SELECTORS);
  if (!candidate?.dataset?.pacHtmlEditableId) return;

  state.htmlDirect.selectedNodeId = candidate.dataset.pacHtmlEditableId;
  promoteHtmlDirectSelectionToFreeform(candidate);
  applyHtmlDirectSelectionToFrame();
  renderElementsList();
  renderInspector();

  const geometry = getHtmlDirectGeometry(candidate);
  state.htmlDirect.drag = {
    nodeId: candidate.dataset.pacHtmlEditableId,
    startX: event.clientX,
    startY: event.clientY,
    originX: geometry.x,
    originY: geometry.y,
  };

  candidate.setAttribute("data-pac-html-dragging", "true");
  candidate.ownerDocument.body.style.userSelect = "none";
  event.preventDefault();
}

function onHtmlDirectFramePointerMove(event) {
  const drag = state.htmlDirect.drag;
  if (!drag) return;
  const nextX = drag.originX + (event.clientX - drag.startX);
  const nextY = drag.originY + (event.clientY - drag.startY);
  applyHtmlDirectGeometryPatch({ x: nextX, y: nextY }, { renderInspector: true });
  event.preventDefault();
}

function onHtmlDirectFramePointerUp() {
  if (!state.htmlDirect.drag) return;
  const selected = getSelectedHtmlDirectFrameNode();
  if (selected) selected.removeAttribute("data-pac-html-dragging");
  const frameDoc = el.htmlDirectFrame.contentDocument;
  if (frameDoc?.body) frameDoc.body.style.userSelect = "";
  state.htmlDirect.drag = null;
  renderInspector();
}

function onHtmlDirectFrameClick(event) {
  const candidate = getHtmlDirectEventTargetElement(event.target)?.closest?.(HTML_DIRECT_EDITABLE_SELECTORS);
  if (!candidate?.dataset?.pacHtmlEditableId) return;
  event.preventDefault();
  state.htmlDirect.selectedNodeId = candidate.dataset.pacHtmlEditableId;
  applyHtmlDirectSelectionToFrame();
  renderElementsList();
  renderInspector();
}

function applyHtmlDirectSelectionToFrame() {
  const frameDoc = el.htmlDirectFrame.contentDocument;
  if (!frameDoc) return;
  [...frameDoc.querySelectorAll("[data-pac-html-selected='true']")].forEach((node) => node.removeAttribute("data-pac-html-selected"));
  [...frameDoc.querySelectorAll("[data-pac-html-dragging='true']")].forEach((node) => node.removeAttribute("data-pac-html-dragging"));
  const selected = getSelectedHtmlDirectFrameNode();
  if (selected) selected.setAttribute("data-pac-html-selected", "true");
}

function updateHtmlDirectDocumentTitle(value) {
  if (!state.htmlDirect.sourceDoc) return;
  state.htmlDirect.sourceDoc.title = value;
  renderMeta();
}

function updateHtmlDirectRootVariable(key, value) {
  const root = state.htmlDirect.sourceDoc?.documentElement;
  if (!root) return;
  const map = { bg: "--bg", fg: "--text", accent: "--accent", muted: "--text-muted" };
  if (!map[key]) return;
  root.style.setProperty(map[key], value);
  state.htmlDirect.needsReload = true;
  renderCanvas();
}

function updateHtmlDirectSelectedText(value) {
  updateHtmlDirectSelectedNode((node) => {
    if (node.tagName?.toLowerCase() !== "img") node.textContent = value;
  });
}

function updateHtmlDirectSelectedSrc(value) {
  updateHtmlDirectSelectedNode((node) => {
    if (node.tagName?.toLowerCase() === "img") node.setAttribute("src", value);
  });
}

function updateHtmlDirectStyle(key, value) {
  updateHtmlDirectSelectedNode((node) => {
    const styleMap = {
      font_size: ["fontSize", `${value}px`],
      font_weight: ["fontWeight", String(value)],
      text_align: ["textAlign", value],
      line_height: ["lineHeight", String(value)],
      letter_spacing: ["letterSpacing", `${value}px`],
      padding: ["padding", `${value}px`],
      color: ["color", value],
      fill: ["backgroundColor", value],
      border_color: ["borderColor", value],
      border_width: ["borderWidth", `${value}px`],
      border_radius: ["borderRadius", `${value}px`],
      object_fit: ["objectFit", value],
    };
    const entry = styleMap[key];
    if (!entry) return;
    node.style[entry[0]] = entry[1];
  });
}

function extractHtmlDirectViewport(doc, html) {
  const fallback = { width: 1600, height: 900 };
  const source = html || `<!doctype html>\n${doc?.documentElement?.outerHTML || ""}`;
  const scripts = [...(doc?.querySelectorAll("script") || [])].map((node) => node.textContent || "");
  const haystack = [source, ...scripts].join("\n");
  const widthMatch = haystack.match(/(?:Reveal\.initialize\s*\([\s\S]*?)\bwidth\s*:\s*(\d+)/i) || haystack.match(/\bwidth\s*:\s*(\d+)/i);
  const heightMatch = haystack.match(/(?:Reveal\.initialize\s*\([\s\S]*?)\bheight\s*:\s*(\d+)/i) || haystack.match(/\bheight\s*:\s*(\d+)/i);
  const width = Number(widthMatch?.[1]);
  const height = Number(heightMatch?.[1]);

  if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
    return { width, height };
  }
  return fallback;
}

function getHtmlDirectGeometry(node = getSelectedHtmlDirectFrameNode()) {
  const frameNode = node || getSelectedHtmlDirectFrameNode();
  if (!frameNode) {
    return { x: 0, y: 0, w: 0, h: 0 };
  }

  const computed = el.htmlDirectFrame.contentWindow.getComputedStyle(frameNode);
  const rect = frameNode.getBoundingClientRect();
  return {
    x: roundNumber(parsePixel(frameNode.style.left || computed.left, 0), 0),
    y: roundNumber(parsePixel(frameNode.style.top || computed.top, 0), 0),
    w: roundNumber(parsePixel(frameNode.style.width || computed.width, rect.width || 0), 0),
    h: roundNumber(parsePixel(frameNode.style.height || computed.height, rect.height || 0), 0),
  };
}

function ensureHtmlDirectNodeCanMove(node) {
  const win = node.ownerDocument?.defaultView;
  const computed = win?.getComputedStyle(node);
  if (!computed || computed.position === "static") {
    node.style.position = "relative";
  }
  if (node.tagName?.toLowerCase() === "img" && !node.style.display) {
    node.style.display = "block";
  }
}

function getHtmlDirectNodeSection(node) {
  if (!node) return null;
  return node.closest?.("[data-pac-slide-index]") || node.closest?.("section") || node.ownerDocument?.body || null;
}

function ensureHtmlDirectSectionCanPosition(section) {
  if (!section) return;
  const win = section.ownerDocument?.defaultView;
  const computed = win?.getComputedStyle(section);
  if (!computed || computed.position === "static") {
    section.style.position = "relative";
  }
}

function applyFreeformStyles(node, section, geometry) {
  if (!node) return;
  const isImage = node.tagName?.toLowerCase() === "img";
  ensureHtmlDirectSectionCanPosition(section);
  node.dataset.pacHtmlFreeform = "true";
  node.style.position = "absolute";
  node.style.left = `${geometry.x}px`;
  node.style.top = `${geometry.y}px`;
  node.style.width = `${geometry.w}px`;
  node.style.maxWidth = "none";
  node.style.margin = "0";
  node.style.boxSizing = "border-box";
  if (isImage) {
    node.style.height = `${geometry.h}px`;
    node.style.maxHeight = "none";
    node.style.display = "block";
  } else {
    node.style.display = "block";
    node.style.minHeight = `${geometry.h}px`;
    node.style.height = "auto";
    node.style.overflow = "visible";
  }
}

function promoteHtmlDirectSelectionToFreeform(frameNode = getSelectedHtmlDirectFrameNode()) {
  const sourceNode = getSelectedHtmlDirectSourceNode();
  if (!frameNode || !sourceNode) return;
  if (frameNode.dataset.pacHtmlFreeform === "true" && sourceNode.dataset.pacHtmlFreeform === "true") return;

  const frameSection = getHtmlDirectNodeSection(frameNode);
  const sourceSection = getHtmlDirectNodeSection(sourceNode);
  const frameRect = frameNode.getBoundingClientRect();
  const sectionRect = frameSection?.getBoundingClientRect?.() || { left: 0, top: 0 };
  const geometry = {
    x: roundNumber(frameRect.left - sectionRect.left + (frameSection?.scrollLeft || 0), 0),
    y: roundNumber(frameRect.top - sectionRect.top + (frameSection?.scrollTop || 0), 0),
    w: roundNumber(frameRect.width, 0),
    h: roundNumber(frameRect.height, 0),
  };

  applyFreeformStyles(frameNode, frameSection, geometry);
  applyFreeformStyles(sourceNode, sourceSection, geometry);
}

function setHtmlDirectNodeGeometry(node, key, value) {
  if (!node) return;
  const numericValue = clampNumeric(key, value, key === "w" ? 320 : key === "h" ? 120 : 0);
  const tag = node.tagName?.toLowerCase();
  const isImage = tag === "img";

  if (key === "x" || key === "y") {
    ensureHtmlDirectNodeCanMove(node);
    node.style[key === "x" ? "left" : "top"] = `${numericValue}px`;
    return;
  }

  if (key === "w") {
    if (!isImage && !node.style.display) {
      node.style.display = "block";
    }
    node.style.width = `${numericValue}px`;
    node.style.maxWidth = "none";
    return;
  }

  if (key === "h") {
    if (isImage) {
      node.style.height = `${numericValue}px`;
      node.style.maxHeight = "none";
      return;
    }
    if (!node.style.display) {
      node.style.display = "block";
    }
    node.style.minHeight = `${numericValue}px`;
    node.style.height = "auto";
    node.style.overflow = "visible";
  }
}

function applyHtmlDirectGeometryPatch(patch, options = {}) {
  const sourceNode = getSelectedHtmlDirectSourceNode();
  if (!sourceNode) return;
  const frameNode = getSelectedHtmlDirectFrameNode();
  if (frameNode) {
    promoteHtmlDirectSelectionToFreeform(frameNode);
  }

  Object.entries(patch).forEach(([key, value]) => {
    setHtmlDirectNodeGeometry(sourceNode, key, value);
    if (frameNode) setHtmlDirectNodeGeometry(frameNode, key, value);
  });

  if (options.renderInspector !== false) {
    renderInspector();
  }
}

function updateHtmlDirectGeometry(key, value) {
  applyHtmlDirectGeometryPatch({ [key]: value }, { renderInspector: true });
}

function nudgeHtmlDirectSelection(deltaX, deltaY) {
  const geometry = getHtmlDirectGeometry();
  applyHtmlDirectGeometryPatch(
    {
      x: geometry.x + deltaX,
      y: geometry.y + deltaY,
    },
    { renderInspector: true }
  );
}

function updateHtmlDirectSelectedNode(mutator) {
  const sourceNode = getSelectedHtmlDirectSourceNode();
  if (!sourceNode) return;
  mutator(sourceNode);

  const frameNode = getSelectedHtmlDirectFrameNode();
  if (frameNode) mutator(frameNode);

  state.htmlDirect.slides = extractHtmlDirectSlides(state.htmlDirect.sourceDoc);
  renderElementsList();
  renderInspector();
}

function serializeHtmlDirectSource() {
  if (!state.htmlDirect.sourceDoc) return "";
  return `<!doctype html>\n${state.htmlDirect.sourceDoc.documentElement.outerHTML}`;
}

function getHtmlDirectComputedStyle(node) {
  const frameNode = getSelectedHtmlDirectFrameNode();
  if (frameNode) {
    return el.htmlDirectFrame.contentWindow.getComputedStyle(frameNode);
  }
  return {
    fontSize: "24px",
    fontWeight: "400",
    textAlign: "left",
    lineHeight: "1.4",
    letterSpacing: "0px",
    padding: "0px",
    color: "#111111",
    backgroundColor: "transparent",
    borderColor: "#111111",
    borderWidth: "0px",
    borderRadius: "0px",
    objectFit: "cover",
  };
}

function getHtmlDirectRootVariable(name, fallback) {
  const root = state.htmlDirect.sourceDoc?.documentElement;
  if (!root) return fallback;
  const inline = root.style.getPropertyValue(`--${name}`).trim();
  if (inline) return normalizeColor(inline);
  return fallback;
}

function toggleInspectorField(node, visible) {
  node.classList.toggle("hidden", !visible);
}

function applyCanvasFrameStyle() {
  const style = state.model.style_system;
  el.slideCanvas.style.background = style.color.bg;
  el.slideCanvas.style.color = style.color.fg;
  el.slideCanvas.style.fontFamily = style.typography.font_body;
}

function renderDeckHtml(modelInput) {
  const model = normalizeModel(JSON.parse(JSON.stringify(modelInput)));
  const slides = [...model.slides].sort((a, b) => a.z_order - b.z_order);
  const style = buildStyleSystem(model.style_system);
  const safeJson = JSON.stringify(model, null, 2).replace(/</g, "\\u003c");

  const slidesHtml = slides
    .map((slide) => {
      const elementsHtml = [...slide.elements]
        .sort((a, b) => a.layer - b.layer)
        .map((element) => renderElementHtmlString(element))
        .join("");
      return `
        <section class="pac-slide" data-slide-id="${escapeHtml(slide.id)}" data-slide-role="${escapeHtml(slide.role || "content")}">
          ${elementsHtml}
        </section>
      `;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(model.deck.title || "Deck")}</title>
    <style>
      :root { --bg: ${style.color.bg}; --fg: ${style.color.fg}; --accent: ${style.color.accent}; --muted: ${style.color.muted}; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        color: var(--fg);
        background: radial-gradient(circle at top left, rgba(255,247,235,0.85), transparent 28%), linear-gradient(180deg, ${style.color.bg} 0%, #efe7d8 100%);
        font-family: ${style.typography.font_body}, sans-serif;
      }
      .pac-deck { padding: 36px 24px 80px; }
      .pac-slide {
        position: relative;
        width: 1600px;
        height: 900px;
        margin: 0 auto 36px;
        overflow: hidden;
        border-radius: 20px;
        border: 1px solid rgba(28, 19, 12, 0.14);
        background: ${style.color.bg};
        box-shadow: 0 24px 60px rgba(40, 28, 18, 0.16);
      }
      .pac-element { position: absolute; }
      .pac-element ul { margin: 0; padding-left: 1.2em; }
      .pac-element.quote { font-family: Georgia, serif; font-style: italic; }
      .pac-element.stat .value { font-family: ${style.typography.font_display}, sans-serif; line-height: 0.95; }
      .pac-element.stat .label { font-size: 0.38em; text-transform: uppercase; letter-spacing: 0.08em; }
      .pac-element.card .card-title { font-family: ${style.typography.font_display}, sans-serif; font-weight: 700; margin-bottom: 10px; }
      .pac-element.placeholder { display: grid; place-items: center; text-align: center; background: linear-gradient(135deg, rgba(198,85,49,0.12), rgba(198,85,49,0.04)); }
      .pac-element.shape-line::before { content: ""; position: absolute; left: 0; right: 0; top: calc(50% - 1px); height: 2px; background: currentColor; }
      .pac-element.shape-arrow::before { content: ""; position: absolute; left: 0; right: 16px; top: calc(50% - 1px); height: 2px; background: currentColor; }
      .pac-element.shape-arrow::after { content: ""; position: absolute; right: 0; top: calc(50% - 7px); border-top: 7px solid transparent; border-bottom: 7px solid transparent; border-left: 16px solid currentColor; }
      .pac-element img { width: 100%; height: 100%; display: block; }
    </style>
  </head>
  <body>
    <main class="pac-deck" data-deck-title="${escapeHtml(model.deck.title || "Deck")}">
      ${slidesHtml}
    </main>
    <script id="ppt-as-code-model" type="application/json">${safeJson}</script>
  </body>
</html>`;
}

function renderElementHtmlString(element) {
  const style = getResolvedElementStyle(element);
  const commonStyle = [
    `left:${element.geometry.x}px`,
    `top:${element.geometry.y}px`,
    `width:${element.geometry.w}px`,
    `height:${element.geometry.h}px`,
    `z-index:${element.layer || 1}`,
    `color:${style.color}`,
    `background:${style.fill}`,
    `border:${style.border_width}px solid ${style.border_color}`,
    `border-radius:${style.border_radius}px`,
    `padding:${style.padding}px`,
    `font-size:${style.font_size}px`,
    `font-weight:${style.font_weight}`,
    `line-height:${style.line_height}`,
    `letter-spacing:${style.letter_spacing}px`,
    `text-align:${style.text_align}`,
    `opacity:${style.opacity}`,
    `box-shadow:${resolveShadow(style, 1)}`,
    `font-family:${pickFontFamily(element, style)}`,
  ].join(";");

  let content = "";
  let extraClasses = [];

  if (element.type === "image") {
    content = `<img src="${escapeHtml(element.src || "")}" style="object-fit:${escapeHtml(style.object_fit)}" alt="" />`;
  } else if (element.type === "bullets") {
    const items = splitLines(element.text).map((line) => `<li>${escapeHtml(line)}</li>`).join("");
    content = `<ul>${items}</ul>`;
  } else if (element.type === "quote") {
    extraClasses.push("quote");
    content = escapeHtml(element.text || "");
  } else if (element.type === "stat") {
    extraClasses.push("stat");
    const [value, ...rest] = splitLines(element.text);
    content = `<div class="value">${escapeHtml(value || "42%")}</div><div class="label">${escapeHtml(rest.join(" ") || "Metric")}</div>`;
  } else if (element.type === "card") {
    extraClasses.push("card");
    const [title, ...rest] = splitLines(element.text);
    content = `<div class="card-title">${escapeHtml(title || "Card")}</div><div class="card-body">${escapeHtml(rest.join("\n"))}</div>`;
  } else if (element.type === "shape") {
    extraClasses.push(`shape-${style.shape_variant}`);
  } else if (element.type === "chart" || element.type === "diagram" || element.type === "container") {
    extraClasses.push("placeholder");
    content = escapeHtml(element.text || `${element.type.toUpperCase()} placeholder`);
  } else {
    content = escapeHtml(element.text || "");
  }

  return `<div class="pac-element ${escapeHtml(element.type)} ${extraClasses.join(" ")}" data-element-id="${escapeHtml(element.id)}" data-element-type="${escapeHtml(element.type)}" data-element-variant="${escapeHtml(element.variant || "body")}" data-sync-status="${escapeHtml(element.sync_status || "synced")}" style="${commonStyle}">${content}</div>`;
}

function importDeckFromHtml(html, options = {}) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const embedded = doc.getElementById("ppt-as-code-model");
  if (embedded?.textContent?.trim()) {
    return normalizeModel(JSON.parse(embedded.textContent));
  }

  const pacSlides = [...doc.querySelectorAll(".pac-slide")];
  if (pacSlides.length > 0) {
    return importPacDeck(doc, pacSlides, options);
  }

  const revealSections = [...doc.querySelectorAll(".reveal .slides > section")].filter((section) =>
    section.querySelector(".deck-slide, h1, h2, h3, p, img, li, blockquote")
  );
  if (revealSections.length > 0) {
    return importRevealDeck(doc, revealSections, options);
  }

  throw new Error("Unsupported HTML format");
}

function importPacDeck(doc, pacSlides, options = {}) {
  const slides = pacSlides.map((slideNode, slideIndex) => {
    const elements = [...slideNode.querySelectorAll(".pac-element")].map((node, elementIndex) =>
      parseElementFromHtml(node, elementIndex, options)
    );
    return normalizeSlide(
      {
        id: slideNode.dataset.slideId || createId("slide"),
        title: t("importedSlideTitle", { count: slideIndex + 1 }),
        role: slideNode.dataset.slideRole || "content",
        z_order: slideIndex + 1,
        elements,
        style_refs: { global: true, slide_override_key: slideNode.dataset.slideId || createId("slide") },
        content_refs: {},
        sync_status: "needs_review",
      },
      slideIndex
    );
  });

  return normalizeModel({
    deck: { title: doc.title || "Imported Deck", mode: "basic", export_target: "html", slide_size: "16:9" },
    style_system: createDefaultModel().style_system,
    slides,
    sync_status: "needs_review",
  });
}

function parseElementFromHtml(node, elementIndex, options = {}) {
  const style = node.style;
  const type = node.dataset.elementType || "text";
  const parsed = normalizeElement(
    {
      id: node.dataset.elementId || createId(type),
      type,
      variant: node.dataset.elementVariant || "body",
      text: node.textContent?.trim() || "",
      src: resolveImportedAssetPath(node.querySelector("img")?.getAttribute("src") || "", options.basePath),
      geometry: {
        x: parsePixel(style.left),
        y: parsePixel(style.top),
        w: parsePixel(style.width),
        h: parsePixel(style.height),
        rotation: 0,
      },
      layer: Number.parseInt(style.zIndex || String(elementIndex + 1), 10),
      style: {
        font_size: parsePixel(style.fontSize, 28),
        font_weight: Number.parseInt(style.fontWeight || "600", 10),
        text_align: style.textAlign || "left",
        line_height: Number.parseFloat(style.lineHeight || "1.2") || 1.2,
        letter_spacing: parsePixel(style.letterSpacing, 0),
        paragraph_spacing: 12,
        padding: parsePixel(style.padding, 0),
        color: normalizeColor(style.color || "#111111"),
        fill: normalizeColor(style.background || "#ffffff"),
        border_color: normalizeColor(style.borderColor || "#d9cec0"),
        border_width: parsePixel(style.borderWidth, 0),
        border_radius: parsePixel(style.borderRadius, 0),
        shape_variant: "rect",
        appearance_preset: "plain",
        list_style: "disc",
        object_fit: node.querySelector("img")?.style.objectFit || "cover",
        vertical_align: "start",
        accent: "#c65531",
        opacity: Number.parseFloat(style.opacity || "1") || 1,
      },
      sync_status: node.dataset.syncStatus || "needs_review",
    },
    elementIndex
  );

  if (type === "card") {
    const title = node.querySelector(".card-title")?.textContent?.trim();
    const body = node.querySelector(".card-body")?.textContent?.trim();
    parsed.text = [title, body].filter(Boolean).join("\n");
  }

  if (type === "stat") {
    const value = node.querySelector(".value")?.textContent?.trim();
    const label = node.querySelector(".label")?.textContent?.trim();
    parsed.text = [value, label].filter(Boolean).join("\n");
  }

  return parsed;
}

function importRevealDeck(doc, sections, options = {}) {
  const slides = sections
    .map((section, slideIndex) => parseRevealSection(section, slideIndex, options))
    .filter(Boolean);

  if (slides.length === 0) {
    throw new Error("No reveal slides could be imported.");
  }

  return normalizeModel({
    deck: {
      title: doc.title || "Imported Reveal Deck",
      mode: "advanced",
      export_target: "html",
      slide_size: "16:9",
    },
    style_system: getRevealImportedStyleSystem(),
    slides,
    sync_status: "needs_review",
  });
}

function parseRevealSection(sectionNode, slideIndex, options = {}) {
  const container = sectionNode.querySelector(".deck-slide") || sectionNode;
  const title = extractRevealTitle(container) || t("importedSlideTitle", { count: slideIndex + 1 });
  const subtitle = extractRevealSubtitle(container);
  const lead = extractRevealLead(container, title);
  const quote = extractRevealQuote(container);
  const bullets = extractRevealBullets(container);
  const stats = extractRevealStats(container);
  const cards = extractRevealCards(container);
  const images = extractRevealImages(container, options.basePath);
  const role = inferRevealSlideRole(sectionNode, container, { quote, stats, cards, images });
  const elements = [];

  let layer = 0;
  const push = (type, override = {}) => {
    elements.push(
      createElementPreset(type, layer, {
        sync_status: "needs_review",
        ...override,
        style: {
          ...(override.style || {}),
        },
      })
    );
    layer += 1;
  };

  if (role === "cover") {
    push("text", {
      variant: "title",
      text: title,
      geometry: { x: 110, y: 120, w: 760, h: 170, rotation: 0 },
      style: { font_size: 84, font_weight: 700, line_height: 1.02, color: "#f3f1eb" },
    });

    if (subtitle) {
      push("text", {
        variant: "caption",
        text: subtitle,
        geometry: { x: 114, y: 308, w: 650, h: 60, rotation: 0 },
        style: { font_size: 24, font_weight: 500, color: "#d5cbc1", line_height: 1.25 },
      });
    }

    if (lead) {
      push("text", {
        variant: "body",
        text: lead,
        geometry: { x: 114, y: subtitle ? 384 : 320, w: 650, h: 210, rotation: 0 },
        style: { font_size: 28, font_weight: 500, line_height: 1.45, color: "#ebe6de" },
      });
    }

    if (images[0]) {
      push("image", {
        src: images[0],
        geometry: { x: 880, y: 90, w: 610, h: 720, rotation: 0 },
        style: { border_radius: 26, border_width: 0, object_fit: "cover" },
      });
    }
  } else {
    push("text", {
      variant: "title",
      text: title,
      geometry: { x: 110, y: 72, w: 1260, h: 112, rotation: 0 },
      style: { font_size: role === "divider" ? 68 : 56, font_weight: 700, line_height: 1.06, color: "#f3f1eb" },
    });

    let cursorY = role === "divider" ? 250 : 190;
    const hasRightImage = Boolean(images[0]) && role !== "quote";
    const textWidth = hasRightImage ? 720 : 1340;

    if (lead) {
      const lineCount = Math.max(2, splitLines(lead).length);
      const leadHeight = Math.min(220, Math.max(92, Math.round(lineCount * 34)));
      push("text", {
        variant: "body",
        text: lead,
        geometry: { x: 110, y: cursorY, w: textWidth, h: leadHeight, rotation: 0 },
        style: { font_size: 28, font_weight: 500, line_height: 1.45, color: "#e7e1d8" },
      });
      cursorY += leadHeight + 28;
    }

    if (hasRightImage) {
      push("image", {
        src: images[0],
        geometry: { x: 920, y: 168, w: 560, h: cards.length > 0 ? 300 : 360, rotation: 0 },
        style: { border_radius: 24, border_width: 0, object_fit: "cover" },
      });
    }

    if (stats.length > 0) {
      const statY = Math.min(cursorY, 520);
      const gap = 22;
      const statWidth = hasRightImage ? Math.floor((720 - gap * (Math.min(stats.length, 3) - 1)) / Math.min(stats.length, 3)) : Math.floor((1240 - gap * (Math.min(stats.length, 3) - 1)) / Math.min(stats.length, 3));
      stats.slice(0, 3).forEach((text, index) => {
        push("stat", {
          text,
          geometry: { x: 110 + index * (statWidth + gap), y: statY, w: statWidth, h: 180, rotation: 0 },
          style: { font_size: 70, fill: "#171717", color: "#f3f1eb", border_color: "#343434", border_width: 1, padding: 20, appearance_preset: "metric" },
        });
      });
      cursorY = statY + 204;
    }

    if (quote) {
      const quoteY = role === "quote" ? Math.max(cursorY, 220) : Math.min(cursorY, 620);
      push("quote", {
        text: quote,
        geometry: { x: 110, y: quoteY, w: hasRightImage ? 720 : 1240, h: role === "quote" ? 220 : 150, rotation: 0 },
        style: { font_size: role === "quote" ? 34 : 28, font_weight: 500, fill: "#101010", color: "#f5f1eb", padding: 22, border_radius: 22 },
      });
      cursorY = quoteY + (role === "quote" ? 244 : 176);
    }

    if (bullets.length > 0) {
      const bulletY = Math.min(cursorY, 660);
      push("bullets", {
        text: bullets.slice(0, 6).join("\n"),
        geometry: { x: 110, y: bulletY, w: hasRightImage ? 720 : 820, h: 220, rotation: 0 },
        style: { font_size: 26, line_height: 1.42, paragraph_spacing: 16, color: "#f1ede6" },
      });
      cursorY = bulletY + 230;
    }

    if (cards.length > 0) {
      const grid = cards.slice(0, role === "compare" ? 2 : 4);
      const columns = role === "compare" ? 2 : grid.length >= 3 ? 3 : Math.min(2, grid.length);
      const startX = role === "compare" ? 110 : hasRightImage ? 110 : 110;
      const startY = role === "compare" ? Math.max(cursorY, 250) : Math.max(hasRightImage ? 500 : cursorY, 300);
      const availableWidth = role === "compare" ? 1370 : hasRightImage ? 1370 : 1370;
      const gap = 22;
      const cardWidth = Math.floor((availableWidth - gap * (columns - 1)) / columns);
      grid.forEach((text, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        push("card", {
          text,
          geometry: {
            x: startX + column * (cardWidth + gap),
            y: startY + row * 186,
            w: cardWidth,
            h: role === "compare" ? 320 : 164,
            rotation: 0,
          },
          style: {
            font_size: role === "compare" ? 25 : 23,
            fill: "#121212",
            color: "#f4eee7",
            border_color: "#2f2f2f",
            border_width: 1,
            padding: 20,
            border_radius: 20,
            appearance_preset: "soft",
            shape_variant: "rounded",
          },
        });
      });
    }

    if (!hasRightImage && images[0] && role !== "quote") {
      push("image", {
        src: images[0],
        geometry: { x: 980, y: 230, w: 420, h: 300, rotation: 0 },
        style: { border_radius: 24, border_width: 0, object_fit: "cover" },
      });
    }
  }

  if (elements.length === 0) return null;

  return normalizeSlide(
    {
      id: createId("slide"),
      title,
      role,
      z_order: slideIndex + 1,
      elements,
      style_refs: { global: true, slide_override_key: `imported_reveal_${slideIndex + 1}` },
      content_refs: {},
      sync_status: "needs_review",
    },
    slideIndex
  );
}

function getRevealImportedStyleSystem() {
  return {
    deck_style: {
      direction: "editorial-dark",
      tone: "high-contrast, essay-driven, cinematic",
    },
    typography: {
      font_display: "Noto Serif SC",
      font_body: "Noto Sans SC",
      cover_title_size: 84,
      section_title_size: 56,
      body_size: 28,
      caption_size: 18,
    },
    color: {
      bg: "#070707",
      fg: "#f3f1eb",
      accent: "#a73a3a",
      muted: "#a99f96",
    },
    slide_overrides: {},
  };
}

function inferRevealSlideRole(sectionNode, container, signals) {
  if (container.querySelector(".cover-title") || container.classList.contains("cover-slide")) return "cover";
  if (sectionNode.classList.contains("divider-slide")) return "divider";
  if (container.querySelector(".compare-col")) return "compare";
  if (container.className.includes("annotation") || signals.quote) return "quote";
  if (signals.stats.length >= 2) return "data";
  return "content";
}

function extractRevealTitle(container) {
  const selectors = ["h1.cover-title", ".title-xl", ".title-lg", ".title-md", "h1", "h2", "h3"];
  for (const selector of selectors) {
    const text = collapseWhitespace(container.querySelector(selector)?.textContent || "");
    if (text) return text;
  }
  return "";
}

function extractRevealSubtitle(container) {
  const selectors = [".cover-subtitle", ".summary-kicker", ".cover-label", ".source-chip"];
  for (const selector of selectors) {
    const text = collapseWhitespace(container.querySelector(selector)?.textContent || "");
    if (text) return text;
  }
  return "";
}

function extractRevealLead(container, title) {
  const selectors = [".cover-summary", ".lede", ".summary-card-text", ".summary-text"];
  for (const selector of selectors) {
    const text = collapseWhitespace(container.querySelector(selector)?.textContent || "");
    if (text && text !== title) return text;
  }
  return "";
}

function extractRevealQuote(container) {
  const selectors = [".annotation-quote", ".quote-card blockquote", "blockquote", ".quote-card p"];
  for (const selector of selectors) {
    const text = collapseWhitespace(container.querySelector(selector)?.textContent || "");
    if (text) return text;
  }
  return "";
}

function extractRevealBullets(container) {
  return uniqueText(
    [...container.querySelectorAll("li, .chain-step, .closing-point")]
      .map((node) => collapseWhitespace(node.textContent || ""))
      .filter(Boolean)
  );
}

function extractRevealStats(container) {
  return [...container.querySelectorAll(".stat-card")]
    .map((node) => {
      const value = collapseWhitespace(
        node.querySelector(".stat-number, .stat-value, [class*='number'], [class*='value']")?.textContent || ""
      );
      const label = collapseWhitespace(
        node.querySelector(".stat-label, [class*='label'], p, div:last-child")?.textContent || ""
      );
      const merged = [value, label].filter(Boolean).join("\n");
      return merged || collapseWhitespace(node.textContent || "");
    })
    .filter(Boolean);
}

function extractRevealCards(container) {
  return uniqueText(
    [...container.querySelectorAll(".panel, .card, .compare-col, .summary-card, .annotation-note")]
      .map((node) => {
        const title = collapseWhitespace(node.querySelector("h3, h4, strong, .summary-card-label")?.textContent || "");
        const body = uniqueText(
          [...node.querySelectorAll(".summary-card-text, p, li")]
            .map((child) => collapseWhitespace(child.textContent || ""))
            .filter(Boolean)
        ).join("\n");
        const fallback = collapseWhitespace(node.textContent || "");
        return [title, body].filter(Boolean).join("\n") || fallback;
      })
      .filter(Boolean)
  );
}

function extractRevealImages(container, basePath = "") {
  return uniqueText(
    [...container.querySelectorAll("img")]
      .map((img) => resolveImportedAssetPath(collapseWhitespace(img.getAttribute("src") || ""), basePath))
      .filter((src) => src && !src.startsWith("data:"))
  );
}

function resolveImportedAssetPath(src, basePath = "") {
  const normalized = collapseWhitespace(src);
  if (!normalized) return "";
  if (/^(https?:|data:|blob:|file:)/i.test(normalized)) return normalized;
  if (!basePath) return normalized;
  try {
    return new URL(normalized, basePath).href;
  } catch (error) {
    return normalized;
  }
}

function uniqueText(values) {
  const seen = new Set();
  const output = [];
  values.forEach((value) => {
    const normalized = collapseWhitespace(value);
    if (!normalized) return;
    if (seen.has(normalized)) return;
    seen.add(normalized);
    output.push(normalized);
  });
  return output;
}

function collapseWhitespace(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function setModel(model) {
  state.editorMode = "deck";
  state.model = normalizeModel(model);
  state.activeSlideId = state.model.slides[0]?.id || null;
  state.activeElementId = null;
  state.drag = null;
  state.resize = null;
  state.guides = [];
  renderAll();
}

function getBaseStyleSystem() {
  return {
    deck_style: {
      direction: "editorial-minimal",
      tone: "sharp, restrained, high-contrast",
    },
    typography: {
      font_display: "Space Grotesk",
      font_body: "IBM Plex Sans",
      cover_title_size: 72,
      section_title_size: 44,
      body_size: 24,
      caption_size: 16,
    },
    color: {
      bg: "#f7f3ec",
      fg: "#111111",
      accent: "#c65531",
      muted: "#786f65",
    },
    slide_overrides: {},
  };
}

function createDefaultModel() {
  return {
    deck: {
      title: "Workbench Demo Deck",
      mode: "basic",
      export_target: "html",
      slide_size: "16:9",
    },
    style_system: getBaseStyleSystem(),
    slides: [
      {
        id: "slide_1",
        title: "Why Teams Struggle To Ship AI Workflows",
        role: "cover",
        z_order: 1,
        elements: [
          createElementPreset("text", 0, {
            id: "title_1",
            variant: "title",
            text: "AI adoption is fast, but workflow maturity is slow.",
            geometry: { x: 120, y: 120, w: 1220, h: 180, rotation: 0 },
            style: { font_size: 74, font_weight: 700, line_height: 1.02 },
          }),
          createElementPreset("quote", 1, {
            id: "quote_1",
            text: "The bottleneck is not model quality. It is delivery structure.",
            geometry: { x: 124, y: 360, w: 850, h: 120, rotation: 0 },
            style: { font_size: 36, border_width: 0, fill: "#f7f3ec", padding: 20 },
          }),
          createElementPreset("card", 2, {
            id: "card_1",
            text: "Execution gap\nTeams need stronger structure, not more decorative slides.",
            geometry: { x: 1060, y: 560, w: 390, h: 220, rotation: 0 },
            style: { appearance_preset: "soft", border_radius: 20, fill: "#fff8ef" },
          }),
        ],
        style_refs: { global: true, slide_override_key: "slide_1" },
        content_refs: {
          theme_breakdown: "slide_1",
          deck_script: "slide_1",
          visual_plan: "slide_1",
          image_plan: "slide_1",
        },
        sync_status: "synced",
      },
    ],
    sync_status: "synced",
  };
}

function createElementPreset(type, index, override = {}) {
  const defaults = {
    text: {
      variant: "body",
      text: "Type here",
      geometry: { x: 160, y: 120, w: 520, h: 120, rotation: 0 },
      style: { font_size: 42, font_weight: 600 },
    },
    bullets: {
      variant: "body",
      text: "First point\nSecond point\nThird point",
      geometry: { x: 160, y: 160, w: 560, h: 260, rotation: 0 },
      style: { font_size: 26, paragraph_spacing: 14 },
    },
    quote: {
      variant: "body",
      text: "A sharp line deserves a sharp slide.",
      geometry: { x: 160, y: 180, w: 760, h: 170, rotation: 0 },
      style: { font_size: 38, border_width: 0, fill: "#f7f3ec", padding: 20 },
    },
    stat: {
      variant: "metric",
      text: "42%\nWorkflow lifted after structure lock",
      geometry: { x: 180, y: 180, w: 420, h: 240, rotation: 0 },
      style: { font_size: 90, font_weight: 700, fill: "#fffaf4", padding: 18 },
    },
    card: {
      variant: "body",
      text: "Card title\nCard body",
      geometry: { x: 840, y: 180, w: 420, h: 260, rotation: 0 },
      style: { font_size: 25, fill: "#fffaf2", border_radius: 18, padding: 18, appearance_preset: "soft", shape_variant: "rounded" },
    },
    image: {
      variant: "hero",
      text: "",
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
      geometry: { x: 850, y: 140, w: 520, h: 360, rotation: 0 },
      style: { border_radius: 18, border_width: 0, object_fit: "cover", padding: 0 },
    },
    shape: {
      variant: "decorative",
      text: "",
      geometry: { x: 180, y: 520, w: 360, h: 80, rotation: 0 },
      style: { fill: "#f3c6b3", border_color: "#c65531", border_width: 2, shape_variant: "pill", padding: 0, border_radius: 40 },
    },
    container: {
      variant: "frame",
      text: "Content Frame",
      geometry: { x: 760, y: 520, w: 520, h: 220, rotation: 0 },
      style: { fill: "rgba(255,255,255,0.18)", border_color: "#b89f8f", border_width: 2, border_radius: 16, padding: 16, appearance_preset: "outlined" },
    },
    diagram: {
      variant: "diagram",
      text: "DIAGRAM placeholder",
      geometry: { x: 160, y: 520, w: 420, h: 220, rotation: 0 },
      style: { fill: "#f5efe4", border_color: "#d6c8b5", border_width: 2, border_radius: 16, padding: 16 },
    },
    chart: {
      variant: "chart",
      text: "CHART placeholder",
      geometry: { x: 640, y: 520, w: 520, h: 240, rotation: 0 },
      style: { fill: "#f5efe4", border_color: "#d6c8b5", border_width: 2, border_radius: 16, padding: 16 },
    },
  };

  const preset = defaults[type] || defaults.text;
  return normalizeElement(
    {
      id: override.id || createId(type),
      type,
      variant: override.variant || preset.variant,
      text: override.text != null ? override.text : preset.text,
      src: override.src != null ? override.src : preset.src || "",
      geometry: override.geometry || offsetGeometry(preset.geometry, index),
      style: {
        ...createDefaultElementStyle(type),
        ...preset.style,
        ...(override.style || {}),
      },
      layer: index + 1,
      sync_status: override.sync_status || "synced",
    },
    index
  );
}

function createDefaultElementStyle(type) {
  const deckStyle = getBaseStyleSystem();
  const transparentFillTypes = new Set(["text", "bullets", "quote"]);
  return {
    color: deckStyle.color.fg,
    fill: type === "shape" ? "#f3c6b3" : transparentFillTypes.has(type) ? "transparent" : "#ffffff",
    border_color: "#d8cbbd",
    border_width: type === "text" || type === "bullets" || type === "quote" || type === "stat" ? 0 : 1,
    border_radius: type === "card" ? 18 : 0,
    font_size: type === "text" ? 28 : type === "stat" ? 80 : 24,
    font_weight: type === "quote" ? 500 : 600,
    text_align: "left",
    vertical_align: "start",
    line_height: 1.2,
    letter_spacing: 0,
    paragraph_spacing: 12,
    padding: type === "text" || type === "bullets" || type === "quote" ? 0 : 16,
    shape_variant: type === "shape" ? "rect" : "rounded",
    appearance_preset: type === "card" ? "soft" : "plain",
    list_style: "disc",
    object_fit: "cover",
    accent: deckStyle.color.accent,
    opacity: 1,
  };
}

function normalizeModel(data) {
  const fallback = createDefaultModel();
  const model = typeof data === "object" && data ? data : fallback;
  if (!model.deck) model.deck = fallback.deck;
  if (!model.style_system) model.style_system = fallback.style_system;
  if (!Array.isArray(model.slides) || model.slides.length === 0) model.slides = fallback.slides;
  if (!model.sync_status) model.sync_status = "synced";
  model.slides = model.slides.map((slide, index) => normalizeSlide(slide, index));
  normalizeSlideLayers(model.slides);
  return model;
}

function normalizeSlide(slide, index) {
  const normalized = slide && typeof slide === "object" ? slide : {};
  normalized.id = normalized.id || createId("slide");
  normalized.title = normalized.title || `Slide ${index + 1}`;
  normalized.role = normalized.role || "content";
  normalized.z_order = index + 1;
  normalized.elements = Array.isArray(normalized.elements) ? normalized.elements.map((item, itemIndex) => normalizeElement(item, itemIndex)) : [];
  normalized.style_refs = normalized.style_refs || { global: true, slide_override_key: normalized.id };
  normalized.content_refs = normalized.content_refs || {};
  normalized.sync_status = normalized.sync_status || "synced";
  return normalized;
}

function normalizeElement(item, index) {
  const normalized = item && typeof item === "object" ? item : {};
  normalized.id = normalized.id || createId("element");
  normalized.type = normalized.type || "text";
  normalized.variant = normalized.variant || "body";
  normalized.text = typeof normalized.text === "string" ? normalized.text : "";
  normalized.src = typeof normalized.src === "string" ? normalized.src : "";
  normalized.geometry = normalized.geometry || { x: 80, y: 80, w: 360, h: 140, rotation: 0 };
  normalized.geometry.x = numeric(normalized.geometry.x, 80);
  normalized.geometry.y = numeric(normalized.geometry.y, 80);
  normalized.geometry.w = Math.max(40, numeric(normalized.geometry.w, 360));
  normalized.geometry.h = Math.max(28, numeric(normalized.geometry.h, 140));
  normalized.geometry.rotation = numeric(normalized.geometry.rotation, 0);
  normalized.style = { ...createDefaultElementStyle(normalized.type), ...(normalized.style || {}) };
  normalized.layer = Number.isFinite(Number(normalized.layer)) ? Number(normalized.layer) : index + 1;
  normalized.sync_status = normalized.sync_status || "synced";
  return normalized;
}

function normalizeSlideLayers(slidesInput = state.model.slides) {
  slidesInput.forEach((slide, slideIndex) => {
    slide.z_order = slideIndex + 1;
    normalizeElementLayers(slide);
  });
}

function normalizeElementLayers(slide) {
  slide.elements
    .sort((a, b) => (a.layer || 1) - (b.layer || 1))
    .forEach((element, elementIndex) => {
      element.layer = elementIndex + 1;
    });
}

function getActiveSlide() {
  return state.model.slides.find((slide) => slide.id === state.activeSlideId) || null;
}

function getActiveElement() {
  const slide = getActiveSlide();
  if (!slide) return null;
  return slide.elements.find((element) => element.id === state.activeElementId) || null;
}

function getElementById(id) {
  const slide = getActiveSlide();
  if (!slide) return null;
  return slide.elements.find((element) => element.id === id) || null;
}

function markDirty() {
  state.model.sync_status = "needs_review";
}

function getCanvasScale() {
  const rect = el.canvasViewport.getBoundingClientRect();
  const maxW = Math.max(200, rect.width - 36);
  const maxH = Math.max(150, rect.height - 36);
  return Math.min(maxW / BASE_WIDTH, maxH / BASE_HEIGHT);
}

function getResolvedElementStyle(element) {
  const style = { ...createDefaultElementStyle(element.type), ...(element.style || {}) };
  if (style.appearance_preset === "soft") {
    style.fill = style.fill === "#ffffff" ? "#fff7ef" : style.fill;
    style.border_width = Math.max(style.border_width, 1);
  }
  if (style.appearance_preset === "outlined") {
    style.fill = "rgba(255,255,255,0.12)";
    style.border_width = Math.max(style.border_width, 2);
  }
  if (style.appearance_preset === "glass") {
    style.fill = "rgba(255,255,255,0.48)";
    style.border_width = 1;
  }
  if (style.appearance_preset === "metric") {
    style.fill = "#fff7ef";
    style.border_width = 0;
  }
  if (element.type === "quote") style.border_width = 0;
  return style;
}

function resolveShadow(style, scale) {
  if (style.appearance_preset === "glass" || style.appearance_preset === "soft" || style.appearance_preset === "metric") {
    return `0 ${8 * scale}px ${24 * scale}px rgba(34, 23, 14, 0.12)`;
  }
  return "none";
}

function pickFontFamily(element, style) {
  if (element.type === "quote") return `"Instrument Serif", serif`;
  if (element.variant === "title" || element.type === "stat") return `"${state.model.style_system.typography.font_display}", sans-serif`;
  return `"${state.model.style_system.typography.font_body}", sans-serif`;
}

function mapVerticalAlign(value) {
  if (value === "center") return "center";
  if (value === "end") return "flex-end";
  return "flex-start";
}

function splitLines(text) {
  return String(text || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function getElementLabel(element) {
  const firstLine = splitLines(element.text)[0];
  if (firstLine) return firstLine.slice(0, 42);
  if (element.type === "image") return element.src ? t("imageLabel") : t("imagePlaceholder");
  return t("typeElementFallback", { type: getTypeLabel(element.type) });
}

function cloneElement(element) {
  return JSON.parse(JSON.stringify(element));
}

function offsetGeometry(geometry, index) {
  return {
    x: geometry.x + index * 18,
    y: geometry.y + index * 16,
    w: geometry.w,
    h: geometry.h,
    rotation: geometry.rotation,
  };
}

function createId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}_${Date.now().toString(36)}`;
}

function buildArtifactBundle(inputModel) {
  const model = normalizeModel(JSON.parse(JSON.stringify(inputModel)));
  const slides = [...model.slides].sort((a, b) => a.z_order - b.z_order);
  const styleSystem = buildStyleSystem(model.style_system);
  const keywordLimit = model.deck.mode === "advanced" ? 4 : 2;
  const slideInsights = slides.map((slide, index) => analyzeSlide(slide, index + 1, keywordLimit));

  return [
    { name: "deck_brief.md", mime: "text/markdown", content: renderDeckBrief(model, slideInsights) },
    { name: "theme_breakdown.md", mime: "text/markdown", content: renderThemeBreakdown(model, slideInsights) },
    { name: "deck_script.md", mime: "text/markdown", content: renderDeckScript(model, slideInsights) },
    { name: "visual_plan.md", mime: "text/markdown", content: renderVisualPlan(model, slideInsights) },
    { name: "image_plan.md", mime: "text/markdown", content: renderImagePlan(model, slideInsights) },
    { name: "qa_report.md", mime: "text/markdown", content: renderQaReport(model, slideInsights) },
    { name: "style_system.json", mime: "application/json", content: JSON.stringify(styleSystem, null, 2) },
    { name: "deck_manifest.json", mime: "application/json", content: JSON.stringify(buildDeckManifest(model, styleSystem, slideInsights), null, 2) },
  ];
}

function analyzeSlide(slide, pageNumber, keywordLimit) {
  const textElements = [...slide.elements].filter((item) => TEXTUAL_TYPES.has(item.type)).sort((a, b) => a.layer - b.layer);
  const imageElements = slide.elements.filter((item) => item.type === "image");
  const chartElements = slide.elements.filter((item) => item.type === "chart");
  const diagramElements = slide.elements.filter((item) => item.type === "diagram");
  const shapeElements = slide.elements.filter((item) => item.type === "shape");
  const thesis = pickSlideThesis(slide.title, textElements);
  const scriptLines = textElements.flatMap((item) => splitLines(item.text)).map(collapseWhitespace);
  const visualRole = pickVisualRole(slide, textElements, imageElements, chartElements, diagramElements, shapeElements);
  const keywords = extractKeywords(`${slide.title || ""} ${thesis}`, keywordLimit);
  const textCharCount = scriptLines.join(" ").length;
  return { pageNumber, slide, thesis, scriptLines, visualRole, keywords, imageElements, chartElements, diagramElements, textCharCount };
}

function renderDeckBrief(model, insights) {
  return [
    "# Deck Brief",
    "",
    `- Title: ${model.deck.title || "Untitled Deck"}`,
    `- Mode: ${model.deck.mode || "basic"}`,
    `- Export Target: ${model.deck.export_target || "html"}`,
    `- Slide Size: ${model.deck.slide_size || "16:9"}`,
    `- Slide Count: ${insights.length}`,
    `- Style Direction: ${model.style_system.deck_style?.direction || "unspecified"}`,
    `- Tone: ${model.style_system.deck_style?.tone || "unspecified"}`,
    "",
    "## Core Message",
    buildCoreMessage(insights),
    "",
    "## Workflow Note",
    "This brief was projected from deck_model-first editing, not typed manually.",
    "",
  ].join("\n");
}

function renderThemeBreakdown(model, insights) {
  const lines = ["# Theme Breakdown", "", `Deck: ${model.deck.title || "Untitled Deck"}`, ""];
  insights.forEach((item) => {
    lines.push(`## Slide ${item.pageNumber} - ${item.slide.title || `Slide ${item.pageNumber}`}`);
    lines.push(`- Role: ${item.slide.role || "content"}`);
    lines.push(`- Thesis: ${item.thesis}`);
    lines.push(`- Visual Role: ${item.visualRole}`);
    lines.push(`- Keywords: ${item.keywords.join(", ") || "none"}`);
    lines.push("");
  });
  return lines.join("\n");
}

function renderDeckScript(model, insights) {
  const lines = ["# Deck Script", "", `Deck: ${model.deck.title || "Untitled Deck"}`, ""];
  insights.forEach((item) => {
    lines.push(`## Scene ${item.pageNumber}`);
    lines.push(`Title: ${item.slide.title || `Slide ${item.pageNumber}`}`);
    lines.push(`Thesis: ${item.thesis}`);
    if (item.scriptLines.length === 0) {
      lines.push("Copy: [No text content yet]");
    } else {
      item.scriptLines.forEach((line, index) => lines.push(`Copy ${index + 1}: ${line}`));
    }
    lines.push("");
  });
  return lines.join("\n");
}

function renderVisualPlan(model, insights) {
  const lines = ["# Visual Plan", "", `Deck: ${model.deck.title || "Untitled Deck"}`, ""];
  insights.forEach((item) => {
    lines.push(`## Slide ${item.pageNumber} - ${item.slide.title || `Slide ${item.pageNumber}`}`);
    lines.push(`- Visual Role: ${item.visualRole}`);
    lines.push(`- Placement Notes: ${summarizeElementPlacement(item.slide.elements)}`);
    lines.push(item.chartElements.length > 0 || item.diagramElements.length > 0 ? `- Visualization: charts=${item.chartElements.length}, diagrams=${item.diagramElements.length}` : "- Visualization: typography/card/image composition");
    lines.push("");
  });
  return lines.join("\n");
}

function renderImagePlan(model, insights) {
  const lines = ["# Image Plan", "", `Deck: ${model.deck.title || "Untitled Deck"}`, ""];
  insights.forEach((item) => {
    lines.push(`## Slide ${item.pageNumber} - ${item.slide.title || `Slide ${item.pageNumber}`}`);
    lines.push(`- Thesis: ${item.thesis}`);
    lines.push(`- Keywords: ${item.keywords.join(", ") || "none"}`);
    if (item.imageElements.length === 0) {
      lines.push("- Image Status: no image element on this slide");
      lines.push("");
      return;
    }
    item.imageElements.forEach((img, index) => {
      const hasSource = Boolean((img.src || "").trim());
      lines.push(`- Image ${index + 1}: id=${img.id}`);
      lines.push(`- Source: ${hasSource ? img.src : "[missing]"}`);
      lines.push(`- Download Status: ${hasSource ? "needs-local-download-or-cache" : "missing"}`);
      lines.push("- Fallback: if download fails, keep source link for manual download");
    });
    lines.push("");
  });
  return lines.join("\n");
}

function renderQaReport(model, insights) {
  const checks = [];
  const warnings = [];
  const failures = [];
  if (insights.length > 0) checks.push(`Slide count: ${insights.length}`);
  else failures.push("No slides found.");

  insights.forEach((item) => {
    if (!item.slide.title?.trim()) failures.push(`Slide ${item.pageNumber}: missing title.`);
    if (!item.thesis || item.thesis === "No thesis captured yet.") warnings.push(`Slide ${item.pageNumber}: weak thesis.`);
    if (item.textCharCount > 320) warnings.push(`Slide ${item.pageNumber}: text density is high (${item.textCharCount} chars).`);
    item.imageElements.forEach((img) => {
      if (!img.src?.trim()) warnings.push(`Slide ${item.pageNumber}: image ${img.id} has empty source.`);
    });
  });

  return [
    "# QA Report",
    "",
    `Deck: ${model.deck.title || "Untitled Deck"}`,
    "",
    "## Passed Checks",
    ...(checks.length > 0 ? checks.map((item) => `- ${item}`) : ["- none"]),
    "",
    "## Warnings",
    ...(warnings.length > 0 ? warnings.map((item) => `- ${item}`) : ["- none"]),
    "",
    "## Failures",
    ...(failures.length > 0 ? failures.map((item) => `- ${item}`) : ["- none"]),
    "",
    `Overall Status: ${failures.length > 0 ? "fail" : warnings.length > 0 ? "pass-with-warnings" : "pass"}`,
  ].join("\n");
}

function buildStyleSystem(styleInput) {
  const fallback = createDefaultModel().style_system;
  const style = styleInput && typeof styleInput === "object" ? styleInput : fallback;
  return {
    deck_style: {
      direction: style.deck_style?.direction || fallback.deck_style.direction,
      tone: style.deck_style?.tone || fallback.deck_style.tone,
    },
    typography: {
      font_display: style.typography?.font_display || fallback.typography.font_display,
      font_body: style.typography?.font_body || fallback.typography.font_body,
      cover_title_size: numberOr(style.typography?.cover_title_size, fallback.typography.cover_title_size),
      section_title_size: numberOr(style.typography?.section_title_size, fallback.typography.section_title_size),
      body_size: numberOr(style.typography?.body_size, fallback.typography.body_size),
      caption_size: numberOr(style.typography?.caption_size, fallback.typography.caption_size),
    },
    color: {
      bg: normalizeColor(style.color?.bg || fallback.color.bg),
      fg: normalizeColor(style.color?.fg || fallback.color.fg),
      accent: normalizeColor(style.color?.accent || fallback.color.accent),
      muted: normalizeColor(style.color?.muted || fallback.color.muted),
    },
    layout: {
      content_width: numberOr(style.layout?.content_width, 1200),
      grid_gap: numberOr(style.layout?.grid_gap, 24),
      panel_radius: numberOr(style.layout?.panel_radius, 20),
    },
    furniture: {
      progress_style: style.furniture?.progress_style || "thin-bottom-line",
      arrow_style: style.furniture?.arrow_style || "transparent-small",
    },
    visualization: {
      chart_label_size: numberOr(style.visualization?.chart_label_size, 18),
      chart_grid_opacity: numberOr(style.visualization?.chart_grid_opacity, 0.12),
      card_fill: normalizeColor(style.visualization?.card_fill || "#f1e9de"),
    },
    slide_overrides: style.slide_overrides && typeof style.slide_overrides === "object" ? style.slide_overrides : {},
  };
}

function buildDeckManifest(model, styleSystem, insights) {
  return {
    deckTitle: model.deck.title || "Untitled Deck",
    slideSize: model.deck.slide_size || "16:9",
    themeTokens: {
      direction: styleSystem.deck_style.direction,
      tone: styleSystem.deck_style.tone,
      fontDisplay: styleSystem.typography.font_display,
      fontBody: styleSystem.typography.font_body,
      bg: styleSystem.color.bg,
      fg: styleSystem.color.fg,
      accent: styleSystem.color.accent,
    },
    slides: insights.map((item) => ({
      id: item.slide.id,
      title: item.slide.title || `Slide ${item.pageNumber}`,
      exportModeHint: "raster",
    })),
  };
}

function pickSlideThesis(title, textElements) {
  const firstLine = textElements.flatMap((item) => splitLines(item.text))[0];
  if (firstLine) return collapseWhitespace(firstLine);
  if (title) return collapseWhitespace(title);
  return "No thesis captured yet.";
}

function buildCoreMessage(insights) {
  return insights.slice(0, 2).map((item) => item.thesis).filter(Boolean).join(" ");
}

function pickVisualRole(slide, textElements, imageElements, chartElements, diagramElements, shapeElements) {
  if (chartElements.length > 0) return "chart-led";
  if (diagramElements.length > 0) return "diagram-led";
  if (imageElements.length > 0 && textElements.length <= 2) return "image-led";
  if (slide.elements.filter((item) => item.type === "card").length >= 2) return "card-led";
  if (shapeElements.length >= 2) return "shape-led";
  return "text-led";
}

function summarizeElementPlacement(elements) {
  return [...elements]
    .sort((a, b) => a.layer - b.layer)
    .slice(0, 5)
    .map((element) => `${element.type}:${Math.round(element.geometry.x)},${Math.round(element.geometry.y)} ${Math.round(element.geometry.w)}x${Math.round(element.geometry.h)}`)
    .join(" | ");
}

function extractKeywords(text, limit) {
  const normalized = String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff\s]/g, " ");
  const english = normalized.split(/\s+/).filter((item) => item.length >= 4);
  const chinese = String(text || "").match(/[\u4e00-\u9fff]{2,8}/g) || [];
  const unique = [];
  [...chinese, ...english].forEach((token) => {
    if (!unique.includes(token)) unique.push(token);
  });
  return unique.slice(0, Math.max(1, limit || 2));
}

function collapseWhitespace(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function parseLineHeight(value, fontSize) {
  const normalized = String(value || "").trim();
  if (!normalized || normalized === "normal") return 1.2;
  if (normalized.endsWith("px")) {
    const font = parsePixel(fontSize, 16) || 16;
    return roundNumber(parsePixel(normalized, font * 1.2) / font, 2);
  }
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 1.2;
}

function parseBoxShorthand(value) {
  const parts = String(value || "0")
    .split(/\s+/)
    .map((part) => parsePixel(part, 0));
  if (parts.length === 1) return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] };
  if (parts.length === 2) return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] };
  if (parts.length === 3) return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[1] };
  return { top: parts[0] || 0, right: parts[1] || 0, bottom: parts[2] || 0, left: parts[3] || 0 };
}

function roundNumber(value, digits = 0) {
  const factor = 10 ** digits;
  return Math.round((Number(value) || 0) * factor) / factor;
}

function downloadFile(name, content, mimeType) {
  const blob = new Blob([content], { type: mimeType || "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

function isEditingTextField(target) {
  const tag = target?.tagName?.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || target?.isContentEditable;
}

function parsePixel(value, fallback = 0) {
  const parsed = Number.parseFloat(String(value || "").replace("px", ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clampNumeric(key, value, fallback) {
  const parsed = numeric(value, fallback);
  if (key === "w") return Math.max(40, parsed);
  if (key === "h") return Math.max(28, parsed);
  return parsed;
}

function numeric(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function numberOr(value, fallback) {
  return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeColor(color) {
  if (typeof color !== "string") return "#111111";
  const trimmed = color.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed;
  const rgbMatch = trimmed.match(/^rgba?\(([^)]+)\)$/i);
  if (rgbMatch) {
    const [r, g, b] = rgbMatch[1]
      .split(",")
      .slice(0, 3)
      .map((part) => clamp(Math.round(Number.parseFloat(part) || 0), 0, 255));
    return `#${[r, g, b].map((part) => part.toString(16).padStart(2, "0")).join("")}`;
  }
  if (trimmed === "transparent") return "#000000";
  return "#111111";
}

function escapeAttributeSelector(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
