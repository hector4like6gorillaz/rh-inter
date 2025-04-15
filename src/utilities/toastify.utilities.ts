import { toast } from 'react-toastify'

const notify = (message: string) => toast.success(message)
const notifyError = (message: string) => toast.error(message)
const notifyWarning = (message: string) => toast.warning(message)

export { notify, notifyError, notifyWarning }
