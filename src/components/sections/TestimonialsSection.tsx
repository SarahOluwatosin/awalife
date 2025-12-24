import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      quote: "The AI-100Vet has transformed our diagnostic workflow. Results are faster and more accurate than ever before.",
      author: "Dr. Sarah Chen",
      role: "Chief Veterinarian, PetCare Hospital",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    {
      quote: "AWALIFE's support team is exceptional. They provided comprehensive training and are always available for assistance.",
      author: "Dr. Michael Lee",
      role: "Director, Animal Diagnostics Lab",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    {
      quote: "We've seen a 40% reduction in diagnostic time since implementing AWALIFE equipment in our clinic.",
      author: "Dr. Emily Rodriguez",
      role: "Veterinary Specialist, VetCare Plus",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className={`inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t.testimonials.title}
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold text-foreground transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t.testimonials.subtitle} <span className="gradient-text">{t.testimonials.subtitleHighlight}</span>
            <br />{t.testimonials.subtitleEnd}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.author}
              className={`glow-card p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
            >
              <div className="icon-glow mb-6">
                <Quote className="w-5 h-5 text-primary" />
              </div>
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
