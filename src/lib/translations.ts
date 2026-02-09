// ─────────────────────────────────────────────
// Translations — English · Japanese · Chinese
// ─────────────────────────────────────────────

import type { Profile } from "@/data/profile";
import baseProfile from "@/data/profile";

/* ── Language codes ────────────────────────── */

export type Lang = "en" | "ja" | "zh";

export const LANGUAGES: { code: Lang; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語" },
  { code: "zh", label: "Chinese", nativeLabel: "中文" },
];

/* ── UI string type ────────────────────────── */

export interface UI {
  nav: {
    home: string;
    projects: string;
    about: string;
    resume: string;
    contact: string;
  };
  common: {
    downloadResume: string;
    viewAll: string;
    all: string;
  };
  home: {
    viewProjects: string;
    getInTouch: string;
    featuredProjects: string;
    skills: string;
    interestedTitle: string;
    interestedDesc: string;
    contactMe: string;
  };
  about: {
    title: string;
    focusAreas: string;
    values: string;
    interests: string;
    languages: string;
    experience: string;
  };
  resume: {
    summary: string;
    experience: string;
    projects: string;
    skills: string;
    languages: string;
  };
  contact: {
    title: string;
    description: string;
    connect: string;
    location: string;
    formNotice: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    sendMessage: string;
    thankYou: string;
    notSent: string;
    sendAnother: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
  };
  projects: {
    title: string;
    description: string;
    noMatch: string;
  };
}

/* ── UI translations ───────────────────────── */

const uiEn: UI = {
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    resume: "Resume",
    contact: "Contact",
  },
  common: {
    downloadResume: "Download Resume",
    viewAll: "View all",
    all: "All",
  },
  home: {
    viewProjects: "View Projects",
    getInTouch: "Get in Touch",
    featuredProjects: "Featured Projects",
    skills: "Skills",
    interestedTitle: "Interested in working together?",
    interestedDesc:
      "I'm open to consulting engagements, research collaborations, and strategic advisory roles.",
    contactMe: "Contact Me",
  },
  about: {
    title: "About",
    focusAreas: "Focus Areas",
    values: "Values",
    interests: "Interests",
    languages: "Languages",
    experience: "Experience",
  },
  resume: {
    summary: "Summary",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    languages: "Languages",
  },
  contact: {
    title: "Contact",
    description:
      "Interested in consulting, research collaboration, or strategic advisory? Send a message below or connect on social media.",
    connect: "Connect",
    location: "Location",
    formNotice:
      "Form backend not connected yet. Submissions are client-side only.",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    sendMessage: "Send Message",
    thankYou: "Thank you!",
    notSent:
      "Form backend not connected yet. Your message was not actually sent.",
    sendAnother: "Send another message",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "How can I help?",
  },
  projects: {
    title: "Projects",
    description: "Strategy, consulting, and research engagements.",
    noMatch: "No projects match that filter.",
  },
};

const uiJa: UI = {
  nav: {
    home: "ホーム",
    projects: "プロジェクト",
    about: "概要",
    resume: "履歴書",
    contact: "お問い合わせ",
  },
  common: {
    downloadResume: "履歴書をダウンロード",
    viewAll: "すべて表示",
    all: "すべて",
  },
  home: {
    viewProjects: "プロジェクトを見る",
    getInTouch: "お問い合わせ",
    featuredProjects: "注目のプロジェクト",
    skills: "スキル",
    interestedTitle: "一緒に仕事をしませんか？",
    interestedDesc:
      "コンサルティング、リサーチコラボレーション、戦略的アドバイザリーに対応しています。",
    contactMe: "お問い合わせ",
  },
  about: {
    title: "概要",
    focusAreas: "専門分野",
    values: "価値観",
    interests: "関心分野",
    languages: "言語",
    experience: "経歴",
  },
  resume: {
    summary: "概要",
    experience: "経歴",
    projects: "プロジェクト",
    skills: "スキル",
    languages: "言語",
  },
  contact: {
    title: "お問い合わせ",
    description:
      "コンサルティング、リサーチコラボレーション、戦略的アドバイザリーに興味がありますか？以下のフォームまたはソーシャルメディアからご連絡ください。",
    connect: "つながる",
    location: "所在地",
    formNotice:
      "フォームバックエンドは未接続です。送信はクライアントサイドのみです。",
    nameLabel: "お名前",
    emailLabel: "メールアドレス",
    messageLabel: "メッセージ",
    sendMessage: "送信する",
    thankYou: "ありがとうございます！",
    notSent:
      "フォームバックエンドは未接続です。メッセージは実際には送信されていません。",
    sendAnother: "もう一通送る",
    namePlaceholder: "お名前",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "お気軽にご相談ください",
  },
  projects: {
    title: "プロジェクト",
    description: "戦略、コンサルティング、リサーチの活動実績。",
    noMatch: "フィルターに一致するプロジェクトがありません。",
  },
};

