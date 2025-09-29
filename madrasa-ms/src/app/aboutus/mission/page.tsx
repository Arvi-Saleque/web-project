// src/app/aboutus/mission/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 pt-20 pb-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Mission & <span className="text-yellow-300">Vision</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Guiding Principles That Shape Our Educational Journey
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Mission */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To provide exceptional Islamic education that nurtures both spiritual growth and academic excellence, 
                preparing students to become knowledgeable, righteous, and contributing members of society while 
                maintaining strong Islamic values and principles.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">Foster deep understanding of Islamic teachings and values</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">Provide comprehensive academic education alongside Islamic studies</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">Develop moral character and ethical leadership qualities</p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 shadow-lg text-white">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-blue-100 leading-relaxed mb-6">
                To be a leading institution in Islamic education, recognized globally for our commitment to 
                excellence, innovation in teaching methodologies, and our graduates' positive impact on 
                their communities and the world.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-blue-100">Excellence in Islamic scholarship and modern education</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-blue-100">Global recognition for educational innovation and quality</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-blue-100">Graduates who are leaders and positive change-makers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals & Objectives */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Goals & Objectives</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Strategic objectives that guide our educational mission and institutional development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Short-term Goals */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                Short-term Goals
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Enhance digital learning infrastructure and online resources</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Expand extracurricular programs and student activities</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Strengthen parent-school partnership programs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Improve student assessment and feedback systems</span>
                </li>
              </ul>
            </div>

            {/* Long-term Goals */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                Long-term Goals
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Establish international partnerships and exchange programs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Develop advanced Islamic studies and research programs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Create alumni network and mentorship programs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Achieve accreditation from international educational bodies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Our Commitment to <span className="text-yellow-300">Excellence</span>
          </h2>
          <p className="text-xl text-gray-200 leading-relaxed mb-8">
            We are dedicated to creating an environment where students not only excel academically 
            but also grow spiritually, morally, and socially. Our mission and vision guide every 
            decision we make, ensuring that each student receives the best possible education 
            grounded in Islamic values and modern pedagogical approaches.
          </p>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-300 rounded-full">
            <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
