# datagraze

```
{
  "title": "title-stuff",
  "link": "link-stuff.com",
  "keywords": ["stuff", "more stuff", "even more sruff"],
  "description": "short stuff",
  "content": "either content or move full desc stuff",
  "pubDate": "2021-10-26 09:07:26",
  "image_url": "image-stuff.com",
  "source_id": "sourceStuff",
  "translation": {
    "aws":{
      "title": "stuff",
      "keywords": ["stuff", "more stuff", "even more sruff"],
      "description": "short stuff",
      "content": "either content or move full desc"
    },
    "google":{
      "title": "stuff",
      "keywords": ["stuff", "more stuff", "even more sruff"],
      "description": "short stuff",
      "content": "either content or move full desc"
    }
  }
}
```

Start with smallest dataset.

For each article in dataset, translate data into english via Amazon Translate service.
Store original data + english translations in Document DB...
english_title, english_description, etc.
If Amazon Translate service fails on a given article, (exception or can't translate or whatever), output err data to file


Translate
1. title
2. description
3. content || full_description (if content == null)
4. keywords (if keywords >= 1)

Index ENGLISH data in OpenSearch Service:
1. Business News
2. Latest News
3. Science Technology News
4. World Politcs News

React UI
See https://geshan.com.np/blog/2022/10/react-search-bar/
or https://www.iamtimsmith.com/blog/lets-build-a-search-bar-using-react-hooks
or https://dev.to/vishnusatheesh/exploring-infinite-scroll-techniques-in-react-1bn0

TEXT SEARCH

A.
Enter serch terms in SEARCH TEXT BOX.
Click SEARCH BUTTON =>

B.
Display... 
=> LIST OF RESULTS COUNT
=> LIST OF RESULTS as paginated list or infinate list
Page through LIST OF RESULTS
On a RESULT in LIST OF RESULTS... Click CONTENT BUTTON =>

C.
Display RESULT.content translated into English.


Search OpenSearch Service by:
1. title
2. description
3. keywords

Sort buy:
pubDate ascending

RESULT:
1. title
2. description
3. keywords
4. pubDate
5. source_id
6. Link to view { content || full_description (if content == null) } translated into english
7. image_url
8. link 

Managing Amazon DocumentDB indexes
https://docs.aws.amazon.com/documentdb/latest/developerguide/managing-indexes.html

Load Source Data into Document DB
JSON => Python Script (++ LangDetect) => Document DB (out: ID) => Python Script => Log File

Translate Source Data and update DocumentDB
Document DB QUERY(language != English) OUT: list of ID => forEach(ID) AWS Translate Svc... OUT: translation => Python Script... UPDATE RECORD(ID) => Document DB => Python Script => Log File

Index Data
Document DB => Python Script (if !english => record.translation{"aws":"abcdefg...") => OpenSearch Index => Python Script => Log File
