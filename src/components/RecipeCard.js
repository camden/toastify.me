import React from "react"

import "./RecipeCard.css"

const RecipeCard = () => {
  return (
    <div className="recipe-card">
      <div className="recipe-card--header">
        <div className="recipe-card--title">Avocado Toast</div>
        <div className="recipe-card--time">🕒 5 min</div>
      </div>
      <div className="recipe-card--ingredients--title">Ingredients</div>
      <section className="recipe-card--ingredients">
        <div className="recipe-card--ingredient--container">
          <div className="recipe-card--ingredient--emoji">🥑</div>
          <div className="recipe-card--ingredient--name">Avocado</div>
        </div>
        <div className="recipe-card--ingredient--container">
          <div className="recipe-card--ingredient--emoji">🍋</div>
          <div className="recipe-card--ingredient--name">Lime</div>
        </div>
        <div className="recipe-card--ingredient--container">
          <div className="recipe-card--ingredient--emoji">🧂</div>
          <div className="recipe-card--ingredient--name">Salt & Pepper</div>
        </div>
        <div className="recipe-card--ingredient--container">
          <div className="recipe-card--ingredient--emoji">🍳</div>
          <div className="recipe-card--ingredient--name">Eggs</div>
        </div>
        <div className="recipe-card--ingredient--container">
          <div className="recipe-card--ingredient--emoji">🍞</div>
          <div className="recipe-card--ingredient--name">Toast</div>
        </div>
      </section>
    </div>
  )
}

export default RecipeCard
