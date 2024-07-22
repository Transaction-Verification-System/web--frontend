import { Button } from "antd";
import { Link } from "react-router-dom";
import Localstore from "./config/localstore";
import RootTemplate from "@/components/templates/root/RootTemplate";

const App: React.FC = () => (
  <RootTemplate>
    <LandingPage />
  </RootTemplate>
);

const LandingPage: React.FC = () => {
  const token = Localstore.getAccessToken();

  return (
    <div className="bg-gray-50">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection token={token} />
      <Footer />
    </div>
  );
};

const HeroSection: React.FC = () => (
  <section className="flex flex-col items-center justify-center text-center py-20 bg-white shadow-md">
    <h1 className="text-3xl font-bold mb-4">
      Verify and Validate Transactions in Real-Time
    </h1>
    <p className="text-lg mb-8">
      Experience seamless and secure online transactions powered by our AI
      technology.
    </p>
    <p className="text-sm text-gray-600 mb-4">
      *Please note: AI model accuracy may vary. Always verify critical
      transactions manually.
    </p>
    <Link to="/login">
      <Button type="primary" size="large">
        Get Started
      </Button>
    </Link>
  </section>
);

const FeaturesSection: React.FC = () => (
  <section className="py-20 px-4 bg-white">
    <h2 className="text-2xl font-semibold text-center mb-10">Features</h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      <FeatureCard
        title="Real-Time Analysis"
        description="Our AI engine provides real-time verification and validation of transactions."
      />
      <FeatureCard
        title="Secure Transactions"
        description="Ensure the safety of your transactions with our cutting-edge security measures."
      />
      <FeatureCard
        title="User-Friendly Interface"
        description="Navigate our platform effortlessly with a clean and intuitive design."
      />
    </div>
  </section>
);

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <div className="border rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

const TestimonialsSection: React.FC = () => (
  <section className="py-20 bg-gray-100">
    <h2 className="text-2xl font-semibold text-center mb-10">
      What Our Users Say
    </h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      <TestimonialCard
        name="John Doe"
        feedback="This service has changed the way I handle transactions!"
      />
      <TestimonialCard
        name="Jane Smith"
        feedback="Highly recommend for anyone looking for security in online payments."
      />
    </div>
  </section>
);

interface TestimonialCardProps {
  name: string;
  feedback: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  feedback,
}) => (
  <div className="border rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow">
    <p className="italic mb-4">"{feedback}"</p>
    <h4 className="font-bold">{name}</h4>
  </div>
);

const CallToActionSection: React.FC<{ token: string | null }> = ({ token }) => (
  <section className="py-20 bg-white text-center">
    <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
    <Link to={token ? "/dashboard" : "/login"}>
      <Button type="primary" size="large">
        Sign Up / Login
      </Button>
    </Link>
  </section>
);

const Footer: React.FC = () => (
  <footer className="py-5 bg-gray-800 text-white text-center">
    <p>
      © {new Date().getFullYear()} AI Transaction Validator. All Rights
      Reserved.
    </p>
  </footer>
);

export default App;
