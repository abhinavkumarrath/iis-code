import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position to toggle button visibility
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll securely to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={styles.button}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  );
};

const styles = {
  button: {
    position: 'fixed' as const,
    bottom: '40px',
    right: '40px',
    height: '55px',
    width: '55px',
    fontSize: '30px',
    fontWeight: 'bold' as const,
    backgroundColor: '#ffffff',
    color: 'black',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease-in-out',
  },
};

export default ScrollToTop;
