import React from "react"
import { Grid, Grow } from "@material-ui/core"
import useStyles from "./NewsCardStyles"
import Banner from "./Banner"

const NewsCard = ({ articles, activeArticles }) => {
  const classes = useStyles()
  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems='stretched'
        spacing={3}
      >
        {articles.map((article, i) => (
          <Grid
            key={i}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{ display: "flex" }}
          >
            <Banner article={article} activeArticles={activeArticles} i={i} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  )
}

export default NewsCard
