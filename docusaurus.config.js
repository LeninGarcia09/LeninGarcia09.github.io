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
          alt: 'Responsible AI Architect',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'foundrySkillSidebar',
            position: 'left',
            label: '🤖 AI Foundry',
          },
          {
            type: 'docSidebar',
            sidebarId: 'responsibleAiSidebar',
            position: 'left',
            label: '⚖️ Responsible AI',
          },
          {
            type: 'docSidebar',
            sidebarId: 'ai102Sidebar',
            position: 'left',
            label: 'AI-102',
          },
          {
            type: 'docSidebar',
            sidebarId: 'az305Sidebar',
            position: 'left',
            label: 'AZ-305',
          },
          {
            type: 'docSidebar',
            sidebarId: 'sc500Sidebar',
            position: 'left',
            label: 'SC-500',
          },
          {
            type: 'docSidebar',
            sidebarId: 'az104Sidebar',
            position: 'left',
            label: 'AZ-104',
          },
          {
            type: 'docSidebar',
            sidebarId: 'az700Sidebar',
            position: 'left',
            label: 'AZ-700',
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
            ],
          },
          {
            title: 'Certifications',
            items: [
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
              { label: 'Microsoft Learn', href: 'https://learn.microsoft.com' },
              { label: 'Microsoft Foundry Portal', href: 'https://ai.azure.com' },
              { label: 'PyRIT Red Teaming Toolkit', href: 'https://github.com/Azure/PyRIT' },
              { label: 'EU AI Act', href: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689' },
              { label: 'NIST AI RMF', href: 'https://www.nist.gov/artificial-intelligence/ai-risk-management-framework' },
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
