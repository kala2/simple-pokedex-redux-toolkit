import {
  Box,
  CircularProgress,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPokemonsQuery } from "src/redux/services/pokemons";
import PokemonsTable from "./components/PokemonsTable";
import { selectPokemon, setCurrentPokemon } from "./state/pokemonsSlice";
import { useStyles } from "./styles/styles";
import Dialog from "@mui/material/Dialog";
import PokemonInfo from "./components/PokemonInfo";

const Pokemons = () => {
  const { isLoading } = useGetPokemonsQuery();
  const pokemon = useSelector(selectPokemon);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setCurrentPokemon(null));
  };
  const classes = useStyles();

  return (
    <Box className={classes.wrapper} p={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pb={2}
      >
        <Typography variant="h5">Pokemons</Typography>
      </Box>
      {isLoading ? (
        <Box>
          <CircularProgress
            color="secondary"
            sx={{ width: "80px !important", height: "80px !important" }}
          />
        </Box>
      ) : (
        <PokemonsTable handleClickOpen={handleClickOpen} />
      )}
      <Dialog
        fullWidth
        classes={{ paper: classes.dialog }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ pb: 0 }}>{pokemon?.name}</DialogTitle>
        {pokemon?.name && <PokemonInfo name={pokemon.name} />}
      </Dialog>
    </Box>
  );
};

export default Pokemons;
