import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "../assets/Group 32.svg";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Fragment, useState } from "react";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { registerUser } from "../Service/auth.service";
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { Loader2 } from "lucide-react";


export default function Register() {
  // const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: "",
    company: "",
    password: '',
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);


  const handleRegisterUs = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      if (response.success === true) {
        console.log(response.data);
        setFormData({
          username: '',
          email: '',
          phone: "",
          company: "",
          password: '',
          confirmPassword: "",
        });
        navigate('/', { state: { username: formData.username } });
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
        toast(response.message, {
          description: formattedDate,
        })
      } else {
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
        toast(response.message, {
          description: formattedDate,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  const handleRegisterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <Helmet>
        <title> Register | RCS Celetel</title>
      </Helmet>
      <div>
        <Navbar />
        <Box sx={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: "column",
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          '@media (max-width:1000px)': {
            width: '100%',
            padding: '5px',
          },
        }}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                sx={{
                  backgroundImage: `url(${bg})`,
                  height: "100%",
                  backgroundSize: "cover",
                  '@media (max-width:1000px)': {
                    display: 'none',
                  },
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box>
                <Container
                  sx={{
                    width: "70%",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    padding: "15px",
                    '@media (max-width:1000px)': {
                      width: '95%',
                    },
                  }} >
                  <Box>
                    <Box>
                      <Typography component="h1" variant="h5" sx={{ color: 'black', fontWeight: "400" }}>
                        Welcome !
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'row',
                          mt: 1
                        }}
                      >
                        <Typography component="h1" variant="h4" sx={{ color: 'black', fontWeight: "600" }}>
                          Sign in to RCS
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleRegisterUs}
                    sx={{ mt: 1 }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12} sx={{ padding: '10px', color: 'black' }}>
                        <TextField
                          required
                          fullWidth
                          name="username"
                          size="small"
                          value={formData.username}
                          onChange={handleRegisterChange}
                          label="Username"
                          sx={{
                            '& .MuiInputBase-root': {
                              color: 'black',
                            },
                            '& .MuiInputLabel-root': {
                              color: 'black',
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'black',
                              },
                              '&:hover fieldset': {
                                borderColor: 'black',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'black',
                              },
                            },
                            mt: 1,

                          }}
                        />
                      </Grid>


                      <Grid item xs={12} sx={{ padding: '10px', color: 'black' }}>
                        <TextField
                          required
                          fullWidth
                          label="Company"
                          name="company"
                          size="small"
                          value={formData.company}
                          onChange={handleRegisterChange}
                          sx={{
                            '& .MuiInputBase-root': {
                              color: 'black',
                            },
                            '& .MuiInputLabel-root': {
                              color: 'black',
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'black',
                              },
                              '&:hover fieldset': {
                                borderColor: 'black',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'black',
                              },
                            },
                            mt: 1,

                          }}
                        />
                      </Grid>


                      <Grid item xs={12} sx={{ padding: '10px', color: 'black' }}>
                        <TextField
                          required
                          fullWidth
                          label="Email"
                          name="email"
                          size="small"
                          value={formData.email}
                          onChange={handleRegisterChange}
                          autoComplete="new-password"
                          sx={{
                            '& .MuiInputBase-root': {
                              color: 'black',
                            },
                            '& .MuiInputLabel-root': {
                              color: 'black',
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'black',
                              },
                              '&:hover fieldset': {
                                borderColor: 'black',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'black',
                              },
                            },
                            mt: 1,

                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sx={{ padding: '10px', color: 'black' }}>
                        <TextField
                          required
                          fullWidth
                          name="phone"
                          label="Phone"
                          type="text"
                          size="small"
                          value={formData.phone}
                          onChange={handleRegisterChange}
                          autoComplete="phone"
                          sx={{
                            '& .MuiInputBase-root': {
                              color: 'black',
                            },
                            '& .MuiInputLabel-root': {
                              color: 'black',
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'black',
                              },
                              '&:hover fieldset': {
                                borderColor: 'black',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'black',
                              },
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
                          value={formData.password}
                          onChange={handleRegisterChange}
                          size="small"
                          variant="outlined"
                          fullWidth
                          sx={{
                            '& .MuiInputBase-root': {
                              color: 'black',
                            },
                            '& .MuiInputLabel-root': {
                              color: 'black',
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'black',
                              },
                              '&:hover fieldset': {
                                borderColor: 'black',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'black',
                              },
                            },
                            mt: 1,

                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff sx={{ color: "black" }} /> : <Visibility sx={{ color: "black" }} />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ padding: '10px', color: 'black' }}>
                        <TextField
                          type={showPassword ? 'text' : 'password'}
                          label="Confirm password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleRegisterChange}
                          size="small"
                          variant="outlined"
                          fullWidth
                          sx={{
                            '& .MuiInputBase-root': {
                              color: 'black',
                            },
                            '& .MuiInputLabel-root': {
                              color: 'black',
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'black',
                              },
                              '&:hover fieldset': {
                                borderColor: 'black',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'black',
                              },
                            },
                            mt: 1,

                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff sx={{ color: "black" }} /> : <Visibility sx={{ color: "black" }} />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ padding: "10px", color: "black" }}>
                        {loading ? (
                          <Button className='w-full mt-5' disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                          </Button>
                        ) : (
                          <Button className='w-full mt-5' type="submit">
                            Register
                          </Button>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" spacing={2}
                          justifyContent="center"
                          alignItems="center"
                          sx={{ height: '100%', textAlign: 'center' }}>
                          <Typography
                            variant="body1"
                            component="span"
                          >
                            Already have an Account?{" "}
                            <span
                              style={{ color: "#beb4fb", cursor: "pointer" }}
                              onClick={() => {
                                navigate("/");
                              }}
                            >
                              Sign In
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
    </Fragment>
  );
}
