import { ZeitUIThemesPalette } from '../styles/themes'
import { NormalSizes, ButtonTypes } from '../utils/prop-types'
import { ButtonProps } from './button'
import { addColorAlpha } from '../utils/color'

export interface ButtonColorGroup {
  bg: string
  border: string
  color: string
}

export const getButtonGhostColors = (
  palette: ZeitUIThemesPalette,
  status: ButtonTypes,
): ButtonColorGroup | null => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.background,
      border: palette.foreground,
      color: palette.foreground,
    },
    success: {
      bg: palette.background,
      border: palette.success,
      color: palette.success,
    },
    warning: {
      bg: palette.background,
      border: palette.warning,
      color: palette.warning,
    },
    error: {
      bg: palette.background,
      border: palette.error,
      color: palette.error,
    },
  }

  return colors[status] || null
}

export const getButtonColors = (
  palette: ZeitUIThemesPalette,
  props: ButtonProps,
): ButtonColorGroup => {
  const { status, disabled, ghost } = props
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    default: {
      bg: palette.cWhite0,
      border: palette.cGray2,
      color: palette.cGray6,
    },
    secondary: {
      bg: palette.foreground,
      border: palette.foreground,
      color: palette.background,
    },
    success: {
      bg: palette.success,
      border: palette.success,
      color: '#fff',
    },
    warning: {
      bg: palette.warning,
      border: palette.warning,
      color: '#fff',
    },
    error: {
      bg: palette.error,
      border: palette.error,
      color: '#fff',
    },
    abort: {
      bg: 'transparent',
      border: 'transparent',
      color: palette.accents_5,
    },
  }
  if (disabled)
    return {
      bg: palette.cWhite0,
      border: palette.cGray3,
      color: palette.cGray5,
    }

  /**
   * The '-light' status is the same color as the common status,
   * only hover's color is different.
   * e.g.
   *   Color['success'] === Color['success-light']
   *   Color['warning'] === Color['warning-light']
   */
  const withoutLightType = status.replace('-light', '') as ButtonTypes
  const defaultColor = colors.default as ButtonColorGroup

  if (ghost) return getButtonGhostColors(palette, withoutLightType) || defaultColor
  return colors[withoutLightType] || defaultColor
}

export const getButtonGhostHoverColors = (
  palette: ZeitUIThemesPalette,
  status: ButtonTypes,
): ButtonColorGroup | null => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.foreground,
      border: palette.background,
      color: palette.background,
    },
    success: {
      bg: palette.success,
      border: palette.background,
      color: 'white',
    },
    warning: {
      bg: palette.warning,
      border: palette.background,
      color: 'white',
    },
    error: {
      bg: palette.error,
      border: palette.background,
      color: 'white',
    },
  }
  const withoutLightType = status.replace('-light', '') as ButtonTypes
  return colors[withoutLightType] || null
}

export const getButtonHoverColors = (
  palette: ZeitUIThemesPalette,
  props: ButtonProps,
): ButtonColorGroup => {
  const { status, disabled, loading, shadow, ghost } = props
  const defaultColor = getButtonColors(palette, props)
  const alphaBackground = addColorAlpha(defaultColor.bg, 0.85)
  const colors: {
    [key in ButtonTypes]: Omit<ButtonColorGroup, 'color'> & {
      color?: string
    }
  } = {
    default: {
      bg: palette.cWhite0,
      border: palette.cGray4,
      color: palette.cGray6,
    },
    secondary: {
      bg: palette.background,
      border: palette.foreground,
    },
    success: {
      bg: palette.background,
      border: palette.success,
    },
    warning: {
      bg: palette.background,
      border: palette.warning,
    },
    error: {
      bg: palette.background,
      border: palette.error,
    },
    abort: {
      bg: 'transparent',
      border: 'transparent',
      color: palette.accents_5,
    },
    'secondary-light': {
      ...defaultColor,
      bg: alphaBackground,
    },
    'success-light': {
      ...defaultColor,
      bg: alphaBackground,
    },
    'warning-light': {
      ...defaultColor,
      bg: alphaBackground,
    },
    'error-light': {
      ...defaultColor,
      bg: alphaBackground,
    },
  }
  if (disabled)
    return {
      bg: palette.cWhite0,
      border: palette.cGray3,
      color: palette.cGray5,
    }
  if (loading)
    return {
      ...defaultColor,
      color: 'transparent',
    }
  if (shadow) return defaultColor

  const hoverColor =
    (ghost ? getButtonGhostHoverColors(palette, status) : colors[status]) || colors.default
  return {
    ...hoverColor,
    color: hoverColor.color || hoverColor.border,
  }
}

