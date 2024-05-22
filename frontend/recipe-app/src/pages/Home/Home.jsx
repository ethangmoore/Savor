import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import RecipeCard from "../../components/Cards/RecipeCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditRecipes from "./AddEditRecipes";
import Toast from "../../components/ToastMessage/Toast";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddRecipeImg from "../../assets/images/addRecipe.png";
import NoDataImg from "../../assets/images/noData.png";

const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const handleEdit = (recipeDetails) => {
    setOpenAddEditModal({ isShown: true, data: recipeDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message: message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get All Recipes
  const getAllRecipes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-recipes/");

      if (response.data && response.data.recipes) {
        setAllRecipes(response.data.recipes);
      }
    } catch (error) {
      console.log("An unexpected error has occurred. Please try again.");
    }
  };

  // Delete Recipe
  const deleteRecipe = async (data) => {
    const recipeId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-recipe/" + recipeId);

      if (response.data && !response.data.error) {
        showToastMessage("Recipe Deleted Successfully", "delete");
        getAllRecipes();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // Search for a Recipe
  const onSearchRecipe = async (query) => {
    try {
      const response = await axiosInstance.get("/search-recipes", {
        params: { query },
      });

      if (response.data && response.data.recipes) {
        setIsSearch(true);
        setAllRecipes(response.data.recipes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsPinned = async (recipeData) => {
    const recipeId = recipeData._id;

    try {
      const response = await axiosInstance.put(
        "/update-recipe-pinned/" + recipeId,
        {
          isPinned: !recipeData.isPinned,
        }
      );

      if (response.data && response.data.recipe) {
        showToastMessage("Recipe Updated Successfully", "update");
        getAllRecipes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllRecipes();
  };

  useEffect(() => {
    getAllRecipes();
    getUserInfo();
    return () => {};
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={
        isDarkMode ? "bg-gray-800 min-h-screen" : "bg-white min-h-screen"
      }
    >
      <Navbar
        userInfo={userInfo}
        onSearchRecipe={onSearchRecipe}
        handleClearSearch={handleClearSearch}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div className="container mx-auto">
        {isSearch && (
          <h3 className="text-lg font-medium mt-5">Search Results</h3>
        )}

        {allRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 px-2 sm:px-0">
            {allRecipes.map((item) => {
              return (
                <RecipeCard
                  key={item._id}
                  title={item.title}
                  date={item.createdOn}
                  servings={item.servings}
                  cuisineType={item.cuisineType}
                  cookTime={item.cookTime}
                  description={item.description}
                  ingredients={item.ingredients}
                  directions={item.directions}
                  tags={item.tags}
                  isPinned={item.isPinned}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteRecipe(item)}
                  onPinNote={() => updateIsPinned(item)}
                />
              );
            })}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddRecipeImg}
            message={
              isSearch
                ? `Oops! No recipes found matching your search.`
                : `Create your first recipe! Click the 'Add' button 
                to share your treat with the world. Let's get started!`
            }
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-400 hover:bg-purple-400 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[60%] sm:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditRecipes
          type={openAddEditModal.type}
          recipeData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllRecipes={getAllRecipes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default Home;