import { prisma } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Card from '@/components/ui/Card';
import StatCard from '@/components/ui/StatCard';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'About Us — Madrasa',
  description: 'Learn about our mission, vision, history, and commitment to excellence in Islamic education.',
};

type Statistic = { label: string; value: string; icon?: string };

export default async function AboutPage() {
  noStore(); // prevent caching

  const about = await prisma.aboutSection.findUnique({ where: { id: 1 } });

  const mission = about?.mission ?? 'Our mission is to provide exceptional Islamic education that nurtures both spiritual growth and academic excellence, preparing students to become responsible citizens and leaders in their communities.';
  const vision = about?.vision ?? 'To be a leading institution in Islamic education, recognized for our commitment to excellence, innovation, and the holistic development of our students.';
  const description = about?.description ?? 'Established with a vision to blend traditional Islamic teachings with modern educational methods, our madrasa has been serving the community for years. We pride ourselves on creating an environment where students can grow academically, spiritually, and socially.';
  const yearEstablished = about?.yearEstablished ?? '2010';
  const totalStudents = about?.totalStudents ?? '500+';
  const graduatedStudents = about?.graduatedStudents ?? '1200+';
  const qualifiedTeachers = about?.qualifiedTeachers ?? '25';

  const statistics: Statistic[] = [
    { label: 'Years of Excellence', value: `${new Date().getFullYear() - parseInt(yearEstablished)}+`, icon: 'calendar' },
    { label: 'Current Students', value: totalStudents, icon: 'students' },
    { label: 'Graduates', value: graduatedStudents, icon: 'graduation' },
    { label: 'Qualified Teachers', value: qualifiedTeachers, icon: 'teachers' }
  ];

  const facilities = [
    {
      title: 'Modern Classrooms',
      description: 'Well-equipped classrooms with modern teaching aids and comfortable learning environments.',
      icon: 'classroom'
    },
    {
      title: 'Library & Resources',
      description: 'Comprehensive library with Islamic texts, academic books, and digital resources.',
      icon: 'library'
    },
    {
      title: 'Prayer Hall',
      description: 'Spacious prayer hall for daily prayers and religious gatherings.',
      icon: 'prayer'
    },
    {
      title: 'Computer Lab',
      description: 'Modern computer laboratory for technology and digital literacy education.',
      icon: 'computer'
    },
    {
      title: 'Sports Facilities',
      description: 'Outdoor playground and sports facilities for physical education and recreation.',
      icon: 'sports'
    },
    {
      title: 'Hostel Accommodation',
      description: 'Safe and comfortable hostel facilities for out-of-town students.',
      icon: 'hostel'
    }
  ];

  const coreValues = [
    {
      title: 'Excellence',
      description: 'Striving for the highest standards in Islamic education and character development',
      icon: 'excellence'
    },
    {
      title: 'Compassion',
      description: 'Fostering empathy, kindness, and understanding in all our interactions',
      icon: 'compassion'
    },
    {
      title: 'Integrity',
      description: 'Upholding honesty, transparency, and moral principles in all our endeavors',
      icon: 'integrity'
    }
  ];

  const getIcon = (iconType: string) => {
    const iconClasses = "w-8 h-8 text-blue-600";
    switch (iconType) {
      case 'calendar':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'students':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        );
      case 'graduation':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      case 'teachers':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'excellence':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'compassion':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'integrity':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'classroom':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'library':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'prayer':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 1.745 0 3.227.835 3.776 2M15 13a3 3 0 11-6 0 3 3 0 016 0zm3 0a6 6 0 11-12 0 6 6 0 0112 0zm-3 0a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'computer':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'sports':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'hostel':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      default:
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <main className="min-h-screen bg-white">
      
    <Navbar />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About Our <span className="text-blue-200">Madrasa</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Impact</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to educational excellence and community service
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {statistics.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.label}
                value={stat.value}
                icon={getIcon(stat.icon || '')}
                color="blue"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Purpose & <span className="text-blue-600">Direction</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Guided by our mission and vision, we strive to provide the best Islamic education
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <Card className="" shadow="lg" border={true}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {mission}
              </p>
            </Card>

            {/* Vision */}
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white" shadow="lg" border={false}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-blue-100 leading-relaxed text-lg">
                {vision}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core <span className="text-blue-600">Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The fundamental principles that guide our educational approach and community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="text-center group" hover={true} border={true}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                  {getIcon(value.icon)}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Facilities</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Modern infrastructure and resources designed to support comprehensive Islamic education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <Card key={index} className="group" hover={true} border={true}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-colors duration-300">
                    {getIcon(facility.icon)}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{facility.title}</h4>
                </div>
                <p className="text-gray-600 leading-relaxed">{facility.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History & Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A timeline of our growth and achievements since {yearEstablished}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <Card className="p-8" shadow="lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                    <span className="text-blue-600 font-bold text-lg">{yearEstablished}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Foundation</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Our madrasa was established with the vision of providing quality Islamic education that combines traditional religious teachings with modern academic standards. Starting with a small group of dedicated students and teachers.
                </p>
              </Card>
              
              <Card className="p-8" shadow="lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-6">
                    <span className="text-green-600 font-bold text-lg">Now</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Today</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Today, we proudly serve {totalStudents} students with {qualifiedTeachers} qualified teachers, having graduated over {graduatedStudents} students who continue to contribute positively to their communities worldwide.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Educational Community
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover the opportunity to be part of an institution that values both spiritual growth and academic excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="text-black border-white hover:bg-white hover:text-blue-600">
              Learn About Admissions
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}