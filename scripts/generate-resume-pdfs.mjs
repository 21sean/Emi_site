// ─────────────────────────────────────────────
// scripts/generate-resume-pdfs.mjs
// Generates public/resume-ja.pdf and public/resume-zh.pdf
// Run:  node scripts/generate-resume-pdfs.mjs
// ─────────────────────────────────────────────

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "..", "public");
const fontsDir = path.resolve(__dirname, "fonts");

/* ── Colour palette ──────────────────────────── */
const BLACK = rgb(0.07, 0.07, 0.07);
const MUTED = rgb(0.42, 0.45, 0.5);
const ACCENT = rgb(0.11, 0.31, 0.85);

/* ── Resume data per language ──────────────── */

const resumeJa = {
  name: "小林 エミ",
  headline: "ディープテック、AI、産業政策の交差点で活動する戦略コンサルタント。",
  location: "サンディエゴ、CA",
  summary:
    "AI、先端製造業、官民投資の融合を専門とするMBA候補生兼戦略プロフェッショナル。テクノロジー政策と資本配分、市場戦略が交わる複雑な環境のナビゲーションを支援します。",
  sections: {
    summary: "概要",
    experience: "経歴",
    projects: "プロジェクト",
    skills: "スキル",
    languages: "言語",
  },
  experience: [
    {
      title: "マーケティングスペシャリスト",
      company: "ダッソー・システムズ · インターンシップ",
      dates: "2025年6月 – 現在",
      location: "サンディエゴ、CA・ハイブリッド",
      bullets: [
        "ダッソー・システムズのライフサイエンスブランドBIOVIAのマーケティングインターンとして、戦略的キャンペーンの開発と実行を支援するグローバルソフトウェアマーケティングチームで活動。",
      ],
    },
    {
      title: "グローバルマーケティング/事業開発マネージャー",
      company: "モアテックグループ · 正社員",
      dates: "2020年4月 – 2024年7月",
      location: "東京、日本",
      bullets: [
        "B2Bマーケティングと事業開発戦略を指揮し、部門横断チームを率いて3年間で140%の収益成長を達成。",
        "主要ステークホルダーと協力して国際物流を合理化し、重大インシデントを90%削減。",
        "四半期ごとにCEOへ包括的な財務レポートを作成・報告。",
      ],
    },
    {
      title: "マーケティング/事業開発チームリード",
      company: "モアテックグループ",
      dates: "2019年4月 – 2020年4月",
      location: "東京、日本",
      bullets: [
        "B2Bマーケティングと事業開発を先導し、KPIとマルチチャネル獲得戦略でチームパフォーマンスを向上。",
        "クロスボーダー連携により売上目標を25%超過達成。データドリブン成長戦略で収益30%増加。",
      ],
    },
  ],
  projects: [
    {
      title: "政策から実践へ：ディープテックとAIが持続可能な成長と産業戦略をどう変革するか",
      dates: "2025年6月 – 2025年9月",
      summary:
        "CHIPS法、IRA、Stargateプロジェクトなど米国テクノロジー産業政策がディープテック、AI、先端製造業への資本流入をどう変革しているか分析。",
    },
    {
      title: "フィジカルAIとロボティクスコンサルティングプロジェクト",
      dates: "2025年3月 – 2025年6月",
      summary:
        "UCサンディエゴ – レイディ経営大学院（Intel）。今後5年間でAIがグローバルロボティクス産業をどう変革するか調査。",
    },
    {
      title: "サンディエゴイマージョンコンサルティングコンペティション – 第1位",
      dates: "2025年3月 – 2025年4月",
      summary:
        "イスラエルのスタートアップBzigoと協力し、AI蚊検出デバイスの米国市場参入戦略を策定。第1位受賞。",
    },
  ],
  skills: [
    { category: "戦略＆コンサルティング", items: "産業政策分析 · 戦略的財務分析 · Go-to-Market戦略 · M&A · ビジネスモデリング · テクノロジーコンサルティング" },
    { category: "AI＆ディープテック", items: "人工知能 · ロボティクス · AIと先端製造業 · バイオテック＆製薬戦略 · ライフサイエンス" },
    { category: "マーケティング＆グロース", items: "デジタルマーケティング戦略 · 市場調査＆競合分析 · コンテンツ開発 · CRM" },
    { category: "ツール", items: "Jira · Tableau · R Studio · MATLAB · JavaScript" },
  ],
  languages: [
    { name: "中国語", level: "ネイティブ" },
    { name: "英語", level: "ビジネスレベル" },
    { name: "日本語", level: "ビジネスレベル" },
    { name: "上海語", level: "ネイティブ" },
  ],
};

