/* Soon Page - MYKE AI Web Experience */
export default function SoonPage() {
  return (
    <div className="min-h-screen bg-mykeblack text-mykewhite">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-600/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold tracking-wider">
            MYKE AI
          </a>
          <div>
            <a href="/" className="text-gray-300 hover:text-mykeblue transition-college">Retour à l'accueil</a>
          </div>
        </div>
      </nav>

      <main className="relative py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              WEB EXPERIENCE
            </h1>
          </div>
          
          <p className="text-lg text-gray-300 mb-12 leading-relaxed">
            The next generation of MYKE AI is coming to the web.
          </p>
          
          <h2 className="text-2xl font-medium text-mykeblue mb-8">
            Coming Soon
          </h2>
          
          <p className="text-base text-gray-400 mb-12">
            MYKE AI web experience is currently in development.
            We're working hard to bring you the full MYKE AI experience
            on the web soon.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="bg-mykeblue text-white px-8 py-4 rounded-full font-medium hover:bg-blue-600 transition-college">
              Retour à l'accueil
            </a>
            {/* <a href="#" className="px-8 py-4 rounded-border border-mykeblue text-mykeblue hover:bg-white transition-college">
              Get Updates
            </a> */}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 py-6 border-t border-gray-600/40">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-gray-400">
          <p>MYKE AI — by KLIIP GAMES</p>
          <p>Web Experience — Coming Soon</p>
        </div>
      </footer>
    </div>
  );
}