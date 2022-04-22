import React from 'react';
import {
  Divider,
  Paper,
  Stack,
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
  setProductImages: IUseStates['setProductImages']
};

const ProductImages: React.FC<IProductImagesProps> = ({ productImages, setProductImages }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <ConfirmationDialog
        title='Confirme a ação'
        content='Deseja excluir a imagem?'
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => { }}
      />

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={
          {
            width: '100%',
            overflow: 'scroll',
          }
        }
      >
        {
          productImages.map((image, key) => {
            return (
              <Item key={image} sx={{ maxWidth: '180px' }}>
                <img src={image} alt={`Imagem ${key}`} width='180px' />
              </Item>
            )
          })
        }
      </Stack>
    </React.Fragment>
  );
};

export default ProductImages;