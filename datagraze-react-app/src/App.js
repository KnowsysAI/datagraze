import React, { useEffect, useState } from "react"

export default function App() {
    // const [searchTerm, setSearchTerm] = ""
    // const [opensearchResults, setOpensearchResults] = []
    // const [documentResult, setDocumentResults] = {}

    useEffect(() =>{
        let url = 'https://5pgwaiwj32.execute-api.us-east-1.amazonaws.com/spike/opensearch';

        fetch(url, {
          method: "GET",
          headers: {"Content-type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": '*'}
        })
          .then(resp => resp.json())
          .then(json => console.log(json))
        })
  return (
    <>
        <h1>hello world!</h1>
    </>
  )
}