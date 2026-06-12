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
  onBrokenMarkdownLinks: 'warn',

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

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/favicon.ico',
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Responsible AI Architect',
        logo: {
          alt: 'Lenin Garcia - AI Journey',
          src: 'img/logo.png',
        },
        items: [
          {
            label: '🎯 Skill Tracks',
            position: 'left',
            type: 'dropdown',
            items: [
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
            type: 'docSidebar',
            sidebarId: 'learningPlanSidebar',
            position: 'left',
            label: '🗺️ Plan de Desarrollo',
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
              { label: '🗺️ Plan de Desarrollo', to: '/docs/learning-plan/overview' },
              { label: 'Microsoft Learn', href: 'https://learn.microsoft.com' },
              { label: 'Anthropic Academy', href: 'https://academy.anthropic.com' },
            ],
          },
          {
            title: 'Contact & Feedback',
            items: [
              { label: '✉️ lesalgad@microsoft.com', href: 'mailto:lesalgad@microsoft.com' },
              { label: '✉️ garcia.lenin@outlook.com', href: 'mailto:garcia.lenin@outlook.com' },
              { label: 'GitHub', href: 'https://github.com/LeninGarcia09' },
              { label: 'Open an Issue', href: 'https://github.com/LeninGarcia09/LeninGarcia09.github.io/issues' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Lenin Garcia. Built with Docusaurus. Not affiliated with Microsoft.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['powershell', 'bicep', 'json', 'bash', 'python'],
      },
    }),
};

export default config;
