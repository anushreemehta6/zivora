export const buttonStyles = {
  primary: `
    px-6 py-3 rounded-xl font-medium text-white
    shadow-md transition-all duration-300
    bg-primary hover:bg-secondary
    
  `,
   newprimary: `
    px-6 py-3 rounded-xl font-medium text-white
    shadow-md transition-all duration-300
    bg-secondary hover:bg-primary
    
  `,

  gold: `
    px-6 py-3 rounded-xl font-medium text-white
    shadow-md transition-all duration-300
    bg-gradient-to-r from-primary to-secondary
    hover:from-secondary hover:to-primary
    hover:shadow-lg hover:-translate-y-1 active:scale-95
  `,

  chrome: `
    px-6 py-3 rounded-xl font-medium text-secondary
    shadow-md transition-all duration-300 relative overflow-hidden
    bg-white border border-accent
    hover:bg-gray-50 hover:-translate-y-1 active:scale-95
  `,

  dark: `
    px-6 py-3 rounded-xl font-medium text-white
    shadow-lg transition-all duration-300
    bg-slate-900 hover:bg-black
    hover:-translate-y-1 active:scale-95
  `,

  outline: `
    px-6 py-3 rounded-xl font-medium text-secondary
    border-2 border-secondary
    transition-all duration-300
    hover:bg-secondary hover:text-white hover:-translate-y-1 active:scale-95
  `,

  soft: `
    px-6 py-3 rounded-xl font-medium text-secondary
    shadow-sm transition-all duration-300
    bg-white/50 backdrop-blur-sm border border-gray-200
    hover:bg-white hover:-translate-y-1 active:scale-95
  `,
};

