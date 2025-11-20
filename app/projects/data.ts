export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  timeframe: string;
  interactive: boolean; // true for projects with interactive demos within the website
  demoUrl?: string; // internal path for interactive demos (e.g., '/projects/1/demo')
  externalLink?: string; // external URL (GitHub, external website, etc.) - doesn't mark as interactive
  githubUrl?: string; // GitHub repository URL
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Information-Theoretic Wordle Solver',
    description: 'A tool that solves the Wordle game by a constraint-based search that uses entropy to guide decisions.',
    technologies: ['Python', 'Pandas', 'NumPy'],
    category: 'Algorithms & Optimization',
    image: '/images/projects/project1/wordle_image.jpg',
    timeframe: 'December 2024 - January 2025',
    interactive: true,
    githubUrl: 'https://github.com/Iva5858/wordle_optimizer',
    demoUrl: '/projects/1/demo', // internal interactive demo
  },
  {
    id: 2,
    title: 'Handwritten Digit Recognition with Neural Networks',
    description: 'A tool that recognizes handwritten digits using a neural network trained on the MNIST dataset.',
    technologies: ['Python', 'Pandas', 'NumPy'],
    category: 'Machine Learning',
    image: '/images/projects/project2/mnist_digits.png',
    timeframe: 'December 2024 - January 2025',
    interactive: true,
    githubUrl: 'https://github.com/Iva5858/mnist_digit_recognition',
    demoUrl: '/projects/2/demo', // internal interactive demo
  },
  {
    id: 3,
    title: 'Flight arrival and departure details analysis (University of London Programming Coursework)',
    description: 'A tool that analyzes flight arrival and departure details using a dataset of flight data.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    category: 'Data Visualization',
    image: '/images/projects/project3/coursework_image.jpg',
    timeframe: 'December 2024 - January 2025',
    interactive: false,
    githubUrl: 'https://github.com/Iva5858/flight_analysis',
  },
  {
    id: 4,
    title: 'No-Cap',
    description: 'A fake news detection tool that uses LLMs to detect fake news within Instagram posts.',
    technologies: ['Python', 'Pandas', 'NumPy'],
    category: 'LLMs & Prompt Engineering',
    image: '/images/projects/project4/nocap_logo.png',
    timeframe: 'September 2024 - June 2025',
    interactive: false,
    externalLink: 'https://projectnocap.org', // external link, not interactive
  },
];

export function getProjectById(id: number): Project | undefined {
  return projects.find((project) => project.id === id);
}

