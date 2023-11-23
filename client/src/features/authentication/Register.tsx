import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import apiClient from '@/api/Axios';
import { Background } from '@/common/components/Background';
import { Button } from '@/common/components/Button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/common/components/Form';
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
    <div>
      <Background />
      <div
        className="
        absolute left-[50%] top-[50%] flex w-[80%]
        max-w-[300px] translate-x-[-50%]
        translate-y-[-50%]
        flex-col items-center rounded-xl border-[1px]
        border-primary bg-white px-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
        <h1 className="my-8 flex font-alegreya text-3xl font-semibold">Sign Up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      className="border-none bg-stone-100 font-alegreya 
                      text-base text-orange-400 placeholder:italic placeholder:text-orange-300"
                      {...field}
                    />
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
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="mt-3 border-none bg-stone-100 
                        font-alegreya text-base text-orange-400 placeholder:italic placeholder:text-orange-300"
                      {...field}
                    />
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
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      className="mt-3 border-none bg-stone-100  font-alegreya
                        text-base text-orange-400 first-line:border-none placeholder:italic placeholder:text-orange-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-3 text-base" type="submit">
              Sign Up
            </Button>
          </form>
        </Form>
        <Button asChild variant="link" className="my-2 h-fit text-center font-alegreya text-orange-400 ">
          <Link to="/login">Already have an account? Login!</Link>
        </Button>
      </div>
    </div>
  );
};

export default Register;
