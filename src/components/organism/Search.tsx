import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import debounce from "lodash/debounce";
import isNumber from "lodash/isNumber";

import { Input } from "../molecules/Input";
import { BREAKPOINT_SIZE, breakpoints } from "../../styles/breakpoints";
import { Bridge } from "../../utils/types";
import { DropDown, ListEmpty } from "../molecules";
import { ListItem } from "../atoms";
import { formatLocation } from "../../utils/formatters";

export const Search: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const loadingRef = useRef(false);
  const [phrase, setPhrase] = useState("");
  const [activeOption, setActiveOption] = useState<number>();
  const [searchResults, setSearchResults] = useState<Bridge[]>([]);

  const setSearchPhrase = debounce(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      loadingRef.current = true;
      const phrase = e.target.value;
      setPhrase(phrase);
    },
    250
  );

  const hideDropDown = (): void => {
    setSearchResults([]);
    setPhrase("");
  };

  const handleSearch = async (phrase: string): Promise<void> => {
    const searchPhrase = phrase.trim();

    if (searchPhrase) {
      const response = await fetch(
        `${process.env.PUBLIC_URL}/api/search?phrase=${searchPhrase}`
      );
      const data = await response.json();
      setSearchResults(data.bridges);
    } else {
      setSearchResults([]);
      setActiveOption(undefined);
    }
  };

  const handleClick = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const code = event.keyCode;

      switch (code) {
        case 38:
          setActiveOption((current) =>
            current ? current - 1 : searchResults.length - 1
          );
          break;
        case 40:
          setActiveOption((current) =>
            isNumber(current) && current < searchResults.length - 1
              ? current + 1
              : 0
          );
          break;
        case 13:
          router.push(`/bridges/${searchResults[activeOption].id}`);
          break;
        case 27:
          hideDropDown();
          break;
      }
    },
    [searchResults, activeOption]
  );

  useEffect(() => {
    handleSearch(phrase);
    loadingRef.current = false;
  }, [phrase]);

  return (
    <SearchWrapper>
      <Input
        placeholder={t("search")}
        onChange={setSearchPhrase}
        onKeyUp={handleClick}
        onKeyDown={(e) => {
          if (e.keyCode === 38) {
            e.preventDefault();
          }
        }}
      />
      {searchResults.length > 0 && (
        <DropDown
          items={searchResults.map((res, index) => (
            <Link href={`/bridges/${res.id}`} key={res.id}>
              <a>
                <ListItem
                  text={res.name}
                  addition={formatLocation(res.metadata)}
                  active={activeOption === index}
                />
              </a>
            </Link>
          ))}
        />
      )}

      {phrase && searchResults.length === 0 && !loadingRef.current && (
        <DropDown items={[<ListEmpty />]} />
      )}
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  margin-top: 5vh;
  width: 90vw;
  position: relative;

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
