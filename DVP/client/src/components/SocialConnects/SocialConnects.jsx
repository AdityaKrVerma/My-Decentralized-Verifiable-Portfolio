import React from 'react';
import './SocialConnects.css'; // Ensure unique styling in this CSS file
import { FaLinkedin, FaDiscord, FaGithub } from 'react-icons/fa';

const SocialConnects = () => {
  // Add or modify social media links as needed
  const socialLinks = [
    { name: 'LinkedIn', icon: <FaLinkedin className='icon' />, url: 'https://www.linkedin.com/in/adityakumarverma/' },
    { name: 'Discord', icon: <FaDiscord className='icon' />, url: 'https://discordapp.com/users/adityakrverma' },
    { name: 'GitHub', icon: <FaGithub className='icon' />, url: 'https://github.com/AdityaKrVerma' }
  ];

  return (
    <section className='socialConnects'>
      {socialLinks.map((link, index) => (
        <a key={index} href={link.url} target='_blank' rel="noopener noreferrer">
          {link.icon}
        </a>
      ))}
    </section>
  );
}

export default SocialConnects;
