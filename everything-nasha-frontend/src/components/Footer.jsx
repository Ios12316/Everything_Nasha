function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 border-t border-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand & Services Column */}
        <div className="flex flex-col space-y-4 text-center md:text-left">
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Everything_Nasha
          </h2>
          <p className="text-sm text-gray-400">
            Tattoos • Nail Fixing • Lash Extensions • Semi-Permanent Brows
          </p>
          <p className="text-xs text-gray-500">
            Experience premium beauty, styling, and custom art under one roof.
          </p>
        </div>

        {/* Address / Location Column */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Our Studio
          </h3>
          <a 
            href="https://maps.google.com/?q=Army+Estate+Modern+Market,+FCDA,+Kubwa,+Abuja,+Nigeria" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-start gap-2.5 text-sm hover:text-white transition-all text-center md:text-left max-w-xs group"
          >
            <svg className="w-5 h-5 text-pink-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="leading-relaxed">
              Army Estate Modern Market, FCDA, Kubwa, Abuja Nigeria
            </span>
          </a>
          <span className="text-xs text-gray-500 md:pl-7.5">Open daily: 9:00 AM - 6:00 PM</span>
        </div>

        {/* Socials & Connect Column */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Connect With Us
          </h3>
          <div className="flex gap-4">
            {/* WhatsApp */}
            <a 
              href="https://wa.me/2349072128173" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com/everything_nasha" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={2} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2} strokeLinecap="round" />
              </svg>
            </a>

            {/* TikTok */}
            <a 
              href="https://tiktok.com/@everythingnasha1" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-500/30 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.42-.43-.61-.67-.02 3.68-.01 7.36-.02 11.03-.1 2.45-1.13 4.86-3.05 6.4-2.07 1.75-4.91 2.43-7.54 1.95-2.73-.42-5.23-2.18-6.62-4.63-1.63-2.78-1.76-6.42-.4-9.29 1.19-2.6 3.73-4.57 6.6-4.97.12-.02.25-.02.37-.04v4.08c-1.29.17-2.52.88-3.21 2.01-.84 1.3-.87 3.09-.15 4.45.69 1.34 2.19 2.21 3.7 2.15 1.55.02 3.01-.98 3.53-2.45.36-.93.33-1.97.34-2.95V.02z" />
              </svg>
            </a>
          </div>
          <span className="text-xs text-gray-500">Or call directly: +234 907 212 8173</span>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-slate-900 mt-8 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Everything_Nasha. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;