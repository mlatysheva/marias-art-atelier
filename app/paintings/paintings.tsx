import Grid from "@mui/material/Grid2/Grid2";
import getPaintings from './actions/get-paintings';
import Painting from './painting';

export default async function Paintings() {
    const paintings = await getPaintings();

    return (
      <Grid container spacing={3}>
        {paintings.map((painting) => (
          <Grid key={painting.id} size={{ xs: 12, md: 6, lg: 4 }} >
            <Painting painting={painting}/>
          </Grid>
        ))}
      </Grid>
    )
}