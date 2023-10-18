import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import apiClient from '@/api/Axios';
import { Button } from '@/common/components/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/common/components/Form';
import { Input } from '@/common/components/Input';
import { useToast } from '@/common/components/use-toast';

const FormSchema = z
  .object({
    username: z.string().min(5, { message: 'Username must be at least 5 characters' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    verification: z.string()
  })
  .refine(({ password, verification }) => password === verification, {
    message: "Passwords don't match",
    path: ['verification']
  });

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const onSubmit = async ({ username, password }: z.infer<typeof FormSchema>) => {
    try {
      await apiClient.post('/register', { username, password });
      toast({ title: 'Registration successfull' });
      navigate('/login');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Something went wrong' });
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { username: '', password: '', verification: '' }
  });

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="flex text-3xl font-bold">Register</h1>
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="verification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-5 w-full" type="submit">
            Sign Up
          </Button>
        </form>
      </Form>
      <Button asChild variant="link" className="pt-3">
        <Link to="/login">Already have an account? Login!</Link>
      </Button>
    </div>
  );
};

export default Register;
