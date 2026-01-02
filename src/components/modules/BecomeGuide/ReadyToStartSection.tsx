import Link from "next/link";

export default function ReadyToStartSection() {
  return (
    <section className="mb-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-secondary to-accent text-secondary-foreground p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-secondary-foreground/80">
              Join our community of passionate local guides
            </p>
          </div>

          <div className="p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  Get Started in 3 Easy Steps
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-4">
                    <div className="bg-muted text-secondary w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      1
                    </div>
                    <h4 className="font-semibold mb-2">Register as Guide</h4>
                    <p className="text-gray-600 text-sm">
                      Create your account with guide role
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="bg-muted text-secondary w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      2
                    </div>
                    <h4 className="font-semibold mb-2">Complete Profile</h4>
                    <p className="text-gray-600 text-sm">
                      Add your expertise, photos, and bio
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="bg-muted text-secondary w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      3
                    </div>
                    <h4 className="font-semibold mb-2">Create First Tour</h4>
                    <p className="text-gray-600 text-sm">
                      List your unique tour experience
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/register?role=guide"
                className="inline-block bg-gradient-to-r from-secondary to-accent text-secondary-foreground font-semibold py-4 px-12 rounded-lg hover:from-secondary/90 hover:to-accent/90 transition-all transform hover:scale-105 shadow-lg text-lg"
              >
                Get Started Now - It's Free!
              </Link>

              <p className="text-gray-600 mt-6">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-secondary font-semibold hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
