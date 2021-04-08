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
import { Bridge, SizeEnum } from "../../utils/types";
import { DropDown, ListEmpty, ListSearching } from "../molecules";
import { ListItem } from "../atoms";
import { formatLocation } from "../../utils/formatters";
import { useScreenResize } from "../../hooks";

export const Search: React.FC = () => {
  const { t } = useTranslation();
  const { size } = useScreenResize();
  const router = useRouter();
  const loadingRef = useRef(false);
  const [phrase, setPhrase] = useState("");
  const [activeOption, setActiveOption] = useState<number>();
  const [searchResults, setSearchResults] = useState<Bridge[]>([]);
  const [attachSearch, setAttachSearch] = useState(false);

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
    setAttachSearch(false);
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
      const code = event.keyCode;

      switch (code) {
        case 38:
          event.preventDefault();
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

  useEffect(() => {
    if (!attachSearch) {
      setTimeout(() => {
        setSearchResults([]);
        setPhrase("");
      }, 0);
    }
  }, [attachSearch]);

  return (
    <>
      <Shadow show={size === SizeEnum.S && attachSearch} className="asasdasd" />
      <SearchWrapper
        onClick={() => size === SizeEnum.S && setAttachSearch(true)}
        onBlur={() => size === SizeEnum.S && setAttachSearch(false)}
        attach={attachSearch}
      >
        <Input
          placeholder={size === SizeEnum.S ? t("searchShort") : t("search")}
          onChange={setSearchPhrase}
          onKeyDown={handleClick}
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

        {phrase && searchResults.length === 0 && (
          <DropDown
            items={loadingRef.current ? [<ListSearching />] : [<ListEmpty />]}
          />
        )}
      </SearchWrapper>
    </>
  );
};

const SearchWrapper = styled.div<{ attach: boolean }>`
  margin-top: 1rem;
  width: 90vw;
  transition: transform 0.5s;
  position: relative;

  & > div {
    width: 100%;
  }

  ${(p) => {
    if (p.attach) {
      return `
        transform: translateY(-40vh);
      `;
    }
  }}}

  @media ${breakpoints.M} {
    top: auto;
    left: auto;
    margin-top: 5vh;
    width: ${BREAKPOINT_SIZE.M * 0.8}px;

    &:before {
      display: none;
    }
  }

  @media ${breakpoints.L} {
    width: ${BREAKPOINT_SIZE.L * 0.6}px;
  }

  @media ${breakpoints.XL} {
    width: ${BREAKPOINT_SIZE.XL * 0.6}px;
  }
`;

SearchWrapper.displayName = "SearchWrapper";

const Shadow = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--black);
  opacity: ${(p) => (p.show ? 0.8 : 0)};
  transition: opacity 0.5s;
`;

Shadow.displayName = "Shadow";
