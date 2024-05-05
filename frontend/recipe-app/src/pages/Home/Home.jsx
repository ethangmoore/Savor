import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import RecipeCard from '../../components/Cards/RecipeCard'
import { MdAdd } from "react-icon/md";
import AddEditRecipes from './AddEditRecipes';

const Home = () => {
    return (
        <>
        <Navbar />
        
        <div className="container mx-auto">
            <div className="grid grid-cols-3 gap-4 mt-8">
            <NoteCard 
            title="Meeting on 7th April" 
            date="3rd Apr 2024" 
            servings="Meeting on 7th April Meeting on 7th April" 
            cuisineType="American"
            cookTime="90 years maybe"
            description="best meal on earth"
            ingredients="frog legs"
            directions="dont burn yourself"
            tags="Meeting"
            isPinned={true}
            onEdit={()=>{}}
            onDelete={()=>{}}
            onPinNote={()=>{}}
            />
            </div>
            </div>

            <button className="w-16 h-16 flex items-center justify-center rounded-2x1 bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {}}>
                <MdAdd classname="text-[32px] text-white" />
                </button>

               <AddEditNotes />
            </>
    );
};

export default Home;