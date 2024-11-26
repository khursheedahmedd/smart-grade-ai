import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <p>&copy; {new Date().getFullYear()} SmartGrade AI. All rights reserved.</p>
      <div className="mt-2">
        <a href="#" className="hover:underline mx-2">Privacy Policy</a>
        <a href="#" className="hover:underline mx-2">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
