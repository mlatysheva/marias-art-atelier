"use client";

import { Alert, Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, CSSProperties, useState } from 'react';
import { FormResponse } from '../../shared/interfaces/form-response.interface';
import createPainting from './create-painting';
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


interface CreatePaintingModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreatePaintingModal({ open, handleClose }: CreatePaintingModalProps) {
  const [response, setResponse] = useState<FormResponse>();
  const [year, setYear] = useState(dayjs().year());
  const [fileNames, setFileNames] = useState<string[]>([]);

  const styles = {
    position: "absolute",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    top: "50%",
    left: "50%",
    width: "100%",
    maxWidth: 600,
    minWidth: 400,
    maxHeight: "90vh",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4, 
  }

  const fileInputStyles: CSSProperties = {
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  };

  const currentYear = dayjs();
  const minYear = dayjs().year(2000);

  const onClose = () => {
    setResponse(undefined);
    handleClose();
    setFileNames([]);
  }

  const postPainting = async(formData: FormData) => {
    const response = await createPainting(formData);
    setResponse(response);
  
    if (!response.error) {
      onClose();
    }
  }

  const renderFileNames = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileNames = [...event.target.files].map((file) => file.name);
      setFileNames(fileNames); 
    }
  }
  
  return (
    <Modal open={open} onClose={onClose}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={styles}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Add a new painting</Typography>
          <form 
            className="w-full" 
            action={postPainting}
            >
            <Stack spacing={2}>
              <TextField name="title" label='Title' variant='outlined' required />
              <TextField 
                name="description" 
                multiline
                minRows={2}
                maxRows={5}
                label='Description' 
                variant='outlined'
              />
              <TextField 
                name="tags"
                placeholder='Add tags separated by comma to generate automatic description'
                multiline
                minRows={1}
                maxRows={2}
                label='Tags' 
                variant='outlined'
              />
              <TextField name="artist" label='Artist' defaultValue="Maria Latysheva" variant='outlined' />
              
              <p>Year</p>            
              <YearCalendar
                yearsPerRow={4} 
                maxDate={currentYear} 
                minDate={minYear} 
                onChange={(date) => setYear(dayjs(date).year())}
                yearsOrder="desc" 
                sx={{
                  height: 100,
                }}
              />

              {/* Hidden input to pass the selected year in formData */}
              <input type="hidden" name="year" value={year ?? currentYear}/>

              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="price">Price</InputLabel>
                <OutlinedInput
                  id="price"
                  name="price"
                  startAdornment={<InputAdornment position="start">€</InputAdornment>}
                  label="Price"
                  type='number'
                  required
                  slotProps={{
                    input: {
                      step: 5,
                      min: 10,
                    }
                  }}
                />
              </FormControl>
              
              <p>Dimensions</p>
              <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
                <FormControl sx={{ m: 1, width: '50%' }} variant="outlined">
                  <InputLabel htmlFor="width">Width</InputLabel>
                  <OutlinedInput
                    id="width"
                    name="width"
                    type="number"
                    defaultValue={'40'}
                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                    slotProps={{
                      input: {
                        step: 5,
                      }
                    }}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: '50%' }} variant="outlined">
                  <InputLabel htmlFor="height">Height</InputLabel>
                  <OutlinedInput
                    id="height"
                    name="height"
                    type="number"
                    defaultValue={'30'}
                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                    slotProps={{
                      input: {
                        step: 5,
                      }
                    }}
                  />
                </FormControl>
              </Stack>

              <p>Materials</p>
              <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
                <FormControl sx={{ m: 1, width: '50%' }} variant="outlined">
                  <InputLabel id="medim-label">Medium</InputLabel>
                  <Select name="medium" id="medium" label="Medium" labelId="medium-label" variant='outlined' defaultValue={''}>
                    <MenuItem value="Oil">Oil</MenuItem>
                    <MenuItem value="Watercolor">Watercolor</MenuItem>
                    <MenuItem value="Pastels">Pastels</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '50%' }} variant="outlined">
                  <InputLabel id="base-label">Base</InputLabel>
                  <Select name="base" id="base" label='Base' labelId="base-label" variant='outlined' defaultValue={''}>
                    <MenuItem value="Streched Canvas">Streched canvas</MenuItem>
                    <MenuItem value="Canvas on Board">Canvas on carton</MenuItem>
                    <MenuItem value="Paper">Paper</MenuItem>
                    <MenuItem value="Carton">Carton</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Stack> 
              <Button component='label' variant='outlined' startIcon={<CloudUploadIcon />}>
                Upload images
                <input 
                  type="file" 
                  name="image" 
                  style={fileInputStyles} 
                  onChange={renderFileNames} 
                  multiple
                  accept="image/*" 
                />
              </Button>
              {fileNames.map((file) => (
                <Typography key={file}>{file}</Typography>
              ))}
      
              {response?.error && (
                <Alert severity="error">
                  {response.error.split(',').map((msg, index) => (
                    <div key={index}>{msg}</div>
                  ))}
                </Alert>
              )}

              <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
                <Button variant='outlined' style={{width: '50%'}} type="button" onClick={() => {handleClose()}}>Cancel</Button>           
                <Button variant='contained' style={{width: '50%'}} type="submit">Create</Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </LocalizationProvider>
    </Modal>
  )
}