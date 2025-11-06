"use client";

import { Alert, Box, Button, CSSProperties, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';

import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import generateDescriptionFromTags from '../../paintings/create-painting/generate-description';
import { FormResponse } from '../../shared/interfaces/form-response.interface';
import { ChangeEvent, useState } from 'react';
import { Painting } from '../../paintings/interfaces/painting.interface';
import updatePainting from './update-painting';

interface EditPaintingProps {
  painting: Painting;
}

export default function EditPaintingForm(props: EditPaintingProps) {
  const { painting } = props;

  const [response, setResponse] = useState<FormResponse | null>(null);
  const [title, setTitle] = useState(painting.title);
  const [tags, setTags] = useState(painting.tags ? painting.tags.join(', ') : '');
  const [description, setDescription] = useState(painting.description);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [artist, setArtist] = useState(painting.artist);
  const [year, setYear] = useState(painting.year);
  const [price, setPrice] = useState(painting.price);
  const [width, setWidth] = useState(painting.dimensions ? painting.dimensions[0] : '');
  const [height, setHeight] = useState(painting.dimensions ? painting.dimensions[1] : '');
  const [medium, setMedium] = useState(painting.materials ? painting.materials[0] : '');
  const [base, setBase] = useState(painting.materials ? painting.materials[1] : '');
  const [fileNames, setFileNames] = useState<string[]>(painting.images);

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

  const handleGenerate = async () => {
    if (!tags) return;

    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    if (tags.length === 0) return;

    setIsGeneratingDescription(true);

    try {
      const generatedDescription = await generateDescriptionFromTags(tagsArray);
      setDescription(generatedDescription);
    } catch (e) {
      console.error("Failed to generate description:", e);
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const postPainting = async(formData: FormData) => {
    const response = await updatePainting(painting.id, formData);
    setResponse(response);
  }

  const renderFileNames = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileNames = [...event.target.files].map((file) => file.name);
      setFileNames(fileNames); 
    }
  }

  const navigateBack = () => {
    window.history.back();
  }

  return (
    <Box sx={{ marginBottom: '2rem' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={styles}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Edit the painting</Typography>
          <form 
            className="w-full" 
            action={postPainting}
            >
            <Stack spacing={2}>
              <TextField 
                name="title" 
                label='Title' 
                variant='outlined' 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title for the painting'
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField 
                name="tags"
                placeholder='Add tags separated by comma to generate automatic description'
                multiline
                minRows={1}
                maxRows={2}
                label='Tags' 
                variant='outlined'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <Button 
                variant="outlined" 
                onClick={handleGenerate}
                disabled={isGeneratingDescription}
              >
                {isGeneratingDescription ? "Generating description..." : "Generate description with Open AI"}
              </Button>

              <TextField 
                name="description" 
                multiline
                minRows={2}
                maxRows={5}
                placeholder='Describe the painting or use the tags above to generate the description with Open AI'
                label='Description' 
                variant='outlined'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField 
                name="artist" 
                label='Artist' 
                variant='outlined' 
                placeholder='Name of the artist'
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              
              <p>Year</p>            
              <YearCalendar
                yearsPerRow={4} 
                maxDate={currentYear} 
                minDate={minYear} 
                value={dayjs().year(year)}
                onChange={(date) => setYear(date.year)}
                yearsOrder="desc" 
                sx={{
                  height: 100,
                }}
              />

              {/* Hidden input to pass the selected year in formData */}
              <input type="hidden" name="year" value={year} />

              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="price">Price</InputLabel>
                <OutlinedInput
                  id="price"
                  name="price"
                  startAdornment={<InputAdornment position="start">€</InputAdornment>}
                  label="Price"
                  type='number'
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
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
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
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
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
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
                  <Select name="medium" id="medium" label="Medium" labelId="medium-label" variant='outlined' defaultValue={''} value={medium} onChange={() => setMedium(e.target.value)}>
                    <MenuItem value="Oil">Oil</MenuItem>
                    <MenuItem value="Watercolor">Watercolor</MenuItem>
                    <MenuItem value="Pastels">Pastels</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '50%' }} variant="outlined">
                  <InputLabel id="base-label">Base</InputLabel>
                  <Select name="base" id="base" label='Base' labelId="base-label" variant='outlined' defaultValue={''} value={base} onChange={() => setBase(e.target.value)}>
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
                <Button variant='outlined' style={{width: '50%'}} type="button" onClick={() => {navigateBack()}}>Cancel</Button>           
                <Button variant='contained' style={{width: '50%'}} type="submit">Update</Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </LocalizationProvider>
    </Box>
  );
}