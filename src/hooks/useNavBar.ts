import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCollapseState } from 'src/redux/reducers/generalStates'
import { RootState } from 'src/redux/store'
import { getCollapseState, setCollapseInitState } from 'src/services/localForage/collapse.service'

const useNavBar = () => {
  const { barState } = useSelector((state: RootState) => state.general)

  const dispatch = useDispatch()

  const handleCollapseBar = () => {
    dispatch(setCollapseState(!barState))
  }

  useEffect(() => {
    getCollapseState()
      .then((dat) => {
        if (dat === null) {
          setCollapseInitState()
            .then(() => setCollapseState(false))
            .catch((e) => console.error(e))
        } else dispatch(setCollapseState(dat))
      })
      .catch((e) => console.error(e))
  }, [])

  return {
    //local variables
    barState,
    //local functions
    handleCollapseBar,
  }
}

export default useNavBar