export const getButtonActiveColors = (
  palette: ZeitUIThemesPalette,
  props: ButtonProps,
): ButtonColorGroup => {
  const { status, disabled, loading, shadow, ghost } = props
  const defaultColor = getButtonColors(palette, props)
  const alphaBackground = addColorAlpha(defaultColor.bg, 0.85)
  const colors: {
    [key in ButtonTypes]: Omit<ButtonColorGroup, 'color'> & {
      color?: string
    }
  } = {
    default: {
      bg: palette.cWhite0,
      border: palette.cGray5,
      color: palette.cGray6,
    },
    secondary: {
      bg: palette.background,
      border: palette.foreground,
    },
    success: {
      bg: palette.background,
      border: palette.success,
    },
    warning: {
      bg: palette.background,
      border: palette.warning,
    },
    error: {
      bg: palette.background,
      border: palette.error,
    },
    abort: {
      bg: 'transparent',
      border: 'transparent',
      color: palette.accents_5,
    },
    'secondary-light': {
      ...defaultColor,
      bg: alphaBackground,
    },
    'success-light': {
      ...defaultColor,
      bg: alphaBackground,
    },
    'warning-light': {
      ...defaultColor,
      bg: alphaBackground,
    },
    'error-light': {
      ...defaultColor,
      bg: alphaBackground,
    },
  }
  if (disabled)
    return {
      bg: palette.cWhite0,
      border: palette.cGray3,
      color: palette.cGray5,
    }
  if (loading)
    return {
      ...defaultColor,
      color: 'transparent',
    }
  if (shadow) return defaultColor

  const hoverColor =
    (ghost ? getButtonGhostHoverColors(palette, status) : colors[status]) || colors.default
  return {
    ...hoverColor,
    color: hoverColor.color || hoverColor.border,
  }
}

export interface ButtonCursorGroup {
  cursor: string
  events: string
}

export const getButtonCursor = (disabled: boolean, loading: boolean): ButtonCursorGroup => {
  if (disabled)
    return {
      cursor: 'not-allowed',
      events: 'auto',
    }
  if (loading)
    return {
      cursor: 'default',
      events: 'none',
    }

  return {
    cursor: 'pointer',
    events: 'auto',
  }
}

export type ButtonSizeGroup = {
  height: string
  width: string
  padding: string
  minWidth: string
  fontSize: string
}

export const getButtonSize = (size: NormalSizes = 'medium', auto: boolean): ButtonSizeGroup => {
  const defaultLayout: ButtonSizeGroup = {
    height: '2.8571rem',
    width: 'auto',
    padding: '1.375rem',
    fontSize: '1rem',
    minWidth: '10rem',
  }
  const autoPaddings: { [key in NormalSizes]: string } = {
    medium: '1.25rem',
    mini: '0.625rem',
    small: '0.9375rem',
    large: '1.5625rem',
  }
  const layouts: { [key in NormalSizes]: ButtonSizeGroup } = {
    mini: {
      height: '1.5rem',
      width: 'initial',
      padding: '1.375rem',
      fontSize: '.75rem',
      minWidth: '5.25rem',
    },
    small: {
      height: '2rem',
      width: 'initial',
      padding: '1.25rem',
      fontSize: '.875rem',
      minWidth: '9.375rem',
    },
    medium: defaultLayout,
    large: {
      height: '2.75rem',
      width: 'initial',
      padding: '1.875rem',
      fontSize: '1rem',
      minWidth: '15.625rem',
    },
  }

  if (auto)
    return {
      ...(layouts[size] || defaultLayout),
      padding: autoPaddings[size] || autoPaddings.medium,
      minWidth: 'min-content',
      width: 'auto',
    }

  return layouts[size] || defaultLayout
}

export const getButtonDripColor = (palette: ZeitUIThemesPalette, props: ButtonProps) => {
  const { status } = props
  const isLightHover = status.endsWith('light')
  const hoverColors = getButtonHoverColors(palette, props)
  return isLightHover ? addColorAlpha(hoverColors.bg, 0.65) : addColorAlpha(palette.accents_2, 0.65)
}
