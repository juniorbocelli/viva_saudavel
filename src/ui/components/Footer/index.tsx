import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,

  useTheme,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import mastercardIcon from '../../../assets/images/payment-methods/mastercard.svg';
import visaIcon from '../../../assets/images/payment-methods/visa.svg';
import eloIcon from '../../../assets/images/payment-methods/elo.svg';
import americanExpressIcon from '../../../assets/images/payment-methods/american-express.svg';

import hipercardIcon from '../../../assets/images/payment-methods/hipercard.svg';
import jcbIcon from '../../../assets/images/payment-methods/jcb.svg';
import discoverIcon from '../../../assets/images/payment-methods/discover.svg';
import dinersIcon from '../../../assets/images/payment-methods/diners.svg';

interface IItemProps {
  text: string;
  to?: string;
}

const Item: React.FC<IItemProps> = ({ text, to }) => {
  const handleClick = (utl: string) => {

  };

  return (
    <ListItem sx={{ cursor: 'pointer' }}>
      <ListItemText primary={text} onClick={() => to ? handleClick(to) : null} />
    </ListItem>
  );
}

const Footer: React.FC<React.ReactFragment> = () => {
  const theme = useTheme();

  return (
    <Box
      sx={
        {
          minHeight: '200px',
          backgroundColor: theme.palette.primary.main,
          width: '100%',
          color: theme.palette.primary.contrastText,
          mt: {xs: theme.spacing(5), md: theme.spacing(5)}
        }
      }

      component='footer'
    >
      <Box
        sx={
          {
            display: 'grid',
            gap: 1,
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)', // 0
              sm: 'repeat(4, 1fr)', // 600
            },


            pt: { xs: theme.spacing(3), md: theme.spacing(3) },
            px: { xs: theme.spacing(2), md: theme.spacing(15) }
          }
        }
      >

        {/* Column 1 */}
        <Box>
          <Box>
            <Typography sx={{ fontWeight: 600 }}>
              Redes sociais
          </Typography>

            <List dense>
              <ListItem>
                <IconButton>
                  <InstagramIcon sx={{ color: theme.palette.primary.contrastText }} />
                </IconButton>

                <IconButton>
                  <FacebookIcon sx={{ color: theme.palette.primary.contrastText }} />
                </IconButton>

                <IconButton>
                  <LinkedInIcon sx={{ color: theme.palette.primary.contrastText }} />
                </IconButton>
              </ListItem>
            </List>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 600 }}>
              Institucional
          </Typography>

            <List dense>
              <Item text='Sobre nós' />
              <Item text='Fale conosco' />
              <Item text='Contato' />
            </List>
          </Box>

        </Box>

        {/* Column 2 */}
        <Box>
          <Typography sx={{ fontWeight: 600 }}>
            Loja
          </Typography>

          <List dense>
            <Item text='Marcas' />
            <Item text='Filtros' />
            <Item text='Leite e derivados' />
            <Item text='Queijos' />
            <Item text='Frios' />
            <Item text='Hortifruti' />
            <Item text='Bebidas' />
            <Item text='Doces e Gelérias' />
          </List>
        </Box>

        {/* Column 3 */}
        <Box>
          <Typography sx={{ fontWeight: 600 }}>
            Atendimento
          </Typography>

          <List dense>
            <Item text='Login' />
            <Item text='Cadastre-se' />
            <Item text='Contato' />
            <Item text='Dúvidas frequentes' />
            <Item text='Política de Privacidade' />
          </List>
        </Box>

        {/* Column 4 */}
        <Box>
          <Typography sx={{ fontWeight: 600 }}>
            Pagamento
          </Typography>

          <List dense>
            <ListItem sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex' }}>
                  <img src={mastercardIcon} width='40px' style={{ marginRight: theme.spacing(1) }} />
                  <img src={visaIcon} width='40px' style={{ marginRight: theme.spacing(1) }} />
                  <img src={eloIcon} width='40px' style={{ marginRight: theme.spacing(1) }} />
                  <img src={americanExpressIcon} width='40px' />
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <img src={hipercardIcon} width='40px' style={{ marginRight: theme.spacing(1) }} />
                  <img src={jcbIcon} width='40px' style={{ marginRight: theme.spacing(1) }} />
                  <img src={discoverIcon} width='40px' style={{ marginRight: theme.spacing(1) }} />
                  <img src={dinersIcon} width='40px' />
                </Box>
              </Box>
            </ListItem>

            <ListItem sx={{ display: { xs: 'block', md: 'none' } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex' }}>
                  <img src={mastercardIcon} width='30px' style={{ marginRight: theme.spacing(1) }} />
                  <img src={visaIcon} width='30px' style={{ marginRight: theme.spacing(1) }} />
                  <img src={eloIcon} width='30px' style={{ marginRight: theme.spacing(1) }} />
                  <img src={americanExpressIcon} width='30px' />
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <img src={hipercardIcon} width='30px' style={{ marginRight: theme.spacing(1) }} />
                  <img src={jcbIcon} width='30px' style={{ marginRight: theme.spacing(1) }} />
                  <img src={discoverIcon} width='30px' style={{ marginRight: theme.spacing(1) }} />
                  <img src={dinersIcon} width='30px' />
                </Box>
              </Box>
            </ListItem>
          </List>
        </Box>

      </Box>

      <Box sx={{ backgroundColor: theme.palette.primary.light, py: theme.spacing(1.3) }}>
        <Typography variant='body2' align='center'>
          {`Copyright © ${new Date().getUTCFullYear()} Todos os direitos reservados.`}
        </Typography>
      </Box>

    </Box>

  );
};

export default Footer;