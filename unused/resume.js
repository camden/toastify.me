import React from "react"
import { Link, graphql } from "gatsby"

import Helmet from "react-helmet"
import SiteHeader from "components/SiteHeader"
import Layout from "components/Layout"

import "./resume.css"

const ResumePage = ({ data }) => {
  const resume = data.allResumeJson.edges[0].node

  return (
    <Layout>
      <Helmet>
        <title>Résumé</title>
      </Helmet>
      <div className="resume-wrapper">
        <SiteHeader />
        <main className="resume">
          <h2>Education</h2>
          {resume.education.map(school => (
            <section className="school-item">
              <h3>{school.institution}</h3>
              <div className="subtitle">
                <div>{school.college}</div>
                <div>{school.area}</div>
              </div>
              <div>
                <span className="section-title">Activities:</span>
                {school.activities}
              </div>
              <div>
                <span className="section-title">Awards:</span>
                {school.awards}
              </div>
            </section>
          ))}
          <h2>Work</h2>
          {resume.work.map(work => (
            <section className="work-item">
              <h3>{work.company}</h3>
              <div className="subtitle">
                <div>{work.position}</div>
              </div>
              <ul>
                {work.highlights.map(highlight => (
                  <li className="work-highlight-item">{highlight}</li>
                ))}
              </ul>
            </section>
          ))}
          <h2>Skills</h2>
          {resume.skills.map(skillGroup => (
            <section className="skill-item">
              <h3>{skillGroup.type}</h3>
              <ul>
                {skillGroup.list.map(skill => (
                  <li>{skill}</li>
                ))}
              </ul>
            </section>
          ))}
          <h2>Interests</h2>
          {resume.info.interests}
        </main>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allResumeJson {
      edges {
        node {
          info {
            interests
          }
          work {
            company
            position
            startDate
            endDate
            summary
            highlights
          }
          education {
            institution
            college
            area
            subarea
            gpa
            awards
            activities
          }
          skills {
            type
            list
          }
        }
      }
    }
  }
`

export default ResumePage
