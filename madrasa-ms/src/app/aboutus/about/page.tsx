// src/app/about/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  // Single record (already edited from /admin/about)
  const about = await prisma.aboutSection_about.findUnique({ where: { id: 1 } });

    // load all dynamic collections
    const [programs, values, leaders, achievements] = await Promise.all([
    prisma.program_about.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    prisma.coreValue_about.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    prisma.leader_about.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    prisma.achievement_about.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    ]);

  const description =
    about?.description ??
    'Established with a vision to blend traditional Islamic teachings with modern educational methods...';

  const mission =
    about?.mission ??
    'Our mission is to provide exceptional Islamic education that nurtures both spiritual growth and academic excellence...';

  const vision =
    about?.vision ??
    'To be a leading institution in Islamic education, recognized for our commitment to excellence and holistic development.';

  const yearEstablished = about?.yearEstablished ?? '2010';
  const totalStudents = about?.totalStudents ?? '500+';
  const graduatedStudents = about?.graduatedStudents ?? '1200+';
  const qualifiedTeachers = about?.qualifiedTeachers ?? '25';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 pt-20 pb-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Our <span className="text-yellow-300">Madrasa</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Nurturing Hearts, Enlightening Minds, Building Character
            </p>
          </div>
        </div>
      </section>

      {/* Intro + Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Welcome to Our Islamic Educational Institution
          </h2>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 mb-16">
            <div className="text-center bg-blue-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{yearEstablished}</div>
              <div className="text-gray-600">Year Established</div>
            </div>
            <div className="text-center bg-yellow-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{totalStudents}</div>
              <div className="text-gray-600">Current Students</div>
            </div>
            <div className="text-center bg-green-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">{graduatedStudents}</div>
              <div className="text-gray-600">Graduates</div>
            </div>
            <div className="text-center bg-purple-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">{qualifiedTeachers}</div>
              <div className="text-gray-600">Qualified Teachers</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Mission */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{mission}</p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 shadow-lg text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-blue-100 leading-relaxed">{vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Programs (dynamic) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Educational <span className="text-blue-600">Programs</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive educational pathways designed to nurture both spiritual and academic excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((p: { id: number; title: string; summary: string; duration: string }) => (
              <div key={p.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-gray-100">
                  {/* simple generic icon */}
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{p.title}</h3>
                <p className="text-gray-600 mb-4">{p.summary}</p>
                <div className="text-sm font-semibold text-gray-700">Duration: {p.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values (dynamic) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core <span className="text-yellow-600">Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The fundamental principles that guide our educational approach and community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v: { id: number; title: string; summary: string }) => (
              <div key={v.id} className="text-center group">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-200 transition-colors duration-300">
                  <svg className="w-8 h-8 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600">{v.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team (dynamic) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dedicated scholars and educators leading our institution with wisdom and experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((l: { id: number; name: string; role: string; credential: string }) => (
              <div key={l.id} className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{l.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-2">{l.role}</p>
                <p className="text-gray-600 text-xs">{l.credential}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements (dynamic) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-yellow-600">Achievements</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Recognition and awards that reflect our commitment to excellence in Islamic education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((a: { id: number; title: string; year: string; summary: string }) => (
              <div key={a.id} className="rounded-xl p-6 border bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900 truncate">{a.title}</h3>
                      <span className="text-sm font-semibold text-yellow-700 bg-yellow-200 px-2 py-1 rounded whitespace-nowrap">
                        {a.year}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{a.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
