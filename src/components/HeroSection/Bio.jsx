import React from 'react';
import {
  FileText,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

 
// 📄 Resume & Contact Buttons
export function ActionButtons() {
  return (
      <div className="flex flex-wrap gap-4 justify-start">
      {/* Resume Button */}
      <a
        href="/assets/Khushi_Tyagi_Resume.pdf"
        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm sm:text-base bg-blue-600 text-white hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FileText className="w-5 h-5" />
        <span>View Resume</span>
      </a>

      {/* Contact Button */}
      <a
  href="#contact"
  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm sm:text-base text-blue-600 dark:text-blue-400 border-2 border-blue-600 transition-transform duration-300 transform hover:scale-105"
>
  <Mail className="w-5 h-5" />
  <span>Contact Me</span>
</a>

      {/* Uttarakhand Project Button */}
      <a
        href="https://uttarakhand-culture.vercel.app/"
        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm sm:text-base bg-blue-600 text-white hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FileText className="w-5 h-5" />
        <span>Uttarakhand</span>
      </a>
    </div>

  );
}

// 📞 Individual Contact Info Row
function ContactItem({ icon, text, href }) {
  const Component = href ? 'a' : 'div';

  return (
    <Component
      href={href}
      className={`flex items-center gap-2 px-4 py-1 ${
        href ? 'hover:scale-105' : ''
      } transition-transform duration-200`}
    >
      <span className="text-blue-600 dark:text-blue-400">{icon}</span>
      <span className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
        {text}
      </span>
    </Component>
  );
}

// 📍 Full Contact Info Section
export function ContactInfo() {
  return (
    <div className="flex flex-col items-start gap-2 mt-4">
      <ContactItem
        icon={<Phone className="w-5 h-5" />}
        text="+91 7082344109"
        href="tel:+917082344109"
      />
      <ContactItem
        icon={<Mail className="w-5 h-5" />}
        text="tyagikhushi@gmail.com"
        href="mailto:tyagikhushi161@gmail.com"
      />
      <ContactItem icon={<MapPin className="w-5 h-5" />} text="Dehradun, India" />
    </div>
  );
}

// 🌐 Social Media Links
export function SocialLinks() {
  const links = [
    {
      href: 'https://github.com/KHUSHITYAGII',
      icon: <Github className="w-6 h-6 text-gray-900 dark:text-white" />,
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/khushityagi0208/',
      icon: <Linkedin className="w-6 h-6 text-[#0077B5]" />,
      label: 'LinkedIn',
    },
    {
      href: 'https://instagram.com/khushityagi0208',
      icon: <Instagram className="w-6 h-6 text-[#E1306C]" />,
      label: 'Instagram',
    },
    {
      href: 'https://wa.me/917082344109',
      icon: <FaWhatsapp className="w-6 h-6 text-[#25D366]" />,
      label: 'WhatsApp',
    },
    {
      href: 'https://leetcode.com/u/khushityagi0208/',
      icon: <SiLeetcode className="w-6 h-6 text-gray-900 dark:text-white" />,
      label: 'Leetcode',
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-start mt-4">
      {links.map(({ href, icon, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group relative p-3 bg-gray-200 dark:bg-gray-800 rounded-lg hover:scale-110 transform transition-transform duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div>{icon}</div>
        </a>
      ))}
    </div>
  
  );
}
