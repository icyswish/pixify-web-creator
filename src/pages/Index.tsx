import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary/30">
      <div className="max-w-3xl mx-auto px-4 text-center space-y-8 animate-fade-in">
        <h1 className="text-5xl font-bold text-primary">
          Welcome to HealthCare Management System
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Streamline your healthcare practice with our comprehensive management solution. 
          Manage patients, doctors, and appointments all in one place.
        </p>
        <div className="space-x-4">
          <Button
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/login')}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;