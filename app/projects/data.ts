export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  timeframe: string;
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
  },
  {
    id: 2,
    title: 'Handwritten Digit Recognition with Neural Networks',
    description: 'A tool that recognizes handwritten digits using a neural network trained on the MNIST dataset.',
    technologies: ['Python', 'Pandas', 'NumPy'],
    category: 'Machine Learning',
    image: '/images/projects/project2/mnist_digits.png',
    timeframe: 'December 2024 - January 2025',
  },
  {
    id: 3,
    title: 'Flight arrival and departure details analysis (University of London Programming Coursework)',
    description: 'A tool that analyzes flight arrival and departure details using a dataset of flight data.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'R'],
    category: 'Data Visualization',
    image: '/images/projects/project3/coursework_image.jpg',
    timeframe: 'December 2024 - January 2025',
  },
  {
    id: 4,
    title: 'No-Cap',
    description: 'A fake news detection tool that uses LLMs to detect fake news within Instagram posts.',
    technologies: ['Python', 'Pandas', 'NumPy'],
    category: 'LLMs & Prompt Engineering',
    image: '/images/projects/project4/nocap_logo.png',
    timeframe: 'September 2024 - June 2025',
  },
];

export function getProjectById(id: number): Project | undefined {
  return projects.find((project) => project.id === id);
}

