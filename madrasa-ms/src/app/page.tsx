import Header from "@/components/common/header";

export default function Home() {
  return (
    <div>
      <Header />

      {/* Additional Content Sections */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive educational services designed to nurture minds and
            hearts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-3">Academic Management</h3>
            <p className="text-muted-foreground">
              Manage assignments, exams, class routines, and results
              efficiently.
            </p>
          </div>
          <div className="p-8 border rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-3">Teacher Portal</h3>
            <p className="text-muted-foreground">
              Dedicated portal for teachers to manage classes and track student
              progress.
            </p>
          </div>
          <div className="p-8 border rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-3">News & Events</h3>
            <p className="text-muted-foreground">
              Stay updated with latest news, announcements, and upcoming events.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
