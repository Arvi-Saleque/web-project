// src/app/admin/about/page.tsx
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import DashboardLayout from '@/app/admin/DashboardLayout';

export const dynamic = 'force-dynamic';

/* =========================
   SERVER ACTIONS (About)
   ========================= */
async function updateAbout(formData: FormData) {
  'use server';

  await prisma.aboutSection_about.upsert({
    where: { id: 1 },
    update: {
      description: (formData.get('description') as string) || '',
      mission: (formData.get('mission') as string) || '',
      vision: (formData.get('vision') as string) || '',
      yearEstablished: (formData.get('yearEstablished') as string) || '2010',
      totalStudents: (formData.get('totalStudents') as string) || '500+',
      graduatedStudents: (formData.get('graduatedStudents') as string) || '1200+',
      qualifiedTeachers: (formData.get('qualifiedTeachers') as string) || '25',
    },
    create: {
      id: 1,
      description: (formData.get('description') as string) || '',
      mission: (formData.get('mission') as string) || '',
      vision: (formData.get('vision') as string) || '',
      yearEstablished: (formData.get('yearEstablished') as string) || '2010',
      totalStudents: (formData.get('totalStudents') as string) || '500+',
      graduatedStudents: (formData.get('graduatedStudents') as string) || '1200+',
      qualifiedTeachers: (formData.get('qualifiedTeachers') as string) || '25',
    },
  });

  revalidatePath('/about');
  revalidatePath('/admin/about');
}

/* =========================
   SERVER ACTIONS (Programs)
   ========================= */
async function createProgram(formData: FormData) {
  'use server';
  await prisma.program_about.create({
    data: {
      title: (formData.get('title') as string) || '',
      summary: (formData.get('summary') as string) || '',
      duration: (formData.get('duration') as string) || '',
      order: Number(formData.get('order') || 0),
      isActive: true,
    },
  });
  revalidatePath('/about'); revalidatePath('/admin/about');
}

async function updateProgram(formData: FormData) {
  'use server';
  await prisma.program_about.update({
    where: { id: Number(formData.get('id')) },
    data: {
      title: (formData.get('title') as string) || '',
      summary: (formData.get('summary') as string) || '',
      duration: (formData.get('duration') as string) || '',
      order: Number(formData.get('order') || 0),
      isActive: formData.get('isActive') === 'on',
    },
  });
  revalidatePath('/about'); revalidatePath('/admin/about');
}

async function deleteProgram(formData: FormData) {
  'use server';
  await prisma.program_about.delete({ where: { id: Number(formData.get('id')) } });
  revalidatePath('/about'); revalidatePath('/admin/about');
}

/* =========================
   SERVER ACTIONS (Core Values)
   ========================= */
async function createValue(formData: FormData) {
  'use server';
  await prisma.coreValue_about.create({
    data: {
      title: (formData.get('title') as string) || '',
      summary: (formData.get('summary') as string) || '',
      order: Number(formData.get('order') || 0),
      isActive: true,
    },
  });
  revalidatePath('/about'); revalidatePath('/admin/about');
}

async function updateValue(formData: FormData) {
  'use server';
  await prisma.coreValue_about.update({
    where: { id: Number(formData.get('id')) },
    data: {
      title: (formData.get('title') as string) || '',
      summary: (formData.get('summary') as string) || '',
      order: Number(formData.get('order') || 0),
      isActive: formData.get('isActive') === 'on',
    },
  });
  revalidatePath('/about'); revalidatePath('/admin/about');
}

async function deleteValue(formData: FormData) {
  'use server';
  await prisma.coreValue_about.delete({ where: { id: Number(formData.get('id')) } });
  revalidatePath('/about'); revalidatePath('/admin/about');
}

/* =========================
   SERVER ACTIONS (Leaders)
   ========================= */
async function createLeader(formData: FormData) {
  'use server';
  await prisma.leader_about.create({
    data: {
      name: (formData.get('name') as string) || '',
      role: (formData.get('role') as string) || '',
      credential: (formData.get('credential') as string) || '',
      order: Number(formData.get('order') || 0),
      isActive: true,
    },
  });
  revalidatePath('/about'); revalidatePath('/admin/about');
}

