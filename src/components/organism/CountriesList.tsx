import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import countries from "i18n-iso-countries";
import { motion } from "framer-motion";

import { Title } from "../atoms";
import { ContinentEnum } from "../../utils/types";
import { countriesMap } from "../../utils/maps/countriesMap";
import { CountryFlagLink } from "../molecules";
import { breakpoints } from "../../styles/breakpoints";
import { FLAG_SIZE } from "../../utils/consts";

interface CountriesListProps {
  continent: ContinentEnum;
}

export const CountriesList: React.FC<CountriesListProps> = ({ continent }) => {
  const [hoveredCountry, setHoveredCountry] = useState("");
  const { t, i18n } = useTranslation();

  return (
    <>
      <ContinentAndCountry>
        <Title as="h3" text={t(`continents.${continent}`)} />
        {hoveredCountry && (
          <CurrentCountry>
            -{" "}
            {countries.getName(hoveredCountry, i18n.language, {
              select: "official",
            })}
          </CurrentCountry>
        )}
      </ContinentAndCountry>

      <CountriesContainer onMouseLeave={() => setHoveredCountry("")}>
        {countriesMap[continent].map((country) => (
          <CountryFlagLink
            key={country.id}
            countryCode={country.id}
            size={FLAG_SIZE}
            href={`/countries/${countries
              .getName(country.id, 'en', {
                select: "official",
              })
              .toLowerCase()
              .replace(/,/g, "")
              .replace(/\s/g, "-")}`}
            onMouseEnter={() => setHoveredCountry(country.id)}
          />
        ))}
      </CountriesContainer>
    </>
  );
};

const CountriesContainer = styled(motion.div)`
  margin-bottom: 5vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media ${breakpoints.M} {
    justify-content: flex-start;
  }
`;

CountriesContainer.displayName = "CountriesContainer";

const ContinentAndCountry = styled.div`
  text-align: center;

  & > * {
    display: inline-block;
  }

  @media ${breakpoints.M} {
    text-align: left;
  }
`;

ContinentAndCountry.displayName = "ContinentAndCountry";

const CurrentCountry = styled.span`
  display: none;
  margin-left: var(--padding);
  font-size: 1.25rem;
  font-weight: 300;

  @media ${breakpoints.M} {
    display: inline-block;
  }
`;

CurrentCountry.displayName = "CurrentCountry";
