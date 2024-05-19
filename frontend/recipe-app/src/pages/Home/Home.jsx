import React, { useEffect,  useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import RecipeCard from '../../components/Cards/RecipeCard'
import { MdAdd } from "react-icons/md";
import AddEditRecipes from './AddEditRecipes';
import Modal from "react-modal";
import { useNavigate } from "react-router-dom"; 
import moment from "moment";
import  axiosInstance  from "../../utils/axiosInstance";

const Home = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState ({
        isShown: false,
        type: "add",
        data: null
    })

    const [allRecipes, setAllRecipes] = useState([])

    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

    // Get User Info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user){
                setUserInfo(response.data.user);
            } 
        } catch (error){
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    // All Recipes API

    const getAllRecipes = async () => {
        try{
            const response = await axiosInstance.get("/get-all-recipes");

            if (response.data && response.data.recipes) {
                setAllRecipes(response.data.recipes);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again");

        }
    };

    useEffect( () => {
        getAllRecipes();
        getUserInfo();
        return () => {};
    },  []);


    return (
        <>
            <Navbar userInfo={userInfo} />

            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {allRecipes.map((item, index)=>(
                    <RecipeCard
                    key={item._id}
                        title={item.title}
                        date={item.createdOn}
                        servings={item.servings}
                        cuisineType="American"
                        cookTime="90 years maybe"
                        description="best meal on earth"
                        ingredients="frog legs"
                        directions="dont burn yourself"
                        tags={item.tags}
                        isPinned={item.isPinned}
                        onEdit={() => { }}
                        onDelete={() => { }}
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
                />
            </Modal>
        </>
    );
};

export default Home;