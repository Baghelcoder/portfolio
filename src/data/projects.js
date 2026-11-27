// Live projects. URLs are exact. Descriptions only state what is confirmed:
// the technologies used and, for the React/Node/MySQL builds, the e-commerce
// areas listed in the brief (products, collections, REST API, MySQL).

export const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'php', label: 'PHP' },
  { id: 'react', label: 'React' },
  { id: 'ecommerce', label: 'E-Commerce' },
]

export const projects = [
  {
    id: 'bluevita',
    name: 'Blue Vita',
    url: 'https://bluevita.in/',
    tags: ['php'],
    tech: ['PHP'],
    description: 'A live business website built with PHP.',
    highlights: [],
    hue: ['#22D3EE', '#8B5CF6'],
  },
  {
    id: 'hennaland',
    name: 'Henna Land Exports',
    url: 'https://hennalandexports.com/',
    tags: ['php'],
    tech: ['PHP'],
    description: 'A live export business website built with PHP.',
    highlights: [],
    hue: ['#8B5CF6', '#F472B6'],
  },
  {
    id: 'universitydekho',
    name: 'University Dekho',
    url: 'http://universitydekho.online/',
    tags: ['php'],
    tech: ['PHP'],
    description: 'A live education-focused website built with PHP.',
    highlights: [],
    hue: ['#22D3EE', '#34D399'],
  },
  {
    id: 'drdcgupta',
    name: 'Dr. DC Gupta',
    url: 'https://drdcgupta.com/',
    tags: ['php'],
    tech: ['PHP'],
    description: 'A live professional website built with PHP.',
    highlights: [],
    hue: ['#8B5CF6', '#22D3EE'],
  },
  {
    id: 'gkjewellers',
    name: 'GK Jewellers',
    url: 'https://gkjewellers.com/',
    tags: ['react', 'ecommerce'],
    tech: ['React.js', 'Node.js', 'MySQL'],
    description: 'A full stack e-commerce build with a React.js frontend, Node.js backend and MySQL database.',
    highlights: ['Product management', 'Collection management', 'REST API integration', 'MySQL database', 'Frontend and backend integration'],
    hue: ['#F59E0B', '#8B5CF6'],
  },
  {
    id: 'godbless',
    name: 'Godbless',
    url: 'https://godbless.in/',
    tags: ['react', 'ecommerce'],
    tech: ['React.js', 'Node.js', 'MySQL'],
    description: 'A full stack e-commerce build with a React.js frontend, Node.js backend and MySQL database.',
    highlights: ['Product management', 'Collection management', 'REST API integration', 'MySQL database', 'Frontend and backend integration'],
    hue: ['#22D3EE', '#8B5CF6'],
  },
]

// Builds a preview image URL from a public screenshot service. If it fails to
// load (offline, blocked, rate-limited) the card falls back to its designed thumbnail.
export const previewUrl = (url) =>
  `https://image.thum.io/get/width/900/crop/620/noanimate/${url}`

export const extraWork = [
  {
    id: 'lims',
    title: 'Laboratory Information Management System (LIMS)',
    short: 'LIMS',
    icon: 'flask',
    points: ['Laboratory workflows', 'Customer and order management', 'Test result processing', 'Result mapping', 'Report generation'],
    tech: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
  },
  {
    id: 'ecom-app',
    title: 'Full Stack E-Commerce Application',
    short: 'E-Commerce',
    icon: 'bag',
    points: ['Product and collection management', 'SEO-friendly URLs', 'REST APIs', 'Database integration'],
    tech: ['React.js', 'Vite', 'Node.js', 'Express.js', 'MySQL'],
  },
  {
    id: 'canvas',
    title: 'Online Canvas / Drawing Application',
    short: 'Canvas',
    icon: 'pen',
    points: ['Interactive canvas', 'Drawing functionality', 'Reusable UI components'],
    tech: ['Next.js', 'React.js', 'TypeScript'],
  },
  {
    id: 'CodeIgniter',
    title: 'CodeIgniter Web Application',
    short: 'CodeIgniter',
    icon: 'box',
    points: ['MVC architecture', 'Routes and controllers', 'Backend functionality', 'Vite and Tailwind CSS 4'],
    tech: ['PHP', 'CodeIgniter4'],
  },
]
