import { useState } from "react";

import Logo from "./Logo";
import Navbar from "./Navbar";
import NavigationLoader from "./NavigationLoader";

const Header = () => {
  const [navbarIndicatorPosition, setNavbarIndicatorPosition] = useState<
    undefined | { left: number; width: number }
  >();

  const resetIndicator = () => {
    setNavbarIndicatorPosition(undefined);
  };

  return (
    <div className="header">
      <NavigationLoader />
      <Logo onClick={resetIndicator} />
      <Navbar
        navbarIndicatorPosition={navbarIndicatorPosition}
        setNavbarIndicatorPosition={setNavbarIndicatorPosition}
      />
    </div>
  );
};

export default Header;
