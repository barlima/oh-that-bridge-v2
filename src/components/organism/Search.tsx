import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import { Input } from "../molecules/Input";
import { BREAKPOINT_SIZE, breakpoints } from "../../styles/breakpoints";

const RATIO = 0.6;

export const Search: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SearchWrapper>
      <Input placeholder={t("search")} />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  margin-top: 5vh;
  width: 90vw;

  & > div {
    width: 100%;
  }

  @media ${breakpoints.M} {
    width: ${BREAKPOINT_SIZE.M * 0.8}px;
  }

  @media ${breakpoints.L} {
    width: ${BREAKPOINT_SIZE.L * 0.6}px;
  }

  @media ${breakpoints.XL} {
    width: ${BREAKPOINT_SIZE.XL * 0.6}px;
  }
`;

SearchWrapper.displayName = "SearchWrapper";
