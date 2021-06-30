import React from 'react';
import styled from "styled-components";
import Halo from "./Halo";

interface ProfilePictureProps {
    url: string
}

export default function ProfilePicture(props: ProfilePictureProps) {
    return <Wrapper>
        <Halo range={8}>
            <Image src={props.url} alt={'Profile Avatar'} />
        </Halo>
    </Wrapper>
}

const Wrapper = styled.div`
  margin-right: 3rem;
`

const Image = styled.img`
  width: 9rem;
  height: 9rem;
  object-fit: cover;
`