import "./App.scss";
import { Route, Switch } from "react-router-dom";

import AppLayout from "./components/layout/layout";
import React from "react";
import ProtectedRoute from "./components/protectedRoute";
import { Loading } from "./components/loading/loading";
import { CONSTANTS } from "./constants";
const Home = React.lazy(() => import("./pages/home/home"));
const Dashboard = React.lazy(() => import("./pages/dashboard/dashboard"));

const FormResponsePage = React.lazy(() =>
  import("./pages/formResponsePage/formResponsePage")
);
const FormSpamPage = React.lazy(() =>
  import("./pages/formSpamPage/formSpamPage")
);
const FormIntegrationPage = React.lazy(() =>
  import("./pages/formIntegrationPage/formIntegrationPage")
);
const FormEditPage = React.lazy(() =>
  import("./pages/formEditPage/formEditPage")
);

const FormSurveyBuilder = React.lazy(() =>
  import("./pages/formSurveyBuilderPage/formSurveyBuilderPage")
);
const Docs = React.lazy(() => import("./pages/docs/docs"));
const Documentation = React.lazy(() =>
  import("./pages/documentation/documentation")
);
const Error404 = React.lazy(() => import("./pages/404/404"));
const AccessDenied = React.lazy(() =>
  import("./pages/accessDenied/accessDenied")
);

function App() {
  return (
    <div className="App">
      <AppLayout>
        <React.Suspense fallback={<Loading />}>
          <Switch>
            {/* <Route path="/docs" component={Docs} />  */}
            <Route path="/docs" component={Documentation} />

            <ProtectedRoute
              exact
              path={CONSTANTS.ROUTES.DASHBOARD.skeleton}
              successComponent={Dashboard}
              fallbackComponent={Home}
              loadingComponent={Home}
            />

            <ProtectedRoute
              exact
              path={CONSTANTS.ROUTES.FORM_RESPONSE.skeleton}
              successComponent={FormResponsePage}
              fallbackComponent={AccessDenied}
              loadingComponent={Loading}
            />
            <ProtectedRoute
              exact
              path={CONSTANTS.ROUTES.FORM_SPAM.skeleton}
              successComponent={FormSpamPage}
              fallbackComponent={AccessDenied}
              loadingComponent={Loading}
            />
            <ProtectedRoute
              exact
              path={CONSTANTS.ROUTES.FORM_INTEGRATION.skeleton}
              successComponent={FormIntegrationPage}
              fallbackComponent={AccessDenied}
              loadingComponent={Loading}
            />
            <ProtectedRoute
              exact
              path={CONSTANTS.ROUTES.FORM_EDIT.skeleton}
              successComponent={FormEditPage}
              fallbackComponent={AccessDenied}
              loadingComponent={Loading}
            />
            <ProtectedRoute
              exact
              path={CONSTANTS.ROUTES.SURVEY_BUILDER.skeleton}
              successComponent={FormSurveyBuilder}
              fallbackComponent={Home}
              loadingComponent={Home}
            />

            <Route path="*" component={Error404} />
          </Switch>
        </React.Suspense>
      </AppLayout>
    </div>
  );
}

export default App;
