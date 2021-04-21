import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

import { CountryFlag, CountryFlagProps } from "../atoms";
import { breakpoints } from "../../styles/breakpoints";
import { FadeInAndOutDelayed } from "../../containers";

interface CountryFlagLinkProps extends CountryFlagProps {
  href: string;
}

export const CountryFlagLink: React.FC<
  CountryFlagLinkProps & React.HTMLProps<HTMLAnchorElement>
> = ({ href, countryCode, size, onMouseEnter, onMouseLeave }) => {
  const [showFlag, setShowFlag] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      setShowFlag(true);
    }
  }, [inView]);

  return (
    <Link href={href} passHref key={countryCode}>
      <FlagLink
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
      >
        {showFlag ? (
          <FadeInAndOutDelayed>
            <CountryFlag countryCode={countryCode} size={size} />
          </FadeInAndOutDelayed>
        ) : (
          <FlagPlaceholder size={size} />
        )}
      </FlagLink>
    </Link>
  );
};

const FlagLink = styled.a`
  display: inline;
  margin-right: 8px;
  position: relative;

  & > div > img {
    transition: opacity 0.3s, filter 0.3s;
    will-change: opacity, filter;

    @media ${breakpoints.M} {
      filter: grayscale(1);
      opacity: 0.5;
    }
  }

  & > div > img:hover {
    filter: grayscale(0);
    opacity: 1;
    cursor: pointer;
  }
`;

FlagLink.displayName = "FlagLink";

const FlagPlaceholder = styled.div<{ size: number }>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
`;

FlagPlaceholder.displayName = "FlagPlaceholder";
