import React, { useState, useEffect } from "react"
import alanBtn from "@alan-ai/alan-sdk-web"
import NewsCard from "./components/NewsCard"
import wordsToNumbers from "words-to-numbers"

const alanKey =
  "d0ff37001e56f962a106b59d97aeee6d2e956eca572e1d8b807a3e2338fdd0dc/stage"

export const App = () => {
  const [newArticles, setnewArticles] = useState([])
  const [activeArticles, setactiveArticles] = useState(-1)
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setnewArticles(articles)
          setactiveArticles(-1)
        } else if (command === "highlight") {
          setactiveArticles((prevactiveArticles) => prevactiveArticles + 1)
        } else if (command === "open") {
          const parseNumber =
            number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number
          const article = articles[parseNumber - 1]

          if (parseNumber > 20) {
            alanBtn().playText("Please try again")
          } else if (article) {
            window.open(article.url, "_blank")
            alanBtn().playText("Opening..")
          }
        }
      },
    })
  }, [])
  return (
    <div>
      <h1>THE AI NEWS WEB</h1>
      <NewsCard articles={newArticles} activeArticles={activeArticles} />
    </div>
  )
}
 
export default App
