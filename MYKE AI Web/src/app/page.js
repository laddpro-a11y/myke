/* Landing Page - MYKE AI Web */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-mykeblack text-mykewhite">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-600/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold tracking-wider">
            MYKE AI
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-mykeblue transition-college">Features</a>
            <a href="#download" className="text-gray-300 hover:text-mykeblue transition-college">Download</a>
          </div>
        </div>
      </nav>

      <header className="relative py-24 overflow-hidden">
        <!-- Background gradient -->
        <div className="absolute inset-0 bg-gradient-to-b from-mykeblack via-mykedarkgray to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <div className="inline-block animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              MYKE AI
            </h1>
            <p className="text-xl text-mykeblue mb-8 slogan">
              "AI takes care of the rest."
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group hover:scale-105 transition-transform">
              <div className="p-6 rounded-xl bg-mykedarkgray border border-gray-700/30">
                <div className="text-3xl font-bold text-mykeblue">🪟 Windows</div>
                <h3 className="mt-2">Disponible</h3>
              </div>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="p-6 rounded-xl bg-mykedarkgray border border-gray-700/30">
                <div className="text-3xl font-bold text-mykeblue">🤖 Android</div>
                <h3 className="mt-2">Coming Soon</h3>
              </div>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="p-6 rounded-xl bg-mykedarkgray border border-gray-700/30">
                <div className="text-3xl font-bold text-mykeblue">🌐 Web</div>
                <h3 className="mt-2">SOON</h3>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <a href="#download" className="bg-mykeblue text-white px-8 py-4 rounded-full font-medium hover:bg-blue-600 transition-college">
              Get MYKE
            </a>
          </div>
        </div>
      </header>

      <main className="py-16 relative">
        <section className="py-20" id="features">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-mykedarkgray border border-gray-700/30">
                <div className="text-3xl font-bold text-mykeblue mb-2">💬</div>
                <h3>Chat IA</h3>
                <p>Assistant conversationnel pour toutes vos questions</p>
              </div>
              <div className="p-6 rounded-xl bg-mykedarkgray border border-gray-700/30">
                <div className="text-3xl font-bold text-mykeblue mb-2">🎨</div>
                <h3>Génération d'images</h3>
                <p>Créez des images uniques avec l'IA</p>
              </div>
              <div className="p-6 rounded-xl bg-mykedarkgray border border-gray-700/30">
                <div className="text-3xl font-bold text-mykeblue mb-2">💻</div>
                <h3>Génération de code</h3>
                <p>HTML, CSS, JavaScript, Python et plus</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}