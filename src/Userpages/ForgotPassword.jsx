import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "../assets/Group 32.svg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function ForgotPassword() {
  const [open, setOpen] = useState(false);
  // const [remember, setRemember] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setOpen(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed! Enter correct username and password.
        </Alert>
      </Snackbar>
      <div>
        <Navbar />
        <Box sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: "column",
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          '@media (max-width:1000px)': {
            width: "100%",
            padding: '5px',
            height: '100%',
            display: 'flex',
            alignItems: "center",
            justifyContent: "center"
          },
        }}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                sx={{
                  backgroundImage: `url(${bg})`,
                  width: "100%",
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
                <Container sx={{
                  width: "70%",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  padding: "15px",
                  '@media (max-width:1000px)': {
                    width: '95%',
                  },
                }}>
                  <Box>
                    <Typography component="h1" variant="h5" sx={{ color: 'black', fontWeight: "400" }}>
                      Welcome !
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        mt: '20px',
                      }}
                    >
                      <Typography component="h1" variant="h4" sx={{ color: 'black', fontWeight: "600" }}>
                        Sign in to <br />RCS
                      </Typography>
                    </Box>


                  </Box>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 2 }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12} sx={{ padding: '10px', color: 'black' }}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          name="email"
                          autoComplete="email"
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
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ padding: '10px', color: 'black' }}>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth="true"
                          size="large"
                          sx={{
                            mt: '10px',
                            padding: "10px",
                            textTransform: 'unset',
                            fontWeight: "600",
                            borderRadius: '8px',
                            backgroundColor: '#000',
                            color: "white",
                            '&:hover': {
                              backgroundColor: '#000',
                              color: "white"
                            },
                          }}
                        >
                          Send reset link
                        </Button>
                      </Grid>
                      <Grid item xs={12} sx={{ padding: '10px', color: 'black' }}>
                        <Stack direction="row"
                          spacing={2}
                          justifyContent="center"
                          alignItems="center"
                          sx={{ height: '100%', textAlign: 'center' }}>
                          <Typography
                            variant="body1"
                            component="span"
                            style={{ marginTop: "10px" }}
                          >
                            Login to your Account.
                            <span
                              style={{ color: "#beb4fb", cursor: "pointer" }}
                              onClick={() => {
                                navigate("/");
                              }}
                            >
                              {" "}Sign In
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
