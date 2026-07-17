// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Responsible AI Architect',
  tagline: 'Real enterprise AI problems. Production-grade solutions. Built for architects, not test-takers.',
  favicon: 'img/favicon.ico',

  future: { v4: true },

  url: 'https://leningarcia09.github.io',
  baseUrl: '/',

  organizationName: 'LeninGarcia09',
  projectName: 'LeninGarcia09.github.io',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/LeninGarcia09/LeninGarcia09.github.io/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/favicon.ico',

      announcementBar: {
        id: 'author-disclosure-2026',
        content:
          '🏗️ Built by <strong>Lenin Garcia</strong> — Senior Technical Program Manager @ Microsoft · Personal learning journey in AI Architecture &amp; Responsible AI · <a href="https://github.com/LeninGarcia09" target="_blank" rel="noopener">GitHub</a> · <em>Not affiliated with or endorsed by Microsoft Corporation.</em>',
        backgroundColor: '#001a4d',
        textColor: '#e8f4fd',
        isCloseable: true,
      },

      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },

      navbar: {
        title: 'Responsible AI Architect',
        logo: {
          alt: 'Lenin Garcia — AI Architecture & Responsible AI',
          src: 'img/logo.png',
        },
        items: [
          {
            label: '🎯 Skill Tracks',
            position: 'left',
            type: 'dropdown',
            items: [
              { type: 'docSidebar', sidebarId: 'aiArchitectureRaiSidebar', label: '🏗️ AI Architecture + Responsible AI' },
              { type: 'docSidebar', sidebarId: 'foundrySkillSidebar', label: '🤖 Azure AI Foundry + Hosted Agents' },
              { type: 'docSidebar', sidebarId: 'responsibleAiSidebar', label: '⚖️ Responsible AI & Governance' },
              { type: 'docSidebar', sidebarId: 'agenticReliabilitySidebar', label: '🔬 Agentic Reliability' },
            ],
          },
          {
            label: '🎓 Certifications',
            position: 'left',
            type: 'dropdown',
            items: [
              { type: 'docSidebar', sidebarId: 'ai102Sidebar', label: '🧠 AI-102: Azure AI Engineer' },
              { type: 'docSidebar', sidebarId: 'az305Sidebar', label: '🏗️ AZ-305: Solutions Architect Expert' },
              { type: 'docSidebar', sidebarId: 'sc500Sidebar', label: '🛡️ SC-500: Cloud & AI Security' },
              { type: 'docSidebar', sidebarId: 'az104Sidebar', label: '🔧 AZ-104: Azure Administrator' },
              { type: 'docSidebar', sidebarId: 'az700Sidebar', label: '🌐 AZ-700: Network Engineer' },
              { type: 'docSidebar', sidebarId: 'claudeArchitectSidebar', label: '🟠 Claude Certified Architect' },
            ],
          },
          {
            type: 'docSidebar',
            sidebarId: 'resourcesSidebar',
            position: 'left',
            label: '📦 Resources',
          },
          {
            label: '🗺️ Career Plans',
            position: 'left',
            type: 'dropdown',
            items: [
              { type: 'docSidebar', sidebarId: 'learningPlanSidebar', label: '🗺️ Plan de Desarrollo (36 semanas)' },
              { type: 'docSidebar', sidebarId: 'learningPlanV4Sidebar', label: '🧭 Learning Plan v4 (26 semanas)' },
              { type: 'docSidebar', sidebarId: 'executiveAiLeadershipSidebar', label: '🧠 Executive AI Leadership Plan' },
            ],
          },
          {
            href: 'https://github.com/LeninGarcia09/LeninGarcia09.github.io',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: 'Skill Tracks',
            items: [
              { label: '🤖 Azure AI Foundry + Hosted Agents', to: '/docs/azure-ai-foundry/overview' },
              { label: '⚖️ Responsible AI & Governance', to: '/docs/responsible-ai/overview' },
              { label: '🔬 Agentic Reliability', to: '/docs/agentic-reliability/overview' },
              { label: '🏗️ AI Architecture + Responsible AI', to: '/docs/ai-architecture-rai/overview' },
            ],
          },
          {
            title: 'Certifications',
            items: [
              { label: '🟠 Claude Certified Architect', to: '/docs/claude-architect/overview' },
              { label: 'AI-102: Azure AI Engineer', to: '/docs/ai-102/overview' },
              { label: 'AZ-305: Solutions Architect Expert', to: '/docs/az-305/overview' },
              { label: 'SC-500: Cloud & AI Security', to: '/docs/sc-500/overview' },
              { label: 'AZ-104: Azure Administrator', to: '/docs/az-104/overview' },
              { label: 'AZ-700: Network Engineer', to: '/docs/az-700/overview' },
            ],
          },
          {
            title: 'Resources',
            items: [
              { label: '🛠️ Tools', to: '/docs/resources/tools' },
              { label: '📰 Articles', to: '/docs/resources/articles' },
              { label: '📚 Learning', to: '/docs/resources/learning' },
              { label: '🗺️ Plan de Desarrollo (36 semanas)', to: '/docs/learning-plan/overview' },
              { label: '🧭 Learning Plan v4 (26 semanas)', to: '/docs/learning-plan-v4/overview' },
              { label: '🧠 Executive AI Leadership Plan', to: '/docs/executive-ai-leadership/overview' },
              { label: 'Microsoft Learn', href: 'https://learn.microsoft.com' },
              { label: 'Anthropic Academy', href: 'https://academy.anthropic.com' },
            ],
          },
          {
            title: 'About',
            items: [
              { label: '👤 Lenin Garcia', href: 'https://github.com/LeninGarcia09' },
              { label: '✉️ lesalgad@microsoft.com', href: 'mailto:lesalgad@microsoft.com' },
              { label: '✉️ garcia.lenin@outlook.com', href: 'mailto:garcia.lenin@outlook.com' },
              { label: '🐛 Open an Issue', href: 'https://github.com/LeninGarcia09/LeninGarcia09.github.io/issues' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <strong>Lenin Garcia</strong>. Built with Docusaurus.<br/>
<small>Personal learning portfolio — all content represents my own views and learning journey.<br/>
Not affiliated with, endorsed by, or representing Microsoft Corporation or any other organization.<br/>
Product names, logos, and trademarks referenced belong to their respective owners.</small>`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['powershell', 'bicep', 'json', 'bash', 'python'],
      },
    }),
};

export default config;