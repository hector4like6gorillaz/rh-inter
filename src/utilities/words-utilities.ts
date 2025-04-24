const capitalFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
const normalizeText = (text: string): string => {
  if (text !== undefined && text !== null)
    return text
      .toLowerCase()
      .normalize('NFD') // descompone letras con acento
      .replace(/[\u0300-\u036f]/g, '') // remueve los acentos

  return ''
}
export { capitalFirstLetter, normalizeText }
