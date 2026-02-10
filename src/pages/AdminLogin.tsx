import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { LogIn, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminLogin = () => {
  const { user, isAdmin, loading, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (loading) {
    return (
      <Layout>
        <div className="pt-32 pb-24 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (user && isAdmin) {
    return <Navigate to="/admin/resources" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) {
        setError(error.message);
      } else {
        setSignupSuccess(true);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      }
    }
    setSubmitting(false);
  };

  return (
    <Layout>
      <section className="pt-32 pb-24 lg:pt-36">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{mode === 'login' ? 'Admin Login' : 'Create Account'}</CardTitle>
              <CardDescription>{mode === 'login' ? 'Sign in with your admin credentials' : 'Create an account to request admin access'}</CardDescription>
            </CardHeader>
            <CardContent>
              {signupSuccess ? (
                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">Account created! You can now sign in.</p>
                  <Button variant="outline" onClick={() => { setMode('login'); setSignupSuccess(false); }}>Go to Login</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  {user && !isAdmin && (
                    <p className="text-sm text-destructive">This account does not have admin privileges.</p>
                  )}
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {mode === 'login' ? <LogIn className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                    {submitting ? (mode === 'login' ? 'Signing in...' : 'Creating...') : (mode === 'login' ? 'Sign In' : 'Create Account')}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    {mode === 'login' ? (
                      <>No account? <button type="button" className="text-primary hover:underline" onClick={() => { setMode('signup'); setError(''); }}>Create one</button></>
                    ) : (
                      <>Already have an account? <button type="button" className="text-primary hover:underline" onClick={() => { setMode('login'); setError(''); }}>Sign in</button></>
                    )}
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLogin;
