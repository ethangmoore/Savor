import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import RecipeCard from '../../components/Cards/RecipeCard';
import { MdAdd } from "react-icons/md";
import AddEditRecipes from './AddEditRecipes';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'; // Adjust the path as necessary
import Toast from '../../components/Toast'; // Adjust the path as necessary

const Home = () => {
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

    const [allRecipes, setAllRecipes] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

    const handleEdit = (recipeDetails) => {
        setOpenAddEditModal({ isShown: true, data: recipeDetails, type: "edit" });
    };

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown: true,
            message,
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
            const response = await axiosInstance.get("/get-all-recipes");
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
                showToastMessage("Recipe Deleted Successfully", 'delete');
                getAllRecipes();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.log("An unexpected error has occurred. Please try again.");
            }
        }
    };

    useEffect(() => {
        getAllRecipes();
        getUserInfo();
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} />

            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {allRecipes.map((item) => (
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
                            isPinned={true}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteRecipe(item)}
                            onPinNote={() => { }}
                        />
                    ))}
                </div>
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
                onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: "add", data: null });
                }}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                }}
                contentLabel=""
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
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
        </>
    );
};

export default Home;
