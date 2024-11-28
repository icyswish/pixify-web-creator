import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 p-4">
      <div className="w-full max-w-md space-y-4 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your healthcare dashboard</p>
        </div>
        
        <Card className="glass-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                style: {
                  button: {
                    background: '#1a1f3c',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontSize: '14px',
                    padding: '10px 15px',
                    fontWeight: '500',
                  },
                  anchor: {
                    color: '#1a1f3c',
                    fontWeight: '500',
                  },
                  input: {
                    borderRadius: '0.5rem',
                    padding: '10px 15px',
                    fontSize: '14px',
                  },
                  label: {
                    fontSize: '14px',
                    fontWeight: '500',
                  },
                },
              }}
              theme="light"
              providers={[]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;