const capitalFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
export { capitalFirstLetter, normalizeText }