async function updateLeader(formData: FormData) {
  'use server';
  await prisma.leader_about.update({
    where: { id: Number(formData.get('id')) },
    data: {
      name: (formData.get('name') as string) || '',
      role: (formData.get('role') as string) || '',
      credential: (formData.get('credential') as string) || '',
      order: Number(formData.get('order') || 0),
      isActive: formData.get('isActive') === 'on',
    },
  });
  revalidatePath('/about'); revalidatePath('/admin/about');
}

async function deleteLeader(formData: FormData) {
  'use server';
  await prisma.leader_about.delete({ where: { id: Number(formData.get('id')) } });
  revalidatePath('/about'); revalidatePath('/admin/about');
}

/* =========================
   SERVER ACTIONS (Achievements)
   ========================= */
async function createAchievement(formData: FormData) {
  'use server';
  await prisma.achievement_about.create({
    data: {
      title: (formData.get('title') as string) || '',
      year: (formData.get('year') as string) || '',
      summary: (formData.get('summary') as string) || '',
      order: Number(formData.get('order') || 0),
      isActive: true,
    },
  });
  revalidatePath('/about'); revalidatePath('/admin/about');
}

async function updateAchievement(formData: FormData) {
  'use server';
  await prisma.achievement_about.update({
    where: { id: Number(formData.get('id')) },
    data: {
      title: (formData.get('title') as string) || '',
      year: (formData.get('year') as string) || '',
      summary: (formData.get('summary') as string) || '',
      order: Number(formData.get('order') || 0),
      isActive: formData.get('isActive') === 'on',
    },
  });
  revalidatePath('/about'); revalidatePath('/admin/about');
}

async function deleteAchievement(formData: FormData) {
  'use server';
  await prisma.achievement_about.delete({ where: { id: Number(formData.get('id')) } });
  revalidatePath('/about'); revalidatePath('/admin/about');
}

/* =========================
   PAGE
   ========================= */
