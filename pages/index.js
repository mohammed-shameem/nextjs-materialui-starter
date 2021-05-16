import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Layout from '../components/layout';
import { useUser } from '../lib/hooks';
import WithAuth from '../lib/with-auth';

const Index = () => {
  const user = useUser();
  return (
    <Layout>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
        facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
        gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
        donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
        Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
        imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
        arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
        donec massa sapien faucibus et molestie ac.
      </Typography>
    </Layout>
  );
};

export const getServerSideProps = WithAuth(async (context) => {
  return {
    props: {}, // will be passed to the page component as props
  }
});

export default Index;