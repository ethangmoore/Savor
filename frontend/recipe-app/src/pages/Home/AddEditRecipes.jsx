import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";

const AddEditRecipes = ({ recipeData, type, getAllRecipes, onClose, showToastMessage }) => {
    const [title, setTitle] = useState(recipeData?.title ||"");
    const [servings, setServings] = useState(recipeData?.servings ||"");
    const [cuisine, setCuisine] = useState(recipeData?.cuisine ||"");
    const [cookTime, setCookTime] = useState(recipeData?.cookTime ||"");
    const [description, setDescription] = useState(recipeData?.description ||"");
    const [ingredients, setIngredients] = useState(recipeData?.ingredients ||"");
    const [directions, setDirections] = useState(recipeData?.directions ||"");
    const [tags, setTags] = useState(recipeData?.tags || []);

    const [error, setError] = useState(null);

    //Add Recipe
    const addNewRecipe = async () => {
        try {
            const responce = await axoisinstance.post("/add-recipe", {
                title,
                servings,
                cuisine,
                cookTime,
                description,
                ingredients,
                directions,
            });

            if (response.data && responce.date.note) {
                showToastMessage("Recipe Added Successfully")
                getAllRecipes();
                onClose();
            }
        } catch (error) {
            if (
                error.response && error.response.data && error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        }
    };

    //Edit Recipe
    const editRecipe = async () => {
        const recipeId = recipeData._id
        try {
            const responce = await axoisinstance.post("/edit-recipe/" + noteId, {
                title,
                servings,
                cuisine,
                cookTime,
                description,
                ingredients,
                directions,
            });

            if (response.data && responce.date.note) {
                showToastMessage("Recipe Updated Successfully")
                getAllRecipes()
                onClose()
            }
        } catch (error) {
            if (
                error.response && error.response.data && error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        }
    };

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
                {type === 'edit' ? 'UPDATE' : 'ADD'}
            </button>
        </div>
    );
};

export default AddEditRecipes;