import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditRecipes = ({
  recipeData,
  type,
  getAllRecipes,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(recipeData ? recipeData.title : '');
  const [servings, setServings] = useState(recipeData ? recipeData.servings : '');
  const [cuisineType, setCuisineType] = useState(recipeData ? recipeData.cuisineType : '');
  const [cookTime, setCookTime] = useState(recipeData ? recipeData.cookTime : '');
  const [description, setDescription] = useState(recipeData ? recipeData.description : '');
  const [ingredients, setIngredients] = useState(recipeData ? recipeData.ingredients : '');
  const [directions, setDirections] = useState(recipeData ? recipeData.directions : '');
  const [tags, setTags] = useState(recipeData ? recipeData.tags : '');

  const [error, setError] = useState(null);

  // Add Recipe
  const addNewRecipe = async () => {
    try {
      const response = await axiosInstance.post("/add-recipe", {
        title,
        servings,
        cuisineType,
        cookTime,
        description,
        ingredients,
        directions,
        tags,
      });

      if (response.data && response.data.recipe) {
        showToastMessage("Recipe Added Successfully");
        getAllRecipes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Edit Recipe
  const editRecipe = async () => {

    // Prepare the payload with only the changed fields
    const updatedFields = {};
    if (title !== recipeData.title) updatedFields.title = title;
    if (servings !== recipeData.servings) updatedFields.servings = servings;
    if (cuisineType !== recipeData.cuisineType) updatedFields.cuisineType = cuisineType;
    if (cookTime !== recipeData.cookTime) updatedFields.cookTime = cookTime;
    if (description !== recipeData.description) updatedFields.description = description;
    if (ingredients !== recipeData.ingredients) updatedFields.ingredients = ingredients;
    if (directions !== recipeData.directions) updatedFields.directions = directions;
    if (tags !== recipeData.tags) updatedFields.tags = tags;

    // Check if there are any changes
    if (Object.keys(updatedFields).length === 0) {
      setError('No changes provided');
      return;
    }

    const recipeId = recipeData._id;

    try {
      const response = await axiosInstance.put("/edit-recipe/" + recipeId, updatedFields);

      if (response.data && response.data.recipe) {
        showToastMessage("Recipe Updated Successfully", 'update');
        getAllRecipes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleAddRecipe = () => {

    if (!title) {
      setError("Please enter a title");
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

    if (type === 'edit') {
      editRecipe()
    } else {
      addNewRecipe()
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2 pb-2">
        <label className="input-label text-2xl">TITLE<span className="text-red-500 ml-1">*</span></label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder=""
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 pb-2">
        <label className="input-label">SERVINGS</label>
        <input
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder=""
          value={servings}
          onChange={({ target }) => setServings(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 pb-2">
        <label className="input-label">CUISINE TYPE</label>
        <input
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder=""
          value={cuisineType}
          onChange={({ target }) => setCuisineType(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 pb-2">
        <label className="input-label">COOK TIME</label>
        <input
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder=""
          value={cookTime}
          onChange={({ target }) => setCookTime(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 pb-2">
        <label className="input-label">DESCRIPTION</label>
        <input
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder=""
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 pb-2">
        <label className="input-label">INGREDIENTS<span className="text-red-500 ml-1">*</span></label>
        <input
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder=""
          value={ingredients}
          onChange={({ target }) => setIngredients(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="input-label">DIRECTIONS<span className="text-red-500 ml-1">*</span></label>
        <input
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder=""
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
        type="button"
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddRecipe}
      >
        {type === 'edit' ? 'Update' : 'Add'}
      </button>
    </div>
  );
};

export default AddEditRecipes;
