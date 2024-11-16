import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid, Container, IconButton, Snackbar, Alert } from '@mui/material';
import { ArrowBack, Save } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CreateContact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    job_title: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate required fields
    if (!formData.first_name || !formData.last_name || !formData.email) {
      setError('First name, last name, and email are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/addContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create contact');
      }

      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message || 'An error occurred while creating the contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: "100px" }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" component="h1">Create New Contact</Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={loading}
                error={!formData.first_name}
                helperText={!formData.first_name ? "First name is required" : ""}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={loading}
                error={!formData.last_name}
                helperText={!formData.last_name ? "Last name is required" : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                error={!formData.email}
                helperText={!formData.email ? "Email is required" : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate('/')} disabled={loading}>Cancel</Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Save />}
                  disabled={loading || !formData.first_name || !formData.last_name || !formData.email}
                >
                  {loading ? 'Saving...' : 'Save Contact'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Contact created successfully!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default CreateContact;
