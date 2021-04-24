import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Title, Alignment } from "../components/atoms";
import { Card, BridgesList } from "../components/molecules";
import { SizeEnum, ContinentEnum, Bridge } from "../utils/types";
import { Search, CountriesList } from "../components/organism";
import { useScreenResize, useAnimateInView } from "../hooks";
import { Fade, FadeInAndOut, Motion } from "../containers";
import { breakpoints } from "../styles/breakpoints";
import { slideBottom, mediumStagger } from "../utils/animations";

interface HomeInitialProps {
  recentBridges: Bridge[];
}

const Home: NextPage<HomeInitialProps> = ({ recentBridges }) => {
  const { t } = useTranslation();
  const { size } = useScreenResize();
  const { ref, controls } = useAnimateInView();
  const imageLevel = [SizeEnum.L, SizeEnum.XL].includes(size)
    ? SizeEnum.L
    : SizeEnum.XL;

  return (
    <Fade>
      <Head>
        <title>Oh, that bridge!</title>
        <meta name="description" content={t("search")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Motion>
        <Container>
          <motion.div variants={slideBottom}>
            <Title as="h1" text="Oh, that bridge!" />
          </motion.div>

          <Alignment.Horizontal>
            <FadeInAndOut>
              <Card
                image={{
                  src:
                    "https://images.unsplash.com/photo-1477288309209-a14ce05a641e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                  alt: "hero image",
                  caption: {
                    text: "picture by",
                    link: "@lance_asper",
                    href: "https://unsplash.com/@lance_asper",
                  },
                }}
                level={imageLevel}
              />
            </FadeInAndOut>
          </Alignment.Horizontal>

          <Alignment.Horizontal>
            <Search />
          </Alignment.Horizontal>

          <Alignment.Horizontal>
            <FadeInAndOut>
              <Note>
                <Title as="h4" text={t("note")} />
              </Note>
            </FadeInAndOut>
          </Alignment.Horizontal>

          <Navigation>
            <Link href="/about" passHref>
              <NavLink>About</NavLink>
            </Link>
            <Link href="/contribute" passHref>
              <NavLink>Contribute</NavLink>
            </Link>
          </Navigation>
        </Container>

        <Discover>
          {recentBridges.length > 0 && (
            <>
              <Alignment.Horizontal>
                <Title as="h2" text={t("recentlyRegistered")} />
              </Alignment.Horizontal>

              <RecentlyRegistered
                ref={ref}
                animate={controls}
                variants={mediumStagger}
              >
                <BridgesList bridges={recentBridges} />
              </RecentlyRegistered>
            </>
          )}

          <Alignment.Horizontal>
            <Title as="h2" text={t("searchByCountry")} />
          </Alignment.Horizontal>

          <CountriesList continent={ContinentEnum.EUROPE} />
          <CountriesList continent={ContinentEnum.NORTH_AMERICA} />
          <CountriesList continent={ContinentEnum.SOUTH_AMERICA} />
          <CountriesList continent={ContinentEnum.ASIA} />
          <CountriesList continent={ContinentEnum.AFRICA} />
          <CountriesList continent={ContinentEnum.AUSTRALIA} />
        </Discover>
      </Motion>
    </Fade>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeInitialProps> = async ({
  locale,
}) => {
  const response = await fetch(`${process.env.PUBLIC_URL}/api/recent-bridges`);
  const data = await response.json();

  return {
    props: {
      recentBridges: data.bridges as Bridge[],
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

const Container = styled.div`
  text-align: center;
  position: relative;
  min-height: 100vh;

  & h1 {
    font-size: 2rem;
    margin: 0;
    padding: var(--padding) 0;

    @media ${breakpoints.M} {
      font-size: 3rem;
    }
  }
`;

Container.displayName = "Container";

const Note = styled.div`
  width: 90vw;
  margin-top: var(--padding);
  margin-bottom: 7vh;

  @media ${breakpoints.M} {
    width: 50vw;
    position: relative;
    margin: calc(4 * var(--padding));
  }
`;

Note.displayName = "Note";

const Discover = styled.div`
  background-color: var(--background);
  padding: 5vw;
  width: 100%;
`;

Discover.displayName = "Discover";

const RecentlyRegistered = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 10vh;
`;

RecentlyRegistered.displayName = "RecentlyRegistered";

const Navigation = styled.div`
  position: absolute;
  bottom: 0;
  margin: var(--padding) 0;
  width: 100%;
`;

Navigation.displayName = "Navigation";

const NavLink = styled.a`
  border-right: 1px solid var(--grey);
  color: var(--grey);
  font-size: 1rem;
  font-weight: 300;
  margin-top: 5vh;
  padding: 0 var(--padding);
  transition: color 0.5s;

  &:hover {
    cursor: pointer;
    color: var(--black);
  }

  &:last-child {
    border: none;
  }

  @media ${breakpoints.M} {
    font-size: 1.3rem;
  }
`;

NavLink.displayName = "NavLink";
