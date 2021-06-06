import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRecipesByCategory } from '../actions/recipeActions';
import { Recipe } from '../components/Recipe';
import { Recipe as RecipeModal } from './Recipe'

export function Brunch() {
    const filterRecipes = useSelector(state => state.filterRecipes);
    const { recipes } = filterRecipes;

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose= () => setShow(false);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listRecipesByCategory("brunch"))
    }, [dispatch]);

    const cardEvents = card => {
        console.log(card);
        handleShow()
    }

    return (
        <div className="homeScreen">
            <div className="filter-wrapper">
                <p className="filter-text">Brunch</p>
                <hr className="hr-filter" />
            </div>
            <div className="home">
                {recipes.map(recipe => (
                    <>
                        <div>
                            <Recipe
                                key={recipe._id}
                                recipe={recipe}
                                cardEvents={cardEvents}
                            />
                            {show ?
                                <RecipeModal
                                    show={show}
                                    onHide={handleClose}
                                    recipe={recipe}
                                />
                                : null}
                        </div>
                    </>
                ))}
            </div>
            <div className="overlay"></div>
        </div>
    )
}