const uiZh: UI = {
  nav: {
    home: "首页",
    projects: "项目",
    about: "关于",
    resume: "简历",
    contact: "联系",
  },
  common: {
    downloadResume: "下载简历",
    viewAll: "查看全部",
    all: "全部",
  },
  home: {
    viewProjects: "查看项目",
    getInTouch: "联系我",
    featuredProjects: "精选项目",
    skills: "技能",
    interestedTitle: "有兴趣一起合作吗？",
    interestedDesc:
      "我对咨询合作、研究合作和战略顾问均持开放态度。",
    contactMe: "联系我",
  },
  about: {
    title: "关于",
    focusAreas: "重点领域",
    values: "核心价值",
    interests: "兴趣方向",
    languages: "语言能力",
    experience: "工作经历",
  },
  resume: {
    summary: "概述",
    experience: "工作经历",
    projects: "项目经历",
    skills: "专业技能",
    languages: "语言能力",
  },
  contact: {
    title: "联系方式",
    description:
      "对咨询、研究合作或战略顾问感兴趣？请填写下方表单或通过社交媒体联系。",
    connect: "社交链接",
    location: "所在地",
    formNotice: "表单后端尚未连接，提交仅在客户端生效。",
    nameLabel: "姓名",
    emailLabel: "邮箱",
    messageLabel: "留言",
    sendMessage: "发送消息",
    thankYou: "谢谢！",
    notSent: "表单后端尚未连接，您的消息实际上未被发送。",
    sendAnother: "再发送一条",
    namePlaceholder: "您的姓名",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "请问有什么可以帮您的？",
  },
  projects: {
    title: "项目",
    description: "战略、咨询和研究项目。",
    noMatch: "没有匹配该筛选条件的项目。",
  },
};

/* ── Profile translations ──────────────────── */

