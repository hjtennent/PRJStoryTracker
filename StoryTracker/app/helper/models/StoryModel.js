const getStoryObject = (id, url, title, story, authors, date, keywords) => {
  return {
    id,
    url,
    title,
    story,
    authors,
    date,
    keywords
  }
}
export {
  getStoryObject
}