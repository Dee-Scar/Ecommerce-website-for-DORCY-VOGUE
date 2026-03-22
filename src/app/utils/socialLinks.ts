export interface SocialLinks {
  instagram: string;
  tiktok: string;
  whatsapp: string;
}

export const getSocialLinks = (): SocialLinks => {
  const links = localStorage.getItem('dorcyVogueSocialLinks');
  if (links) {
    return JSON.parse(links);
  }
  
  // Default social links
  const defaultLinks: SocialLinks = {
    instagram: 'https://instagram.com/dorcyvogue',
    tiktok: 'https://tiktok.com/@dorcyvogue',
    whatsapp: 'https://wa.me/234XXXXXXXXXX',
  };
  
  saveSocialLinks(defaultLinks);
  return defaultLinks;
};

export const saveSocialLinks = (links: SocialLinks) => {
  localStorage.setItem('dorcyVogueSocialLinks', JSON.stringify(links));
};