const resumeZh = {
  name: "小林 惠美",
  headline: "深科技、人工智能与产业政策交汇领域的战略顾问。",
  location: "圣迭戈，加利福尼亚",
  summary:
    "MBA候选人和战略专家，专注于人工智能、先进制造业和公私合作投资的融合。帮助组织驾驭技术政策与资本分配和市场战略交汇的复杂环境。",
  sections: {
    summary: "概述",
    experience: "工作经历",
    projects: "项目经历",
    skills: "专业技能",
    languages: "语言能力",
  },
  experience: [
    {
      title: "营销专员",
      company: "达索系统 · 实习",
      dates: "2025年6月 – 至今",
      location: "圣迭戈, CA · 混合办公",
      bullets: [
        "在达索系统旗下生命科学品牌BIOVIA担任营销实习生，参与全球软件营销团队，支持战略营销活动的开发与执行。",
      ],
    },
    {
      title: "全球营销/业务拓展经理",
      company: "Moretec集团 · 全职",
      dates: "2020年4月 – 2024年7月",
      location: "东京，日本",
      bullets: [
        "主导B2B营销和业务拓展战略，领导跨职能团队，在三年内实现了140%的收入增长。",
        "与关键利益相关者合作优化国际物流，将重大事故减少90%。",
        "每年为CEO准备并提交四份综合财务报告，提供关键数据分析和可执行洞察。",
      ],
    },
    {
      title: "营销/业务拓展团队负责人",
      company: "Moretec集团",
      dates: "2019年4月 – 2020年4月",
      location: "东京，日本",
      bullets: [
        "主导B2B营销和业务拓展计划，通过培训、KPI和多渠道获客策略提升团队绩效。",
        "通过跨境合作和市场分析超额完成销售目标25%；数据驱动增长策略使收入增长30%。",
      ],
    },
  ],
  projects: [
    {
      title: "从政策到实践：深科技与人工智能如何重塑可持续增长与产业战略",
      dates: "2025年6月 – 2025年9月",
      summary:
        "分析CHIPS法案、通胀削减法案和星际之门项目等美国技术产业政策如何改变深科技、AI和先进制造业的资本流向。",
    },
    {
      title: "物理AI与机器人咨询项目",
      dates: "2025年3月 – 2025年6月",
      summary:
        "加州大学圣迭戈分校 – 雷迪管理学院（Intel）。探索未来五年AI将如何改变全球机器人产业。",
    },
    {
      title: "圣迭戈沉浸式咨询大赛 – 第一名",
      dates: "2025年3月 – 2025年4月",
      summary:
        "与以色列初创公司Bzigo合作，为其AI蚊虫检测设备制定美国市场进入策略。荣获第一名。",
    },
  ],
  skills: [
    { category: "战略与咨询", items: "产业政策分析 · 战略财务分析 · 市场进入战略 · 并购 · 商业建模 · 技术咨询" },
    { category: "人工智能与深科技", items: "人工智能 · 机器人技术 · AI与先进制造 · 生物技术与制药战略 · 生命科学" },
    { category: "营销与增长", items: "数字营销战略 · 市场研究与竞争分析 · 内容开发 · CRM" },
    { category: "工具与技术", items: "Jira · Tableau · R Studio · MATLAB · JavaScript" },
  ],
  languages: [
    { name: "中文", level: "母语" },
    { name: "英语", level: "全面专业水平" },
    { name: "日语", level: "全面专业水平" },
    { name: "上海话", level: "母语" },
  ],
};

