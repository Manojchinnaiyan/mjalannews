import React, { useState, useEffect, createRef } from "react"
import useStyles from "./BannerStyles"
import classNames from "classnames"
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core"

const Banner = ({ article, i, activeArticles }) => {
  const classes = useStyles()
  const [elRef, setelRef] = useState([])
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50)

  useEffect(() => {
    setelRef((refs) =>
      Array(20)
        .fill()
        .map((_, j) => refs[j] || createRef())
    )
  }, [])

  useEffect(() => {
    if (i === activeArticles && elRef[activeArticles]) {
      scrollToRef(elRef[activeArticles])
    }
  }, [i, activeArticles, elRef])

  return (
    <Card
      ref={elRef[i]}
      className={classNames(
        classes.card,
        activeArticles === i ? classes.activeCard : null
      )}
    >
      <CardActionArea href={article.url} target='_blank'>
        <CardMedia className={classes.media} image={article.urlToImage} />
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary' component='h2'>
            {new Date(article.publishedAt).toDateString()}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='h2'>
            {article.source.name} News
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant='h5'>
          {article.title}
        </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary'>
          Learn More
        </Button>
        <Typography variant='h5' color='textSecondary'>
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  )
}

export default Banner
