export const shapeGameTitle: (text: string) => string = (title: string) => {
  if (!title) return ''

  return title
    .replace(/\™/g, '')
    .replace(/\©/g, '')
    .replace(/\®/g, '')
    .replace(/\’/g, '')
    .replace(/\'/g, '')
    .replace(/\:/g, '')
    .replace(/\./g, '')
    .replace(/\é/g, 'e')
    .replace(/11/g, '') // needed for mortal kombat 11 --- not sure why it wasn't matching
    .toLowerCase()
    .trim()
}

export const capitalize: (text: string) => string = text => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
