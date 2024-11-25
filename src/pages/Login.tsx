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
    if (username && password) {
      navigate("/dashboard");
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center animate-fade-in">
        <div className="text-white space-y-6">
          <img
            src="/lovable-uploads/d1060129-3244-47c3-aff1-6a747b43c5c1.png"
            alt="Dr.Cloud Logo"
            className="w-32 h-32 object-contain mb-8"
          />
          <h1 className="text-4xl font-bold">Welcome to Dr.Cloud</h1>
          <p className="text-white/80">
            Your comprehensive health management solution
          </p>
        </div>

        <div className="glass-card p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold text-primary">Login</h2>
            <p className="text-sm text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;