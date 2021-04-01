import { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { BREAKPOINT_SIZE } from '../styles/breakpoints'
import { SizeEnum } from '../utils/types'

export const useScreenResize = (
  defaultSize?: SizeEnum
): {
  size: SizeEnum
} => {
  const [size, setSize] = useState<SizeEnum>(defaultSize || SizeEnum.XL)

  const updateSize = debounce((): void => {
    if (window.innerWidth > BREAKPOINT_SIZE.XL) {
      setSize(SizeEnum.XL)
    } else if (window.innerWidth > BREAKPOINT_SIZE.L) {
      setSize(SizeEnum.L)
    } else if (window.innerWidth > BREAKPOINT_SIZE.M) {
      setSize(SizeEnum.M)
    } else {
      setSize(SizeEnum.S)
    }
  }, 250)

  useEffect(() => {
    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  useEffect(() => {
    updateSize()
  }, [])

  return {
    size
  }
}
