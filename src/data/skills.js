import {
  SiReact, SiJavascript, SiHtml5, SiCss, SiBootstrap, SiJquery, SiRedux, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPhp, SiLaravel, SiMysql, SiWordpress, SiVite, SiNextdotjs,
  SiLinux, SiNginx, SiPm2, SiGit, SiGithub, SiPostman, SiTypescript, SiShopify,
  SiCodeigniter,
  SiMongodb,
  SiHostinger,
} from 'react-icons/si'
import {
  LuCode, LuRoute, LuKey, LuShieldCheck, LuUsers, LuDatabase, LuTable, LuNetwork,
  LuRefreshCw, LuServer, LuTerminal, LuRocket, LuCloud, LuMonitor, LuAtom,
} from 'react-icons/lu'

// `icon` is optional: shown wherever a recognised technology icon exists.
export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    accent: 'purple',
    skills: [
      { name: 'React.js', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'JavaScript ES6+', icon: SiJavascript },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss },
      { name: 'Bootstrap', icon: SiBootstrap },
      { name: 'jQuery', icon: SiJquery },
      { name: 'Redux', icon: SiRedux },
      { name: 'React Hooks', icon: LuAtom },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    accent: 'cyan',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'PHP', icon: SiPhp },
      { name: 'CodeIgniter', icon: SiCodeigniter },
      { name: 'Laravel', icon: SiLaravel },
      { name: 'REST APIs', icon: LuRoute },
      { name: 'Authentication', icon: LuKey },
      { name: 'Authorization', icon: LuShieldCheck },
      { name: 'RBAC', icon: LuUsers },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    accent: 'purple',
    skills: [
      { name: 'MySQL', icon: SiMysql },
      { name: 'SQL Queries', icon: LuCode },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Database Design', icon: LuDatabase },
      { name: 'CRUD', icon: LuRefreshCw },
      { name: 'Relational Database Management', icon: LuTable },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & CMS',
    accent: 'cyan',
    skills: [
      { name: 'React.js', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'CodeIgniter', icon: SiCodeigniter },
      { name: 'Laravel', icon: SiLaravel },
      // { name: 'WordPress', icon: SiWordpress },
      { name: 'Vite', icon: SiVite },
      // { name: 'Next.js', icon: SiNextdotjs },
    ],
  },
  {
    id: 'deployment',
    title: 'Deployment',
    accent: 'purple',
    skills: [
      { name: 'Hostinger', icon: SiHostinger },
      { name: 'Linux', icon: SiLinux },
      { name: 'Nginx', icon: SiNginx },
      { name: 'PM2', icon: SiPm2 },
      { name: 'VPS Hosting', icon: LuServer },
      { name: 'SSH', icon: LuTerminal },
      { name: 'Production Deployment', icon: LuRocket },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    accent: 'cyan',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'VS Code', icon: LuMonitor },
      { name: 'Postman', icon: SiPostman },
    ],
  },
  {
    id: 'other',
    title: 'Other',
    accent: 'purple',
    skills: [
      { name: 'TypeScript (Basic)', icon: SiTypescript },
      // { name: 'Shopify', icon: SiShopify },
    ],
  },
]

// Floating tech badges in the hero background
export const floatingTech = [
  { name: 'React', icon: SiReact },
  { name: 'Node', icon: SiNodedotjs },
  { name: 'PHP', icon: SiPhp },
  { name: 'MySQL', icon: SiMysql },
  { name: 'Laravel', icon: SiLaravel },
  { name: 'CodeIgniter', icon: SiCodeigniter },
  { name: 'Nginx', icon: SiNginx },
]

export { LuCloud }
