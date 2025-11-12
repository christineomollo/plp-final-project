import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Users, Sparkles, Globe, Target, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold gradient-text">
              💖 BurBestie
            </Link>
            <div className="flex gap-4">
              <Link to="/" className="text-gray-700 hover:text-bestie-purple">Home</Link>
              <Link to="/login" className="btn-primary btn-sm">Sign In</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-bestie-lavender via-white to-bestie-peach">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">BurBestie</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            A digital haven built on safety, community, and comprehensive well-being, 
            dedicated to empowering every woman globally.
          </p>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop"
            alt="Women in community circle"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                BurBestie was created to provide a safe, supportive digital space where women 
                can access essential tools for holistic well-being, connect authentically with 
                others, and find immediate help when needed.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                We believe every woman deserves to feel safe, supported, and empowered in her 
                daily life. Through our platform, we're building a global community of "Besties" 
                who uplift and protect one another.
              </p>
              <div className="flex gap-4 mt-6">
                <div className="card text-center flex-1">
                  <Heart className="text-bestie-pink mx-auto mb-2" size={32} />
                  <p className="font-bold text-2xl">10K+</p>
                  <p className="text-sm text-gray-600">Besties</p>
                </div>
                <div className="card text-center flex-1">
                  <Shield className="text-bestie-purple mx-auto mb-2" size={32} />
                  <p className="font-bold text-2xl">24/7</p>
                  <p className="text-sm text-gray-600">Safety</p>
                </div>
                <div className="card text-center flex-1">
                  <Users className="text-bestie-peach mx-auto mb-2" size={32} />
                  <p className="font-bold text-2xl">50K+</p>
                  <p className="text-sm text-gray-600">Messages</p>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop"
                alt="Women supporting each other"
                className="rounded-2xl shadow-xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SDG Alignment Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-bestie-lavender to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Aligned with UN <span className="gradient-text">Sustainable Development Goals</span>
            </h2>
            <p className="text-xl text-gray-600">
              Our commitment to making the world a better place for women
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* SDG 5 */}
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="text-white" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">SDG 5: Gender Equality</h3>
                  <p className="text-gray-700 mb-3">
                    We establish a dedicated, secure environment that combats isolation and promotes 
                    safe peer-to-peer collaboration, enhancing the overall security and independence of women.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✅ Safe community spaces for women</li>
                    <li>✅ SOS emergency assistance system</li>
                    <li>✅ Education and empowerment resources</li>
                    <li>✅ Anonymous support options</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* SDG 3 */}
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="text-white" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">SDG 3: Good Health and Well-being</h3>
                  <p className="text-gray-700 mb-3">
                    We offer proactive and preventive mental health care solutions including daily 
                    affirmations and scientifically informed articles addressing women's unique needs.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✅ Daily mental wellness affirmations</li>
                    <li>✅ Menstrual health education</li>
                    <li>✅ Nutrition and fitness guidance</li>
                    <li>✅ Mental health support resources</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-bestie-pink to-bestie-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Safety First</h3>
              <p className="text-gray-600">
                Your safety and privacy are our top priorities in every feature we build.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-bestie-purple to-bestie-lilac rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in the power of women supporting women through shared experiences.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-bestie-lilac to-bestie-peach rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Empowerment</h3>
              <p className="text-gray-600">
                We provide tools and resources that help women take control of their wellness.
              </p>
            </div>

            {/* Value 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-bestie-peach to-bestie-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Inclusivity</h3>
              <p className="text-gray-600">
                BurBestie welcomes women from all backgrounds, cultures, and walks of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-bestie-peach to-bestie-rose">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Built by Women, for Women
            </h2>
            <p className="text-xl text-gray-800 opacity-90">
              Our diverse team is passionate about creating positive change
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="card text-center">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop"
                alt="Team member"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-sm text-bestie-purple mb-2">Creating Safe Spaces</p>
              <p className="text-gray-600 text-sm">
                We're committed to building technology that genuinely serves women's needs and empowers them daily.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="card text-center">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop"
                alt="Team member"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-sm text-bestie-purple mb-2">Global Impact</p>
              <p className="text-gray-600 text-sm">
                To reach every woman who needs support, creating a worldwide network of safety and empowerment.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="card text-center">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
                alt="Team member"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Our Community</h3>
              <p className="text-sm text-bestie-purple mb-2">10,000+ Strong</p>
              <p className="text-gray-600 text-sm">
                Join thousands of Besties who are already part of this transformative movement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-bestie-purple to-bestie-pink text-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Become a Bestie?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of empowered women today
          </p>
          <Link to="/register" className="bg-white text-bestie-purple font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-block">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white text-center">
        <p className="text-sm text-gray-400">
          &copy; 2025 BurBestie. Built with 💖 for women, by women.
        </p>
      </footer>
    </div>
  );
};

export default About;