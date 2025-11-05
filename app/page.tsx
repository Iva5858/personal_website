import Link from 'next/link';
import Image from 'next/image';
import isaacIcon from '../public/images/isaac_icon.png';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gray-300 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gray-400 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gray-300 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fadeIn">
            <div className="mb-8 flex justify-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600 shadow-2xl animate-float">
                {/* Placeholder for profile image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white">IVA</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Isaac Vélez Aguirre
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
              Data Science & Business Analytics Student
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              University of London & Forward College | Berlin, Germany
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/projects"
                className="px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transform hover:scale-105 transition-all duration-200"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                About Me
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                I am Isaac Vélez Aguirre, a Colombian-Spanish third-year student studying Data Science & Business Analytics 
                at the University of London and Business & Leadership at Forward College. I am passionate and curious, 
                constantly seeking opportunities for personal growth and learning.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Currently, I am exploring opportunities in the form of internships for the Summer of 2026 to expand my skills 
                and become a more qualified professional. I have experience in the tech field as a Software Engineer and Data Scientist, 
                working with AI/ML technologies and Large Language Models.
              </p>
              <Link
                href="/about"
                className="inline-block px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
              >
                Learn More →
              </Link>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <Image
                src={isaacIcon}
                alt="About image"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore some of my recent work in data science and machine learning
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((project, index) => (
              <div
                key={project}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
                  <span className="text-white font-semibold">Project Image {project}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Project {project}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Description of project {project} showcasing data science skills and methodologies.
                  </p>
                  <Link
                    href="/projects"
                    className="text-gray-900 dark:text-gray-100 hover:underline font-semibold"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-block px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
