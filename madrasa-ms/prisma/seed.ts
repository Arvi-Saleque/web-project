import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@madrasa.edu' },
    update: {},
    create: {
      email: 'admin@madrasa.edu',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
      adminProfile: {
        create: {
          position: 'Principal',
          phone: '+880 1234-567890',
        },
      },
    },
  });

  console.log('Created admin:', admin);

  // Create Teacher
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@madrasa.edu' },
    update: {},
    create: {
      email: 'teacher@madrasa.edu',
      password: hashedPassword,
      name: 'Teacher User',
      role: 'TEACHER',
      teacherProfile: {
        create: {
          subject: 'Islamic Studies',
          qualification: 'M.A. in Islamic Studies',
          phone: '+880 1234-567891',
        },
      },
    },
  });

  console.log('Created teacher:', teacher);

  // Create Student
  const student = await prisma.user.upsert({
    where: { email: 'student@madrasa.edu' },
    update: {},
    create: {
      email: 'student@madrasa.edu',
      password: hashedPassword,
      name: 'Student User',
      role: 'STUDENT',
      studentProfile: {
        create: {
          rollNumber: 'STD001',
          class: '10',
          section: 'A',
          parentName: 'Parent Name',
          parentPhone: '+880 1234-567892',
        },
      },
    },
  });

  console.log('Created student:', student);

  // Seed About Section
  const aboutSection = await prisma.aboutSection.upsert({
    where: { id: 'about-section-1' },
    update: {},
    create: {
      id: 'about-section-1',
      title: 'About Our Madrasa',
      subtitle: 'Nurturing Islamic Knowledge & Excellence Since 1999',
      establishedYear: 1999,
      storyTitle: 'Building a Legacy of Islamic Education',
      storyContent: `Founded in 1999, Madrasa MX has been at the forefront of providing quality Islamic education combined with modern academic excellence. Our journey began with a vision to create an institution that bridges traditional Islamic scholarship with contemporary educational methods.

Over the past 25+ years, we have educated thousands of students who have gone on to become successful professionals, scholars, and community leaders while maintaining strong Islamic values and principles.`,
      storyImageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
      heroImageUrl: null,
    },
  });

  console.log('Created about section:', aboutSection);

  // Seed About Stats
  const stats = [
    { label: 'Students', value: '2000+', icon: 'Users', color: 'text-cyan-600', order: 0 },
    { label: 'Teachers', value: '150+', icon: 'GraduationCap', color: 'text-blue-600', order: 1 },
    { label: 'Years Experience', value: '25+', icon: 'Award', color: 'text-purple-600', order: 2 },
    { label: 'Awards Won', value: '50+', icon: 'Trophy', color: 'text-amber-600', order: 3 },
  ];

  for (const stat of stats) {
    await prisma.aboutStat.upsert({
      where: { id: `stat-${stat.order}` },
      update: {},
      create: {
        id: `stat-${stat.order}`,
        ...stat,
      },
    });
  }

  console.log('Created about stats');

  // Seed About Values
  const values = [
    {
      title: 'Faith & Character',
      description: 'Building strong Islamic character and values in every student',
      icon: 'Heart',
      order: 0,
    },
    {
      title: 'Quality Education',
      description: 'Providing comprehensive Islamic and modern education',
      icon: 'BookOpen',
      order: 1,
    },
    {
      title: 'Community Focus',
      description: 'Serving the community through knowledge and service',
      icon: 'Users',
      order: 2,
    },
    {
      title: 'Global Perspective',
      description: 'Preparing students for success in a global context',
      icon: 'Globe',
      order: 3,
    },
  ];

  for (const value of values) {
    await prisma.aboutValue.upsert({
      where: { id: `value-${value.order}` },
      update: {},
      create: {
        id: `value-${value.order}`,
        ...value,
      },
    });
  }

  console.log('Created about values');

  // Seed About FAQs
  const faqs = [
    {
      question: 'What is the admission process?',
      answer: 'The admission process includes submitting an online application, providing required documents, attending an entrance assessment, and an interview with the admission committee. Applications are open throughout the year with specific intake periods.',
      order: 0,
    },
    {
      question: 'What courses do you offer?',
      answer: 'We offer comprehensive Islamic studies including Quran memorization, Tajweed, Arabic language, Islamic jurisprudence (Fiqh), Hadith studies, and Islamic history. We also provide modern subjects aligned with national curriculum standards.',
      order: 1,
    },
    {
      question: 'Are there scholarships available?',
      answer: 'Yes, we offer merit-based and need-based scholarships to deserving students. Scholarships cover partial to full tuition fees depending on the student\'s performance and family circumstances. Applications are reviewed each semester.',
      order: 2,
    },
    {
      question: 'What are the class timings?',
      answer: 'We offer flexible timings with morning sessions from 8:00 AM to 12:00 PM and afternoon sessions from 2:00 PM to 6:00 PM. Weekend classes are also available. Specific timings vary by program and level.',
      order: 3,
    },
    {
      question: 'Do you provide transportation?',
      answer: 'Yes, we provide safe and reliable transportation services covering major areas of the city. Our buses are equipped with GPS tracking and supervised by trained staff to ensure student safety.',
      order: 4,
    },
  ];

  for (const faq of faqs) {
    await prisma.aboutFAQ.upsert({
      where: { id: `faq-${faq.order}` },
      update: {},
      create: {
        id: `faq-${faq.order}`,
        ...faq,
      },
    });
  }

  console.log('Created about FAQs');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
