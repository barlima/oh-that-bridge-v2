import React from "react";
import Flag from "react-flagkit";

export interface CountryFlagProps {
  countryCode: string;
  size?: number;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  size = 64,
}) => <Flag country={countryCode} size={size} />;
