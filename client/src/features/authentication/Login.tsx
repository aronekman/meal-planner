import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { z } from 'zod';

import { Background } from '@/common/components/Background';
import { Button } from '@/common/components/Button';
import { Form, FormControl, FormField, FormItem } from '@/common/components/Form';
import { GoogleLoginButton } from '@/common/components/GoogleLogin';
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
    <div>
      <Background />
      <div
        className='
        absolute left-[50%] top-[50%] flex w-[80%]
        max-w-[300px] translate-x-[-50%]
        translate-y-[-50%]
        flex-col items-center rounded-xl border-[1px]
        border-primary bg-white px-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]'>
        <h1 className='my-8 flex font-alegreya font-semibold text-3xl'>Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Username'
                      className='text-base border-none bg-stone-100 font-alegreya 
                        text-orange-400 placeholder:italic placeholder:text-orange-300'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Password'
                      className='text-base mt-3 border-none bg-stone-100 
                        font-alegreya text-orange-400 placeholder:italic placeholder:text-orange-300'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button variant='link' className='self-end px-0 font-alegreya text-sm'>
              Forgot password?
            </Button>
            <Button className='text-base' type='submit'>Login</Button>
          </form>
        </Form>
        <hr className='my-3 w-full border-[1px] border-black'></hr>
        <GoogleOAuthProvider clientId='454433122172-je51gqttlseec0u50h0mdt0vopjjudhq.apps.googleusercontent.com'>
          <GoogleLoginButton/>
        </GoogleOAuthProvider>
        <Button asChild variant='link' className='my-2 font-alegreya text-orange-400 h-fit'>
          <Link to='/register'>No account? Sign Up!</Link>
        </Button>
      </div>
    </div>
  );
};

export default Login;
