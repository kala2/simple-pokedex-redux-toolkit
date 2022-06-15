import { lazy, Suspense } from "react";
import { Route, Switch, Router } from "react-router-dom";
import { PATH } from "src/constants/paths";
import { history } from "src/redux/store";
import Loading from "src/UI/Loading";
const Pokemons = lazy(() => import('src/features/Pokemons/pokemons'));

export default function Routes() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path={PATH.POKEMONS}  component={() => (
          <Suspense fallback={<Loading />}>
            <Pokemons />
          </Suspense>
        )} />
        </Switch>
      </Router>
    </>
  );
}
