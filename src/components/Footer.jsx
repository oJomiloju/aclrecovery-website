import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-100 to-white py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand Name */}
        <div>
          <h2 className="text-2xl font-bold text-[#294C3A] mb-4">
            Motion 90<span className="align-super text-base">°</span>
          </h2>
          <p className="text-gray-600">
            Your trusted partner in ACL recovery and rehabilitation.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-bold text-[#294C3A] mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="text-gray-700 hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-700 hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-gray-700 hover:underline">
                Pricing
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-700 hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div>
          <h3 className="text-lg font-bold text-[#294C3A] mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#294C3A] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.46 6c-.77.34-1.5.57-2.3.67a4.1 4.1 0 001.86-2.27 8.38 8.38 0 01-2.65 1.03A4.14 4.14 0 0016.07 4c-2.27 0-4.13 1.86-4.13 4.13 0 .32.03.64.1.94A11.69 11.69 0 013 5.33a4.12 4.12 0 00-.56 2.08c0 1.43.73 2.7 1.85 3.44a4.18 4.18 0 01-1.87-.52v.05c0 2 1.41 3.66 3.28 4.05-.34.09-.72.14-1.1.14-.27 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.98A8.3 8.3 0 012 19.54 11.63 11.63 0 008.29 21c7.55 0 11.69-6.26 11.69-11.69v-.53c.8-.58 1.5-1.3 2.06-2.12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#294C3A] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.3c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 12.3h-3v-5.4c0-1.29-.01-2.96-1.8-2.96-1.79 0-2.07 1.4-2.07 2.85v5.51h-3v-11h2.89v1.5h.04c.4-.76 1.39-1.56 2.87-1.56 3.07 0 3.64 2.02 3.64 4.64v6.42z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#294C3A] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58 0-.28-.01-1.02-.01-2-3.34.73-4.04-1.61-4.04-1.61-.54-1.36-1.33-1.72-1.33-1.72-1.09-.75.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.84 2.8 1.31 3.48 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.16 0 0 1-.32 3.3 1.23a11.49 11.49 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.92 1.24 3.23 0 4.61-2.8 5.63-5.47 5.93.44.38.82 1.14.82 2.3 0 1.65-.01 2.98-.01 3.38 0 .32.22.69.82.58a12 12 0 00-3.8-23.4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-gray-600">
        © {new Date().getFullYear()} Motion 90°. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
