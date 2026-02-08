export type Language = "en" | "ja" | "zh";

export const languageOptions: Array<{ value: Language; label: string }> = [
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
  { value: "zh", label: "中文" },
];

export const translations = {
  en: {
    languageLabel: "Language",
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      resume: "Resume",
      contact: "Contact",
    },
    actions: {
      downloadResume: "Download Resume",
      viewProjects: "View Projects",
      getInTouch: "Get in Touch",
      viewAll: "View all →",
      contactMe: "Contact Me",
    },
    sections: {
      featuredProjects: "Featured Projects",
      skills: "Skills",
      ctaTitle: "Interested in working together?",
      ctaBody:
        "I'm open to consulting engagements, research collaborations, and strategic advisory roles.",
    },
    about: {
      title: "About",
      focusAreas: "Focus Areas",
      values: "Values",
      interests: "Interests",
      languages: "Languages",
      experience: "Experience",
    },
    projects: {
      title: "Projects",
      subtitle: "Strategy, consulting, and research engagements.",
      all: "All",
      noResults: "No projects match that filter.",
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
      subtitle:
        "Interested in consulting, research collaboration, or strategic advisory? Send a message below or connect on social media.",
      connect: "Connect",
      location: "Location",
    },
    contactForm: {
      banner:
        "Form backend not connected yet. Submissions are client-side only.",
      thankYou: "Thank you!",
      notSent:
        "Form backend not connected yet. Your message was not actually sent.",
      sendAnother: "Send another message",
      name: "Name",
      email: "Email",
      message: "Message",
      placeholderName: "Your name",
      placeholderEmail: "you@example.com",
      placeholderMessage: "How can I help?",
      sendMessage: "Send Message",
    },
  },
  ja: {
    languageLabel: "言語",
    nav: {
      home: "ホーム",
      projects: "プロジェクト",
      about: "プロフィール",
      resume: "履歴書",
      contact: "お問い合わせ",
    },
    actions: {
      downloadResume: "履歴書をダウンロード",
      viewProjects: "プロジェクトを見る",
      getInTouch: "連絡する",
      viewAll: "すべて見る →",
      contactMe: "お問い合わせ",
    },
    sections: {
      featuredProjects: "注目のプロジェクト",
      skills: "スキル",
      ctaTitle: "ご一緒に取り組みませんか？",
      ctaBody:
        "コンサルティング、リサーチ連携、戦略アドバイザリーのご相談を歓迎します。",
    },
    about: {
      title: "プロフィール",
      focusAreas: "注力分野",
      values: "価値観",
      interests: "関心領域",
      languages: "言語",
      experience: "経験",
    },
    projects: {
      title: "プロジェクト",
      subtitle: "戦略、コンサルティング、リサーチの取り組み。",
      all: "すべて",
      noResults: "該当するプロジェクトがありません。",
    },
    resume: {
      summary: "概要",
      experience: "職務経験",
      projects: "プロジェクト",
      skills: "スキル",
      languages: "言語",
    },
    contact: {
      title: "お問い合わせ",
      subtitle:
        "コンサルティングやリサーチ連携、戦略アドバイザリーにご関心があれば、下記フォームまたはSNSからご連絡ください。",
      connect: "つながる",
      location: "所在地",
    },
    contactForm: {
      banner:
        "フォームのバックエンドは未接続のため、送信はクライアント側のみで処理されます。",
      thankYou: "ありがとうございます！",
      notSent:
        "フォームのバックエンドは未接続のため、メッセージは送信されていません。",
      sendAnother: "別のメッセージを送る",
      name: "お名前",
      email: "メールアドレス",
      message: "メッセージ",
      placeholderName: "お名前",
      placeholderEmail: "you@example.com",
      placeholderMessage: "どのようにお手伝いできますか？",
      sendMessage: "送信する",
    },
  },
  zh: {
    languageLabel: "语言",
    nav: {
      home: "首页",
      projects: "项目",
      about: "关于",
      resume: "简历",
      contact: "联系",
    },
    actions: {
      downloadResume: "下载简历",
      viewProjects: "查看项目",
      getInTouch: "联系我",
      viewAll: "查看全部 →",
      contactMe: "联系我",
    },
    sections: {
      featuredProjects: "精选项目",
      skills: "技能",
      ctaTitle: "有合作想法？",
      ctaBody: "欢迎咨询、研究合作或战略顾问相关机会。",
    },
    about: {
      title: "关于",
      focusAreas: "重点方向",
      values: "价值观",
      interests: "兴趣领域",
      languages: "语言",
      experience: "经历",
    },
    projects: {
      title: "项目",
      subtitle: "战略、咨询与研究项目。",
      all: "全部",
      noResults: "没有匹配的项目。",
    },
    resume: {
      summary: "简介",
      experience: "经历",
      projects: "项目",
      skills: "技能",
      languages: "语言",
    },
    contact: {
      title: "联系",
      subtitle:
        "如对咨询、研究合作或战略顾问感兴趣，请通过下方表单或社交媒体联系。",
      connect: "连接",
      location: "位置",
    },
    contactForm: {
      banner: "表单后台尚未连接，提交仅在客户端处理。",
      thankYou: "谢谢！",
      notSent: "表单后台尚未连接，消息未实际发送。",
      sendAnother: "再发送一条",
      name: "姓名",
      email: "邮箱",
      message: "留言",
      placeholderName: "你的姓名",
      placeholderEmail: "you@example.com",
      placeholderMessage: "我可以如何帮助你？",
      sendMessage: "发送消息",
    },
  },
} as const;

export type Translations = (typeof translations)["en"];

export const isLanguage = (value: string): value is Language =>
  value === "en" || value === "ja" || value === "zh";

export const getTranslations = (language: Language): Translations =>
  translations[language];
