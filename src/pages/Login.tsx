import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      navigate("/dashboard");
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } else {
      toast({
        title: "Failed login attempt",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center animate-fade-in">
        <div className="text-white space-y-8">
          <div className="space-y-4">
            <img
              src="/lovable-uploads/5d486b70-1159-4c2b-bddc-790a934c8be1.png"
              alt="Dr.Cloud Logo"
              className="w-32 h-32 object-contain animate-pulse"
            />
            <h1 className="text-5xl font-bold leading-tight">
              Welcome to <br />Dr.Cloud
            </h1>
          </div>
          <p className="text-lg text-white/80 leading-relaxed">
            Your comprehensive healthcare management solution. Streamline your practice with our intuitive platform.
          </p>
        </div>

        <div className="glass-card p-8 space-y-8 backdrop-blur-xl">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold text-primary">Login</h2>
            <p className="text-sm text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 px-4 bg-white/50 backdrop-blur-sm border-white/20"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 px-4 bg-white/50 backdrop-blur-sm border-white/20"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;