const profileJa: Profile = {
  ...baseProfile,
  headline:
    "ディープテック、AI、産業政策の交差点で活動する戦略コンサルタント。",
  summary:
    "AI、先端製造業、官民投資の融合を専門とするMBA候補生兼戦略プロフェッショナル。テクノロジー政策と資本配分、市場戦略が交わる複雑な環境のナビゲーションを支援します。",
  location: "サンディエゴ、CA",
  specialties: ["産業政策", "AI・ロボティクス戦略", "ディープテック投資"],
  resumeUrl: "/resume-ja.pdf",

  skills: [
    {
      category: "戦略＆コンサルティング",
      items: [
        "産業政策分析",
        "戦略的財務分析",
        "戦略分析",
        "戦略的マーケティング",
        "Go-to-Market戦略",
        "ビジネスモデリング",
        "テクノロジーコンサルティング",
        "M&A（合併・買収）",
        "オペレーション管理",
        "アジャイルプロジェクト管理",
        "アジャイル手法",
      ],
    },
    {
      category: "AI＆ディープテック",
      items: [
        "人工知能（AI）",
        "ロボティクス",
        "AIと先端製造業",
        "バイオテック＆製薬戦略",
        "ライフサイエンス",
        "材料科学",
        "科学情報学",
      ],
    },
    {
      category: "マーケティング＆グロース",
      items: [
        "デジタルマーケティング戦略",
        "市場調査＆競合分析",
        "コンテンツ開発",
        "品質＆レギュラトリーマーケティング",
        "マーケティング",
        "イベント企画＆ロジスティクス管理",
        "CRM（顧客管理）",
      ],
    },
    {
      category: "ツール＆テクノロジー",
      items: ["Jira", "Tableau", "R Studio", "MATLAB", "JavaScript"],
    },
    {
      category: "コラボレーション",
      items: [
        "部門横断コラボレーション",
        "部門横断プロジェクト調整",
        "異文化間コラボレーション",
      ],
    },
  ],

  experience: [
    {
      title: "マーケティングスペシャリスト",
      company: "ダッソー・システムズ",
      type: "インターンシップ",
      dates: "2025年6月 – 現在",
      location: "サンディエゴ、CA・ハイブリッド",
      bullets: [
        "ダッソー・システムズのライフサイエンスブランドBIOVIAのマーケティングインターンとして、戦略的キャンペーンの開発と実行を支援するグローバルソフトウェアマーケティングチームで活動。",
      ],
      skills: baseProfile.experience[0].skills,
    },
    {
      title: "グローバルマーケティング/事業開発マネージャー",
      company: "モアテックグループ",
      type: "正社員",
      dates: "2020年4月 – 2024年7月",
      location: "東京、日本",
      bullets: [
        "B2Bマーケティングと事業開発戦略を指揮し、部門横断チームを率いてデータドリブンの洞察とビジネスクライアント向けの財務モデリングを活用し、3年間で140%の収益成長を達成。",
        "主要ステークホルダーと協力して国際物流を合理化し、重大インシデントを90%削減。",
        "日本部門のオペレーション管理および経費の効率的な管理を監督。四半期ごとにCEOへ包括的な財務レポートを作成・報告し、エグゼクティブレベルの意思決定と長期戦略的計画を支援するための重要なデータ分析と実行可能な洞察を提供。",
      ],
      skills: baseProfile.experience[1].skills,
    },
    {
      title: "マーケティング/事業開発チームリード",
      company: "モアテックグループ",
      dates: "2019年4月 – 2020年4月",
      location: "東京、日本",
      bullets: [
        "B2Bマーケティングと事業開発イニシアチブを先導し、トレーニング、KPI、マルチチャネル獲得戦略（対面、デジタル、電話アウトリーチ）を通じてチームのパフォーマンスを向上。",
        "日本、中国、米国、ヨーロッパにわたるクロスボーダー連携と市場分析を通じて売上目標を25%超過達成。データドリブンの成長戦略により収益を30%増加。",
      ],
      skills: baseProfile.experience[2].skills,
    },
  ],

  languages: [
    { name: "中国語", proficiency: "ネイティブまたはバイリンガル" },
    { name: "英語", proficiency: "ビジネスレベル" },
    { name: "日本語", proficiency: "ビジネスレベル" },
    { name: "上海語", proficiency: "ネイティブまたはバイリンガル" },
  ],

  projects: [
    {
      id: "deep-tech-industrial-policy",
      title:
        "政策から実践へ：ディープテックとAIが持続可能な成長と産業戦略をどう変革するか",
      dates: "2025年6月 – 2025年9月",
      summary:
        "金融アドバイザリー企業、学術教員、部門横断MBAチームと協力し、CHIPS法、インフレ抑制法（IRA）、Stargateプロジェクトなど米国テクノロジー産業政策が、ディープテック、AI、先端製造業への資本流入をどのように変革しているかを分析。",
      bullets: [
        "CHIPS法、IRA、Stargateが戦略的産業計画と官民投資の整合に与える影響を評価。",
        "政策シグナルがAIおよびディープテックセクターにおける垂直統合、再資本化、統合をどのように引き起こすかを分析。",
        "サプライチェーンとインフラにおける新興投資ゾーンと戦略的ボトルネックを特定。",
        "連邦インセンティブがM&A戦略、プライベートエクイティのトレンド、不動産投資パターンに与える波及効果を検証。",
      ],
      skills: baseProfile.projects[0].skills,
      tags: ["産業政策", "ディープテック", "AI", "M&A", "戦略"],
      artifacts: [{ label: "レポート（近日公開）", url: "#" }],
      highlights: [
        "米国産業政策分析",
        "M&Aとプライベートマーケットの反応",
        "セクター機会マッピング",
      ],
      featured: true,
    },
    {
      id: "physical-ai-robotics-intel",
      title: "フィジカルAIとロボティクスコンサルティングプロジェクト",
      org: "UCサンディエゴ – レイディ経営大学院（Intel）",
      dates: "2025年3月 – 2025年6月",
      summary:
        "部門横断MBAチームと協力し、今後5年間でAIがグローバルロボティクス産業をどのように変革するかについて、Intelの調査を支援。",
      bullets: [
        "AI＋ロボティクスの融合に関する業界調査を実施：産業用・消費者セクターにおける主要トレンド、基盤技術、競争ダイナミクス。",
        "ステークホルダーの洞察と二次調査を活用して、グローバルな成長機会と潜在的なマーケット変曲点を評価。",
        "コンサルティングフレームワークと戦略的モデリングを使用して、シニアリーダーシップにデータドリブンの提言を提供。",
        "AI、半導体、オートメーションの交差点における専門知識を強化。",
      ],
      skills: baseProfile.projects[1].skills,
      tags: ["AI", "ロボティクス", "コンサルティング", "半導体", "戦略"],
      artifacts: [{ label: "デッキ（近日公開）", url: "#" }],
      featured: true,
    },
    {
      id: "san-diego-consulting-competition",
      title: "サンディエゴイマージョンコンサルティングコンペティション – 第1位",
      dates: "2025年3月 – 2025年4月",
      summary:
        "イスラエルのスタートアップBzigoと協力し、AI蚊検出デバイスの米国市場参入戦略を策定。",
      bullets: [
        "短期B2Cターゲティングと長期B2B拡大計画を組み合わせた戦略を構築。",
        "市場調査とモデリングを実施。イノベーションと戦略的インパクトが評価され、第1位のピッチを達成。",
      ],
      skills: baseProfile.projects[2].skills,
      tags: [
        "Go-to-Market",
        "コンサルティング",
        "市場参入",
        "AI",
        "コンペ優勝",
      ],
      artifacts: [{ label: "ピッチデッキ（近日公開）", url: "#" }],
      highlights: ["第1位受賞"],
      featured: true,
    },
  ],

  about: {
    bio: [
      "ディープテック、人工知能、産業政策の交差点で活動する戦略コンサルティングに注力するMBA候補生です。最先端技術と、それを市場に投入するための戦略、政策、投資フレームワークの間の橋渡しをする仕事をしています。",
      "CHIPS法のプライベートマーケットへの影響分析から、Fortune 500半導体企業へのロボティクスの未来に関するアドバイス、スタートアップの勝利するGo-to-Market戦略の策定まで、複雑で曖昧な課題に取り組む部門横断チームで力を発揮します。",
    ],
    focusAreas: [
      "ディープテック＆AI戦略",
      "米国産業＆テクノロジー政策",
      "ロボティクス＆先端製造業",
      "ベンチャー＆プライベートエクイティ",
    ],
    values: [
      "厳密なエビデンスに基づく分析",
      "政策と実践の橋渡し",
      "異文化間コラボレーション",
      "インパクト志向の仕事",
    ],
    interests: [
      "AIガバナンス＆倫理",
      "グローバルサプライチェーンのレジリエンス",
      "スタートアップエコシステム",
    ],
  },
};

