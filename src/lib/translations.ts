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
    certifications: string;
    values: string;
    interests: string;
    languages: string;
    education: string;
    experience: string;
  };
  resume: {
    summary: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
    certifications: string;
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
    viewProjects: "View Resume",
    getInTouch: "Get in Touch",
    featuredProjects: "Featured Projects",
    skills: "Skills",
    interestedTitle: "Interested in working together?",
    interestedDesc:
      "I'm open to marketing strategy engagements, market research collaborations, and strategic growth advisory roles.",
    contactMe: "Contact Me",
  },
  about: {
    title: "About",
    focusAreas: "Focus Areas",
    certifications: "Certifications",
    values: "Values",
    interests: "Interests",
    languages: "Languages",
    education: "Education",
    experience: "Experience",
  },
  resume: {
    summary: "Summary",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    education: "Education",
    certifications: "Certifications",
    languages: "Languages",
  },
  contact: {
    title: "Contact",
    description:
      "I'm exploring opportunities in marketing strategy and growth, and would love to connect. Feel free to send a message below or reach out on LinkedIn.",
    connect: "Connect",
    location: "Location",
    formNotice: "",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    sendMessage: "Send Message",
    thankYou: "Thank you!",
    notSent: "Your message has been sent successfully.",
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
    viewProjects: "履歴書を見る",
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
    certifications: "資格・認定",
    values: "価値観",
    interests: "関心分野",
    languages: "言語",
    education: "学歴",
    experience: "経歴",
  },
  resume: {
    summary: "概要",
    experience: "経歴",
    projects: "プロジェクト",
    skills: "スキル",
    education: "学歴",
    certifications: "資格・認定",
    languages: "言語",
  },
  contact: {
    title: "お問い合わせ",
    description:
      "マーケティング戦略とグロースの機会を探しており、ぜひつながりたいと思っています。以下のフォームからメッセージを送るか、LinkedInでお気軽にご連絡ください。",
    connect: "つながる",
    location: "所在地",
    formNotice: "",
    nameLabel: "お名前",
    emailLabel: "メールアドレス",
    messageLabel: "メッセージ",
    sendMessage: "送信する",
    thankYou: "ありがとうございます！",
    notSent: "メッセージが正常に送信されました。",
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
    viewProjects: "查看简历",
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
    certifications: "资格认证",
    values: "核心价值",
    interests: "兴趣方向",
    languages: "语言能力",
    education: "教育背景",
    experience: "工作经历",
  },
  resume: {
    summary: "概述",
    experience: "工作经历",
    projects: "项目经历",
    skills: "专业技能",
    education: "教育背景",
    certifications: "资格认证",
    languages: "语言能力",
  },
  contact: {
    title: "联系方式",
    description:
      "我正在探索营销策略和增长方面的机会，很期待与您联系。欢迎通过下方表单留言或在LinkedIn上联系我。",
    connect: "社交链接",
    location: "所在地",
    formNotice: "",
    nameLabel: "姓名",
    emailLabel: "邮箱",
    messageLabel: "留言",
    sendMessage: "发送消息",
    thankYou: "谢谢！",
    notSent: "您的消息已成功发送。",
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
    "MBA、カリフォルニア大学サンディエゴ校 | グローバルマーケティング＆戦略 | SaaS＆ハイテク",
  summary:
    "カリフォルニア大学サンディエゴ校でSTEM分野に重点を置いたMBAを取得中。UCSD Rady Scholar Fellowshipの受給者。ダッソー・システムズのBIOVIAブランドにおけるグローバルSaaSマーケティング活動に貢献し、国際キャンペーンの開発・実行、クロスマーケット分析の実施、エンゲージメントとROIの最適化を推進。",
  location: "サンディエゴ、CA",
  specialties: ["SaaSマーケティング戦略", "ライフサイエンス＆バイオテック", "AI＆先端製造業"],
  resumeUrl: "/resume-ja.pdf",

  skills: [
    {
      category: "戦略＆コンサルティング",
      items: [
        "ビジネス戦略",
        "産業政策分析",
        "戦略的財務分析",
        "M&A（合併・買収）",
        "財務分析",
        "財務予測",
        "財務モデリング",
        "財務諸表分析",
        "コーポレートファイナンス",
        "アジャイルプロジェクト管理",
        "アジャイル手法",
      ],
    },
    {
      category: "AI＆ライフサイエンス",
      items: [
        "人工知能（AI）",
        "AIと先端製造業",
        "バイオテック＆製薬戦略",
        "ライフサイエンス",
        "材料科学",
        "科学情報学",
        "リサーチ",
        "データ分析",
      ],
    },
    {
      category: "マーケティング＆グロース",
      items: [
        "デジタルマーケティング戦略",
        "市場調査＆競合分析",
        "コンテンツ開発",
        "コンテンツ制作",
        "品質＆レギュラトリーマーケティング",
        "イベント企画＆ロジスティクス管理",
        "アプリ構築",
      ],
    },
    {
      category: "ツール＆テクノロジー",
      items: ["VS Code", "GitHub Copilot", "Git", "Excel", "Office 365", "PowerPoint", "Tableau", "JavaScript", "CRM Systems", "R Studio", "MATLAB"],
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
      title: "MBAマーケティングインターン",
      company: "ダッソー・システムズ",
      type: "インターンシップ",
      dates: "2025年6月 – 現在",
      location: "サンディエゴ、CA・ハイブリッド",
      bullets: [
        "BIOVIA（ダッソー・システムズのライフサイエンスブランド）のグローバルマーケティングチームと協力し、国際市場におけるSaaSキャンペーン戦略と実行を支援。",
        "クロスマーケット分析と競合分析を実施し、データドリブンのGo-to-Market戦略と年間マーケティング計画策定に貢献。",
        "グローバルキャンペーンとイベントを実行し、パフォーマンス分析を活用してリード獲得、エンゲージメント、ROIを最適化。",
      ],
      skills: baseProfile.experience[0].skills,
    },
    {
      title: "グローバルマーケティング＆ビジネス戦略マネージャー（半導体）",
      company: "モアテックグループ",
      type: "正社員",
      dates: "2022年5月 – 2024年7月",
      location: "東京、日本",
      bullets: [
        "北米、ヨーロッパ、アジアにわたるグローバルB2Bマーケティングとgo-to-market戦略を主導し、統合的な需要創出とポジショニング施策を通じて3年間で140%の収益成長を達成。",
        "マルチチャネルキャンペーン（展示会、SEO、デジタル、直接アウトリーチ）を統括し、KPIトラッキングとROI分析を活用してファネルパフォーマンスを最適化。",
        "国際的な収益計画とマーケティング予算を管理し、データドリブンのパフォーマンスインサイトと戦略的提言をCEOに直接提供。",
      ],
      skills: baseProfile.experience[1].skills,
    },
    {
      title: "グローバルマーケティング＆ビジネス戦略アソシエイト（半導体）",
      company: "モアテックグループ",
      dates: "2018年4月 – 2022年4月",
      location: "東京、日本",
      bullets: [
        "日本、中国、米国、ヨーロッパにわたるグローバルB2Bマーケティングキャンペーンを実行し、データドリブンの顧客獲得戦略で収益を30%増加。",
        "展示会、デジタル、アウトバウンドにおけるチャネルミックスの最適化とリード評価の改善により、売上目標を25%超過達成。",
        "マーケティングKPIを追跡し、部門横断GTM実行を支援してグローバル展開を強化。",
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
      tags: ["AI・ディープテック", "M&A", "戦略"],
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
      tags: ["AI・ディープテック", "コンサルティング", "戦略"],
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
      tags: ["Go-to-Market", "コンサルティング"],
      artifacts: [{ label: "ピッチデッキ（近日公開）", url: "#" }],
      highlights: ["第1位受賞"],
      featured: true,
    },
  ],

  about: {
    bio: [
      "カリフォルニア大学サンディエゴ校でSTEM分野に重点を置いたMBAを取得中であり、UCSD Rady Scholar Fellowshipの受給者です。ダッソー・システムズでは、BIOVIAブランドのグローバルSaaSマーケティング活動に貢献し、国際キャンペーンの開発・実行、クロスマーケット分析の実施、エンゲージメントとROIの最適化戦略を推進しています。",
      "ライフサイエンスおよび科学ソフトウェアソリューションにおけるイノベーション推進に意欲を持ち、部門横断チームと協力してパフォーマンス分析を活用し、データドリブンの洞察を提供し、組織目標を支援しています。MBA課程を修了しながら、SaaSマーケティング戦略、市場調査、キャンペーン実行の専門性を高めることに取り組んでいます。",
    ],
    focusAreas: [
      "SaaSマーケティング戦略",
      "ライフサイエンス＆科学ソフトウェア",
      "AI＆先端製造業",
      "市場調査＆キャンペーン実行",
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
  headline:
    "MBA，加州大学圣迭戈分校 | 全球营销与战略 | SaaS与高科技",
  summary:
    "目前在加州大学圣迭戈分校攻读以STEM为重点的MBA，并荣获UCSD Rady Scholar Fellowship。在达索系统为其BIOVIA品牌的全球SaaS营销做出贡献，开发和执行国际营销活动，进行跨市场分析，并优化策略以提升参与度和投资回报率。",
  location: "圣迭戈，加利福尼亚",
  specialties: ["SaaS营销策略", "生命科学与生物技术", "人工智能与先进制造"],
  resumeUrl: "/resume-zh.pdf",

  skills: [
    {
      category: "战略与咨询",
      items: [
        "商业战略",
        "产业政策分析",
        "战略财务分析",
        "并购（M&A）",
        "财务分析",
        "财务预测",
        "财务建模",
        "财务报表分析",
        "企业财务",
        "敏捷项目管理",
        "敏捷方法论",
      ],
    },
    {
      category: "人工智能与生命科学",
      items: [
        "人工智能（AI）",
        "人工智能与先进制造",
        "生物技术与制药战略",
        "生命科学",
        "材料科学",
        "科学信息学",
        "研究",
        "数据分析",
      ],
    },
    {
      category: "营销与增长",
      items: [
        "数字营销战略",
        "市场研究与竞争分析",
        "内容开发",
        "内容创作",
        "质量与法规营销",
        "活动策划与物流管理",
        "应用构建",
      ],
    },
    {
      category: "工具与技术",
      items: ["VS Code", "GitHub Copilot", "Git", "Excel", "Office 365", "PowerPoint", "Tableau", "JavaScript", "CRM Systems", "R Studio", "MATLAB"],
    },
    {
      category: "协作",
      items: ["跨职能协作", "跨职能项目协调", "跨文化协作"],
    },
  ],

  experience: [
    {
      title: "MBA营销实习生",
      company: "达索系统",
      type: "实习",
      dates: "2025年6月 – 至今",
      location: "圣迭戈, CA · 混合办公",
      bullets: [
        "与BIOVIA（达索系统旗下生命科学品牌）的全球营销团队合作，支持国际市场的SaaS营销活动策略与执行。",
        "进行跨市场和竞争对手分析，为数据驱动的市场进入策略和年度营销规划提供信息。",
        "执行全球营销活动和事件，利用绩效分析优化潜客获取、参与度和投资回报率。",
      ],
      skills: baseProfile.experience[0].skills,
    },
    {
      title: "全球营销与商业战略经理（半导体）",
      company: "Moretec集团",
      type: "全职",
      dates: "2022年5月 – 2024年7月",
      location: "东京，日本",
      bullets: [
        "主导北美、欧洲和亚洲的全球B2B营销和市场进入策略，通过整合需求生成和定位举措，在三年内推动140%的收入增长。",
        "统管多渠道营销活动（展会、SEO、数字、直接推广），利用KPI跟踪和ROI分析优化漏斗表现。",
        "管理国际收入规划和营销预算；直接向CEO提供数据驱动的绩效洞察和战略建议。",
      ],
      skills: baseProfile.experience[1].skills,
    },
    {
      title: "全球营销与商业战略助理（半导体）",
      company: "Moretec集团",
      dates: "2018年4月 – 2022年4月",
      location: "东京，日本",
      bullets: [
        "在日本、中国、美国和欧洲执行全球B2B营销活动，通过数据驱动的客户获取策略实现收入增长30%。",
        "通过优化渠道组合和改进展会、数字和外呼中的潜客筛选，超额完成销售目标25%。",
        "跟踪营销KPI并支持跨职能GTM执行，加强全球扩展。",
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
      tags: ["人工智能与深科技", "并购", "战略"],
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
      tags: ["人工智能与深科技", "咨询", "战略"],
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
      tags: ["Go-to-Market", "咨询"],
      artifacts: [{ label: "路演演示（即将发布）", url: "#" }],
      highlights: ["第一名获奖"],
      featured: true,
    },
  ],

  about: {
    bio: [
      "目前在加州大学圣迭戈分校攻读以STEM为重点的MBA，并荣获UCSD Rady Scholar Fellowship。在达索系统，我为其BIOVIA品牌的全球SaaS营销做出贡献，开发和执行国际营销活动，进行跨市场分析，并优化策略以提升参与度和投资回报率。",
      "我致力于推动生命科学和科学软件解决方案的创新，与跨职能团队合作利用绩效分析，提供数据驱动的洞察，并支持组织目标。在完成MBA课程的同时，我致力于提升SaaS营销策略、市场研究和营销活动执行方面的专业能力。",
    ],
    focusAreas: [
      "SaaS营销策略",
      "生命科学与科学软件",
      "人工智能与先进制造",
      "市场研究与营销活动执行",
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
