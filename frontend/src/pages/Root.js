import { Outlet, useNavigation } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { getAuthToken } from "../util/auth";

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

export function loader() {
  return getAuthToken();
}
