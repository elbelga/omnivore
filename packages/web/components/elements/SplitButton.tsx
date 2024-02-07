import { ReactNode, useEffect, useMemo, useRef } from 'react'
import { styled } from '../tokens/stitches.config'
import { Box, HStack, VStack } from './LayoutPrimitives'
import { Button } from './Button'
import { Dropdown, DropdownOption } from './DropdownElements'
import { CaretDownIcon } from './icons/CaretDownIcon'

type SplitButtonProps = {
  title: string
}

const CaretButton = (): JSX.Element => {
  return (
    <VStack
      css={{
        width: '20px',
        height: '100%',
        alignItems: 'center',
        bg: '$ctaBlue',
        border: '0px solid transparent',
        borderTopRightRadius: '5px',
        borderBottomRightRadius: '5px',
        borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '0px',
        '--caret-color': '#EDEDED',
        '&:hover': {
          opacity: 1.0,
          color: 'white',
          '--caret-color': 'white',
        },
        '&:focus': {
          outline: 'none',
          border: '0px solid transparent',
        },
      }}
    >
      <CaretDownIcon size={8} color="var(--caret-color)" />
    </VStack>
  )
}

export const SplitButton = (props: SplitButtonProps): JSX.Element => {
  return (
    <HStack css={{ height: '27px', gap: '1px' }}>
      <Button
        css={{
          display: 'flex',
          minWidth: '70px',
          bg: '$ctaBlue',
          color: '#EDEDED',
          fontSize: '12px',
          fontFamily: '$inter',
          border: '0px solid transparent',
          borderTopLeftRadius: '5px',
          borderBottomLeftRadius: '5px',
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px',
          '&:hover': {
            opacity: 1.0,
            color: 'white',
          },
          '&:focus': {
            outline: 'none',
            border: '0px solid transparent',
          },
        }}
      >
        {props.title}
      </Button>
      <Dropdown triggerElement={<CaretButton />}>
        <DropdownOption onSelect={() => console.log()} title="Archive (e)" />
      </Dropdown>
    </HStack>
  )
}
