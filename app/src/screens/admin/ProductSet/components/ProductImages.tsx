import React from 'react';
import {
  Paper,
  Stack,
  Button,
  Typography,

  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ConfirmationDialog from '../../../../ui/components/ConfirmationDialog';
import { IUseStates } from '../states';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface IProductImagesProps {
  productImages: IUseStates['productImages'];
  setProductImages: IUseStates['setProductImages'];
};

const ProductImages: React.FC<IProductImagesProps> = ({ productImages, setProductImages }) => {
  const theme = useTheme();

  const [id, setId] = React.useState<number | null>(null);
  const removeImage = (id: number) => {
    let currentImages = productImages.slice();
    currentImages.splice(id, 1);
    setProductImages(currentImages);
  };

  return (
    <React.Fragment>
      <ConfirmationDialog
        title='Confirme a ação'
        content={<p>Deseja excluir a imagem <b>{id === 0 ? 'principal' : id}</b>?</p>}
        open={id !== null}
        onClose={() => setId(null)}
        onConfirm={() => { if (id !== null) removeImage(id) }}
      />

      <Typography variant='h6' component='div' sx={{ mb: theme.spacing(2) }}>
        Imagens já cadastradas
      </Typography>

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
          productImages.map((image, key) => {
            return (
              <Item key={image} sx={{ display: 'flex', flexDirection: 'column' }}>
                <img src={image} alt={`Imagem ${key}`} width='180px' />
                <Button
                  color='error'
                  variant='outlined'
                  sx={{ mt: '5px' }}
                  size='small'
                  onClick={() => setId(key)}
                >
                  Excluir
                </Button>
              </Item>
            )
          })
        }
      </Stack>
    </React.Fragment>
  );
};

export default ProductImages;