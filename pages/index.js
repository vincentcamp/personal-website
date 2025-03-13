import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ImageCarousel from '../components/ImageCarousel';
import MandalorianSpeeder from '../components/MandalorianSpeeder';

const companyInfo = {
  'Fari': {
    description: 'Automating back-of-house processes for hotels.',
    location: 'New York, NY',
    website: 'https://getfari.com',
    images: [
      'https://i.imgur.com/Wnka5ZO.png'
    ]
  },
  'Seven Star Property Management': {
    description: 'Managing luxury rentals and Airbnb properties.',
    location: 'New York, NY',
    website: 'https://sevenstarmanagement.com',
    images: [
      'https://cdn.prod.website-files.com/65091ba8e9db068e47e1f281/652abd085639556741ed31a4_nyceb-exterior-0899-hor-clsc-min.jpg',
      'https://cdn.prod.website-files.com/65091ba8e9db068e47e1f281/652abcb17c358e57d6aa5bd3_st-john.jpg',
      'https://cdn.prod.website-files.com/65091ba8e9db068e47e1f281/652a3667222a1e9f8b054bd8_ahnrz-backyard-0314-hor-clsc-min.jpg'
    ]
  },
  'Seeed Studio': {
    description: 'Developed Edge AI hardware integrations and ML models for real-time inventory management.',
    location: 'Shenzhen, China',
    website: 'https://seeedstudio.com',
    images: [
      'https://cdn.prod.website-files.com/653487216a9176ae6b04d89d/67675625aeb43282591caf02_IMG_7327-p-2600.jpg',
      'https://cdn.prod.website-files.com/653487216a9176ae6b04d89d/676772c636a137a01e51798f_0.jpeg',
      'https://cdn.prod.website-files.com/653487216a9176ae6b04d89d/676754bba28adfd1bbe5f023_seeed3.jpg'
    ]
  },
  'The Ritz-Carlton Hotel Company': {
    description: 'Managed backend operations for hotels in Southwest Florida.',
    location: 'Naples, FL',
    website: 'https://ritzcarlton.com',
    images: [
      'https://cdn.prod.website-files.com/653487216a9176ae6b04d89d/658252d58bff894e3c50f1e7_ritz-carlton-2.jpg',
      'https://cdn.prod.website-files.com/653487216a9176ae6b04d89d/658253010193d1b1fa3852c7_ritz-carlton-3.jpg'
    ]
  },
  'HP': {
    description: 'Conducted data-driven investment analysis and identified high-impact startup opportunities.',
    location: 'Palo Alto, CA',
    website: 'https://hp.com',
    images: [
      'https://cdn.prod.website-files.com/653487216a9176ae6b04d89d/658250f4765023f220455622_hp-2.jpg',
      'https://cdn.prod.website-files.com/653487216a9176ae6b04d89d/658250f6e9c99958acd0c331_hp-3.jpg'
    ]
  },
  'Seven Star Vacations': {
    description: 'Built and sold travel agency specializing in luxury vacations.',
    location: 'New York, NY',
    website: 'https://sevenstarvacations.com',
    images: [
      'https://cdn.prod.website-files.com/653487216a9176ae6b04d89d/658a3f2600518a27e267a5ff_maldives.jpeg',
      'https://cdn.prod.website-files.com/653487216a9176ae6b04d89d/6582538b47c1b9d4aeec9988_seven-star-vacations-3.jpg'
    ]
  },
  'Vincent Campanaro Productions': {
    description: 'Built a media production company specializing in documentary and commercial work.',
    location: 'Philadelphia, PA',
    website: 'https://vinsmovies.com',
    images: [
      'https://cdn.prod.website-files.com/653487216a9176ae6b04d89d/65826b363ec76f4d5e095bf9_vcp-4.jpg'
    ]
  },
  'THEMAGIC5': {
    description: 'Built tools to help swimmers analyze and improve their training performance.',
    location: 'New York, NY',
    website: 'https://themagic5.com',
    images: [
      'https://cdn.prod.website-files.com/653487216a9176ae6b04d89d/6586ede37f34db93e62907ce_themagic5-4.jpg',
      'https://cdn.prod.website-files.com/653487216a9176ae6b04d89d/658253e260e8b856c8eb1c68_themagic5-2.jpg'
    ]
  },
  'RippleMatch': {
    description: 'Analyzed user data to grow student sign-ups and boost platform engagement.',
    location: 'New York, NY',
    website: 'https://ripplematch.com',
    images: [
      'https://i.imgur.com/2ptVAcc.png'
    ]
  },
};

const SunIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2a7 7 0 1 1 0-14 7 7 0 0 1 0 14zM12 5V3M12 21v-2M5 12H3M21 12h-2M16.95 7.05l1.41-1.41M5.64 18.36l1.41-1.41M7.05 7.05L5.64 5.64M18.36 18.36l-1.41-1.41" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Home() {
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);
  const [theme, setTheme] = useState(null);
  
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  }, [theme]);  
  
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Tooltip handling functions remain the same...
  const handleMouseMove = (e) => {
    if (tooltipData) {
      const offset = 15;
      setTooltipPosition({ 
        x: e.clientX + offset, 
        y: e.clientY + offset 
      });
    }
  };

  const handleMouseEnter = (e, companyName) => {
    if (companyName && companyInfo[companyName]) {
      setTooltipData({
        company: companyName,
        ...companyInfo[companyName]
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  useEffect(() => {
    if (tooltipData) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [tooltipData]);

  useEffect(() => {
    if (tooltipRef.current && tooltipData) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let adjustedX = tooltipPosition.x;
      let adjustedY = tooltipPosition.y;
      
      if (tooltipPosition.x + tooltipRect.width > viewportWidth) {
        adjustedX = viewportWidth - tooltipRect.width - 10;
      }
      if (tooltipPosition.y + tooltipRect.height > viewportHeight) {
        adjustedY = viewportHeight - tooltipRect.height - 10;
      }
      
      if (adjustedX !== tooltipPosition.x || adjustedY !== tooltipPosition.y) {
        setTooltipPosition({ x: adjustedX, y: adjustedY });
      }
    }
  }, [tooltipPosition, tooltipData]);

  const renderJobEntry = (title, company) => {
    const companyWebsite = companyInfo[company]?.website;
    
    return (
      <p className={styles.jobEntry}>
        {title} @ 
        <span 
          className={styles.companyName}
          onMouseEnter={(e) => handleMouseEnter(e, company)}
          onMouseLeave={handleMouseLeave}
        >
          {companyWebsite ? (
            <a 
              href={companyWebsite} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.companyLink}
            >
              {company}
            </a>
          ) : (
            <span className={styles.companyText}>{company}</span>
          )}
        </span>
        {company === 'Seven Star Vacations' && " (Acquired)"}
      </p>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Vincent Campanaro</title>
          <link 
            rel="icon" 
            href="/favicon-black.ico" 
            sizes="any" 
          />
          <link 
            rel="icon" 
            href="/favicon-black.ico" 
            media="(prefers-color-scheme: light)" 
            sizes="any" 
          />
          <link
            rel="icon"
            href="/favicon-white.ico"
            media="(prefers-color-scheme: dark)"
            sizes="any"
          />      
        </Head>

      <div className={styles.themeToggleContainer}>
        <div 
          className={styles.hiddenToggle}
          title="Theme toggle (hover to see options)"
        />
        <div className={styles.themeToggleButtons}>
          <button 
            className={`${styles.themeButton} ${theme === 'light' ? styles.active : ''}`}
            onClick={() => changeTheme('light')}
            title="Light mode"
          >
            <SunIcon />
          </button>
          <button 
            className={`${styles.themeButton} ${theme === 'dark' ? styles.active : ''}`}
            onClick={() => changeTheme('dark')}
            title="Dark mode"
          >
            <MoonIcon />
          </button>
        </div>
      </div>

      <MandalorianSpeeder />

      <main className={styles.main}>
        <h1>Vincent Campanaro</h1>
        <p>BTE + CS @ NYU Stern</p>
        
        <h2>Present</h2>
        {renderJobEntry("Co-Founder", "Fari")}
        {renderJobEntry("Founder", "Seven Star Property Management")}
        
        <h2>Previous</h2>
        {renderJobEntry("AI/ML Engineer", "Seeed Studio")}
        {renderJobEntry("Business Development", "The Ritz-Carlton Hotel Company")}
        {renderJobEntry("Business Analytics", "HP")}
        {renderJobEntry("Founder", "Seven Star Vacations")}
        {renderJobEntry("Founder", "Vincent Campanaro Productions")}
        {renderJobEntry("Software Engineer", "THEMAGIC5")}
        {renderJobEntry("Product", "RippleMatch")}
        
        <div className={styles.contactSection}>
          <p>Feel free to reach out at <a href="mailto:vincentcampanaro23@gmail.com">vincentcampanaro23@gmail.com</a></p>
        </div>
      </main>

      {tooltipData && (
        <div 
          ref={tooltipRef}
          className={styles.tooltip}
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          {tooltipData.images && tooltipData.images.length > 0 && (
            <div className={styles.carouselContainer}>
              <ImageCarousel images={tooltipData.images} />
            </div>
          )}

          <div className={styles.tooltipContent}>
            <h3>{tooltipData.company}</h3>
            <p>{tooltipData.description}</p>

            <div className={styles.tooltipDetails}>
              {tooltipData.location && (
                <p>
                  <strong>Location:</strong> {tooltipData.location}
                </p>
              )}
              {tooltipData.website && (
                <p>
                  <strong>Website:</strong>{' '}
                  <a href={tooltipData.website} target="_blank" rel="noopener noreferrer">
                    {tooltipData.website.replace('https://', '')}
                  </a>
                </p>
              )}
              
              {tooltipData.acquired && (
                <p>
                  <strong>Acquired:</strong> {tooltipData.acquired}
                </p>
              )}
              
              {tooltipData.projects && (
                <p>
                  <strong>Projects:</strong> {tooltipData.projects}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}