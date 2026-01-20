import React, { useState } from 'react';
import { Heart, Calendar, Camera, Sparkles, ArrowLeft, ArrowRight, User } from 'lucide-react';
import './css/Styles.css';

const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [messageText, setMessageText] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const currentUser = localStorage.getItem("user") || "Friend";
  
  // Custom gallery images - replace these URLs with your actual image URLs
  const galleryImages = [
    './src/assets/together (1).jpg',
    './src/assets/together (2).jpg',
    './src/assets/together (3).jpg',
    './src/assets/together (4).jpg',
    './src/assets/together (5).jpg',
    './src/assets/together (6).jpg',
    './src/assets/together (7).jpg',
    './src/assets/together (8).jpg',
    './src/assets/together (9).jpg',
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    
    if (!messageText.trim()) {
      setSubmitStatus("Please write a message!");
      return;
    }

    try {
      setSubmitStatus("Sending...");
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
      
      console.log("Bot Token:", botToken ? "✓ Found" : "✗ Missing");
      console.log("Chat ID:", chatId ? "✓ Found" : "✗ Missing");
      
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `💌 New Message from ${currentUser.charAt(0).toUpperCase() + currentUser.slice(1)}:\n\n${messageText}`
          })
        }
      );

      const data = await response.json();
      console.log("Telegram response:", data);

      if (response.ok) {
        setSubmitStatus("Message sent! ✓");
        setMessageText("");
        setTimeout(() => setSubmitStatus(null), 3000);
      } else {
        console.error("Error from Telegram:", data);
        setSubmitStatus("Failed to send. Try again!");
      }
    } catch (error) {
      console.error("Send error:", error);
      setSubmitStatus("Error sending message!");
    }
  };

  // Calculate days since January 22nd, 2025
  const startDate = new Date('2025-01-22');
  const today = new Date('2026-01-20'); // Using the current actual time from system prompt
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="app-container">
      {/* Header */}
      <header>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Heart className="w-8 h-8 text-pink-200" style={{ animation: 'pulse 2s infinite' }} />
            <h1>
              Midori & Pang
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-200" />
          </div>
          <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
            One Year Anniversary Celebration
          </p>
          <div className="date">
            <Calendar className="w-5 h-5" />
            <span>January 22, 2025 - January 22, 2026</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Anniversary Counter */}
        <section className="counter-section">
          <div className="counter-box">
            <h2 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '1rem' }}>
              Our Journey Together
            </h2>
            <div className="counter-gradient">
              <p>{diffDays}</p>
              <p>Days of Love</p>
            </div>
            <p className="description">
              From our first meeting on January 22nd, 2025, to this beautiful moment, 
              every day with you has been a precious gift. Here's to forever and beyond!
            </p>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section style={{ marginBottom: '4rem' }}>
          

          {/* Gallery Container */}
          <div className="gallery-container">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Camera style={{color: 'black'}} className="w-8 h-8 text-emerald-500" />
                <h2 style={{ fontSize: '2rem', color: '#1f2937' }}>
                  Our Beautiful Memories
                </h2>
              </div>
              <p style={{ color: '#4b5563', fontSize: '1rem' }}>
                Scroll through our journey together
              </p>
            </div>
            <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
              {/* Main Image Display */}
              <div className="gallery-main" style={{ aspectRatio: '16/15' }}>
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={`Memory ${currentImageIndex + 1}`}
                />
                <div className="gallery-overlay"></div>
                <div className="gallery-counter">
                  <span>
                    {currentImageIndex + 1} / {galleryImages.length}
                  </span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="gallery-arrow arrow-left"
                style={{ color: '#2fcd98' }}
                aria-label="Previous image"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="gallery-arrow arrow-right"
                style={{ color: '#8b5cf6' }}
                aria-label="Next image"
              >
                <ArrowRight className="w-6 h-6" />
              </button>

              {/* Thumbnail Navigation */}
              <div className="gallery-thumbs">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`${index === currentImageIndex ? 'active' : ''}`}
                    style={{
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                      padding: 0,
                      cursor: 'pointer',
                      border: index === currentImageIndex ? '2px solid #2fcd98' : '2px solid #d1d5db',
                      transform: index === currentImageIndex ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.3s'
                    }}
                  >
                    <img
                      src={galleryImages[index]}
                      alt={`Thumbnail ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Love Message */}
        <section>
          <div className="love-message">
            <Heart className="w-16 h-16" style={{ margin: '0 auto 1.5rem', color: '#fce7f3' }} />
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
              To My Dearest Buuba,
            </h3>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.625', maxWidth: '800px', margin: '0 auto' }}>
              Thank you for being with me after all this time. 
              You are my biggest supporter and I hope that we will continue to be and grow together for many more years. 
              Here's to our first year, and to all the years to come. I love you endlessly. Muah.
            </p>
            <p style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem' }}>Forever yours, Numpang 💚💜</p>
          </div>
        </section>

        {/* Response */}
        <section className="counter-section" style={{ marginTop: '4rem' }}>
          <div className="counter-box">
            <form onSubmit={handleSubmitMessage}>
              <h2 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '1rem' }}>
                Your Thoughts
              </h2>
              <textarea
                placeholder="Write your message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                style={{
                  width: '100%',
                  height: '150px',
                  fontSize: '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  resize: 'vertical',
                  fontFamily: '"Playfair Display", serif'
                }}
              ></textarea>
              <button
                type="submit"
                style={{
                  marginTop: '12px',
                  padding: '12px 24px',
                  fontSize: '1rem',
                  color: 'white',
                  backgroundColor: '#2fcd98',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  opacity: messageText.trim() ? 1 : 0.6
                }}
                disabled={!messageText.trim()}
              >
                Submit
              </button>
              {submitStatus && (
                <p style={{ 
                  marginTop: '12px', 
                  fontSize: '0.95rem',
                  color: submitStatus.includes('✓') ? '#10B981' : submitStatus.includes('Sending') ? '#3B82F6' : '#EF4444',
                  fontFamily: '"Playfair Display", serif'
                }}>
                  {submitStatus}
                </p>
              )}
            </form>
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer>
        <div>
          <p style={{ fontSize: '1.125rem' }}>
            Celebrating Love • January 22, 2025 - January 22, 2026
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <Heart className="w-5 h-5 text-pink-200" style={{ animation: 'pulse 2s infinite' }} />
            <span>Made with love by Numpang.</span>
            <Heart className="w-5 h-5 text-pink-200" style={{ animation: 'pulse 2s infinite' }} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
