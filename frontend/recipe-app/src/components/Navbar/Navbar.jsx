import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Savor from "../../assets/images/Savor.png";
import Donut from "../../assets/images/donut.png";

const Navbar = ({ userInfo, onSearchRecipe, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchRecipe(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-gradient-to-br from-primary to-secondary flex items-center justify-between px-6 py-2 drop-shadow">
      {/* Default image for small devices */}
      <img src={Donut} alt="Donut" className="w-[50px] pr-4 sm:hidden block" />
        
      {/* Image for medium devices and larger */}
      <img src={Savor} alt="Savor" className="w-[12%] pb-6 sm:block hidden" />

      {userInfo && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
            className="sm:"
          />

          <p className="pr-4 sm:hidden block"> </p>

          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </>
      )}
    </div>
  );
};

export default Navbar;
