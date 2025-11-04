import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectById, projects } from '../data';

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const projectId = parseInt(id, 10);
  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fadeIn">
            <Link
              href="/projects"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Projects
            </Link>

            <div className="mb-4">
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-full">
                {project.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {project.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              {project.timeframe}
            </p>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8 animate-fadeIn">
              {/* Project Image */}
              <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
                  <span className="text-white font-semibold text-2xl">{project.title}</span>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  About This Project
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Detailed Description Section - Ready for future content */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Project Details
                </h2>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    More detailed information about this project will be added here in the future.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              {/* Technologies */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-full border border-gray-200 dark:border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Project Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</p>
                    <p className="text-gray-900 dark:text-gray-100 font-semibold">{project.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Timeframe</p>
                    <p className="text-gray-900 dark:text-gray-100 font-semibold">{project.timeframe}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transform hover:scale-105 transition-all duration-200">
                  View on GitHub
                </button>
                <Link
                  href="/projects"
                  className="block w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:scale-105 transition-all duration-200 text-center"
                >
                  Back to Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