/* ── PDF rendering helpers ─────────────────── */

function wrapText(text, font, fontSize, maxWidth) {
  const words = text.split(/(\s+)/);
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const test = currentLine + word;
    try {
      const width = font.widthOfTextAtSize(test, fontSize);
      if (width > maxWidth && currentLine.length > 0) {
        lines.push(currentLine.trimEnd());
        currentLine = word.trimStart();
      } else {
        currentLine = test;
      }
    } catch {
      // If a character isn't in the font, push what we have and start fresh
      if (currentLine.length > 0) {
        lines.push(currentLine.trimEnd());
      }
      currentLine = word;
    }
  }
  if (currentLine.trimEnd().length > 0) {
    lines.push(currentLine.trimEnd());
  }
  return lines;
}

// CJK-aware word wrap: split on every character since CJK has no spaces between words
function wrapTextCJK(text, font, fontSize, maxWidth) {
  const chars = [...text];
  const lines = [];
  let currentLine = "";

  for (const ch of chars) {
    const test = currentLine + ch;
    try {
      const width = font.widthOfTextAtSize(test, fontSize);
      if (width > maxWidth && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = ch;
      } else {
        currentLine = test;
      }
    } catch {
      if (currentLine.length > 0) lines.push(currentLine);
      currentLine = ch;
    }
  }
  if (currentLine.length > 0) lines.push(currentLine);
  return lines;
}

