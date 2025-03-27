"use client";

import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreatePaintingModal from './create-painting-modal';
import { useState } from 'react';

export default function CreatePaintingFab() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <CreatePaintingModal open={modalVisible} handleClose={() => setModalVisible(false)} />
      <div className='absolute right-10 bottom-10'>
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={() => setModalVisible(true)}
        >
          <AddIcon />
        </Fab>
      </div>
    </>
    
  );
}