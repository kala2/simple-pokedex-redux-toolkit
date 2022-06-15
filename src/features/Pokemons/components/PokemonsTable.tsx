import { Box, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPagedPokemonsMutation } from "src/redux/services/pokemons";
import {
  selectPokemons,
  selectState,
  setCurrentPokemon,
} from "../state/pokemonsSlice";
import { Pokemon } from "../types/Pokemon";
import { PokemonsState } from "../types/PokemonsState";

const PokemonsTable = ({
  handleClickOpen,
}: {
  handleClickOpen: () => void;
}) => {
  const [getPagedPokemons] = useGetPagedPokemonsMutation();
  const dispatch = useDispatch();
  const pokemons: Pokemon[] = useSelector(selectPokemons);

  const pageInfo: PokemonsState = useSelector(selectState);
  const [page, setPage] = useState(0);

  const ToolTipRenderer = ({ value }: { value: string }) =>
    value ? (
      <Tooltip title={value}>
        <Box
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {value}
        </Box>
      </Tooltip>
    ) : (
      <></>
    );

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "name",
      renderCell: ({ value }) => <ToolTipRenderer value={value} />,
    },
  ];

  return (
    <>
      <DataGrid
        getRowId={(row: Pokemon) => row.name}
        rowsPerPageOptions={[0]}
        rows={pokemons}
        columns={columns}
        disableSelectionOnClick
        onRowClick={(e) => {
          handleClickOpen();
          dispatch(setCurrentPokemon(e.row));
        }}
        pagination
        paginationMode="server"
        onPageChange={async (newPage) => {
          setPage(newPage);
          await getPagedPokemons(
            page < newPage ? pageInfo.next : pageInfo.previous
          ).unwrap();
        }}
        sx={{
          height: "85vh",
          "& .MuiDataGrid-row": { cursor: "pointer" },
          borderRadius: "20px",
          border: "1px solid rgba(224, 224, 224, 1)",
          background: "#fff",
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        }}
        rowCount={pageInfo.count}
      />
    </>
  );
};

export default PokemonsTable;
