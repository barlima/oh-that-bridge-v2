import { NextPage, GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Add: NextPage = () => {
  return <div />;
};

export default Add;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  if (process.env.NODE_ENV === "development") {
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