async function generateResumePDF(data, fontPath, outputPath) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // Load CJK font
  const fontBytes = fs.readFileSync(fontPath);
  const cjkFont = await pdfDoc.embedFont(fontBytes, { subset: true });

  // Also embed Helvetica for any fallback Latin text
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Use CJK font for everything since it includes Latin glyphs too
  const font = cjkFont;
  const boldFont = cjkFont; // Variable font handles weight via the same embed

  const PAGE_W = 595.28; // A4
  const PAGE_H = 841.89;
  const MARGIN_LEFT = 50;
  const MARGIN_RIGHT = 50;
  const CONTENT_W = PAGE_W - MARGIN_LEFT - MARGIN_RIGHT;
  const LINE_HEIGHT = 14;

  let page = pdfDoc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - 50;

  function ensureSpace(needed) {
    if (y - needed < 50) {
      page = pdfDoc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - 50;
    }
  }

  function drawText(text, x, yPos, size, colour, usedFont) {
    const f = usedFont || font;
    try {
      page.drawText(text, { x, y: yPos, size, font: f, color: colour });
    } catch {
      // Fallback: try Helvetica for unsupported glyphs
      try {
        page.drawText(text, { x, y: yPos, size, font: helvetica, color: colour });
      } catch {
        // Skip un-renderable text
      }
    }
  }

  function drawWrapped(text, x, size, colour, maxW) {
    const lines = wrapTextCJK(text, font, size, maxW || CONTENT_W);
    for (const line of lines) {
      ensureSpace(LINE_HEIGHT + 2);
      drawText(line, x, y, size, colour);
      y -= LINE_HEIGHT;
    }
  }

  function sectionHeader(title) {
    ensureSpace(30);
    y -= 8;
    drawText(title.toUpperCase(), MARGIN_LEFT, y, 9, ACCENT);
    y -= 4;
    // Draw line
    page.drawLine({
      start: { x: MARGIN_LEFT, y },
      end: { x: PAGE_W - MARGIN_RIGHT, y },
      thickness: 0.5,
      color: rgb(0.85, 0.87, 0.9),
    });
    y -= 12;
  }

  // ── Name ──
  drawText(data.name, MARGIN_LEFT, y, 20, BLACK);
  y -= 16;

  // ── Headline ──
  drawWrapped(data.headline, MARGIN_LEFT, 9, MUTED, CONTENT_W);
  y -= 2;

  // ── Location ──
  drawText(data.location, MARGIN_LEFT, y, 8, MUTED);
  y -= 20;

  // ── Summary ──
  sectionHeader(data.sections.summary);
  drawWrapped(data.summary, MARGIN_LEFT, 9, MUTED, CONTENT_W);
  y -= 6;

  // ── Experience ──
  sectionHeader(data.sections.experience);
  for (const exp of data.experience) {
    ensureSpace(50);
    drawText(exp.title, MARGIN_LEFT, y, 10, BLACK);

    // Dates on the right
    try {
      const datesW = font.widthOfTextAtSize(exp.dates, 8);
      drawText(exp.dates, PAGE_W - MARGIN_RIGHT - datesW, y, 8, MUTED);
    } catch {
      drawText(exp.dates, PAGE_W - MARGIN_RIGHT - 80, y, 8, MUTED);
    }
    y -= 12;

    drawText(exp.company, MARGIN_LEFT, y, 8, MUTED);
    y -= 10;
    drawText(exp.location, MARGIN_LEFT, y, 8, MUTED);
    y -= 12;

    for (const bullet of exp.bullets) {
      ensureSpace(LINE_HEIGHT + 4);
      drawText("•", MARGIN_LEFT + 4, y, 8, MUTED);
      const bulletLines = wrapTextCJK(bullet, font, 8, CONTENT_W - 16);
      for (const line of bulletLines) {
        ensureSpace(LINE_HEIGHT);
        drawText(line, MARGIN_LEFT + 16, y, 8, MUTED);
        y -= 11;
      }
    }
    y -= 6;
  }

  // ── Projects ──
  sectionHeader(data.sections.projects);
  for (const proj of data.projects) {
    ensureSpace(40);
    drawText(proj.title.length > 60 ? proj.title.substring(0, 57) + "..." : proj.title, MARGIN_LEFT, y, 10, BLACK);

    try {
      const datesW = font.widthOfTextAtSize(proj.dates, 8);
      drawText(proj.dates, PAGE_W - MARGIN_RIGHT - datesW, y, 8, MUTED);
    } catch {
      drawText(proj.dates, PAGE_W - MARGIN_RIGHT - 80, y, 8, MUTED);
    }
    y -= 12;

    drawWrapped(proj.summary, MARGIN_LEFT, 8, MUTED, CONTENT_W);
    y -= 8;
  }

  // ── Skills ──
  sectionHeader(data.sections.skills);
  for (const group of data.skills) {
    ensureSpace(LINE_HEIGHT + 4);
    const label = group.category + ": ";
    drawText(label, MARGIN_LEFT, y, 8, BLACK);
    try {
      const labelW = font.widthOfTextAtSize(label, 8);
      const itemLines = wrapTextCJK(group.items, font, 8, CONTENT_W - labelW);
      let first = true;
      for (const line of itemLines) {
        if (!first) {
          ensureSpace(LINE_HEIGHT);
        }
        drawText(line, MARGIN_LEFT + (first ? labelW : 0), y, 8, MUTED);
        y -= 11;
        first = false;
      }
    } catch {
      y -= 11;
    }
    y -= 2;
  }

  // ── Languages ──
  sectionHeader(data.sections.languages);
  const langParts = data.languages.map((l) => `${l.name} (${l.level})`);
  drawWrapped(langParts.join("   "), MARGIN_LEFT, 8, MUTED, CONTENT_W);

  // Save
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`✓ Generated ${outputPath} (${(pdfBytes.length / 1024).toFixed(0)} KB)`);
}

/* ── Generate both PDFs ────────────────────── */

const jaFontPath = path.join(fontsDir, "NotoSansJP.ttf");
const zhFontPath = path.join(fontsDir, "NotoSansSC.ttf");

await generateResumePDF(resumeJa, jaFontPath, path.join(publicDir, "resume-ja.pdf"));
await generateResumePDF(resumeZh, zhFontPath, path.join(publicDir, "resume-zh.pdf"));

console.log("\nDone! Both translated resume PDFs generated.");