export default async function AboutManagementPage() {
  const about = await prisma.aboutSection_about.findUnique({ where: { id: 1 } });

  const [programs, values, leaders, achievements] = await Promise.all([
    prisma.program_about.findMany({ orderBy: { order: 'asc' } }),
    prisma.coreValue_about.findMany({ orderBy: { order: 'asc' } }),
    prisma.leader_about.findMany({ orderBy: { order: 'asc' } }),
    prisma.achievement_about.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">About Page Management</h2>
              <p className="text-green-100">Update the content that appears on /about.</p>
            </div>
          </div>
        </div>

        {/* About (single record) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <form action={updateAbout} className="divide-y divide-gray-200">
            {/* Description */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Institution Description</h3>
              <textarea
                name="description"
                defaultValue={
                  about?.description ??
                  'Established with a vision to blend traditional Islamic teachings with modern educational methods...'
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 resize-none"
              />
            </div>

            {/* Mission & Vision */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mission</h3>
                <textarea
                  name="mission"
                  defaultValue={
                    about?.mission ??
                    'Our mission is to provide exceptional Islamic education that nurtures spiritual growth and academic excellence.'
                  }
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 resize-none"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Vision</h3>
                <textarea
                  name="vision"
                  defaultValue={
                    about?.vision ??
                    'To be a leading institution in Islamic education, recognized for excellence and holistic development.'
                  }
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 resize-none"
                />
              </div>
            </div>

            {/* Statistics */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year Established</label>
                <input
                  name="yearEstablished"
                  defaultValue={about?.yearEstablished ?? '2010'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="2010"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Students</label>
                <input
                  name="totalStudents"
                  defaultValue={about?.totalStudents ?? '500+'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  placeholder="500+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Graduates</label>
                <input
                  name="graduatedStudents"
                  defaultValue={about?.graduatedStudents ?? '1200+'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                  placeholder="1200+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualified Teachers</label>
                <input
                  name="qualifiedTeachers"
                  defaultValue={about?.qualifiedTeachers ?? '25'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="25"
                />
              </div>
            </div>

            {/* Save */}
            <div className="p-6 bg-gray-50 rounded-b-xl flex items-center justify-between">
              <div className="text-sm text-gray-500">Saving will update the live /about page immediately.</div>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-all"
              >
                Save About
              </button>
            </div>
          </form>
        </div>

        {/* =========================
            LIST SECTIONS (CRUD)
           ========================= */}

        {/* Programs */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Educational Programs</h3>

          {/* Create */}
          <form action={createProgram} className="grid md:grid-cols-5 gap-3 mb-6">
            <input name="title" placeholder="Title" className="px-3 py-2 border rounded-lg" />
            <input name="summary" placeholder="Summary" className="px-3 py-2 border rounded-lg md:col-span-2" />
            <input name="duration" placeholder="Duration (e.g., 3–5 years)" className="px-3 py-2 border rounded-lg" />
            <input name="order" type="number" placeholder="Order" className="px-3 py-2 border rounded-lg" />
            <div className="md:col-span-5">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add Program</button>
            </div>
          </form>

          {/* List */}
          <div className="space-y-3">
            {programs.map((p) => (
              <div key={p.id} className="bg-gray-50 p-3 rounded-lg">
                <form action={updateProgram} className="grid md:grid-cols-7 gap-2">
                  <input type="hidden" name="id" value={p.id} />
                  <input name="title" defaultValue={p.title} className="px-3 py-2 border rounded-lg" />
                  <input name="summary" defaultValue={p.summary} className="px-3 py-2 border rounded-lg md:col-span-2" />
                  <input name="duration" defaultValue={p.duration} className="px-3 py-2 border rounded-lg" />
                  <input name="order" type="number" defaultValue={p.order} className="px-3 py-2 border rounded-lg" />
                  <label className="flex items-center gap-2 px-2">
                    <input type="checkbox" name="isActive" defaultChecked={p.isActive} />
                    <span className="text-sm">Active</span>
                  </label>
                  <div className="flex gap-2">
                    <button className="bg-emerald-600 text-white px-3 py-2 rounded-lg">Save</button>
                  </div>
                </form>
                <form action={deleteProgram} className="mt-2">
                  <input type="hidden" name="id" value={p.id} />
                  <button className="text-red-600 text-sm hover:underline">Delete</button>
                </form>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Values</h3>

          {/* Create */}
          <form action={createValue} className="grid md:grid-cols-4 gap-3 mb-6">
            <input name="title" placeholder="Title" className="px-3 py-2 border rounded-lg" />
            <input name="summary" placeholder="Summary" className="px-3 py-2 border rounded-lg md:col-span-2" />
            <input name="order" type="number" placeholder="Order" className="px-3 py-2 border rounded-lg" />
            <div className="md:col-span-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add Value</button>
            </div>
          </form>

          {/* List */}
          <div className="space-y-3">
            {values.map((v) => (
              <div key={v.id} className="bg-gray-50 p-3 rounded-lg">
                <form action={updateValue} className="grid md:grid-cols-6 gap-2">
                  <input type="hidden" name="id" value={v.id} />
                  <input name="title" defaultValue={v.title} className="px-3 py-2 border rounded-lg" />
                  <input name="summary" defaultValue={v.summary} className="px-3 py-2 border rounded-lg md:col-span-2" />
                  <input name="order" type="number" defaultValue={v.order} className="px-3 py-2 border rounded-lg" />
                  <label className="flex items-center gap-2 px-2">
                    <input type="checkbox" name="isActive" defaultChecked={v.isActive} />
                    <span className="text-sm">Active</span>
                  </label>
                  <div className="flex gap-2">
                    <button className="bg-emerald-600 text-white px-3 py-2 rounded-lg">Save</button>
                  </div>
                </form>
                <form action={deleteValue} className="mt-2">
                  <input type="hidden" name="id" value={v.id} />
                  <button className="text-red-600 text-sm hover:underline">Delete</button>
                </form>
              </div>
            ))}
          </div>
        </section>

        {/* Leaders */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leadership Team</h3>

          {/* Create */}
          <form action={createLeader} className="grid md:grid-cols-5 gap-3 mb-6">
            <input name="name" placeholder="Name" className="px-3 py-2 border rounded-lg" />
            <input name="role" placeholder="Role" className="px-3 py-2 border rounded-lg" />
            <input name="credential" placeholder="Credential (e.g., PhD in …)" className="px-3 py-2 border rounded-lg md:col-span-2" />
            <input name="order" type="number" placeholder="Order" className="px-3 py-2 border rounded-lg" />
            <div className="md:col-span-5">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add Leader</button>
            </div>
          </form>

          {/* List */}
          <div className="space-y-3">
            {leaders.map((l) => (
              <div key={l.id} className="bg-gray-50 p-3 rounded-lg">
                <form action={updateLeader} className="grid md:grid-cols-7 gap-2">
                  <input type="hidden" name="id" value={l.id} />
                  <input name="name" defaultValue={l.name} className="px-3 py-2 border rounded-lg" />
                  <input name="role" defaultValue={l.role} className="px-3 py-2 border rounded-lg" />
                  <input name="credential" defaultValue={l.credential} className="px-3 py-2 border rounded-lg md:col-span-2" />
                  <input name="order" type="number" defaultValue={l.order} className="px-3 py-2 border rounded-lg" />
                  <label className="flex items-center gap-2 px-2">
                    <input type="checkbox" name="isActive" defaultChecked={l.isActive} />
                    <span className="text-sm">Active</span>
                  </label>
                  <div className="flex gap-2">
                    <button className="bg-emerald-600 text-white px-3 py-2 rounded-lg">Save</button>
                  </div>
                </form>
                <form action={deleteLeader} className="mt-2">
                  <input type="hidden" name="id" value={l.id} />
                  <button className="text-red-600 text-sm hover:underline">Delete</button>
                </form>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>

          {/* Create */}
          <form action={createAchievement} className="grid md:grid-cols-5 gap-3 mb-6">
            <input name="title" placeholder="Title" className="px-3 py-2 border rounded-lg" />
            <input name="year" placeholder="Year (e.g., 2023)" className="px-3 py-2 border rounded-lg" />
            <input name="summary" placeholder="Summary" className="px-3 py-2 border rounded-lg md:col-span-2" />
            <input name="order" type="number" placeholder="Order" className="px-3 py-2 border rounded-lg" />
            <div className="md:col-span-5">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add Achievement</button>
            </div>
          </form>

          {/* List */}
          <div className="space-y-3">
            {achievements.map((a) => (
              <div key={a.id} className="bg-gray-50 p-3 rounded-lg">
                <form action={updateAchievement} className="grid md:grid-cols-7 gap-2">
                  <input type="hidden" name="id" value={a.id} />
                  <input name="title" defaultValue={a.title} className="px-3 py-2 border rounded-lg" />
                  <input name="year" defaultValue={a.year} className="px-3 py-2 border rounded-lg" />
                  <input name="summary" defaultValue={a.summary} className="px-3 py-2 border rounded-lg md:col-span-2" />
                  <input name="order" type="number" defaultValue={a.order} className="px-3 py-2 border rounded-lg" />
                  <label className="flex items-center gap-2 px-2">
                    <input type="checkbox" name="isActive" defaultChecked={a.isActive} />
                    <span className="text-sm">Active</span>
                  </label>
                  <div className="flex gap-2">
                    <button className="bg-emerald-600 text-white px-3 py-2 rounded-lg">Save</button>
                  </div>
                </form>
                <form action={deleteAchievement} className="mt-2">
                  <input type="hidden" name="id" value={a.id} />
                  <button className="text-red-600 text-sm hover:underline">Delete</button>
                </form>
              </div>
            ))}
          </div>
        </section>

        {/* Small hint */}
        <div className="text-sm text-gray-500">
          Tip: After adding/editing items, refresh the public <code>/about</code> page to see changes (cache is revalidated automatically).
        </div>
      </div>
    </DashboardLayout>
  );
}
