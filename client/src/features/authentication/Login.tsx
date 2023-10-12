import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/common/components/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/common/components/Form';
import { Input } from '@/common/components/Input';
import { useToast } from '@/common/components/use-toast';

import { useAuthContext } from './AuthContext';

const FormSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const success = await login(data.username, data.password);
    if (success) {
      navigate('/');
    } else {
      toast({
        title: 'Invalid Username or Password',
        variant: 'destructive'
      });
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { username: '', password: '' }
  });

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="flex text-3xl font-bold">Login</h1>
      <div className="h-8"></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="mt-5 w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
      <Button asChild variant="link" className="pt-3">
        <Link to="/register">No account? Sign Up!</Link>
      </Button>
    </div>
  );
};

export default Login;
