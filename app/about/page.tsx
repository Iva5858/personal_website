
export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              About Me
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Colombian-Spanish student passionate about data science, AI, and turning insights into action
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            {/* Profile Image */}
            <div className="relative animate-fadeIn">
              <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-2xl">
                {/* Placeholder for profile image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
                  <span className="text-5xl text-white font-semibold">Profile Image</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Hello, I'm Isaac
              </h2>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                <p>
                  I am Isaac Vélez Aguirre, a Colombian-Spanish third-year student studying Data Science & Business Analytics 
                  at the University of London and Business & Leadership at Forward College. I am passionate and curious, 
                  constantly seeking opportunities for personal growth and learning.
                </p>
                <p>
                  Currently, I am exploring opportunities in the form of internships for the Summer of 2026 to expand my skills 
                  and become a more qualified professional. I have experience in the tech field as a Software Engineer, having 
                  worked with Bonnett Analytics and Auteco. I also interned at Opplane, where I gained hands-on experience 
                  with Large Language Models (LLMs) and prompt engineering.
                </p>
                <p>
                  I am always open to new opportunities that allow me to learn and grow. My journey in tech has been driven by 
                  curiosity and a desire to make meaningful contributions through data-driven solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Experience */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Education */}
            <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
                Education
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border-l-4 border-gray-500 dark:border-gray-400">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    BSc, Data Science and Business Analytics
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">University of London / The London School of Economics and Political Science (LSE)</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">September 2023 - July 2026</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Studying data science methodologies, statistical analysis, and business analytics.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border-l-4 border-gray-500">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Bachelor's in Social Sciences and Technology, Business & Leadership
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Forward College</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">September 2023 - July 2026</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Combining business leadership with technological innovation.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border-l-4 border-gray-500">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    European Innovation Academy
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-500">July 2024 - August 2024</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border-l-4 border-gray-500">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Y Combinator Startup School Europe 2024
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-500">November 2024</p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
                Experience
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border-l-4 border-gray-500 dark:border-gray-400">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    AI/Data Science Intern
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Opplane</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">June 2025 - September 2025 (4 months)</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Medellín, Antioquia, Colombia</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border-l-4 border-gray-500">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Founding Data Scientist & Software Developer
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Autsai</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">September 2024 - April 2025 (8 months)</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Paris, Île-de-France, France</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border-l-4 border-gray-500">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    AI/Data Science Intern
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Opplane</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">June 2024 - August 2024 (3 months)</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Lisboa, Portugal</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Gained hands-on experience with Large Language Models (LLMs) and prompt engineering.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border-l-4 border-gray-500">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Web Summit Scholar
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Web Summit</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">November 2023</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Lisbon, Portugal</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Attended Web Summit as part of their scholarship program. Learned about tech startups, 
                    AI & Machine Learning, and SaaS amongst other topics.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border-l-4 border-gray-500">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Junior Software Engineer
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Bonnett Analytics</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">November 2022 - May 2023 (7 months)</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Medellín, Antioquia, Colombia</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border-l-4 border-gray-500">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Intern
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Auteco</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">June 2022 - April 2023 (11 months)</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Medellín, Antioquia, Colombia</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Developed a demo chatbot that could remotely turn off a user's motorcycle in case of theft 
                    using Trakku's services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.8s' }}>
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
              Certifications & Awards
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-lg text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Data4Good Festival</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Best Data Storyteller Award</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-lg text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <div className="text-4xl mb-4">📜</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">EMFSS</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Employability Skills</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-lg text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">ChatGPT</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Prompt Engineering for Developers Course</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-lg text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">EIA Porto 2024</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">International Startup & Innovation Bootcamp</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

