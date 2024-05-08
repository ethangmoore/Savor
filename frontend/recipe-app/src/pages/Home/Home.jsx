import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import RecipeCard from '../../components/Cards/RecipeCard'
import { MdAdd } from "react-icons/md";
import AddEditRecipes from './AddEditRecipes';
import Modal from "react-modal";

const Home = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState ({
        isShown: false,
        type: "add",
        data: null
    })

    return (
        <>
            <Navbar />

            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <RecipeCard
                        title="Best Recipe Ever"
                        date="3rd Apr 2024"
                        servings="4000"
                        cuisineType="American"
                        cookTime="90 years maybe"
                        description="best meal on earth"
                        ingredients="frog legs"
                        directions="dont burn yourself"
                        tags="froggy"
                        isPinned={true}
                        onEdit={() => { }}
                        onDelete={() => { }}
                        onPinNote={() => { }}
                    />
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