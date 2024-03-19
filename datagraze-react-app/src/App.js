import React, { useEffect, useState } from "react"
import './App.css'

function radioButton(field, isChecked) {
  return <div>
    <input type="radio" id={field} name="field" value={field} checked={isChecked}/>
    <label for={field}>{field}</label>
  </div>
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [opensearchResults, setOpensearchResults] = useState()
  const [documentResult, setDocumentResult] = useState()
  const [searchField, setSearchField] = useState("title")
  const [isChecked, setIsChecked] = useState("checked")

  useEffect(() => {
  }, [])

  function getOpenSearchDocs(searchTerm) {
    let opensearchUrl = `https://5pgwaiwj32.execute-api.us-east-1.amazonaws.com/spike/opensearch?searchstring=${searchTerm}&${searchField !== "all" ? `fields=${searchField}` : "fields=title&fields=description&fields=content&fields=keywords"}`
    fetch(opensearchUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        'Access-Control-Request-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
      },
    })
      .then(resp => resp.json())
      .then(json => { setOpensearchResults([...json]) })
  }
  function getDocdb(id) {
    let docdbUrl = `https://5pgwaiwj32.execute-api.us-east-1.amazonaws.com/spike/docdb/${id}`
    fetch(docdbUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        'Access-Control-Request-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
      }
    })
      .then(resp => resp.json())
      .then(json => setDocumentResult(json))
  }

  return (
    <>
      <h1>Datagraze</h1>
      <input class="input-align" type="text" value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value) }} />
      <button onClick={() => getOpenSearchDocs(searchTerm)}>search</button>
      <form class="align" onChange={event => {setSearchField(event.target.value)}}>
        <fieldset>
          <legend>Select a search field</legend>
          {radioButton("title", isChecked)}
          {radioButton("description")}
          {radioButton("content")}
          {radioButton("keywords")}
          {radioButton("all")}
        </fieldset>
      </form>
      <p>{opensearchResults !== undefined ? `${opensearchResults.length} results found` : ""}</p>
      <hr />
      {/* doc db section */}
      {documentResult === undefined
        ? null
        : <div>
          <h1> </h1>
          <button onClick={() => setDocumentResult(undefined)}>close</button>
          {documentResult.language === "en"
            ? null
            : <div>
              <h3>{documentResult.translations.libretranslate.title}</h3>
              {documentResult.translations.libretranslate.description != null ? <p>Description: {documentResult.translations.libretranslate.description}</p> : null}
              {documentResult.translations.libretranslate.content != null ? <p>Content: {documentResult.translations.libretranslate.content}</p> : null}
              {documentResult.translations.libretranslate.keywords !== null ? <p>Keywords: {documentResult.translations.libretranslate.keywords.join(", ")}</p> : null}
              <hr />
            </div>
          }
          <div>
            <h3>{documentResult.title}</h3>
            <p>Original Language: {documentResult.language}</p>
            <p>Publish date: {documentResult.pubDate}</p>
            {documentResult.description != null ? <p>Description: {documentResult.description}</p> : null}
            {documentResult.content != null ? <p>Content: {documentResult.content}</p> : null}
            {documentResult.keywords != null ? <p>Keywords: {documentResult.keywords.join(", ")}</p> : null}
            <p>Source ID: {documentResult.source_id}</p>
            <p>Link: <a href={documentResult.link} target="_blank">{documentResult.link}</a></p>
          </div>
        </div>
      }
      {/* opensearch secction */}
      {(opensearchResults === undefined || documentResult !== undefined)
        ? null
        : <div>
          {opensearchResults.map((doc, index) => {
            return (
              <div key={doc._id}>
                <button style={{fontSize: "1.2em"}} onClick={(event) => getDocdb(doc._id)}>{index+1}: {doc._source.title}</button>
                {doc._source.description != null ? <p>Description: {doc._source.description}</p> : null}
                {doc._source.keywords != null ? <p>Keywords: {doc._source.keywords.join(", ")}</p> : null}
                <hr />
              </div>
            )
          })}
        </div>
      }
    </>
  )
}

