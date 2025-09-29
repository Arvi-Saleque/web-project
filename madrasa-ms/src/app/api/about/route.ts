import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const aboutSection = await prisma.aboutSection.findFirst();
    
    if (!aboutSection) {
      // Return default data if none exists
      return NextResponse.json({
        mission: '',
        vision: '',
        description: '',
        yearEstablished: '2010',
        totalStudents: '500+',
        graduatedStudents: '1200+',
        qualifiedTeachers: '25',
        teamMembers: [],
        historyTimeline: [],
        achievements: [],
        testimonials: []
      });
    }

    // Parse JSON fields safely
    const parseJsonField = (field: any) => {
      if (typeof field === 'string') {
        try {
          return JSON.parse(field);
        } catch {
          return [];
        }
      }
      return field || [];
    };

    return NextResponse.json({
      mission: aboutSection.mission || '',
      vision: aboutSection.vision || '',
      description: aboutSection.description || '',
      yearEstablished: aboutSection.yearEstablished || '2010',
      totalStudents: aboutSection.totalStudents || '500+',
      graduatedStudents: aboutSection.graduatedStudents || '1200+',
      qualifiedTeachers: aboutSection.qualifiedTeachers || '25',
      teamMembers: parseJsonField(aboutSection.teamMembers),
      historyTimeline: parseJsonField(aboutSection.historyTimeline),
      achievements: parseJsonField(aboutSection.achievements),
      testimonials: parseJsonField(aboutSection.testimonials)
    });
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.mission && !data.vision && !data.description) {
      return NextResponse.json(
        { error: 'At least one of mission, vision, or description is required' },
        { status: 400 }
      );
    }

    // Stringify JSON fields
    const aboutData = {
      mission: data.mission || '',
      vision: data.vision || '',
      description: data.description || '',
      yearEstablished: data.yearEstablished || '2010',
      totalStudents: data.totalStudents || '500+',
      graduatedStudents: data.graduatedStudents || '1200+',
      qualifiedTeachers: data.qualifiedTeachers || '25',
      teamMembers: JSON.stringify(data.teamMembers || []),
      historyTimeline: JSON.stringify(data.historyTimeline || []),
      achievements: JSON.stringify(data.achievements || []),
      testimonials: JSON.stringify(data.testimonials || [])
    };

    // Upsert the about section (update if exists, create if not)
    const aboutSection = await prisma.aboutSection.upsert({
      where: { id: 1 }, // Assuming single about section
      update: aboutData,
      create: { ...aboutData, id: 1 }
    });

    return NextResponse.json({
      message: 'About section updated successfully',
      data: aboutSection
    });
  } catch (error) {
    console.error('Error updating about data:', error);
    return NextResponse.json(
      { error: 'Failed to update about data' },
      { status: 500 }
    );
  }
}