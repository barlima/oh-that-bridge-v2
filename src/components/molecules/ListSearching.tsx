import React from "react";
import { useTranslation } from "next-i18next";
import { ListItem } from "../atoms/ListItem";
import { Alignment } from "../atoms";

export const ListSearching: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Alignment.Horizontal>
      <ListItem text={t("searching")} disabled />
    </Alignment.Horizontal>
  );
};
