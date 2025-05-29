import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react"; // Or use Font Awesome

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">ASEstate</h3>
                        <p className="text-sm text-gray-400">
                            Helping you find the perfect place to call home.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                        <ul className="text-sm space-y-1 text-gray-400">
                            <li><a href="/" className="hover:text-white">Home</a></li>
                            <li><a href="/listings" className="hover:text-white">Listings</a></li>
                            <li><a href="/about" className="hover:text-white">About</a></li>
                            <li><a href="/contact" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact & Socials */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
                        <p className="text-sm text-gray-400 mb-2">
                            Janak Puri East New Delhi, India
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                            Email: ashishmadeshiya17@gmail.com
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-400"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-pink-400"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-blue-300"><Twitter size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} ASEstate. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
