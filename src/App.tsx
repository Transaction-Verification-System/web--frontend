import React from 'react';
import { Button, Card, Col, Row, Avatar, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import RootTemplate from '@/components/templates/root/RootTemplate';
import { MailOutlined, SecurityScanOutlined, ProfileOutlined } from '@ant-design/icons';
import Localstore from '@/config/localstore';

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
      <IntroSection />
      <FeaturesSection />
      <BenefitsSection />
      <ModelsSection />
      <TeamSection />
      <CallToActionSection token={token} />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

const HeroSection: React.FC = () => (
  <section className="relative flex flex-col items-center justify-center text-center py-16 bg-blue-500 text-white">
    <h1 className="text-3xl md:text-4xl font-bold mb-4">Verify and Validate Transactions in Real-Time</h1>
    <p className="text-lg mb-6">Experience seamless and secure online transactions powered by our AI technology.</p>
    <p className="text-sm mb-4">
      *Please note: AI model accuracy may vary. Always verify critical transactions manually.
    </p>
    <Link to="/login">
      <Button type="primary" size="large">Get Started</Button>
    </Link>
  </section>
);

const IntroSection: React.FC = () => (
  <section className="py-16 px-4 bg-white text-center">
    <h2 className="text-2xl md:text-3xl font-semibold mb-4">Welcome to Our Platform</h2>
    <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto">
      Our platform is designed to provide a comprehensive solution for transaction verification, using advanced AI algorithms to ensure accuracy and security. 
      We make it easy for you to manage and validate transactions with confidence.
    </p>
  </section>
);

const FeaturesSection: React.FC = () => (
  <section className="py-16 px-4 bg-gray-100">
    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Features</h2>
    <Row gutter={16} justify="center">
      <Col span={24} md={8}>
        <Card hoverable className="border-gray-300 border">
          <MailOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
          <h3 className="text-xl font-semibold mt-4">Real-Time Analysis</h3>
          <p>Our AI engine provides real-time verification and validation of transactions.</p>
        </Card>
      </Col>
      <Col span={24} md={8}>
        <Card hoverable className="border-gray-300 border">
          <SecurityScanOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
          <h3 className="text-xl font-semibold mt-4">Secure Transactions</h3>
          <p>Ensure the safety of your transactions with our cutting-edge security measures.</p>
        </Card>
      </Col>
      <Col span={24} md={8}>
        <Card hoverable className="border-gray-300 border">
          <ProfileOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
          <h3 className="text-xl font-semibold mt-4">User-Friendly Interface</h3>
          <p>Navigate our platform effortlessly with a clean and intuitive design.</p>
        </Card>
      </Col>
    </Row>
  </section>
);

const BenefitsSection: React.FC = () => (
  <section className="py-16 px-4 bg-white text-center">
    <h2 className="text-2xl md:text-3xl font-semibold mb-8">Key Benefits</h2>
    <Row gutter={16} justify="center">
      <Col span={24} md={8}>
        <Card className="border-gray-300 border">
          <h3 className="text-xl font-semibold mb-4">Increased Efficiency</h3>
          <p>Reduce the time and effort required for transaction validation with our automated system.</p>
        </Card>
      </Col>
      <Col span={24} md={8}>
        <Card className="border-gray-300 border">
          <h3 className="text-xl font-semibold mb-4">Enhanced Security</h3>
          <p>Protect your business with advanced security measures and AI-driven analysis.</p>
        </Card>
      </Col>
      <Col span={24} md={8}>
        <Card className="border-gray-300 border">
          <h3 className="text-xl font-semibold mb-4">Scalability</h3>
          <p>Easily scale your transaction processing capabilities as your business grows.</p>
        </Card>
      </Col>
    </Row>
  </section>
);

const ModelsSection: React.FC = () => (
  <section className="py-16 px-4 bg-gray-100 text-center">
    <h2 className="text-2xl md:text-3xl font-semibold mb-8">Multiple Models for Various Transactions</h2>
    <Row gutter={16} justify="center">
      <Col span={24} md={6}>
        <Card className="border-gray-300 border">
          <h3 className="text-xl font-semibold mb-4">E-Commerce</h3>
          <p>Our model specializes in detecting fraud and anomalies in e-commerce transactions.</p>
        </Card>
      </Col>
      <Col span={24} md={6}>
        <Card className="border-gray-300 border">
          <h3 className="text-xl font-semibold mb-4">Banking</h3>
          <p>Advanced algorithms ensure security and accuracy in banking transactions.</p>
        </Card>
      </Col>
      <Col span={24} md={6}>
        <Card className="border-gray-300 border">
          <h3 className="text-xl font-semibold mb-4">Credit Card Fraud</h3>
          <p>Efficiently identify fraudulent activities related to credit card transactions.</p>
        </Card>
      </Col>
      <Col span={24} md={6}>
        <Card className="border-gray-300 border">
          <h3 className="text-xl font-semibold mb-4">Money Laundering</h3>
          <p>Analyze transaction patterns to detect potential money laundering activities.</p>
        </Card>
      </Col>
    </Row>
  </section>
);

const TeamSection: React.FC = () => (
  <section className="py-16 px-4 bg-white text-center">
    <h2 className="text-2xl md:text-3xl font-semibold mb-8">Meet the Team</h2>
    <div className="max-w-screen-xl mx-auto">
      <Row gutter={[16, 24]} justify="center">
        <Col xs={24} sm={12} md={6} lg={6}>
          <Card className="border-gray-300 border">
            <Avatar src="https://avatars.githubusercontent.com/u/77425494?v=4" size={64} />
            <h3 className="text-xl font-semibold mt-4">Sibendra Timalsina</h3>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Card className="border-gray-300 border">
            <Avatar src="https://avatars.githubusercontent.com/u/23935872?v=4" size={64} />
            <h3 className="text-xl font-semibold mt-4">Sachit Khadka</h3>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Card className="border-gray-300 border">
            <Avatar src="https://avatars.githubusercontent.com/u/31906789?v=4" size={64} />
            <h3 className="text-xl font-semibold mt-4">Subnia Maharjan</h3>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Card className="border-gray-300 border">
            <Avatar src="https://avatars.githubusercontent.com/u/17626267?v=4" size={64} />
            <h3 className="text-xl font-semibold mt-4">Sampada Kharel</h3>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Card className="border-gray-300 border">
            <Avatar src="https://avatars.githubusercontent.com/u/1415367?v=4" size={64} />
            <h3 className="text-xl font-semibold mt-4">Aananda Bhusal</h3>
          </Card>
        </Col>
        {/* Add more team members here as needed */}
      </Row>
    </div>
  </section>
);



const CallToActionSection: React.FC<{ token: string | null }> = ({ token }) => (
  <section className="py-16 px-4 bg-blue-500 text-center text-white">
    <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to Get Started?</h2>
    <p className="text-lg mb-6">Sign up now to experience the power of our AI-driven transaction verification system.</p>
    <Link to={token ? "/dashboard" : "/login"}>
      <Button type="primary" size="large">Get Started</Button>
    </Link>
  </section>
);

const NewsletterSection: React.FC = () => (
  <section className="py-16 px-4 bg-white text-center">
    <h2 className="text-2xl md:text-3xl font-semibold mb-6">Stay Updated</h2>
    <p className="text-lg mb-6">Subscribe to our newsletter for the latest updates and insights.</p>
    <Form layout="inline" className="justify-center">
      <Form.Item>
        <Input placeholder="Enter your email" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Subscribe</Button>
      </Form.Item>
    </Form>
  </section>
);

const Footer: React.FC = () => (
  <footer className="py-8 px-4 bg-gray-800 text-white text-center">
    <p>&copy; 2024 Your Company. All rights reserved.</p>
  </footer>
);

export default App;
