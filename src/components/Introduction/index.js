import React from 'react';
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Link
} from '@material-ui/core';
import Logo from '../../static/sunlab.png';
import './index.scss';

function Introduction(props) {
  const title = 'Protein Visualizer';

  const redirect = () => {
    window.location.href = 'http://www.sfu.ca/chemistry/groups/bingyun_sun/';
  };

  return (
    <div>
      <Card className="introduction--wrapper">
        <CardActionArea>
          <CardMedia
            component="img"
            alt="lab logo"
            // height="140"
            image={Logo}
            className="introduction--logo"
            onClick={redirect}
          />
        </CardActionArea>
        <CardContent className="introduction--body">
          <Typography variant="h5" className="introduction--title">
            Protein Visualizer 1.0
          </Typography>
          <Typography variant="body1">
            This web application was built to visualize protein topology, glycosylation
            bonds and disulfide bonds to illustrate patterns in their arrangement.
          </Typography>
          <ul className="introduction--ul">
            <li className="introduction--bullet">
              <Typography variant="body2" display="inline">
                Select a protein to visualize from the drop down menu located
                above this card. There are several example proteins for
                selection.{' '}
              </Typography>
            </li>
            <li className="introduction--bullet">
              <Typography variant="body2" display="inline">
                If the current scale of the visualization is not sufficient to
                identify patterns, on the top right of the app bar is a sliding
                scale to horizontally expand the protein.
              </Typography>
            </li>
            <li className="introduction--bullet">
              <Typography variant="body2" display="inline">
                In addition to scaling, there is also a window feature that
                allows users to target a specific region for visualization. This
                is particularily useful when scaling alone is not sufficient to
                seperate patterns. The window feature is located below the
                original visualization.
              </Typography>
            </li>
          </ul>
          <Typography variant="body1">
            Latest Version: 
            <br/>
              <Link href='https://mdesai31.github.io/Protein-Visualizer-2.0/'>
                Protein Visualizer 2.0
              </Link>
          </Typography>
          <br/>
          <Typography variant="body1">
          Please cite following publication when using the visualizer:
          </Typography>
          <ul className="introduction--ul">
            <li className="introduction--bullet">
              <Typography variant="body2" display="inline">
                <Link href='https://doi.org/10.3390/ijms242216182'>
                Discovery and Visualization of the Hidden Relationships among N-Glycosylation, Disulfide Bonds, and Membrane Topology.
                </Link>
                <br/>
                International Journal of Molecular Sciences. 2023; 24(22):16182.
              </Typography>
            </li>
          </ul>
          <Typography variant="body1">
          For further information, contact Dr. Bingyun Sun: bingyun_sun@sfu.ca
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Introduction;
