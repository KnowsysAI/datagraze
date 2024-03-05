import React, { useEffect, useState } from "react"

export default function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [opensearchResults, setOpensearchResults] = useState()
  const [documentResult, setDocumentResult] = useState()

  useEffect(() => {
  }, [])

  function getOpenSearchDocs(searchTerm) {
    console.log("opensearch function ran")
    let opensearchUrl = `https://5pgwaiwj32.execute-api.us-east-1.amazonaws.com/spike/opensearch?q=${searchTerm}`;
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
      <h1>hello world!</h1>
      <input type="text" value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value) }} />
      <button onClick={() => getOpenSearchDocs(searchTerm)}>search</button>
      {documentResult === undefined
        ? null
        : <div>
          <h1> </h1>
          <button onClick={() => setDocumentResult(undefined)}>close</button>
          {documentResult.language === "en"
            ? null
            : <div>
              <h3>{documentResult.translations.libretranslate.title}</h3>
              <p>Description: {documentResult.translations.libretranslate.description}</p>
              <p>Content: {documentResult.translations.libretranslate.content}</p>
              <p>Keywords: {documentResult.translations.libretranslate.keywords !== null ? documentResult.translations.libretranslate.keywords.join(", ") : "none"}</p>
            </div>
          }
          <div>
            <h5>{documentResult.title}</h5>
            <p>Language: {documentResult.language}</p>
            <p>Publish date: {documentResult.pubDate}</p>
            <p>Description: {documentResult.description}</p>
            <p>Content: {documentResult.content}</p>
            <p>Keywords: {documentResult.keywords !== null ? documentResult.keywords.join(", ") : "none"}</p>
            <p>Source id: {documentResult.source_id}</p>
            <p>Link: {documentResult.link}</p>
          </div>
        </div>
      }
      {opensearchResults === undefined
        ? null
        : <div>
          {opensearchResults.map(doc => {
            return (
              <div key={doc._id}>
                <button onClick={(event) => {getDocdb(doc._id); window.scrollTo(0, 0)}}>{doc._source.title}</button>
                <p>description: {doc._source.description}</p>
                <p>original lan: {doc._source.language}</p>
                <p>publish date: {doc._source.pubDate}</p>
                <p>keywords: {doc._source.keywords != null ? doc._source.keywords.join(", ") : ""}</p>
              </div>
            )
          })}
        </div>
      }
    </>
  )
}