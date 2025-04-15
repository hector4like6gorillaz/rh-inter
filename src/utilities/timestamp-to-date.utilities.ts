import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function formatTimestamp(timestamp: Date) {
  return format(new Date(timestamp), "dd'/'MMMM'/'yyyy", { locale: es })
}
