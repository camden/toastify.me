import React from "react"
import { Link } from "gatsby"

const ProjectCard = ({ title, image, href }) => {
  return (
    <div className="portfolio-card">
      <Link to={href}>
        <img className="portfolio-card--image" src={image} />
      </Link>
      <div className="portfolio-card--title">{title}</div>
    </div>
  )
}

export default ProjectCard