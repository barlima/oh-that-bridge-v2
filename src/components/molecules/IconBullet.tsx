import React from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

interface IconBulletProps {
  icon: IconDefinition
  text: string
}

export const IconBullet: React.FC<IconBulletProps> = ({ icon, text }) => {
  return (
    <IconBulletWrapper>
      <FontAwesomeIcon icon={icon}/>
      <Text>{text}</Text>
    </IconBulletWrapper>
  )
}

const IconBulletWrapper = styled.div`
  display: flex;
  font-size: 1.25rem;

  & > svg {
    display: block;
  }
`

IconBulletWrapper.displayName = 'IconBulletWrapper'

const Text = styled.span`
  margin: 0 1rem;
  font-weight: 100;
`

Text.displayName = 'Text'