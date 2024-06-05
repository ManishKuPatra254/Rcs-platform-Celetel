import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Navbar } from './Navbar';
import { loginUser } from '../Service/auth.service';
import bg from '../assets/New1.svg';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginUs = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(formData);
      console.log('Login response:', response);

      if (response.success === true) {
        setFormData({ email: '', password: '' });
        navigate('/userdashboard');
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        });
        toast('Login Successful', {
          description: formattedDate,
        });
      } else {
        console.error('Error during login, no token received');
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        });
        toast('Login Failed please correct username and password.', {
          description: formattedDate,
        });
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      toast('Login Error', {
        description: `Error during login: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };



  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div>
        <Navbar />
        <Box sx={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
          '@media (max-width:1000px)': {
            width: '100%',
            padding: '5px',
          },
        }}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box sx={{
                backgroundImage: `url(${bg})`,
                height: '100%',
                backgroundSize: 'cover',
                '@media (max-width:1000px)': {
                  display: 'none',
                },
              }}></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box>
                <Container sx={{
                  width: '70%',
                  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                  padding: '15px',
                  '@media (max-width:1000px)': {
                    width: '95%',
                  },
                }}>
                  <Box>
                    <Typography component="h1" variant="h5" sx={{ color: 'black', fontWeight: '400', mt: 2 }}>
                      Welcome !
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', mt: '20px' }}>
                      <Typography component="h1" variant="h4" sx={{ color: 'black', fontWeight: '600' }}>
                        Sign in to <br />RCS
                      </Typography>
                    </Box>
                  </Box>
                  <Box component="form" noValidate onSubmit={handleLoginUs} sx={{ mt: 2 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sx={{ padding: '10px', color: 'black' }}>
                        <TextField
                          required
                          fullWidth
                          name="email"
                          value={formData.email}
                          onChange={handleLoginChange}
                          label="Email"
                          size="small"
                          type="email"
                          autoComplete="email"
                          sx={{
                            '& .MuiInputBase-root': { color: 'black' },
                            '& .MuiInputLabel-root': { color: 'black' },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: 'black' },
                              '&:hover fieldset': { borderColor: 'black' },
                              '&.Mui-focused fieldset': { borderColor: 'black' },
                            },
                            mt: 1,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ padding: '10px', color: 'black' }}>
                        <TextField
                          type={showPassword ? 'text' : 'password'}
                          label="Password"
                          name="password"
                          size="small"
                          value={formData.password}
                          onChange={handleLoginChange}
                          variant="outlined"
                          fullWidth
                          sx={{
                            '& .MuiInputBase-root': { color: 'black' },
                            '& .MuiInputLabel-root': { color: 'black' },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: 'black' },
                              '&:hover fieldset': { borderColor: 'black' },
                              '&.Mui-focused fieldset': { borderColor: 'black' },
                            },
                            mt: 2,
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff sx={{ color: 'black' }} /> : <Visibility sx={{ color: 'black' }} />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ padding: '5px', color: 'black' }}>
                        <Grid container alignItems="center" justifyContent="space-between" style={{ marginTop: '10px' }}>
                          <div className="flex items-center space-x-2 mt-3">
                            <Checkbox id="terms" />
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Remember me
                            </label>
                          </div>
                          <Grid item>
                            <CardTitle
                              onClick={() => navigate('/reset-password')}
                              className='text-sm text-gray-500 font-light cursor-pointer'>
                              Forgot password?
                            </CardTitle>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sx={{ padding: '10px', color: 'black' }}>
                        {loading ? (
                          <Button className='w-full mt-5' disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                          </Button>
                        ) : (
                          <Button className='w-full mt-5' type="submit">
                            Login
                          </Button>
                        )}
                      </Grid>
                      <Grid item xs={12} sx={{ color: 'black' }}>
                        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: '100%', textAlign: 'center', mb: 5, mt: 4 }}>
                          <Typography variant="body1" component="span" style={{ marginTop: '10px' }}>
                            Not registered yet?{' '}
                            <span
                              style={{ color: '#beb4fb', cursor: 'pointer' }}
                              onClick={() => navigate('/register')}
                            >
                              Create an Account
                            </span>
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
