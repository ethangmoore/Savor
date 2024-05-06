import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";

const AddEditRecipes = ({ recipeData, type, onClose }) => {

    const [title, setTitle] = useState("");
    const [servings, setServings] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [directions, setDirections] = useState("");
    const [tags, setTags] = useState([]);

    const [error, setError] = useState(null);

    //Add Recipe
    const addNewRecipe = async () => {};

    //Edit Recipe
    const editRecipe = async () => {};

    const handleAddRecipe = () => {
        if (!title) {
            setError("Please enter a title");
            return;
        }

        if (!servings) {
            setError("Please enter servings amount");
            return;
        }

        if (!cuisine) {
            setError("Please enter cuisine type");
            return;
        }

        if (!cookTime) {
            setError("Please enter cook time");
            return;
        }

        if (!description) {
            setError("Please enter a description");
            return;
        }

        if (!ingredients) {
            setError("Please enter ingredients");
            return;
        }

        if (!directions) {
            setError("Please enter directions");
            return;
        }

        setError("");

        if(type === "edit"){
            editRecipe()
        }else{
            addNewRecipe()
        }
    }

    return (
        <div className="relative">
            <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50" onClick={onClose}>
                <MdClose className="text-xl text-slate-400"/>
            </button>

            <div className="flex flex-col gap-2">
                <label className="input-label">TITLE</label>
                <input 
                    type="text"
                    className="text-2xl text-slate-950 outline-none"
                    placeholder="Type title here..."
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>


            <div className="flex flex-col gap-2">
                <label className="input-label">SERVINGS</label>
                <input 
                    type="text"
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Type servings here..."
                    value={servings}
                    onChange={({ target }) => setServings(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="input-label">CUISINE</label>
                <input 
                    type="text"
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Type cuisine type here..."
                    value={cuisine}
                    onChange={({ target }) => setCuisine(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="input-label">COOK TIME</label>
                <input 
                    type="text"
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Type cook time here..."
                    value={cookTime}
                    onChange={({ target }) => setCookTime(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="input-label">DESCRIPTION</label>
                <input 
                    type="text"
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Type description here..."
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="input-label">INGREDIENTS</label>
                <input 
                    type="text"
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Type ingredients here..."
                    value={ingredients}
                    onChange={({ target }) => setIngredients(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="input-label">DIRECTIONS</label>
                <input 
                    type="text"
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Type directions here..."
                    value={directions}
                    onChange={({ target }) => setDirections(target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="input-label">TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

            <button 
                className="btn-primary font-medium mt-5 p-3"
                onClick={handleAddRecipe}
            >
                ADD
            </button>
        </div>
    )
}