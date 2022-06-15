import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetPokemonQuery } from "src/redux/services/pokemons";
import { Carousel } from "react-responsive-carousel";

const PokemonInfo = ({ name }: { name: string | null }) => {
  const { data, isLoading } = useGetPokemonQuery(name);

  const images = data?.sprites
    ? Object.values(data.sprites).filter((img) => img !== null)
    : [];

    const filterdImages = images.filter((x) => x != null) as string[];

  return isLoading && !data ? (
    <Box display="flex" justifyContent="center" p={4}>
      <CircularProgress
        color="secondary"
        sx={{ width: "80px !important", height: "80px !important" }}
      />
    </Box>
  ) : (
    <>
      {data?.sprites && (
        <Carousel showStatus={false}>
          {filterdImages.slice(0, 3).map((image) => (
            <img
              style={{ maxWidth: 350 }}
              key={image}
              src={image}
              alt="img"
              className="answer-img"
            />
          ))}
        </Carousel>
      )}
      <Typography variant="h6" sx={{ m: 2 }}>
        <b>Abilities:</b>{" "}
        {data?.abilities &&
          data.abilities.map((ab) => ab.ability.name).join(", ")}
      </Typography>
      <Typography variant="h6" sx={{ m: 2 }}>
        <b>Height:</b> {data?.height}
      </Typography>
      <Typography variant="h6" sx={{ m: 2 }}>
        <b>Weight:</b> {data?.weight}
      </Typography>
    </>
  );
};

export default PokemonInfo;
