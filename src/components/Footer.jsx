import React from 'react';
import { Camera } from 'lucide-react';

const Footer = ({ setCurrentView }) => (
  <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">Artisan Crafts</h3>
          </div>
          <p className="text-gray-400 text-sm">
            Handcrafted excellence in every piece. Creating beauty that transforms spaces.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2">
            <FooterLink onClick={() => setCurrentView('home')}>Home</FooterLink>
            <FooterLink onClick={() => setCurrentView('portfolio')}>Portfolio</FooterLink>
            <FooterLink>About Us</FooterLink>
            <FooterLink>Contact</FooterLink>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Collections</h4>
          <div className="space-y-2">
            <FooterLink>Wax Creations</FooterLink>
            <FooterLink>Resin Artworks</FooterLink>
            <FooterLink>Custom Orders</FooterLink>
            <FooterLink>Gift Sets</FooterLink>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Connect</h4>
          <div className="space-y-2">
            <FooterLink>Instagram</FooterLink>
            <FooterLink>Pinterest</FooterLink>
            <FooterLink>Facebook</FooterLink>
            <FooterLink>Newsletter</FooterLink>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
        <p>© 2025 Artisan Crafts. All rights reserved. Crafted with ❤️ and passion.</p>
      </div>
    </div>
  </footer>
);

const FooterLink = ({ children, onClick }) => (
  <button onClick={onClick} className="block text-gray-400 hover:text-amber-400 transition-colors text-sm">
    {children}
  </button>
);

export default Footer;
