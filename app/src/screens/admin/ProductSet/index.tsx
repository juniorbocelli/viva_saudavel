import React from 'react';
import {
  Button,
  Box,
  Grid,
  Typography,

  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ImageType } from 'react-images-uploading';

import AdminMainContentBox from '../../../ui/components/pages/AdminMainContentBox';
import ControlledTextInput from '../../../ui/components/form/ControlledTextInput';
import ControlledCurrencyInput from '../../../ui/components/form/ControlledCurrencyInput';
import ControlledSwitchInput from '../../../ui/components/form/ControlledSwitchInput';

import ProducerSelect from './components/ProducerSelect';
import CategorySelect from './components/CategorySelect';
import ProductImages from './components/ProductImages';
import ImageUpload from './components/ImageUpload';

import * as Rules from '../../../features/validation/rules';
import { Product, ProductProducerCode, ProductCategory, } from '../../../globals/interfaces/product';
import { ProductFormData, } from './types';
import useStates from './states';
import useAPIs from './apis';
import useEffects from './effects';
import Math from '../../../features/utils/Math';

const ProductSet: React.FC<React.ReactFragment> = () => {
  const theme = useTheme();
  const methods = useForm<ProductFormData>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const states = useStates();
  const apis = useAPIs(states, methods);
  const effects = useEffects(apis);
  const params = useParams();

  const resetForm = () => {
    methods.reset();
    states.setImages([]);
    states.setProductImages([]);
  };

  effects.useComponentDidMount(params.id, states.setProductId);
  effects.useProductIdDidChanged(states.productId, resetForm);

  const onSubmit = (data: ProductFormData) => {
    console.log('onSubmit', data);

    if (states.productImages.length === 0 && states.images.length === 0) {
      states.setDialogMessage({ title: "Erro", message: "O produto deve conter alguma imagem" });
      return;
    };

    const productToSend: Product = {
      name: data.name,
      producer: data.producer,
      measure: data.measure,
      description: data.description,
      ingredients: data.ingredients,
      validate: data.validate,

      filters: {
        isKosher: data.isKosher,
        isA2A2: data.isA2A2,
        isGlutenFree: data.isGlutenFree,
        isSugarFree: data.isSugarFree,
        isNatural: data.isNatural,
        isLactoseFree: data.isLactoseFree,

        producerCode: data.producerCode as ProductProducerCode,
        category: data.category as ProductCategory,
      },

      price: Math.currencyToFloat(data.price),
      quantity: Math.floatOrUndefined(data.quantity),

      images: states.productImages,
    };

    const formData = new FormData()

    formData.append('product', JSON.stringify(productToSend));

    states.images.forEach((image: ImageType) => {
      formData.append('files', image.file as Blob);
    });

    if (typeof (states.productId) === 'undefined')
      apis.newProduct(formData);
    else
      apis.updateProduct(formData);
    return;
  };

  return (
    <AdminMainContentBox
      primary={typeof (states.productId) === 'undefined' ? "Cadastro de Produto" : "Edição de Produto"}
      states={states}
      pageTitle="Dashboard Produto"
    >
      <form onSubmit={methods.handleSubmit(onSubmit)} encType='multipart/form-data'>
        <Typography variant='h5' component='div' sx={{ mb: theme.spacing(1.5) }}>
          Dados Gerais do Produto
        </Typography>

        <Box
          sx={
            {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }
          }
        >

          <Box sx={{ width: '90%', }}>
            <ControlledTextInput
              hookForm={["name", methods.control, methods.formState.errors, Rules.requiredText]}
              label="Nome do Produto"
              placeholder="Digite o nome do produto..."
              fullWidth={true}
            />
          </Box>

          <Box sx={{ width: '90%', }}>
            <ControlledTextInput
              hookForm={["producer", methods.control, methods.formState.errors, Rules.requiredText]}
              label="Nome do Produtor"
              placeholder="Digite o nome do produtor..."
              fullWidth={true}
            />
          </Box>

          <Box sx={{ width: '90%', }}>
            <ControlledTextInput
              hookForm={["measure", methods.control, methods.formState.errors, Rules.requiredText]}
              label="Unidade de Medida"
              placeholder="Digite a unidade de medida da embalagem..."
              fullWidth={true}
            />
          </Box>

          <Box sx={{ width: '90%', }}>
            <ControlledTextInput
              hookForm={["description", methods.control, methods.formState.errors, Rules.requiredText]}
              label="Descrição"
              placeholder="Digite a descrição do produto..."
              fullWidth={true}
              multiline={true}
              rows={6}
            />
          </Box>

          <Box sx={{ width: '90%', }}>
            <ControlledTextInput
              hookForm={["ingredients", methods.control, methods.formState.errors, Rules.requiredText]}
              label="Ingredientes"
              placeholder="Digite a lista de ingredientes..."
              fullWidth={true}
            />
          </Box>

          <Box sx={{ width: '90%', }}>
            <ControlledTextInput
              hookForm={["validate", methods.control, methods.formState.errors, Rules.requiredText]}
              label="Validade"
              placeholder="Digite a validade da embalagem..."
              fullWidth={true}
            />
          </Box>

          <Box sx={{ width: '90%', }}>
            <ControlledCurrencyInput
              name='price'
              methods={methods}
              validate={Rules.requiredText}
              label="Preço"
              placeholder="0,00"
              fullWidth={true}
            />
          </Box>

          <Box sx={{ width: '90%' }}>
            <ControlledSwitchInput
              label='Ativo?'
              hookForm={['isActive', methods.control, methods.formState.errors, {}]}
              defaultValue={typeof (states.productId) === 'undefined' ? true : undefined}
            />
          </Box>

          <Box sx={{ width: '90%', }}>
            <ControlledTextInput
              hookForm={
                [
                  "quantity",
                  methods.control,
                  methods.formState.errors,
                  Rules.optionalNumber(0, undefined, true)
                ]
              }
              label="Quantidade"
              placeholder="Deixe em branco para ilimitado"
              fullWidth={true}
              type='number'
              inputProps={{ min: 0, step: 1 }}
            />
          </Box>

          <Typography variant='h6' component='div' sx={{ mb: theme.spacing(1.5), mt: theme.spacing(3), alignSelf: 'flex-start' }}>
            Filtros
          </Typography>

          <Grid sx={{ width: '90%' }} spacing={2} container>
            <Grid md={6} item>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <ControlledSwitchInput
                  label='É Kosher?'
                  hookForm={['isKosher', methods.control, methods.formState.errors, {}]}
                  defaultValue={false}
                />

                <ControlledSwitchInput
                  label='É A2A2?'
                  hookForm={['isA2A2', methods.control, methods.formState.errors, {}]}
                  defaultValue={false}
                />

                <ControlledSwitchInput
                  label='É Sem Glútem?'
                  hookForm={['isGlutenFree', methods.control, methods.formState.errors, {}]}
                  defaultValue={false}
                />
              </Box>
            </Grid>

            <Grid md={6} item>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <ControlledSwitchInput
                  label='É Sem Açúcar?'
                  hookForm={['isSugarFree', methods.control, methods.formState.errors, {}]}
                  defaultValue={false}
                />

                <ControlledSwitchInput
                  label='É Natural?'
                  hookForm={['isLactoseFree', methods.control, methods.formState.errors, {}]}
                  defaultValue={false}
                />

                <ControlledSwitchInput
                  label='É Sem Lactose?'
                  hookForm={['isNatural', methods.control, methods.formState.errors, {}]}
                  defaultValue={false}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid sx={{ width: '90%' }} spacing={2} container>
            <Grid md={6} item>
              <ProducerSelect methods={methods} sx={{ width: '90%', mt: theme.spacing(1) }} />
            </Grid>

            <Grid md={6} item>
              <CategorySelect methods={methods} sx={{ width: '90%', mt: theme.spacing(1) }} />
            </Grid>
          </Grid>

          <Typography variant='h6' component='div' sx={{ mb: theme.spacing(1.5), mt: theme.spacing(3), alignSelf: 'flex-start' }}>
            Imagens
          </Typography>

          {
            typeof (states.productId) !== 'undefined' &&
            <Box sx={{ width: '90%', mb: theme.spacing(2), }}>
              <ProductImages productImages={states.productImages} setProductImages={states.setProductImages} />
            </Box>
          }

          <Box sx={{ width: '90%', mb: theme.spacing(2), }}>
            <ImageUpload images={states.images} setImages={states.setImages} />
          </Box>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ mt: { xs: theme.spacing(2), md: theme.spacing(2) } }}
            fullWidth
          >
            {typeof (states.productId) === 'undefined' ? 'Cadastrar' : 'Salvar'}
          </Button>

        </Box>
      </form>
    </AdminMainContentBox >
  );
};

export default ProductSet;