const profileZh: Profile = {
  ...baseProfile,
  headline: "深科技、人工智能与产业政策交汇领域的战略顾问。",
  summary:
    "MBA候选人和战略专家，专注于人工智能、先进制造业和公私合作投资的融合。帮助组织驾驭技术政策与资本分配和市场战略交汇的复杂环境。",
  location: "圣迭戈，加利福尼亚",
  specialties: ["产业政策", "人工智能/机器人战略", "深科技投资"],
  resumeUrl: "/resume-zh.pdf",

  skills: [
    {
      category: "战略与咨询",
      items: [
        "产业政策分析",
        "战略财务分析",
        "战略分析",
        "战略营销",
        "市场进入战略",
        "商业建模",
        "技术咨询",
        "并购（M&A）",
        "运营管理",
        "敏捷项目管理",
        "敏捷方法论",
      ],
    },
    {
      category: "人工智能与深科技",
      items: [
        "人工智能（AI）",
        "机器人技术",
        "人工智能与先进制造",
        "生物技术与制药战略",
        "生命科学",
        "材料科学",
        "科学信息学",
      ],
    },
    {
      category: "营销与增长",
      items: [
        "数字营销战略",
        "市场研究与竞争分析",
        "内容开发",
        "质量与法规营销",
        "营销",
        "活动策划与物流管理",
        "CRM（客户关系管理）",
      ],
    },
    {
      category: "工具与技术",
      items: ["Jira", "Tableau", "R Studio", "MATLAB", "JavaScript"],
    },
    {
      category: "协作",
      items: ["跨职能协作", "跨职能项目协调", "跨文化协作"],
    },
  ],

  experience: [
    {
      title: "营销专员",
      company: "达索系统",
      type: "实习",
      dates: "2025年6月 – 至今",
      location: "圣迭戈, CA · 混合办公",
      bullets: [
        "在达索系统旗下生命科学品牌BIOVIA担任营销实习生，参与全球软件营销团队，支持战略营销活动的开发与执行。",
      ],
      skills: baseProfile.experience[0].skills,
    },
    {
      title: "全球营销/业务拓展经理",
      company: "Moretec集团",
      type: "全职",
      dates: "2020年4月 – 2024年7月",
      location: "东京，日本",
      bullets: [
        "主导B2B营销和业务拓展战略，领导跨职能团队，利用数据驱动的洞察和针对商业客户的财务建模，在三年内实现了140%的收入增长。",
        "与关键利益相关者合作优化国际物流，将重大事故减少90%。",
        "负责日本部门运营管理，确保费用的高效管理。每年为CEO准备并提交四份综合财务报告，提供关键数据分析和可执行洞察，支持高层决策和长期战略规划。",
      ],
      skills: baseProfile.experience[1].skills,
    },
    {
      title: "营销/业务拓展团队负责人",
      company: "Moretec集团",
      dates: "2019年4月 – 2020年4月",
      location: "东京，日本",
      bullets: [
        "主导B2B营销和业务拓展计划，通过培训、KPI和多渠道获客策略（面对面会议、数字和电话推广）提升团队绩效。",
        "通过日本、中国、美国和欧洲的跨境合作和市场分析，超额完成销售目标25%；通过数据驱动的增长策略，收入增长30%。",
      ],
      skills: baseProfile.experience[2].skills,
    },
  ],

  languages: [
    { name: "中文", proficiency: "母语或双语" },
    { name: "英语", proficiency: "全面专业水平" },
    { name: "日语", proficiency: "全面专业水平" },
    { name: "上海话", proficiency: "母语或双语" },
  ],

  projects: [
    {
      id: "deep-tech-industrial-policy",
      title: "从政策到实践：深科技与人工智能如何重塑可持续增长与产业战略",
      dates: "2025年6月 – 2025年9月",
      summary:
        "与金融咨询公司、学术教授和跨职能MBA团队合作，分析美国近期技术产业政策——如CHIPS法案、通胀削减法案（IRA）和星际之门项目——如何改变深科技、人工智能和先进制造业的资本流向。",
      bullets: [
        "评估CHIPS法案、IRA和星际之门项目如何影响战略产业规划和公私投资协调。",
        "分析政策信号如何触发人工智能和深科技领域的垂直整合、再资本化和整合。",
        "识别供应链和基础设施中的新兴投资区域和战略瓶颈。",
        "考察联邦激励政策对并购战略、私募股权趋势和房地产投资模式的连锁效应。",
      ],
      skills: baseProfile.projects[0].skills,
      tags: ["产业政策", "深科技", "人工智能", "并购", "战略"],
      artifacts: [{ label: "报告（即将发布）", url: "#" }],
      highlights: [
        "美国产业政策分析",
        "并购与私募市场响应",
        "行业机会映射",
      ],
      featured: true,
    },
    {
      id: "physical-ai-robotics-intel",
      title: "物理AI与机器人咨询项目",
      org: "加州大学圣迭戈分校 – 雷迪管理学院（Intel）",
      dates: "2025年3月 – 2025年6月",
      summary:
        "与跨职能MBA团队合作，支持英特尔探索未来五年人工智能将如何改变全球机器人产业。",
      bullets: [
        "开展AI+机器人融合的行业研究：工业和消费领域的关键趋势、使能技术和竞争动态。",
        "利用利益相关者洞察和二手研究，评估全球增长机会和潜在市场拐点。",
        "运用咨询框架和战略建模，向高层领导提供数据驱动的建议。",
        "加深在人工智能、半导体和自动化交叉领域的专业知识。",
      ],
      skills: baseProfile.projects[1].skills,
      tags: ["人工智能", "机器人", "咨询", "半导体", "战略"],
      artifacts: [{ label: "演示文稿（即将发布）", url: "#" }],
      featured: true,
    },
    {
      id: "san-diego-consulting-competition",
      title: "圣迭戈沉浸式咨询大赛 – 第一名",
      dates: "2025年3月 – 2025年4月",
      summary:
        "与以色列初创公司Bzigo合作，为其AI蚊虫检测设备制定美国市场进入策略。",
      bullets: [
        "将短期B2C定位与长期B2B扩展计划相结合。",
        "进行市场研究和建模；凭借创新和战略影响力获得第一名。",
      ],
      skills: baseProfile.projects[2].skills,
      tags: ["市场进入", "咨询", "市场进入策略", "人工智能", "比赛冠军"],
      artifacts: [{ label: "路演演示（即将发布）", url: "#" }],
      highlights: ["第一名获奖"],
      featured: true,
    },
  ],

  about: {
    bio: [
      "我是一名MBA候选人，专注于深科技、人工智能和产业政策交汇领域的战略咨询。我的工作致力于在前沿技术与将其推向市场所需的战略、政策和投资框架之间搭建桥梁。",
      "无论是分析CHIPS法案对私募市场的深远影响、为财富500强半导体公司提供机器人技术未来的建议，还是帮助初创公司制定制胜的市场进入策略——我善于在跨职能团队中解决复杂而模糊的问题。",
    ],
    focusAreas: [
      "深科技与AI战略",
      "美国产业与科技政策",
      "机器人与先进制造",
      "风险投资与私募股权",
    ],
    values: [
      "严谨的循证分析",
      "连接政策与实践",
      "跨文化协作",
      "以影响力为导向的工作",
    ],
    interests: [
      "AI治理与伦理",
      "全球供应链韧性",
      "创业生态系统",
    ],
  },
};

/* ── Public API ─────────────────────────────── */

const uiMap: Record<Lang, UI> = { en: uiEn, ja: uiJa, zh: uiZh };
const profileMap: Record<Lang, Profile> = {
  en: baseProfile,
  ja: profileJa,
  zh: profileZh,
};

export function getUI(lang: Lang): UI {
  return uiMap[lang] ?? uiEn;
}

export function getProfile(lang: Lang): Profile {
  return profileMap[lang] ?? baseProfile;
}
