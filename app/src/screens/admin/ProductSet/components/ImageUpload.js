import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,

  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageUploading from 'react-images-uploading';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ImageUpload = ({ images, setImages }) => {
  const theme = useTheme();

  const maxNumber = 5;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  return (
    <Box>
      <Typography variant='h6' component='div' sx={{ mb: theme.spacing(2) }}>
        Novas imagens
      </Typography>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={['jpg', 'jpeg', 'png']}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <Box sx={{ display: 'flex' }}>
              <Button
                variant='outlined'
                color={isDragging ? 'error' : 'success'}
                type='button'
                sx={{ mr: theme.spacing(1) }}
                onClick={onImageUpload}
                {...dragProps}
              >
                Clique ou arraste as imagens
              </Button>

              <Button
                variant='outlined'
                color='error'
                type='button'
                onClick={onImageRemoveAll}
              >
                Remover todas
              </Button>
            </Box>

            <Stack
              direction="row"
              spacing={2}
              sx={
                {
                  flexGrow: 1,
                  overflow: 'scroll',
                }
              }
            >
              {
                imageList.map((image, key) => {
                  return (
                    <Item key={image.data_url} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <img src={image.data_url} alt={`Imagem ${key}`} width='180px' />
                      <Button
                        color='error'
                        variant='outlined'
                        sx={{ mt: '5px' }}
                        size='small'
                        onClick={() => onImageRemove(key)}
                      >
                        Remover
                      </Button>

                      <Button
                        color='success'
                        variant='outlined'
                        sx={{ mt: '5px' }}
                        size='small'
                        onClick={() => onImageUpdate(key)}
                      >
                        Atualizar
                      </Button>
                    </Item>
                  )
                })
              }
            </Stack>
          </div>
        )}
      </ImageUploading>
    </Box>
  );
};

export default ImageUpload;